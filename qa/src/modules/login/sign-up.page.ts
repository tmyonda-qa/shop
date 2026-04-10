import { expect, Page } from "@playwright/test";
import { UserData } from "../../fixtures/user.fixture";

export class SignUpPage {
    constructor(private page: Page) {}

    private form = this.page.locator('[data-test="registration-page"]');
    private emailInput = this.form.locator('[data-test="email"]');
    private passwordInput = this.form.locator('[data-test="password"]');
    private signUpButton = this.form.locator('[data-test="Register"]');
    private successMessage = this.page.locator('[data-test="message-success"]');
    private errorMessage = this.page.locator('[data-test="message-error"]');

    async fillEmail(email: string) {
        await this.emailInput.fill(email);
    }
    async fillPassword(password: string) {
        await this.passwordInput.fill(password);
    }
    async clickSignUp() {
        await this.signUpButton.click();
    }
    async fillForm(data: UserData) {
        await this.fillEmail(data.email);
        await this.fillPassword(data.password);
    }
    async checkSignUpSuccess() {
        await expect(this.successMessage).toBeVisible();
    }
    async checkSignUpError() {
        await expect(this.errorMessage).toBeVisible();
    }
}