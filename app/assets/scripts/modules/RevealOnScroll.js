import throttle from 'lodash/throttle'
import debounce from 'lodash/debounce'

class RevealOnScroll {
    constructor(els, thresholdPercent) {
        this.thresholdPercent = thresholdPercent;
        this.itemsToReveal = els;
        this.browserHeight = window.innerHeight;
        this.hideInitially();

        // lodash throttle tool that only allows the calcCaller function to run once every 200ms
        this.scrollThrottle = throttle(this.calcCaller, 200).bind(this);
        this.events();
    }

    events() {
        window.addEventListener("scroll", this.scrollThrottle);

        /* lodash debounce tool that only executes the arrow function code whenever the user resizes the browser THEN waits at least 333ms; otherwise the arrow function does
           not execute until then */
        window.addEventListener("resize", debounce(() => {
            console.log("Resize just ran");
            this.browserHeight = window.innerHeight;
        }, 333));
    }

    calcCaller() {
        console.log("Scroll function ran");
        this.itemsToReveal.forEach(el => {
            if (el.isRevealed == false) {
                this.calculateIfScrolledTo(el);
            }
        })
    }

    calculateIfScrolledTo(el) {
        // Only executes the code inside once the top edge of the el element has crossed the bottom threshold of the browser
        if (window.scrollY + this.browserHeight > el.offsetTop) {
            console.log("Element was calculated")

            /* getBoundingClientRect().y function measures how far the top edge of an element is from the the top edge of the current bounding rectangle 
            which in this case is the browser's viewport */
            let scrollPercent = (el.getBoundingClientRect().y / this.browserHeight) * 100;

            /* If the top edge of the initially hidden element reaches the 75% point of the viewport height (where the the top of the viewport is 0% and the bottom is 100%)
            then reveal them via class addition */
            if (scrollPercent < this.thresholdPercent) {
                el.classList.add("reveal-item--is-visible");
                el.isRevealed = true;

                /* If we hit/revealed the last element in the set of initially hidden elements, then all of said elements have been revealed hence remove the scroll 
                   event listener */
                // Removing the scroll event listener can also only be achieved if the add event listener referenced a named function (i.e. scrollThrottle)
                if (el.isLastItem) {
                    window.removeEventListener("scroll", this.scrollThrottle);
                }
            }
        }
    }

    hideInitially() {
        this.itemsToReveal.forEach(el => {
            el.classList.add("reveal-item");
            el.isRevealed = false;
        })
        this.itemsToReveal[this.itemsToReveal.length - 1].isLastItem = true;
    }
}

export default RevealOnScroll;