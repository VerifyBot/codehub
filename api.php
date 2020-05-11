<?php

if (!empty($_POST['method'])) {
  switch ($_POST['method']) {
    case 'downloadFile':
      $file_name = $_POST['filename'];
      $code = $_POST['code'];
      $ext = $_POST['extension'];


      $id = uniqid('tmpf-');
      $fp = fopen("tmp/$id.$ext", "wb");
      if ($fp == false) {
        echo 'Null';
      } else {
        fwrite($fp, $code);
        fclose($fp);
      }

      $file_url = "tmp/$id.$ext";

      echo $file_url;

      break;
    
    case 'deleteFile':
      $file_url = substr(str_replace('/', '_', $_POST['fileurl']), 4);
      unlink("tmp/$file_url");
  }
}
