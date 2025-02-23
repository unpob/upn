const inputs = document.querySelectorAll(".form-header input, .form-group input");
const sendButton = document.getElementById("send-button");

// Enable or disable the "Send" button based on form input completion
inputs.forEach((input) => {
    input.addEventListener("input", () => {
        const allFilled = Array.from(inputs).every((inp) => inp.value.trim() !== "");
        sendButton.classList.toggle("active", allFilled);
    });
});
function getQueryParams() {
    const queryString = window.location.search; // Get the query string from the URL
    const params = {};

    if (queryString) {
        const pairs = queryString.substring(1).split("&"); // Remove "?" and split parameters
        for (const pair of pairs) {
            const [key, value] = pair.split("="); // Split key and value
            params[decodeURIComponent(key)] = decodeURIComponent(value || "");
        }
    }

    return params; // Return an object with all parameters
}
 let params = getQueryParams();
 
const profiles = {
      "Bkash": "Bkash.png",
      "Upay": "Upay.png",
      "Rocket": "Rocket.jpeg",
    "Bank": "Bank.png",
      "হাতে": "Hand.jpeg",
    };

    // Function to update profile picture based on the selection
    function updateProfile() {
      const profilePic = document.getElementById("profilePic");
      const name = document.getElementById("name").value;
        const inputValue = name;
    const keywords = ['Bkash', 'Upay'];
    const includesKeyword = keywords.some(keyword => inputValue.includes(keyword));
if (name === 'হাতে'){
    document.getElementById('acnum').value = params.id;
}else {
    document.getElementById('acnum').value = '';
}

    if (includesKeyword) {
        document.getElementById('acnum').setAttribute('maxLength', 11);
    }else{     document.getElementById('acnum').setAttribute('maxLength', 19);
   }
      profilePic.src = profiles[name] || (name === "" ? "user.jpg" : "who.png");
        
    }

    updateProfile();
document.addEventListener("DOMContentLoaded", () => {document.getElementById("popup").classList.add("active");
  let params = getQueryParams();
 let limit;
    let limit2;
      function fetchData2() {
    const tbl = 0; // Use 0 as the default table index

    const url = `${dgistart}/${params.sheetid}/${dgih}`;
    fetch(url)
        .then((response) => response.text())
        .then((data) => {
            const parser = new DOMParser();
            const htmlDoc = parser.parseFromString(data, "text/html");
            const tables = htmlDoc.querySelectorAll("table");

            if (tbl >= tables.length) {
                return;
            }

            const cellElement = tables[tbl]?.rows[4]?.cells[2];
            if (cellElement) {
                const cellText = cellElement.innerText || cellElement.textContent;
let match = cellText.match(/^dps balance (\d+)\/dps\/(\d+)$/);

 limit = match ? parseFloat(match[2]) : '0';  // Second number (1000)
 limit2 = match ? parseFloat(match[1]) : '0'; // First number (2000)

     if(limit > 0){
         alert(`আপনি ${limit} টাকা পর্যন্ত কোনো চার্জ ছাড়াই ক্যাশআউট করতে পারবেন`);
     } 
                console.log(limit);
                console.log(limit2);
            } else {
            }
        })
        .catch((error) => console.error("Error fetching data:", error));
}
  // Load balance from a table
    function loadTableData() {
        const tableNumber = Number('0'); // Fetching the table number from local storage and converting to an integer
       const sheetId = params.sheetid;

    const urls = `${dgistart}/${sheetId}/${dgih}`; // Placeholder: Define `dgistart`, `dgih` properly

    fetch(urls)
        .then((response) => response.text())
        .then((html) => {
            const parser = new DOMParser();
            const tables = parser.parseFromString(html, "text/html").querySelectorAll("table");

            const cell = tables[tableNumber].rows[3].cells[4];
            const balanceText = cell.innerText || cell.textContent;
            const balancexx = parseFloat(balanceText.trim());
const balance = `${balancexx} ৳`;
            const balanceDisplay = document.getElementById("balance");
            balanceDisplay.innerHTML = "";
            balance.split("").forEach((char, index) => {
                const span = document.createElement("span");
                span.textContent = char === " " ? "\u00A0" : char;
                span.classList.add("letter");
                span.style.animationDelay = `${0.1 * index}s`;
                balanceDisplay.appendChild(span);
            });

            document.getElementById("popup").classList.remove("active");
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
            document.getElementById("popup").classList.remove("active");
        });
}
    

fetchData2();
loadTableData();
    document.getElementById("send-money-form").addEventListener("submit", (event) => {
        event.preventDefault();
const codexx = Math.floor(1000 + Math.random() * 9000);
        let bonusAmount = document.getElementById("amount").value.trim();
        let popup = document.getElementById("popup");
        let successAudio = new Audio("ting.mp3");
        let failAudio = new Audio("fail.mp3");
        successAudio.preload = "auto";
        failAudio.preload = "auto";
        let audioPlayed = false;
let params = getQueryParams();
        let email = params.mail;
    console.log(email);
      if(email !== localStorage.getItem('mymail')){
          localStorage.removeItem('secureData');
          window.location.replace = 'verify.html';
          return;
      }popup.classList.add("active");
        let balance = parseFloat(document.getElementById("balance").innerText.trim());
         let fname = document.getElementById("name").value.trim();
        let suced = document.getElementById('no-connection-popup3');
        let failed = document.getElementById('no-connection-popup2');
        let name = params.name;
        let id = params.id;
        console.log(id);
        let  acnum = document.getElementById("acnum").value;
        if( acnum === id){
            acnum = id;
        }let amount = Math.floor(parseFloat(bonusAmount));
let selfid = params.formid;
    let sa = params.sa;
    let sd = params.sd;
    let sr = params.sr;
             let charge = 0;
            let today = new Date().toDateString(); // Get current date as a string
            let lastWithdrawDate = localStorage.getItem("lastWithdrawDate") || "";
 let lastWithdraw = parseFloat(localStorage.getItem("lastWithdraw")) || 0;
            let withdrawCount = parseInt(localStorage.getItem("withdrawCount")) || 0;

            if (amount > limit){
           nextlimit = amount - limit;
                console.log(nextlimit);
            // Reset counts if it's a new day
            if (lastWithdrawDate !== today) {
                localStorage.setItem("lastWithdraw", "0");
                localStorage.setItem("withdrawCount", "0");
                localStorage.setItem("lastWithdrawDate", today);
            }

           
            // Calculate charge based on the amount
            if (nextlimit < 50) {
                lastWithdraw += nextlimit;
                withdrawCount++;

                if (lastWithdraw > 50 || withdrawCount > 2) {
                    charge = 1;
                } else {
                    charge = 0;
                }

                localStorage.setItem("lastWithdraw", lastWithdraw);
                localStorage.setItem("withdrawCount", withdrawCount);
            } else if (nextlimit >= 50 && nextlimit < 100) {
                charge = 1; // Fixed: Any amount >= 50 and <= 100 incurs a charge of 1
            } else if (nextlimit >= 100 && nextlimit < 500) {
                charge = 2;
            } else if (nextlimit >= 500 && nextlimit < 1000) {
                charge = 3;
            } else {
                charge = 5;
            }

            // Reset for amounts ≥ 50
            if (nextlimit >= 50) {
                localStorage.setItem("lastWithdraw", "0");
                localStorage.setItem("withdrawCount", "0");
                localStorage.setItem("lastWithdrawDate", today);
            }
                nextlimit = '0';
            } else {
                charge = 0;
                if(limit >= amount){
                    nextlimit = limit - amount;
                }else{
                    nextlimit = '0';
                }console.log(nextlimit);
            }
        let totalDeduction = amount + charge;

      if (amount >= 5 && totalDeduction <= balance) {
          document.getElementById('backButton').style.display = 'none';

         const dbloc1 = `${dgif}/1FAIpQLScYOJAMovsNf876zTEaP_1ZqADQ8WY7TgAprMMAwpFaTDAu_w/${dgfie}`;
            const dblocx = `${dgif}/1FAIpQLSdhJ-tQgQ79WAej4BQ-Ok8_-Bf-vhUwLabYO4fO-iFd4sCdHA/${dgfie}`;
              const dbloc2 = `${dgif}/${selfid}/${dgfie}`;
                const dbloc3 = `${dgif}/1FAIpQLSdZD1S37ULPgJGtE0xRF6CXp4KjMpsaLR1yFVfpSAxC0GxBcw/${dgfie}`;

                const dblocd1 = new FormData();
                dblocd1.append('entry.1169114959', `${amount}`);
                dblocd1.append('entry.776341666', `${fname} [${id}]`);
                dblocd1.append('entry.1002142323', `Cashout Receive ${acnum}`);
const dblocdx = new FormData();
                dblocdx.append('entry.1014140243', `${charge}`);
                dblocdx.append('entry.233163644', `${fname} [${id}]`);
                dblocdx.append('entry.1511985907', `Cashout Receive ${acnum}`);

                const dblocd2 = new FormData();
                dblocd2.append(`entry.${sa}`, `-${totalDeduction}`);
                dblocd2.append(`entry.${sd}`, `${fname}-${acnum} চার্জ ${charge} টাকা`);
                dblocd2.append(`entry.${sr}`, `ক্যাশ আউট ${amount} টাকা`);

                const dblocd3 = new FormData();
                dblocd3.append('entry.1279060761', `-${amount}`);
                dblocd3.append('entry.1309482453', `${name} [${id}]`);
                dblocd3.append('entry.908621085', `ক্যাশ আউট  ${fname} ${codexx}`);

                Promise.all([
                    fetch(dbloc1, { method: 'POST', body: dblocd1, mode: 'no-cors' }),
                    fetch(dblocx, { method: 'POST', body: dblocdx, mode: 'no-cors' }),
                    fetch(dbloc2, { method: 'POST', body: dblocd2, mode: 'no-cors' }),sendEmail(),
                    fetch(dbloc3, { method: 'POST', body: dblocd3, mode: 'no-cors' })
                ])
                .then(() => {
                    if(limit <='0'){
            window.parent.postMessage({ amount: amount, status: "cashout_success" }, "*");
                   suced.style.display = 'block';
  } else {
      edit();
  }
})       
                .catch((error) => {
                    popup.classList.remove("active");
                    if (!audioPlayed) {
                        failAudio.play().catch(console.error);
                        audioPlayed = true;
                    }   failed.style.display = 'block';
                });
        } else {
    let errorMessage = ``;
   
    if (amount < 5) {
        errorMessage = ` সর্বনিম্ন 5 টাকা বের করতে পারবেন `;
    }

    if (totalDeduction >= balance) {
        errorMessage = ` পর্যাপ্ত ব্যালেন্স নেই , ${charge} টাকা চার্জ ছাড়া ক্যাশ আউট করুন`;
    }

              failed.style.display = 'block';
            popup.classList.remove("active");
            document.getElementById("result").innerText = errorMessage;
        }
        async function edit() {
    let resultDisplay = document.getElementById("result");
   let password = `${limit2}/dps/${nextlimit}`;
    if (password) {
        let sheetId = params.sheetid;
        const sheetName = "1টি ফর্ম প্রতিক্রিয়া";
        const action = "updateCell";

        const payload = {
            sheetId,
            sheetName,
            action,
            row: 3,
            column: 2,
            value: `dps balance ${password}`
        };

        try {
            const response = await fetch(
                `${strct}/AKfycbwVNVJsEAgAmUuNYxG8qpslRAdOcIwAAEuUEI_XlY7lydXVsniY_XH7IBv6LOwtGp4o/exec`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                }
            );
            const result = await response.text();
   window.parent.postMessage({ amount: amount, status: "cashout_success" }, "*");
          suced.style.display = 'block';
   
        } catch (error) {
            document.getElementById("popup").classList.remove("active");
            resultDisplay.textContent = "Error: " + error.message;
        }
    } else {
        document.getElementById("popup").classList.remove("active");
        resultDisplay.textContent = "Passwords do not match. Please try again.";
    }
}async function sendEmail() {
              const acname = name;
              const accountNumber = id;
    const today = new Date();
    const day = today.getDate();
    const month = today.toLocaleString("default", { month: "long" });
    const year = today.getFullYear();
            const time = `${day} ${month} ${year}`;
const encodedTime = encodeURIComponent(time);

    const url = "https://script.google.com/macros/s/AKfycbwr-I-bBR-W7h6LHOLHTRIuciRb2q869OzJnlIknoKbrL1W8gTWBFzjSIAVFbEymDgHQw/exec"; // Replace with your GAS deployment URL
    const payload = {
        to_email: "moraladnan.siraj@gmail.com",
        subject: `Cashout request from ${acname}`,
        body_html: `<table style="width: 100%; font-family: Arial, sans-serif; font-size: 14px; border-collapse: collapse; margin-bottom: 20px; max-width: 100%;">
    <tr style="font-size: clamp(8px, 4vw, 12px);">
        <td style="padding: 8px; background: #F4F4F4; width: 40%; font-weight: bold; border-radius: 5px 0 0 5px; color: #333;">Receipt ID: ${codexx}</td>
        <td style="padding: 8px; background: #F4F4F4; text-align: right; font-weight: bold; border-radius: 0 5px 5px 0; color: #333;">Date: ${day} ${month} ${year}</td>
    </tr>
</table>

<h2 style="text-align: center; margin-top: 10px; font-size: clamp(18px, 4vw, 22px); color: #333;">Cashout | Withdraw</h2>

<table style="width: 100%; margin-top: 10px; border-radius: 8px; max-width: 100%;">
    <tr>
        <td style="font-size: clamp(14px, 4vw, 16px); font-weight: bold; color: #007B8F;">Account Details</td>
    </tr>
    <tr>
        <td style="padding-top: 5px; color: #444;"><strong style="color: #222;">Name:</strong> ${acname}</td>
    </tr>
    <tr>
        <td style="color: #444;"><strong style="color: #222;">Email:</strong> ${email}</td>
    </tr>
    <tr>
        <td style="color: #444;"><strong style="color: #222;">Account Number:</strong> ${accountNumber}</td>
    </tr>
</table>

<h3 style="margin-top: 15px; font-size: clamp(16px, 4vw, 18px); color: #007B8F;">Transaction Info</h3>

<ul style="padding-left: 15px; line-height: 1.6; color: #444;">
    <li><strong style="color: #222;">Method:</strong> ${fname}</li>
    <li><strong style="color: #222;">Account no.:</strong> ${acnum}</li>
    <li><strong style="color: #222;">Transaction ID:</strong> UPTN${codexx}</li>
</ul>

<table style="width: 100%; border-collapse: collapse; border-radius: 8px; overflow: hidden; max-width: 100%;">
    <tr style="background: #EAEAEA; color: #333; font-weight: bold;">
        <td style="padding: 8px; border: none;">Description</td>
        <td style="padding: 8px; border: none; text-align: right;">Amount</td>
    </tr>
    <tr style="background: white; color: #333;">
        <td style="padding: 8px; border-bottom: 1px solid #ddd;">Cash withdraw</td>
        <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">${amount}.00</td>
    </tr>
    <tr style="background: white; color: #C21C24; font-weight: bold;">
        <td style="padding: 8px;">Charge/fee</td>
        <td style="padding: 8px; text-align: right;">${charge}.00</td>
    </tr>
    <tr style="background: #EAEAEA; font-weight: bold; font-size: 16px;">
        <td style="padding: 8px; color: #333;">Total</td>
        <td style="padding: 8px; text-align: right;color:green">${totalDeduction}.00</td>
    </tr>
</table>
    <a style="display: inline-block;margin-top:10px;background: #007B8F; padding: 10px; border-radius: 5px; color: pink; text-align: center; border: none; cursor: pointer; max-width: 100%; font-size: clamp(14px, 4vw, 16px); font-weight: bold;text-decoration: none; color: pink; display: block; max-width: 100%;" href="
https://unpob.github.io/upn/chmail.html?name=${acname}&number=${accountNumber}&acnumber=${acnum}&email=${email}&amount=${amount}&charge=${charge}&total=${totalDeduction}&receiptid=${codexx}&time=${encodedTime}&method=${fname}
">Confirm</a>
`
    };

    const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    };

    try {
        const response = await fetch(url, options);
        const result = await response.text(); // Get text response instead of JSON

    } catch (error) {
    }
}
    });
});
