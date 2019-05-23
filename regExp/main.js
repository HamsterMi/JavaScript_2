// Задание№1
const TEXT_1 =
  "'Куда? Уж эти мне поэты!''Прощай, Онегин, мне пора'.'Я не держу тебя, но где ты Свои проводишь вечера?''У Лариных'. – 'Вот это чудно.Помилуй! И тебе не трудно Там каждый вечер убивать?'–'Нимало'.–'Не могу понять'.";

const REGEXP_1 = /\'/g;
const RESULT_1 = TEXT_1.replace(REGEXP_1, '"');
console.log(RESULT_1);

//Задание№2
const TEXT_2 = 'You\'re new here, aren\'t you?';
const REGEXP_2 = /'\B|\B'/g;
const RESULT_2 = TEXT_2.replace(REGEXP_2, '"');
console.log(RESULT_2)

