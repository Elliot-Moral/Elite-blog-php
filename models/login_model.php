<?php

  class login_model extends mysql
  {
    public function __construct()
    {
      parent::__construct();
      #echo "<H3>mesaje desde el modelo HOME</H3>";
    }

    public function consultar_usuario(string $usuario,string $password){
      $query = "SELECT id_user FROM elite_user WHERE  name_user = '$usuario' AND pass_user = '$password'";
      $request = $this->select($query);
      return $request;
    }
    
  }
?>
