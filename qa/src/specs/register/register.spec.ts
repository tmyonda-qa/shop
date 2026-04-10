import { test } from '../../fixtures/base.fixture';
import { UserFixture } from '../../fixtures/user.fixture';
import { Category } from '../../global/enums/category.enum';

test.describe('Register', () => {

    test('Register new user via UI', async ({ home }) => {
        const newUser = UserFixture.data();
        const bmwCard = {
            name: 'BMW',
            description: 'X5 G05',
            category: 'Автомобіль',
            price: '3240000 грн',
            stock: 'Залишок: 1 шт',
        };

        await home.homeNavPage.goto();
        await home.homeNavPage.clickRegistration();
        await home.signUpPage.fillForm(newUser);
        await home.signUpPage.clickSignUp();
        await home.signUpPage.checkSignUpSuccess();

        // Перевіряємо навігацію після реєстрації
        await home.homeNavPage.checkCatalogLabel();
        await home.homeNavPage.checkCartLabel();
        await home.homeNavPage.checkOrdersLabel();
        await home.homeNavPage.checkUserEmail(newUser.email);
        await home.homeNavPage.checkLogoutLabel();

        // Фільтруємо по категорії і перевіряємо карточку
        await home.catalogPage.filterByCategory(Category.Car);
        await home.catalogPage.card.checkName(bmwCard.name);
        await home.catalogPage.card.checkDescription(bmwCard.description);
        await home.catalogPage.card.checkCategory(bmwCard.category);
        await home.catalogPage.card.checkPrice(bmwCard.price);
        await home.catalogPage.card.checkStock(bmwCard.stock);
        await home.catalogPage.card.checkAddToCartButtonVisible();
    });

});