function getElementByXpath(path) {
    return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null)
        .singleNodeValue;
}

function injectIdToInnerHtml(xpath) {
    let elements = getElementByXpath(xpath);
    elements.setAttribute("id", "touchEyeButton");
}

const steps = [
    { delay: 5 * 60 * 1000, buttonId: "touchEyeButton" },
    { delay: 5 * 60 * 1000, buttonId: "touchEyeButton" },
    { delay: 12 * 60 * 1000, buttonId: "evilGainButtonDisplay" },
];

const buttonDId = "evilperk3";
setInterval(() => {
    const buttonD = document.getElementById(buttonDId);
    if (buttonD) {
        const classList = buttonD.classList;
        const hasOff = classList.contains("off");
        const hasBought = classList.contains("bought");

        if (!hasOff && !hasBought) {
            buttonD.click();
            console.log(`Clicked D at ${new Date().toLocaleTimeString()}`);
        } else {
            console.log(
                `Skipped D (class=${buttonD.className}) at ${new Date().toLocaleTimeString()}`
            );
        }
    } else {
        console.warn(`Button D not found.`);
    }
}, 10 * 1000);

function startFlexibleCycle() {
    let index = 0;

    function scheduleNext() {
        const step = steps[index];
        setTimeout(() => {
            const btn = document.getElementById(step.buttonId);
            if (btn) {
                btn.click();
                console.log(`Clicked ${step.buttonId} at ${new Date().toLocaleTimeString()}`);
            } else {
                console.warn(`Button with ID "${step.buttonId}" not found.`);
            }

            index = (index + 1) % steps.length;
            scheduleNext(); // 再排下一個點擊
        }, step.delay);
    }

    scheduleNext(); // 開始第一步
}

injectIdToInnerHtml('//*[@id="rebirthButton1"]/button');
startFlexibleCycle();
