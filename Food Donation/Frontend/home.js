const carouselInner = document.querySelector('.carousel-inner');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');

let currentIndex = 0;

const updateCarousel = () => {
    const cardWidth = document.querySelector('.category-card').offsetWidth + 20; // Card width + margin
    carouselInner.style.transform = `translateX(${-currentIndex * cardWidth}px)`;
};

nextButton.addEventListener('click', () => {
    if (currentIndex < carouselInner.children.length - 1) {
        currentIndex++;
        updateCarousel();
    }
});

prevButton.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
    }
});