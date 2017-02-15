<?php
	$mysqli = new mysqli('localhost', 'sparto', 'sparto', 'ToDoListDataBase');
        // Check connection
        if ($mysqli->connect_error) {
            die("Connection failed: " . $mysqli->connect_error);
        } 

?>