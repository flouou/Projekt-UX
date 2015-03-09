var date;
function writeDate(){
    date = new Date(); 
    document.getElementById("startzeit").innerHTML = date.toDateString();
}

