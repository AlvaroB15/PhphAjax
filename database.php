<?php

    $conexion = mysqli_connect(
        'localhost:3306',
        'root',
        'root',
        'tareasPhpAjax'
        // '3306'
        // 'tareas-php-ajax'
        // '3308'
    );

    if($conexion){
        // echo "Base de Datos SI conectada";
    }

    else{
        // echo "Base  de Datos NO conectada";
    }

?>