import supertest from "supertest";
import { ReqBookstore } from "../framework/services"
// import { getBookstoreUrl, getBookstoreUser } from "../src/api"

// const url = getBookstoreUrl(); ///swagger/#/

// async function reqBookstoreCreateUser(user) {
//     const res = await supertest(url)
//         .post('/Account/v1/User')
//         .set('Accept', 'application/json')
//         .send(user);
//     return res.body.userID;
// }

// async function reqBookstoreGenerateToken(user) {
//     const res = await supertest(url)
//         .post('/Account/v1/GenerateToken')
//         .set('Accept', 'application/json')
//         .send(user);
//     return res.body.token;
// }

// async function reqBookstoreAuthorizedUser(user) {
//     const res = await supertest(url)
//         .post('/Account/v1/Authorized')
//         .set('Accept', 'application/json')
//         .send(user);
//     console.lo
//     expect(res.status).toEqual(200);
// }



describe('libraries for testing', () => {

    describe('Bookstore authorization', () => {
        test('Метод должен существовать', async() => {
            const bookstore = new ReqBookstore({});
            const res = await bookstore.authorized({ token: "" });
            // supertest(url)
            //     .post('/Account/v1/Authorized')
            //     .send({})

            expect(res.status).not.toEqual(404);
        })

        // test('Авторизация не должна проходить с правильным логином и паролем без генерации токена', async() => {
        //     const user = getBookstoreUser();
        //     await reqBookstoreCreateUser(user);
        //     const res = await supertest(url)
        //         .post('/Account/v1/Authorized')
        //         .set('Accept', 'application/json')
        //         .send(user)
        //     expect(res.status).toEqual(200);
        //     expect(res.body).toEqual(false);
        // })

        // test('Авторизация должна проходить успешно с правильным логином и паролем', async() => {
        //     const user = getBookstoreUser();
        //     await reqBookstoreCreateUser(user);
        //     await reqBookstoreGenerateToken(user);
        //     const res = await supertest(url)
        //         .post('/Account/v1/Authorized')
        //         .set('Accept', 'application/json')
        //         .send(user)
        //     expect(res.status).toEqual(200);
        //     expect(res.body).toEqual(true);
        // })

        // test('Авторизация должна возвращать статус с кодом ошибки если логин неверный', async() => {
        //     const user = getBookstoreUser({
        //         userName: ""
        //     });
        //     await reqBookstoreGenerateToken(user);
        //     const res = await supertest(url)
        //         .post('/Account/v1/Authorized')
        //         .set('Accept', 'application/json')
        //         .send(user)
        //     expect(res.status).toEqual(400);
        //     expect(res.body.message).toEqual('UserName and Password required.')
        // })

        // test('Авторизация должна возвращать статус с кодом ошибки если пароль неверный', async() => {
        //     const user = getBookstoreUser();
        //     await reqBookstoreCreateUser(user);
        //     await reqBookstoreGenerateToken(user);
        //     user.password = "1dt";
        //     const res = await supertest(url)
        //         .post('/Account/v1/Authorized')
        //         .set('Accept', 'application/json')
        //         .send(user)
        //     expect(res.status).toEqual(404);
        //     expect(res.body.message).toEqual('User not found!')
        // })

        // test('Авторизация пользователь не найден', async() => {
        //     const user = getBookstoreUser();
        //     const res = await supertest(url)
        //         .post('/Account/v1/Authorized')
        //         .set('Accept', 'application/json')
        //         .send(user)
        //     expect(res.status).toEqual(404);
        //     expect(res.body.message).toEqual('User not found!')
        // })
    })

    // describe('Bookstore delete user', () => {
    //     test('Метод должен существовать', async() => {
    //         const res = await supertest(url)
    //             .delete('/Account/v1/User/45')
    //             .set('Accept', 'application/json')
    //             .send({});
    //         expect(res.status).not.toEqual(404);
    //     })

    //     test('Пользователь удален', async() => {
    //         const user = getBookstoreUser();
    //         const userID = await reqBookstoreCreateUser(user);
    //         await reqBookstoreGenerateToken(user);
    //         const token = await reqBookstoreAuthorizedUser(user);
    //         console.log("1", user, userID)
    //         const res = await supertest(url)
    //             .delete(`/Account/v1/User/${Number(userID)}`)
    //             .set('Authorization', 'Bearer ' + token)
    //             .send(user);
    //         console.log(res)
    //         expect(res.status).toEqual(200);
    //     })
    // })
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