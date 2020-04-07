<?php

    include('database.php');

    if(isset($_POST['id'])){
        $id = $_POST['id'];

        $query = "SELECT * FROM tareas WHERE id = '$id'";
        $resultado = mysqli_query($conexion,$query);

        if(!$resultado){
            die("Error en el query al querer listar los datos de uno tarea para poder actualizar, " . mysqli_error($conexion));
        }

        $json = array();

        while($row = mysqli_fetch_array($resultado)){
            $json[] = array(
                'nombre' => $row['nombre'],
                'descripcion' => $row['descripcion'],
                'id' => $row['id']
            );
        }

        $jsonstring = json_encode($json[0]);

        echo $jsonstring;

    }


?>