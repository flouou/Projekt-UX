<!DOCTYPE html>
<html>

<head>
    <title>eParCar</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
    <meta name="theme-color" content="#548DD4">
    <link rel="icon" type="image/png" href="images/favicon.png" />
    <!--JQuery-->
    <script src="js/jquery-2.1.3.min.js"></script>
    <script src="js/jquery.mobile.custom.min.js"></script>
    <!--Inhalte für die Karte einbinden-->
    <link rel="stylesheet" href="http://cdn.leafletjs.com/leaflet-0.7.3/leaflet.css" />
    <script src="http://cdn.leafletjs.com/leaflet-0.7.3/leaflet.js"></script>
    <!--Icon Pack-->
    <link rel="stylesheet" href="//code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css">
    <!--Autocomplete JQueryUi-->
    <script src="js/jquery-ui.min.js"></script>
    <!--Alertify Shake-->
    <script src="js/alertify.min.js"></script>
    <link rel="stylesheet" href="css/alertify.core.css">
    <!--Eigenes JavaScript-->
    <script src="js/shake.js"></script>
    <script src="js/map.js"></script>
    <script src="js/main.js"></script>
    <script>
        $(document).ready(function(){
            //Initalisiere die Map bzw. erzeuge Map in targetDiv mit spezifischer View-Height: initMap(targetDiv, viewHeight)
            initMap('map', 15);
            //starte Timer, um die Daten alle 2 Minuten zu aktualisieren
            setInterval(refreshMapData,120000);
        });
    </script>
    <!--Eigenes CSS-->
    <link rel="stylesheet" href="css/css.css" />
    <link rel="stylesheet" href="css/map.css" />
    <link rel="stylesheet" href="css/checkbox.css" />
    <link rel="stylesheet" href="css/css_landscape.css" media="(orientation: landscape)" />
</head>

<body>
    <div id="content">
        <div class="fixedPos" id="start">
            <img class="logoImage" src="images/logo_transparent.png" />
            <div class="buttonGroup">
                <div class="sideButton">
                    <i class="ion-search"></i>
                    <span>Parkplatz<br />suchen</span>
                </div>
                
                    <?php
                        if(isset($_COOKIE['parkplatz']) && $_COOKIE['parkplatz']=="true"){
                            echo '<a class="sideButton" href="ticket_checkout.php">
                    <i class="ion-pricetag"></i><span>eTicket<br />beenden</span></a>';
                        } else {
                            if(isset($_COOKIE['parkhaus']) && $_COOKIE['parkhaus']=="true"){
                                echo '<a class="sideButton" onclick="alert(\'Nur eins von beidem!\')">
                    <i class="ion-pricetag"></i><span>eTicket<br />lösen</span></a>';
                            } else {
                            echo '<a class="sideButton" href="ticket.html">
                    <i class="ion-pricetag"></i><span>eTicket<br />lösen</span></a>';
                            }
                        }
                    
                        if(isset($_COOKIE['parkhaus']) && $_COOKIE['parkhaus']=="true"){
                            echo '<a href="NFC_checkout.html" class="sideButton">
                    <i class="ion-log-out"></i>
                            <span>Aus Parkhaus<br />auschecken</span></a>';
                        } else {
                            if(isset($_COOKIE['parkplatz'])){
                                echo '<a onclick="alert(\'Nur eins von beidem!\')" class="sideButton">
                    <i class="ion-log-in"></i>
                            <span>Parkhaus<br />einchecken</span></a>';
                            } else {
                                echo '<a href="NFC.html" class="sideButton">
                    <i class="ion-log-in"></i>
                            <span>Parkhaus<br />einchecken</span></a>';
                            }
                        }
                    ?>
                
                    
                
                <a href="profil.html" class="sideButton">
                    <i class="ion-person"></i>
                    <span>Meine<br />Daten</span>
                </a>
            </div>
            <div class="bottomButtons">
                <a class="botSideButton" href="FAQ.html">
                    <div>
                        <i class="ion-help"></i>
                        <span>Hilfe</span>
                    </div>
                </a>
            </div>
        </div>

        <div class="mapButton fixedPos" id="mapButtonRight"><i class="ion-earth"></i></div>
        
        <div class="overlay"></div>
        
        <div class="invisibleSwipe invisibleSwipeLeft"></div>
        
        <div class="invisibleSwipe invisibleSwipeRight"></div>
        
        <div class="fixedPos" id="map">
            <a name="mapLinks" sytle="position: absolute; left:100%;"></a>
        </div>

        <div class="mapButton fixedPos" id="mapButtonLeft"><i class="ion-search"></i></div>

        <div class="fixedPos" id="options">
            <h1>Suchen</h1>
            <p>Suchen Sie hier nach bestimmten Parkmöglichkeiten.</p>
            <div class="searchForm">
                <input type="text" id="suchbegriff" class="suchbegriffAllgemein">
                <div id="searchButton"><i class="ion-search"></i></div>
            </div>
            <h1>Filtern</h1>
            <p>Filtern Sie hier Ihre Suchergebnisse und die angezeigten Parkmöglichkeiten auf der Karte.</p>
            <div class="customCheckbox">
                <input type="checkbox" value="None" id="customCheckbox_PH" name="check" checked/>
                <label for="customCheckbox_PH"></label>
                <span>Parkhäuser</span>
            </div>
            <div class="customCheckbox">
                <input type="checkbox" value="None" id="customCheckbox_PP" name="check" checked/>
                <label for="customCheckbox_PP"></label>
                <span>Parkplätze</span>
            </div>
            <div class="customCheckbox">
                <input type="checkbox" value="None" id="customCheckbox_EL" name="check" checked/>
                <label for="customCheckbox_EL"></label>
                <span style="white-space: nowrap">Elektro-Ladestationen</span>
            </div>
            <div class="customCheckbox">
                <input type="checkbox" value="None" id="customCheckbox_KP" name="check" checked/>
                <label for="customCheckbox_KP"></label>
                <span style="white-space: nowrap">Kostenlose Parkplätze</span>
            </div>
        </div>
    </div>
</body>

</html>