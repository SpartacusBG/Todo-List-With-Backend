<?php

if(!empty($_POST)) {


    include('session-config.php');


    $description = $_POST["description"];
    $checked = $_POST["checked"];
    $itemId = $_POST["itemId"];
    $deleteValue = $_POST["deleteValue"];
    $filter = $_POST["filter"];
    $count = $_POST['count'];



    function getCount($count) {
        global $mysqli;

        if($count == "count") {

            $sql="SELECT * FROM todos WHERE checked=0";

            if ($result=mysqli_query($mysqli,$sql)) {
               // Return the number of rows in result set
                  $rowcount=mysqli_num_rows($result);
                  printf ($rowcount);
                  mysqli_free_result($result);

                
        }
            }


    }



    function deleteElements($deleteValue) {

        global $mysqli;
     
        $sql = "DELETE FROM todos WHERE id=$deleteValue";
        
        if ($mysqli->query($sql) === TRUE) {
            echo "Record deleted successfully";        
           
        } else {
          //  echo "Error deleting record: " . $mysqli->error;
        }



    }



    function updateData($checked, $itemId) {

        global $mysqli;

         $sql = "UPDATE todos SET checked=$checked WHERE id=$itemId";

        if ($mysqli->query($sql) === TRUE) {

            echo "Record updated successfully";
        } else {
         //   echo "Error updating record: " . $mysqli->error;
        }


    }

    function getData($filter) {


        global $mysqli;
        if($filter == "all") {
            $sqlQuery = "SELECT * FROM todos";

        }else if($filter == "done") {
            $sqlQuery = "SELECT * FROM todos WHERE checked=1";
        }else if($filter == "notDone") {
            $sqlQuery = "SELECT * FROM todos WHERE checked=0";

        }

        $result = $mysqli->query($sqlQuery);
        $object = array();
        $array = array();
         
        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                $object["id"] = $row["id"];
                $object["desc"] = $row["description"];
                $object["check"] = $row["checked"];
                array_push($array, $object);
          
            }
             echo json_encode($array);
        } else {
           // echo "0";
        }
        
 

    }

 

     function saveData($description) {

        global $mysqli;
        if($description) {
       
            $sql = "INSERT INTO todos (description, checked) VALUES ( '$description', '0' )";
            $insert = $mysqli->query($sql);

            if($insert) {
                echo "Success! Row Id: {$mysqli->insert_id}";
            }else {
                die("Error: {$mysqli->errno} : {$mysqli->error}");
            }

             
            getData($filter);
       

        }

       
     }

      error_reporting(E_ERROR | E_PARSE);
  
      getData($filter);

      saveData($description);

      updateData($checked, $itemId);

      deleteElements($deleteValue);

      getCount($count);




}

?>

