<?php

  require_once('configuration.php');
      
  $fileName = $_POST["id"];
  if(strpos($fileName, ".json", strlen($fileName) - strlen(".json")) == false){
 	$fileName = $fileName .".json";
  }
  $filePath = $PHPBLOCKS_DATADIR.$fileName;
  $fileContent =  $_POST["content"];
  

  $fh = fopen($filePath, "w");
  fwrite($fh, $fileContent);
  fclose($fh);
?>