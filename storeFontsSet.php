<?php
	/*
	* File:           custom.js
	* Version:        0.9
	* Purpose:        save a configuration on mysql
	* Author:         Ciro Finizio
	* Product:        Font Compare
	*/
	$json = ($_POST['json']);
    $db = mysqli_connect('localhost', 'root', '', 'fontStore'); 
    echo $json;
    $name = $json["name"];
    $json = json_encode($json);
    $json = str_replace('"', '\"', $json);
	if (mysqli_connect_errno()) {
    	echo 'fail';
	}
	$row = mysqli_query($db,'insert into fontset values(null,"'.$name.'","'.$json.'");');
	print_r($row);
	if (!$row)  printf("Errormessage: %s\n", mysqli_error($db));
	echo 'fatto';
?>