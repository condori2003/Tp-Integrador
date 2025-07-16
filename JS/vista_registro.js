const form = document.getElementById('registrationForm');
const nombre = document.getElementById('nombre');
const apellido = document.getElementById('apellido');
const email = document.getElementById('email');
const usuario = document.getElementById('usuario');
const contrasena = document.getElementById('contrasena');
const repetirContrasena = document.getElementById('repetir-contrasena');
const numeroTarjeta = document.getElementById('numero-tarjeta');
const codigoTarjeta = document.getElementById('codigo-tarjeta');
const pagoFacil = document.getElementById('pago-facil');
const rapiPago = document.getElementById('rapi-pago');
const confirmarBtn = document.getElementById('confirmar');
const cancelarBtn = document.getElementById('cancelar');

// Limitar input del código de tarjeta a solo números y máximo 3 dígitos
codigoTarjeta.addEventListener('input', function () {
  // Reemplazar todo lo que no sea número
  this.value = this.value.replace(/\D/g, '');

  // Cortar si se excede de 3 caracteres
  if (this.value.length > 3) {
    this.value = this.value.slice(0, 3);
  }
  document.getElementById('error-numero-tarjeta').textContent = "";
});

// Limitar input de número de tarjeta a 16 dígitos numéricos
numeroTarjeta.addEventListener('input', function () {
  this.value = this.value.replace(/\D/g, '');

  const error = document.getElementById('error-numero-tarjeta');
  if (this.value.length > 16) {
    this.value = this.value.slice(0, 16);
    error.textContent = "Solo se permiten hasta 16 dígitos.";
  } else {
    error.textContent = "";
  }
});

// Limitar input de pago
pagoFacil.addEventListener('change', () => {
  if (pagoFacil.checked) rapiPago.checked = false 
  document.getElementById('error-cupon').textContent = "";
});

rapiPago.addEventListener('change', () => {
  if (rapiPago.checked) pagoFacil.checked = false
  document.getElementById('error-cupon').textContent = "";

});


// Validaciones regex
function soloLetras(valor) {
  return /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/.test(valor);
}
function soloLetrasYNumeros(valor) {
  return /^[A-Za-z0-9]+$/.test(valor);
}
function esEmail(valor) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor);
}
function validarContrasena(valor) {
  const letras = valor.match(/[A-Za-z]/g) || [];
  const numeros = valor.match(/[0-9]/g) || [];
  const especiales = valor.match(/[^A-Za-z0-9]/g) || [];
  return valor.length >= 8 && letras.length >= 2 && numeros.length >= 2 && especiales.length >= 2;
}
function validarCodigoTarjeta(valor) {
  return /^[0-9]{3}$/.test(valor) && valor !== "000";
}
function validarNumeroTarjeta(valor) {
  if (!(/^\d{16}$/.test(valor))) 
    return false;
  const numeros = valor.split('').map(Number);
  const suma = numeros.slice(0, 15).reduce((a, b) => a + b, 0);
  const ultimo = numeros[15];
  // Si suma es impar, último debe ser par. Si suma es par, último debe ser impar.
  return (suma % 2 === 0 && ultimo % 2 === 1) || (suma % 2 === 1 && ultimo % 2 === 0);
}

// Mostrar/ocultar campos de pago según método
function mostrarCamposPago() {
  document.getElementById('debito-fields').style.display = document.getElementById('debito').checked ? 'block' : 'none';
  document.getElementById('cupon-fields').style.display = document.getElementById('cupon').checked ? 'flex' : 'none';
  document.getElementById('transferencia-fields').style.display = document.getElementById('transferencia').checked ? 'flex' : 'none';
}
['debito', 'cupon', 'transferencia'].forEach(id => {
  document.getElementById(id).addEventListener('change', mostrarCamposPago);
});
window.addEventListener('DOMContentLoaded', mostrarCamposPago);

// Validar campos y mostrar mensajes de error
function validarCampos() {
  let valido = true;

  // Nombre
  if (nombre.value.trim() === "") {
    document.getElementById('error-nombre').textContent = "El nombre es obligatorio.";
    valido = false;
  } else if (!soloLetras(nombre.value)) {
    document.getElementById('error-nombre').textContent = "El nombre solo puede contener letras.";
    valido = false;
  } else {
    document.getElementById('error-nombre').textContent = "";
  }

  // Apellido
  if (apellido.value.trim() === "") {
    document.getElementById('error-apellido').textContent = "El apellido es obligatorio.";
    valido = false;
  } else if (!soloLetras(apellido.value)) {
    document.getElementById('error-apellido').textContent = "El apellido solo puede contener letras.";
    valido = false;
  } else {
    document.getElementById('error-apellido').textContent = "";
  }

  // Email
  if (email.value.trim() === "") {
    document.getElementById('error-email').textContent = "El email es obligatorio.";
    valido = false;
  } else if (!esEmail(email.value)) {
    document.getElementById('error-email').textContent = "El formato del email es inválido.";
    valido = false;
  } else {
    document.getElementById('error-email').textContent = "";
  }

  // Usuario
  if (usuario.value.trim() === "") {
    document.getElementById('error-usuario').textContent = "El usuario es obligatorio.";
    valido = false;
  } else if (!soloLetrasYNumeros(usuario.value)) {
    document.getElementById('error-usuario').textContent = "El usuario solo puede contener letras y números.";
    valido = false;
  } else {
    document.getElementById('error-usuario').textContent = "";
  }

  // Contraseña
  if (contrasena.value.trim() === "") {
    document.getElementById('error-contrasena').textContent = "La contraseña es obligatoria.";
    valido = false;
  } else if (!validarContrasena(contrasena.value)) {
    document.getElementById('error-contrasena').textContent = "Debe tener al menos 8 caracteres, 2 letras, 2 números y 2 caracteres especiales.";
    valido = false;
  } else {
    document.getElementById('error-contrasena').textContent = "";
  }

  // Repetir contraseña
  if (repetirContrasena.value.trim() === "") {
    document.getElementById('error-repetir-contrasena').textContent = "Debes repetir la contraseña.";
    valido = false;
  } else if (contrasena.value !== repetirContrasena.value) {
    document.getElementById('error-repetir-contrasena').textContent = "Las contraseñas no coinciden.";
    valido = false;
  } else {
    document.getElementById('error-repetir-contrasena').textContent = "";
  }

  // Método de pago: solo validar si está seleccionado débito
  const debito = document.getElementById('debito').checked;
  const cupon = document.getElementById('cupon').checked;
  const transferencia = document.getElementById('transferencia').checked;

  // Validar campos de pago
  if (debito===false && cupon===false && transferencia===false) {
    valido = false;
    document.getElementById('error-metodo-pago').textContent = "Debe seleccionar al menos un método de pago.";  
  }
  // Validar campos de pago debito
  if (debito === true) {
    document.getElementById('error-metodo-pago').textContent = "";
    document.getElementById('error-cupon').textContent = "";
    if (numeroTarjeta.value.trim() === "") {
      document.getElementById('error-numero-tarjeta').textContent = "El número de tarjeta es obligatorio.";
      valido = false;
    } else if (!validarNumeroTarjeta(numeroTarjeta.value)) {
      document.getElementById('error-numero-tarjeta').textContent = "Número inválido: deben ser 16 dígitos y cumplir la regla de suma y paridad.";
      valido = false;
    } else {
      document.getElementById('error-numero-tarjeta').textContent = "";
    }
    if (codigoTarjeta.value.trim() === "") {
      document.getElementById('error-codigo-tarjeta').textContent = "La clave es obligatoria.";
      valido = false;
    } else if (!validarCodigoTarjeta(codigoTarjeta.value)) {
      document.getElementById('error-codigo-tarjeta').textContent = "Clave inválida: deben ser 3 dígitos y no puede ser 000.";
      valido = false;
    } else {
      document.getElementById('error-codigo-tarjeta').textContent = "";
    }
  }
  // Validar campos de pago cupon
  if (cupon === true) {
    document.getElementById('error-metodo-pago').textContent = "";
    document.getElementById('error-codigo-tarjeta').textContent = "";
    document.getElementById('error-numero-tarjeta').textContent = "";
    if (pagoFacil.checked === false && rapiPago.checked === false) {
      valido = false;
      document.getElementById('error-cupon').textContent = "Debe seleccionar al menos un método de pago.";
    }

  }
  if (transferencia === true) {
    document.getElementById('error-metodo-pago').textContent = "";
    document.getElementById('error-numero-tarjeta').textContent = "";
    document.getElementById('error-codigo-tarjeta').textContent = "";
    document.getElementById('error-cupon').textContent = "";
  }

  // Habilitar o deshabilitar el botón
  confirmarBtn.disabled = !valido;
  return valido;
}

// Validar en cada input en tiempo real
[nombre, apellido, email, usuario, contrasena, repetirContrasena, numeroTarjeta, codigoTarjeta, pagoFacil, rapiPago].forEach(input => {
  input.addEventListener('input', validarCampos);
});
['debito', 'cupon', 'transferencia'].forEach(id => {
  document.getElementById(id).addEventListener('change', validarCampos);
});

// Guardar usuario al confirmar
form.addEventListener('submit', function(e) {
  e.preventDefault();
  if (validarCampos()) {
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    if (usuarios.find(u => u.usuario === usuario.value || email.value === u.email)) return alert('Ya existe un usuario con ese email o nombre de usuario.');
    // Guardar datos del usuario
    let metodoPago = document.getElementById('debito').checked ? 'tarjeta' : document.getElementById('cupon').checked ? 'cupón' : 'transferencia';
    let tipoCupon = document.getElementById('pago-facil').checked ? 'pagoFacil' : document.getElementById('rapi-pago').checked ? 'rapiPago' : null;
    // let numeroTarjetaFinal = document.getElementById('debito').checked ? numeroTarjeta.value + " - " + codigoTarjeta.value : null;
    let numeroTarjetaFinal = document.getElementById('debito').checked ? numeroTarjeta.value + " - " + codigoTarjeta.value : null;
    usuarios.push({
      usuario: usuario.value,
      password: contrasena.value,
      email: email.value,
      nombre: nombre.value,
      apellido: apellido.value,
      metodoPago: metodoPago,
      numeroTarjeta: numeroTarjetaFinal,
      tipoCupon: tipoCupon
    });
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    window.location.href = "index.html"; // Redirige al login
  }
});

// Cancelar
cancelarBtn.addEventListener('click', function() {
  window.location.href = "index.html";
});