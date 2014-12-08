<?php
	/*
	* File:           takeStoredSet.php
	* Version:        0.9
	* Purpose:        create a list of stored config
	* Author:         Ciro Finizio
	* Product:        Font Compare
	*/
    $db = mysqli_connect('localhost', 'root', '', 'fontStore');
	if (mysqli_connect_errno()) {
    	echo 'fail';
	}
	$array = array();
	$row = mysqli_query($db, "select name from fontset where 1");
	if (!$row)  printf("Errormessage: %s\n", mysqli_error($db));
	while($result = $row->fetch_assoc()) {
      $array[]=($result['name']);
    } 
	echo json_encode($array);
?>