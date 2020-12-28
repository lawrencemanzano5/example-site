// Class syntax
class Person {
    constructor(name, favoriteColor) {
        this.name = name;
        this.favoriteColor = favoriteColor;
    }

    greet() {
        console.log("Hello, my name is " + this.name + " and my favorite color is " + this.favoriteColor);
    }
}

// Allows us to choose what this file will export if another file tries to import this file (in this case, we are exporting the Person function 
// which is what will be used if another file imports this file)
export default Person