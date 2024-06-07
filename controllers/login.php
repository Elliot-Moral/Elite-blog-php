<?php

  class login extends controllers{
    public function _construct(){
      parent::_construct();
    }

    public function login($paramtro_fun){

      $this->ob_vista->get_vista($this, 'login' );
     
    }

    
    #===================== METODOS =======================

    #REQUIRE PARAMETRO
    public function consultar($usuario, $password){
      $data = $this->model->consultar_usuario($usuario,$password);
      return $data;
    }

    #METODO PARA VALIDAR SI EXISTE EL USUARIO
    public function recibir_datos(){
   
      
      $usuario = $_POST['usuario'];
      $password = $_POST['password'];      
      
      $id_usuario = ''; 
      session_start();

      if($usuario === '' || $password === ''){       
        echo json_encode('error'); 
      }else{

        $respuesta = $this->consultar($usuario,$password);

        if ($respuesta) {

          $id_usuario = $respuesta['id_user'];

          $_SESSION['id_usuario'] = $id_usuario;

             echo json_encode("correcto");


        }else{
          echo json_encode('error_validacion');
        }

      }

    }


    public function destruir_session_usuario(){
      session_start();
      session_destroy();
      $respuesta = 'ok';
      echo json_encode($respuesta);
    }


  }
?>
