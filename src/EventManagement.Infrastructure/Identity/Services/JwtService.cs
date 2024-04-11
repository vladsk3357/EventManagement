using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using EventManagement.Application.Common.Interfaces;
using EventManagement.Application.Common.Models.User;
using EventManagement.Domain.Entities;
using EventManagement.Infrastructure.Identity.Options.Jwt;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace EventManagement.Infrastructure.Identity.Services;

internal class JwtService : IJwtService
{
    private readonly JwtOptions _jwtOptions;
    private readonly IApplicationDbContext _context;
    private readonly IUserService _userService;
    private readonly TokenValidationParameters _tokenValidationParameters;
    private readonly IDateTime _dateTime;

    public JwtService(
        IOptions<JwtOptions> jwtOptions,
        ApplicationDbContext context,
        TokenValidationParameters tokenValidationParameters,
        IDateTime dateTime,
        IUserService userService)
    {
        _jwtOptions = jwtOptions.Value;
        _context = context;
        _tokenValidationParameters = tokenValidationParameters;
        _dateTime = dateTime;
        _userService = userService;
    }

    public async Task<AuthToken> GenerateJwtForUser(User user, CancellationToken cancellationToken = default!)
    {
        ArgumentNullException.ThrowIfNull(user);
        ArgumentException.ThrowIfNullOrEmpty(user.Email);
        ArgumentException.ThrowIfNullOrEmpty(user.Id);
        
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes(_jwtOptions.Secret);
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new[] {
                new Claim(JwtRegisteredClaimNames.Sub, user.Id),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim("id", user.Id),
            }),
            Expires = _dateTime.Now.Add(_jwtOptions.TokenLifetime),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
        };

        var token = tokenHandler.CreateToken(tokenDescriptor);
        var jwtToken = tokenHandler.WriteToken(token);
        var refreshToken = new RefreshToken
        {
            Token = Guid.NewGuid().ToString(),
            JwtId = token.Id,
            UserId = user.Id,
            CreationDate = _dateTime.Now,
            ExpiryDate = _dateTime.Now.Add(_jwtOptions.RefreshTokenLifetime),
        };

        await _context.RefreshTokens.AddAsync(refreshToken, cancellationToken);
        await _context.SaveChangesAsync(cancellationToken);
        return new AuthToken(jwtToken, refreshToken.Token);
    }

    public async Task<AuthToken> RefreshTokenAsync(string token, string refreshToken, CancellationToken cancellationToken = default)
    {
        var validatedToken = GetPrincipalFromExpiredToken(token)
            ?? throw new ArgumentException("Invalid token");

        var expiryDateUnix = long.Parse(validatedToken.Claims.Single(x => x.Type == JwtRegisteredClaimNames.Exp).Value);
        var expiryDateTimeUtc = new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc)
            .AddSeconds(expiryDateUnix);

        if (expiryDateTimeUtc > _dateTime.Now)
            throw new ArgumentException("Invalid token");

        var storedRefreshToken = await _context.RefreshTokens.FirstOrDefaultAsync(x => x.Token == refreshToken, cancellationToken: cancellationToken);
        var jti = validatedToken.Claims.Single(x => x.Type == JwtRegisteredClaimNames.Jti).Value;

        if (storedRefreshToken == null
            || _dateTime.Now > storedRefreshToken.ExpiryDate
            || storedRefreshToken.Invalidated
            || storedRefreshToken.Used
            || storedRefreshToken.JwtId != jti)
            throw new ArgumentException("Invalid token");

        storedRefreshToken.Used = true;
        _context.RefreshTokens.Update(storedRefreshToken);
        await _context.SaveChangesAsync(cancellationToken);

        var user = await _userService.GetUserByIdAsync(validatedToken.Claims.Single(x => x.Type == "id").Value, cancellationToken);
        return user is null 
            ? throw new ArgumentException("Invalid token") 
            : await GenerateJwtForUser(user, cancellationToken);
    }

    private ClaimsPrincipal? GetPrincipalFromExpiredToken(string token)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        try
        {
            var principal = tokenHandler.ValidateToken(token, _tokenValidationParameters, out var validatedToken);
            return !IsJwtWithValidSecurityAlgorithm(validatedToken) ? null : principal;
        }
        catch
        {
            return null;
        }
    }

    private static bool IsJwtWithValidSecurityAlgorithm(SecurityToken validatedToken) =>
        (validatedToken is JwtSecurityToken jwtSecurityToken) &&
            jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256,
                StringComparison.InvariantCultureIgnoreCase);
}