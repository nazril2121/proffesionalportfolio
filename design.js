/* =====================================================
   PROJECT IMAGES
===================================================== */

const projectImages = {


    /* =========================
       ADVERTISING
    ========================= */

    elixir: [

        "assets/design/dior/th.webp",

        "assets/design/dior/empat.webp",

        "assets/design/dior/satu.webp"

    ],


    taso: [
    "assets/design/TASO/mockup bil 2.webp",
    "assets/design/TASO/mockup bil 1.webp",
    "assets/design/TASO/MOCKUP BIL 3.webp"
],


    film: [
    "assets/design/FILM/poster film.webp",
    "assets/design/FILM/poster film 2.webp",
    "assets/design/FILM/poster film 3.webp"
],



    /* =========================
       BRANDING
    ========================= */

 saturday: [
    "assets/design/ES/saturday-bliss-1.webp",
    "assets/design/ES/SATURDAY-BLISS-2.webp",
    "assets/design/ES/SATURDAY-BLISS-3.webp"
],


    mascot: [
    "assets/design/atro/ATRO TH.webp",
    "assets/design/atro/ATRO 2.webp",
    "assets/design/atro/ATRO 1.webp"
],


zybara: [
    "assets/design/zybara/zybara (2).webp",
    "assets/design/zybara/zybara (1).webp",
    "assets/design/zybara/zybara.webp"
],



    /* =========================
       SOCIAL MEDIA
    ========================= */

   carousel: [
    "assets/design/carousel/car (2).webp",
    "assets/design/carousel/P.webp",
    "assets/design/carousel/P (1).webp"
],


social: [
    "assets/design/SOCIAL/sosmed.webp",
    "assets/design/SOCIAL/sosmed (1).webp",
    "assets/design/SOCIAL/sosm3.webp"
],


    campaign: [

        "assets/design/campaign/01.jpg",

        "assets/design/campaign/02.jpg",

        "assets/design/campaign/03.jpg"

    ]

};



/* =====================================================
   PROJECT IMAGE INTERACTION
===================================================== */

document
    .querySelectorAll(".project")
    .forEach(project => {


        const projectName =
            project.dataset.project;


        const images =
            projectImages[projectName];


        const image =
            project.querySelector(".project-image");


        const imageContainer =
            project.querySelector(".image-container");


        const counter =
            project.querySelector(
                ".image-counter strong"
            );


        let currentIndex = 0;



        /* =========================
           CLICK
        ========================= */

        imageContainer.addEventListener(
            "click",
            () => {


                /* NEXT IMAGE */

                currentIndex++;


                /* LOOP */

                if (
                    currentIndex >= images.length
                ) {

                    currentIndex = 0;

                }


                /* FADE OUT */

                image.classList.add("changing");


                setTimeout(() => {


                    /* CHANGE IMAGE */

                    image.src =
                        images[currentIndex];


                    /* CHANGE COUNTER */

                    counter.textContent =
                        String(
                            currentIndex + 1
                        ).padStart(2, "0");


                    /* FADE IN */

                    image.classList.remove(
                        "changing"
                    );


                }, 200);

            }
        );

    });



/* =====================================================
   DARK / LIGHT MODE
===================================================== */

const themeToggle =
    document.getElementById(
        "themeToggle"
    );


/* =====================================================
   APPLY SAVED THEME
===================================================== */

function applyTheme(theme) {

    if (theme === "light") {

        document.documentElement
            .classList
            .add("light-mode");

    } else {

        document.documentElement
            .classList
            .remove("light-mode");

    }

}


/* =====================================================
   LOAD THEME
===================================================== */

const savedTheme =
    localStorage.getItem("theme");


if (savedTheme) {

    applyTheme(savedTheme);

}



/* =====================================================
   TOGGLE
===================================================== */

themeToggle.addEventListener(
    "click",
    () => {


        const isLight =
            document.documentElement
                .classList
                .contains("light-mode");


        const newTheme =
            isLight
                ? "dark"
                : "light";


        applyTheme(newTheme);


        /* SAVE */

        localStorage.setItem(
            "theme",
            newTheme
        );

    }
);