import '../styles/styles.css'
// import Person from './modules/Person'

if (module.hot) {
    module.hot.accept();
}

/* 
//OOP example starts below:

// new Adult class that inherits everything from the Person class
class Adult extends Person {
    payTaxes() {
        console.log(this.name + " now owes zero taxes.");
    }
}

// new instance of Person
var john = new Person("John Doe", "purple");
john.greet();

// new instance of Adult
var jane = new Adult("Jane Smith", "green");
jane.greet();
jane.payTaxes();
*/