function get_button_list(){
    let check_list = [];
    let elements = document.getElementsByClassName("exclude");
    let i;
    for (i = 0; i < elements.length; i++) {
        check_list.push(elements[i])
    }
    return check_list
}



setInterval(function(){
    
    check_list = get_button_list()
    console.log(check_list)

    let i;
    for (i = 0; i < check_list.length; i++) {
        check_list[i].click();
    }

}, 1);
