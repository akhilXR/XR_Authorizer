const backendUrl = "https://xr-authorizer-backend.onrender.com"; // Replace with your backend URL

// Function to authorize a device
async function authorizeDevice() {
    const deviceId = document.getElementById("authorizeDeviceId").value;
    if (!deviceId) {
        alert("Please enter a Device ID");
        return;
    }

    try {
        const response = await fetch(`${backendUrl}/authorize-device`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ deviceId, state: "authorized" }), // Ensure state is set
        });

        const data = await response.json();
        document.getElementById("authorizeMessage").textContent = data.message;
    } catch (error) {
        console.error("Error authorizing device:", error);
        document.getElementById("authorizeMessage").textContent = "Failed to authorize device.";
    }
}

// Function to revoke access for a device
async function revokeAccess() {
    const deviceId = document.getElementById("revokeDeviceId").value;
    if (!deviceId) {
        alert("Please enter a Device ID");
        return;
    }

    try {
        const response = await fetch(`${backendUrl}/revoke-access`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ deviceId, state: "revoked" }), // Ensure state is set
        });

        const data = await response.json();
        document.getElementById("revokeMessage").textContent = data.message;
    } catch (error) {
        console.error("Error revoking access:", error);
        document.getElementById("revokeMessage").textContent = "Failed to revoke access.";
    }
}

// Function to check access for a device
async function checkAccess() {
    const deviceId = document.getElementById("checkDeviceId").value;
    if (!deviceId) {
        alert("Please enter a Device ID");
        return;
    }

    try {
        const response = await fetch(`${backendUrl}/check-access?deviceId=${deviceId}`);
        const data = await response.json();

        let message;
        if (data.state === "authorized") {
            message = "Access granted (Authorized).";
        } else if (data.state === "revoked") {
            message = "Access denied (Revoked).";
        } else {
            message = "Access denied (Not Found).";
        }

        document.getElementById("checkMessage").textContent = message;
    } catch (error) {
        console.error("Error checking access:", error);
        document.getElementById("checkMessage").textContent = "Failed to check access.";
    }
}
