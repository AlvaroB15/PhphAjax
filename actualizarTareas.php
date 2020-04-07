<?php

    include('database.php');

    if(isset($_POST['nombre']) and isset($_POST['descripcion']) and isset($_POST['id'])){
        if( ( !empty($_POST['nombre']) ) and ( !empty ($_POST['descripcion']) ) and ( !empty($_POST['id']) ) ){
            $nombre = $_POST['nombre'];
            $descripcion = $_POST['descripcion'];
            $id = $_POST['id'];

            $query = "UPDATE tareas SET nombre = '$nombre', descripcion = '$descripcion' WHERE id = '$id'";
            $resultado = mysqli_query($conexion,$query);

            if(!$resultado){
                die("Hubo problema en el query al querer actualizar una tarea, " . mysqli_error($conexion));
            }

            echo "Tarea Actualizada correctamente"; 

        }
    }

?>