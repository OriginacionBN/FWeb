function Calcular_EGP() {
    var ventas = convNro(document.getElementById("egp_ventas").value);
    var costo = convNro(document.getElementById("egp_costoven").value);
    var gOperativo = convNro(document.getElementById("egp_gastop").value);
    var uOperativa = ventas - costo - gOperativo;
    document.getElementById("egp_uoperativa").innerHTML = Number(uOperativa).toLocaleString('en');
    document.getElementById("egp_uoperativa").value = uOperativa;
    var egp_gastfinan = Calcular_Gastos_Financieros();
    var egp_gastfam = convNro(document.getElementById("egp_gastfam").value);
    var egp_otrosing = convNro(document.getElementById("egp_otrosing").value);
    var egp_impuestos = convNro(document.getElementById("egp_impuestos").value);
    var egp_uneta = uOperativa - egp_gastfinan - egp_gastfam + egp_otrosing - egp_impuestos;
    document.getElementById("egp_uneta").value = egp_uneta;
    document.getElementById("egp_uneta").innerHTML = Number(Number(egp_uneta).toFixed(0)).toLocaleString('en');
    Calcular_Porcentajes_EGP();
}
function Calcular_Gastos_Financieros() {
    var egp_gastfinan = 0;
    var suma1 = 0;

    var PA_table = document.getElementById("tablaPrestamoAdquisicion");
    var PA_filas = PA_table.rows.length - 1;
    var PA_S5 = 0;
    for (var idx = 0; idx < PA_filas; idx++) {
        PA_S5 = PA_S5 + convNro(document.getElementById("PA_Cuota_Pagar_Aprox_" + idx).value);
    }

    var cuotas = Calcular_Cuotas_LP_Total();
    suma1 = convNro(cuotas) + convNro(PA_S5);
    var suma2 = 0;
    var LTC_table = document.getElementById("tablaLineaTarjetaCapital");
    var LTC_filas = LTC_table.rows.length - 1;
    var PCCT_table = document.getElementById("tablaPrestamoComercial");
    var PCCT_filas = PCCT_table.rows.length - 1;
    var PC_table = document.getElementById("tablaPrestamoCancelable");
    var PC_filas = PC_table.rows.length - 1;

    var S1 = 0;
    var LTC_S1 = 0;
    for (var idx = 0; idx < LTC_filas; idx++) {
        LTC_S1 = LTC_S1 + convNro(document.getElementById("LTC_Costo_Financiero_" + idx).value);
    }
    var PCCT_S1 = 0;
    for (var idx = 0; idx < PCCT_filas; idx++) {
        PCCT_S1 = PCCT_S1 + convNro(document.getElementById("PCCT_Costo_Financiero_" + idx).value);
    }

    S1 = LTC_S1 + PCCT_S1;

    var S2 = 0;
    var PC_S2 = 0;
    for (var idx = 0; idx < PC_filas; idx++) {
        PC_S2 = PC_S2 + convNro(document.getElementById("PC_Costo_Financiero_" + idx).value);
    }

    var i1 = convNro(S1) + convNro(PC_S2);

    var i2 = 0;

    var idx = document.getElementById("cant_finan_CP").value;
    for (var i = 1; i <= idx; i++) {
        i2 = i2 + Calcular_GastFin_CP(i);
    }



    suma2 = i1 + i2;
    egp_gastfinan = suma1 + suma2;
    document.getElementById("egp_gastfinan").value = egp_gastfinan;
    egp_gastfinan = Number(egp_gastfinan).toFixed(0);
    document.getElementById("egp_gastfinan").innerHTML = Number(egp_gastfinan).toLocaleString('en');
    return convNro(egp_gastfinan);
}
function Calcular_Porcentajes_EGP() {
    var egp_ventas = convNro(document.getElementById("egp_ventas").value);

    if (egp_ventas != 0) {
        document.getElementById("egp_ventas_p").value = "100%";
        document.getElementById("egp_ventas_p").innerHTML = "100%";
        var egp_costoven = convNro(document.getElementById("egp_costoven").value);
        var egp_costoven_p = egp_costoven * 100 / egp_ventas;
        document.getElementById("egp_costoven_p").value = Number(egp_costoven_p).toFixed(0) + "%";
        document.getElementById("egp_costoven_p").innerHTML = Number(egp_costoven_p).toFixed(0) + "%";
        var egp_gastop = convNro(document.getElementById("egp_gastop").value);
        var egp_gastop_p = egp_costoven * 100 / egp_ventas;
        document.getElementById("egp_gastop_p").value = Number(egp_gastop_p).toFixed(0) + "%";
        document.getElementById("egp_gastop_p").innerHTML = Number(egp_gastop_p).toFixed(0) + "%";
        var egp_uoperativa = egp_ventas - egp_costoven - egp_gastop;
        var egp_uoperativa_p = egp_uoperativa * 100 / egp_ventas;
        document.getElementById("egp_uoperativa_p").value = Number(egp_uoperativa_p).toFixed(0) + "%";
        document.getElementById("egp_uoperativa_p").innerHTML = Number(egp_uoperativa_p).toFixed(0) + "%";
        var egp_gastfinan = convNro(document.getElementById("egp_gastfinan").value);
        var egp_gastfinan_p = egp_gastfinan * 100 / egp_ventas;
        document.getElementById("egp_gastfinan_p").value = Number(egp_gastfinan_p).toFixed(0) + "%";
        document.getElementById("egp_gastfinan_p").innerHTML = Number(egp_gastfinan_p).toFixed(0) + "%";
        var egp_gastfam = convNro(document.getElementById("egp_gastfam").value);
        var egp_gastfam_p = egp_gastfam * 100 / egp_ventas;
        document.getElementById("egp_gastfam_p").value = Number(egp_gastfam_p).toFixed(0) + "%";
        document.getElementById("egp_gastfam_p").innerHTML = Number(egp_gastfam_p).toFixed(0) + "%";
        var egp_otrosing = convNro(document.getElementById("egp_otrosing").value);
        var egp_otrosing_p = egp_otrosing * 100 / egp_ventas;
        document.getElementById("egp_otrosing_p").value = Number(egp_otrosing_p).toFixed(0) + "%";
        document.getElementById("egp_otrosing_p").innerHTML = Number(egp_otrosing_p).toFixed(0) + "%";
        var egp_impuestos = convNro(document.getElementById("egp_impuestos").value);
        var egp_impuestos_p = egp_impuestos * 100 / egp_ventas;
        document.getElementById("egp_impuestos_p").value = Number(egp_impuestos_p).toFixed(0) + "%";
        document.getElementById("egp_impuestos_p").innerHTML = Number(egp_impuestos_p).toFixed(0) + "%";
        var egp_uneta = egp_uoperativa - egp_gastfinan - egp_gastfam + egp_otrosing - egp_impuestos;
        var egp_uneta_p = egp_uneta * 100 / egp_ventas;
        document.getElementById("egp_uneta_p").value = Number(egp_uneta_p).toFixed(0) + "%";
        document.getElementById("egp_uneta_p").innerHTML = Number(egp_uneta_p).toFixed(0) + "%";
    } else {
        document.getElementById("egp_ventas_p").innerHTML = "";
        document.getElementById("egp_costoven_p").innerHTML = "";
        document.getElementById("egp_gastop_p").innerHTML = "";
        document.getElementById("egp_uoperativa_p").innerHTML = "";
        document.getElementById("egp_gastfinan_p").innerHTML = "";
        document.getElementById("egp_gastfam_p").innerHTML = "";
        document.getElementById("egp_otrosing_p").innerHTML = "";
        document.getElementById("egp_impuestos_p").innerHTML = "";
        document.getElementById("egp_uneta_p").innerHTML = "";
    }
}
