// Задание 1
const person = {
    name: "Альберт",
    age: 18,
    city: "Москва",
    profession: "Веб-разработчик",
    hobbies: ["программирование", "путешествия", "чтение"],
    isMarried: false
};

console.log(person);

// Задание 2
const greeter = {
    sayHello: function (name) {
        return `Привет "${name}"`;
    }
};

console.log(greeter.sayHello("Альберт"));
console.log(greeter.sayHello("Виталий"));

// Задание 3
const users = [
    { name: "Иван", isAdmin: true },
    { name: "Мария", isAdmin: false },
    { name: "Андрей", isAdmin: false },
    { name: "Ольга", isAdmin: true },
    { name: "Сергей", isAdmin: false }
];

let simpleUsersCount = 0;

for (let i = 0; i < users.length; i++) {
    if (!users[i].isAdmin) {
        simpleUsersCount++;
    }
}

console.log("Количество простых пользователей:", simpleUsersCount);