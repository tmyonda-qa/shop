import { faker } from '@faker-js/faker';
import * as dotenv from 'dotenv';
dotenv.config();
export interface UserData {
    email: string;
    password: string;
}

export class UserFixture {
    static data(): UserData {
        return {
            email: faker.internet.email(),
            password: process.env.USER_PASSWORD as string,
        };
    }

    static adminData(): UserData {
        return {
            email: process.env.ADMIN_EMAIL as string,
            password: process.env.ADMIN_PASSWORD as string,
        };
    }
}