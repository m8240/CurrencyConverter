const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

const updateExchangeRate = async () => {
  let amountInput = document.querySelector(".amount input");
  let amountValue = amountInput.value;

  if (amountValue === "" || amountValue < 1) {
    amountValue = 1;
    amountInput.value = "1";
  }

  if (fromCurr.value === "USD" && toCurr.value === "BDT") {
    // Fixed conversion rate for USD to TAKA (BDT)
    const rate = 110; // Example fixed rate
    const finalAmount = amountValue * rate;
    msg.innerText = `${amountValue} USD = ${finalAmount} BDT`;
  } else {
    // Dynamic conversion using the API
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    try {
      const response = await fetch(URL);
      const data = await response.json();
      const rate = data[toCurr.value.toLowerCase()];
      const finalAmount = amountValue * rate;
      msg.innerText = `${amountValue} ${fromCurr.value} = ${finalAmount.toFixed(2)} ${toCurr.value}`;
    } catch (error) {
      msg.innerText = "Error fetching exchange rate. Try again.";
    }
  }
};

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});

window.addEventListener("load", () => {
  updateExchangeRate();
});
