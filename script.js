const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const title = document.getElementById("title");
const itemContainer = document.getElementById("itemContainer");
const trumpetSound = document.getElementById("trumpetSound");

let clickCount = 0;

const items = [
    "https://pngimg.com/uploads/snack/snack_PNG15.png",
    "https://pngimg.com/uploads/coffee/coffee_PNG100.png",
    "https://pngimg.com/uploads/book/book_PNG51090.png",
    "https://pngimg.com/uploads/laptop/laptop_PNG5931.png",
    "https://pngimg.com/uploads/trumpet/trumpet_PNG62.png"
];

noBtn.addEventListener("mouseover", () => {
    if (!yesBtn.disabled) return;

    noBtn.classList.add("runaway");
    const x = Math.random() * 80 + 10;
    const y = Math.random() * 40 + 10;
    noBtn.style.left = `${x}%`;
    noBtn.style.top = `${y}%`;
});

noBtn.addEventListener("click", () => {
    yesBtn.disabled = false;
});

yesBtn.addEventListener("click", () => {
    clickCount++;

    yesBtn.style.transform = `scale(${1 + clickCount * 0.12})`;

    if (clickCount <= items.length) {
        const img = document.createElement("img");
        img.src = items[clickCount - 1];
        itemContainer.appendChild(img);
    }

    if (clickCount === 5) {
        trumpetSound.play();
        launchConfetti();
        title.innerHTML = "Selamat belajar! Semoga sukses UTS-nya! 🎉🔥📚";
    }
});

function launchConfetti() {
    for (let i = 0; i < 140; i++) {
        const c = document.createElement("div");
        c.classList.add("confetti");
        c.style.setProperty("--i", Math.random());
        c.style.setProperty("--x", Math.random() * 100);
        document.body.appendChild(c);
        setTimeout(() => c.remove(), 3000);
    }
}
