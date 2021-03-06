const currencyEl_one = document.queryselector('.currency-one');
const amountEl_one = document.queryselector('.amount-one');
const currencyEl_two = document.getElementById('currency-two');
const amountEl_two = document.getElementById('amount-two');
const rateEl = document.getElementById('rate');


// Fetch exchange rates and update the DOM
function caclulate() {
  const currency_one = currencyEl_one.value;
  const currency_two = currencyEl_two.value;
  fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one}`)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      for (const tags in data.rates) {
        let tag = document.createElement("option");
        tag.textContent = `${tags}`;
        tag.value = tags;
        document.querySelector("#currency-one").appendChild(tag);
      }
      for (const tags in data.rates) {
        let tag = document.createElement("option");
        tag.textContent = `${tags}`;
        tag.value = tags;
        document.querySelector("#currency-two").appendChild(tag);
      }

      const rate = data.rates[currency_two];

      rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;

      amountEl_two.value = (amountEl_one.value * rate);
    });
}

function printValue() {
  console.log("Input part hovered");
}

// Event listeners
currencyEl_one.addEventListener('change', caclulate);
amountEl_one.addEventListener('mouseover', printValue);
currencyEl_two.addEventListener('change', caclulate);
amountEl_two.addEventListener('input', caclulate);

swap.addEventListener('click', () => {
  const temp = currencyEl_one.value;
  currencyEl_one.value = currencyEl_two.value;
  currencyEl_two.value = temp;
  caclulate();
});

caclulate();
