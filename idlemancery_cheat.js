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

function create_check_box(){
    const para = document.createElement("div");

    for (i = 0; i < 11; i++) {

        let node_id = 'checkbox_'+i.toString()

        let checkbox_node = document.createElement("input");

        checkbox_node.setAttribute('type', 'checkbox');
        checkbox_node.setAttribute('class', 'cheating');
        checkbox_node.setAttribute('id', node_id);
        checkbox_node.setAttribute('onclick', 'handleClick(this);');
        checkbox_node.setAttribute('value', true);
        para.appendChild(checkbox_node);

        let label_node = document.createElement("label");
        label_node.setAttribute('for', node_id);
        label_node.innerHTML=i.toString()+"\n"

        para.appendChild(label_node);
    }

    const element = getElementByXpath('//*[@id="app"]/main/div[2]/div[2]')
    // const element = getElementByXpath('//*[@id="test"]')
    element.appendChild(para);

}

function get_check_list(){
    let check_list = [];
    let elements = document.getElementsByClassName("cheating");
    let i;
    for (i = 0; i < elements.length; i++) {
        if (elements[i].getAttribute('value') == 'true'){
            check_list.push(i)
        }
    }
    return check_list
}

function addIdToInnerHtml(){
    let elements = document.getElementsByClassName("action-wrapper");
    let i;
    for (i = 0; i < elements.length; i++) {
        elements[i].getElementsByTagName('p')[0].innerHTML = "<b> id: " + i.toString() + "</b>"
    }
}

function addIdToMainAction(){
    let elements = document.getElementsByClassName("main-action");
    let i;
    for (i = 0; i < elements.length; i++) {
        elements[i].setAttribute('id', i.toString() + "_button");
    }
}

function ifActionSelect(){
    let element = document.getElementsByClassName("menu")[1].getElementsByClassName('menu-item')[0];
    return element.getAttribute('class')=="menu-item selected";
}


create_check_box()

setInterval(function(){
    
    bt_arr = get_check_list()
    console.log(bt_arr)

    let i;
    if (ifActionSelect()){
        console.log("Working");
        // addIdToInnerHtml();
        addIdToMainAction();
        for (i = 0; i < bt_arr.length; i++) {
            document.getElementById(bt_arr[i].toString() + "_button").click();
        }
    }else{
        console.log("Stopping");
    }

}, 100);

