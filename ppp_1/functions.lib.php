<?php
function getArrayKeyArray($arr){
    $ret = array();
    foreach($arr as $key => $value){
        $ret[] = $key;
    }
    return $ret;
}
?>