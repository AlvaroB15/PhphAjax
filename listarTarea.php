<?php

    include('database.php');

    $query = "SELECT * FROM tareas";
    $resultado = mysqli_query($conexion,$query);

    if(!$resultado){
        die("Error en el Query al querer listar las tareas, " . mysqli_error($conexion));
    }

    $json = array();
    
    while($row = mysqli_fetch_array($resultado)){
        $json[] = array(
            'descripcion'   => $row['descripcion'],
            'id'            => $row['id'],
            'nombre'        => $row['nombre']
        );
    }

    $jsonstring = json_encode($json);
    echo $jsonstring;
?>