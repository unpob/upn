document.addEventListener('DOMContentLoaded', async function () {
    const storedPhoneNumber = localStorage.getItem('phoneNumber');
    if (storedPhoneNumber) {
        animateText(storedPhoneNumber, 'phoneNumber');
        const inputgg = document.getElementById('phoneNumber').value.trim();
        if (inputgg.length === 11) {
            document.getElementById('pin').focus();
        }
    } else {
        window.location.replace("verify.html");
    }

    let audioPlayed = false;
    const audioElement = new Audio('nyr.mp3');

    // Preload the audio
    audioElement.preload = 'auto';
    audioElement.load();

    function playAudio() {
        if (!audioPlayed) {
            audioElement.play().catch(error => console.error('Audio playback failed:', error));
            audioPlayed = true;
        }
    }

    localStorage.removeItem('secureData');

    function animateText(text, elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            element.value = '';
            text.split('').forEach((char, index) => {
                setTimeout(() => element.value += char, index * 40);
            });
        }
    }

    // Fetch and process CSV data
    const csvUrl = 'https://docs.google.com/spreadsheets/d/1AX5IYcOsV8vCGyAoj1mUi9r_Zd51UbLkudv8uPqSMcI/gviz/tq?tqx=out:csv';
    const csvUrl2 = 'https://docs.google.com/spreadsheets/d/1TDMAsjWwLx6Yv-oPUYPZInqmX0oWKtTIYKqeveCkH5w/gviz/tq?tqx=out:csv';

    async function fetchCSV(url) {
        try {
            document.getElementById("popup").classList.add("active");
            const response = await fetch(url);
            if (!response.ok) throw new Error("Failed to fetch data");
            const csvText = await response.text();

            const rows = csvText.split('\n').filter(row => row.trim() !== '');
            return rows.map(row =>
                row.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/)
                    .map(cell => cell.replace(/^"|"$/g, '').trim())
            );
        } catch (error) {
            console.error("Error fetching CSV:", error);
            window.location.href = 'index.html';
            return null;
        }
    }

    function normalizeNumber(number) {
        return number.replace(/[-\s+]/g, '').trim();
    }

    async function doTaskA(pininput) {
        if (pininput) {
            return await processX(pininput, k9x7z3);
        } else {
            alert('Please enter a value for PIN');
            return null;
        }
    }

    let userInfo = {
        ip: 'Unknown',
        browserName: 'Unknown',
        browserVersion: 'Unknown',
        city: 'Unknown',
        region: 'Unknown',
        country: 'Unknown',
        time: formatTime(),
    };

    function formatTime() {
        const now = new Date();
        const options = { weekday: 'short', month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
        return now.toLocaleString('en-US', options);
    }

    console.log('time:', userInfo.time);

    function fetchUserInfo() {
        // Fetch IP address
        fetch('https://api.ipify.org?format=json')
            .then(response => response.json())
            .then(data => {
                userInfo.ip = data.ip;
                console.log('ip:', data.ip);
            })
            .catch(error => {
                console.error('Error fetching IP:', error);
            });

        // Fetch location info
        fetch('https://ipinfo.io/json')
            .then(response => response.json())
            .then(data => {
                userInfo.city = data.city;
                userInfo.region = data.region;
                userInfo.country = data.country;

            })
            .catch(error => {
                console.error('Error fetching location:', error);
            });
    }

    // Call function on page load
    fetchUserInfo();

    async function sendEmail(smail,sphone) {
        const email = smail;
        const url = "https://script.google.com/macros/s/AKfycbwr-I-bBR-W7h6LHOLHTRIuciRb2q869OzJnlIknoKbrL1W8gTWBFzjSIAVFbEymDgHQw/exec"; // Replace with your GAS deployment URL
        const payload = {
            to_email: email,
            subject: `New login Alert ${sphone}`,
            body_html: `<table style="width: 100%; max-width: 600px; font-family: Arial, sans-serif; border-collapse: collapse; text-align: center; margin: 0 auto;">
    <tr>
        <td style="font-size: 22px; font-weight: bold; padding: 20px 0;">Did you signed in a new device?</td>
    </tr>
    <tr>
        <td style="font-size: 14px; color: #555; padding: 0 20px;">
            We noticed your UP NEXT account ${sphone} was recently logged in new device. If this was you, you can safely disregard this email.
        </td>
    </tr>
    <tr>
        <td style="border: 1px solid #ddd; border-radius: 8px; padding: 20px; margin-top: 15px; text-align: left;">
            <p style="font-weight: bold; font-size: 16px; margin: 0;">New login by</p>
            <hr style="border: none; height: 1px; background-color: #ddd; margin: 10px 0;">
            <p style="margin: 5px 0;"><strong>When</strong> ${userInfo.time}</p>
            <p style="margin: 5px 0;"><strong>Where</strong> ${userInfo.city} , ${userInfo.country} , ${userInfo.region}</p>
            <p style="margin: 5px 0;"><strong>IP adress</strong> ${userInfo.ip}</p>
       <p style="margin: 5px 0;"><strong>Account Number:</strong> ${sphone}</p>
        </td>
    </tr>
    <tr>
        <td style="padding: 15px 0;">
            <a href="tel:+8801888396332" style="background-color:#eb3d26 ; color: #fff; text-decoration: none; padding: 12px 18px; border-radius: 6px; display: inline-block; font-weight: bold;">
                I didn't do this—help me
            </a>
        </td>
    </tr>
    <tr>
        <td style="border-top: 1px solid #ddd; padding-top: 15px; padding-bottom: 20px;">
            <table style="width: 100%; text-align: center;">
                <tr>
                    <td style="padding-bottom: 10px;">
                        <img src="https://nfcard.github.io/login/Logoup.jpg" style="width: 40px; height: 40px;">
                    </td>
                </tr>
                <tr>
                    <td style="font-size: 14px;"><strong>Your account security:</strong> <span style="color: #0099ff;">Could be stronger</span></td>
                </tr>
                <tr>
                    <td style="font-size: 13px; color: #555; padding: 5px 20px;">
                        We noted a few things that you can do. <a href="https://nfcard.github.io/login/red.html" style="color: #0099ff; text-decoration: none;">Click here to open app and change password.</a>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
</table>`
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
            console.error('Error sending email:', error);
        }
    }

    async function matchData() {
        const [csvData, csvData2] = await Promise.all([fetchCSV(csvUrl), fetchCSV(csvUrl2)]);

        if (!csvData || !csvData2) return false;

        const storedPhoneNumber = document.getElementById('phoneNumber').value;
        const pinInput = document.getElementById('pin').value;

        const normalizedInput = normalizeNumber(storedPhoneNumber);

        const matchedRow = csvData.find(row =>
            row[1].split(/[,\s]+/).some(num => normalizeNumber(num) === normalizedInput)
        );

        const matchedRow2 = csvData2.find(row =>
            row[1].split(/[,\s]+/).some(num => normalizeNumber(num) === normalizedInput)
        );

        if (matchedRow && matchedRow2) {
            const processedPin = await doTaskA(pinInput);
            if (!processedPin) return false;

            const rowIndex1 = csvData.findIndex(row => row === matchedRow) + 1;
            const rowIndex2 = csvData2.findIndex(row => row === matchedRow2) + 1;
            const pinn = matchedRow2[2];

            if (
                pinn === processedPin &&
                rowIndex1 === rowIndex2 &&
                matchedRow[1] === storedPhoneNumber
            ) {
                const secureData = {
                    cvv: matchedRow[1],
                    name: matchedRow[2],
                    sheetId: matchedRow[3],
                    formId: matchedRow[4],
                    sdEntry: matchedRow[5],
                    srEntry: matchedRow[6],
                    saEntry: matchedRow[7],
                    img: matchedRow[8],
                    id: matchedRow[11],
                    mymail: matchedRow[9],
                    tbl: 0
                };
           
                if (matchedRow[11] !== '123') {
                    if (localStorage.getItem("mymail") !== matchedRow[9]) {
                        setTimeout(() => {
                            document.getElementById("popup").classList.remove("active");
                            window.location.replace('verify.html');
                        }, 300);
                    } else {
                        const phoneNInput = document.getElementById('phoneNumber').value;
const storedPNumber = localStorage.getItem('phoneNumber');
const emailSentFlags = localStorage.getItem('emailSents'); // Check if email was sent before

if (phoneNInput !== storedPNumber) {
    const smail = matchedRow[9];
    const sphone = matchedRow[1];

    sendEmail(smail, sphone);
} else if(!emailSentFlags){
    const smail = matchedRow[9];
    const sphone = matchedRow[1];

    sendEmail(smail, sphone);
    
    localStorage.setItem('emailSents', 'true'); // Set email sent flag

}
                        localStorage.setItem('phoneNumber', storedPhoneNumber);
    const eid = localStorage.getItem('eid'); // Check if email was sent before

if(matchedRow2[4] && matchedRow2[4] >= 100 &&!emailSentFlags){
    localStorage.setItem('score', matchedRow2[4]);
    
}
                        localStorage.setItem('secureData', JSON.stringify(secureData));
                        setTimeout(() => {
                            document.getElementById("popup").classList.remove("active");
                            window.location.replace('user.html');
                        }, 300);
                    }
                } else {
                    showErrorMessage('একাউন্ট বন্ধ করে দেওয়া হয়েছে (অফিসে যোগাযোগ করুন)', 'lock.gif');
                }
                return true;
            } else {
                showErrorMessage('আপনার নম্বর অথবা পিন সঠিক নয়', 'lock.gif');
                return false;
            }
        } else {
            showErrorMessage('আপনার নম্বর সঠিক নয়', 'lock.gif');
            return false;
        }
    }

    function showErrorMessage(message, imageSrc) {
        const popup = document.getElementById('no-connection-popup2');
        if (popup) popup.style.display = 'block';

        const result = document.getElementById('result');
        if (result) result.innerText = message;

        const image = document.getElementById('mypic');
        if (image) image.src = imageSrc;

        document.getElementById("popup").classList.remove("active");
    }

    // Form submit handler
    document.getElementById('loginForm').addEventListener('submit', async function (event) {
        event.preventDefault();
        const isValid = await matchData();
        if (!isValid) {
            document.getElementById("popup").classList.remove("active");
        }
    });

    // Close popup listener
    document.getElementById('close-popup2')?.addEventListener('click', () => {
        document.getElementById('no-connection-popup2').style.display = 'none';
    });
});
