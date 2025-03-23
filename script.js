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
    // Stop if all rounds are done
    if (currentRound >= products.length) {
        showPopup(); // Game over popup
        return;
    }

    let product = products[currentRound];
    let randomOrder = Math.random() < 0.5;

    // Assign real/dupe images randomly
    let realImage = randomOrder ? product.real : product.dupe;
    let dupeImage = randomOrder ? product.dupe : product.real;

    document.getElementById("image1").src = realImage;
    document.getElementById("image2").src = dupeImage;

    document.getElementById("image1").dataset.type = randomOrder ? "real" : "dupe";
    document.getElementById("image2").dataset.type = randomOrder ? "dupe" : "real";

    // 🔁 Reset all visual elements for the round
    document.getElementById("feedback").innerText = "";
    document.getElementById("slider-section").style.display = "none";
    document.getElementById("actual-dupe-price").style.display = "none";
    document.getElementById("slider-value").innerText = "0";
    document.getElementById("price-slider").value = 0;
    document.getElementById("next-btn").style.display = "none";

    document.getElementById("label1").innerText = "";
    document.getElementById("label2").innerText = "";
}

function makeGuess(choice) {
    let image1Type = document.getElementById("image1").dataset.type;
    let image2Type = document.getElementById("image2").dataset.type;

    let product = products[currentRound];
    let correctChoice = image1Type === "real" ? 1 : 2;
    let chosenType = choice === 1 ? image1Type : image2Type;

    // Show only the real price
    document.getElementById("feedback").innerText = `The real price is: ${product.realPrice}`;

    // Prepare slider
    document.getElementById("slider-section").style.display = "block";
    document.getElementById("actual-dupe-price").style.display = "none";
    document.getElementById("slider-value").innerText = "0";
    let slider = document.getElementById("price-slider");
    slider.value = 0;

    slider.oninput = function () {
        document.getElementById("slider-value").innerText = this.value;
    };

    slider.onchange = function () {
        document.getElementById("actual-dupe-price").innerText = `The actual dupe price is: ${product.dupePrice}`;
        document.getElementById("actual-dupe-price").style.display = "block";
        document.getElementById("next-btn").style.display = "block";
        // Show dupe price
    document.getElementById("actual-dupe-price").innerText = `The actual dupe price is: ${product.dupePrice}`;
    document.getElementById("actual-dupe-price").style.display = "block";

    // Reveal labels
    document.getElementById("label1").innerText = image1Type === "real" ? "REAL" : "DUPE";
    document.getElementById("label2").innerText = image2Type === "real" ? "REAL" : "DUPE";

    // Show next
    document.getElementById("next-btn").style.display = "block";

    };

    currentRound++;
}


//Function to show the popup when the game ends
function showPopup() {
    document.getElementById("winPopup").style.display = "flex";
}

// Function to close the popup
document.addEventListener("DOMContentLoaded", () => {
    const closeButton = document.querySelector(".close-btn");
    if (closeButton) {
        closeButton.addEventListener("click", () => {
            document.getElementById("winPopup").style.display = "none";
        });
    }
});