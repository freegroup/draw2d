<?php
  header('Content-type: application/json');
  header("Expires: Mon, 26 Jul 1997 05:00:00 GMT");
  header("Cache-Control: no-cache");
  header("Pragma: no-cache");
  
  require_once('configuration.php');

  $fileName = $_GET["id"];
  if(strpos($fileName, ".json", strlen($fileName) - strlen(".json")) == false){
 	$fileName = $fileName .".json";
  }
  $filePath = $PHPBLOCKS_DATADIR.$fileName;
  $fileContent ="";
   
  $fileContent = file_get_contents($filePath);
  
  echo $fileContent;
?>