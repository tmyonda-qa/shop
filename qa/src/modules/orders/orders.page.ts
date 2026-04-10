import { Page, expect } from "@playwright/test";
import { OrderStatus } from "../../global/enums/order-status.enum";

export class OrdersPage {
    constructor(readonly page: Page) {}

    private ordersList = this.page.locator('#orders-list');
    private adminOrdersList = this.page.locator('#admin-orders-list');
    private orderItems = this.page.locator('#orders-list > div');
    private adminOrderItems = this.page.locator('#admin-orders-list > div');
    private successMessage = this.page.locator('.message.success');
    private myOrdersCount = this.page.locator('#my-orders-count');
    private adminOrdersCount = this.page.locator('#admin-orders-count');

    async goto() {
        await this.page.click('a[onclick="showPage(\'orders\')"]');
    }
    async checkOrdersVisible() {
        await expect(this.ordersList).toBeVisible();
    }
    async getMyOrdersCount() {
        return await this.orderItems.count();
    }
    async checkMyOrdersCounter(count: number) {
        await expect(this.myOrdersCount).toHaveText(String(count));
    }

    async checkAdminOrdersCounter(count: number) {
        await expect(this.adminOrdersCount).toHaveText(String(count));
    }
    async checkOrderNumber(index: number) {
        const order = this.orderItems.nth(index);
        await expect(order.locator('strong').first()).toBeVisible();
    }
    async checkOrderDate(index: number) {
        const order = this.orderItems.nth(index);
        await expect(order.locator('p:nth-child(2)')).toBeVisible();
    }
    async checkOrderItems(index: number) {
        const order = this.orderItems.nth(index);
        await expect(order.locator('p[style*="color:#555"]').first()).toBeVisible();
    }
    async checkOrderTotal(index: number) {
        const order = this.orderItems.nth(index);
        await expect(order.locator('strong').last()).toBeVisible();
    }
    async checkOrderStatus(index: number, status: OrderStatus) {
        const order = this.orderItems.nth(index);
        await expect(order).toContainText(status);
    }
    async cancelOrder(index: number) {
        this.page.once('dialog', dialog => dialog.accept());
        const order = this.orderItems.nth(index);
        await order.locator('button.btn-danger').click();
    }
    async checkOrderCancelled(index: number) {
        await this.checkOrderStatus(index, OrderStatus.Скасовано);
    }
    async checkAdminOrdersVisible() {
        await expect(this.adminOrdersList).toBeVisible();
    }
    async checkAdminOrderNumber(index: number) {
        const order = this.adminOrderItems.nth(index);
        await expect(order.locator('strong').first()).toBeVisible();
    }
    async checkAdminOrderUserEmail(index: number) {
        const order = this.adminOrderItems.nth(index);
        await expect(order.locator('span[style*="color:#666"]')).toBeVisible();
    }
    async checkAdminOrderDate(index: number) {
        const order = this.adminOrderItems.nth(index);
        await expect(order.locator('p:nth-child(2)')).toBeVisible();
    }
    async checkAdminOrderItems(index: number) {
        const order = this.adminOrderItems.nth(index);
        await expect(order.locator('p[style*="color:#555"]').first()).toBeVisible();
    }
    async checkAdminOrderTotal(index: number) {
        const order = this.adminOrderItems.nth(index);
        await expect(order.locator('strong').last()).toBeVisible();
    }
    async changeAdminOrderStatus(index: number, status: OrderStatus) {
        const order = this.adminOrderItems.nth(index);
        await order.locator('select').selectOption(status);
    }
    async checkAdminOrderStatus(index: number, status: OrderStatus) {
        const order = this.adminOrderItems.nth(index);
        await expect(order.locator('select')).toHaveValue(status);
    }
}