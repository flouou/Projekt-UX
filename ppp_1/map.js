var map;
var xmlhttp;
$(document).ready(function () {
    map = L.map('map').setView([49.003871, 8.405114], 17);
    $(".leaflet-control-zoom").css("visibility", "hidden");

    L.tileLayer('https://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
            '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
            'Imagery © <a href="http://mapbox.com">Mapbox</a>',
        id: 'examples.map-i875mjb7'
    }).addTo(map);

    //L.marker([49.003871, 8.405114]).addTo(map).bindPopup("<b>Hello world!</b><br />I am a popup.").openPopup();
    refresh();
});

function refresh() {
    if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else { // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            printParkmarker();
        }
    }
    xmlhttp.open('GET', 'read_park.php', true);

    xmlhttp.send();
}

function printParkmarker() {
    //var tab = getTable();
    //clearNode(tab);
    var result = JSON.parse(xmlhttp.responseText);
    for (var j in result) {
        var x = (result[j].X_KOORDINATE) / 70536.73474081261866;
        var y = (result[j].Y_KOORDINATE) / 646778.79070596207075;
        var t = "<strong>" + result[j].PH_NAME + "</strong>, " + result[j].PH_STRASSE + " (" + result[j].STADTTEIL + ")<br>" + result[j].FREIE_PARKPLAETZE + " von " + result[j].GESAMTE_PARKPLAETZE + " Plätzen frei.";
        L.marker([x, y]).addTo(map).bindPopup(t);
    }
    //document.getElementById('anzahlPH').innerHTML = result.length;

    //document.getElementById('uhrzeit').innerHTML = getUhrzeit();

}