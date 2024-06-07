<?php

  class mysql extends conexcion
  {
    private $conexion_base;
    private $str_query;
    private $arr_valores;


    public function __construct()
    {
      $this->conexion_base = new Conexcion();
      $this->conexion_base = $this->conexion_base->retorneme_connect(); //eso es una galleta
      //resulta que para usar la propiead prepare debo retornar la propiedad conect que es una instancia de
      //la propiedad PDO debo crear una funcion en la clase conexion retorneme_connect() me retorna la propiead
      //connect

    }

    public function insert(string $query, array $arr_valores){//este metodo se invoca en el modelo

      $this->str_query = $query;
      $this->arr_valores = $arr_valores;

      // echo "<br> ";
      // echo "<br> valores sql que recibe insert en class mysql: ". $query."<br>";
      // echo 'el array que recibe insert en class mysql:';
      // print_r($this->arr_valores);


      // $sql = "INSERT INTO usuario(nombre, telefono, email) VALUES (?,?,?)";
      // $insert = $this->conexion_base->prepare($sql);
      // $arr_data = array($this->str_nombre, $this->int_telefono, $this->str_email);

      //=====================================ERROR SOLUCIONADOR=========================================
      // $res_insert = $insert->execute($this->arr_valores); //esta fue la solucion para que me deje cuardar Datos
        //=====================================ERROR SOLUCIONADOR=========================================

      //saliar erro asi Call to undefined method
      // $id_insert = $this->conexion_base->lastInsertId();
      // return $id_insert;


      // print_r($insert);
      $insert = $this->conexion_base->prepare($this->str_query);
      $rest_insert = $insert->execute($this->arr_valores); // no la variable poner insert->execute aca me llevo un error de 1 hora

      //validar si almaceno los datos
      if($rest_insert){
        $lastInsert = $this->conexion_base->lastInsertId();
      }else {
        $lastInsert = 0;
      }
      return $lastInsert;
    }

    //traer solo un registro
    public function select(string $query){
      //se llama desde el modelo
      $this->str_query = $query;
      $resultado = $this->conexion_base->prepare($this->str_query);
      $resultado->execute();
      $datos = $resultado->fetch(PDO::FETCH_ASSOC);
      return $datos;
    }

    //devolver todos los registros
    public function select_all(string $query){//la sentencia sql va por parametro
      //se llama desde el modelo
      $this->str_query = $query;
      $resultado = $this->conexion_base->prepare($this->str_query);
      $resultado->execute();
      $datos = $resultado->fetchall(PDO::FETCH_ASSOC);
      return $datos;
    }

    //actualizar
    public function update(string $query, array $arr_valores){//la sentencia sql va por parametro
      //se llama desde el modelo
      $this->str_query = $query;
      $this->arr_valores = $arr_valores;

      $update = $this->conexion_base->prepare($this->str_query);
      $rest_execute = $update->execute($this->arr_valores);
      return $rest_execute; //en el modelo se hace la validacion
    }

    public function delete(string $query){//la sentencia sql va por parametro
      //se llama desde el modelo
      $this->str_query = $query;

      $resultado = $this->conexion_base->prepare($this->str_query);
      $borrado = $resultado->execute();
      return $borrado; //en el modelo se hace la validacion
    }

  }

?>
