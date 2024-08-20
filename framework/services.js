import supertest from "supertest";
import config from "./config";
import { getBookstoreDataUser } from "./fixtures"
console.log("config", config)
export class ReqBookstore {
    // методы класса
    constructor(dataUser) {
        this.dataUser = {
            userName: dataUser.userName,
            password: dataUser.password
        };
        this.url = config.url;
    }

    async createUser() {
        await supertest(this.url)
            .post('/Account/v1/User')
            .set('Accept', 'application/json')
            .send(this.dataUser)
    }

    async getToken() {
        await supertest(this.url)
            .post('/Account/v1/GenerateToken')
            .set('Accept', 'application/json')
            .send(this.dataUser)
    }

    async authorized(data) {
        return await supertest(this.url)
            .post('/Account/v1/Authorized')
            .set('Accept', 'application/json')
            .set('Authorization', 'Bearer ' + data.token)
            .send(this.dataUser)
    }

    async getUserInf(data) {
        await supertest(this.url)
            .get(`/Account/v1/User/${data.userID}`)
            .set('Accept', 'application/json')
            .set('Authorization', 'Bearer ' + data.token)
            .send(this.dataUser)
    }

    async deleteUser(data) {
        await supertest(this.url)
            .del(`/Account/v1/User/${data.userID}`)
            .set('Accept', 'application/json')
            .set('Authorization', 'Bearer ' + data.token)
            .send(this.dataUser)
    }

}

// user.userName = user.userName + weightedRandom(1, 1000);
// user.password = user.password;

// const url = config.url; ///swagger/#/

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