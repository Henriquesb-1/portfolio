(async function () {
    const includes = document.querySelectorAll("[include]");

    includes.forEach(async element => {
        const url = element.getAttribute("include");
        const replace = element.hasAttribute("replace");
        const action = element.getAttribute("action");

        const request = await fetch(url);
        const data = await request.text();

        switch(action) {
            case "include":
                element.innerHTML = data;
            break;

            case "insert_after":
                element.insertAdjacentHTML("afterbegin", data);
            break;

            case "insert_before":
                element.insertAdjacentHTML("beforeend", data);
            break;

            default:
                element.innerHTML = data;
            break;
        }
        
        // replace ? element.innerHTML = text : element.insertAdjacentHTML("afterbegin", text);

        element.removeAttribute("include");
        element.removeAttribute("replace");
        element.removeAttribute("action");
    });
} ())