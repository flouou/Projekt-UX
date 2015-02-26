<?php
function in_array_key($needle, $haystack, $strict = false) {
    foreach ($haystack as $key => $value) {
        echo $key.', ';
        if (($strict ? $key === $needle : $key == $needle)) {
            return true;
        }
    }

    return false;
}
function getArrayKeyArray($arr){
    $ret = array();
    foreach($arr as $key => $value){
        $ret[] = $key;
    }
    return $ret;
}
?>