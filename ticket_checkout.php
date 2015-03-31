<?php //Cookies löschen
$standort = $_COOKIE['standort'];
$startzeitpunkt = $_COOKIE['startzeitpunkt'];
            setCookie( "parkplatz", "",-1);
            setCookie( "startzeitpunkt", "",-1);
            setCookie( "standort", "",-1);
?>
<!DOCTYPE html>
<html>

<head>
    <title>Parken beendet</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
    <meta name="theme-color" content="#548DD4">
    <link rel="icon" type="image/png" href="images/favicon.png" />
    <!--Icon Pack-->
    <link rel="stylesheet" href="//code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css">
    <!--Eigenes JavaScript-->
    <script src="js/shake.js"></script>
    <!--Eigenes CSS-->
    <link rel="stylesheet" href="css/css.css" />
    <link rel="stylesheet" href="css/css_landscape.css" media="(orientation: landscape)" />
    <link rel="stylesheet" href="css/ticket.css" />
    <link rel="stylesheet" href="css/ticket_landscape.css" media="(orientation: landscape)" />

</head>

<body>
    <!--<img id="ticketLogo" src="images/logo_transparent.png" />-->

    <div class="ticketContent">
        <h1>Parken beendet</h1>
        <p class="specialtext">Sie haben das Parken beendet! Sie sehen hier Ihre eTicket-Rechnung.</p>
        <p class="specialtext">Parkplatz:
            <?php echo $standort; ?>
        </p>
        <p class="specialtext">Startzeitpunkt:
            <?php echo $startzeitpunkt." Uhr"; ?>
        </p>
        <p class="specialtext">Dauer: 2h 42 Minuten</p>
        <p class="specialtext">Parkgebühr: 3,11 €</p>

        
        <a href="main.php">
            <div class="abbrechenButton">
                <i class="ion-android-checkmark-circle"></i> OK
            </div>
        </a>
    </div>
</body>
</html>