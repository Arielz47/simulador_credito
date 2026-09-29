// =============================================
// SIMULADOR DE CRÉDITO
// =============================================

const ingresosInput = document.getElementById("txtIngresos");
const egresosInput = document.getElementById("txtEgresos");
const montoInput = document.getElementById("txtMonto");
const plazoInput = document.getElementById("txtPlazo");
const tasaInput = document.getElementById("txtTasaInteres");


// =============================================
// MOSTRAR ERROR
// =============================================

function mostrarError(input, errorId, mensaje) {

    document.getElementById(errorId).textContent = mensaje;

    input.classList.add("input-error");
}


// =============================================
// LIMPIAR ERROR
// =============================================

function limpiarError(input, errorId) {

    document.getElementById(errorId).textContent = "";

    input.classList.remove("input-error");
}


// =============================================
// LIMPIAR TODOS LOS ERRORES
// =============================================

function limpiarErrores() {

    limpiarError(ingresosInput, "errorIngresos");
    limpiarError(egresosInput, "errorEgresos");
    limpiarError(montoInput, "errorMonto");
    limpiarError(plazoInput, "errorPlazo");
    limpiarError(tasaInput, "errorTasa");
}


// =============================================
// VALIDAR FORMULARIO
// =============================================

function validarFormulario() {

    limpiarErrores();

    let formularioValido = true;


    // -----------------------------
    // INGRESOS
    // -----------------------------

    const ingresos = parseFloat(ingresosInput.value);

    if (ingresosInput.value.trim() === "") {

        mostrarError(
            ingresosInput,
            "errorIngresos",
            "Los ingresos son obligatorios."
        );

        formularioValido = false;

    } else if (isNaN(ingresos)) {

        mostrarError(
            ingresosInput,
            "errorIngresos",
            "Ingrese un valor numérico válido."
        );

        formularioValido = false;

    } else if (ingresos <= 0) {

        mostrarError(
            ingresosInput,
            "errorIngresos",
            "Los ingresos deben ser mayores a USD 0."
        );

        formularioValido = false;

    } else if (ingresos > 100000) {

        mostrarError(
            ingresosInput,
            "errorIngresos",
            "El ingreso máximo permitido es USD 100,000."
        );

        formularioValido = false;
    }


    // -----------------------------
    // EGRESOS
    // -----------------------------

    const egresos = parseFloat(egresosInput.value);

    if (egresosInput.value.trim() === "") {

        mostrarError(
            egresosInput,
            "errorEgresos",
            "Los egresos son obligatorios."
        );

        formularioValido = false;

    } else if (isNaN(egresos)) {

        mostrarError(
            egresosInput,
            "errorEgresos",
            "Ingrese un valor numérico válido."
        );

        formularioValido = false;

    } else if (egresos < 0) {

        mostrarError(
            egresosInput,
            "errorEgresos",
            "Los egresos no pueden ser negativos."
        );

        formularioValido = false;

    } else if (egresos > 100000) {

        mostrarError(
            egresosInput,
            "errorEgresos",
            "El egreso máximo permitido es USD 100,000."
        );

        formularioValido = false;
    }


    // -----------------------------
    // MONTO SOLICITADO
    // -----------------------------

    const monto = parseFloat(montoInput.value);

    if (montoInput.value.trim() === "") {

        mostrarError(
            montoInput,
            "errorMonto",
            "El monto solicitado es obligatorio."
        );

        formularioValido = false;

    } else if (isNaN(monto)) {

        mostrarError(
            montoInput,
            "errorMonto",
            "Ingrese un monto válido."
        );

        formularioValido = false;

    } else if (monto < 100) {

        mostrarError(
            montoInput,
            "errorMonto",
            "El monto mínimo es USD 100."
        );

        formularioValido = false;

    } else if (monto > 100000) {

        mostrarError(
            montoInput,
            "errorMonto",
            "El monto máximo es USD 100,000."
        );

        formularioValido = false;
    }


    // -----------------------------
    // PLAZO
    // -----------------------------

    const plazo = Number(plazoInput.value);

    if (plazoInput.value.trim() === "") {

        mostrarError(
            plazoInput,
            "errorPlazo",
            "El plazo es obligatorio."
        );

        formularioValido = false;

    } else if (!Number.isInteger(plazo)) {

        mostrarError(
            plazoInput,
            "errorPlazo",
            "El plazo debe ser un número entero de años."
        );

        formularioValido = false;

    } else if (plazo < 1) {

        mostrarError(
            plazoInput,
            "errorPlazo",
            "El plazo mínimo es 1 año."
        );

        formularioValido = false;

    } else if (plazo > 30) {

        mostrarError(
            plazoInput,
            "errorPlazo",
            "El plazo máximo es 30 años."
        );

        formularioValido = false;
    }


    // -----------------------------
    // TASA DE INTERÉS
    // -----------------------------

    const tasa = parseFloat(tasaInput.value);

    if (tasaInput.value.trim() === "") {

        mostrarError(
            tasaInput,
            "errorTasa",
            "La tasa de interés es obligatoria."
        );

        formularioValido = false;

    } else if (isNaN(tasa)) {

        mostrarError(
            tasaInput,
            "errorTasa",
            "Ingrese una tasa válida."
        );

        formularioValido = false;

    } else if (tasa <= 0) {

        mostrarError(
            tasaInput,
            "errorTasa",
            "La tasa debe ser mayor a 0%."
        );

        formularioValido = false;

    } else if (tasa > 100) {

        mostrarError(
            tasaInput,
            "errorTasa",
            "La tasa máxima permitida es 100%."
        );

        formularioValido = false;
    }


    return formularioValido;
}


// =============================================
// CALCULAR CRÉDITO
// =============================================

function calcular() {

    // Primero validar
    if (!validarFormulario()) {
        return;
    }


    const ingresos = parseFloat(ingresosInput.value);
    const egresos = parseFloat(egresosInput.value);

    const monto = parseFloat(montoInput.value);
    const plazoAnios = Number(plazoInput.value);
    const tasa = parseFloat(tasaInput.value);


    // DISPONIBLE

    const disponible =
        calcularDisponible(ingresos, egresos);

    document.getElementById("spnDisponible").textContent =
        "USD " + disponible.toFixed(2);


    // CAPACIDAD DE PAGO

    const capacidadPago =
        calcularCapacidadPago(disponible);

    document.getElementById("spnCapacidadPago").textContent =
        "USD " + capacidadPago.toFixed(2);


    // INTERÉS

    const interes =
        calcularInteresSimple(
            monto,
            tasa,
            plazoAnios
        );

    document.getElementById("spnInteresPagar").textContent =
        "USD " + interes.toFixed(2);


    // TOTAL

    const total =
        calcularTotalPagar(
            monto,
            interes
        );

    document.getElementById("spnTotalPrestamo").textContent =
        "USD " + total.toFixed(2);


    // CUOTA MENSUAL

    const cuotaMensual =
        calcularCuotaMensual(
            total,
            plazoAnios
        );

    document.getElementById("spnCuotaMensual").textContent =
        "USD " + cuotaMensual.toFixed(2);


    // APROBACIÓN

    const aprobado =
        aprobarCredito(
            capacidadPago,
            cuotaMensual
        );


    const estado =
        document.getElementById("spnEstadoCredito");

    const estadoBox =
        document.getElementById("estadoBox");


    estadoBox.classList.remove(
        "aprobado",
        "rechazado"
    );


    if (aprobado) {

        estado.textContent =
            "CRÉDITO APROBADO";

        estadoBox.classList.add("aprobado");

    } else {

        estado.textContent =
            "CRÉDITO RECHAZADO";

        estadoBox.classList.add("rechazado");
    }
}


// =============================================
// REINICIAR
// =============================================

function reiniciar() {

    ingresosInput.value = "";
    egresosInput.value = "";
    montoInput.value = "";
    plazoInput.value = "";
    tasaInput.value = "";

    limpiarErrores();


    document.getElementById("spnDisponible").textContent =
        "USD 0.00";

    document.getElementById("spnCapacidadPago").textContent =
        "USD 0.00";

    document.getElementById("spnInteresPagar").textContent =
        "USD 0.00";

    document.getElementById("spnTotalPrestamo").textContent =
        "USD 0.00";

    document.getElementById("spnCuotaMensual").textContent =
        "USD 0.00";


    document.getElementById("spnEstadoCredito").textContent =
        "SIN CALCULAR";


    document
        .getElementById("estadoBox")
        .classList.remove(
            "aprobado",
            "rechazado"
        );


    ingresosInput.focus();
}


// =============================================
// BOTONES
// =============================================

document
    .getElementById("btnCalcularCredito")
    .addEventListener("click", calcular);


document
    .getElementById("btnReiniciar")
    .addEventListener("click", reiniciar);