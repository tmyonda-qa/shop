using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Shop.API.Data;
using Shop.API.Models;

namespace Shop.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class OrdersController : ControllerBase
{
    private readonly AppDbContext _context;

    public OrdersController(AppDbContext context)
    {
        _context = context;
    }

    private int GetUserId() =>
        int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);

    [HttpPost("checkout")]
    public async Task<IActionResult> Checkout()
    {
        var userId = GetUserId();

        var cartItems = await _context.CartItems
            .Include(c => c.Product)
            .Where(c => c.UserId == userId)
            .ToListAsync();

        if (!cartItems.Any())
            return BadRequest("Cart is empty");

        foreach (var item in cartItems)
        {
            if (item.Quantity > item.Product.Stock)
                return BadRequest($"Not enough stock for {item.Product.Name}");
            if (item.Product.Price <= 0)
                return BadRequest($"Invalid price for {item.Product.Name}");
        }

        var order = new Order
        {
            UserId = userId,
            TotalPrice = cartItems.Sum(i => i.Product.Price * i.Quantity),
            Items = cartItems.Select(i => new OrderItem
            {
                ProductId = i.ProductId,
                Quantity = i.Quantity,
                Price = i.Product.Price
            }).ToList()
        };

        foreach (var item in cartItems)
            item.Product.Stock -= item.Quantity;

        _context.Orders.Add(order);
        _context.CartItems.RemoveRange(cartItems);
        await _context.SaveChangesAsync();

        return Ok(new { order.Id, order.TotalPrice, order.Status });
    }

    [HttpGet]
    public async Task<IActionResult> GetOrders()
    {
        var userId = GetUserId();

        var orders = await _context.Orders
            .Include(o => o.Items)
            .ThenInclude(i => i.Product)
            .Where(o => o.UserId == userId)
            .Select(o => new
            {
                o.Id,
                o.CreatedAt,
                o.Status,
                o.TotalPrice,
                Items = o.Items.Select(i => new
                {
                    i.ProductId,
                    ProductName = i.Product.Name,
                    i.Quantity,
                    i.Price
                })
            })
            .ToListAsync();

        return Ok(orders);
    }
}
