import throttle from 'lodash/throttle'
import debounce from 'lodash/debounce'

class StickyHeader {
    constructor() {
        this.siteHeader = document.querySelector(".site-header");
        this.pageSections = document.querySelectorAll(".page-section");
        this.browserHeight = window.innerHeight;
        this.previousScrollY = window.scrollY;
        this.events();
    }

    events() {
        window.addEventListener("scroll", throttle(() => this.runOnScroll(), 200));

        window.addEventListener("resize", debounce(() => {
            this.browserHeight = window.innerHeight;
        }, 333));
    }

    runOnScroll() {
        this.determineScrollDirection();

        if (window.scrollY > 60) {
            this.siteHeader.classList.add("site-header--dark");
        } else {
            this.siteHeader.classList.remove("site-header--dark");
        }

        this.pageSections.forEach(el => this.calcSection(el));
    }

    determineScrollDirection() {
        if (window.scrollY > this.previousScrollY) {
            this.scrollDirection = 'down';
        } else {
            this.scrollDirection = 'up';
        }

        this.previousScrollY = window.scrollY;
    }

    calcSection(el) {
        /* First part of the condition: the sum of scrollY and browserHeight equals the pixel distance (travelled) from the top of the HTML page content up to the bottom
           of the viewport hence first condition proves true when the bottom of the viewport crosses the the top edge of the el element (i.e. becomes visible in the 
           viewport) */
        /* Second part of the condition: the sum of the el element's offsetTop and offsetHeight equals the distance from the top of the HTML page to the bottom of the
           of its section hence the second condition proves true when the user has only scrolled so far such that it is still in the viewport */
        if (window.scrollY + this.browserHeight > el.offsetTop && window.scrollY < el.offsetTop + el.offsetHeight) {
    
            let scrollPercent = el.getBoundingClientRect().y / this.browserHeight * 100;
            if (scrollPercent < 18 && scrollPercent > -0.1 && this.scrollDirection == 'down' || scrollPercent < 33 && this.scrollDirection == 'up') {
                let matchingLink = el.getAttribute("data-matching-link");
                document.querySelectorAll(`.primary-nav a:not(${matchingLink})`).forEach(el => el.classList.remove("is-current-link"));
                document.querySelector(matchingLink).classList.add("is-current-link");
            }
            else if (scrollPercent > 38 && this.scrollDirection == 'up') {
                document.querySelector('#our-beginning-link').classList.remove('is-current-link');
            }

        }
    }
}

export default StickyHeader;