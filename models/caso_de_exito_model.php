<?php

  class caso_de_exito_model extends mysql
  {
      
    public function __construct()
    {
      parent::__construct();
       #echo "<H3>mesaje desde el modelo HOME</H3>";
    }



    
    // ===== METODOS =====
    public function get_caso($id){
      $query = "SELECT * FROM elite_casos WHERE  id_caso = '$id'";
      $request = $this->select($query);
      return $request;
    }


  }


?>
