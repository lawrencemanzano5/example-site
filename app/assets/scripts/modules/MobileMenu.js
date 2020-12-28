class MobileMenu {
    // constructor function runs immediately when a new object is created with this class
    constructor() {
        /*
        //what not to do/spaghetti code example:
        document.querySelector(".site-header__menu-icon").addEventListener("click", function() {
            console.log("The top right icon was clicked");
        })
        //code above is throwing many different things into one statement
        */

        this.menuIcon = document.querySelector(".site-header__menu-icon");
        this.menuContent = document.querySelector(".site-header__menu-content");
        this.siteHeader = document.querySelector(".site-header");
        this.events();
    }

    events() {
        // addEventListener modifies the 'this' keyword to point toward the DOM element that was just clicked on.
        /* With the code below addEventListener is not receiving a direct reference to our 'toggleTheMenu' method, and instead we are passing addEventListener 
        an arrow function that it's going to call and then it's the arrow function that is actually going to execute 'toggleTheMenu'. */
        // Arrow functions do not manipulate the 'this' keyword, and so when the arrow function code runs the 'this' keyword will stil be pointing to our overall object.
        this.menuIcon.addEventListener("click", () => this.toggleTheMenu());
    }

    toggleTheMenu() {
        // toggles the specified class (provided as the string value) for the 'menuContent' DOM element.
        this.menuContent.classList.toggle("site-header__menu-content--is-visible");
        this.siteHeader.classList.toggle("site-header--is-expanded");
        this.menuIcon.classList.toggle("site-header__menu-icon--close-x");
    }
}

export default MobileMenu