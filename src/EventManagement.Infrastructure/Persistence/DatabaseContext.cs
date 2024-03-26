using Microsoft.Extensions.Configuration;
using System.Data;
using System.Data.SqlClient;

namespace EventManagement.Infrastructure.Persistence;

internal class DatabaseContext
{
    private readonly string _connectionString;

    public DatabaseContext(IConfiguration configuration)
    {
        _connectionString = configuration.GetConnectionString("DefaultConnection") 
            ?? throw new InvalidOperationException("Default connection string is not set");
    }

    public IDbConnection CreateConnection() => new SqlConnection(_connectionString);
}
