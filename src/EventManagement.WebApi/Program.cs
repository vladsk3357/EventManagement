using EventManagement.Application;
using EventManagement.Application.Common.Interfaces;
using EventManagement.Infrastructure;
using EventManagement.WebApi.Converters;
using EventManagement.WebApi.Filters;
using EventManagement.WebApi.Services;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Serilog;

Log.Logger = new LoggerConfiguration()
    .Enrich.FromLogContext()
    .WriteTo.Console()
    .CreateLogger();

var builder = WebApplication.CreateBuilder(args);

builder.Host.UseSerilog();

builder.Services.AddControllersWithViews(options => options.Filters.Add<ApiExceptionFilterAttribute>())
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.Converters.Add(new CommunitySubscriptionFormFieldDtoJsonConverter());
        options.JsonSerializerOptions.Converters.Add(new EventVenueDtoJsonConverter());
    });
builder.Services.AddFluentValidationAutoValidation();
builder.Services.AddFluentValidationClientsideAdapters();

builder.Services.Configure<ApiBehaviorOptions>(options =>
            options.SuppressModelStateInvalidFilter = true);
builder.Services.AddRouting(options => options.LowercaseUrls = true);
builder.Services.AddApplication();
builder.Services.AddInfrastructure(builder.Configuration);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options => options.CustomSchemaIds(type => type.ToString()));

builder.Services.AddHttpContextAccessor();
builder.Services.AddSingleton<ICurrentUserService, CurrentUserService>();
builder.Services.AddSingleton<ILinksService, LinksService>();

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var dataContext = scope.ServiceProvider.GetRequiredService<IApplicationDbContext>();
    await dataContext.Database.MigrateAsync();
}

app.UseDefaultFiles();
app.UseStaticFiles();

app.UseHttpsRedirection();

app.UseAuthentication();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.MapControllerRoute(
    name: "EmailConfirmation",
    pattern: "users/confirmation",
    defaults: new {controller = "Users", action = "Confirmation"});
app.MapControllerRoute(
    name: "ResetPassword",
    pattern: "users/reset-password",
    defaults: new { controller = "Users", action = "ResetPassword" });

app.UseCors();
app.Run();
