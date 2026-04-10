import { Page } from "@playwright/test";
import { LoginPage } from "../modules/login/login.page";
import { SignUpPage } from "../modules/login/sign-up.page";
import { CatalogPage } from "../modules/catalog/catalog.page";
import { CartPage } from "../modules/cart/cart.page";
import { OrdersPage } from "../modules/orders/orders.page";
import { HomeNavPage } from "../modules/home/home-nav.page";

export class Home {
    readonly page: Page;
    readonly homeNavPage: HomeNavPage;
    readonly loginPage: LoginPage;
    readonly signUpPage: SignUpPage;
    readonly catalogPage: CatalogPage;
    readonly cartPage: CartPage;
    readonly ordersPage: OrdersPage;

    constructor(page: Page) {
        this.page = page;
        this.homeNavPage = new HomeNavPage(page);
        this.loginPage = new LoginPage(page);
        this.signUpPage = new SignUpPage(page);
        this.catalogPage = new CatalogPage(page);
        this.cartPage = new CartPage(page);
        this.ordersPage = new OrdersPage(page);
    }
}