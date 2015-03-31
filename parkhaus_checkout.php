<?php //Cookies löschen
$standort = $_COOKIE['standort'];
$startzeitpunkt = $_COOKIE[ 'startzeitpunkt'];
            setCookie( "parkhaus", "",-1);
            setCookie( "startzeitpunkt", "",-1);
            setCookie( "standort", "",-1);
        ?>
<!DOCTYPE html>
<html>

<head>
    <title>Parkhaus auschecken</title>
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
        <h1>Aus dem Parkhaus ausgecheckt</h1>
        <p class="specialtext">Sie haben erfolgreich aus dem Parkhaus ausgecheckt!</p>
        <p class="specialtext">Parkhaus:
            <?php echo $standort; ?>
        </p>
        <p class="specialtext">Startzeitpunkt:
            <?php echo $startzeitpunkt." Uhr"; ?>
        </p>
        <p class="specialtext">Dauer: 2h 41 Minuten</p>
        <p class="specialtext">Parkgebühr: 2,79 €</p>
        
        <a href="main.php">
            <div class="abbrechenButton">
                <i class="ion-android-checkmark-circle"></i> OK
            </div>
        </a>
    </div>
</body>

</html>