document.getElementById("scanButton").addEventListener("click", async function () {
    let e = new ZXing.BrowserQRCodeReader(),
        t = document.getElementById("video");

    // Request camera permission first
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        stream.getTracks().forEach(track => track.stop());
    } catch (error) {
        console.error("Permission denied or error accessing camera:", error);
        return;
    }

    // Enumerate devices after permission
    let a = await navigator.mediaDevices.enumerateDevices();

    // Automatically select camera2 0, facing back
    let selectedDeviceId = a.find(device => 
        device.kind === "videoinput" && 
        device.label.toLowerCase().includes("camera2 0") && 
        device.label.toLowerCase().includes("back")
    )?.deviceId;

    // Fallback to first back camera if camera2 0 not found
    if (!selectedDeviceId) {
        selectedDeviceId = a.find(device => 
            device.kind === "videoinput" && 
            device.label.toLowerCase().includes("back")
        )?.deviceId || a[2].deviceId;
    }

    try {
        let stream = await navigator.mediaDevices.getUserMedia({ video: { deviceId: { exact: selectedDeviceId } } });
        t.srcObject = stream;
        t.style.display = "block";

        await e.decodeOnceFromVideoDevice(selectedDeviceId, "video")
            .then((result) => {
                stream.getTracks().forEach((track) => track.stop());
                t.style.display = "none";

                if (result.text.startsWith("sadnan.html?")) {
                    window.location.href = result.text; // Redirect to sadnan.html
                } else if (result.text.startsWith("pay.html?")) {
                    const his = result.text;
                    const payur = localStorage.getItem("payur");
                    const urldatap = `${his}&${payur}`;
                    const queryStringss = urldatap.split('?')[1];
                    localStorage.setItem("payurl", queryStringss); // Redirect with payur
                    window.location.href = 'fontawesome.html';
                } else {
                    alert("QR code সঠিক নয়"); // Invalid QR code alert
                }
            })
            .catch((error) => {
                console.error("Error decoding QR Code: ", error);
                stream.getTracks().forEach((track) => track.stop());
                t.style.display = "none";
            });
    } catch (error) {
        console.error("Error accessing camera: ", error);
        alert("Failed to access the camera.");
    }
});

setTimeout(() => {
    document.getElementById("popup").classList.remove("active");
}, 1000);