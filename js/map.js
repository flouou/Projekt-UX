var map;
var xmlhttp;
var parken;
var markers = new Array();
var lgParkhaus = L.layerGroup();
var lgParkplaetze = L.layerGroup();
var lgEStationen = L.layerGroup();
var lgKostenlos = L.layerGroup();
var standortMarker;

var greenPHIcon;
var yellowPHIcon;
var redPHIcon;
var parkplatzIcon;
var eStationIcon;
var standortIcon;
var kostenlosIcon;
var iconWidth = 43;
var iconHeight = 54;
var iconAnchorX = 21.5;
var iconAnchorY = 54;
var iconPopupAnchorX = 0;
var iconPopupAnchorY = -48;

var checkInButton = '<p class="buttonWrapper"><a href="#" class="parkXButton">Ins Parkhaus einchecken</a></p>';
var buyTicketButton = '<p class="buttonWrapper"><a href="#" class="parkXButton">eTicket lösen</a></p>';

function initMap(targetDiv, vheight){
    map = L.map(String(targetDiv)).setView([49.009654, 8.403903], parseInt(vheight));    
    $(".leaflet-control-zoom").css("visibility", "hidden");
    L.tileLayer('https://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png', {
        id: 'examples.map-i875mjb7'
    }).addTo(map);
    
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
    kostenlosIcon = L.icon({
                    iconUrl: 'images/icons/kostenlos_icon_klein.png',
                    iconSize:[iconWidth,iconHeight],
                    iconAnchor: [iconAnchorX,iconAnchorY],
                    popupAnchor: [iconPopupAnchorX,iconPopupAnchorY]});
    standortIcon = L.icon({
                    iconUrl: 'images/standort_klein.png',
                    iconSize:[40,40],
                    iconAnchor: [20,40],
                    popupAnchor: [0,-32]});
    map.locate({maxZoom:15});
    loadData('initial');
    map.on('locationfound', onLocationFound);
}
function refreshMapData(){
    loadData('update');
}
function loadData(mode) {
    if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else { // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            if(mode == "initial"){
                printParkmarker();
                map.addLayer(lgParkhaus);
                map.addLayer(lgParkplaetze);
                map.addLayer(lgEStationen);
                map.addLayer(lgKostenlos);
            } else if(mode == "update"){
                updatePopupText();
            }       
        }
    }
    xmlhttp.open('GET', 'backend/read_park.php', true);
    xmlhttp.send();
}

function printParkmarker() {
    parken = JSON.parse(xmlhttp.responseText);
    var t;
    for (var j in parken) {
        var x = parken[j].LAT;
        var y = parken[j].LONG;
        var marker = L.marker([x, y]);
        
        if (parken[j].TYPE == 'Parkhaus') {
            var ges = parken[j].GESAMTE_PARKPLAETZE;
            var frei = parken[j].FREIE_PARKPLAETZE;
            var bel = 1-(frei/ges);
            t = getParkhausPopupText(parken[j]);
            
            if(bel<=0.5){
                marker = L.marker([x,y], {icon: greenPHIcon});    
            } else if(bel > 0.5 && bel < 0.85){
                marker = L.marker([x,y], {icon: yellowPHIcon});
            } else {
                marker = L.marker([x,y], {icon: redPHIcon});
            }
            
            marker.bindPopup(t);
            lgParkhaus.addLayer(marker);
        } else if (parken[j].TYPE == 'Parkplatz') {
            t = getParkplatzPopupText(parken[j]);
            marker = L.marker([x,y], {icon: parkplatzIcon});
            marker.bindPopup(t);
            lgParkplaetze.addLayer(marker);
        } else if (parken[j].TYPE == 'ELadestation') {
            if(parken[j].STECKDOSE.length > 0) {
                t = '<p class="popupText"><strong>' + parken[j].STANDORT + "</strong> (" + parken[j].STADTTEIL + ")<br>" +
                    "Steckertyp: " + parken[j].STECKDOSE + ",<br>" +
                    "Ladestation ist " + parken[j].LADESTATION + ".</p>";
            } else {
                t = '<p class="popupText"><strong>' + parken[j].STANDORT + "</strong> (" + parken[j].STADTTEIL + ")<br>" +
                "Ladestation ist " + parken[j].LADESTATION + ".</p>";
            }
            marker = L.marker([x,y], {icon: eStationIcon});
            marker.bindPopup(t);
            lgEStationen.addLayer(marker);
        } else if(parken[j].TYPE == 'kostenlos'){
            t = getKostenlosPopupText(parken[j]);
            marker = L.marker([x,y], {icon: kostenlosIcon});
            marker.bindPopup(t);
            lgKostenlos.addLayer(marker);
        }
        markers[j] = marker;
    }
}
function getParkhausPopupText(pm){
    return '<p class="popupText"><strong>' + pm.PH_NAME + "</strong>, " +
                pm.PH_STRASSE +
                " (" + pm.STADTTEIL + ")<br>" +
                pm.FREIE_PARKPLAETZE + " von " + pm.GESAMTE_PARKPLAETZE + " Plätzen frei.</p>" + 
                checkInButton;
}
function getParkplatzPopupText(pm){
    return '<p class="popupText"><strong>' + pm.STANDORT + "</strong><br>" +
                pm.STELLPLÄTZE + " Plätze verfügbar<br>" +
                "Höchst-Park-Dauer: " + pm.HÖCHST_PARK_DAUER + ",<br>" +
                "Gebührenpflichtiger Zeitraum: " + pm.GEBÜHRENPFL_PARKZEIT + ",<br>" +
                "Gebühren: " + pm.GEBÜHREN+"</p>"+
                buyTicketButton;
}
function getKostenlosPopupText(pm){
    return '<p class="popupText"><strong>' + pm.STANDORT + "</strong><br>" +
                "Es stehen " + pm.anzahl + " kostenlose Parkplätze zur Verfügung.</p>";
}
function updatePopupText(){
    parken = JSON.parse(xmlhttp.responseText);
    for (var j in parken) {
        if (parken[j].TYPE == 'Parkhaus') {
            var ges = parken[j].GESAMTE_PARKPLAETZE;
            var frei = parken[j].FREIE_PARKPLAETZE;
            var bel = 1-(frei/ges);
            t = getParkhausPopupText(parken[j]);
            if(bel<=0.5){
                markers[j].setIcon(greenPHIcon);    
            } else if(bel > 0.5 && bel < 0.85){
                markers[j].setIcon(yellowPHIcon);
            } else {
                markers[j].setIcon(redPHIcon);
            }
            markers[j].bindPopup(t);
        }
    }
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
function onLocationFound(e){
    //Für Reverse-Geocoding siehe http://wiki.openstreetmap.org/wiki/Nominatim
    standortMarker = L.marker(e.latlng).setIcon(standortIcon);
    standortMarker.bindPopup('<p class="popupText"><strong>Ihr Standort</strong></p>');
    standortMarker.setZIndexOffset(300);
    standortMarker.addTo(map);
}