using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Shop.API.Controllers;
using Shop.API.Data;
using Shop.API.Models;

namespace Shop.Tests;

public class ProductsControllerTests
{
    private AppDbContext GetInMemoryContext()
    {
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
            .Options;
        return new AppDbContext(options);
    }

    [Fact]
    public async Task GetProducts_ReturnsAllProducts()
    {
        var context = GetInMemoryContext();
        context.Products.AddRange(
            new Product { Name = "iPhone", Price = 35000, Stock = 10, Category = "Електроніка" },
            new Product { Name = "MacBook", Price = 80000, Stock = 5, Category = "Електроніка" }
        );
        await context.SaveChangesAsync();

        var controller = new ProductsController(context);
        var result = await controller.GetProducts(null, null);

        var items = Assert.IsAssignableFrom<IEnumerable<Product>>(result.Value);
        Assert.Equal(2, items.Count());
    }

    [Fact]
    public async Task CreateProduct_WithNegativePrice_ReturnsBadRequest()
    {
        var context = GetInMemoryContext();
        var controller = new ProductsController(context);

        var result = await controller.CreateProduct(new Product { Name = "Test", Price = -100, Stock = 5 });

        Assert.IsType<BadRequestObjectResult>(result.Result);
    }

    [Fact]
    public async Task GetProduct_WithInvalidId_ReturnsNotFound()
    {
        var context = GetInMemoryContext();
        var controller = new ProductsController(context);

        var result = await controller.GetProduct(999);

        Assert.IsType<NotFoundResult>(result.Result);
    }

    [Fact]
    public async Task GetProducts_FilterByCategory_ReturnsFilteredProducts()
    {
        var context = GetInMemoryContext();
        context.Products.AddRange(
            new Product { Name = "iPhone", Price = 35000, Stock = 10, Category = "Електроніка" },
            new Product { Name = "Футболка", Price = 500, Stock = 20, Category = "Одяг" }
        );
        await context.SaveChangesAsync();

        var controller = new ProductsController(context);
        var result = await controller.GetProducts("Електроніка", null);

        var items = Assert.IsAssignableFrom<IEnumerable<Product>>(result.Value);
        Assert.Single(items);
    }
}
