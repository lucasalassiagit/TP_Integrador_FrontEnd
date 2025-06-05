document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Limpiar errores previos
    clearErrors();

    // Validar campos
    const isNombreValid = validateNombre();
    const isEmailValid = validateEmail();
    const isTelefonoValid = validateTelefono();
    const isFechaValid = validateFecha();
    const isTerminosValid = validateTerminos();

    // Si todo es válido, enviar formulario
    if (
      isNombreValid &&
      isEmailValid &&
      isTelefonoValid &&
      isFechaValid &&
      isTerminosValid
    ) {
      // Aquí iría el código para enviar el formulario
      console.log("Formulario válido, enviando...");
      form.reset();
      alert("Formulario enviado con éxito");
    }
  });

  // Funciones de validación
  function validateNombre() {
    const nombre = document.getElementById("nombre").value.trim();
    const errorElement = document.getElementById("nombreError");

    if (nombre === "") {
      showError("nombre", "El nombre es obligatorio");
      return false;
    }

    if (nombre.length < 3) {
      showError("nombre", "Mínimo 3 caracteres");
      return false;
    }

    return true;
  }

  function validateEmail() {
    const email = document.getElementById("email").value.trim();
    const errorElement = document.getElementById("emailError");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === "") {
      showError("email", "El email es obligatorio");
      return false;
    }

    if (!emailRegex.test(email)) {
      showError("email", "Email no válido");
      return false;
    }

    return true;
  }

  function validateTelefono() {
    const telefono = document.getElementById("telefono").value.trim();
    const errorElement = document.getElementById("telefonoError");
    const telefonoRegex = /^\d{8,15}$/;

    if (telefono === "") {
      showError("telefono", "El teléfono es obligatorio");
      return false;
    }

    if (!telefonoRegex.test(telefono)) {
      showError("telefono", "8-15 dígitos numéricos");
      return false;
    }

    return true;
  }

  function validateFecha() {
    const fechaInput = document.getElementById("fecha");
    const fecha = fechaInput.value;
    const errorElement = document.getElementById("fechaError");
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    if (fecha === "") {
      showError("fecha", "La fecha es obligatoria");
      return false;
    }

    const fechaNac = new Date(fecha);
    const minDate = new Date();
    minDate.setFullYear(hoy.getFullYear() - 120); // 120 años máximo

    if (fechaNac > hoy) {
      showError("fecha", "Fecha no puede ser futura");
      return false;
    }

    if (fechaNac < minDate) {
      showError("fecha", "Edad no válida");
      return false;
    }

    return true;
  }

  function validateTerminos() {
    const terminos = document.getElementById("terminos");
    const errorElement = document.getElementById("terminosError");

    if (!terminos.checked) {
      showError("terminos", "Debes aceptar los términos");
      return false;
    }

    return true;
  }

  // Helper functions
  function showError(fieldId, message) {
    const errorElement = document.getElementById(`${fieldId}Error`);
    const inputElement = document.getElementById(fieldId);

    if (errorElement) {
      errorElement.textContent = message;
      errorElement.style.display = "block";
      errorElement.style.color = "#dc3545";
      errorElement.style.fontSize = "0.875rem";
      errorElement.style.marginTop = "0.25rem";
    }

    if (inputElement) {
      inputElement.style.borderColor = "#dc3545";
    }
  }

  function clearErrors() {
    // Limpiar mensajes de error
    const errorMessages = document.querySelectorAll(".error-message");
    errorMessages.forEach((error) => {
      error.textContent = "";
      error.style.display = "none";
    });

    // Restaurar estilos de los inputs
    const inputs = document.querySelectorAll("input, select, textarea");
    inputs.forEach((input) => {
      input.style.borderColor = "";
    });
  }

  // Validación en tiempo real (opcional)
  document.getElementById("nombre").addEventListener("blur", validateNombre);
  document.getElementById("email").addEventListener("blur", validateEmail);
  document
    .getElementById("telefono")
    .addEventListener("blur", validateTelefono);
  document.getElementById("fecha").addEventListener("change", validateFecha);
  document.getElementById("terminos").addEventListener("change", function () {
    if (this.checked) {
      document.getElementById("terminosError").textContent = "";
    }
  });
});
