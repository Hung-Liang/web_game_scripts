
function getElementByXpath(path) {
    return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}


setInterval(function(){

    
    getElementByXpath('//*[@id="root"]/div/div/div[1]/table[2]/tbody/tr[1]/td[1]/button').click();
    // getElementByXpath('//*[@id="root"]/div/div/div[1]/table[2]/tbody/tr[2]/td[1]/button').click();
    // getElementByXpath('//*[@id="root"]/div/div/div[1]/table[2]/tbody/tr[3]/td[1]/button').click();

}, 1);
