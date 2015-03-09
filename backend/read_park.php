<?php
include 'functions.lib.php';

//$positions;
$positions = array(
                "PH K04" => array("lat" => "49.003871", "long" => "8.405114"),
                "PH K01" => array("lat" => "49.003934", "long" => "8.402119"),
                "PH K02" => array("lat" => "49.004551", "long" => "8.402048"),
                "PH K03" => array("lat" => "49.000645", "long" => "8.404819"),
                "PH N03" => array("lat" => "49.010698", "long" => "8.400978"),
                "PH N06" => array("lat" => "49.009933", "long" => "8.405402"),
                "PH N07" => array("lat" => "49.007574", "long" => "8.410178"),
                "PH N02" => array("lat" => "49.010680", "long" => "8.398533"),
                "PH N05" => array("lat" => "49.010880", "long" => "8.403312"),
                "PH N04" => array("lat" => "49.010371", "long" => "8.402536"),
                "PH S07" => array("lat" => "49.005643", "long" => "8.401807"),
                "PH S02" => array("lat" => "49.008177", "long" => "8.401814"),
                "PH S04" => array("lat" => "49.007490", "long" => "8.402540"),
                "PH S03" => array("lat" => "49.008875", "long" => "8.402161"),
                "PH S01" => array("lat" => "49.007408", "long" => "8.399291"),
                "PH S05" => array("lat" => "49.008202", "long" => "8.405746"),
                "PH S06" => array("lat" => "49.004795", "long" => "8.416961"),
                "PH W02" => array("lat" => "49.010440", "long" => "8.394485"),
                "PH W04" => array("lat" => "49.007664", "long" => "8.395791"),
                "PH W02" => array("lat" => "49.008319", "long" => "8.393184"),
                "Berufsakademie Karlsruhe" => array("lat" => "49.025616", "long" => "8.385395"),
                "Filmpalast" => array("lat" => "49.000380", "long" => "8.385570"),
                //Parkplätze/Parkscheinautomaten (nicht alle) (11 Stück)
                "Moltkestr." => array("lat" => "49.014438", "long" => "8.390808"),
                "Kaiserallee 61" => array("lat" => "49.010624", "long" => "8.375911"),
                "Sophienstr. 128" => array("lat" => "49.008260", "long" => "8.37924"),
                "Ritterstr. 16" => array("lat" => "49.007780", "long" => "8.399833"),
                "Waldstr. 15" => array("lat" => "49.010791", "long" => "8.399074"),
                "Kriegsstr. 100" => array("lat" => "49.005900", "long" => "8.4049"),
                "Luisenstr. 23" => array("lat" => "49.000835", "long" => "8.404849"),
                "Durlacher Allee 10" => array("lat" => "49.007958", "long" => "8.421447"),
                "Rintheimer Str. 19" => array("lat" => "49.011320", "long" => "8.4261"),
                "Bahnhofsplatz West" => array("lat" => "48.993794", "long" => "8.398608"),
                //E-Ladestationen (10 Stück)
                "Blumentorstraße" => array("lat" => "49.000155", "long" => "8.475735"),
                "Gottesauer Platz" => array("lat" => "49.007276", "long" => "8.422964"),
                "Englerstraße" => array("lat" => "49.010601", "long" => "8.411038"),
                "Steinstraße" => array("lat" => "49.006908", "long" => "8.408052"),
                "Hans-Thoma-Straße" => array("lat" => "49.012783", "long" => "8.39878"),
                "Stephanienstraße" => array("lat" => "49.010825", "long" => "8.389896"),
                "Bahnhofsstraße" => array("lat" => "49.162944", "long" => "8.490006"),
                "Herrmann-Leichtlin-Straße" => array("lat" => "48.997133", "long" => "8.359062"),
                "Kurzheckweg" => array("lat" => "49.022256", "long" => "8.3438"),
                "Hertzstraße" => array("lat" => "49.020824", "long" => "8.365542"));
                //Kostenlose Parkplätze. Nur eine Auswahl - 5 Stück
$kostenlosePlaetze = array(
                "Erzbergerstraße" => array("STANDORT" => "Erzbergerstraße", "LAT" => "49.018064", "LONG" => "8.385103", "TYPE" => "kostenlos", "anzahl" => "75"),
                "Waldparkplatz" => array("STANDORT" => "Waldparkplatz", "LAT" => "49.015342", "LONG" => "8.418961", "TYPE" => "kostenlos", "anzahl" => "65"),
                "Ernst-Friedrich-Straße" => array("STANDORT" => "Ernst-Friedrich-Straße", "LAT" => "48.998523", "LONG" => "8.462975", "TYPE" => "kostenlos", "anzahl" => "40"),
                "Wilhelmstraße" => array("STANDORT" => "Wilhelmstraße", "LAT" => "49.000739", "LONG" => "8.405748", "TYPE" => "kostenlos", "anzahl" => "15"),
                "Peter-und-Paul-Platz" => array("STANDORT" => "Peter-und-Paul-Platz", "LAT" => "49.0107029", "LONG" => "8.3652292", "TYPE" => "kostenlos", "anzahl" => "23"),
    );

$posKeys = getArrayKeyArray($positions);


$results = array(); //array, in das alle Fields und somit alle Einträge geschrieben werden. Ein Eintrag pro PH.

//$results[] = readParkplatzData($positions);
//$results[] = readEStationenData($positions);
//$results[] = readParkhausData($positions, $posKeys);

$results = array_merge($kostenlosePlaetze, readParkplatzData($positions, $posKeys), readEStationenData($positions, $posKeys), readParkhausData($positions, $posKeys));
echo json_encode($results);

function readParkhausData($pos, $keys){
    $xml = simplexml_load_file('http://vmz.karlsruhe.de/entry-tba_Parkleitsystem/nullsearch?form=nullform');
    $r = $xml->results;
    $res = array();
    foreach($r->result as $result){
        $fields = array();
        foreach($result->field as $field){
        $name = (string)$field['name'];
            if($name == 'PH_NAME' ||
                $name == 'PH_STRASSE' ||
                $name == 'FREIE_PARKPLAETZE' ||
                $name == 'GESAMTE_PARKPLAETZE' ||
                $name == 'PH_KEY' ||
                $name == 'STADTTEIL'){

                $value = (string)$field['value'];
                $fields[$name] = $value;
            }
        }
        $fields['TYPE'] = "Parkhaus";
        if(in_array($fields['PH_KEY'],$keys)){
            $fields['LAT'] = $pos[$fields['PH_KEY']]['lat'];
            $fields['LONG'] = $pos[$fields['PH_KEY']]['long'];
            $res[] = $fields;
        } else if(in_array($fields['PH_NAME'],$keys)){
            $fields['PH_KEY'] = $fields['PH_NAME'];
            $fields['LAT'] = $pos[$fields['PH_NAME']]['lat'];
            $fields['LONG'] = $pos[$fields['PH_NAME']]['long'];
            $res[] = $fields;
        }        
    }
    
    return $res;   
}
function readParkplatzData($pos,$keys){
    $xml = simplexml_load_file('http://vmz.karlsruhe.de/entry-tba_Parkschein/nullsearch?form=nullform');
    $r = $xml->results;
    $res = array();
    foreach($r->result as $result){
        $fields = array();
        foreach($result->field as $field){
        $name = (string)$field['name'];
            if($name == 'STANDORT' ||
                $name == 'HÖCHST_PARK_DAUER' ||
                $name == 'GEBÜHREN' ||
                $name == 'GEBÜHRENPFL_PARKZEIT' ||
                $name == 'STELLPLÄTZE'){

                $value = (string)$field['value'];
                $fields[$name] = $value;
            }
        }
        $fields['TYPE'] = "Parkplatz";
        if(in_array($fields['STANDORT'],$keys)){
            $fields['LAT'] = $pos[$fields['STANDORT']]['lat'];
            $fields['LONG'] = $pos[$fields['STANDORT']]['long'];
            $res[] = $fields;
        }
    }
    
    return $res; 
}
function readEStationenData($pos,$keys){
    $positions = $pos;
    $xml = simplexml_load_file('http://vmz.karlsruhe.de/entry-tba_ELadestationen/nullsearch?form=nullform');
    $r = $xml->results;
    $res = array();
    foreach($r->result as $result){
        $fields = array();
        foreach($result->field as $field){
        $name = (string)$field['name'];
            if($name == 'STANDORT' ||
                $name == 'LADESTATION' ||
                $name == 'STADTTEIL' ||
                $name == 'STECKDOSE'){

                $value = (string)$field['value'];
                $fields[$name] = $value;
            }
        }   
	   $fields['TYPE'] = "ELadestation";
        if(in_array($fields['STANDORT'],$keys)){
            $fields['LAT'] = $pos[$fields['STANDORT']]['lat'];
            $fields['LONG'] = $pos[$fields['STANDORT']]['long'];
            $res[] = $fields;
        }
    }
    
    return $res; 
}
?>