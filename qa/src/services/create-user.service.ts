import { UserData } from "../fixtures/user.fixture";

export class UserApiService {
    private baseUrl = 'http://localhost:5088/api';

    async register(user: UserData): Promise<{ token: string; email: string; role: string }> {
        const response = await fetch(`${this.baseUrl}/Auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: user.email,
                password: user.password,
            }),
        });

        if (!response.ok) {
            const text = await response.text();
            throw new Error(`Failed to register user: ${response.status}, ${text}`);
        }

        return response.json();
    }

    async login(user: UserData): Promise<{ token: string; email: string; role: string }> {
        const response = await fetch(`${this.baseUrl}/Auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: user.email,
                password: user.password,
            }),
        });

        if (!response.ok) {
            const text = await response.text();
            throw new Error(`Failed to login: ${response.status}, ${text}`);
        }

        return response.json();
    }
}
