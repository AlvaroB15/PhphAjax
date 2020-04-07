$(document).ready(function () {
    // console.log("Estoy en JS");
    // console.log("JQuery esta trabajando");

    let bandera = false;

    $('#task-result').hide();

    mostrarTareas();


    // Como veremos a continuacion, podemos llamar por JQuery y esperar un evento y que suceda determinada funcion, o podemos de frente cargar una "funcion"
    // ni bien iniciado el js, entonces eso siempre estar actualizandose


    // Hacemos JQuery para el elemento con el id 'search'
    $('#search').keyup(function (e) {

        if ($('#search').val()) {
            let search = $('#search').val();

            $.ajax({

                url: 'buscarTareas.php',
                type: 'POST',
                data: { search }, // al poner  {search} es equivalente a {search:search}
                success: function (response) {
                    // console.log(response);

                    // para convertir el string, recibido por el servidor, a JSON, pero cabe recordar que ese objeto si comenzo como un JSON y se convirtio en String, ahora se devuelve a su estado original , que fue JSON
                    let rptas = JSON.parse(response);
                    let template = "";
                    // Por ahora no distingue minuscula y mayusculas

                    rptas.forEach(rpta => {
                        // console.log(rpta);
                        template += `<li>${rpta.nombre}</li>`
                    });

                    $('#container').html(template);
                    $('#task-result').show();
                }
            });

        }
        else{
            $('#task-result').hide();
        }
    });

    // Hacemos JQuery para el elemento con el id 'task-form'
    $('#task-form').submit(function(e){
        
        // Mandaremos un objeto , donde pongamos los atributos necesarios para luego pasarlo al servidor y que ese lo inserte en el db
        const datosEnviar = {
            nombre: $('#name').val(),
            descripcion: $('#description').val(),
            id : $('#idOculto').val()
        };

        let url = bandera === false ? 'agregarTarea.php' : 'actualizarTareas.php'
        console.log(url);

        $.post(url, datosEnviar, function(response){
            // Esto esta mal, ya que parece como si hubiese hecho algo, lo cual no es asi solo estas
            // diciendo que se escriba algo, por lo tanto en la consola se debe escibir la respuesta que te da el servidor por medio del php, eso debe ser el response
            // console.log('Tarea Agregada correctamente')

            // Nos mostrara el response (respuesta), por medio de la consola
            console.log(response);
            // mostrarTareas();

            // $('#task-form').trigger('reset');
        });
        // console.log();

        // esto se puede poner en cualquier lado, pero eso si luego de haber mandado la peticion al servidor

        mostrarTareas();


        $('#task-form').trigger('reset');
        e.preventDefault();
        
    });

    function mostrarTareas(){
        $.ajax({
            url: 'listarTarea.php',
            type: 'GET',
            success: function(response){
                // console.log(response);
    
                let rptas = JSON.parse(response);
                let template = '';
    
                rptas.forEach(rpta => {
                    template += `
                        <tr obtenerId="${rpta.id}">
                            <td>
                                <a href=# class="editar">${rpta.id}</a>
                            </td>
                            <td>
                                <a href=# class="editar">${rpta.nombre}</a>
                            </td>
                            <td>
                                <a href=# class="editar">${rpta.descripcion}</a>
                            </td>
                            <td>
                                <button class="tarea-eliminar btn btn-danger">
                                    Eliminar
                                </button>
                            </td>
                        </tr>`  
                });
    
                $('#tasks').html(template);
    
            }
        })
    };

    $(document).on('click','.tarea-eliminar', function(){
        // console.log('HICE CLICK');
        if(confirm("Esta seguro de eliminar esta tarea? ")){
            let element = $(this)[0].parentElement.parentElement;
            let id = $(element).attr('obtenerId');

            $.post('eliminarTarea.php', {id}, function(response){
            console.log(response);
            mostrarTareas();
        });
        }

        // console.log(id); 
    });

    $(document).on('click', '.editar', function(){
        let element = $(this)[0].parentElement.parentElement;
        let id = $(element).attr('obtenerId');

        // le mandamos al servidor para que se actualize
        $.post('mostrarEnCampos.php',{id}, function(response){
            
            let rpta = JSON.parse(response);

            console.log(rpta);

            $('#name').val(rpta.nombre);
            $('#description').val(rpta.descripcion);
            $('#idOculto').val(rpta.id);
            bandera = true;
        });
        
        // console.log("Editando");
    });

});