using Microsoft.Playwright;
using Microsoft.Playwright.NUnit;
using NUnit.Framework;

namespace Shop.E2E;

[Parallelizable(ParallelScope.Self)]
[TestFixture]
public class ShopE2ETests : PageTest
{
    private const string FrontendUrl = "file:///Users/tarasyonda/RiderProjects/shop/Shop.Frontend/index.html";

    [Test]
    public async Task CatalogPage_ShowsProducts()
    {
        await Page.GotoAsync(FrontendUrl);
        await Page.WaitForSelectorAsync(".product-card");
        var cards = await Page.QuerySelectorAllAsync(".product-card");
        Assert.That(cards.Count, Is.GreaterThan(0));
    }

    [Test]
    public async Task Login_WithValidCredentials_ShowsAdminMenu()
    {
        await Page.GotoAsync(FrontendUrl);
        await Page.ClickAsync("a[onclick=\"showPage('login')\"]");
        await Page.FillAsync("#login-email", "admin@shop.com");
        await Page.FillAsync("#login-password", "Admin123!");
        await Page.ClickAsync("button[type='submit']");
        await Page.WaitForSelectorAsync("#admin-link:visible");
        var adminLink = await Page.IsVisibleAsync("#admin-link");
        Assert.That(adminLink, Is.True);
    }

    [Test]
    public async Task AddToCart_WhenLoggedIn_ShowsSuccess()
    {
        await Page.GotoAsync(FrontendUrl);
        await Page.ClickAsync("a[onclick=\"showPage('login')\"]");
        await Page.FillAsync("#login-email", "admin@shop.com");
        await Page.FillAsync("#login-password", "Admin123!");
        await Page.ClickAsync("button[type='submit']");
        await Page.WaitForSelectorAsync(".product-card");
        await Page.ClickAsync(".product-card button");
        await Page.WaitForSelectorAsync(".message.success");
        var message = await Page.IsVisibleAsync(".message.success");
        Assert.That(message, Is.True);
    }
}
