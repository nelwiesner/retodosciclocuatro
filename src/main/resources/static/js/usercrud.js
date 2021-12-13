function validate() {
    $.validator.setDefaults({
        submitHandler: function () {
            login();
        }
    });
    $('#loginForm').validate({
        rules: {
            email: {
                required: true,
                email: true,
            },
            password: {
                required: true,
            },
        },
        messages: {
            email: {
                required: "Email es requerido",
                email: "Formato de email invalido"
            },
            password: {
                required: "Password es requerido"
            },
        },
        errorElement: 'span',
        errorPlacement: function (error, element) {
            error.addClass('invalid-feedback');
            element.closest('.form-group').append(error);
        },
        highlight: function (element, errorClass, validClass) {
            $(element).addClass('is-invalid');
        },
        unhighlight: function (element, errorClass, validClass) {
            $(element).removeClass('is-invalid');
        }
    });

}

function validateUser() {
    $.validator.setDefaults({
        submitHandler: function () {
            var password = $("#password").val();
            var repeatPassword = $("#repeatPassword").val();

            if(password!= repeatPassword){
                alert("Contraseñas no coinciden");
            }else{            
                emailExist();
            }
        }
    });
    $('#loginForm').validate({
        rules: {
            identificacion: {
                required: true,
            },
            nombre: {
                required: true,
            },
            direccion: {
                required: true,
            },
            celular: {
                required: true,
            },
            email: {
                required: true,
                email: true,
            },
            password: {
                required: true,
            },
            repeatPassword: {
                required: true,
            },
            zona: {
                required: true,
            },
        },
        messages: {
            identificacion: {
                required: "Identificación es requerido",
            },
            nombre: {
                required: "Nombre es requerido",
            },
            direccion: {
                required: "Dirección es requerido",
            },
            celular: {
                required: "Telefono es requerido",
            },
            email: {
                required: "Email es requerido",
                email: "Formato de email invalido"
            },
            password: {
                required: "Contraseña es requerido"
            },
            repeatPassword: {
                required: "Repetir contraseña es requerido",
            },
            zona: {
                required: "Zona es requerido",
            },
        },
        errorElement: 'span',
        errorPlacement: function (error, element) {
            error.addClass('invalid-feedback');
            element.closest('.form-group').append(error);
        },
        highlight: function (element, errorClass, validClass) {
            $(element).addClass('is-invalid');
        },
        unhighlight: function (element, errorClass, validClass) {
            $(element).removeClass('is-invalid');
        }
    });

}

function validateUpdateUser() {
    $.validator.setDefaults({
        submitHandler: function () {
            var password = $("#password").val();
            var repeatPassword = $("#repeatPassword").val();

            if(password!= repeatPassword){
                alert("Contraseñas no coinciden");
            }else{            
                updateUsuario();
            }            
        }
    });
    $('#loginForm').validate({
        rules: {
            identificacion: {
                required: true,
            },
            nombre: {
                required: true,
            },
            direccion: {
                required: true,
            },
            celular: {
                required: true,
            },
            email: {
                required: true,
                email: true,
            },
            password: {
                required: true,
            },
            repeatPassword: {
                required: true,
            },
            zona: {
                required: true,
            },
        },
        messages: {
            identificacion: {
                required: "Identificación es requerido",
            },
            nombre: {
                required: "Nombre es requerido",
            },
            direccion: {
                required: "Dirección es requerido",
            },
            celular: {
                required: "Telefono es requerido",
            },
            email: {
                required: "Email es requerido",
                email: "Formato de email invalido"
            },
            password: {
                required: "Password es requerido"
            },
            repeatPassword: {
                required: "Repetir contraseña es requerido",
            },
            zona: {
                required: "Zona es requerido",
            },
        },
        errorElement: 'span',
        errorPlacement: function (error, element) {
            error.addClass('invalid-feedback');
            element.closest('.form-group').append(error);
        },
        highlight: function (element, errorClass, validClass) {
            $(element).addClass('is-invalid');
        },
        unhighlight: function (element, errorClass, validClass) {
            $(element).removeClass('is-invalid');
        }
    });

}

function login() {
    var correo = $("#email").val();
    var contrasena = $("#password").val();
    //Petición Ajax
    $.ajax({
        url: "http://" + server + "/api/user/" + correo + "/" + contrasena,
        type: 'GET',
        dataType: 'json',

        success: function (respuesta) {
            console.log(respuesta);
            userExist(respuesta);
        },

        error: function (xhr, status) {
            console.log(status);
        }
    });
}

function userExist(respuesta) {
    var nombre = respuesta.name;
    if (nombre == "none") {
        alert("No existe un usuario");
    } else {
        //crea objeto javascript que contiene la información del usuario
        let userJS ={
            id:respuesta.id,
            identification: respuesta.identification,
            name:respuesta.name,
            address:respuesta.address,
            cellPhone:respuesta.cellPhone,
            email:respuesta.email,
            password:respuesta.password,
            zone:respuesta.zone,
            type:respuesta.type
        };

        //transforma el objeto javascript a json antes de guardarlo en el sessionStorage
        let user = JSON.stringify(userJS);

        //almacena el usuario en el sessionStorage, para hacerlo disponible a las otras páginas
        sessionStorage.setItem("user",user);
        
        if(respuesta.type == "ADM"){
            location.href ="users.html";
            $("#nameuser").html(respuesta.name);
        }else{
            alert("Bienvenido "+nombre);
        }
    }
}

function validatesesion() {
    let user = sessionStorage.getItem("user");
    let userJS = JSON.parse(user);
    if(user == null) {
        location.href = "index.html"; 
    } else{
        $("#nameuser").html(userJS.name);
        loadUsers();
    }    
}

function validatesesionupdate() {
    let user = sessionStorage.getItem("user");
    let userJS = JSON.parse(user);
    if(user == null) {
        location.href = "index.html"; 
    } else{
        $("#nameuser").html(userJS.name);
        validateupdate();
    }    
}

function loadUsers() {
    //Petición Ajax
    $.ajax({
        url: "http://" + server + "/api/user/all",
        type: 'GET',
        dataType: 'json',

        success: function (respuesta) {
            console.log(respuesta);
            listarRespuestaUsuarios(respuesta);
        },

        error: function (xhr, status) {
            console.log(status);
        }
    });
}

function emailExist() {
    var email = $("#email").val();

    $.ajax({
        url: "http://" + server + "/api/user/emailexist/"+email,
        type: 'GET',
        dataType: 'json',

        success: function (respuesta) {
            console.log(respuesta);
            if(respuesta){
                alert("Email ya existe en el sistema");
            }
            else{
                crearUsuario();
            }
        },

        error: function (xhr, status) {
            console.log(status);
        }
    });
}

function listarRespuestaUsuarios(items) {
    var $tabla = $("#Tabla-Users");
    $tabla.html("");
    for (let i = 0; i < items.length; i++) {
        var $tr = $("<tr></tr>");
        $td = $(
            `<td><span class=\"id\">${items[i].id}</span></td>
            <td><span class=\"identificación\">${items[i].identification}</span></td>
            <td><span class=\"nombre\">${items[i].name}</span></td>
            <td><span class=\"direccion\">${items[i].address}</span></td>
            <td><span class=\"celular\">${items[i].cellPhone}</span></td>
            <td><span class=\"email\">${items[i].email}</span></td>
            <td><span class=\"zona\"></span>${items[i].zone}</td>
            <td><span class=\"tipo\"></span>${items[i].type}</td>
            <td>
                <a href="createusers.html?id=${items[i].id}"><i class="nav-icon fas fa-edit"></i></a>
                <a href="#" onclick="borrarUsuario(${items[i].id})"><i class="nav-icon fas fa-trash"></i></a>
            </td>`);
        $tr.append($td);
        $tabla.append($tr);
    }

}

function borrarUsuario(id) {
    $.ajax({
        url:"http://" + server + "/api/user/"+id,
        type:'DELETE',
        contentType:"application/JSON",

        success:function(respuesta){
            console.log("Eliminado");
            alert("Usuario eliminado correctamente");
            loadUsers();
        },

        error:function(xhr, status){
            console.log(status);
            alert("Error eliminando usuario");
        }
    });
}

function crearUsuario() {
    //Capturar valores de los campos del documento html en
    var datos={
        identification:$("#identificacion").val(),
        name:$("#nombre").val(),
        address:$("#direccion").val(),
        cellPhone:$("#celular").val(),
        email:$("#email").val(),
        password:$("#password").val(),
        zone:$("#zona").val(),
        type:$("#type").val(),
    }
    //Convertir a JSON
    let datosPeticion=JSON.stringify(datos);

    //Petición Ajax
    $.ajax({
        url:"http://" + server + "/api/user/new",
        data:datosPeticion,
        type:'POST',
        contentType:"application/JSON",

        success:function(respuesta){
            console.log("Insetado");
            alert("Usuario creado correctamente!");
        },

        error:function(xhr, status){
            console.log(status);
            alert("Error creando usuario");
        }
    });

}

function updateUsuario() {
    const valores = window.location.search;
    const urlParams = new URLSearchParams(valores);

    var idproducto = urlParams.get('id');
    //Capturar valores de los campos del documento html en
    var datos={
        id: idproducto,
        identification:$("#identificacion").val(),
        name:$("#nombre").val(),
        address:$("#direccion").val(),
        cellPhone:$("#celular").val(),
        email:$("#email").val(),
        password:$("#password").val(),
        zone:$("#zona").val(),
        type:$("#type").val(),
    }
    //Convertir a JSON
    let datosPeticion=JSON.stringify(datos);

    //Petición Ajax
    $.ajax({
        url:"http://" + server + "/api/user/all",
        data:datosPeticion,
        type:'PUT',
        contentType:"application/JSON",

        success:function(respuesta){
            console.log("Insetado");
            alert("Usuario actualizado correctamente!");
        },

        error:function(xhr, status){
            console.log(status);
            alert("Error actualizando usuario");
        }
    });

}


function validateupdate(){
    const valores = window.location.search;
    const urlParams = new URLSearchParams(valores);

    var idproducto = urlParams.get('id');

    if(idproducto != null) {
        $.ajax({
            url:"http://" + server + "/api/user/"+idproducto,
            type:'GET',
            contentType:"application/JSON",

            success:function(respuesta){
                loadUser(respuesta);
            },

            error:function(xhr, status){
                console.log(status);
                $("#btn-create").show();
                $("#btn-update").hide();
            }
        });
    }else{
        $("#btn-create").show();
        $("#btn-update").hide();
    }
}

function loadUser(usuario){
    $("#identificacion").val(usuario.identification);
    $("#nombre").val(usuario.name);
    $("#direccion").val(usuario.address);
    $("#celular").val(usuario.cellPhone);
    $("#email").val(usuario.email);
    $("#password").val(usuario.password);
    $("#repeatPassword").val(usuario.password);
    $("#zona").val(usuario.zone);
    $("#type").val(usuario.type);

    $("#btn-create").hide();
    $("#btn-update").show();
}

function cerrarsesion() {
    sessionStorage.removeItem("user");
    location.href = "index.html";
}