function Calcular_BG() {
    Calcular_Activos();
    Calcular_Pasivos();
    Calcular_Patrimonio();
    Calcular_Porcentajes_BG();
}
function Calcular_Activos() {
    var actCorrientes = Calcular_Activos_Corrientes();
    var actNoCorrientes = Calcular_Activos_No_Corrientes();
    var total_activo = actCorrientes + actNoCorrientes;
    document.getElementById("total_activo").value = total_activo;
    document.getElementById("total_activo").innerHTML = Number(total_activo).toLocaleString('en');
    return convNro(total_activo);
}
function Calcular_Activos_Corrientes() {
    var bg_1 = convNro(document.getElementById("bg_1").value);
    var bg_2 = convNro(document.getElementById("bg_2").value);
    var bg_3 = convNro(document.getElementById("bg_3").value);
    var bg_4 = convNro(document.getElementById("bg_4").value);
    var bg_5 = Calcular_Inventarios();
    var actCorrientes = bg_1 + bg_2 + bg_3 + bg_4 + bg_5;
    document.getElementById("total_activo_cte").value = actCorrientes;
    document.getElementById("total_activo_cte").innerHTML = Number(actCorrientes).toLocaleString('en');
    return convNro(actCorrientes);
}
function Calcular_Inventarios() {
    var bg_6 = Calcular_Activos_CP();
    var bg_7 = convNro(document.getElementById("bg_7").value);
    var bg_8 = convNro(document.getElementById("bg_8").value);
    var bg_9 = convNro(document.getElementById("bg_9").value);
    var bg_10 = convNro(document.getElementById("bg_10").value);
    var bg_11 = Calcular_Linea_No_Utilizada();
    var inventarios = bg_6 + bg_7 + bg_8 + bg_9 + bg_10 + bg_11;
    document.getElementById("bg_5").value = inventarios;
    document.getElementById("bg_5").innerHTML = Number(inventarios).toLocaleString('en');
    return convNro(inventarios);
}
function Calcular_Activos_CP() {
    var idx = Number(document.getElementById("cant_finan_CP").value);
    var bg_6 = 0;
    for (var i = 0; i < idx; i++) {
        var Finan_CP = convNro(document.getElementById("Finan_CP_" + (i + 1)).value);
        bg_6 = bg_6 + Finan_CP;
    }
    document.getElementById("bg_6").value = bg_6;
    document.getElementById("bg_6").innerHTML = Number(bg_6).toLocaleString('en');
    return convNro(bg_6);
}
function Calcular_Linea_No_Utilizada() {
    var bg_11 = 0;

    var LTC_table = document.getElementById("tablaLineaTarjetaCapital");
    var LTC_filas = LTC_table.rows.length - 1;

    var S1 = 0;
    for (var idx = 0; idx < LTC_filas; idx++) {
        bg_11 = bg_11 + convNro(document.getElementById("LTC_Linea_Total_" + idx).value) - convNro(document.getElementById("LTC_Linea_Utilizada_" + idx).value);
    }

    document.getElementById("bg_11").value = bg_11;
    document.getElementById("bg_11").innerHTML = Number(bg_11).toLocaleString('en');

    return convNro(bg_11);
}
function Calcular_Activos_No_Corrientes() {
    var bg_12 = Calcular_Activos_LP();
    var bg_13 = convNro(document.getElementById("bg_13").value);
    var bg_14 = convNro(document.getElementById("bg_14").value);
    var bg_15 = convNro(document.getElementById("bg_15").value);
    var actNoCorrientes = bg_12 + bg_13 + bg_14 + bg_15;
    document.getElementById("total_activo_no_cte").value = actNoCorrientes;
    document.getElementById("total_activo_no_cte").innerHTML = Number(actNoCorrientes).toLocaleString('en');
    return convNro(actNoCorrientes);
}
function Calcular_Activos_LP() {
    var idx = Number(document.getElementById("cant_finan_LP").value);
    var actLP = 0;
    for (var i = 0; i < idx; i++) {
        var Precio_Venta = convNro(document.getElementById("Precio_Venta_" + (i + 1)).value);
        actLP = actLP + Precio_Venta;
    }
    document.getElementById("bg_12").value = actLP;
    document.getElementById("bg_12").innerHTML = Number(actLP).toLocaleString('en');
    return convNro(actLP);
}
function Calcular_Pasivos() {
    var pasCorrientes = Calcular_Pasivos_Corrientes();
    var pasNoCorrientes = Calcular_Pasivos_No_Corrientes();
    var total_pasivo = pasCorrientes + pasNoCorrientes;
    document.getElementById("total_pasivo").value = total_pasivo;
    document.getElementById("total_pasivo").innerHTML = Number(total_pasivo).toLocaleString('en');
    return convNro(total_pasivo);
}
function Calcular_Pasivos_Corrientes() {
    var bg_16 = Calcular_Deuda_Financiera_CP();
    var bg_17 = convNro(document.getElementById("bg_17").value);
    var bg_18 = convNro(document.getElementById("bg_18").value);
    var total_pasivo_cte = bg_16 + bg_17 + bg_18;
    document.getElementById("total_pasivo_cte").value = total_pasivo_cte;
    document.getElementById("total_pasivo_cte").innerHTML = Number(total_pasivo_cte).toLocaleString('en');
    return convNro(total_pasivo_cte);
}
function Calcular_Deuda_Financiera_CP() {
    var suma_cp = Calcular_Activos_CP();

    var LTC_table = document.getElementById("tablaLineaTarjetaCapital");
    var LTC_filas = LTC_table.rows.length - 1;
    var PCCT_table = document.getElementById("tablaPrestamoComercial");
    var PCCT_filas = PCCT_table.rows.length - 1;
    var PC_table = document.getElementById("tablaPrestamoCancelable");
    var PC_filas = PC_table.rows.length - 1;

    var S1 = 0;
    var LTC_S1 = 0;
    for (var idx = 0; idx < LTC_filas; idx++) {
        LTC_S1 = LTC_S1 + convNro(document.getElementById("LTC_Linea_Total_" + idx).value);
    }
    var PCCT_S1 = 0;
    for (var idx = 0; idx < PCCT_filas; idx++) {
        PCCT_S1 = PCCT_S1 + convNro(document.getElementById("PCCT_Mes_Actual_" + idx).value);
    }

    S1 = LTC_S1 + PCCT_S1;

    var S2 = 0;
    var PC_S2 = 0;
    for (var idx = 0; idx < PC_filas; idx++) {
        PC_S2 = PC_S2 + convNro(document.getElementById("PC_Monto_" + idx).value);
    }

    var pasCP = convNro(S1) + convNro(PC_S2) + convNro(suma_cp);
    document.getElementById("bg_16").value = pasCP;
    document.getElementById("bg_16").innerHTML = Number(pasCP).toLocaleString('en');
    return convNro(pasCP);
}
function Calcular_Pasivos_No_Corrientes() {
    var bg_19 = Calcular_Deuda_Financiera_LP();
    var bg_20 = convNro(document.getElementById("bg_20").value);
    var bg_21 = convNro(document.getElementById("bg_21").value);
    var total_pasivo_cte = bg_19 + bg_20 + bg_21;
    document.getElementById("total_pasivo_no_cte").value = total_pasivo_cte;
    document.getElementById("total_pasivo_no_cte").innerHTML = Number(total_pasivo_cte).toLocaleString('en');
    return convNro(total_pasivo_cte);
}
function Calcular_Pasivos_LP() {
    var idx = Number(document.getElementById("cant_finan_LP").value);
    var pasLP = 0;
    for (var i = 0; i < idx; i++) {
        var Finan_LP = convNro(document.getElementById("Finan_LP_" + (i + 1)).value);
        pasLP = pasLP + Finan_LP;
    }

    return convNro(pasLP);
}
function Calcular_Deuda_Financiera_LP() {
    var suma_lp = Calcular_Pasivos_LP();
    var PA_table = document.getElementById("tablaPrestamoAdquisicion");
    var PA_filas = PA_table.rows.length - 1;
    var PA_S4 = 0;

    for (var idx = 0; idx < PA_filas; idx++) {
        PA_S4 = PA_S4 + convNro(document.getElementById("PA_Mes_Actual_" + idx).value);
    }
    var pasLP = convNro(suma_lp) + convNro(PA_S4);

    document.getElementById("bg_19").value = pasLP;
    document.getElementById("bg_19").innerHTML = Number(pasLP).toLocaleString('en');
    return convNro(pasLP);
}
function Calcular_Patrimonio() {
    var activos = Calcular_Activos();
    var pasivos = Calcular_Pasivos();
    var patrimonio = activos - pasivos;
    document.getElementById("patrimonio").value = patrimonio;
    document.getElementById("patrimonio").innerHTML = Number(patrimonio).toLocaleString('en');
    document.getElementById("pasivo_patrimonio").value = activos;
    document.getElementById("pasivo_patrimonio").innerHTML = Number(activos).toLocaleString('en');
    return convNro(patrimonio);
}
function Calcular_Porcentajes_BG() {
    var total_activos = Calcular_Activos();

    if (total_activos != 0) {
        var bg_1 = convNro(document.getElementById("bg_1").value);
        document.getElementById("bg_porc_1").value = Number(100 * bg_1 / total_activos).toFixed(0) + "%";
        document.getElementById("bg_porc_1").innerHTML = Number(100 * bg_1 / total_activos).toFixed(0) + "%";
        var bg_2 = convNro(document.getElementById("bg_2").value);
        document.getElementById("bg_porc_2").value = Number(100 * bg_2 / total_activos).toFixed(0) + "%";
        document.getElementById("bg_porc_2").innerHTML = Number(100 * bg_2 / total_activos).toFixed(0) + "%";
        var bg_3 = convNro(document.getElementById("bg_3").value);
        document.getElementById("bg_porc_3").value = Number(100 * bg_3 / total_activos).toFixed(0) + "%";
        document.getElementById("bg_porc_3").innerHTML = Number(100 * bg_3 / total_activos).toFixed(0) + "%";
        var bg_4 = convNro(document.getElementById("bg_4").value);
        document.getElementById("bg_porc_4").value = Number(100 * bg_4 / total_activos).toFixed(0) + "%";
        document.getElementById("bg_porc_4").innerHTML = Number(100 * bg_4 / total_activos).toFixed(0) + "%";
        var bg_5 = convNro(document.getElementById("bg_5").value);
        document.getElementById("bg_porc_5").value = Number(100 * bg_5 / total_activos).toFixed(0) + "%";
        document.getElementById("bg_porc_5").innerHTML = Number(100 * bg_5 / total_activos).toFixed(0) + "%";
        var bg_6 = convNro(document.getElementById("bg_6").value);
        document.getElementById("bg_porc_6").value = Number(100 * bg_6 / total_activos).toFixed(0) + "%";
        document.getElementById("bg_porc_6").innerHTML = Number(100 * bg_6 / total_activos).toFixed(0) + "%";
        var bg_7 = convNro(document.getElementById("bg_7").value);
        document.getElementById("bg_porc_7").value = Number(100 * bg_7 / total_activos).toFixed(0) + "%";
        document.getElementById("bg_porc_7").innerHTML = Number(100 * bg_7 / total_activos).toFixed(0) + "%";
        var bg_8 = convNro(document.getElementById("bg_8").value);
        document.getElementById("bg_porc_8").value = Number(100 * bg_8 / total_activos).toFixed(0) + "%";
        document.getElementById("bg_porc_8").innerHTML = Number(100 * bg_8 / total_activos).toFixed(0) + "%";
        var bg_9 = convNro(document.getElementById("bg_9").value);
        document.getElementById("bg_porc_9").value = Number(100 * bg_9 / total_activos).toFixed(0) + "%";
        document.getElementById("bg_porc_9").innerHTML = Number(100 * bg_9 / total_activos).toFixed(0) + "%";
        var bg_10 = convNro(document.getElementById("bg_10").value);
        document.getElementById("bg_porc_10").value = Number(100 * bg_10 / total_activos).toFixed(0) + "%";
        document.getElementById("bg_porc_10").innerHTML = Number(100 * bg_10 / total_activos).toFixed(0) + "%";
        var bg_11 = convNro(document.getElementById("bg_11").value);
        document.getElementById("bg_porc_11").value = Number(100 * bg_11 / total_activos).toFixed(0) + "%";
        document.getElementById("bg_porc_11").innerHTML = Number(100 * bg_11 / total_activos).toFixed(0) + "%";
        var total_activo_cte = convNro(document.getElementById("total_activo_cte").value);
        document.getElementById("total_activo_cte_porc").value = Number(100 * total_activo_cte / total_activos).toFixed(0) + "%";
        document.getElementById("total_activo_cte_porc").innerHTML = Number(100 * total_activo_cte / total_activos).toFixed(0) + "%";

        var bg_12 = convNro(document.getElementById("bg_12").value);
        document.getElementById("bg_porc_12").value = Number(100 * bg_12 / total_activos).toFixed(0) + "%";
        document.getElementById("bg_porc_12").innerHTML = Number(100 * bg_12 / total_activos).toFixed(0) + "%";
        var bg_13 = convNro(document.getElementById("bg_13").value);
        document.getElementById("bg_porc_13").value = Number(100 * bg_13 / total_activos).toFixed(0) + "%";
        document.getElementById("bg_porc_13").innerHTML = Number(100 * bg_13 / total_activos).toFixed(0) + "%";
        var bg_14 = convNro(document.getElementById("bg_14").value);
        document.getElementById("bg_porc_14").value = Number(100 * bg_14 / total_activos).toFixed(0) + "%";
        document.getElementById("bg_porc_14").innerHTML = Number(100 * bg_14 / total_activos).toFixed(0) + "%";
        var bg_15 = convNro(document.getElementById("bg_15").value);
        document.getElementById("bg_porc_15").value = Number(100 * bg_15 / total_activos).toFixed(0) + "%";
        document.getElementById("bg_porc_15").innerHTML = Number(100 * bg_15 / total_activos).toFixed(0) + "%";
        var total_activo_no_cte = convNro(document.getElementById("total_activo_no_cte").value);
        document.getElementById("total_activo_no_cte_porc").value = Number(100 * total_activo_no_cte / total_activos).toFixed(0) + "%";
        document.getElementById("total_activo_no_cte_porc").innerHTML = Number(100 * total_activo_no_cte / total_activos).toFixed(0) + "%";

        var bg_16 = convNro(document.getElementById("bg_16").value);
        document.getElementById("bg_porc_16").value = Number(100 * bg_16 / total_activos).toFixed(0) + "%";
        document.getElementById("bg_porc_16").innerHTML = Number(100 * bg_16 / total_activos).toFixed(0) + "%";
        var bg_17 = convNro(document.getElementById("bg_17").value);
        document.getElementById("bg_porc_17").value = Number(100 * bg_17 / total_activos).toFixed(0) + "%";
        document.getElementById("bg_porc_17").innerHTML = Number(100 * bg_17 / total_activos).toFixed(0) + "%";
        var bg_18 = convNro(document.getElementById("bg_18").value);
        document.getElementById("bg_porc_18").value = Number(100 * bg_18 / total_activos).toFixed(0) + "%";
        document.getElementById("bg_porc_18").innerHTML = Number(100 * bg_18 / total_activos).toFixed(0) + "%";
        var total_pasivo_cte = convNro(document.getElementById("total_pasivo_cte").value);
        document.getElementById("total_pasivo_cte_porc").value = Number(100 * total_pasivo_cte / total_activos).toFixed(0) + "%";
        document.getElementById("total_pasivo_cte_porc").innerHTML = Number(100 * total_pasivo_cte / total_activos).toFixed(0) + "%";

        var bg_19 = convNro(document.getElementById("bg_19").value);
        document.getElementById("bg_porc_19").value = Number(100 * bg_19 / total_activos).toFixed(0) + "%";
        document.getElementById("bg_porc_19").innerHTML = Number(100 * bg_19 / total_activos).toFixed(0) + "%";
        var bg_20 = convNro(document.getElementById("bg_20").value);
        document.getElementById("bg_porc_20").value = Number(100 * bg_20 / total_activos).toFixed(0) + "%";
        document.getElementById("bg_porc_20").innerHTML = Number(100 * bg_20 / total_activos).toFixed(0) + "%";
        var bg_21 = convNro(document.getElementById("bg_21").value);
        document.getElementById("bg_porc_21").value = Number(100 * bg_21 / total_activos).toFixed(0) + "%";
        document.getElementById("bg_porc_21").innerHTML = Number(100 * bg_21 / total_activos).toFixed(0) + "%";
        var total_pasivo_no_cte = document.getElementById("total_pasivo_no_cte").value;
        document.getElementById("total_pasivo_no_cte_porc").value = Number(100 * total_pasivo_no_cte / total_activos).toFixed(0) + "%";
        document.getElementById("total_pasivo_no_cte_porc").innerHTML = Number(100 * total_pasivo_no_cte / total_activos).toFixed(0) + "%";

        var total_pasivo = convNro(document.getElementById("total_pasivo").value);
        document.getElementById("total_pasivo_porc").value = Number(100 * total_pasivo / total_activos).toFixed(0) + "%";
        document.getElementById("total_pasivo_porc").innerHTML = Number(100 * total_pasivo / total_activos).toFixed(0) + "%";
        var patrimonio = convNro(document.getElementById("patrimonio").value);
        document.getElementById("patrimonio_porc").value = Number(100 * patrimonio / total_activos).toFixed(0) + "%";
        document.getElementById("patrimonio_porc").innerHTML = Number(100 * patrimonio / total_activos).toFixed(0) + "%";
    } else {
        document.getElementById("bg_porc_1").innerHTML = "";
        document.getElementById("bg_porc_2").innerHTML = "";
        document.getElementById("bg_porc_3").innerHTML = "";
        document.getElementById("bg_porc_4").innerHTML = "";
        document.getElementById("bg_porc_5").innerHTML = "";
        document.getElementById("bg_porc_6").innerHTML = "";
        document.getElementById("bg_porc_7").innerHTML = "";
        document.getElementById("bg_porc_8").innerHTML = "";
        document.getElementById("bg_porc_9").innerHTML = "";
        document.getElementById("bg_porc_10").innerHTML = "";
        document.getElementById("bg_porc_11").innerHTML = "";
        document.getElementById("total_activo_cte_porc").innerHTML = "";

        document.getElementById("bg_porc_12").innerHTML = "";
        document.getElementById("bg_porc_13").innerHTML = "";
        document.getElementById("bg_porc_14").innerHTML = "";
        document.getElementById("bg_porc_15").innerHTML = "";
        document.getElementById("total_activo_no_cte_porc").innerHTML = "";

        document.getElementById("bg_porc_16").innerHTML = "";
        document.getElementById("bg_porc_17").innerHTML = "";
        document.getElementById("bg_porc_18").innerHTML = "";
        document.getElementById("total_pasivo_cte_porc").innerHTML = "";

        document.getElementById("bg_porc_19").innerHTML = "";
        document.getElementById("bg_porc_20").innerHTML = "";
        document.getElementById("bg_porc_21").innerHTML = "";
        document.getElementById("total_pasivo_no_cte_porc").innerHTML = "";

        document.getElementById("total_pasivo_porc").innerHTML = "";
        document.getElementById("patrimonio_porc").innerHTML = "";

    }
}
