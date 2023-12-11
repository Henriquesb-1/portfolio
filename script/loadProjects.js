(function () {
    const technologyFilter = $("#technology-filter");
    const submit = $("[submit]");
    const projects = $("#projects");

    async function loadProjectInfo() {
        const request = await fetch(`/data/projects.json`);
        const technologies = await request.json();
        return technologies;
    }

    function createProjectContainer(project) {
        const { title, isOnAir, description, link } = project;

        const technologyGroup = $("div");
        technologyGroup.attr("class", "technology-card flex-column-between margin-y");

        const divTitle = $("div");
        divTitle.attr("class", "title");

        const h2 = $("h2");
        h2.html(title);
        divTitle.append(h2);

        const divIsOnAir = $("div");
        divIsOnAir.attr("class", "isOnAir");

        const spanIsOnAir = $("span");
        spanIsOnAir.html(`Está publicado: ${isOnAir ? "Sim" : "Não"}`);
        divIsOnAir.append(spanIsOnAir);

        const divDescription = $("div");
        divDescription.attr("class", "description");

        const pDescription = $("p");
        pDescription.html(description);
        divDescription.append(pDescription);

        const divLink = $("div");
        divLink.attr("class", "link");

        const aLink = $("a");
        aLink.href = `/project.html?t=${link}`;
        aLink.html("Ver Detalhes");
        aLink.attr("class", "clean-link");
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

    submit.on("click", async e => {
        e.preventDefault();

        const filter = technologyFilter.value;

        $(".technology-card")
            .each((index, element) => projects.remove(element))

        let allProjects = await loadProjectInfo();

        if(filter !== "all") allProjects = allProjects.filter(technology => technology.technologies.includes(filter));

        allProjects.forEach(project => projects.append(createProjectContainer(project)));
    })
}());