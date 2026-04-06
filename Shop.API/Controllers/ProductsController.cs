using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Shop.API.Data;
using Shop.API.DTOs;
using Shop.API.Models;

namespace Shop.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly AppDbContext _context;

    public ProductsController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<ProductDto>>> GetProducts(
        [FromQuery] string? category,
        [FromQuery] string? search)
    {
        var query = _context.Products.AsQueryable();

        if (!string.IsNullOrEmpty(category))
            query = query.Where(p => p.Category == category);

        if (!string.IsNullOrEmpty(search))
            query = query.Where(p => p.Name.ToLower().Contains(search.ToLower()));

        return await query.Select(p => new ProductDto
        {
            Id = p.Id,
            Name = p.Name,
            Description = p.Description,
            Price = p.Price,
            Category = p.Category,
            ImageUrl = p.ImageUrl,
            Stock = p.Stock
        }).ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ProductDto>> GetProduct(int id)
    {
        var product = await _context.Products.FindAsync(id);
        if (product == null)
            return NotFound();

        return new ProductDto
        {
            Id = product.Id,
            Name = product.Name,
            Description = product.Description,
            Price = product.Price,
            Category = product.Category,
            ImageUrl = product.ImageUrl,
            Stock = product.Stock
        };
    }

    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<ProductDto>> CreateProduct(CreateProductDto dto)
    {
        if (dto.Price < 0)
            return BadRequest("Price cannot be negative");
        if (dto.Stock < 0)
            return BadRequest("Stock cannot be negative");

        var product = new Product
        {
            Name = dto.Name,
            Description = dto.Description,
            Price = dto.Price,
            Category = dto.Category,
            ImageUrl = dto.ImageUrl,
            Stock = dto.Stock
        };

        _context.Products.Add(product);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetProduct), new { id = product.Id }, new ProductDto
        {
            Id = product.Id,
            Name = product.Name,
            Description = product.Description,
            Price = product.Price,
            Category = product.Category,
            ImageUrl = product.ImageUrl,
            Stock = product.Stock
        });
    }

    [HttpPut("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> UpdateProduct(int id, CreateProductDto dto)
    {
        var product = await _context.Products.FindAsync(id);
        if (product == null)
            return NotFound();
        if (dto.Price < 0)
            return BadRequest("Price cannot be negative");

        product.Name = dto.Name;
        product.Description = dto.Description;
        product.Price = dto.Price;
        product.Category = dto.Category;
        product.ImageUrl = dto.ImageUrl;
        product.Stock = dto.Stock;

        await _context.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> DeleteProduct(int id)
    {
        var product = await _context.Products.FindAsync(id);
        if (product == null)
            return NotFound();

        _context.Products.Remove(product);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}