using AdminClientApi.Infrastructure;
using Fancy.ResourceLinker.Gateway;
using Fancy.ResourceLinker.Gateway.EntityFrameworkCore;
using Fancy.ResourceLinker.Hateoas;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Logging;

IdentityModelEventSource.ShowPII = true;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers().AddHateoas();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
string? connectionString = builder.Configuration.GetConnectionString("database");
builder.Services.AddDbContext<AdminClientApiDbContext>(options => options.UseSqlServer(connectionString));

builder.Services.AddGateway()
                .UseDbContext<AdminClientApiDbContext>()
                .LoadConfiguration(builder.Configuration.GetSection("Gateway"))
                .AddRouting()
                .AddAuthentication(options => options.UseDbTokenStore())
                .AddAntiForgery(options => options.UseDbKeyStore());
                

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    scope.ServiceProvider.GetRequiredService<AdminClientApiDbContext>().Database.EnsureCreated();
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseCors(builder => builder.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());
}

app.UseGatewayAuthentication();
app.UseGatewayAuthenticationEndpoints();
app.UseGatewayAntiForgery();

app.MapControllers();

app.UseGatewayRouting();

app.Run();
