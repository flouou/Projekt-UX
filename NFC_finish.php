<?php
//Hole per GET übertragenen Daten und speichere sie in entsprechenden Variablen
$datetime = $_GET['datetime'];
$parkhaus = $_GET['parkhaus'];
$expire = time()+3600*24;
//Setze die Cookies um die Daten jederzeit auslesen zu können
setCookie("parkhaus","true",$expire);
setCookie("startzeitpunkt",$datetime,$expire);
setCookie("standort",$parkhaus,$expire);
?>

<!DOCTYPE html>
<html>

<head>
    <title>eParCar</title>
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
    <div class="ticketContent">
        <h1>Ins Parkhaus eingecheckt</h1>
        <p class="specialtext">Sie haben erfolgreich ins Parkhaus eingecheckt!</p>
        <p class="specialtext">Startzeitpunkt:
            <?php 
                //Ausgabe des Startzeitpunkts
                echo $datetime;
            ?></p>
        <p class="specialtext">Parkhaus:
            <?php 
                //Ausgabe des Parkhaus-Namen
                echo $parkhaus;
            ?></p>
            
        <a href="main.php">
            <div class="abbrechenButton">
                <i class="ion-android-checkmark-circle"></i> OK
            </div> 
        </a>
    </div>
</body> 
</html>