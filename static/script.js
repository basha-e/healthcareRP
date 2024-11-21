document.addEventListener("DOMContentLoaded", () => {
    const updateSensorData = () => {
        fetch('/get_sensor_data')
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    console.error("Error fetching sensor data:", data.error);
                    return;
                }

                // Update blood pressure
                const bp = parseInt(data.blood_pressure, 10);
                document.getElementById("bp").textContent = `${bp} mmHg`;
                document.getElementById("bp-meter").value = bp;
                document.getElementById("bp-condition").textContent = getBPCondition(bp);

                // Update heart rate
                const hr = parseInt(data.heart_rate, 10);
                document.getElementById("hr").textContent = `${hr} bpm`;
                document.getElementById("hr-meter").value = hr;
                document.getElementById("hr-condition").textContent = getHRCondition(hr);

                // Update temperature
                const temp = parseFloat(data.temperature).toFixed(1);
                document.getElementById("temp").textContent = `${temp} °F`;
                document.getElementById("temp-meter").value = temp;
                document.getElementById("temp-condition").textContent = getTempCondition(temp);
            })
            .catch(error => console.error("Failed to fetch data:", error));
    };

    // Automated health conditions for each sensor
    const getBPCondition = (bp) => {
        if (bp < 90) return "Low Blood Pressure - Stay Hydrated";
        if (bp <= 120) return "Normal Blood Pressure";
        if (bp <= 140) return "Elevated Blood Pressure - Monitor";
        return "High Blood Pressure - Consult Doctor";
    };

    const getHRCondition = (hr) => {
        if (hr < 60) return "Low Heart Rate - Rest Suggested";
        if (hr <= 100) return "Normal Heart Rate";
        return "High Heart Rate - Avoid Stress";
    };

    const getTempCondition = (temp) => {
        if (temp < 97) return "Low Temperature - Stay Warm";
        if (temp <= 99.5) return "Normal Temperature";
        return "High Temperature - Check for Fever";
    };

    // Fetch sensor data every 5 seconds
    updateSensorData();
    setInterval(updateSensorData, 5000);
});
document.addEventListener("DOMContentLoaded", () => {
    // Hide the banner after 3 seconds
    setTimeout(() => {
        document.getElementById("opening-banner").classList.add("hidden");
        document.getElementById("role-modal").classList.remove("hidden");
    }, 3000);

    // Role selection buttons
    const patientBtn = document.getElementById("patient-btn");
    const changeRoleBtn = document.getElementById("change-role-btn");

    // Handle Patient Role Selection
    patientBtn.addEventListener("click", () => {
        document.getElementById("role-modal").classList.add("hidden");
        document.getElementById("main-header").classList.remove("hidden");
        document.getElementById("main-content").classList.remove("hidden");
        document.getElementById("main-footer").classList.remove("hidden");
    });

    // Handle "Change Role" Button
    changeRoleBtn.addEventListener("click", () => {
        document.getElementById("main-header").classList.add("hidden");
        document.getElementById("main-content").classList.add("hidden");
        document.getElementById("main-footer").classList.add("hidden");
        document.getElementById("role-modal").classList.remove("hidden");
    });
});
document.getElementById("communicate-doctor-btn").addEventListener("click", () => {
    alert("Communication feature will be done by Amruta Bandi");
});
