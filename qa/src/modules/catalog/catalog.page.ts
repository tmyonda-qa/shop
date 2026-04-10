import { Page, expect } from "@playwright/test";
import { Category } from "../../global/enums/category.enum";
import { ProductCardComponent } from "./components/product-card.component";

export class CatalogPage {
    constructor(readonly page: Page) {}

    private productCards = this.page.locator('[data-test="product-card"]');
    private searchInput = this.page.locator('#search');
    private categorySelect = this.page.locator('#category');
    private clearSearchButton = this.page.locator('span[onclick="clearSearch()"]');
    private successMessage = this.page.locator('[data-test="message-success"]');
    readonly card = new ProductCardComponent(this.productCards.first());

    async goto() {
        await this.page.click('a[onclick="showPage(\'catalog\')"]');
    }

    async checkProductsVisible() {
        await expect(this.productCards.first()).toBeVisible();
    }

    async getProductsCount() {
        return await this.productCards.count();
    }

    async searchProduct(text: string) {
        await this.searchInput.fill(text);
    }

    async clearSearch() {
        await this.clearSearchButton.click();
    }

    async filterByCategory(category: Category) {
        await this.categorySelect.selectOption(category);
    }

    async addFirstProductToCart() {
        const firstButton = this.productCards.first().locator('[data-test="product-button"]:not([disabled])');
        await firstButton.click();
    }

    async checkAddToCartSuccess() {
        await expect(this.successMessage).toBeVisible();
    }
}