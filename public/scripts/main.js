class Person {
  constructor (name) {
    this.name = name;
  }
  greet () {
    return "Hello, I'm " + this.name + '!';
  }
}

const person = new Person('Zilong');
const greetHTML = templates['greeting']({
  message: person.greet()
});

document.write(greetHTML);
