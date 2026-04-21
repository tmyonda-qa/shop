# Shop API

Онлайн магазин на ASP.NET Core 9 з PostgreSQL.

## Технологічний стек
- **Backend**: C# ASP.NET Core 9
- **Database**: PostgreSQL + Entity Framework Core
- **Auth**: JWT токени
- **Docs**: Swagger (OpenAPI)
- **Logging**: Serilog
- **Testing**: xUnit, Playwright (TypeScript)

## Запуск проекту

### Бекенд
Встанови залежності і запусти:
cd Shop.API
dotnet run

API: http://localhost:5088
Swagger: http://localhost:5088/swagger

### Фронтенд
Відкрий Shop.Frontend/index.html в браузері.

## Структура проекту
- Shop.API - Бекенд ASP.NET Core
- Shop.Frontend - HTML/JS фронтенд
- Shop.Tests - Unit + Integration тести
- Shop.E2E - E2E тести C# Playwright
- qa - E2E тести TypeScript Playwright

## API Endpoints

### Auth
- POST /api/Auth/register - реєстрація
- POST /api/Auth/login - вхід
- POST /api/Auth/register-admin - реєстрація адміна (Admin only)

### Products
- GET /api/Products - список товарів
- GET /api/Products/{id} - товар по id
- POST /api/Products - створити (Admin only)
- PUT /api/Products/{id} - оновити (Admin only)
- DELETE /api/Products/{id} - видалити (Admin only)

### Cart
- GET /api/Cart - кошик
- POST /api/Cart - додати товар
- PUT /api/Cart/{id} - змінити кількість
- DELETE /api/Cart/{id} - видалити

### Orders
- GET /api/Orders - замовлення користувача
- POST /api/Orders/checkout - оформити замовлення
- GET /api/Orders/all - всі замовлення (Admin only)
- PUT /api/Orders/{id}/status - змінити статус (Admin only)
- DELETE /api/Orders/{id} - скасувати замовлення

## Ролі
- Client - перегляд каталогу, кошик, замовлення
- Admin - управління товарами, всі замовлення, статуси

## Тестування
cd Shop.Tests && dotnet test
cd Shop.E2E && dotnet test
cd qa && npx playwright test --ui