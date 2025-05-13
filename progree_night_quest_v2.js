// ==UserScript==
// @name         Flexible Clicker with UI & Skip
// @version      1.1
// @description  Auto click buttons with schedule, pause, skip, and UI
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function () {
    "use strict";

    // ----------- UI 介面 ----------- //
    const uiBox = document.createElement("div");
    uiBox.style.position = "fixed";
    uiBox.style.bottom = "10px";
    uiBox.style.left = "10px";
    uiBox.style.backgroundColor = "rgba(0,0,0,0.8)";
    uiBox.style.color = "white";
    uiBox.style.padding = "10px";
    uiBox.style.zIndex = "9999";
    uiBox.style.fontSize = "14px";
    uiBox.style.borderRadius = "8px";
    uiBox.style.fontFamily = "monospace";
    uiBox.innerHTML = `
        <div><strong>Auto Clicker</strong></div>
        <div id="status">Status: <span style="color:lime">Running</span></div>
        <div id="countdown">Next: -</div>
        <div id="clicks">Clicks: A=0, B=0, C=0, D=0</div>
        <button id="toggleBtn" style="margin-top:5px;">Pause</button>
        <button id="skipStepBtn" style="margin-top:5px;">Skip Step</button>
    `;
    document.body.appendChild(uiBox);

    const statusEl = document.getElementById("status");
    const countdownEl = document.getElementById("countdown");
    const clicksEl = document.getElementById("clicks");
    const toggleBtn = document.getElementById("toggleBtn");
    const skipBtn = document.getElementById("skipStepBtn");

    let isRunning = true;
    toggleBtn.onclick = () => {
        isRunning = !isRunning;
        statusEl.innerHTML = `Status: <span style="color:${isRunning ? "lime" : "orange"}">${
            isRunning ? "Running" : "Paused"
        }</span>`;
        toggleBtn.textContent = isRunning ? "Pause" : "Resume";
    };

    const clicks = { A: 0, B: 0, C: 0, D: 0 };
    function updateClickDisplay() {
        clicksEl.textContent = `Clicks: A=${clicks.A}, B=${clicks.B}, C=${clicks.C}, D=${clicks.D}`;
    }

    // ----------- XPath 加 id ----------- //
    function getElementByXpath(path) {
        return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null)
            .singleNodeValue;
    }

    function injectIdToInnerHtml(xpath) {
        const element = getElementByXpath(xpath);
        if (element && element.tagName === "BUTTON") {
            element.setAttribute("id", "touchEyeButton");
        } else {
            console.warn("Could not find button element via XPath.");
        }
    }

    // ----------- 排程邏輯 ----------- //
    const steps = [
        { delay: 3 * 60 * 1000, buttonId: "touchEyeButton", label: "A" },
        { delay: 3 * 60 * 1000, buttonId: "touchEyeButton", label: "B" },
        { delay: 10 * 60 * 1000, buttonId: "evilGainButtonDisplay", label: "C" },
    ];

    let index = 0;
    let currentTimeout = null;
    let currentCountdown = null;

    function scheduleNext() {
        const step = steps[index];
        let remaining = Math.floor(step.delay / 1000);

        currentCountdown = setInterval(() => {
            if (!isRunning) return;
            countdownEl.textContent = `Next ${step.label} in ${remaining}s`;
            remaining--;
        }, 1000);

        currentTimeout = setTimeout(() => {
            clearInterval(currentCountdown);
            if (!isRunning) {
                countdownEl.textContent = `Paused`;
                scheduleNext();
                return;
            }

            const btn = document.getElementById(step.buttonId);
            if (btn) {
                btn.click();
                console.log(
                    `Clicked ${step.label} (${step.buttonId}) at ${new Date().toLocaleTimeString()}`
                );
                clicks[step.label]++;
                updateClickDisplay();
            } else {
                console.warn(`Button "${step.buttonId}" not found.`);
            }

            index = (index + 1) % steps.length;
            scheduleNext();
        }, step.delay);
    }

    function forceNextStep() {
        if (currentTimeout) clearTimeout(currentTimeout);
        if (currentCountdown) clearInterval(currentCountdown);

        const step = steps[index];
        if (!isRunning) {
            console.log("Paused, skipStep ignored.");
            return;
        }

        const btn = document.getElementById(step.buttonId);
        if (btn) {
            // btn.click();
            console.log(
                `[SKIPPED] Clicked ${step.label} (${
                    step.buttonId
                }) at ${new Date().toLocaleTimeString()}`
            );
            clicks[step.label]++;
            updateClickDisplay();
        } else {
            console.warn(`[SKIPPED] Button "${step.buttonId}" not found.`);
        }

        index = (index + 1) % steps.length;
        scheduleNext();
    }

    skipBtn.onclick = forceNextStep;

    // ----------- voidAgeReqPerk 每 30 秒 ----------- //
    const voidAgeReqPerkId = "evilperk3";
    setInterval(() => {
        if (!isRunning) return;

        const voidAgeReqPerkButton = document.getElementById(voidAgeReqPerkId);
        if (voidAgeReqPerkButton) {
            voidAgeReqPerkButton.click();
            console.log(`Clicked D at ${new Date().toLocaleTimeString()}`);
            clicks.D++;
            updateClickDisplay();
            // const classList = voidAgeReqPerkButton.classList["value"];
            // const hasOff = classList.includes("off");
            // const hasBought = classList.includes("bought");

            // if (!hasOff && !hasBought) {
            //     voidAgeReqPerkButton.click();
            //     console.log(`Clicked D at ${new Date().toLocaleTimeString()}`);
            //     clicks.D++;
            //     updateClickDisplay();
            // } else {
            //     console.log(
            //         `[SKIPPED] Button D (class=${classList}) at ${new Date().toLocaleTimeString()}`
            //     );
            // }
        }
    }, 30 * 1000);

    // ----------- 開始執行 ----------- //
    injectIdToInnerHtml('//*[@id="rebirthButton1"]/button');
    updateClickDisplay();
    scheduleNext();
})();
