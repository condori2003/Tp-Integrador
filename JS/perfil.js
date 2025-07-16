const btnGuardar = document.getElementById('btn-guardar');
const contrasenaNueva = document.getElementById('contrasena-nueva');
const contrasenaRepetir = document.getElementById('contrasena-repetir');
const metodo = document.querySelector('input[name="payment"]:checked');
const tarjeta = document.getElementById('numero-tarjeta');
const clave = document.getElementById('clave-tarjeta');
const pagoFacil = document.getElementById('pago-facil');
const rapiPago = document.getElementById('rapi-pago');
const errorContrasena = document.getElementById('error-contrasena');
const errorRepetirContrasena = document.getElementById('error-repetir-contrasena');
const errorMetodoPago = document.getElementById('error-metodo-pago');

document.querySelectorAll('input').forEach(input => {
  input.addEventListener('input', validarFormulario);
});

// Limitar input de pago
pagoFacil.addEventListener('change', () => {
  if (pagoFacil.checked) rapiPago.checked = false 
  document.getElementById('error-metodo-pago').textContent = "";
});

rapiPago.addEventListener('change', () => {
  if (rapiPago.checked) pagoFacil.checked = false
  document.getElementById('error-metodo-pago').textContent = "";

});

window.addEventListener('DOMContentLoaded', function() {
  const usuarioActivo = localStorage.getItem('usuarioActivo');
  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  const usuario = usuarios.find(u => u.usuario === usuarioActivo);

  //Limita el número de digitos de tarjeta
  document.getElementById('numero-tarjeta').addEventListener('input', function() {
    this.value = this.value.replace(/\D/g, '');
    if (this.value.length > 16) {
      this.value = this.value.slice(0, 16);
    }
  }); 
  //Limita el número de digitos de clave
  document.getElementById('clave-tarjeta').addEventListener('input', function() {
    this.value = this.value.replace(/\D/g, '');
    if (this.value.length > 3) {
      this.value = this.value.slice(0, 3);
    } 
  });

  // Mostrar info del usuario
  if (!usuario) {
    document.getElementById('info-user').textContent = "No hay usuario logueado";
    document.getElementById('info-email').textContent = "";
    return;
  }
  document.getElementById('info-user').textContent =  usuario.usuario;
  document.getElementById('info-email').textContent = usuario.email;

  // Mostrar información de pago
  if (usuario.metodoPago === "tarjeta") {
    document.getElementById('informacionDePago').textContent = "Pago con tarjeta " + usuario.numeroTarjeta;
  } else if (usuario.metodoPago === "cupón") {
    document.getElementById('informacionDePago').textContent = "Pago con cupón de " + usuario.tipoCupon;
  } else if (usuario.metodoPago === "transferencia") {
    document.getElementById('informacionDePago').textContent = "Pago con transferencia bancaria";
  }

  // Mostrar/ocultar campos de pago según método
  mostrarCamposPago();
  validarFormulario();
});





// Mostrar/ocultar campos de pago según método
function mostrarCamposPago() {
  document.getElementById('debito-fields').style.display = document.getElementById('debito').checked ? 'block' : 'none';
  document.getElementById('cupon-fields').style.display = document.getElementById('cupon').checked ? 'flex' : 'none';
  document.getElementById('transferencia-fields').style.display = document.getElementById('transferencia').checked ? 'flex' : 'none';
}
['debito', 'cupon', 'transferencia'].forEach(id => {
  document.getElementById(id).addEventListener('change', mostrarCamposPago);
});

function validarFormulario() {
  const metodo = document.querySelector('input[name=\"payment\"]:checked');
  errorContrasena.textContent = "";
  errorRepetirContrasena.textContent = "";
  errorMetodoPago.textContent = "";
  let valido = true;
  // Validar contraseña nueva (OBLIGATORIO)
  if (!contrasenaNueva.value) {
    errorContrasena.textContent = "Debe ingresar la contraseña.";
    valido = false;
  }else if (!validarContrasena(contrasenaNueva.value)) {
    errorContrasena.textContent = "La contraseña debe tener mínimo 8 caracteres, 2 letras, 2 números y 2 caracteres especiales.";
    valido = false;
  }else if (contrasenaNueva.value !== contrasenaRepetir.value) {
    errorRepetirContrasena.textContent = "Las contraseñas no coinciden.";
    valido = false;
  }
  // Validar método de pago (OBLIGATORIO)
  if(!metodo) {
     errorMetodoPago.textContent = "Debes seleccionar un método de pago.";
     valido = false;
  }else if(metodo.value === "tarjeta") {
    if (!tarjeta.value || !clave.value) {
      errorMetodoPago.textContent = "Debe completar todos los campos de la tarjeta.";
      valido = false;
    } 
    else if  (!validarTarjeta(tarjeta.value, clave.value)) {
      errorMetodoPago.textContent = "Datos de tarjeta inválidos. Verifica el número y la clave.";
      valido = false;
    } 
  }else if (metodo.value === "cupon") {
      if (!pagoFacil.checked && !rapiPago.checked) {
        errorMetodoPago.textContent = "Debe ingresar el código de cupón.";
        valido = false;
      } 
  }

  btnGuardar.disabled = !valido;
  return valido;
}

function validarContrasena(valor) {
  const letras = valor.match(/[A-Za-z]/g) || [];
  const numeros = valor.match(/[0-9]/g) || [];
  const especiales = valor.match(/[^A-Za-z0-9]/g) || [];
  return valor.length >= 8 && letras.length >= 2 && numeros.length >= 2 && especiales.length >= 2;
}

function validarTarjeta(numero, clave) {
  if (!/^[0-9]{3}$/.test(clave) || clave === "000") return false;
  if (!/^\d{16}$/.test(numero)) return false;
  const numeros = numero.split('').map(Number);
  const suma = numeros.slice(0, 15).reduce((a, b) => a + b, 0);
  const ultimo = numeros[15];
  return (suma % 2 === 0 && ultimo % 2 === 1) || (suma % 2 === 1 && ultimo % 2 === 0);
}

// guardar
document.getElementById("btn-guardar").addEventListener("click", function (e) {
  e.preventDefault();
  
  // Validar el formulario antes de proceder
  if (validarFormulario()) {
    const usuarioActivo = localStorage.getItem('usuarioActivo');
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    
    // Encontrar el índice del usuario para poder actualizarlo
    const usuarioIndex = usuarios.findIndex(u => u.usuario === usuarioActivo);
    
    if (usuarioIndex === -1) {
      alert("No se encontró al usuario activo.");
      return;
    }

    const pass1 = document.getElementById('contrasena-nueva').value;
    const tarjeta = document.getElementById('numero-tarjeta')?.value || "";
    const clave = document.getElementById('clave-tarjeta')?.value || "";

    const debitoChecked = document.getElementById('debito').checked;
    const cuponChecked = document.getElementById('cupon').checked;
    const transferenciaChecked = document.getElementById('transferencia').checked;

    // Determinar el método de pago
    let metodoPago = '';
    if (debitoChecked) {
      metodoPago = 'tarjeta';
    } else if (cuponChecked) {
      metodoPago = 'cupón';
    } else if (transferenciaChecked) {
      metodoPago = 'transferencia';
    }

    const numeroTarjeta = debitoChecked ? `${tarjeta} - ${clave}` : null;

    const tipoCupon = document.getElementById('pago-facil').checked ? 'pagoFacil' :
                      document.getElementById('rapi-pago').checked ? 'rapiPago' : null;

    // Actualizar datos del usuario en el array
    usuarios[usuarioIndex].password = pass1;
    usuarios[usuarioIndex].metodoPago = metodoPago;
    usuarios[usuarioIndex].tipoCupon = tipoCupon;
    usuarios[usuarioIndex].numeroTarjeta = numeroTarjeta;

    // Corregido: Guardar el array completo de usuarios en localStorage
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("Datos actualizados correctamente.");
    window.location.href = 'vista_principal.html';
  } else {
    // Si la validación falla, mostrar mensaje de error
    alert("Por favor, complete correctamente todos los campos obligatorios.");
  }
});


//Cancelar subscripción
document.getElementById('btn-cancelar').addEventListener('click', function() {
  const usuarioActivo = localStorage.getItem('usuarioActivo');
  let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

  // Asegurate de tener definida la variable usuarioActivo
  usuarios = usuarios.filter(u => u.usuario !== usuarioActivo);

  // Guardar los usuarios actualizados sin el eliminado
  localStorage.setItem('usuarios', JSON.stringify(usuarios));

  // Opcional: limpiar también la variable de sesión si usás sessionStorage o localStorage
  localStorage.removeItem('usuarioActivo');

  // Redirigir al inicio
  window.location.href = 'index.html';
});
