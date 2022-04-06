// Tipado
const suma = (a: number, b: number) => {
  return a + b;
};

// suma("12", "12"); ERROR
suma(12, 22);

const myName = 'Mateo';
const myAge = 22;

class Person {
  constructor(
    private age: number,
    private name: string,
    private document: string,
    public job: string,
  ) {}

  getSummary() {
    return `my name is ${this.name} and my age is ${this.age}`;
  }
}

const USER = new Person(myAge, myName, '1124658992', 'Junior Dev');
