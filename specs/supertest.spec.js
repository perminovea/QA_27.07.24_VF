import { expect, describe, test } from '@jest/globals';
import { ReqBookstore } from "../framework/services"
import { getBookstoreDataUser } from "../framework/fixtures"



describe('libraries for testing', () => {

    describe('Bookstore authorization', () => {
        test('Метод должен существовать', async() => {
            const bookstore = new ReqBookstore({});
            const res = await bookstore.authorized({ token: "" });
            expect(res.status).not.toEqual(404);
        })


        test('Авторизация с правильным логином и паролем', async() => {
            const testData = getBookstoreDataUser();
            const bookstore = new ReqBookstore(testData);
            await bookstore.createUser();
            const resToket = await bookstore.getToken();
            const testDataToken = resToket.body.token;
            const resAuth = await bookstore.authorized({ token: testDataToken });
            expect(resAuth.status).toEqual(200);
            expect(resAuth.body).toEqual(true);
        })

        test('Авторизация c неверным логином', async() => {
            const testData = getBookstoreDataUser();
            const bookstore = new ReqBookstore(testData);
            await bookstore.createUser();
            const resToket = await bookstore.getToken();
            const testDataToken = resToket.body.token;
            const resAuth = await bookstore.authorized({ token: testDataToken, userName: "" });
            expect(resAuth.status).toEqual(400);
            expect(resAuth.body.message).toEqual('UserName and Password required.')
        })

        test('Авторизация с неверным паролем', async() => {
            const testData = getBookstoreDataUser();
            const bookstore = new ReqBookstore(testData);
            await bookstore.createUser();
            const resToket = await bookstore.getToken();
            const testDataToken = resToket.body.token;
            const resAuth = await bookstore.authorized({ token: testDataToken, password: testData.password + 1 });
            expect(resAuth.status).toEqual(404);
            expect(resAuth.body.message).toEqual('User not found!')
        })
    })

    describe('Bookstore delete user', () => {
        test('Метод должен существовать', async() => {
            const bookstore = new ReqBookstore({});
            const resDelete = await bookstore.deleteUser({ userID: "" });
            expect(resDelete.status).not.toEqual(404);
        })

        test('Удаление пользователя', async() => {
            const testData = getBookstoreDataUser();
            const bookstore = new ReqBookstore(testData);
            const resUser = await bookstore.createUser();
            const userID = resUser.body.userID;
            const resToket = await bookstore.getToken();
            const testDataToken = resToket.body.token;
            await bookstore.authorized({ token: testDataToken });
            const resDelete = await bookstore.deleteUser({ token: testDataToken, userID: userID });
            expect(resDelete.status).toEqual(204);
        })

        test('Удаление пользователя с некорректным userID', async() => {
            const testData = getBookstoreDataUser();
            const bookstore = new ReqBookstore(testData);
            const resUser = await bookstore.createUser();
            const userID = resUser.body.userID;
            const resToket = await bookstore.getToken();
            const testDataToken = resToket.body.token;
            await bookstore.authorized({ token: testDataToken });
            const resDelete = await bookstore.deleteUser({ token: testDataToken, userID: userID + 1 });
            expect(resDelete.status).toEqual(200);
            expect(resDelete.body.message).toEqual('User Id not correct!');
        })
    })

    describe('Bookstore get info user', () => {
        test('Метод должен существовать', async() => {
            const bookstore = new ReqBookstore({});
            const resUserInform = await bookstore.getUserInf({ userID: "", token: "" });
            expect(resUserInform.status).not.toEqual(404);
        })

        test('Получение информации о пользователе', async() => {
            const testData = getBookstoreDataUser();
            const bookstore = new ReqBookstore(testData);
            const resUser = await bookstore.createUser();
            const userID = resUser.body.userID;
            const resToket = await bookstore.getToken();
            const testDataToken = resToket.body.token;
            await bookstore.authorized({ token: testDataToken });
            const resUserInform = await bookstore.getUserInf({ userID: userID, token: testDataToken });
            expect(resUserInform.status).toEqual(200);
            expect(resUserInform.body.userId).toEqual(userID);
            expect(resUserInform.body.username).toEqual(testData.userName);
            expect(resUserInform.body.books).toEqual([]);
        })

        test('Получение информации о пользователе c несуществующим userID', async() => {
            const testData = getBookstoreDataUser();
            const bookstore = new ReqBookstore(testData);
            const resUser = await bookstore.createUser();
            const userID = resUser.body.userID;
            const resToket = await bookstore.getToken();
            const testDataToken = resToket.body.token;
            await bookstore.authorized({ token: testDataToken });
            const resUserInform = await bookstore.getUserInf({ userID: userID + 1, token: testDataToken });
            expect(resUserInform.status).toEqual(401);
            expect(resUserInform.body.message).toEqual('User not found!');
        })

        test('Получение информации другого пользователя', async() => {
            const testData1 = getBookstoreDataUser();
            const bookstore1 = new ReqBookstore(testData1);
            const resUser1 = await bookstore1.createUser();
            const userID1 = resUser1.body.userID;
            const testData2 = getBookstoreDataUser();
            const bookstore2 = new ReqBookstore(testData2);
            await bookstore2.createUser();
            const resToket2 = await bookstore2.getToken();
            const testDataToken2 = resToket2.body.token;
            await bookstore2.authorized({ token: testDataToken2 });
            const resUserInform = await bookstore2.getUserInf({ userID: userID1, token: testDataToken2 });
            expect(resUserInform.status).toEqual(401);
            expect(resUserInform.body.message).toEqual('User not authorized!');
        })
    })
})

/* 
export async function reqBookstoreCreateUser(data) {
    return await fetch(`${baseUrl}/Account/v1/User`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    })
}

export async function reqBookstoreDeleteUser(userId) {
    return await fetch(`${baseUrl}/Account/v1/User/${userId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    })
}

export async function reqBookstoreAuthorized(data) {
    return await fetch(`${baseUrl}/Account/v1/Authorized`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
}

export async function reqBookstoreGenerateToken(data) {
    return await fetch(`${baseUrl}/Account/v1/GenerateToken`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    })
} */