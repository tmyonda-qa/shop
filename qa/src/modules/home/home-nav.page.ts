import { navLabels } from "../../global/labels/nav.labels";
import { Page, expect } from "@playwright/test";

export class HomeNavPage {
    constructor(private page: Page) {}

    private catalogLink = this.page.locator('[data-test="catalog"]');
    private cartLink = this.page.locator('[data-test="cart"]');
    private ordersLink = this.page.locator('[data-test="orders"]');
    private loginLink = this.page.locator('[data-test="Login"]');
    private registerLink = this.page.locator('[data-test="Registration"]');
    private adminLink = this.page.locator('[data-test="admin"]');
    private userEmail = this.page.locator('[data-test="user-email"]');
    private logoutLink = this.page.locator('[data-test="logout"]');

    async goto() {
        await this.page.goto('file:///Users/tarasyonda/RiderProjects/shop/Shop.Frontend/index.html');
    }

    async clickRegistration() {
        await this.registerLink.click();
    }

    async clickLogin() {
        await this.loginLink.click();
    }

    async clickCatalog() {
        await this.catalogLink.click();
    }

    async clickCart() {
        await this.cartLink.click();
    }

    async clickOrders() {
        await this.ordersLink.click();
    }

    async clickLogout() {
        await this.logoutLink.click();
    }

    async checkCatalogLabel() {
        await expect(this.catalogLink).toHaveText(navLabels.catalog);
    }

    async checkCartLabel() {
        await expect(this.cartLink).toContainText(navLabels.cart);
    }

    async checkOrdersLabel() {
        await expect(this.ordersLink).toHaveText(navLabels.orders);
    }

    async checkLoginLabel() {
        await expect(this.loginLink).toHaveText(navLabels.login);
    }

    async checkRegisterLabel() {
        await expect(this.registerLink).toHaveText(navLabels.register);
    }

    async checkAdminLabel() {
        await expect(this.adminLink).toHaveText(navLabels.admin);
    }

    async checkLogoutLabel() {
        await expect(this.logoutLink).toHaveText(navLabels.logout);
    }

    async checkUserEmail(email: string) {
        await expect(this.userEmail).toHaveText(email);
    }
}