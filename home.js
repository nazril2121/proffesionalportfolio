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