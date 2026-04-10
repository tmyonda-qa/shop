# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: login/login.spec.ts >> Login >> Login as admin and check catalog
- Location: src/specs/login/login.spec.ts:7:9

# Error details

```
Error: page.click: Target page, context or browser has been closed
Call log:
  - waiting for locator('a[onclick="showPage(\'login\')"]')

```

# Test source

```ts
  1  | import { expect, Page } from "@playwright/test";
  2  | import { UserData } from "../../fixtures/user.fixture";
  3  | 
  4  | export class LoginPage {
  5  |     constructor(private page: Page) {}
  6  | 
  7  |     private emailInput = this.page.locator('#login-email');
  8  |     private passwordInput = this.page.locator('#login-password');
  9  |     private loginButton = this.page.locator('form[onsubmit="loginUser(event)"] button[type="submit"]');
  10 |     private successMessage = this.page.locator('[data-test="message-success"]');
  11 |     private errorMessage = this.page.locator('[data-test="message-error"]');
  12 |     async goto() {
> 13 |         await this.page.click('a[onclick="showPage(\'login\')"]');
     |                         ^ Error: page.click: Target page, context or browser has been closed
  14 |     }
  15 | 
  16 |     async login(emailOrUser: string | UserData, password?: string) {
  17 |         let email: string;
  18 |         let pass: string;
  19 | 
  20 |         if (typeof emailOrUser === 'string') {
  21 |             email = emailOrUser;
  22 |             pass = password!;
  23 |         } else {
  24 |             email = emailOrUser.email;
  25 |             pass = emailOrUser.password;
  26 |         }
  27 | 
  28 |         await this.emailInput.fill(email);
  29 |         await this.passwordInput.fill(pass);
  30 |         await this.loginButton.click();
  31 |     }
  32 | 
  33 |     async checkLoginSuccess() {
  34 |         await expect(this.successMessage).toBeVisible();
  35 |     }
  36 | 
  37 |     async checkLoginError() {
  38 |         await expect(this.errorMessage).toBeVisible();
  39 |     }
  40 | }
```