<?php

  class articulo_model extends mysql
  {
      
    public function __construct()
    {
      parent::__construct();
       #echo "<H3>mesaje desde el modelo HOME</H3>";
    }



    
    // ===== METODOS =====
    public function get_articulo($id){
      $query = "SELECT * FROM elite_articulo WHERE  id_art = '$id'";
      $request = $this->select($query);
      return $request;
    }


  }


?>
