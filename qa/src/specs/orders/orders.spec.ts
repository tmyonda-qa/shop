import { test } from '../../fixtures/base.fixture';
import { UserFixture } from '../../fixtures/user.fixture';
import { UserApiService } from '../../services/create-user.service';
import { OrderStatus } from '../../global/enums/order-status.enum';
import { Category } from '../../global/enums/category.enum';
import { getTodayDate } from '../../global/helpers/date.helper';

test.describe('Orders', () => {

    test('Full flow - user creates order and admin verifies it', async ({ home }) => {
        const newUser = UserFixture.data();
        const userApi = new UserApiService();
        await userApi.register(newUser);
        const bmwCard = {
            name: 'BMW',
            description: 'X5 G05',
            category: 'Автомобіль',
            price: '3240000 грн',
            stock: 'Залишок: 1 шт',
        };
        
        // Логін як новий користувач через UI
        await home.homeNavPage.goto();
        await home.homeNavPage.clickLogin();
        await home.loginPage.login(newUser);
        await home.loginPage.checkLoginSuccess();

        // Перевіряємо каталог і фільтруємо по категорії Автомобіль
        await home.catalogPage.filterByCategory(Category.Car);
        await home.catalogPage.card.checkName(bmwCard.name);
        await home.catalogPage.checkProductsVisible();

        // Додаємо BMW в кошик
        await home.catalogPage.card.addToCart();
        await home.cartPage.checkCheckoutSuccess();
        await home.cartPage.closeSuccessMessage();
        await home.catalogPage.checkAddToCartSuccess();

        // Переходимо в кошик і оформляємо замовлення
        await home.homeNavPage.clickCart();
        await home.cartPage.checkCartVisible();
        await home.cartPage.checkout();
        await home.cartPage.checkCheckoutSuccess();

        // Переходимо в замовлення і перевіряємо
        await home.homeNavPage.clickOrders();
        await home.ordersPage.checkOrdersVisible();
        await home.ordersPage.checkOrderNumber(0);
        await home.ordersPage.checkOrderDate(0);
        await home.ordersPage.checkOrderItems(0);
        await home.ordersPage.checkOrderTotal(0);
        await home.ordersPage.checkOrderStatus(0, OrderStatus.Pending);
        await home.cartPage.closeSuccessMessage();


        // Розлогінюємось
        await home.homeNavPage.clickLogout();

        // Логін як адмін
        const admin = UserFixture.adminData();
        await home.homeNavPage.clickLogin();
        await home.loginPage.login(admin);
        await home.loginPage.checkLoginSuccess();
        await home.page.waitForTimeout(5000);

        // Перевіряємо замовлення клієнта в адмін панелі
        await home.homeNavPage.checkCatalogLabel();
        await home.homeNavPage.checkCartLabel();
        await home.homeNavPage.checkAdminLabel();
        await home.homeNavPage.checkUserEmail(admin.email);

        await home.homeNavPage.clickOrders();
        await home.ordersPage.checkAdminOrderUserEmailText(0,newUser.email);
        await home.ordersPage.checkAllClientOrdersTitle();
        await home.ordersPage.checkAdminOrderDateText(0,newUser.email, getTodayDate());
    });

});