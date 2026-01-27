using System;
using Fancy.ResourceLinker.Gateway.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace AdminClientApi.Infrastructure;

public class AdminClientApiDbContext : GatewayDbContext
{
    public AdminClientApiDbContext(DbContextOptions<AdminClientApiDbContext> options) : base(options)
    {
    }
}
