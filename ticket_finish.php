<?php
$datetime = $_GET['datetime'];
$parkplatz = $_GET['parkplatz'];
$expire = time()+3600*24;
setCookie("parkplatz","true",$expire);
setCookie("startzeitpunkt",$datetime,$expire);
setCookie("standort",$parkplatz,$expire);
?>

<!DOCTYPE html>
<html>

<head>
    <title>eTicket lösen</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
    <meta name="theme-color" content="#548DD4">
    <link rel="icon" type="image/png" href="images/favicon.png" />
    
    <!--JQuery-->
    <!--<script src="http://code.jquery.com/jquery-2.1.3.min.js"></script>
    <script src="js/jquery.mobile.custom.min.js"></script>-->
    <!--Icon Pack-->
    <link rel="stylesheet" href="//code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css">
    <!--Eigenes JavaScript-->
    <script src="js/shake.js"></script>
    <script src="js/ticket.js"></script>
    <!--Eigenes CSS-->
    <link rel="stylesheet" href="css/css.css" />
    <link rel="stylesheet" href="css/css_landscape.css" media="(orientation: landscape)" />
    <link rel="stylesheet" href="css/ticket.css" />
    <link rel="stylesheet" href="css/ticket_landscape.css" media="(orientation: landscape)" />
</head>
    
<body>           
    <!--<img id="ticketLogo" src="images/logo_transparent.png" />-->
    
    <div class="ticketContent">
        <h1>eTicket gebucht</h1>
        <p class="specialtext">Sie haben Ihr Parkticket erfolgreich gebucht!</p>
        <p class="specialtext">Startzeitpunkt: <?php echo $datetime; ?></p>
        <p class="specialtext">Parkplatz: <?php echo $parkplatz; ?></p>

        <a href="main.php">
            <div class="abbrechenButton">
                <i class="ion-android-checkmark-circle"></i> OK
            </div>
        </a>    
    </div>
</body> 
</html>