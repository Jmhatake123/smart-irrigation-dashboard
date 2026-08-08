/* ==========================
   PHILIPPINE CROP DATABASE
========================== */
const cropDatabase = {
    pechay: {
        seedling: { n: 70, p: 35, k: 110, ph: "6.0", ec: "1.0", moisture: "65%" },
        vegetative: { n: 140, p: 50, k: 210, ph: "6.5", ec: "1.5", moisture: "75%" }
    },
    kangkong: {
        seedling: { n: 60, p: 30, k: 100, ph: "5.5", ec: "0.8", moisture: "75%" },
        vegetative: { n: 150, p: 45, k: 220, ph: "6.0", ec: "1.2", moisture: "85%" }
    },
    sitaw: {
        seedling: { n: 50, p: 40, k: 90, ph: "6.0", ec: "1.0", moisture: "60%" },
        vegetative: { n: 100, p: 60, k: 160, ph: "6.2", ec: "1.4", moisture: "70%" },
        flowering: { n: 90, p: 80, k: 200, ph: "6.5", ec: "1.8", moisture: "75%" }
    },
    talong: {
        seedling: { n: 100, p: 40, k: 110, ph: "5.8", ec: "1.2", moisture: "65%" },
        vegetative: { n: 190, p: 55, k: 210, ph: "6.2", ec: "2.0", moisture: "70%" },
        flowering: { n: 160, p: 65, k: 260, ph: "6.4", ec: "2.2", moisture: "75%" },
        fruiting: { n: 140, p: 70, k: 300, ph: "6.5", ec: "2.4", moisture: "80%" }
    },
    silinglabuyo: {
        seedling: { n: 90, p: 40, k: 110, ph: "5.8", ec: "1.0", moisture: "65%" },
        vegetative: { n: 170, p: 50, k: 210, ph: "6.2", ec: "1.8", moisture: "70%" },
        flowering: { n: 130, p: 65, k: 250, ph: "6.3", ec: "2.0", moisture: "75%" },
        fruiting: { n: 110, p: 70, k: 290, ph: "6.5", ec: "2.2", moisture: "75%" }
    },
    kamatis: {
        seedling: { n: 120, p: 50, k: 100, ph: "5.8", ec: "1.2", moisture: "65%" },
        vegetative: { n: 220, p: 60, k: 180, ph: "6.0", ec: "2.0", moisture: "70%" },
        flowering: { n: 180, p: 70, k: 250, ph: "6.2", ec: "2.5", moisture: "75%" },
        fruiting: { n: 160, p: 70, k: 300, ph: "6.5", ec: "2.5", moisture: "80%" }
    },
    ampalaya: {
        seedling: { n: 90, p: 50, k: 120, ph: "6.0", ec: "1.2", moisture: "65%" },
        vegetative: { n: 180, p: 60, k: 220, ph: "6.2", ec: "1.8", moisture: "70%" },
        flowering: { n: 150, p: 75, k: 260, ph: "6.5", ec: "2.2", moisture: "75%" },
        fruiting: { n: 130, p: 80, k: 310, ph: "6.6", ec: "2.4", moisture: "75%" }
    },
    kalamansi: {
        seedling: { n: 100, p: 30, k: 90, ph: "5.5", ec: "1.0", moisture: "60%" },
        vegetative: { n: 180, p: 50, k: 180, ph: "5.8", ec: "1.5", moisture: "65%" },
        flowering: { n: 150, p: 70, k: 220, ph: "6.0", ec: "2.0", moisture: "70%" },
        fruiting: { n: 120, p: 60, k: 280, ph: "6.2", ec: "2.2", moisture: "70%" }
    },
    strawberry: {
        seedling: { n: 70, p: 40, k: 90, ph: "5.5", ec: "1.0", moisture: "60%" },
        vegetative: { n: 130, p: 50, k: 180, ph: "5.6", ec: "1.5", moisture: "65%" },
        flowering: { n: 110, p: 60, k: 220, ph: "5.8", ec: "1.8", moisture: "70%" },
        fruiting: { n: 90, p: 60, k: 260, ph: "6.0", ec: "2.0", moisture: "70%" }
    },
    basil: {
        seedling: { n: 60, p: 30, k: 100, ph: "5.5", ec: "0.8", moisture: "60%" },
        vegetative: { n: 140, p: 45, k: 210, ph: "6.0", ec: "1.4", moisture: "70%" }
    }
};

const readableCropNames = {
    pechay: "Pechay", kangkong: "Kangkong", sitaw: "Sitaw", talong: "Talong",
    silinglabuyo: "Siling Labuyo", kamatis: "Kamatis", ampalaya: "Ampalaya",
    kalamansi: "Kalamansi", strawberry: "Strawberry", basil: "Basil"
};

/* ==========================================================================
   DYNAMIC TRACKER STATE CONTAINER
   ========================================================================== */
let activeZones = [
    { id: "A", name: "SOIL ZONE A (Precise Node 01)", defaultCrop: "talong", defaultStage: "vegetative" },
    { id: "B", name: "SOIL ZONE B (Precise Node 02)", defaultCrop: "pechay", defaultStage: "vegetative" },
    { id: "C", name: "SOIL ZONE C (Precise Node 03)", defaultCrop: "kamatis", defaultStage: "fruiting" }
];

const container = document.getElementById("dynamic-zones-container");

function renderZonesUI() {
    if (!container) return;
    container.innerHTML = "";

    activeZones.forEach(zone => {
        const block = document.createElement("div");
        block.className = `zone-block`;
        block.id = `zoneBlock-${zone.id}`;

        block.innerHTML = `
            <div class="zone-header">
                <h3>📍 ${zone.name}</h3>
                <div class="zone-selectors">
                    <select id="cropSelect${zone.id}" onchange="syncZoneProfile('${zone.id}')">
                        <option value="pechay" ${zone.defaultCrop==='pechay'?'selected':''}>Pechay</option>
                        <option value="kangkong" ${zone.defaultCrop==='kangkong'?'selected':''}>Kangkong</option>
                        <option value="sitaw" ${zone.defaultCrop==='sitaw'?'selected':''}>Sitaw</option>
                        <option value="talong" ${zone.defaultCrop==='talong'?'selected':''}>Talong</option>
                        <option value="silinglabuyo" ${zone.defaultCrop==='silinglabuyo'?'selected':''}>Siling Labuyo</option>
                        <option value="kamatis" ${zone.defaultCrop==='kamatis'?'selected':''}>Kamatis</option>
                        <option value="ampalaya" ${zone.defaultCrop==='ampalaya'?'selected':''}>Ampalaya</option>
                        <option value="kalamansi" ${zone.defaultCrop==='kalamansi'?'selected':''}>Kalamansi</option>
                        <option value="strawberry" ${zone.defaultCrop==='strawberry'?'selected':''}>Strawberry</option>
                        <option value="basil" ${zone.defaultCrop==='basil'?'selected':''}>Basil</option>
                    </select>
                    <select id="growthStage${zone.id}" onchange="syncZoneProfile('${zone.id}')">
                        <option value="seedling" ${zone.defaultStage==='seedling'?'selected':''}>Seedling</option>
                        <option value="vegetative" ${zone.defaultStage==='vegetative'?'selected':''}>Vegetative</option>
                        <option value="flowering" ${zone.defaultStage==='flowering'?'selected':''}>Flowering</option>
                        <option value="fruiting" ${zone.defaultStage==='fruiting'?'selected':''}>Fruiting</option>
                    </select>
                    <button class="delete-zone-btn" onclick="deleteZone('${zone.id}')">🗑️ Remove</button>
                </div>
            </div>

            <div class="card-grid matrix-grid">
                <div class="card matrix-card"><h3>Nitrogen</h3><div class="comparison-values"><div><span class="val-label">LIVE</span><p id="nitrogen${zone.id}">--</p></div><div class="divider-line"></div><div><span class="val-label">TARGET</span><p id="targetN${zone.id}" class="target-val">--</p></div></div></div>
                <div class="card matrix-card"><h3>Phosphorus</h3><div class="comparison-values"><div><span class="val-label">LIVE</span><p id="phosphorus${zone.id}">--</p></div><div class="divider-line"></div><div><span class="val-label">TARGET</span><p id="targetP${zone.id}" class="target-val">--</p></div></div></div>
                <div class="card matrix-card"><h3>Potassium</h3><div class="comparison-values"><div><span class="val-label">LIVE</span><p id="potassium${zone.id}">--</p></div><div class="divider-line"></div><div><span class="val-label">TARGET</span><p id="targetK${zone.id}" class="target-val">--</p></div></div></div>
                <div class="card matrix-card"><h3>Soil pH</h3><div class="comparison-values"><div><span class="val-label">LIVE</span><p id="soilPH${zone.id}">--</p></div><div class="divider-line"></div><div><span class="val-label">TARGET</span><p id="targetPH${zone.id}" class="target-val">--</p></div></div></div>
                <div class="card matrix-card"><h3>Soil EC</h3><div class="comparison-values"><div><span class="val-label">LIVE</span><p id="soilEC${zone.id}">--</p></div><div class="divider-line"></div><div><span class="val-label">TARGET</span><p id="targetEC${zone.id}" class="target-val">--</p></div></div></div>
                <div class="card matrix-card"><h3>Moisture</h3><div class="comparison-values"><div><span class="val-label">LIVE</span><p id="soil${zone.id}">--</p></div><div class="divider-line"></div><div><span class="val-label">TARGET</span><p id="targetMoisture${zone.id}" class="target-val">--</p></div></div></div>
            </div>
            
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
                <div id="recommendationBox${zone.id}" class="alert-box" style="flex:1; margin-top:0;">Synchronizing...</div>
                
                <div class="zone-valve-strip">
                    <div class="sub-valve-indicator">
                        <span>🚪 Distribution Solenoid [SV-${zone.id}]:</span>
                        <b id="solenoidState-${zone.id}" style="color:var(--danger)">CLOSED</b>
                    </div>
                </div>
            </div>
        `;
        container.appendChild(block);
        syncZoneProfile(zone.id);
    });
}

/* ==========================================================================
   DOM OPERATIONS & ZONE SELECTION PERSISTENCE
   ========================================================================== */
document.getElementById("addZoneBtn").addEventListener("click", () => {
    const inputField = document.getElementById("newZoneName");
    const nameText = inputField.value.trim();
    if (nameText === "") return alert("Please enter a valid label name.");

    const uniqueId = "Z" + Date.now().toString().slice(-4); 
    activeZones.push({ id: uniqueId, name: nameText.toUpperCase(), defaultCrop: "pechay", defaultStage: "seedling" });
    writeZoneProfile(activeZones[activeZones.length - 1]);
    inputField.value = "";
    renderZonesUI();
    updateDashboard();
});

function deleteZone(zoneId) {
    if(confirm("Remove this configuration matrix?")) {
        activeZones = activeZones.filter(z => z.id !== zoneId);
        if (firebaseReady) db.ref(`irrigation/config/zones/${zoneId}`).remove();
        renderZonesUI();
        updateDashboard();
    }
}

function syncZoneProfile(zoneId) {
    const cropSelect = document.getElementById(`cropSelect${zoneId}`);
    const growthStage = document.getElementById(`growthStage${zoneId}`);
    if (!cropSelect || !growthStage) return;

    const crop = cropSelect.value;
    const availableStages = Object.keys(cropDatabase[crop]);

    Array.from(growthStage.options).forEach(opt => {
        if (availableStages.includes(opt.value)) {
            opt.disabled = false; opt.style.opacity = "1";
        } else {
            opt.disabled = true; opt.style.opacity = "0.25";
            if (growthStage.value === opt.value) growthStage.value = availableStages[0];
        }
    });

    const activeStage = growthStage.value;
    const data = cropDatabase[crop][activeStage];

    if (data) {
        setElementText(`targetN${zoneId}`, data.n + " ppm");
        setElementText(`targetP${zoneId}`, data.p + " ppm");
        setElementText(`targetK${zoneId}`, data.k + " ppm");
        setElementText(`targetPH${zoneId}`, data.ph);
        setElementText(`targetEC${zoneId}`, data.ec + " mS/cm");
        setElementText(`targetMoisture${zoneId}`, data.moisture);

        const recBox = document.getElementById(`recommendationBox${zoneId}`);
        if (recBox) recBox.innerHTML = `🎯 <b>${readableCropNames[crop]} Targets:</b> NPK: ${data.n}-${data.p}-${data.k} | pH: ${data.ph}`;
        
        const zoneObj = activeZones.find(z => z.id === zoneId);
        if (zoneObj) {
            zoneObj.defaultCrop = crop; zoneObj.defaultStage = activeStage;
            writeZoneProfile(zoneObj);
        }
    }
}

function setElementText(id, value) {
    const el = document.getElementById(id); if (el) el.innerText = value;
}

/* ==========================================================================
   FIREBASE REALTIME DATABASE BRIDGE

   Database contract:
     irrigation/live       ESP32 #1 -> dashboard (latest verified readings)
     irrigation/config     dashboard -> ESP32 #1 (zone profiles)
     irrigation/commands   dashboard -> ESP32 #1 (queued, acknowledged commands)

   Important: this dashboard NEVER switches a relay itself. It only queues a
   command; ESP32 #1 validates the system state and sends approved work to ESP32 #2.
   ========================================================================== */
let db = null;
let auth = null;
let liveData = {};
let firebaseReady = false;
let databaseListenersAttached = false;

function setConnection(connected, label) {
    const dot = document.getElementById("connectionDot");
    const text = document.getElementById("connectionStatus");
    if (dot) dot.style.backgroundColor = connected ? "var(--success)" : "var(--danger)";
    if (text) text.innerText = label;
}

function initializeFirebase() {
    const config = window.FIREBASE_CONFIG;
    if (!config || !config.databaseURL || config.apiKey === "PASTE_YOUR_API_KEY") {
        setConnection(false, "Firebase not configured");
        return;
    }
    try {
        if (!firebase.apps.length) firebase.initializeApp(config);
        db = firebase.database();
        auth = firebase.auth();
        firebaseReady = true;
        auth.onAuthStateChanged(user => {
            const loginScreen = document.getElementById("loginScreen");
            const logoutButton = document.getElementById("logoutBtn");
            if (!user) {
                if (loginScreen) loginScreen.hidden = false;
                if (logoutButton) logoutButton.hidden = true;
                setConnection(false, "Sign in required");
                return;
            }
            if (loginScreen) loginScreen.hidden = true;
            if (logoutButton) logoutButton.hidden = false;
            attachDatabaseListeners();
        });
    } catch (error) {
        console.error(error);
        setConnection(false, "Firebase setup failed");
    }
}

function attachDatabaseListeners() {
    if (databaseListenersAttached) return;
    databaseListenersAttached = true;
    setConnection(true, "Connecting to Firebase…");
    try {
        db.ref("irrigation/live").on("value", snapshot => {
            liveData = snapshot.val() || {};
            updateDashboard();
            const lastSeen = Number(liveData.meta?.updatedAt || 0);
            const fresh = lastSeen && Date.now() - lastSeen < 90000;
            setConnection(fresh, fresh ? "Live system connected" : "Waiting for ESP32 data");
        }, error => setConnection(false, `Database error: ${error.code || "unknown"}`));
        db.ref("irrigation/config/zones").once("value").then(snapshot => {
            const saved = snapshot.val();
            if (!saved) return;
            activeZones = Object.entries(saved).map(([id, zone]) => ({
                id, name: zone.name || `SOIL ZONE ${id}`,
                defaultCrop: zone.crop || "pechay", defaultStage: zone.stage || "seedling"
            }));
            renderZonesUI();
            updateDashboard();
        });
    } catch (error) {
        console.error(error);
        setConnection(false, "Firebase setup failed");
    }
}

function writeZoneProfile(zone) {
    if (!firebaseReady) return;
    db.ref(`irrigation/config/zones/${zone.id}`).set({
        name: zone.name, crop: zone.defaultCrop, stage: zone.defaultStage,
        updatedAt: firebase.database.ServerValue.TIMESTAMP
    }).catch(error => alert(`Could not save zone: ${error.message}`));
}

function queueCommand(type, payload = {}) {
    if (!firebaseReady || !auth?.currentUser) return alert("Sign in before sending a command.");
    const command = {
        type, payload, status: "queued", source: "dashboard",
        requestedAt: firebase.database.ServerValue.TIMESTAMP
    };
    return db.ref("irrigation/commands").push(command)
        .then(() => alert(`Command queued: ${type}. The ESP32 must validate and acknowledge it before anything moves.`))
        .catch(error => alert(`Could not queue command: ${error.message}`));
}

const loginForm = document.getElementById("loginForm");
if (loginForm) loginForm.addEventListener("submit", async event => {
    event.preventDefault();
    const errorBox = document.getElementById("loginError");
    if (!auth) { if (errorBox) errorBox.textContent = "Firebase is not configured."; return; }
    if (errorBox) errorBox.textContent = "";
    try {
        await auth.signInWithEmailAndPassword(
            document.getElementById("loginEmail").value.trim(),
            document.getElementById("loginPassword").value
        );
        loginForm.reset();
    } catch (error) {
        if (errorBox) errorBox.textContent = "Sign-in failed. Check your email and password.";
        console.error(error);
    }
});

const logoutButton = document.getElementById("logoutBtn");
if (logoutButton) logoutButton.addEventListener("click", () => auth?.signOut());

function value(path, fallback = null) {
    return path.split(".").reduce((current, key) => current?.[key], liveData) ?? fallback;
}

function updateValveCardUI(valveId, isOpen) {
    const card = document.getElementById(`valveCard-${valveId}`);
    const badge = document.getElementById(`valveStatus-${valveId}`);
    if(!card || !badge) return;

    if(isOpen) {
        card.classList.add('valve-open');
        badge.innerText = "OPEN"; badge.className = "valve-badge open";
    } else {
        card.classList.remove('valve-open');
        badge.innerText = "CLOSED"; badge.className = "valve-badge closed";
    }
}

function updateRPMGauge(displayId, barId, rpm) {
    const display = document.getElementById(displayId);
    const bar = document.getElementById(barId);
    if(!display || !bar) return;

    const currentRPM = Number(rpm || 0);
    display.innerText = `${currentRPM} RPM`;
    let percent = (currentRPM / 3600) * 100;
    bar.style.width = `${Math.min(percent, 100)}%`;
}

function checkNutrientDeficiency(liveValue, targetElementId, liveDisplayElementId, unitString, isFloat = false) {
    const targetElement = document.getElementById(targetElementId);
    const liveElement = document.getElementById(liveDisplayElementId);
    if (!targetElement || !liveElement) return false;

    if (liveValue === undefined || liveValue === null || Number.isNaN(Number(liveValue))) {
        liveElement.innerText = "--";
        liveElement.className = "";
        return false;
    }
    const targetNum = isFloat ? parseFloat(targetElement.innerText) : parseInt(targetElement.innerText);
    liveElement.innerText = liveValue + (unitString ? " " + unitString : "");

    if (!isNaN(targetNum) && liveValue < targetNum) {
        liveElement.className = "lacking-nutrient";
        return true; // Deficiency discovered
    } else {
        liveElement.className = "";
        return false;
    }
}

function updateDashboard() {
    const system = value("system", {}), sensors = value("sensors", {}), actuators = value("actuators", {});
    setElementText("reservoirLevel", sensors.reservoirLevel == null ? "--" : `${Number(sensors.reservoirLevel).toFixed(1)}%`);
    setElementText("mixingLevel", sensors.mixingLevel == null ? "--" : `${Number(sensors.mixingLevel).toFixed(1)}%`);
    setElementText("flowRate", sensors.flowRate == null ? "--" : `${Number(sensors.flowRate).toFixed(1)} L/min`);
    setElementText("temperature", sensors.temperature == null ? "--" : `${Number(sensors.temperature).toFixed(1)}°C`);
    setElementText("humidity", sensors.humidity == null ? "--" : `${Number(sensors.humidity).toFixed(1)}%`);
    setElementText("lightLevel", sensors.lightLevel == null ? "--" : `${Number(sensors.lightLevel).toFixed(0)} lux`);
    setElementText("phLevel", sensors.waterPH == null ? "--" : Number(sensors.waterPH).toFixed(2));
    setElementText("ecLevel", sensors.waterEC == null ? "--" : `${Number(sensors.waterEC).toFixed(2)} mS/cm`);
    setElementText("batteryLevel", sensors.batteryPercent == null ? "--" : `${Number(sensors.batteryPercent).toFixed(0)}%`);
    setElementText("voltage", sensors.batteryVoltage == null ? "--" : `${Number(sensors.batteryVoltage).toFixed(2)} V`);
    setElementText("powerSource", system.powerSource || "--");
    setElementText("systemState", system.state || "OFFLINE");
    const transferOn = Boolean(actuators.transferRunning), boosterOn = Boolean(actuators.boosterRunning);
    const transferStatus = document.getElementById("transferPumpStatus"), boosterStatus = document.getElementById("boosterPumpStatus");
    if (transferStatus) { transferStatus.className = `device-status ${transferOn ? "active" : "off"}`; transferStatus.innerText = transferOn ? "ON" : "OFF"; }
    if (boosterStatus) { boosterStatus.className = `device-status ${boosterOn ? "active" : "off"}`; boosterStatus.innerText = boosterOn ? "ON" : "OFF"; }
    updateRPMGauge("mixerRPM", "mixerRPMBar", actuators.mixerRPM);
    updateRPMGauge("transferRPM", "transferRPMBar", actuators.transferRPM);
    updateRPMGauge("boosterRPM", "boosterRPMBar", actuators.boosterRPM);
    updateValveCardUI("V1", Boolean(actuators.valves?.V1));
    updateValveCardUI("V2", Boolean(actuators.valves?.V2));
    updateValveCardUI("V3", Boolean(actuators.valves?.V3));

    activeZones.forEach(zone => {
        const z = sensors.zones?.[zone.id] || {};
        const nLive = z.nitrogen; const pLive = z.phosphorus; const kLive = z.potassium;
        const phLive = z.ph; const ecLive = z.ec; const moistLive = z.moisture;

        let nDeficit = checkNutrientDeficiency(nLive, `targetN${zone.id}`, `nitrogen${zone.id}`, "ppm");
        let pDeficit = checkNutrientDeficiency(pLive, `targetP${zone.id}`, `phosphorus${zone.id}`, "ppm");
        let kDeficit = checkNutrientDeficiency(kLive, `targetK${zone.id}`, `potassium${zone.id}`, "ppm");
        let phDeficit = checkNutrientDeficiency(phLive, `targetPH${zone.id}`, `soilPH${zone.id}`, "", true);
        let ecDeficit = checkNutrientDeficiency(ecLive, `targetEC${zone.id}`, `soilEC${zone.id}`, "mS/cm", true);
        let mDeficit = checkNutrientDeficiency(moistLive, `targetMoisture${zone.id}`, `soil${zone.id}`, "%");

        // Logic Mapping: If soil moisture or nutrients are low and booster is pumping, open local solenoid!
        const solenoidIndicator = document.getElementById(`solenoidState-${zone.id}`);
        if(solenoidIndicator) {
            if(actuators.solenoids?.[zone.id]) {
                solenoidIndicator.innerText = "OPEN"; solenoidIndicator.style.color = "var(--success)";
            } else {
                solenoidIndicator.innerText = "CLOSED"; solenoidIndicator.style.color = "var(--danger)";
            }
        }
    });
}

/* ==========================================================================
   MANUAL ACTUATOR DIAGNOSTICS & THEME CONFIGS
   ========================================================================== */
const themeToggleBtn = document.getElementById('theme-toggle');
if (themeToggleBtn) {
    const currentTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', currentTheme);
    themeToggleBtn.textContent = currentTheme === 'dark' ? '☀️ Light' : '🌙 Dark';
    themeToggleBtn.addEventListener('click', () => {
        let theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        themeToggleBtn.textContent = theme === 'dark' ? '☀️ Light' : '🌙 Dark';
    });
}

function toggleDeviceState(elementId, pumpKey) {
    queueCommand("RUN_PUMP_TEST", { pump: pumpKey });
}

if (document.getElementById("transferPumpBtn")) document.getElementById("transferPumpBtn").addEventListener("click", () => toggleDeviceState("transferPumpStatus", "transfer"));
if (document.getElementById("boosterPumpBtn")) document.getElementById("boosterPumpBtn").addEventListener("click", () => toggleDeviceState("boosterPumpStatus", "booster"));
if (document.getElementById("mixerBtn")) document.getElementById("mixerBtn").addEventListener("click", () => queueCommand("RUN_PUMP_TEST", { pump: "mixer" }));

if (document.getElementById("emergencyStop")) {
    document.getElementById("emergencyStop").addEventListener("click", () => {
        if (confirm("Queue an emergency stop? The ESP32 will still validate and execute the physical stop.")) queueCommand("EMERGENCY_STOP");
    });
}

// Initialization Hooks
renderZonesUI();
updateDashboard();
initializeFirebase();
