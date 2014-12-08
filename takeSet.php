<?php
	/*
	* File:           takeSet.php
	* Version:        0.9
	* Purpose:        take json of configuration
	* Author:         Ciro Finizio
	* Product:        Font Compare
	*/
	$config = ($_POST['config']);
    $db = mysqli_connect('localhost', 'root', '', 'fontStore');
	if (mysqli_connect_errno()) {
    	echo 'fail';
	}
	$array = array();
	$row = mysqli_query($db, "select json from fontset where name='".$config."'");
	if (!$row)  printf("Errormessage: %s\n", mysqli_error($db));
	while($result = $row->fetch_assoc()) {
    	echo ($result['json']);
    }	
?>