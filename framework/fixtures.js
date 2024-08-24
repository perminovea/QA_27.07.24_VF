import config from "./config";

function weightedRandom(maximum, numberRandoms) {
    let result = 0;
    for (let i = 0; i < numberRandoms; ++i)
        result += Math.random() * (maximum / numberRandoms);
    return result;
}

export function getBookstoreDataUser(data) {
    let user = {...config.user };
    user.userName = user.userName + weightedRandom(1, 1000);
    user.password = user.password;
    if (data) {
        if (data.userName != undefined) user.userName = data.userName;
        if (data.password != undefined) user.password = data.password;
    }
    return user;
}