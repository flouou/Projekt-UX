<!DOCTYPE html>
<html>

<head>
    <title>eParCar</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
    <meta name="theme-color" content="#548DD4">
    <link rel="icon" type="image/png" href="images/favicon.png" />
    <!--Inhalte für die Karte einbinden-->
    <link rel="stylesheet" href="http://cdn.leafletjs.com/leaflet-0.7.3/leaflet.css" />
    <script src="http://cdn.leafletjs.com/leaflet-0.7.3/leaflet.js"></script>
    <!--JQuery-->
    <script src="js/jquery-2.1.3.min.js"></script>
    <script src="js/jquery.mobile.custom.min.js"></script>
    <!--Icon Pack-->
    <link rel="stylesheet" href="//code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css">
    <!--Eigenes JavaScript-->
    <script src="js/shake.js"></script>
    <script src="js/ticket.js"></script>
    <script type="text/javascript">
        $(document).ready(function(){
            //Zeit aktualisieren, alle 60 Sekunden
            setDatum();
            setInterval(setDatum,60000);
        });
    </script>
    <!--Eigenes CSS-->
    <link rel="stylesheet" href="css/css.css" />
    <link rel="stylesheet" href="css/css_landscape.css" media="(orientation: landscape)" />
    <link rel="stylesheet" href="css/ticket.css" />
    <link rel="stylesheet" href="css/ticket_landscape.css" media="(orientation: landscape)" />
</head>
    
<body>           
    <!--<img id="ticketLogo" src="images/logo_transparent.png" />-->
    
    <div class="mapButton absPos" id="backToMainButton">
        <a href="ticket.html">
            <i class="ion-arrow-left-c"></i>
        </a>
    </div>

    <div class="ticketContent">
        <h1>Gewählter Parkplatz:</h1>
        <ul>
            <li>
                <span>
                    <?php
                        //Asugabe des Parkplatz-Namens
                        $parkplatz = $_GET['parkplatz'];
                        echo $parkplatz;
                    ?>
                </span>
            </li>
        </ul>
        
        <div>    
            <p style="margin-left: 10%; font-weight: bold;">Um Ihre Parkdauer minutengenau abzurechnen, setzten Sie hier den Startzeitpunkt. Die aktuelle Zeit wird Ihnen unten angezeigt. Bitte bestätigen Sie mit dem Button rechts neben der Zeitangabe, wenn Sie zahlungsplichtig ein eTicket lösen möchten.</p>
            <h1>Startzeitpunkt</h1>
            
            <form class="searchForm" action="ticket_finish.php" method="GET">
                <input class="suchbegriff" name="datetime" type="datetime" id="zeit" readonly="readonly">
                <input class="invisibleinput" name="parkplatz" type="text" value="<?php echo $parkplatz ?>" readonly="readonly"/>
                <input type="submit"id="searchButton" value="&#xf29e">
            </form>    
        </div>
        
        <a href="main.php">
            <div class="abbrechenButton">
                <i class="ion-close-circled"></i> Abbrechen
            </div> 
        </a>    
    </div><!-- end .ticketContent -->
</body> 
</html>