function getElementByXpath(path) {
    return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}


setInterval(function(){
    
    getElementByXpath('//*[@id="app"]/div/main/section[1]/div[1]/button').click();
    getElementByXpath('//*[@id="app"]/div/main/section[1]/div[3]/div/div[1]/span[2]/button').click();

}, 1);