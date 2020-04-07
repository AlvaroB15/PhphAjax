<?php
    
    include('database.php');

    if(isset($_POST['nombre']) and isset($_POST['descripcion'])){
        
        $nombre = $_POST['nombre'];
        $descripcion = $_POST['descripcion'];

        if(!empty($nombre) and !empty($descripcion)){

            $query = "INSERT INTO tareas(nombre,descripcion) VALUES ('$nombre','$descripcion')";
            $resultado = mysqli_query($conexion,$query);

            if(!$resultado){
                die("Error en el Query para agregar una tarea, " . mysqli_error($conexion));
            }

            echo "Inserccion correctamente";
        }
    }
    



?>
