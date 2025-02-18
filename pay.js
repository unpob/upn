
const inputs = document.querySelectorAll('.form-header input, .form-group input');
const sendButton = document.getElementById('send-button');
document.querySelector('.no-connection-popup').style.zIndex = '1001';
sendButton.style.display = 'none';
inputs.forEach(input => {
    input.addEventListener('input', () => {
        if (input.value.trim() !== '') {
            sendButton.classList.add('active');
        } else {
            sendButton.classList.remove('active');
        }
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

const abcdhhsUrl = `${dgistart}/1AX5IYcOsV8vCGyAoj1mUi9r_Zd51UbLkudv8uPqSMcI/gviz/tq?tqx=out:csv`;

let profiles = {}; // This will hold the phone number -> image URL mapping

// Fetch and parse the abcdhhs file
async function fetchabcdhhs() {
    try {
        const response = await fetch(abcdhhsUrl);
        const abcdhhsText = await response.text();

        // Parse abcdhhs into rows and columns
        const rows = abcdhhsText.split('\n').filter(row => row.trim() !== '');
        const data = rows.map(row => {
            return row.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/)
                .map(cell => cell.replace(/^"|"$/g, '').trim());
        });

        // Map the phone number (column 1) to the image URL (column 9)
        profiles = data.reduce((acc, row) => {
            const phoneNumber = row[1]; // Column 1 is phone number
            const frmId = row[4];        // Form ID
            const sdEntry = row[5];      // SD Entry
            const srEntry = row[6];      // SR Entry
            const saEntry = row[7]; 
            const xname = row[2];        // Example: SA Entry
            const imageUrl = row[8]; 
const xmail = row[9];            // Column 9 is the image URL

            // Store the data if phone number and image URL exist
            if (phoneNumber && imageUrl) {
                acc[phoneNumber] = { frmId, sdEntry, srEntry, saEntry,xmail, xname, imageUrl,phoneNumber };
            }

            return acc;
        }, {});
    } catch (error) {
    }
}

// Update the profile picture and fields based on the entered phone number
function updateProfile(phonenumber) {
    const profilePic = document.getElementById('profilePic');

    // Check if the phone number is exactly 11 digits
    if (phonenumber.length === 11 && !isNaN(phonenumber)) {
        // Check if the phone number exists in profiles
        if (profiles[phonenumber]) {
            const { frmId, sdEntry, srEntry, saEntry,xmail, xname, imageUrl, phoneNumber } = profiles[phonenumber];
if(imageUrl !== 'not added'){  // Update the profile picture and form fields
            profilePic.src = imageUrl;} else {
             profilePic.src = 'Logoup.jpg';
         }
            profilePic.src = imageUrl;
            
            // Update the profile picture and form fields
            document.getElementById('formid').value = frmId || 'N/A';
            document.getElementById('acname').innerText = xname || 'N/A';
            document.getElementById('sde').value = sdEntry || 'N/A';
            document.getElementById('sre').value = srEntry || 'N/A';
            document.getElementById('sae').value = saEntry || 'N/A';
            document.getElementById('phoneNumber').value = phoneNumber;
        sendButton.style.display = '';
            document.getElementById('acmail').value = xmail;
        } else {
           profilePic.src = 'user.jpg';
             // Default if no profile is found for the phone number
            document.getElementById('formid').value = 'N/A';
            document.getElementById('sde').value = 'N/A';
            document.getElementById('sre').value = 'N/A';
            document.getElementById('sae').value = 'N/A';
      sendButton.style.display = 'none';
        }
    } else {
        profilePic.src = 'user.jpg';
            // Default if input is invalid or empty
        document.getElementById('formid').value = 'N/A';
        document.getElementById('sde').value = 'N/A';
        document.getElementById('sre').value = 'N/A';
        document.getElementById('sae').value = 'N/A';
        sendButton.style.display = 'none';
    }
}


window.onload = async function () {
    await fetchabcdhhs(); // Wait for data fetching

    // Extract query parameters using the custom function
    const params = getQueryParams();

    // Check if the 'name' parameter exists in the query
    if (params.payit) {
        let nameValue = params.payit.trim();
let phoneNumberof;        // Get and trim the 'name' value
        const numberInput = document.getElementById('acname').innerText; // Get the input field
        if (numberInput) {
            if (nameValue === "Habib Store"){
                phoneNumberof ="01850832126";
            } else{
                phoneNumberof = nameValue;
            }
            updateProfile(phoneNumberof); // Execute the profile update logic
        } else {
        }
    } else {
    }
};

document.addEventListener("DOMContentLoaded", function() {document.getElementById("popup").classList.add("active");
    let fetchedDataValue; // Global variable to store fetched data
// Function to manually parse query parameters from the URL

    function fetchData() {
        const secureData = JSON.parse(localStorage.getItem('secureData'));
        const tbl = Number('0');
const params = getQueryParams();
        
const sheetId = params.sheetid;
        const url= `${dgistart}/${sheetId}/${dgih}`;
        fetch(url)
            .then(response => response.text())
            .then(data => {
                const parser = new DOMParser();
                const htmlDoc = parser.parseFromString(data, 'text/html');
                const tables = htmlDoc.querySelectorAll('table');

                if (tbl >= tables.length) {
                    return;
                }

                const cellElement = tables[tbl].rows[3].cells[4]; // Fetching data from the specified table, row 4, column 2
                const cellText = cellElement.innerText || cellElement.textContent;
                fetchedDataValue = parseFloat(cellText.trim()); // Corrected here
                animateText(`${cellText} ৳`, 'balance', 'letter');document.getElementById("popup").classList.remove("active");
            })
           .catch((error) => {
            console.error("Error fetching data:", error);
            document.getElementById("popup").classList.remove("active");
        });
    }
        

    function animateText(text, elementId, className) {
        const element = document.getElementById(elementId);
        element.innerHTML = ''; // Clear any existing content

        text.split('').forEach((char, index) => {
            const letterSpan = document.createElement('span');
            letterSpan.textContent = char === ' ' ? '\u00A0' : char; // Use non-breaking space for spaces
            letterSpan.classList.add(className);
            letterSpan.style.animationDelay = `${index * 0.1}s`;
            element.appendChild(letterSpan);
        });
    }

    fetchData();
    const codexx = Math.floor(1000 + Math.random() * 9000);


    document.getElementById('send-money-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Change the button state to show sending
    const sendButton = document.getElementById('send-button');
    sendButton.style.opacity = '0.5';
    sendButton.innerText = 'Sending......';
    sendButton.disabled = true;
    document.getElementById("popup").classList.add("active");

    // Audio handling
    let audioPlayed = false;
    const audioElement = new Audio('ting.mp3');
    const audioElement2 = new Audio('fail.mp3');
    audioElement.preload = 'auto';
    audioElement.load();
    audioElement2.preload = 'auto';
    audioElement2.load();
const params = getQueryParams();

    // Form data
    const hisid = document.getElementById('formid').value;
    const hisd = document.getElementById('sde').value;
    const hisr = document.getElementById('sre').value;
    const hisa = document.getElementById('sae').value;
const acmailis =document.getElementById('acmail').value;
    const accountNumber = document.getElementById('phoneNumber').value;
    const acname = document.getElementById('acname').textContent;
    const accountNumber2 = `${acname} [${accountNumber}]`;
    const amount = parseFloat(document.getElementById('amount').value); // Ensure amount is a number
    const amount2 = `-${amount}`;
    
    const secureData = JSON.parse(localStorage.getItem('secureData'));
    const name = params.name;
        const numberofmy = params.id;
        const matchedName = name;
    const updatedDescription = `${matchedName} [${numberofmy}]`;
    const selfid = params.formid;
    const sa = params.sa;
    const sd = params.sd;
    const sr = params.sr;
    const sa2 = document.getElementById('sa2').value;
    const sd2 = document.getElementById('sd2').value;
    const sr2 = document.getElementById('sr2').value;
    const reason1 = 'পেমেন্ট রিসিভড';
    const reason2 = 'পেমেন্ট';
    const suced = document.getElementById('no-connection-popup3');
    const failed = document.getElementById('no-connection-popup2');

    let dbData = [];

    if (amount >= 1 && amount <= fetchedDataValue && numberofmy !== accountNumber) {
        document.getElementById('backButton').style.display = 'none';
        const dbloc1 = `${dgif}/${hisid}/${dgfie}`;
        const dbloc2 = `${dgif}/${selfid}/${dgfie}`;
        const dbloc3 = `${dgif}/1FAIpQLSdZD1S37ULPgJGtE0xRF6CXp4KjMpsaLR1yFVfpSAxC0GxBcw/${dgfie}`;

        const dblocd1 = new FormData();
        dblocd1.append(`entry.${hisa}`, amount);
        dblocd1.append(`entry.${hisd}`, updatedDescription);
        dblocd1.append(`entry.${hisr}`, reason1);

        const dblocd2 = new FormData();
        dblocd2.append(`entry.${sa}`, amount2);
        dblocd2.append(`entry.${sd}`, accountNumber2);
        dblocd2.append(`entry.${sr}`, reason2);

        const dblocd3 = new FormData();
        dblocd3.append(`entry.${sa2}`, '0');
        dblocd3.append(`entry.${sd2}`, `[${amount2}bdt] payf ${updatedDescription}`);
        dblocd3.append(`entry.${sr2}`, `payt ${accountNumber2}`);

        // Promise.all for the fetch requests
        Promise.all([
            fetch(dbloc1, { method: 'POST', body: dblocd1, mode: 'no-cors' }),
            fetch(dbloc2, { method: 'POST', body: dblocd2, mode: 'no-cors' }),sendEmail(),
            fetch(dbloc3, { method: 'POST', body: dblocd3, mode: 'no-cors' })
        ])
        .then(() => {
            setTimeout(function () {
               
            window.parent.postMessage({ amount: amount, status: "pay_success" }, "*");
          }, 1000);
            suced.style.display = 'block';

                    })
        .catch(error => {
            // In case of fetch error
            document.getElementById("popup").classList.remove("active");
            failed.style.display = 'block';
            audioElement2.play();
        });
    } else {
    let errorMessage = `🚫 নম্বর ভুল হয়েছে`;
    document.getElementById('send-button').style.opacity = '1';
    document.getElementById('send-button').innerHTML = '<i class="fa-duotone fa-solid fa-paper-plane"></i>';
    document.getElementById('send-button').disabled = false;
    document.getElementById("popup").classList.remove("active");

    if (amount < 1) {
        errorMessage = ` সর্বনিম্ন 1 টাকা পাঠাতে পারবেন `;
    }

    if (amount > fetchedDataValue) {
        errorMessage = ` পর্যাপ্ত ব্যালেন্স নেই`;
    }

    if (accountNumber === numberofmy) {
        errorMessage = ` নিজের নম্বর গ্রহণ যগ্য নয়`;
    } document.getElementById('result2').innerText = errorMessage;
     document.getElementById("popup").classList.remove("active");
        failed.style.display = 'block';
        audioElement2.play();
    }
        async function sendEmail() {
    const email = acmailis;
    const today = new Date();
    const day = today.getDate();
    const month = today.toLocaleString("default", { month: "long" });
    const year = today.getFullYear();
    const url = "https://script.google.com/macros/s/AKfycbwr-I-bBR-W7h6LHOLHTRIuciRb2q869OzJnlIknoKbrL1W8gTWBFzjSIAVFbEymDgHQw/exec"; // Replace with your GAS deployment URL
    const payload = {
        to_email: email,
        subject: `Payment received ${amount} BDT`,
        body_html: `<table style="width: 100%; font-family: Arial, sans-serif; font-size: 14px; border-collapse: collapse; margin-bottom: 20px; max-width: 100%;">
    <tr style="font-size: clamp(8px, 4vw, 12px);">
        <td style="padding: 8px; background: #F4F4F4; width: 40%; font-weight: bold; border-radius: 5px 0 0 5px; color: #333;">Receipt ID: ${codexx}</td>
        <td style="padding: 8px; background: #F4F4F4; text-align: right; font-weight: bold; border-radius: 0 5px 5px 0; color: #333;">Date: ${day} ${month} ${year}</td>
    </tr>
</table>

<h2 style="text-align: center; margin-top: 10px; font-size: clamp(18px, 4vw, 22px); color: #333;">Payment received</h2>

<table style="width: 100%; margin-top: 10px;margin-bottom: 20px; border-radius: 8px; max-width: 100%;">
    <tr>
        <td style="font-size: clamp(14px, 4vw, 16px); font-weight: bold; color: #007B8F;">Payer Account</td>
    </tr>
    <tr>
        <td style="padding-top: 5px; color: #444;"><strong style="color: #222;">Name:</strong> ${name}</td>
    </tr>
        <tr>
        <td style="padding-top: 5px; color: #444;"><strong style="color: #222;">Transaction ID:</strong> UPTN${codexx}</td>
        
    </tr>
    <tr>
        <td style="color: #444;"><strong style="color: #222;">Account Number:</strong> ${numberofmy}</td>
    </tr>
    
</table>

    
<table style="width: 100%; border-collapse: collapse; border-radius: 8px; overflow: hidden; max-width: 100%;">
    <tr style="background: #EAEAEA; color: #333; font-weight: bold;">
        <td style="padding: 8px; border: none;">Description</td>
        <td style="padding: 8px; border: none; text-align: right;">Amount</td>
    </tr>
    <tr style="background: white; color: #333;">
        <td style="padding: 8px; border-bottom: 1px solid #ddd;">Payment received</td>
        <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">${amount}.00</td>
    </tr>
    <tr style="background: white; color: #C21C24; font-weight: bold;">
        <td style="padding: 8px;">Charge/fee</td>
        <td style="padding: 8px; text-align: right;">0.00</td>
    </tr>
    <tr style="background: #EAEAEA; font-weight: bold; font-size: 16px;">
        <td style="padding: 8px; color: #333;">Total</td>
        <td style="padding: 8px; text-align: right;color:green">${amount}.00</td>
    </tr>
</table>
    <a style="display: inline-block;margin-top:20px;background: #007B8F; padding: 10px; border-radius: 5px; color: pink; text-align: center; border: none; cursor: pointer; max-width: 100%; font-size: clamp(14px, 4vw, 16px); font-weight: bold;text-decoration: none; color: pink; display: block; max-width: 100%;" href="https://nfcard.github.io/login/red.html">OPEN UP NEXT</a>
<p>This is an email for your recent transaction on&nbsp;<strong>UP NEXT</strong>.&nbsp;</p>
<p>If you're having trouble with&nbsp; the Email above, please&nbsp; contact this number:&nbsp; <a href="tel:+8801888396332" target="_blank" rel="noopener"><strong>01888396332</strong></a> or email us by <strong>Replying to this mail</strong> . Have a great day.</p>

<h3 style="font-size: clamp(16px, 4vw, 18px); color: #007B8F;">Terms and Conditions</h3>

<ol style="background: #EAEAEA;padding: 15px; line-height: 1.6; font-size: clamp(8px, 4vw, 10px);color: #444;border-radius: 8px;">
    <li><strong>Transaction Authorization:</strong>  
   By proceeding with this transaction, both the payer and receiver acknowledge and authorize the transfer of funds as specified. The payer confirms that the account used for the transaction has sufficient funds, and the receiver agrees to accept the transferred amount as final and non-refundable, except in cases of proven error or fraud.</li>
   
    <li><strong>Processing Time and Fees:</strong>  
   The transaction may be subject to processing times based on the systems involved and the chosen transfer method. Any applicable fees or charges will be deducted from the transferred amount or charged separately, as per the policies of UP NEXT. Neither party shall hold the other responsible for delays or fees imposed by intermediary systems or financial institutions.</li>
   
    <li><strong>Dispute Resolution:</strong>  
   In the event of any dispute or discrepancy regarding this transaction, both parties agree to resolve the matter amicably within 30 days. If unresolved, the dispute may be escalated to UP NEXT or relevant financial institutions for investigation. Claims must be supported by valid documentation, and neither party shall be liable for errors or delays caused by third-party systems or unforeseen technical issues.</li>
</ol>
<h3 style="text-align: center; margin-top: 10px; font-size: clamp(10px, 4vw, 16px); color: #333;">UP NEXT &copy 2025</h3>
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
