/* =====================================================
   PROJECT GALLERY
===================================================== */

const projects = {

    website: [
        "assets/code/rugrug.webp",
        "assets/code/rugrug2.webp",
        "assets/code/rugrug3.webp"
    ],

    "ui-one": [
        "assets/code/smartcity1.webp",
        "assets/code/smartcity2.webp",
        "assets/code/smartcity33.webp"
    ],

    "ui-two": [
        "assets/code/ptgabut1.webp",
        "assets/code/ptgabut2.webp",
        "assets/code/ptgabut3.webp"
    ]

};


document
    .querySelectorAll(".project-gallery")
    .forEach((gallery) => {

        const projectName =
            gallery.dataset.project;

        const images =
            projects[projectName];

        if (!images) return;


        const image =
            gallery.querySelector(".gallery-image");

        const counter =
            gallery.querySelector(".gallery-counter");


        let current = 0;


        gallery.addEventListener("click", () => {

            current++;

            if (current >= images.length) {
                current = 0;
            }


            image.classList.remove("active");


            setTimeout(() => {

                image.src = images[current];

                image.classList.add("active");

            }, 120);


            counter.textContent =
                `${String(current + 1).padStart(2, "0")} / ${String(images.length).padStart(2, "0")}`;

        });

    });


/* =====================================================
   DARK / LIGHT MODE
===================================================== */

const themeToggle =
    document.getElementById("themeToggle");


const savedTheme =
    localStorage.getItem("portfolio-theme");


if (savedTheme === "light") {

    document.body.classList.add("light-mode");

}


themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("light-mode");


    const theme =
        document.body.classList.contains("light-mode")
            ? "light"
            : "dark";


    localStorage.setItem(
        "portfolio-theme",
        theme
    );

});