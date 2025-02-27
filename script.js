document.getElementById("portfolioBtn").addEventListener("click", function() {
    window.open("https://www.brookebonynge.design/", "blank");
});

document.addEventListener("DOMContentLoaded", () => {
    loadNextRound();
});

// Product data with images & prices
const products = [
    { real: "./figma/real1.jpg", dupe: "./figma/dupe1.jpg", realPrice: "$1,950", dupePrice: "$84.99" },
    { real: "./figma/real2.jpg", dupe: "./figma/dupe2.jpg", realPrice: "$995", dupePrice: "$99" },
    { real: "./figma/real3.jpg", dupe: "./figma/dupe3.jpg", realPrice: "$1,380", dupePrice: "$50" },
    { real: "./figma/real4.jpg", dupe: "./figma/dupe4.jpg", realPrice: "$158", dupePrice: "$30" }
];

let currentRound = 0;

function loadNextRound() {
    // Fix: Properly check if all rounds are done
    if (currentRound >= products.length) {
        showPopup(); // Show the popup when game is over
        return;
    }

    let product = products[currentRound];
    let randomOrder = Math.random() < 0.5;

    // Assign images randomly
    let realImage = randomOrder ? product.real : product.dupe;
    let dupeImage = randomOrder ? product.dupe : product.real;

    document.getElementById("image1").src = realImage;
    document.getElementById("image2").src = dupeImage;

    document.getElementById("image1").dataset.type = randomOrder ? "real" : "dupe";
    document.getElementById("image2").dataset.type = randomOrder ? "dupe" : "real";

    // Reset feedback & hide next button
    document.getElementById("feedback").innerText = "";
    document.getElementById("next-btn").style.display = "none";
}

function makeGuess(choice) {
    let image1Type = document.getElementById("image1").dataset.type;
    let image2Type = document.getElementById("image2").dataset.type;

    let product = products[currentRound];
    let correctChoice = image1Type === "real" ? 1 : 2;

    let feedback = choice === correctChoice ? "✅ Correct!" : "❌ Wrong!";
    feedback += `\nReal: ${product.realPrice} | Dupe: ${product.dupePrice}`;

    document.getElementById("feedback").innerText = feedback;
    document.getElementById("next-btn").style.display = "block";

    currentRound++; //Move this AFTER feedback to ensure all rounds play
}

//Function to show the popup when the game ends
function showPopup() {
    document.getElementById("winPopup").style.display = "flex";
}