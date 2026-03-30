const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const rewards = document.getElementById("rewards");
const ending = document.getElementById("ending");

let yesCount = 0;

// --- 1. TOMBOL NEGATIF KABUR ACAK 360°
noBtn.addEventListener("mouseover", () => {
    const x = Math.random() * (window.innerWidth - 200);
    const y = Math.random() * (window.innerHeight - 200);

    noBtn.style.left = x + "px";
    noBtn.style.top = y + "px";
});

// --- 2. LIST GAMBAR REWARD
const rewardList = [
    "https://i.imgur.com/xR5sycX.png",  // snack
    "https://i.imgur.com/eaX5xDa.png",  // es kopi
    "https://i.imgur.com/oaE2zK4.png",  // buku
    "https://i.imgur.com/ybqqRdj.png",  // laptop
    "https://i.imgur.com/At8F3Ba.png"   // trumpet
];

// --- 3. SUARA TRUMPET
const trumpetSound = new Audio("https://www.fesliyanstudios.com/play-mp3/4388");

// --- 4. TOMBOL SEMANGAT
yesBtn.addEventListener("click", () => {
    yesCount++;

    yesBtn.style.transform = `scale(${1 + yesCount * 0.1})`;

    if (yesCount <= rewardList.length) {
        const img = document.createElement("img");
        img.src = rewardList[yesCount - 1];
        img.classList.add("reward-img");
        img.style.display = "block";

        rewards.appendChild(img);
    }

    // --- 5. AKHIRAN MERIAH
    if (yesCount === 5) {
        trumpetSound.play();
        ending.style.display = "block";
    }
});
