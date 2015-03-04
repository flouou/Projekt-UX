var map;
var xmlhttp;
var lgParkhaus = L.layerGroup();
var lgParkplaetze = L.layerGroup();
var lgEStationen = L.layerGroup();

var greenPHIcon;
var yellowPHIcon;
var redPHIcon;
var iconWidth = 43;
var iconHeight = 54;
var iconAnchorX = 21.5;
var iconAnchorY = 54;
var iconPopupAnchorX = 0;
var iconPopupAnchorY = -48;

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
    
    greenPHIcon = L.icon({
                    iconUrl: 'images/icons/parkhaus_icon_grün_klein.png',
                    iconSize:[iconWidth,iconHeight],
                    iconAnchor: [iconAnchorX,iconAnchorY],
                    popupAnchor: [iconPopupAnchorX,iconPopupAnchorY]});
    
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
    xmlhttp.open('GET', 'backend/read_park.php', true);

    xmlhttp.send();
}

function printParkmarker() {
    var result = JSON.parse(xmlhttp.responseText);
    var t;
    for (var j in result) {
        var x = result[j].LAT;
        var y = result[j].LONG;
        var marker = L.marker([x, y],{icon: greenPHIcon});
        if (result[j].TYPE == 'Parkhaus') {
            var t = "<strong>" + result[j].PH_NAME + "</strong>, " + result[j].PH_STRASSE + " (" + result[j].STADTTEIL + ")<br>" + result[j].FREIE_PARKPLAETZE + " von " + result[j].GESAMTE_PARKPLAETZE + " Plätzen frei.";
            marker.bindPopup(t);
            lgParkhaus.addLayer(marker);
            map.addLayer(lgParkhaus);
        } else if (result[j].TYPE == 'Parkplatz') {
            var t = "<strong>" + result[j].STANDORT + "</strong><br>" +
                result[j].STELLPLÄTZE + " Plätze verfügbar<br>" +
                "Höchst-Park-Dauer: " + result[j].HÖCHST_PARK_DAUER + ",<br>" +
                "Gebührenpflichtiger Zeitraum: " + result[j].GEBÜHRENPFL_PARKZEIT + ",<br>" +
                "Gebühren: " + result[j].GEBÜHREN;
            marker.bindPopup(t);
           lgParkplaetze.addLayer(marker);
            map.addLayer(lgParkplaetze);
        } else if (result[j].TYPE == 'ELadestation') {
            var t = "<strong>" + result[j].STANDORT + "</strong> (" + result[j].STADTTEIL + ")<br>" +
                "Steckertyp: " + result[j].STECKDOSE + ",<br>" +
                "Ladestation ist " + result[j].LADESTATION + ".";
            marker.bindPopup(t);
            lgEStationen.addLayer(marker);
            map.addLayer(lgEStationen);
        }
        //L.marker([x, y]).addTo(map).bindPopup(t);
    }
    //map.removeLayers(lgParkhaus);
}
function removeParkhausLayer(){
    map.removeLayer(lgParkhaus);
}
function addParkhausLayer(){
    map.addLayer(lgParkhaus);
}
function removeParkplatzLayer(){
    map.removeLayer(lgParkplaetze);
}
function addParkplatzLayer(){
    map.addLayer(lgParkplaetze);
}
function removeEStationenLayer(){
    map.removeLayer(lgEStationen);
}
function addEStationenLayer(){
    map.addLayer(lgEStationen);
}