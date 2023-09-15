using EventManagement.Application;
using EventManagement.Infrastructure;
using EventManagement.WebApi.GraphApi;
using GraphQL;
using Serilog;

Log.Logger = new LoggerConfiguration()
    .Enrich.FromLogContext()
    .WriteTo.Console()
    .CreateLogger();

var builder = WebApplication.CreateBuilder(args);

builder.Host.UseSerilog();

builder.Services.AddApplication();
builder.Services.AddInfrastructure();

builder.Services.AddGraphQL(b => b
            .AddSystemTextJson()
            .AddSchema<Schema>()
            .AddGraphTypes(typeof(Schema).Assembly));

var app = builder.Build();

app.UseHttpsRedirection();
app.UseGraphQL();

app.Run();
