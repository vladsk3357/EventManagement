using EventManagement.Application;
using EventManagement.Application.Common.Interfaces;
using EventManagement.Application.Organizers.Events;
using EventManagement.Infrastructure;
using EventManagement.WebApi.Converters;
using EventManagement.WebApi.Filters;
using EventManagement.WebApi.GraphApi;
using EventManagement.WebApi.Services;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Mvc;
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

builder.Services.AddGraphApi();

var app = builder.Build();
app.UseDefaultFiles();
app.UseStaticFiles();

app.UseHttpsRedirection();

app.UseAuthentication();
//app.UseAuthorization();
app.UseGraphQL();
if (app.Environment.IsDevelopment())
{
    app.UseGraphQLAltair();
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
