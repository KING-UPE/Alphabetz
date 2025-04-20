<?php
    include "dbh.inc.php";
    session_start();
    if($_SESSION["tence_page"] == "1"){
      $id = "1";
    }
    if($_SESSION["tence_page"] == "2"){
      $id = "2";
    }
    if($_SESSION["tence_page"] == "3"){
      $id = "3";
    }
    if($_SESSION["tence_page"] == "4"){
      $id = "4";
    }
    if($_SESSION["tence_page"] == "5"){
      $id = "5";
    }
    if($_SESSION["tence_page"] == "6"){
      $id = "6";
    }
    if($_SESSION["tence_page"] == "7"){
      $id = "7";
    }
    if($_SESSION["tence_page"] == "8"){
      $id = "8";
    }
    if($_SESSION["tence_page"] == "9"){
      $id = "9";
    }
    if($_SESSION["tence_page"] == "10"){
      $id = "10";
    }
    if($_SESSION["tence_page"] == "11"){
      $id = "11";
    }
    if($_SESSION["tence_page"] == "12"){
      $id = "12";
    }
    if($_SESSION["tence_page"] == "13"){
      $id = "13";
    }
    if($_SESSION["tence_page"] == "14"){
      $id = "14";
    }
    if($_SESSION["tence_page"] == "15"){
      $id = "15";
    }
    if($_SESSION["tence_page"] == "16"){
      $id = "16";
    }
    if($_SESSION["tence_page"] == "17"){
      $id = "17";
    }
    if($_SESSION["tence_page"] == "18"){
      $id = "18";
    }
    if($_SESSION["tence_page"] == "19"){
      $id = "19";
    }
    if($_SESSION["tence_page"] == "20"){
      $id = "20";
    }
    $sql = "SELECT * FROM tences WHERE id = ?";

    // Create a prepared statment
    $stmt = mysqli_stmt_init($conn);

    //Prepare the statement
    if(!mysqli_stmt_prepare($stmt, $sql)){
        echo "SQL Statement Faild";
    }
    else{
        // Bind Parameters To Pleaceholders
        mysqli_stmt_bind_param($stmt, "s", $id);

        // Run The Query To Detabase
        mysqli_stmt_execute($stmt);

        // Get The Deta
        $result = mysqli_stmt_get_result($stmt);

        // Print Resuls
        while($row = mysqli_fetch_assoc($result)){
            $t_name = $row["name"];
            $t_base = $row["base"];
            $t_eg1 = $row["eg1"];
            $t_eg2 = $row["eg2"];
            $t_eg3 = $row["eg3"];
            $t_eg4 = $row["eg4"];
            // echo $row["id"]."<br>".$row["name"];
        }

    }

?>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AlphabetZ</title>
    <link rel="shortcut icon" type="image/x-icon" href="favicon.ico">
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="body.css">
    <script src="https://kit.fontawesome.com/a076d05399.js"></script>
</head>
<body>
  <nav class="navbar">
    <div class="content">
      <div class="logo">
        <a href="index.html">AlphabetZ</a>
      </div>
      <ul class="menu-list">
        <div class="icon cancel-btn">
          <i class="fas fa-times"></i>
        </div>
        <li><a href="index.html">Home</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">All Tenses</a></li>
        <li><a href="#">Quiz</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
      <div class="icon menu-btn">
        <i class="fas fa-bars"></i>
      </div>
    </div>
  </nav>
  <div class="about">
    <div class="blank"></div>
    <div id="content" class="content">
      <center><div class="title"><h2><?php echo $t_name;?></h2></div></center>
      <center><div class="title"><h5><?php echo $t_base;?></h5></div></center>
      <br>
      <br>
      <h6><?php echo $t_eg1;?></h6>
      <h6><?php echo $t_eg2;?></h6>
      <h6><?php echo $t_eg3;?></h6>
      <h6><?php echo $t_eg4;?></h6>
      <br>
   </div>
  </div>


  <script src="script.js"></script>

</body>
</html>
