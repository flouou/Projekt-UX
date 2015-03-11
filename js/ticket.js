function read(id){
    return document.getElementById(id).value;
}
function write(id, val){
    document.getElementById(id).innerHTML = val;
}
function datum(){
    var datum = new Date();
    //alert(datum);
    
    document.getElementById('zeit').value = datum;
    //write("zeit", datum);
}