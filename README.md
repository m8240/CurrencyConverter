# Currency Converter

A simple and interactive currency converter web application built using **HTML**, **CSS**, and **JavaScript**. It allows users to convert currency values from USD to TAKA (BDT) with a fixed conversion rate and supports dynamic exchange rates for other currencies using a reliable API.

---

## Features

- **Fixed Conversion Rate**: 1 USD = 110 BDT.
- **Dynamic Currency Conversion**: Fetches real-time exchange rates for other currencies using the [Fawaz Ahmed Currency API](https://github.com/fawazahmed0/currency-api).
- **Interactive Dropdowns**: Predefined dropdowns for selecting currencies with flag icons.
- **Responsive Design**: Clean and responsive user interface.

---

## Technologies Used

- **HTML**: Structure of the application.
- **CSS**: Styling for the interface.
- **JavaScript**: Logic for currency conversion and API integration.

---

## How to Use

1. Clone the repository to your local machine.
2. Open the `index.html` file in a browser.
3. Enter the amount in the input field.
4. Choose the "From" and "To" currencies from the dropdown menus.
5. Click on the **Get Exchange Rate** button to view the conversion.

---

## Files Included

### 1. **HTML** (`index.html`)
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Currency Converter</title>
  <link href="style.css" rel="stylesheet" />
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
    integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
    crossorigin="anonymous"
    referrerpolicy="no-referrer"
  />
</head>
<body>
  <div class="container">
    <h2>Currency Converter</h2>
    <form>
      <div class="amount">
        <p>Enter Amount</p>
        <input type="number" value="1" min="1" />
      </div>
      <div class="dropdown">
        <div class="from">
          <p>From</p>
          <div class="select-container">
            <img src="https://flagsapi.com/US/flat/64.png" />
            <select name="from">
              <option value="USD" selected>USD</option>
            </select>
          </div>
        </div>
        <i class="fa-solid fa-arrow-right-arrow-left"></i>
        <div class="to">
          <p>To</p>
          <div class="select-container">
            <img src="https://flagsapi.com/BD/flat/64.png" />
            <select name="to">
              <option value="BDT" selected>BDT</option>
            </select>
          </div>
        </div>
      </div>
      <div class="msg">1 USD = 110 BDT</div>
      <button>Get Exchange Rate</button>
    </form>
  </div>
  <script src="app.js"></script>
</body>
</html>
```

### 2. **CSS** (`style.css`)
```css
* {
  margin: 0;
  padding: 0;
}

body {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f4e4ba;
}

.container {
  background-color: #fff;
  padding: 2rem;
  border-radius: 1rem;
  min-height: 45vh;
  width: 40vh;
}

form {
  margin: 2rem 0 1rem 0;
}

form select,
button,
input {
  width: 100%;
  border: none;
  outline: none;
  border-radius: 0.75rem;
}

form input {
  border: 1px solid lightgray;
  font-size: 1rem;
  height: 3rem;
  padding-left: 0.5rem;
}

.dropdown {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2rem;
}

.dropdown i {
  font-size: 1.5rem;
  margin-top: 1rem;
}

.select-container img {
  max-width: 2rem;
}

.select-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 6rem;
  border-radius: 0.5rem;
  border: 1px solid lightgray;
}

.select-container select {
  font-size: 1rem;
  width: auto;
}

.msg {
  margin: 2rem 0 2rem 0;
  text-align: center;
}

form button {
  height: 3rem;
  background-color: #af4d98;
  color: #fff;
  font-size: 1.15rem;
  cursor: pointer;
}
```

### 3. **JavaScript** (`app.js`)
```javascript
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
```

---

## API Reference
- The app uses [Fawaz Ahmed Currency API](https://github.com/fawazahmed0/currency-api) for fetching real-time exchange rates.

---

## Future Enhancements
1. Add support for more currencies in the dropdown menu.
2. Include historical data for currency trends.
3. Improve UI responsiveness for smaller screens.

---

## License
This project is open-source and available under the [MIT License](LICENSE).

