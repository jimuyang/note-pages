'use strict';

var arr = [1, 2, 3];

console.log(Object.prototype)

function Student(name, age) {
    this.name = name;
    this.age = age;
}

Student.prototype.read = function () {
    console.log(this.name + ' can read');
}

var xiaoming = new Student('xiaoming', 23);

xiaoming.read();


