import config from "../apiconfig.json";

function weightedRandom(maximum, numberRandoms) {
    let result = 0;
    for (let i = 0; i < numberRandoms; ++i)
        result += Math.random() * (maximum / numberRandoms);
    return result;
}

export function getBookstoreUser(data) {
    let user = {...config.basic_user };
    user.userName = user.userName + weightedRandom(1, 1000);
    user.password = user.password;
    if (data) {
        if (data.userName != undefined) user.userName = data.userName;
        if (data.password != undefined) user.password = data.password;
    }
    return user;
}

export function getBookstoreUrl() {
    return config.base_url;
}