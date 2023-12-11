let currentSlide = 0;
let position = 0;

const carouselItems = document.querySelectorAll(".carousel-item");

const previousButton = document.querySelector("#previous-button");
const nextButton = document.querySelector("#next-button");

function slide(carouselItems, previousOrNext, previousButton, nextButton) {
    if(previousOrNext === "previous") position += 100;
    if(previousOrNext === "next") position -= 100;
    
    if(previousOrNext === "previous") currentSlide--;
    if(previousOrNext === "next") currentSlide++;

    if(currentSlide > 0) previousButton.removeAttribute("disabled");
    else if(currentSlide === 0) previousButton.setAttribute("disabled", true);

    if(currentSlide === carouselItems.length - 1) nextButton.setAttribute("disabled", true);
    else if(currentSlide < carouselItems.length - 1) nextButton.removeAttribute("disabled");

    carouselItems.forEach(carouselItem => carouselItem.style.left = `${position}%`);
}

previousButton.addEventListener("click", () => slide(carouselItems, "previous", previousButton, nextButton));
nextButton.addEventListener("click", () => slide(carouselItems, "next", previousButton, nextButton));