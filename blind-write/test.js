var obj = {
    length: 3,

    0: 1,
    2: 'xiaoming',
    hello: function() {

    }

}

var arrayLike = {
    0: 1,
    1: 3,
    length: 2
}

// console.log(Array.from(obj));
// Array.prototype.push.call(obj, 'push');
// obj.push('hello');
// console.log(obj);



function Student(name, age) {
    this.name = name;
    this.age = age;
}

Student.prototype.study = () => console.log("i love study");
Student.prototype.learn = () => console.log('i love learning');

var xiaoming = new Student('xiaoming', 10);
xiaoming.study();
xiaoming.learn();

