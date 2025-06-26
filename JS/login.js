let usuariosRegistrados=[];

if(localStorage.getItem("listasDeUsuarios")!=null){
    usuariosRegistrados=JSON.parse(localStorage.getItem("listasDeUsuarios"));
}

const usuarioInput = document.getElementById('usuario');
const contrasenaInput = document.getElementById('contrasena');
const btnLogin = document.getElementById('btnLogin');

 // Función para validar campos y habilitar/deshabilitar botón
function validateFields() {
    const username = usuarioInput.value.trim();
    const password = contrasenaInput.value.trim();
    //.trim() elimina espacios en blanco al principio y final
    if (username && password) {
        btnLogin.disabled = false;
    } else {
        btnLogin.disabled = true;
    }
}

 // Event listeners para validación en tiempo real
usuarioInput.addEventListener('input', validateFields);
contrasenaInput.addEventListener('input', validateFields);

// Función para validar usuario
function validateUser(username, password) {
    return usuariosRegistrados.some(user => 
        user.username === username && user.password === password
    );
}


function login(usuario,password){
    let usuarios=usuariosRegistrados;
    if(usuarios.includes(usuario)){
        if(usuarios[usuario]==password){
            localStorage.setItem("usuario",usuario);
            localStorage.setItem("password",password);
            window.location.href="index.html";
        }else{
            alert("Contraseña incorrecta");
        }
    }else{
        alert("Usuario no registrado");
    }
}
