<?php

  class agenda_model extends mysql
  {
    public function __construct()
    {
      parent::__construct();
      #echo "<H3>mesaje desde el modelo HOME</H3>";
    }


    #================================= METODOS ================================
    public function get_agenda(){

      $sql = "SELECT * FROM agenda";
      $request = $this->select_all($sql);
      return $request;
    }

    
  }
?>
