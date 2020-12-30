import '../styles/styles.css'
import 'lazysizes'
import MobileMenu from './modules/MobileMenu'
import RevealOnScroll from './modules/RevealOnScroll'
import StickyHeader from './modules/StickyHeader'

new StickyHeader();
new RevealOnScroll(document.querySelectorAll(".feature-item"), 75);
new RevealOnScroll(document.querySelectorAll(".testimonial"), 60);
new MobileMenu();
let modal;

document.querySelectorAll(".open-modal").forEach(el => {
    el.addEventListener("click", e => {
        // We are preventing the default because the normal behaviour for an 'a' HTML element with an href value of '#' will scroll the page to the top
        e.preventDefault();

        if (typeof modal == "undefined") {
            /* 
            Statement below returns a promise meaning we don't know how long it will take to complete but once it does finish loading the file, we want to actually 
            use it to create a new instance of the class. 
            The function inside then() executes upon a successful import, otherwise the function inside the catch() executes. 
            Comment tag before the string path adds a desired prefix (in this case, "modal") to the name of the added/imported JS file as seen in the DevTools Networks tab. 
            */          
            import(/* webpackChunkName: "modal" */ './modules/Modal').then(x => {
                // Creates new instance of our Modal class
                modal = new x.default();
                setTimeout(() => modal.openTheModal(), 20)
            }).catch(() => console.log("There was a problem."))
        } else {
            modal.openTheModal();
        } 
    })
})

if (module.hot) {
    module.hot.accept();
}