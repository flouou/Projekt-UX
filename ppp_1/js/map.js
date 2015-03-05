var map;
var xmlhttp;
var lgParkhaus = L.layerGroup();
var lgParkplaetze = L.layerGroup();
var lgEStationen = L.layerGroup();
var lgKostenlos = L.layerGroup();

var greenPHIcon;
var yellowPHIcon;
var redPHIcon;
var parkplatzIcon;
var eStationIcon;
//var kostenlosIcon;
var iconWidth = 43;
var iconHeight = 54;
var iconAnchorX = 21.5;
var iconAnchorY = 54;
var iconPopupAnchorX = 0;
var iconPopupAnchorY = -48;

$(document).ready(function () {
    map = L.map('map').setView([49.009654, 8.403903], 15);
    $(".leaflet-control-zoom").css("visibility", "hidden");

    L.tileLayer('https://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
            '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
            'Imagery © <a href="http://mapbox.com">Mapbox</a>',
        id: 'examples.map-i875mjb7'
    }).addTo(map);
    
    //map.locate({setView: true, maxZoom: 16});
    
    greenPHIcon = L.icon({
                    iconUrl: 'images/icons/parkhaus_icon_grün_klein.png',
                    iconSize:[iconWidth,iconHeight],
                    iconAnchor: [iconAnchorX,iconAnchorY],
                    popupAnchor: [iconPopupAnchorX,iconPopupAnchorY]});
    redPHIcon = L.icon({
                    iconUrl: 'images/icons/parkhaus_icon_rot_klein.png',
                    iconSize:[iconWidth,iconHeight],
                    iconAnchor: [iconAnchorX,iconAnchorY],
                    popupAnchor: [iconPopupAnchorX,iconPopupAnchorY]});
    yellowPHIcon = L.icon({
                    iconUrl: 'images/icons/parkhaus_icon_gelb_klein.png',
                    iconSize:[iconWidth,iconHeight],
                    iconAnchor: [iconAnchorX,iconAnchorY],
                    popupAnchor: [iconPopupAnchorX,iconPopupAnchorY]});
    parkplatzIcon = L.icon({
                    iconUrl: 'images/icons/parkplatz_icon_klein.png',
                    iconSize:[iconWidth,iconHeight],
                    iconAnchor: [iconAnchorX,iconAnchorY],
                    popupAnchor: [iconPopupAnchorX,iconPopupAnchorY]});
    eStationIcon = L.icon({
                    iconUrl: 'images/icons/estation_icon_klein.png',
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
        var marker = L.marker([x, y]);
        
        if (result[j].TYPE == 'Parkhaus') {
            var ges = result[j].GESAMTE_PARKPLAETZE;
            var frei = result[j].FREIE_PARKPLAETZE;
            var bel = 1-(frei/ges);
            t = "<strong>" + result[j].PH_NAME + "</strong>, " + result[j].PH_STRASSE + " (" + result[j].STADTTEIL + ")<br>" + frei + " von " + ges + " Plätzen frei.";
            
            if(bel<=0.5){
                marker = L.marker([x,y], {icon: greenPHIcon});    
            } else if(bel > 0.5 && bel < 0.85){
                marker = L.marker([x,y], {icon: yellowPHIcon});
            } else {
                marker = L.marker([x,y], {icon: redPHIcon});
            }
            
            marker.bindPopup(t);
            lgParkhaus.addLayer(marker);
            map.addLayer(lgParkhaus);
        } else if (result[j].TYPE == 'Parkplatz') {
            t = "<strong>" + result[j].STANDORT + "</strong><br>" +
                result[j].STELLPLÄTZE + " Plätze verfügbar<br>" +
                "Höchst-Park-Dauer: " + result[j].HÖCHST_PARK_DAUER + ",<br>" +
                "Gebührenpflichtiger Zeitraum: " + result[j].GEBÜHRENPFL_PARKZEIT + ",<br>" +
                "Gebühren: " + result[j].GEBÜHREN;
            
            marker = L.marker([x,y], {icon: parkplatzIcon});
            marker.bindPopup(t);
            lgParkplaetze.addLayer(marker);
            map.addLayer(lgParkplaetze);
        } else if (result[j].TYPE == 'ELadestation') {
            if(result[j].STECKDOSE.length > 0) {
                t = "<strong>" + result[j].STANDORT + "</strong> (" + result[j].STADTTEIL + ")<br>" +
                    "Steckertyp: " + result[j].STECKDOSE + ",<br>" +
                    "Ladestation ist " + result[j].LADESTATION + ".";
            } else {
                t = "<strong>" + result[j].STANDORT + "</strong> (" + result[j].STADTTEIL + ")<br>" +
                "Ladestation ist " + result[j].LADESTATION + ".";
            }
            marker = L.marker([x,y], {icon: eStationIcon});
            marker.bindPopup(t);
            lgEStationen.addLayer(marker);
            map.addLayer(lgEStationen);
        } else if(result[j].TYPE == 'kostenlos'){
            t = "<strong>" + result[j].STANDORT + "</strong><br>" +
                "Es stehen " + result[j].anzahl + " kostenlose Parkplätze zur Verfügung.";
            
            marker = L.marker([x,y]);
            marker.bindPopup(t);
            lgKostenlos.addLayer(marker);
            map.addLayer(lgKostenlos);
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