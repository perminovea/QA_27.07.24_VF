import supertest from "supertest";
import config from "./config";
import { getBookstoreDataUser } from "./fixtures"
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

async function getUSerBook() {
    const testData = getBookstoreDataUser();
    const bookstore = new ReqBookstore(testData);
    const resUser = await bookstore.createUser();
    const userID = resUser.body.userID;
    const resToket = await bookstore.getToken();
    const testDataToken = resToket.body.token;
    const userBooK = {
        userName: testData.userName,
        password: testData.password,
        token: testDataToken,
        userID: userID
    };
    return userBooK;
}

export class ReqBookstoreBook {
    constructor() {
        this.url = config.url;
    }

    async init() {
        this.userBooK = await getUSerBook();
    }

    async final() {
        const bookstore = new ReqBookstore(this.userBooK);
        await bookstore.deleteUser(this.userBooK);
    }

    async getBooks() {
        const response = await supertest(this.url)
            .get('/BookStore/v1/Books')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${this.userBooK.token}`);
        const books = response.body.books;
        return books;
    }

    getBooksIsbn(books) {
        const booksIsbn = [];
        books.forEach(book => booksIsbn.push({ isbn: book.isbn }));
        return booksIsbn;
    }

    async addBooksUser(booksIsbn) {
        return await supertest(this.url)
            .post('/BookStore/v1/Books')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${this.userBooK.token}`)
            .send({
                userId: this.userBooK.userID,
                collectionOfIsbns: booksIsbn
            })

    }

    async updateBookUser(book, bookNew) {
        return await supertest(this.url)
            .put(`/BookStore/v1/Books/${ book.isbn}`)
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${this.userBooK.token}`)
            .send({ userId: this.userBooK.userID, isbn: bookNew.isbn })
    }

    async getBook(book) {
        return await supertest(this.url)
            .get(`/BookStore/v1/Book/`)
            .query({ ISBN: book.isbn })
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${this.userBooK.token}`)
    }
    async deleteBookUser(book) {
        return await supertest(this.url)
            .del(`/BookStore/v1/Book`)
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${this.userBooK.token}`)
            .send({ userId: this.userBooK.userID, isbn: book.isbn })
    }
}