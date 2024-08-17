function kolobok(character) {
    let action;
    switch (character) {
        case 'дедушка':
            action = "Я от дедушки ушёл";
            break
        case 'заяц':
            action = "Я от зайца ушёл";
            break
        case 'лиса':
            action = "Меня съели";
            break
        default:
            console.log("Такого персонажа нет")
    }
    return action;
}
const characters = ['дедушка', 'заяц', 'лиса'];
characters.forEach(character => console.log(kolobok(character)));

function newYear(character) {
    if (character === 'Дед Мороз' || character === 'Снегурочка')
        return `${character}! ${character}! ${character}!`;
}
const charactersNew = ['Дед Мороз', 'Снегурочка'];
charactersNew.forEach(character => console.log(newYear(character)));