function kolobok(character) {
    switch (character) {
        case 'дедушка':
            console.log("Я от дедушки ушёл")
            break
        case 'заяц':
            console.log("Я от зайца ушёл")
            break
        case 'лиса':
            console.log("Меня съели")
            break
        default:
            console.log("Такого персонажа нет")
    }
}
const characters = ['дедушка', 'заяц', 'лиса'];
characters.forEach(character => kolobok(character));

function newYear(character) {
    if (character === 'Дед Мороз' || character === 'Снегурочка')
        console.log(`${character}! ${character}! ${character}!`)
}
const charactersNew = ['Дед Мороз', 'Снегурочка'];
charactersNew.forEach(character => newYear(character));