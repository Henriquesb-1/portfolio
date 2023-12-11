(async function () {
    const includes = document.querySelectorAll("[include]");

    includes.forEach(async element => {
        const url = element.getAttribute("include");
        const replace = element.hasAttribute("replace");

        const request = await fetch(url);
        const text = await request.text();
        
        replace ? element.innerHTML = text : element.insertAdjacentHTML("afterbegin", text);

        element.removeAttribute("include");
        element.removeAttribute("replace");
    });
} ())