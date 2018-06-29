<?php
 /*
  * 
  * @author Andreas Herz (FreeGroup.de)
  */

ini_set('display_errors',0);
ini_set('display_startup_errors',0);
error_reporting(-1);

  header('Content-type: application/json');
  header("Expires: Mon, 26 Jul 1997 05:00:00 GMT");
  header("Cache-Control: no-cache");
  header("Pragma: no-cache");

  require_once('configuration.php');
  
  
  echo "{\"definitions\":[\n";

  //The path to the style directory
  $dh = opendir($PHPBLOCKS_DATADIR);
  $firstFile = true;
  while (false !== ($file = readdir($dh))) 
  {
  	// directory didn't exists or nor fiels found
  	if($file==""){
  		break;
  	}
  	
 	if(strpos($file, ".json", strlen($file) - strlen(".json")) == false){
 		continue;
 	}
 	
    //Don't list subdirectories
    if (!is_dir($PHPBLOCKS_DATADIR.$file)) 
    {
      if(!$firstFile)
         echo ",\n  {\n";
      else
         echo "  {\n";
      //Truncate the file extension and capitalize the first letter
      echo "    \"id\":\"$file\",\n";
      echo "    \"name\":\"" . htmlspecialchars(ucfirst(preg_replace('/\..*$/', '', $file))) . "\"\n";
      echo "  }";
      $firstFile = false;
    }
  }
  closedir($dh);

  echo "\n]}";
?>