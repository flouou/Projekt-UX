
function read(id){
    return document.getElementById(id).value;
}

//Datum beim Laden der Seite setzen

function setDatum(){
    var datum = new Date();
    //Datum formatieren
    var tag = datum.getDate();
    var monat = datum.getMonth()+1;
    var jahr = datum.getYear()+1900;
    var std = datum.getHours();
    var min = datum.getMinutes();
    
    //0 vor einstellige Zahlen setzten
    if(tag < 10){
        tag = "0" + tag;
    }
    
    if(monat < 10){
        monat = "0" + monat;
    }
    if(std < 10){
        std = "0" + std;
    }
    
    if(min < 10){
        min = "0" + min;
    }
        
    document.getElementById('zeit').value = tag + "." + monat + "." + jahr + "  -  " + std + ":" + min;
}



