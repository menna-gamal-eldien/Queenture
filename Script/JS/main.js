let image = document.querySelectorAll(".navs .image div:not(.control)");
let control = document.querySelectorAll(".navs .control span");
let index = 0;
setInterval(_ => {
    index = (index + 1) % 5;
    change();
}, 9000)

function change() {
    control.forEach((c, i) => {
        c.classList.remove("active");
        if (i === index) {
            c.classList.add("active")
        }
    })
    image.forEach(im => im.style.translate = (-900 * index) + "px")
}

control.forEach((c, i) => {
    c.addEventListener("click", _ => {
        index = i;
        change();
    })
})


let leftarrows = document.querySelectorAll(".arrows span:first-of-type");
let rightarrows = document.querySelectorAll(".arrows span:last-of-type");
let vals = [330, 128, 330, 330];
let real = [0, 0, 0, 0];
let Rmax = [-4950, -1536, -4950, -4950];

rightarrows.forEach((arrow, i) => {
    arrow.addEventListener("click", _ => {
        if (real[i] <= Rmax[i]) return;

        let cards = arrow.parentElement.parentElement.nextElementSibling.querySelectorAll(".card");
        real[i] -= vals[i];
        cards.forEach(card => card.style.translate = real[i] + "px")
    })
})

leftarrows.forEach((arrow, i) => {
    arrow.addEventListener("click", _ => {
        if (real[i] >= 0) return;

        let cards = arrow.parentElement.parentElement.nextElementSibling.querySelectorAll(".card");
        real[i] += vals[i];
        cards.forEach(card => card.style.translate = real[i] + "px")
    })
})