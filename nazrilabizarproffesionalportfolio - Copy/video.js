/* =====================================================
   THEME SWITCH
===================================================== */

const themeToggle =
    document.getElementById("themeToggle");


function applyTheme(theme) {

    if (theme === "light") {

        document.documentElement.classList.add("light-mode");

    } else {

        document.documentElement.classList.remove("light-mode");

    }

}


const savedTheme =
    localStorage.getItem("theme");


if (savedTheme) {

    applyTheme(savedTheme);

}


/*
    IMPORTANT:
    Tidak semua halaman punya themeToggle.
    Jadi jangan jalankan event listener
    kalau tombolnya memang tidak ada.
*/

if (themeToggle) {

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


            localStorage.setItem(
                "theme",
                newTheme
            );

        }
    );

}


/* =====================================================
   VIDEO MODAL
===================================================== */

const videoModal =
    document.getElementById("videoModal");


const modalPlayer =
    document.getElementById("modalPlayer");


const modalClose =
    document.getElementById("modalClose");


/* =====================================================
   OPEN VIDEO
===================================================== */

function openVideo(type, source) {

    if (!source || !modalPlayer || !videoModal) {
        return;
    }


    /* Clear previous player */

    modalPlayer.innerHTML = "";


    /* ==========================================
       YOUTUBE
    ========================================== */

    if (type === "youtube") {

        const iframe =
            document.createElement("iframe");


        let embedURL = source;


        const separator =
            embedURL.includes("?")
                ? "&"
                : "?";


        embedURL +=
            separator +
            "autoplay=1" +
            "&rel=0" +
            "&playsinline=1";


        iframe.src = embedURL;


        iframe.title =
            "YouTube video player";


        iframe.allow =
            "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";


        iframe.allowFullscreen = true;


        modalPlayer.appendChild(
            iframe
        );

    }


    /* ==========================================
       LOCAL VIDEO
    ========================================== */

    else {

        const video =
            document.createElement("video");


        video.src = source;


        video.controls = true;


        video.autoplay = true;


        video.playsInline = true;


        video.preload = "auto";


        video.setAttribute(
            "playsinline",
            ""
        );


        modalPlayer.appendChild(
            video
        );


        video.play().catch(() => {});

    }


    /* ==========================================
       SHOW MODAL
    ========================================== */

    requestAnimationFrame(() => {

        videoModal.classList.add(
            "active"
        );

    });


    document.body.style.overflow =
        "hidden";

}


/* =====================================================
   CLOSE VIDEO
===================================================== */

function closeVideo() {

    if (!videoModal) {
        return;
    }


    videoModal.classList.remove(
        "active"
    );


    document.body.style.overflow =
        "";


    setTimeout(() => {

        if (modalPlayer) {

            modalPlayer.innerHTML = "";

        }

    }, 350);

}


/* =====================================================
   CLOSE BUTTON
===================================================== */

if (modalClose) {

    modalClose.addEventListener(
        "click",
        closeVideo
    );

}


/* =====================================================
   CLICK OUTSIDE
===================================================== */

if (videoModal) {

    videoModal.addEventListener(
        "click",
        (event) => {

            if (
                event.target === videoModal
            ) {

                closeVideo();

            }

        }
    );

}


/* =====================================================
   ESCAPE
===================================================== */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape" &&
            videoModal &&
            videoModal.classList.contains("active")
        ) {

            closeVideo();

        }

    }
);


/* =====================================================
   FILM + YOUTUBE
===================================================== */

/*
    Thumbnail langsung membuka video.
*/

document
    .querySelectorAll(
        ".video-thumbnail, .youtube-thumbnail"
    )
    .forEach(
        (element) => {

            element.addEventListener(
                "click",
                () => {

                    const type =
                        element.dataset.videoType;


                    const source =
                        element.dataset.video;


                    if (
                        !type ||
                        !source
                    ) {

                        return;

                    }


                    openVideo(
                        type,
                        source
                    );

                }
            );

        }
    );


/* =====================================================
   VIEW PROJECT BUTTON
===================================================== */

/*
    VIEW PROJECT menggunakan href YouTube
    sehingga tetap membuka halaman YouTube
    seperti yang sudah kamu buat.
*/


/* =====================================================
   REELS
===================================================== */

/*
    Klik Reel:

    1x
    → video play

    Klik lagi
    → pause

    Reel lain dimainkan
    → reel sebelumnya berhenti
*/


document
    .querySelectorAll(
        ".reel-thumbnail"
    )
    .forEach(
        (container) => {

            const video =
                container.querySelector(
                    ".reel-video"
                );


            if (!video) {
                return;
            }


            /*
                Ambil source asli dari
                <source src="...webm">
            */

            const sourceElement =
                video.querySelector(
                    "source"
                );


            if (
                sourceElement &&
                sourceElement.src
            ) {

                video.src =
                    sourceElement.src;

            }


            container.addEventListener(
                "click",
                () => {

                    const isPlaying =
                        container.classList.contains(
                            "playing"
                        );


                    /*
                        STOP SEMUA REEL LAIN
                    */

                    document
                        .querySelectorAll(
                            ".reel-thumbnail.playing"
                        )
                        .forEach(
                            (other) => {

                                if (
                                    other === container
                                ) {
                                    return;
                                }


                                const otherVideo =
                                    other.querySelector(
                                        ".reel-video"
                                    );


                                if (otherVideo) {

                                    otherVideo.pause();

                                    otherVideo.currentTime = 0;

                                    otherVideo.muted = true;

                                }


                                other.classList.remove(
                                    "playing"
                                );

                            }
                        );


                    /*
                        PLAY / PAUSE REEL
                    */

                    if (isPlaying) {

                        video.pause();

                        video.muted = true;

                        container.classList.remove(
                            "playing"
                        );

                    }

                    else {

                        /*
                            Sound aktif
                        */

                        video.muted = false;

                        video.volume = 1;

                        video.currentTime = 0;


                        video.play()
                            .then(() => {

                                container.classList.add(
                                    "playing"
                                );

                            })
                            .catch(() => {

                                /*
                                    Kalau browser
                                    menolak autoplay
                                    dengan sound,
                                    fallback ke muted.
                                */

                                video.muted = true;


                                video.play()
                                    .then(() => {

                                        container.classList.add(
                                            "playing"
                                        );

                                    })
                                    .catch(() => {});

                            });

                    }

                }
            );

        }
    );