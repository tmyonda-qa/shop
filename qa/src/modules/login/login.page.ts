import { expect, Page } from "@playwright/test";
import { UserData } from "../../fixtures/user.fixture";

export class LoginPage {
    constructor(private page: Page) {}

    private emailInput = this.page.locator('#login-email');
    private passwordInput = this.page.locator('#login-password');
    private loginButton = this.page.locator('form[onsubmit="loginUser(event)"] button[type="submit"]');
    private successMessage = this.page.locator('[data-test="message-success"]');
    private errorMessage = this.page.locator('[data-test="message-error"]');
    async goto() {
        await this.page.click('a[onclick="showPage(\'login\')"]');
    }
    async login(emailOrUser: string | UserData, password?: string) {
        let email: string;
        let pass: string;

        if (typeof emailOrUser === 'string') {
            email = emailOrUser;
            pass = password!;
        } else {
            email = emailOrUser.email;
            pass = emailOrUser.password;
        }

        await this.emailInput.fill(email);
        await this.passwordInput.fill(pass);
        await this.loginButton.click();
    }
    async checkLoginSuccess() {
        await expect(this.successMessage).toBeVisible();
    }
    async checkLoginError() {
        await expect(this.errorMessage).toBeVisible();
    }
}