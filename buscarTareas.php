<?php
    include('database.php');

    $search = $_POST['search'];

    // echo "<br>Lo que muestra el POST es: " . $_POST['search'];

    // $result;

    if(!empty($search)){
        $query = "SELECT * FROM tareas WHERE nombre LIKE '$search%' ";
        $result = mysqli_query($conexion, $query);

        if(!$result){
            die('Error en el Query, al querer buscar una o varias tareas, ' . mysqli_error($conexion));
        }

        $json = array();

        while($row = mysqli_fetch_array($result)){
            $json[] = array(
                    // no importa la declaracion de los atributos de la tabla
                'id' => $row['id'],
                'nombre' => $row['nombre'],
                'descripcion' => $row['descripcion']
                
            );
        }

        $jsonstring = json_encode($json);

        echo $jsonstring;

    }
    else{
        $json = array();
        $jsonstring = json_encode($json);

        echo $jsonstring;
    }
?>