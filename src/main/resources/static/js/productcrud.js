function validatesesion() {
    let user = sessionStorage.getItem("user");
    let userJS = JSON.parse(user);
    if(user == null) {
        location.href = "index.html"; 
    } else{
        $("#nameuser").html(userJS.name);
        loadProducts();
    }    
}

function loadProducts() {
    //Petición Ajax
    $.ajax({
        url: "http://" + server + "/api/chocolate/all",
        type: 'GET',
        dataType: 'json',

        success: function (respuesta) {
            console.log(respuesta);
            listarRespuestaProductos(respuesta);
        },

        error: function (xhr, status) {
            console.log(status);
        }
    });
}

function listarRespuestaProductos(items) {
    var $tabla = $("#Tabla-Product");
    $tabla.html("");
    for (let i = 0; i < items.length; i++) {
        var $tr = $("<tr></tr>");
        $td = $(
            `<td><span class=\"referencia\">${items[i].reference}</span></td>
            <td><span class=\"categoria\">${items[i].category}</span></td>
            <td><span class=\"descripcion\">${items[i].description}</span></td>
            <td><span class=\"disponibilidad\">${items[i].availability}</span></td>
            <td><span class=\"precio\">${items[i].price}</span></td>
            <td><span class=\"cantidad\">${items[i].quantity}</span></td>
            <td><span class=\"foto\"></span>${items[i].photography}</td>            
            <td>
                <a href="createproduct.html?id=${items[i].reference}"><i class="nav-icon fas fa-edit"></i></a>
                <a href="#" onclick="borrarProducto('${items[i].reference}')"><i class="nav-icon fas fa-trash"></i></a>
            </td>`);
        $tr.append($td);
        $tabla.append($tr);
    }

}

function borrarProducto(id) {
    $.ajax({
        url:"http://" + server + ":8080/api/chocolate/"+id,
        type:'DELETE',
        contentType:"application/JSON",

        success:function(respuesta){
            console.log("Eliminado");
            alert("Producto eliminado correctamente");
            loadProducts();
        },

        error:function(xhr, status){
            console.log(status);
            alert("Error eliminando producto");
        }
    });
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

function validateupdate(){
    const valores = window.location.search;
    const urlParams = new URLSearchParams(valores);

    var idproducto = urlParams.get('id');

    if(idproducto != null) {
        $.ajax({
            url:"http://" + server + ":8080/api/chocolate/"+idproducto,
            type:'GET',
            contentType:"application/JSON",

            success:function(respuesta){
                loadProducto(respuesta);
            },

            error:function(xhr, status){
                console.log(status);
            }
        });
    }else{
        $("#btn-create").show();
        $("#btn-update").hide();
    }
}

function loadProducto(producto) {
    $("#reference").val(producto.reference);
    $("#category").val(producto.category);
    $("#description").val(producto.description);
    $("#availability").val(producto.availability);
    $("#price").val(producto.price);
    $("#quantity").val(producto.quantity);
    $("#photography").val(producto.photography);

    $("#btn-create").hide();
    $("#btn-update").show();
}

function validateUpdateProduct() {
    $.validator.setDefaults({
        submitHandler: function () {
            updateProducto();
        }
    });
    $('#loginForm').validate({
        rules: {
            reference: {
                required: true,
            },
            category: {
                required: true,
            },
            description: {
                required: true,
            },
            availability: {
                required: true,
            },
            price: {
                required: true,
            },
            quantity: {
                required: true,
            },
            photography: {
                required: true,
            },
        },
        messages: {
            reference: {
                required: "Referencia es requerido",
            },
            category: {
                required: "Categoria es requerido",
            },
            description: {
                required: "descripción es requerido",
            },
            availability: {
                required: "Disponibilidad es requerido",
            },
            price: {
                required: "Precio es requrido",                
            },
            quantity: {
                required: "Cantidad es requerido",
            },
            photography: {
                required: "Fotografia es requerido",
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


function updateProducto() {
    var datos={
        reference:$("#reference").val(),
        category:$("#category").val(),
        description:$("#description").val(),
        availability:$("#availability").val(),
        price:$("#price").val(),
        quantity:$("#quantity").val(),
        photography:$("#photography").val()
    }
    //Convertir a JSON
    let datosPeticion=JSON.stringify(datos);

    //Petición Ajax
    $.ajax({
        url:"http://" + server + ":8080/api/chocolate/update",
        data:datosPeticion,
        type:'PUT',
        contentType:"application/JSON",

        success:function(respuesta){
            console.log("Actualizado");
            alert("Producto actualizado correctamente!");
        },

        error:function(xhr, status){
            console.log(status);
            alert("Error actualizando producto");
        }
    });

}

function validateProduct() {
    $.validator.setDefaults({
        submitHandler: function () {
            crearProducto();
        }
    });
    $('#loginForm').validate({
        rules: {
            reference: {
                required: true,
            },
            category: {
                required: true,
            },
            description: {
                required: true,
            },
            availability: {
                required: true,
            },
            price: {
                required: true,
            },
            quantity: {
                required: true,
            },
            photography: {
                required: true,
            },
        },
        messages: {
            reference: {
                required: "Referencia es requerido",
            },
            category: {
                required: "Categoria es requerido",
            },
            description: {
                required: "descripción es requerido",
            },
            availability: {
                required: "Disponibilidad es requerido",
            },
            price: {
                required: "Precio es requrido",                
            },
            quantity: {
                required: "Cantidad es requerido",
            },
            photography: {
                required: "Fotografia es requerido",
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

function crearProducto() {
        //Capturar valores de los campos del documento html en
        var datos={
            reference:$("#reference").val(),
            category:$("#category").val(),
            description:$("#description").val(),
            availability:$("#availability").val(),
            price:$("#price").val(),
            quantity:$("#quantity").val(),
            photography:$("#photography").val()
        }
        //Convertir a JSON
        let datosPeticion=JSON.stringify(datos);
    
        //Petición Ajax
        $.ajax({
            url:"http://" + server + ":8080/api/chocolate/new",
            data:datosPeticion,
            type:'POST',
            contentType:"application/JSON",
    
            success:function(respuesta){
                console.log("Insertado");
                alert("Producto creado correctamente!");
            },
    
            error:function(xhr, status){
                console.log(status);
                alert("Error creando producto");
            }
        });
}

function cerrarsesion() {
    sessionStorage.removeItem("user");
    location.href = "index.html";
}