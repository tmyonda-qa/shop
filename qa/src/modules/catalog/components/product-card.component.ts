import { Locator, expect } from "@playwright/test";

export class ProductCardComponent {
    constructor(private card: Locator) {}

    private name = this.card.locator('[data-test="product-name"]');
    private description = this.card.locator('[data-test="product-description"]');
    private category = this.card.locator('[data-test="product-category"]');
    private price = this.card.locator('[data-test="product-price"]');
    private stock = this.card.locator('[data-test="product-stock"]');
    private addToCartButton = this.card.locator('[data-test="product-button"]');
    private outOfStockButton = this.card.locator('[data-test="product-button"][disabled]');

    async checkName(text: string) {
        await expect(this.name).toHaveText(text);
    }

    async checkDescription(text: string) {
        await expect(this.description).toHaveText(text);
    }

    async checkCategory(text: string) {
        await expect(this.category).toContainText(text);
    }

    async checkPrice(text: string) {
        await expect(this.price).toContainText(text);
    }

    async checkStock(text: string) {
        await expect(this.stock).toHaveText(text);
    }

    async checkAddToCartButtonVisible() {
        await expect(this.addToCartButton).toBeVisible();
    }

    async checkOutOfStockButtonVisible() {
        await expect(this.outOfStockButton).toBeVisible();
    }

    async addToCart() {
        await this.addToCartButton.click();
    }
}