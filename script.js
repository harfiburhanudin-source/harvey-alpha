/* ----------- FITUR #6: TYPEWRITER TEXT ----------- */
const text = "Semangat UTS yaaa! Kamu pasti bisa 🤝📚";
let index = 0;

function typeWriter() {
    if (index < text.length) {
        document.getElementById("typedText").innerHTML += text.charAt(index);
        index++;
        setTimeout(typeWriter, 60);
    }
}
typeWriter();

/* ----------- FITUR #5: RANDOM BG COLOR ----------- */
function randomBg() {
    const color = `hsl(${Math.random() * 360}, 70%, 80%)`;
    document.body.style.background = color;
}

/* ----------- FITUR #3: POP SOUND ----------- */
const popSound = document.getElementById("popSound");

/* ----------- FITUR #10: TOMBOL LARI REAKTIF ----------- */
const btn = document.getElementById("btn");

function moveButton() {
    const x = Math.random() * (window.innerWidth - 150);
    const y = Math.random() * (window.innerHeight - 150);
    btn.style.left = `${x}px`;
    btn.style.top = `${y}px`;
}

btn.addEventListener("mouseover", () => {
    moveButton();          // tombol kabur
    randomBg();            // ganti background
    popSound.play();       // bunyi pop
});

btn.addEventListener("click", () => {
    popSound.play();
    randomBg();
});
