class Person {
  constructor (name) {
    this.name = name;
  }
  greet () {
    return "Hello, I'm " + this.name + '!';
  }
}

const person = new Person('Zilong');

document.write(person.greet());
