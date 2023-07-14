<?php
$servername = "localhost";
$username   = "root";
$dbname = "nonkishiba";
$password = "";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
   die("Connection failed: " . $conn->connect_error);
}

if(isset($_GET['address']) && $_GET['address']!="")
{
     $addresse = $conn->real_escape_string(trim($_GET['address']));
     $result = $conn->query("SELECT * FROM `whitelist` WHERE address='".$addresse."'");
     if ($result->num_rows > 0) 
     {
         echo "Yes";
     }
}
else 
{
     echo "No";
}
?>