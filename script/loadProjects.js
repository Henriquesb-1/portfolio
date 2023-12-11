(function () {
    const technologyFilter = document.getElementById("technology-filter");
    const submit = document.querySelector("[submit]");
    const projects = document.getElementById("projects");

    async function loadProjectInfo() {
        const request = await fetch(`/data/projects.json`);
        const technologies = await request.json();
        return technologies;
    }

    function createProjectContainer(project) {
        const { title, isOnAir, description, link } = project;

        const technologyGroup = document.createElement("div");
        technologyGroup.setAttribute("class", "technology-card flex-column-between margin-y");

        const divTitle = document.createElement("div");
        divTitle.setAttribute("class", "title");

        const h2 = document.createElement("h2");
        h2.innerHTML = title;
        divTitle.append(h2);

        const divIsOnAir = document.createElement("div");
        divIsOnAir.setAttribute("class", "isOnAir");

        const spanIsOnAir = document.createElement("span");
        spanIsOnAir.innerHTML = `Está publicado: ${isOnAir ? "Sim" : "Não"}`
        divIsOnAir.append(spanIsOnAir);

        const divDescription = document.createElement("div");
        divDescription.setAttribute("class", "description");

        const pDescription = document.createElement("p");
        pDescription.innerHTML = description;
        divDescription.append(pDescription);

        const divLink = document.createElement("div");
        divLink.setAttribute("class", "link");

        const aLink = document.createElement("a");
        aLink.href = `/project.html?t=${link}`;
        aLink.innerHTML = "Ver Detalhes";
        aLink.setAttribute("class", "clean-link");
        divLink.append(aLink);

        technologyGroup.append(divTitle);
        technologyGroup.append(divIsOnAir);
        technologyGroup.append(divDescription);
        technologyGroup.append(divLink);

        return technologyGroup;
    }

    window.onload = async e => {
        const technologies = await loadProjectInfo();
        const allProjects = technologies;
        allProjects.forEach(project => projects.append(createProjectContainer(project)))
    };

    submit.addEventListener("click", async e => {
        e.preventDefault();

        const filter = technologyFilter.value;
        document.querySelectorAll(".technology-card").forEach(element => projects.removeChild(element))

        let allProjects = await loadProjectInfo();

        if(filter !== "all") allProjects = allProjects.filter(technology => technology.technologies.includes(filter));

        allProjects.forEach(project => projects.append(createProjectContainer(project)));
    })
}())