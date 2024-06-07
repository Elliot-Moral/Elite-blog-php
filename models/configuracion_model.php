<?php
  #require_once('Libreries/Core/Mysql.php');
  class configuracion_model extends mysql
  {
    public function __construct()
    {
      parent::__construct();
      #echo "<H3>mesaje desde el modelo HOME</H3>";
    }

    #================================= METODOS ================================
    public function get_casos(){

      $sql = "SELECT * FROM elite_casos";
      $request = $this->select_all($sql);
      return $request;
    }
    
    function definirCategoriaCasos($categoria){

      if($categoria == 'derecho comercial' ){
        $categoria = 1;
      }else if($categoria == 'derecho civil'){
       $categoria = 2;
      }else if($categoria == 'derecho laboral'){
       $categoria = 3;
      }else if($categoria == 'derecho tributario'){
       $categoria = 4 ;
      }else if($categoria == 'derecho financiero'){
       $categoria = 5 ;
      }else if($categoria == 'dderecho penal'){
       $categoria = 6;
      }else if($categoria == 'libertad financiera'){
       $categoria = 7;
      }
      
      return $categoria;
    }

    public function set_caso($titulo, $desc, $autor, $categ_act, $body, $ruta_img1, $ruta_img2, $ruta_img3){

      $fechaHoraFormateada =  $this->capturarFecha();

      $category =  $this->definirCategoriaCasos($categ_act);

      $query_insert = 'INSERT INTO elite_casos (title_caso, desc_caso, cli_caso, body_caso, fecha_caso, url_img1_caso, url_img2_caso, url_img3_caso, id_cat_caso) VALUES (?,?,?,?,?,?,?,?,?)';
        

      $arr_data = array($titulo, $desc, $autor, $body, $fechaHoraFormateada, $ruta_img1, $ruta_img2, $ruta_img3, $category);
      $request_insert = $this->insert($query_insert, $arr_data);
      return $request_insert;

    }

    
    public function update_caso($id, $titulo, $desc, $autor, $categ_act, $body, $ruta_img1, $ruta_img2, $ruta_img3){

      $fecha = $this->capturarFecha();
      $category = $this->definirCategoriaCasos($categ_act);


      if($ruta_img1 !== null && $ruta_img2 !== null && $ruta_img3 !== null){

        $sql = "UPDATE elite_casos SET title_caso=?, desc_caso=?, cli_caso=?, body_caso=?, fecha_caso=?,  url_img1_caso=?, url_img2_caso=?, url_img3_caso=?, id_cat_caso=? WHERE id_caso = $id";
        $arr_data = array($titulo, $desc, $autor, $body, $fecha, $ruta_img1, $ruta_img2, $ruta_img3, $category);

      }else if($ruta_img1 !== null && $ruta_img2 !== null){

        $sql = "UPDATE elite_casos SET title_caso=?, desc_caso=?, cli_caso=?, body_caso=?, fecha_caso=?,  url_img1_caso=?, url_img2_caso=?, id_cat_caso=? WHERE id_caso = $id";
        $arr_data = array($titulo, $desc, $autor, $body, $fecha, $ruta_img1, $ruta_img2, $category);

      }else if($ruta_img1 !== null){

        $sql = "UPDATE elite_casos SET title_caso=?, desc_caso=?, cli_caso=?, body_caso=?, fecha_caso=?,  url_img1_caso=?,  id_cat_caso=? WHERE id_caso = $id";
        $arr_data = array($titulo, $desc, $autor, $body, $fecha, $ruta_img1, $category);

      }else{

        $sql = "UPDATE elite_casos SET title_caso=?, desc_caso=?, cli_caso=?, body_caso=?, fecha_caso=?,  id_cat_caso=? WHERE id_caso = $id";
        $arr_data = array($titulo, $desc, $autor, $body, $fecha, $category);

      }


      $request_update = $this->update($sql, $arr_data);

      return $request_update;
    }
    

    public function delete_caso($id){
      $sql = "DELETE FROM elite_casos WHERE id_caso = $id";
      $request = $this->delete($sql);
      return $request;
    }


    //===== Actividades ======
    public function get_articulos(){

      $sql = "SELECT * FROM elite_articulo";
      $request = $this->select_all($sql);
      return $request;
    }

    public function capturarFecha(){
        ##captuara la fecha actual
        $fechaHoraActual = new DateTime();
        // Formatear la fecha y hora actual en el formato día-mes-año - hora:minuto:segundo
        $fechaHoraFormateada = $fechaHoraActual->format('d-m-Y - H:i:s');
        return $fechaHoraFormateada;
    }

    public function definirCategoria($categ_act){

      $category = '';

      if($categ_act == 'noticias'){
        $category = 1;
      }else if($categ_act == 'leyes'){
        $category = 2;
      }else if($categ_act == 'derechos'){
        $category = 3;
      }else if($categ_act == 'financiera'){
        $category = 4;
      }

      return $category;

    }


    public function set_activiad($titulo, $desc, $autor, $categ_act, $body, $ruta_img1, $ruta_img2, $ruta_img3){


      ##captuara la fecha actual
      $fechaHoraActual = new DateTime();

      // Formatear la fecha y hora actual en el formato día-mes-año - hora:minuto:segundo
      $fechaHoraFormateada = $fechaHoraActual->format('d-m-Y - H:i:s');

      if($categ_act == 'noticias'){
        $category = 1;
      }else if($categ_act == 'leyes'){
        $category = 2;
      }else if($categ_act == 'derechos'){
        $category = 3;
      }else if($categ_act == 'financiera'){
        $category = 4;
      }


      $query_insert = 'INSERT INTO elite_articulo (title_art, desc_art, autor_art, body_art, fecha_art,  url_img1_art, url_img2_art, url_img3_art, id_cat_art) VALUES (?,?,?,?,?,?,?,?,?)';
        

      $arr_data = array($titulo, $desc, $autor, $body, $fechaHoraFormateada, $ruta_img1, $ruta_img2, $ruta_img3, $category);
      $request_insert = $this->insert($query_insert, $arr_data);
      return $request_insert;
    }



    public function update_activiad($id, $titulo, $desc, $autor, $categ_act, $body, $ruta_img1, $ruta_img2, $ruta_img3){

      $fecha = $this->capturarFecha();
      $category = $this->definirCategoria($categ_act);


      if($ruta_img1 !== null && $ruta_img2 !== null && $ruta_img3 !== null){

        $sql = "UPDATE elite_articulo SET title_art=?, desc_art=?, autor_art=?, body_art=?, fecha_art=?,  url_img1_art=?, url_img2_art=?, url_img3_art=?, id_cat_art=? WHERE id_art = $id";
        $arr_data = array($titulo, $desc, $autor, $body, $fecha, $ruta_img1, $ruta_img2, $ruta_img3, $category);

      }else if($ruta_img1 !== null && $ruta_img2 !== null){

        $sql = "UPDATE elite_articulo SET title_art=?, desc_art=?, autor_art=?, body_art=?, fecha_art=?,  url_img1_art=?, url_img2_art=?, id_cat_art=? WHERE id_art = $id";
        $arr_data = array($titulo, $desc, $autor, $body, $fecha, $ruta_img1, $ruta_img2, $category);

      }else if($ruta_img1 !== null){

        $sql = "UPDATE elite_articulo SET title_art=?, desc_art=?, autor_art=?, body_art=?, fecha_art=?,  url_img1_art=?,  id_cat_art=? WHERE id_art = $id";
        $arr_data = array($titulo, $desc, $autor, $body, $fecha, $ruta_img1, $category);

      }else{

        $sql = "UPDATE elite_articulo SET title_art=?, desc_art=?, autor_art=?, body_art=?, fecha_art=?,  id_cat_art=? WHERE id_art = $id";
        $arr_data = array($titulo, $desc, $autor, $body, $fecha, $category);

      }


      $request_update = $this->update($sql, $arr_data);

      return $request_update;
    }


    public function delete_actividad($id){
      $sql = "DELETE FROM elite_articulo WHERE id_art = $id";
      $request = $this->delete($sql);
      return $request;
    }

  }
?>
