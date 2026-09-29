// ==========================================
// SIMULADOR DE CRÉDITO
// ==========================================

function calcular() {

    // Leer ingresos y egresos
    const ingresos =
        parseFloat(document.getElementById("txtIngresos").value) || 0;

    const egresos =
        parseFloat(document.getElementById("txtEgresos").value) || 0;


    // 1. Disponible
    const disponible =
        calcularDisponible(ingresos, egresos);

    document.getElementById("spnDisponible").textContent =
        "USD " + disponible.toFixed(2);


    // 2. Capacidad de pago
    const capacidadPago =
        calcularCapacidadPago(disponible);

    document.getElementById("spnCapacidadPago").textContent =
        "USD " + capacidadPago.toFixed(2);


    // Leer datos del crédito
    const monto =
        parseFloat(document.getElementById("txtMonto").value) || 0;

    const plazoAnios =
        parseInt(document.getElementById("txtPlazo").value) || 0;

    const tasa =
        parseFloat(document.getElementById("txtTasaInteres").value) || 0;


    // Validaciones
    if (monto <= 0) {
        alert("Ingrese un monto válido.");
        return;
    }

    if (plazoAnios <= 0) {
        alert("Ingrese un plazo válido.");
        return;
    }

    if (tasa < 0) {
        alert("Ingrese una tasa de interés válida.");
        return;
    }


    // 3. Interés simple
    const interes =
        calcularInteresSimple(monto, tasa, plazoAnios);

    document.getElementById("spnInteresPagar").textContent =
        "USD " + interes.toFixed(2);


    // 4. Total a pagar
    const total =
        calcularTotalPagar(monto, interes);

    document.getElementById("spnTotalPrestamo").textContent =
        "USD " + total.toFixed(2);


    // 5. Cuota mensual
    const cuotaMensual =
        calcularCuotaMensual(total, plazoAnios);

    document.getElementById("spnCuotaMensual").textContent =
        "USD " + cuotaMensual.toFixed(2);


    // 6. Aprobar o rechazar
    const aprobado =
        aprobarCredito(capacidadPago, cuotaMensual);

    const estado =
        document.getElementById("spnEstadoCredito");

    if (aprobado) {
        estado.textContent = "CRÉDITO APROBADO";
    } else {
        estado.textContent = "CRÉDITO RECHAZADO";
    }
}


// ==========================================
// BOTÓN CALCULAR
// ==========================================

document
    .getElementById("btnCalcularCredito")
    .addEventListener("click", calcular);


// ==========================================
// BOTÓN REINICIAR
// ==========================================

document
    .getElementById("btnReiniciar")
    .addEventListener("click", function () {

        document.getElementById("txtIngresos").value = "";
        document.getElementById("txtEgresos").value = "";
        document.getElementById("txtMonto").value = "";
        document.getElementById("txtPlazo").value = "";
        document.getElementById("txtTasaInteres").value = "";

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
    });