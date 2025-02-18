document.addEventListener('DOMContentLoaded', async function () {
    const storedPhoneNumber = localStorage.getItem('phoneNumber');
    if (storedPhoneNumber) {
        animateText(storedPhoneNumber, 'phoneNumber');
        const inputgg = document.getElementById('phoneNumber').value.trim();
        if (inputgg.length === 11) {
          document.getElementById('pin').focus();
}
    } else {
        window.location.href = "verify.html";
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

async function matchData() {
    const csvData = await fetchCSV(csvUrl);
    const csvData2 = await fetchCSV(csvUrl2);
    
    if (!csvData || !csvData2) return false;

    const storedPhoneNumber = document.getElementById('phoneNumber').value;
    const pinInput = document.getElementById('pin').value;

    if (!storedPhoneNumber) {
        window.location.href = "verify.html";
        return false;
    }

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
                localStorage.setItem('phoneNumber', storedPhoneNumber);
                document.body.classList.add('move-down');

                const today = new Date().toLocaleDateString();
                const lastSavedDate = localStorage.getItem('lastSavedDatell');
                const newCoin = Math.abs(Number(localStorage.getItem('score')) + 10);

                if (lastSavedDate !== today) {
                    localStorage.setItem('score', newCoin);
                    localStorage.setItem('lastSavedDatell', today);
                }

                localStorage.setItem('secureData', JSON.stringify(secureData));
                setTimeout(() => {
                    document.getElementById("popup").classList.remove("active");
                    window.location.href = 'user.html';
                }, 300);
            } else {
                showErrorMessage('আপনার একাউন্ট বন্ধ করে দেওয়া হয়েছে (অফিসে যোগাযোগ করুন)', 'lock.gif');
            }
            if (localStorage.getItem("mymail") !== matchedRow[9]) {
                setTimeout(() => {
                    document.getElementById("popup").classList.remove("active");
                    window.location.href = 'verify.html';
                }, 300);
                return false;
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