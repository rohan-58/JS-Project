const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");

const btn = document.querySelector("form button");

const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");

const msg = document.querySelector(".msg");



for(let select of dropdowns){
    for (currCode in countryList){
        //console.log(code, countryList[code]);
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name === "from" && currCode === "USD"){
            newOption.selected = "selected";
        }
        else if(select.name === "to" && currCode === "INR"){
            newOption.selected = "selected";
        }
        select.append(newOption)
    }

    select.addEventListener("change", (addEventListner)=>{
        updateFlag(evt.target);
    })
}

const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");   //entered amount
    let amtVal = amount.value;
    //console.log(amtVal);
    if(amtVal === "" || amtVal < 1){   //if given (amount val < 1) then we set it to 1
        amtVal = 1;
        amount.value = "1";
    }

    //console.log(fromCurr.value, toCurr.value);
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL)
    let data = await response.json();
    let rate = data[toCurr.value.toLowerCase()];
    //console.log(rate);
    let finalAmount = amtVal * rate;
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`
}

//update flag
const updateFlag = (element) => {
    //console.log(element)
    let currCode = element.value;
    //console.log(currCode)
    let CountryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;

};


btn.addEventListener("click", (evt)=>{
    evt.preventDefault();    //after button press default behaviour remains unchanged
    updateExchangeRate();
})

window.addEventListener("load", ()=>{
    updateExchangeRate(); 
})