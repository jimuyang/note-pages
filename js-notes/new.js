'use strict';

var arr = [1, 2, 3];

console.log(Object.prototype)

function Student(props) {
    this.name = props.name || 'Unnamed';
    this.age = props.age || 0;
}
Student.prototype.read = function () {
    console.log(this.name + ' can read');
}

var xiaoming = new Student({
    name: 'xiaoming', 
    age: 23
});
xiaoming.read();


// PrimaryStudent构造函数:
function PrimaryStudent(props) {
    Student.call(this, props);
    this.grade = props.grade || 1;
}

// 空函数F:
function F() {
}

// 把F的原型指向Student.prototype:
F.prototype = Student.prototype;

// 把PrimaryStudent的原型指向一个新的F对象，F对象的原型正好指向Student.prototype:
PrimaryStudent.prototype = new F();

// 把PrimaryStudent原型的构造函数修复为PrimaryStudent:
PrimaryStudent.prototype.constructor = PrimaryStudent;

// 继续在PrimaryStudent原型（就是new F()对象）上定义方法：
PrimaryStudent.prototype.getGrade = function () {
    return this.grade;
};

var xiaogang = new PrimaryStudent({
    name: 'xiaogang',
    age: 25,
    grade: 10
});

console.log(xiaogang.getGrade())





