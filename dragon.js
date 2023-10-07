function getElementByXpath(path) {
    return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

function handleClick(cb) {
    let boo = cb.getAttribute('value')
    if (boo == 'false'){
      cb.setAttribute('value', 'true')
    }else{
      cb.setAttribute('value', 'false')
    }
  }

function set_click(class_name){
    let elements = document.getElementsByClassName(class_name);
    let i;
    for (i = 0; i < elements.length; i++) {
        elements[i].click();
    }
}

function create_check_box(i, label_name){
    const para = document.createElement("div");
    let node_id = 'checkbox_'+i.toString()
    let checkbox_node = document.createElement("input");

    checkbox_node.setAttribute('type', 'checkbox');
    checkbox_node.setAttribute('class', 'cheating');
    checkbox_node.setAttribute('id', node_id);
    checkbox_node.setAttribute('onclick', 'handleClick(this);');
    checkbox_node.setAttribute('value', false);
    para.appendChild(checkbox_node);

    let label_node = document.createElement("label");
    label_node.setAttribute('for', node_id);
    label_node.innerHTML=label_name+"\n"

    para.appendChild(label_node);

    const element = getElementByXpath('//*[@id="tab_main"]')
    element.appendChild(para);

}

create_check_box(1, "buy miners")
create_check_box(2, "platinum upgrade")
create_check_box(3, "fire upgrade")
create_check_box(4, "platinum convert")

setInterval(function(){

    let element = document.getElementById("checkbox_1");

    if (element.getAttribute('value') == 'true'){
        getElementByXpath('//*[@id="tab_main"]/div[2]/button[3]').click();
    }
    
    element = document.getElementById("checkbox_2");

    if (element.getAttribute('value') == 'true'){
        // document.getElementById("platinumConvertCooldown").innerHTML=0;
        // document.getElementById("platinumConvertButton").disabled = false;
        
        set_click("platinumUpgrade");
    }

    element = document.getElementById("checkbox_3");

    if (element.getAttribute('value') == 'true'){
        set_click("fireUpgrade");
    }

    element = document.getElementById("checkbox_4");

    if (element.getAttribute('value') == 'true'){
        document.getElementById("platinumConvertButton").click();
    }

    getElementByXpath('//*[@id="tab_main"]/div[2]/button[1]').click();

}, 1);
