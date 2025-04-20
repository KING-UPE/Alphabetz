<?php 
    //Detabase Connection 
    $dbServer = "localhost";
    $dbUser = "root";
    $dbPass = "";
    $detabase = "lore";

    // MY SQLi Connection using above variables
    $conn = mysqli_connect($dbServer, $dbUser, $dbPass, $detabase);
    
    if(!$conn){
        echo "Connection Lost";
    }

?> 