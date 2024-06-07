<?php
  #require_once('Libreries/Core/controllers.php');
  class configuracion extends controllers{
    public function _construct(){
      parent::_construct();
    }

    public function configuracion($paramtro_fun){


       #validar si el usuario se la logeado
      session_start();
      
      if (!isset($_SESSION['id_usuario'])) {
        echo 'NO Tiene Acceso Al Sistema';
      }else{
        #cargar la vista!
      }
      $this->ob_vista->get_vista($this, 'configuracion' );

     
    }

    #================================= METODOS ================================
    //===== CASOS DE EXITO ======
    #comunicaion con EL MODELO>>>>>>>>>>>>>
    public function listar_casos(){
      $data = $this->model->get_casos();
      $j_data = json_encode($data);
      echo $j_data;
    }

    public function fun_guardar_caso($titulo, $desc, $autor, $categ_act, $body, $ruta_img1, $ruta_img2, $ruta_img3){
      $data = $this->model->set_caso($titulo, $desc, $autor, $categ_act, $body, $ruta_img1, $ruta_img2, $ruta_img3);
      return $data;
    }

    public function fun_actualizar_caso($id, $titulo, $desc, $autor, $categ_act, $body, $ruta_img1, $ruta_img2, $ruta_img3){
      $data = $this->model->update_caso($id, $titulo, $desc, $autor, $categ_act, $body, $ruta_img1, $ruta_img2, $ruta_img3);
      return $data;
    }
    
    public function fun_eliminar_caso($id){
      $data = $this->model->delete_caso($id);
      $j_data = json_encode($data);
      echo $j_data;
    }
    
    
    //===== ARTICULOS ======
    public function listar_articulos(){
      $data = $this->model->get_articulos();
      $j_data = json_encode($data);
      echo $j_data;
    }
    
    public function guardar_actividad($titulo, $desc, $autor, $categ_act, $body, $ruta_img1, $ruta_img2, $ruta_img3){
      $data = $this->model->set_activiad($titulo, $desc, $autor, $categ_act, $body, $ruta_img1, $ruta_img2, $ruta_img3);
      return $data;
    }
    

    public function actualizar_actividad($id, $titulo, $desc, $autor, $categ_act, $body, $ruta_img1, $ruta_img2, $ruta_img3){
      $data = $this->model->update_activiad($id, $titulo, $desc, $autor, $categ_act, $body, $ruta_img1, $ruta_img2, $ruta_img3);
      return $data;
    }

    public function eliminar_actividad_por_id($id){
      $data = $this->model->delete_actividad($id);
      $j_data = json_encode($data);
      echo $j_data;
    }

    #================================= METODOS para la vista ================================



    public function guardar_caso(){

      if (isset($_POST['titulo_caso']) &&  isset($_POST['desc_caso']) &&  isset($_POST['autor_caso']) && isset($_POST['categ_caso'])  &&  isset($_POST['body_caso'])  && isset($_FILES['file1_caso']) 
      ) {

        //## Obtener el valor del dato enviado desde el formulario
        $titulo = $_POST['titulo_caso']; 
        $desc = $_POST['desc_caso'];
        $autor = $_POST['autor_caso'];
        $categ_act = $_POST['categ_caso'];
        $body = $_POST['body_caso'];

        $nombre_imagen1 = $_FILES['file1_caso']['name'];
        $nombre_imagen2 = $_FILES['file2_caso']['name'];
        $nombre_imagen3 = $_FILES['file3_caso']['name'];

        
        //agregar ruta a la imagen en la base de datos
        $carpeta_destino = $_SERVER['DOCUMENT_ROOT'].'/elite/media/casos/';
        $ruta_img1 = "media/casos/".$nombre_imagen1;
        $ruta_img2 = null;
        $ruta_img3 = null;

        try {

          
          // #mover la imagen a la carpeta funaje/media
          move_uploaded_file($_FILES['file1_caso']['tmp_name'],$carpeta_destino.$nombre_imagen1);
          
          if($nombre_imagen2 !== ""){
            
            move_uploaded_file($_FILES['file2_caso']['tmp_name'],$carpeta_destino.$nombre_imagen2);
            $ruta_img2 = "media/casos/".$nombre_imagen2;
            
            if($nombre_imagen3 !== ""){
              
              move_uploaded_file($_FILES['file3_caso']['tmp_name'],$carpeta_destino.$nombre_imagen3);
              $ruta_img3 = "media/casos/".$nombre_imagen3;
            }
            
          }else if($nombre_imagen3 !== ""){
            
            move_uploaded_file($_FILES['file3_caso']['tmp_name'],$carpeta_destino.$nombre_imagen3);
            $ruta_img3 = "media/casos/".$nombre_imagen3;
          }

          // #enviar a la base de datos.
          $data = $this->fun_guardar_caso($titulo, $desc, $autor, $categ_act, $body, $ruta_img1, $ruta_img2, $ruta_img3);
          
          echo json_encode($data);

          } catch (Exception $e) {
            $arr_mensaje['ya_existe'] = $e;
            echo json_encode($arr_mensaje);
          }

      } else {
          echo json_encode("Error: No se recibió ningún dato del formulario.");
      }

    }

    public function actualizar_caso(){

      if (isset($_POST['id_caso']) && isset($_POST['titulo_caso']) &&  isset($_POST['desc_caso']) &&  isset($_POST['autor_caso']) && isset($_POST['categ_caso'])  &&  isset($_POST['body_caso'])) 
      {
        
        // Obtener el valor del dato enviado desde el formulario
        $id = $_POST['id_caso'];
        $titulo = $_POST['titulo_caso'];
        $desc = $_POST['desc_caso'];
        $autor = $_POST['autor_caso'];
        $categ_act = $_POST['categ_caso'];
        $body = $_POST['body_caso'];

        #olds images
        $old_img1 = $_POST['old_img1'];
        $old_img2 = $_POST['old_img2'];
        $old_img3 = $_POST['old_img3'];

        #new images en segun el caso
        $nombre_imagen1 = $_FILES['file1_caso']['name'];
        $nombre_imagen2 = $_FILES['file2_caso']['name'];
        $nombre_imagen3 = $_FILES['file3_caso']['name'];

        
        //agregar ruta a la imagen en la base de datos
        $carpeta_destino = $_SERVER['DOCUMENT_ROOT'].'/elite/media/articulos/';
        $ruta_img1 = null;
        $ruta_img2 = null;
        $ruta_img3 = null;

        #BORRAR la imagen a la carpeta Elite/articulos
        $ruta_imagen1_a_eliminar = $carpeta_destino . $old_img1;
        $ruta_imagen2_a_eliminar = $carpeta_destino . $old_img2;
        $ruta_imagen3_a_eliminar = $carpeta_destino . $old_img3;
      

        try {
          
          // #mover la imagen a la carpeta Elite/media si el nombre de la imagen tiene algo.         
          if($nombre_imagen1 !== ""){
            
            move_uploaded_file($_FILES['file1_caso']['tmp_name'],$carpeta_destino.$nombre_imagen1);
            $ruta_img1 = "media/casos/".$nombre_imagen1;

                if($old_img1 !== 'null'){ 

                  if (file_exists($ruta_imagen1_a_eliminar)) {
                    unlink($ruta_imagen1_a_eliminar);    
                  }

                }     
            
                if($nombre_imagen3 !== ""){
                  
                  move_uploaded_file($_FILES['file2_caso']['tmp_name'],$carpeta_destino.$nombre_imagen2);
                  $ruta_img2 = "media/casos/".$nombre_imagen2;

                    if($old_img2 !== 'null'){ 

                      if (file_exists($ruta_imagen2_a_eliminar)) {
                        unlink($ruta_imagen2_a_eliminar);    
                      }

                    } 
                      if($nombre_imagen3 !== ""){
                      
                        move_uploaded_file($_FILES['file3_caso']['tmp_name'],$carpeta_destino.$nombre_imagen3);
                        $ruta_img3 = "media/casos/".$nombre_imagen3;

                          if($old_img3 !== 'null'){ 

                            if (file_exists($ruta_imagen3_a_eliminar)) {
                              unlink($ruta_imagen3_a_eliminar);    
                            }

                          } 
                      }
                }
  
          }

              // #enviar a la base de datos.
              $data = $this->fun_actualizar_caso($id, $titulo, $desc, $autor, $categ_act, $body, $ruta_img1, $ruta_img2, $ruta_img3);
              
              echo json_encode($data);


          } catch (Exception $e) {
            $arr_mensaje['ya_existe'] = $e;
            echo json_encode($arr_mensaje);
          }

      } else {
          echo json_encode("Error: No se recibió ningún dato del formulario.");
      }

    }

    public function eliminar_caso(){
      
      if (isset($_POST['id']) &&  isset($_POST['name1_img']) &&  isset($_POST['name2_img']) &&  isset($_POST['name3_img']) ) {
        // Obtener el valor del dato enviado desde el formulario
        $id = $_POST['id']; 
        $name1 = $_POST['name1_img'];
        $name2 = $_POST['name2_img'];
        $name3 = $_POST['name3_img'];

        //con esto arreglo el problema de que supuestamente un string vacio existe!.
        if($name2 == ''){
          $name2 = 'no';
        }else if($name3 == ''){
          $name3 = 'no';
        }

        $carpeta_destino = $_SERVER['DOCUMENT_ROOT'].'/elite/media/casos/';


        try {

          
          #BORRAR la imagen a la carpeta elite/media
          $ruta_imagen_a_eliminar1 = $carpeta_destino . $name1;
          $ruta_imagen_a_eliminar2 = $carpeta_destino . $name2;
          $ruta_imagen_a_eliminar3 = $carpeta_destino . $name3;
          

          
          if(file_exists($ruta_imagen_a_eliminar1)){
            if(file_exists($ruta_imagen_a_eliminar2)){

            }
          }
          if (file_exists($ruta_imagen_a_eliminar1)) {
            
            
            #Verificar si el archivo existe antes de intentar eliminarlo
            if (unlink($ruta_imagen_a_eliminar1 )) {
              
              if (file_exists($ruta_imagen_a_eliminar2)) {
                
                  unlink($ruta_imagen_a_eliminar2);
                
                  if (file_exists($ruta_imagen_a_eliminar3)) {
                    unlink($ruta_imagen_a_eliminar3);
                  }
              }
              
              $data = $this->fun_eliminar_caso($id);
                  
                
              } else {
                echo json_encode("Error al intentar eliminar la imagen 1.");
              }
              

          } else {
            echo json_encode("La imagen que intentas eliminar no existe en el directorio.");
          }

          } catch (Exception $e) {
            $arr_mensaje['ya_existe'] = $e;
            echo json_encode($arr_mensaje);
          }

      } else {
          echo json_encode("Error: No se recibió ningún dato del formulario.");
      }

    }

    #================================= METODOS ARTIUCLOS ================================
    public function guardar_articulo(){

      if (isset($_POST['titulo_act']) &&  isset($_POST['desc_act']) &&  isset($_POST['autor_act']) && isset($_POST['categ_act'])  &&  isset($_POST['body_act'])  && isset($_FILES['file1_act']) 
      ) {
        
        // Obtener el valor del dato enviado desde el formulario
        $titulo = $_POST['titulo_act']; 
        $desc = $_POST['desc_act'];
        $autor = $_POST['autor_act'];
        $categ_act = $_POST['categ_act'];
        $body = $_POST['body_act'];

        $nombre_imagen1 = $_FILES['file1_act']['name'];
        $nombre_imagen2 = $_FILES['file2_act']['name'];
        $nombre_imagen3 = $_FILES['file3_act']['name'];

        
        //agregar ruta a la imagen en la base de datos
        $carpeta_destino = $_SERVER['DOCUMENT_ROOT'].'/elite/media/articulos/';
        $ruta_img1 = "media/articulos/".$nombre_imagen1;
        $ruta_img2 = null;
        $ruta_img3 = null;

        try {

          
          // #mover la imagen a la carpeta funaje/media
          move_uploaded_file($_FILES['file1_act']['tmp_name'],$carpeta_destino.$nombre_imagen1);
          
          if($nombre_imagen2 !== ""){
            
            move_uploaded_file($_FILES['file2_act']['tmp_name'],$carpeta_destino.$nombre_imagen2);
            $ruta_img2 = "media/articulos/".$nombre_imagen2;
            
            if($nombre_imagen3 !== ""){
              
              move_uploaded_file($_FILES['file3_act']['tmp_name'],$carpeta_destino.$nombre_imagen3);
              $ruta_img3 = "media/articulos/".$nombre_imagen3;
            }
            
          }else if($nombre_imagen3 !== ""){
            
            move_uploaded_file($_FILES['file3_act']['tmp_name'],$carpeta_destino.$nombre_imagen3);
            $ruta_img3 = "media/articulos/".$nombre_imagen3;
          }

          // #enviar a la base de datos.
          $data = $this->guardar_actividad($titulo, $desc, $autor, $categ_act, $body, $ruta_img1, $ruta_img2, $ruta_img3);
          
          echo json_encode("correcto");
          // echo json_encode($categ_act);

          } catch (Exception $e) {
            $arr_mensaje['ya_existe'] = $e;
            echo json_encode($arr_mensaje);
          }

      } else {
          echo json_encode("Error: No se recibió ningún dato del formulario.");
      }

    }

    public function actualizar_articulo(){

      if (isset($_POST['id_art']) && isset($_POST['titulo_act']) &&  isset($_POST['desc_act']) &&  isset($_POST['autor_act']) && isset($_POST['categ_act'])  &&  isset($_POST['body_act'])) 
      {
        
        // Obtener el valor del dato enviado desde el formulario
        $id = $_POST['id_art'];
        $titulo = $_POST['titulo_act'];
        $desc = $_POST['desc_act'];
        $autor = $_POST['autor_act'];
        $categ_act = $_POST['categ_act'];
        $body = $_POST['body_act'];

        #olds images
        $old_img1 = $_POST['old_img1'];
        $old_img2 = $_POST['old_img2'];
        $old_img3 = $_POST['old_img3'];

        #new images en segun el caso
        $nombre_imagen1 = $_FILES['file1_act']['name'];
        $nombre_imagen2 = $_FILES['file2_act']['name'];
        $nombre_imagen3 = $_FILES['file3_act']['name'];

        
        //agregar ruta a la imagen en la base de datos
        $carpeta_destino = $_SERVER['DOCUMENT_ROOT'].'/elite/media/articulos/';
        $ruta_img1 = null;
        $ruta_img2 = null;
        $ruta_img3 = null;

        #BORRAR la imagen a la carpeta Elite/articulos
        $ruta_imagen1_a_eliminar = $carpeta_destino . $old_img1;
        $ruta_imagen2_a_eliminar = $carpeta_destino . $old_img2;
        $ruta_imagen3_a_eliminar = $carpeta_destino . $old_img3;
      

        try {
          
          // #mover la imagen a la carpeta Elite/media si el nombre de la imagen tiene algo.         
          if($nombre_imagen1 !== ""){
            
            move_uploaded_file($_FILES['file1_act']['tmp_name'],$carpeta_destino.$nombre_imagen1);
            $ruta_img1 = "media/articulos/".$nombre_imagen1;

                if($old_img1 !== 'null'){ 

                  if (file_exists($ruta_imagen1_a_eliminar)) {
                    unlink($ruta_imagen1_a_eliminar);    
                  }

                }     
            
                if($nombre_imagen3 !== ""){
                  
                  move_uploaded_file($_FILES['file2_act']['tmp_name'],$carpeta_destino.$nombre_imagen2);
                  $ruta_img2 = "media/articulos/".$nombre_imagen2;

                    if($old_img2 !== 'null'){ 

                      if (file_exists($ruta_imagen2_a_eliminar)) {
                        unlink($ruta_imagen2_a_eliminar);    
                      }

                    } 
                      if($nombre_imagen3 !== ""){
                      
                        move_uploaded_file($_FILES['file3_act']['tmp_name'],$carpeta_destino.$nombre_imagen3);
                        $ruta_img3 = "media/articulos/".$nombre_imagen3;

                          if($old_img3 !== 'null'){ 

                            if (file_exists($ruta_imagen3_a_eliminar)) {
                              unlink($ruta_imagen3_a_eliminar);    
                            }

                          } 
                      }
                }
  
          }

              // #enviar a la base de datos.
              $data = $this->actualizar_actividad($id, $titulo, $desc, $autor, $categ_act, $body, $ruta_img1, $ruta_img2, $ruta_img3);
              
              echo json_encode($data);


          } catch (Exception $e) {
            $arr_mensaje['ya_existe'] = $e;
            echo json_encode($arr_mensaje);
          }

      } else {
          echo json_encode("Error: No se recibió ningún dato del formulario.");
      }

    }


    public function eliminar_actividad(){
      
      if (isset($_POST['id']) &&  isset($_POST['name1_img']) &&  isset($_POST['name2_img']) &&  isset($_POST['name3_img']) ) {
        // Obtener el valor del dato enviado desde el formulario
        $id = $_POST['id']; 
        $name1 = $_POST['name1_img'];
        $name2 = $_POST['name2_img'];
        $name3 = $_POST['name3_img'];

        //con esto arreglo el problema de que supuestamente un string vacio existe!.
        if($name2 == ''){
          $name2 = 'no';
        }else if($name3 == ''){
          $name3 = 'no';
        }

        $carpeta_destino = $_SERVER['DOCUMENT_ROOT'].'/elite/media/articulos/';


        try {

          
          #BORRAR la imagen a la carpeta elite/media
          $ruta_imagen_a_eliminar1 = $carpeta_destino . $name1;
          $ruta_imagen_a_eliminar2 = $carpeta_destino . $name2;
          $ruta_imagen_a_eliminar3 = $carpeta_destino . $name3;
          

          
          if(file_exists($ruta_imagen_a_eliminar1)){
            if(file_exists($ruta_imagen_a_eliminar2)){

            }
          }
          if (file_exists($ruta_imagen_a_eliminar1)) {
            
            
            #Verificar si el archivo existe antes de intentar eliminarlo
            if (unlink($ruta_imagen_a_eliminar1 )) {
              
              if (file_exists($ruta_imagen_a_eliminar2)) {
                
                  unlink($ruta_imagen_a_eliminar2);
                
                  if (file_exists($ruta_imagen_a_eliminar3)) {
                    unlink($ruta_imagen_a_eliminar3);
                  }
              }
              
              $data = $this->eliminar_actividad_por_id($id);
                  
                
              } else {
                echo json_encode("Error al intentar eliminar la imagen 1.");
              }
              

          } else {
            echo json_encode("La imagen que intentas eliminar no existe en el directorio.");
          }

          } catch (Exception $e) {
            $arr_mensaje['ya_existe'] = $e;
            echo json_encode($arr_mensaje);
          }

      } else {
          echo json_encode("Error: No se recibió ningún dato del formulario.");
      }

    }

  }
?>
