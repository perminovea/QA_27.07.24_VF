const scores = {
    Anna: 10,
    Olga: 1,
    Ivan: 5,
};
/**
 * Возвращает в ответ сумму всех баллов
 *
 * @param {*} data F
 * @return {*} 
 */
function getScore(data) {
    let listPerson = Object.keys(data);
    let sAll = 0;
    listPerson.forEach(name => sAll = sAll + data[name]);
    console.log(sAll);
    return sAll;
}
getScore(scores);