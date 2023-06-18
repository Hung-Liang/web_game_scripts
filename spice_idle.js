function getElementByXpath(path) {
    return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

function create_text_box(){
    const para = document.createElement("div");

    let text_node = document.createElement("input");

    text_node.setAttribute('type', 'text');
    text_node.setAttribute('class', 'cheating');
    text_node.setAttribute('id', "target_level");
    para.appendChild(text_node);


    const element = getElementByXpath('//*[@id="prestige_page"]/div[1]/div[2]/div[1]/div')
    // const element = getElementByXpath('//*[@id="test"]')
    element.appendChild(para);

}

create_text_box();


setInterval(function(){
    
    document.getElementById('red_max_all').click();
    document.getElementById('yellow_max_all').click();
    document.getElementById('green_max_all').click();
    document.getElementById('blue_max_all').click();
    document.getElementById('pink_max_all').click();
    document.getElementById('color_shift_button').click();
    document.getElementById('crystal_cost_i').click();

    if (document.getElementById('target_level').value == document.getElementById('prestige_req').textContent.split(" ")[0]){
        document.getElementById('prestige_button').click();
    }

}, 1);

document.getElementById('prestige_req').textContent.split(" ")[0];