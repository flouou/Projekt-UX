<?php
/*
 * Für die Positionsdaten interessieren auch die Schlüssel (Keys) des Positionsdaten-Arrays.
 * Diese Funktion gibt aus einem Array nur die Schlüssel in einem neuen Array zurück.
 */
function getArrayKeyArray($arr){
    $ret = array();
    foreach($arr as $key => $value){
        $ret[] = $key;
    }
    return $ret;
}
?>