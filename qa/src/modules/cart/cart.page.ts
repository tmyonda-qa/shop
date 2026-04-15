import { Page, expect } from "@playwright/test";

export class CartPage {
    constructor(readonly page: Page) {}

    private cartItems = this.page.locator('.cart-item');
    private cartTotal = this.page.locator('#cart-total');
    private checkoutButton = this.page.locator('button[onclick="checkout()"]');
    private successMessage = this.page.locator('[data-test="message-success"]');
    private errorMessage = this.page.locator('[data-test="message-error"]');
    private closeMessageButton = this.page.locator('[data-test="message-success"]');

    async closeSuccessMessage() {
        await this.closeMessageButton.click();
    }
    async goto() {
        await this.page.click('a[id="cart-link"]');
    }

    async checkCartVisible() {
        await expect(this.page.locator('#cart')).toBeVisible();
    }

    async getCartItemsCount() {
        return await this.cartItems.count();
    }

    async checkout() {
        await this.checkoutButton.click();
    }

    async checkCheckoutSuccess() {
        await expect(this.successMessage).toBeVisible();
    }

    async checkCartEmpty() {
        await expect(this.cartItems).toHaveCount(0);
    }

    async checkCartTotal() {
        await expect(this.cartTotal).toBeVisible();
    }

    async removeFirstItem() {
        await this.cartItems.first().locator('.btn-danger').click();
    }
}
