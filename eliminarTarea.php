<?php

    include('database.php');

    if(isset($_POST['id'])){
        $id = $_POST['id'];

        $query = "DELETE FROM tareas WHERE id = '$id' ";
        $resultado = mysqli_query($conexion,$query);

        if(!$resultado){
            die("Hubo problema al query al querer eliminar una tarea, " . mysqli_error($conexion));
        }

        echo "Tarea eliminada correctamente";

    }

    

?>