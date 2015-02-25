<?php
$xml = simplexml_load_file('http://vmz.karlsruhe.de/entry-tba_Parkleitsystem/nullsearch?form=nullform');
$results = array(); //array, in das alle Fields und somit alle einträge geschrieben werden. Ein Eintrag pro PH.
$r = $xml->results;
foreach($r->result as $result){
	$fields = array();
	foreach($result->field as $field){
	$name = (string)$field['name'];
		if($name == 'PH_NAME' ||
			$name == 'PH_STRASSE' ||
			$name == 'FREIE_PARKPLAETZE' ||
			$name == 'GESAMTE_PARKPLAETZE' ||
            $name == 'X_KOORDINATE' ||
            $name == 'Y_KOORDINATE' ||
			$name == 'PH_KEY' ||
			$name == 'STADTTEIL'){
			
			$value = (string)$field['value'];
			//echo 'field_name:'.$field['name'];
			//echo 'field_value:'.$field['value'];
			//echo '<br>';
			$fields[$name] = $value;
		}
	}
	$results[] = $fields;
}
//print_r($results);
echo json_encode($results);
?>