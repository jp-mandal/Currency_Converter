//document.querySelector("body").style.backgroundColor="black"

//HTTP(Hyper Text Transfer Protocal)
//GET,PUT,POST,DELETE,PATCH(in order to update data)

/* Status code

1. Informational responses(100-199)
2. Successful responses(200-299)
3. Redirection messages(300-399)
4. Client error responses(400-499)
5. Server error responses(500-599)

*/

const BASE_URL="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/"

const dropdowns=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const msg=document.querySelector(".msg");

for (let select of dropdowns){
    for (let currCode in countryList){
        let newOption=document.createElement("option");
        newOption.innerText=currCode;
        newOption.value=currCode;
        if (select.name==="from" && currCode==="USD"){
            newOption.selected="selected";               //you can write newOption.selected=true.
        }
        else if(select.name==="to" && currCode==="INR"){
            newOption.selected="selected";
        }
        select.append(newOption);
    }

    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    })
}

const updateFlag=(element)=>{
    let currCode=element.value;
    let countryCode=countryList[currCode];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newSrc;
}


btn.addEventListener("click", async(evt)=>{
    evt.preventDefault();                //helps to not change page by clicking button
    let amount=document.querySelector(".amount input");
    let amtval=amount.value;
    if(amtval==="" || amtval<1){
        amtval=1;
        amount.value="1";
    }
    //console.log(fromCurr.value,toCurr.value);
    const URL=`${BASE_URL}${fromCurr.value.toLowerCase()}.json`;
    let response=await fetch(URL);
    let data=await response.json();
    let ini=fromCurr.value.toLowerCase();
    console.log(ini);
    let rates=data[ini];
    let rate=rates[toCurr.value.toLowerCase()];
    //console.log(rate);

    let finalAmount=amtval*rate;
    //console.log(finalAmount);
    msg.innerText=`${amtval} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
    msg.style.backgroundColor="#c9b1bd";
});

