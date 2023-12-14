/**
 * @description - this is a basic carousel script that allows scrolling through a list of items
 *                using the next and previous buttons or by swiping left and right on mobile
 * @param {string} slidesContainer - the css selector for the container that holds the slides
 * @param {string} slide - the css selector for the slides
 * @param {string} prevButton - the css selector for the previous button
 * @param {string} nextButton - the css selector for the next button
 */
class Carousel {
    constructor(slidesContainer, slide, prevButton, nextButton) {
        this.slidesContainer = document.querySelector(slidesContainer);
        this.slide = document.querySelector(slide);
        this.prevButton = document.getElementById(prevButton);
        this.nextButton = document.getElementById(nextButton);
        this.x1 = null;
        this.y1 = null;
    }

    next() {
        const slideWidth = this.slide.clientWidth;
        this.slidesContainer.scrollLeft += slideWidth;
    }

    prev() {
        const slideWidth = this.slide.clientWidth;
        this.slidesContainer.scrollLeft -= slideWidth;
    }

    handleTouchStart(event) {
        const firstTouch = event.touches[0];
        this.x1 = firstTouch.clientX;
        this.y1 = firstTouch.clientY;
    }

    handleTouchMove(event) {
        if (!this.x1 || !this.y1) {
            return false;
        }

        let x2 = event.touches[0].clientX;
        let y2 = event.touches[0].clientY;

        let xDiff = x2 - this.x1;
        let yDiff = y2 - this.y1;

        if (Math.abs(xDiff) > Math.abs(yDiff)) {
            if (xDiff > 0) {
                this.prev();
            } else {
                this.next();
            }
        }

        this.x1 = null;
        this.y1 = null;
    }

    init() {
        this.nextButton.addEventListener("click", this.next.bind(this));
        this.prevButton.addEventListener("click", this.prev.bind(this));
        this.slidesContainer.addEventListener("touchstart", this.handleTouchStart.bind(this), { passive: true});
        this.slidesContainer.addEventListener("touchmove", this.handleTouchMove.bind(this), { passive: true});
    }
}

const carousel = new Carousel(
    '.carousel .campaign-services',
    '.slide-item',
    'slide-arrow-prev',
    'slide-arrow-next');

carousel.init();

