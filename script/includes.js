(async function () {
    const includes = $("[include]");

    includes.each((index, element) => {
        const url = $(element).attr("include");
        const willReplace = $(element).attr("replace");

        $.ajax({
            url,
            success(data) {
                willReplace ? $(element).html(data) : $(element).append(data);

                element.removeAttribute("include");
                element.removeAttribute("replace");
            }
        });
    });
} ())