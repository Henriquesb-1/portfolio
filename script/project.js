function buildCarousel(root, folder, imageName) {
    const carouselItem = document.createElement("div");
    carouselItem.setAttribute("class", "carousel-item");

    const img = document.createElement("img");
    img.src = `/assets/img/${folder}/${imageName}`;
    img.title = imageName;
    img.alt = imageName;

    carouselItem.append(img);
    root.append(carouselItem);
}

let currentSlide = 0;
let position = 0;

function slide(carouselItems, previousOrNext, previousButton, nextButton, carouselStatus) {
    if (previousOrNext === "previous") position += 100;
    if (previousOrNext === "next") position -= 100;

    if (previousOrNext === "previous") currentSlide--;
    if (previousOrNext === "next") currentSlide++;

    if (currentSlide > 0) previousButton.removeAttribute("disabled");
    else if (currentSlide === 0) previousButton.setAttribute("disabled", true);

    if (currentSlide === carouselItems.length - 1) nextButton.setAttribute("disabled", true);
    else if (currentSlide < carouselItems.length - 1) nextButton.removeAttribute("disabled");

    carouselItems.forEach(carouselItem => carouselItem.style.left = `${position}%`);

    carouselStatus.innerHTML = `${currentSlide + 1}/${carouselItems.length}`;
}

(async function () {
    let carouselItems;

    const query = document.location.search.split("=")[1];

    document.title = `SB Portfólio - ${query}`;

    const projectTitle = document.querySelector("#project-title");
    const projectLink = document.querySelector("#project-link");
    const projectLanguages = document.querySelector("#project-languages");
    const carouselContainer = document.querySelector("#carousel");
    const projectDescription = document.querySelector("#project-description");

    const previousButton = document.querySelector("#previous-button");
    const nextButton = document.querySelector("#next-button");

    const carouselStatus = document.querySelector("#carousel-status").firstElementChild;

    const request = await fetch(`/data/${query}.json`);

    if (request) {
        const { title, link, languages, description, carousel } = await request.json();
        projectTitle.innerHTML = title;
        projectLink.setAttribute("href", link);

        languages.forEach(language => {
            const li = document.createElement("li");
            li.innerHTML = language;
            projectLanguages.children[1].appendChild(li);
        });

        projectDescription.innerHTML = description;

        carousel.forEach(image => buildCarousel(carouselContainer, query, image));

        carouselItems = document.querySelectorAll(".carousel-item");
        carouselContainer.style.gridTemplateColumns = `repeat(${carouselItems.length}, 100%)`;
    }

    previousButton.addEventListener("click", () => slide(carouselItems, "previous", previousButton, nextButton, carouselStatus));
    nextButton.addEventListener("click", () => slide(carouselItems, "next", previousButton, nextButton, carouselStatus));

    carouselStatus.innerHTML = `${currentSlide + 1}/${carouselItems.length}`;
}());