import { test as base } from '@playwright/test';
import { Home } from '../global/home';

type MyFixtures = {
    home: Home;
};

export const test = base.extend<MyFixtures>({
    home: async ({ page }, use) => {
        await use(new Home(page));
    },
});

export { expect } from '@playwright/test';