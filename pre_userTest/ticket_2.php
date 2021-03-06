<!DOCTYPE html>
<html>

<head>
    <title>eTicket lösen</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
    <meta name="theme-color" content="#548DD4">
    <link rel="icon" type="image/png" href="images/favicon.png" />
    <!--Inhalte für die Karte einbinden-->
    <link rel="stylesheet" href="http://cdn.leafletjs.com/leaflet-0.7.3/leaflet.css" />
    <script src="http://cdn.leafletjs.com/leaflet-0.7.3/leaflet.js"></script>
    <!--JQuery-->
    <script src="http://code.jquery.com/jquery-2.1.3.min.js"></script>
    <script src="js/jquery.mobile.custom.min.js"></script>
    <!--Icon Pack-->
    <link rel="stylesheet" href="//code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css">
    <!--Eigenes JavaScript-->
    <script src="js/shake.js"></script>
    <script src="js/ticket.js"></script>
    <script type="text/javascript">
        $(document).ready(function(){
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
    <img id="ticketLogo" src="images/logo_transparent.png" />
    
    <div class="mapButton absPos" id="backToMainButton">
        <a href="ticket.html">
            <i class="ion-backspace-outline"></i>
        </a>
    </div>

    <div class="ticketContent">
        <h1>Gewählter Parkplatz:</h1>
            <ul>
                <li>
                    <span>
                        <?php
                            echo $_GET['parkplatz'];
                        ?>
                    </span>
                </li>
            </ul>
        
        <div>
            <p style="margin-left: 10%; font-weight: bold;">Wählen Sie entweder den aktuellen Startzeitpunkt oder bestimmen Sie eine feste Parkdauer</p>
            <h1>Startzeitpunkt</h1>
            
            <form class="searchForm" action="ticket_finish.html">
                <input class="suchbegriff" type="datetime" id="zeit" disabled="disabled">
                <input type="submit"id="searchButton" value="&#xf29e">
            </form>
            
        </div>
    
            
            <h1>Parkdauer</h1>
            <form class="searchForm" action="ticket_finish.html">
                <select class="suchbegriff" id="" style="height: 43px; ">
                    <option>15 Minuten</option>
                    <option>20 Minuten</option>
                    <option>25 Minuten</option>
                    <option>30 Minuten</option>
                    <option>35 Minuten</option>
                    <option>40 Minuten</option>
                    <option>45 Minuten</option>
                    <option>50 Minuten</option>
                    <option>55 Minuten</option>
                    <option>60 Minuten</option>
                    
                </select>
                <input type="submit"id="searchButton" value="&#xf29e">
            </form>
        
            <a href="main.html">
                <div class="abbrechenButton">
                    <i class="ion-close-circled"></i> Abbrechen
                </div> 
            </a>
            
        </div>
        
        
        
    </div>
</body> 
</html>