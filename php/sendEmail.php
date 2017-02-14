<?php
	/* Sends message to my personal email. */
	$rest_json = file_get_contents("php://input");
	$_POST = json_decode($rest_json, true);

	$name = $_POST['name'];
    $email = $_POST['email'];
	$message = $_POST['message'];

	$to = "brielhope@gmail.com";
	$subject = "Message from ".$name." at ".$email; 

	$result = @mail($to, $subject, $message);
    if($result){
		print json_encode($result);
	}else{
		 die(json_encode(array('message' => 'ERROR', 'code' => 1337)));
	}   
?>