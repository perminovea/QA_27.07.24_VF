import { expect, describe, test } from '@jest/globals';

// Создание пользователя c ошибкой, логин уже используется
// Создание пользователя c ошибкой, пароль не подходит
// Создание пользователя успешно
// Генерация токена c ошибкой
// Генерация токена успешно


describe.skip('bookstore api', () => {
    const baseUrl = "https://bookstore.demoqa.com";

    function weightedRandom(maximum, numberRandoms) {
        let result = 0;
        for (let i = 0; i < numberRandoms; ++i)
            result += Math.random() * (maximum / numberRandoms);
        return result;
    }
    async function createUser(data) {
        return await fetch(`${baseUrl}/Account/v1/User`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        })
    }
    async function authorized(data) {
        return await fetch(`${baseUrl}/Account/v1/Authorized`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        })
    }
    async function generateToken(data) {
        return await fetch(`${baseUrl}/Account/v1/GenerateToken`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        })
    }

    test('Create User. Success login', async() => {
        const user = {
            userName: "kminchelle" + weightedRandom(1, 1000),
            password: "0lelplR@" + weightedRandom(1, 1000)
        };
        const response = await createUser(user)
        expect(response.status).toEqual(201)
        const data = await response.json()
        expect(data.username).toBe(user.userName)
        expect(data.userID).toBeTruthy()
    })

    test('Create User fail. Used login', async() => {
        const user = {
            userName: "kminchelle",
            password: "0lelplR@"
        };
        await createUser(user);
        const response = await createUser(user);
        expect(response.status).toEqual(406);
        const data = await response.json();
        expect(data.message).toBe('User exists!');
    })

    test('Create User fail. rror password', async() => {
        const user = {
            userName: "kminchelle" + weightedRandom(1, 1000),
            password: "1"
        };
        const response = await createUser(user);
        expect(response.status).toEqual(400)
        const data = await response.json()
        expect(data.message).toBe("Passwords must have at least one non alphanumeric character, one digit ('0'-'9'), one uppercase ('A'-'Z'), one lowercase ('a'-'z'), one special character and Password must be eight characters or longer.")
    })

    test('Success GenerateToken', async() => {
        const user = {
            userName: "kminchelle" + weightedRandom(1, 1000),
            password: "0lelplR@" + weightedRandom(1, 1000)
        };
        const responseUser = await createUser(user);
        expect(responseUser.status).toEqual(201)
        const resposeAuth = await authorized(user);
        expect(resposeAuth.status).toEqual(200)
        const reponseToken = await generateToken(user);
        expect(reponseToken.status).toEqual(200);
        const data = await reponseToken.json();
        expect(data.token).not.toBe(null)
    })

    test('Error GenerateToken', async() => {
        const user = {
            userName: "kminchelle" + weightedRandom(1, 1000),
            password: "0lelplR@" + weightedRandom(1, 1000)
        };
        const reponseToken = await generateToken(user);
        expect(reponseToken.status).toEqual(200);
        const data = await reponseToken.json();
        expect(data.token).toBe(null)
    })
})