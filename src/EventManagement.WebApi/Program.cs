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
using Serilog.Exceptions;
using Serilog.Sinks.Elasticsearch;
using Quartz.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

builder.Host.UseSerilog((context, configuration) 
    => configuration.Enrich.FromLogContext()
    .Enrich.WithExceptionDetails()
    .Enrich.WithMachineName()
    .WriteTo.Console()
    .WriteTo.Elasticsearch(new ElasticsearchSinkOptions(new Uri(context.Configuration["Elastic:Uri"]!))
    {
        IndexFormat = $"{context.Configuration["ApplicationName"]}-logs-{context.HostingEnvironment.EnvironmentName?.ToLower().Replace(".", "-")}-{DateTime.UtcNow:yyyy-MM}",
        AutoRegisterTemplate = true,
        NumberOfShards = 2,
        NumberOfReplicas = 1,

    })
    .Enrich.WithProperty("Environment", context.HostingEnvironment.EnvironmentName!)
    .ReadFrom.Configuration(context.Configuration));

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

app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.MapControllerRoute(
    name: "Admin",
    pattern: "{area:exists}/{controller=Home}/{action=Index}/{id?}");

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
