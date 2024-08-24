import supertest from "supertest";
import config from "./config";
export class ReqBookstore {
    constructor(dataUser) {
        this.dataUser = {
            userName: dataUser.userName,
            password: dataUser.password
        };
        this.url = config.url;
    }

    async createUser() {
        return await supertest(this.url)
            .post('/Account/v1/User')
            .set('Accept', 'application/json')
            .send(this.dataUser)
    }

    async getToken() {
        return await supertest(this.url)
            .post('/Account/v1/GenerateToken')
            .set('Accept', 'application/json')
            .send(this.dataUser)
    }

    async authorized(data) {
        const dataUser = this.dataUser;
        if (data.userName != undefined) dataUser.userName = data.userName;
        if (data.password != undefined) dataUser.password = data.password;
        return await supertest(this.url)
            .post('/Account/v1/Authorized')
            .set('Accept', 'application/json')
            .set('Authorization', 'Bearer ' + data.token)
            .send(dataUser)
    }

    async getUserInf(data) {
        return await supertest(this.url)
            .get(`/Account/v1/User/${data.userID}`)
            .set('Accept', 'application/json')
            .set('Authorization', 'Bearer ' + data.token)
            .send(this.dataUser)
    }

    async deleteUser(data) {
        return await supertest(this.url)
            .del(`/Account/v1/User/${data.userID}`)
            .set('Accept', 'application/json')
            .set('Authorization', 'Bearer ' + data.token)
            .send(this.dataUser)
    }

}