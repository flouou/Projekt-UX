/*
 * Deklaration zahlreicher, gloaber Variablen, die über verschiedenen Funktionen erreichbar sein müssen
 */
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
/* 
 * Definition allgemeingültiger Positionsdaten für die Pins
 */
var iconWidth = 43;
var iconHeight = 54;
var iconAnchorX = 21.5;
var iconAnchorY = 54;
var iconPopupAnchorX = 0;
var iconPopupAnchorY = -48;
var mapTargetDiv;

var count = 0;

/*
 * Methode zur Initialisierung der Karte. Karte wird in 'targetDiv' angezeigt, mit definierter Sichthöhe 'viewHeight'
 * und boolschem Parameter der steuert, ob nach der Initalisierung auf den Standort gezoomt wird oder nicht.
 */
function initMap(targetDiv, vheight, toLocation){
    //Initalisierung des Leaflet-Frameworks
    map = L.map(String(targetDiv)).setView([49.009654, 8.403903], parseInt(vheight));    
    $(".leaflet-control-zoom").css("visibility", "hidden");
    L.tileLayer('https://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png', {
        id: 'examples.map-i875mjb7'
    }).addTo(map);
    mapTargetDiv = targetDiv;
    
    //Initalisierung der Icons
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
                    iconSize:[25,74],
                    iconAnchor: [12.5,74],
                    popupAnchor: [-1,-70]});
    
    map.locate({setView: toLocation, maxZoom:15});
    loadData('initial');
    map.on('locationfound', onLocationFound);
    map.on('locationerror', onLocationError);
}

/*
 * Methode die loadDate im update-Modus aufruft
 */
function refreshMapData(){
    loadData('update');
}

/*
 * Allgemeine Methode, die je nach 'mode' Daten per AJAX von derAdresse 'backend/read_park.php' nachlädt
 * und beim Eintreffen der Daten entsprechende Funktionen ausführt
 */
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
            if(mapTargetDiv == "ticketMap"){
                removeEStationenLayer();
                removeKostenlosLayer();
                removeParkhausLayer();
            }
        }
    }
    xmlhttp.open('GET', 'backend/read_park.php', true);
    xmlhttp.send();
}

/*
 * Wird nach der Initialisierung aller Karten ausgeführt.
 * Die vom eParCar-Server empfangenen Daten werden in einer Schleife je nach Typ der Parkmöglichkeit weitervearbeitet
 */
function printParkmarker() {
    parken = JSON.parse(xmlhttp.responseText);
    var t;
    for (var j in parken) {
        var x = parken[j].LAT;
        var y = parken[j].LONG;
        //Erzeuge Marker (Pin) an der Position [x,y]
        var marker = L.marker([x, y]);
        
        if (parken[j].TYPE == 'Parkhaus') {
            //Berechne Parkhausbelegung
            var ges = parken[j].GESAMTE_PARKPLAETZE;
            var frei = parken[j].FREIE_PARKPLAETZE;
            var bel = 1-(frei/ges);
            
            //Hole Text für das PopUp
            t = getParkhausPopupText(parken[j]);
            
            //Je nach Auslastung des Parkhauses wird das Icon des marker-Objekts geändert
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
            //Hole Text für das PopUp
            t = getParkplatzPopupText(parken[j]);
            
            //Setze das Icon des Marker-Objekts
            marker = L.marker([x,y], {icon: parkplatzIcon});
            marker.bindPopup(t);
            lgParkplaetze.addLayer(marker);
        } else if (parken[j].TYPE == 'ELadestation') {
            //Nicht alle EStationen-Datensätze enthalten das Attribut STECKDOSE, daher hier die Unterscheidung
            //und unterschiedliche PopUp-Texte
            if(parken[j].STECKDOSE.length > 0) {
                t = '<p class="popupText"><strong>' + parken[j].STANDORT + "</strong> (" + parken[j].STADTTEIL + ")<br>" +
                    "Steckertyp: " + parken[j].STECKDOSE + ",<br>" +
                    "Ladestation ist " + parken[j].LADESTATION + ".</p>";
            } else {
                t = '<p class="popupText"><strong>' + parken[j].STANDORT + "</strong> (" + parken[j].STADTTEIL + ")<br>" +
                "Ladestation ist " + parken[j].LADESTATION + ".</p>";
            }
            t= t + '<p class="buttonWrapper">'+getFavoriteStarButton(parken[j].ID)+'</p>';
            marker = L.marker([x,y], {icon: eStationIcon});
            marker.bindPopup(t);
            lgEStationen.addLayer(marker);
        } else if(parken[j].TYPE == 'kostenlos'){
            //Hole Text für das PopUp
            t = getKostenlosPopupText(parken[j]);
            marker = L.marker([x,y], {icon: kostenlosIcon});
            marker.bindPopup(t);
            lgKostenlos.addLayer(marker);
        }
        markers[j] = marker;
    }
}

/*
 * Funktion gibt PopUp-Text für den Typ Parkhaus eines Objektes 'pm' zurück
 */
function getParkhausPopupText(pm){
    var t = '<p class="popupText"><strong>' + pm.PH_NAME + "</strong>, " +
                pm.PH_STRASSE +
                " (" + pm.STADTTEIL + ")<br>" +
                pm.FREIE_PARKPLAETZE + " von " + pm.GESAMTE_PARKPLAETZE + " Plätzen frei.<br>" + 
                'Öffnungzeiten: ' + pm.OEFFNUNGSZEITEN1;
                if(pm.OEFFNUNGSZEITEN2 != ''){
                    t = t + ', '+pm.OEFFNUNGSZEITEN2;
                }
                t = t + '<br>' + 'Tarif: 1,80 pro Stunde, 1,20 ab der dritten angefangenen Stunde.</p>'+
                getCheckInButton(pm.ID);
    return t;
}

/*
 * Funktion gibt PopUp-Text für den Typ Parkplatz eines Objektes 'pm' zurück
 */
function getParkplatzPopupText(pm){
    return '<p class="popupText"><strong>' + pm.STANDORT + "</strong><br>" +
                pm.STELLPLÄTZE + " Plätze verfügbar<br>" +
                "Höchst-Park-Dauer: " + pm.HÖCHST_PARK_DAUER + ",<br>" +
                "Gebührenpflichtiger Zeitraum: " + pm.GEBÜHRENPFL_PARKZEIT + ",<br>" +
                "Gebühren: " + pm.GEBÜHREN+"</p>"+
                getBuyTicketButtonText(pm.ID);
}

/*
 * Funktion gibt PopUp-Text für den Typ Kostenloser Parkplatz eines Objektes 'pm' zurück
 */
function getKostenlosPopupText(pm){
    return '<p class="popupText"><strong>' + pm.STANDORT + "</strong><br>" +
                "Es stehen " + pm.anzahl + " kostenlose Parkplätze zur Verfügung.</p>" + 
            '<p class="buttonWrapper">' + getFavoriteStarButton(pm.ID) + '</p>';
}

/*
 * Funktion wird aufgerufen, wenn Karte bereits initalisiert wurde und die Daten (Freie Parkplätze etc.) nach festgelegtem Intervall
 * vom Server abgerufen wurden. PopUp-Text der Parkhäuser wird aktualisert.
 */
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

/*
 * Vom PopUp gelangt der User direkt zum eTicket-lösen-Prozess, hierzu wird das href-Attribut des Links zusammengebaut
 */
function getBuyTicketButtonText(plcht){
    var t = plcht.replace(" ", "+");
    var buyTicketButton = '<p class="buttonWrapper">'+getFavoriteStarButton(plcht)+'<a onclick="startParkProcessFromPopUpButton(\'ticket_2.php?parkplatz='+t+'\')" class="parkXButton">eTicket lösen</a></p>';
    return buyTicketButton;
}

function getCheckInButton(ph_name){
    return '<p class="buttonWrapper">'+getFavoriteStarButton(ph_name)+'<a onclick="startParkProcessFromPopUpButton(\'NFC.html\')" class="parkXButton">Ins Parkhaus einchecken</a>';
}

function getFavoriteStarButton(pm_name){
    count++;
    if(pm_name == "Duale Hochschule Baden-Württemberg" || pm_name == "Am Staatstheater" || pm_name == "Englerstraße"){
        return '<span class="starButton ion-android-star" onclick="markAsFavorite(this)" id="star'+count+'"></span>';
    } else {
        return '<span class="starButton ion-android-star-outline" onclick="markAsFavorite(this)" id="star'+count+'"></span>';
    }
}

/*
 * Es folgen remove- und add-Methoden der jeweiligen MarkerLayer
 */
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
function removeKostenlosLayer(){
    map.removeLayer(lgKostenlos);
}
function addKostenlosLayer(){
    map.addLayer(lgKostenlos);
}

/*
 * Methode die bei erfolgreicher Standortbestimmung aufgerufen wird
 */
function onLocationFound(e){
    //Für Reverse-Geocoding siehe http://wiki.openstreetmap.org/wiki/Nominatim
    standortMarker = L.marker(e.latlng).setIcon(standortIcon);
    standortMarker.bindPopup('<p class="popupText"><strong>Ihr Standort</strong></p>');
    standortMarker.setZIndexOffset(300);
    standortMarker.addTo(map);
}

/*
 * Methode die bei nicht erfolgreicher Standortbestimmung aufgerufen wird
 */
function onLocationError(e){
    map.setView([49.009654, 8.403903], 15);
}