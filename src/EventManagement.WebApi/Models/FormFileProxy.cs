using EventManagement.Domain.Abstractions;

namespace EventManagement.WebApi.Models;

public class FormFileProxy : IFile
{
    private readonly IFormFile _formFile;
    public string ContentType => _formFile.ContentType;

    public long Length => _formFile.Length;

    public string FileName => _formFile.FileName;

    public FormFileProxy(IFormFile formFile)
    {
        ArgumentNullException.ThrowIfNull(formFile);
        _formFile = formFile;
    }

    public Task CopyToAsync(Stream target, CancellationToken cancellationToken = default)
    {
        return _formFile.CopyToAsync(target, cancellationToken);
    }

    public async Task<byte[]> GetData(CancellationToken cancellationToken = default)
    {
        using var stream = new MemoryStream();
        await CopyToAsync(stream, cancellationToken);
        return stream.ToArray();
    }

    public Stream GetReadStream()
    {
        return _formFile.OpenReadStream();
    }
}
