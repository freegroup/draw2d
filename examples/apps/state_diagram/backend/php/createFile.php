<?php

  require_once('configuration.php');
    
  $fileName = $_POST["id"] ;
  
  $fileName = preg_replace('/[^0-9a-z\_\-]/i','',$fileName);
  if(strpos($fileName, ".json", strlen($fileName) - strlen(".json")) == false){
 	$fileName = $fileName .".json";
  }
 	
  
  $filePath = $PHPBLOCKS_DATADIR.$fileName;

  $fileHandle = fopen($filePath, 'w+');
  header('Content-type: application/json');
  header("Expires: Mon, 26 Jul 1997 05:00:00 GMT");
  header("Cache-Control: no-cache");
  header("Pragma: no-cache");
  $content = "[]";

  fwrite($fileHandle, $content);
	
  fclose($fileHandle);
  
  echo $content;
?>