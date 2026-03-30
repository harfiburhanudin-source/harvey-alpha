const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const title = document.getElementById("title");
const itemContainer = document.getElementById("itemContainer");
const trumpetSound = document.getElementById("trumpetSound");

let clickCount = 0;

// Gambar item otomatis
const items = [
    "https://i.imgur.com/GTzjb0p.png", // snack lucu
    "https://i.imgur.com/9MZsEEh.png", // es kopi
    "https://i.imgur.com/H7lHu5U.png", // buku
    "https://i.imgur.com/LJ6V34V.png", // laptop
    "https://i.imgur.com/2uPjQ0k.png"  // terompet
];

// No button: pertama klik → aktifkan mode kabur
noBtn.addEventListener("click", () => {
    noBtn.classList.add("move");
    yesBtn.disabled = false;
});

// Yes button behavior
yesBtn.addEventListener("click", () => {
    clickCount++;

    // Membesarkan tombol setiap klik
    yesBtn.style.transform = `scale(${1 + clickCount * 0.15})`;

    // Tambahkan item sesuai urutan
    if (clickCount <= items.length) {
        const img = document.createElement("img");
        img.src = items[clickCount - 1];
        itemContainer.appendChild(img);
    }

    // Kalau klik ke-5 (terompet)
    if (clickCount === 5) {
        trumpetSound.play();
        launchConfetti();

        title.innerHTML = "Selamat belajar! Semoga sukses UTS-nya! 🎉🔥📚";
    }
});

// Confetti effect
function launchConfetti() {
    for (let i = 0; i < 120; i++) {
        const conf = document.createElement("div");
        conf.classList.add("confetti");
        conf.style.setProperty("--i", Math.random());
        conf.style.setProperty("--x", Math.random() * 100);
        document.body.appendChild(conf);

        setTimeout(() => conf.remove(), 3000);
    }
}
