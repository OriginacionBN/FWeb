var TEAPCCT = 0.2362;
var TEAPC = 0.2362;
var TEAPA = 0.2133;
var TEAPPLibre = 0.2556;
var TEAPPVehicular = 0.1048;
var TEAPPHipotecario = 0.0894;
var TEATC = 0.4650;

function retornarTEM(TEA) {
    var TEA = Math.pow((1 + TEA), (1 / 12)) - 1 + 0.0015;
    return Number(TEA).toFixed(10);
}
function Calcular_Cuota_Pagar(tasa, plazo, deuda) {
    tasa = Number(tasa);
    plazo = Number(plazo);
    deuda = Number(deuda);
    var p1 = 1 + tasa;
    var p2 = Math.pow(p1, -plazo);
    var p3 = 1 - p2;
    var p4 = p3 / tasa;
    var p5 = deuda / p4;
    p5 = convNro(p5);
    return Number(p5).toFixed(2);
}
function CalcularNroCuotas(Mes_Anterior, TEM, Cuota, Mes_Actual) {
    if (Mes_Anterior > Mes_Actual) {
        Mes_Anterior = Number(Mes_Anterior);
        TEM = Number(TEM);
        Cuota = Number(Cuota);
        Mes_Actual = Number(Mes_Actual);
        var cantCuotas = 0;
        var saldo = Mes_Anterior;
        if (Cuota > 0) {
            while (saldo > 0) {
                Mes_Anterior = saldo;
                var interes = Mes_Anterior * TEM;
                var amorCap = Cuota - interes;
                saldo = Mes_Anterior - amorCap;
                cantCuotas = cantCuotas + 1;
            }
        }
        return cantCuotas - 1;
    }
    return 0;
}
function EliminarLineaTarjeta() {
    var table = document.getElementById("tablaLineaTarjetaCapital");
    var idx = table.rows.length - 1;
    if (table.rows.length > 1) {
        table.deleteRow(idx);
    }
    Calcular_Linea_Tarjeta_Total();
}
function AgregarLineaTarjeta() {
    var table = document.getElementById("tablaLineaTarjetaCapital");
    var idx = table.rows.length;
    var row = table.insertRow(idx);
    idx = idx - 1;
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    //var cell4 = row.insertCell(3);
    //var cell5 = row.insertCell(4);
    var cell6 = row.insertCell(3);
    var cell7 = row.insertCell(4);
    var TEM = retornarTEM(TEALTC);
    TEM = Number(TEM).toFixed(4);
    cell1.innerHTML = '<div><input class="form-control" type="text" id="LTC_Banco_' + idx + '"/></div>';
    cell2.innerHTML = '<div><input class="form-control" type="text" id="LTC_Linea_Utilizada_' + idx + '" onkeyup="validarNumero(id);"/></div>';
    cell3.innerHTML = '<div><input class="form-control" type="text" id="LTC_Linea_Total_' + idx + '" onkeyup="validarNumero(id);Calcular_Linea_Tarjeta_Total()"/></div>';
    var cell4 = '<div style="display:none" id="LTC_TEA_' + idx + '">' + TEALTC * 100 + '%</div>';
    var cell5 = '<div style="display:none" id="LTC_TEM_' + idx + '">' + TEM * 100 + '%</div>';
    cell6.innerHTML = cell4 + '<div id="LTC_Costo_Financiero_' + idx + '"></div>';
    cell7.innerHTML = cell5 + '<div id="LTC_Costo_Aprox_Pagar_' + idx + '"></div>';
}
function Calcular_Linea_Tarjeta(idx) {
    var LTC_Linea_Utilizada = convNro(document.getElementById("LTC_Linea_Utilizada_" + idx).value);
    var LTC_Linea_Total = convNro(document.getElementById("LTC_Linea_Total_" + idx).value);

    var TEM = retornarTEM(TEALTC);

    var LTC_Costo_Financiero = LTC_Linea_Total * TEM;
    LTC_Costo_Financiero = Number(LTC_Costo_Financiero).toFixed(2);

    var LTC_Costo_Aprox_Pagar = Calcular_Cuota_Pagar(TEM, 24, LTC_Linea_Total);
    LTC_Costo_Aprox_Pagar = Number(LTC_Costo_Aprox_Pagar).toFixed(2);

    document.getElementById("LTC_Costo_Financiero_" + idx).innerHTML = Number(LTC_Costo_Financiero).toLocaleString('en');
    document.getElementById("LTC_Costo_Financiero_" + idx).value = LTC_Costo_Financiero;
    document.getElementById("LTC_Costo_Aprox_Pagar_" + idx).innerHTML = Number(LTC_Costo_Aprox_Pagar).toLocaleString('en');
    document.getElementById("LTC_Costo_Aprox_Pagar_" + idx).value = LTC_Costo_Aprox_Pagar;
}
function Calcular_Linea_Tarjeta_Total() {
    var table = document.getElementById("tablaLineaTarjetaCapital");
    var filas = table.rows.length - 1;

    for (var idx = 0; idx < filas; idx++) {
        Calcular_Linea_Tarjeta(idx);
    }
    Calcular_Resumen();
    Calcular_Linea_No_Utilizada();
}
function EliminarPrestamoComercial() {
    var table = document.getElementById("tablaPrestamoComercial");
    var idx = table.rows.length - 1;
    if (table.rows.length > 1) {
        table.deleteRow(idx);
    }
    Calcular_Prestamo_Comercial_Total();
}
function AgregarPrestamoComercial() {
    var table = document.getElementById("tablaPrestamoComercial");
    var idx = table.rows.length;
    var row = table.insertRow(idx);
    idx = idx - 1;
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    //var cell4 = row.insertCell(3);
    //var cell5 = row.insertCell(4);
    var cell6 = row.insertCell(3);
    var cell7 = row.insertCell(4);
    var cell8 = row.insertCell(5);
    var cell9 = row.insertCell(6);

    var TEM = retornarTEM(TEAPCCT);
    TEM = Number(TEM).toFixed(4);

    cell1.innerHTML = '<div><input class="form-control" type="text" id="PCCT_Banco_' + idx + '"/></div>';
    cell2.innerHTML = '<div><input class="form-control" type="text" id="PCCT_Mes_Anterior_' + idx + '" onkeyup="validarNumero(id);Calcular_Prestamo_Comercial_Total()"/></div>';
    cell3.innerHTML = '<div><input class="form-control" type="text" id="PCCT_Mes_Actual_' + idx + '" onkeyup="validarNumero(id);Calcular_Prestamo_Comercial_Total()"/></div>';
    var cell4 = '<div style="display:none" id="PCCT_TEA_' + idx + '">' + TEAPCCT * 100 + '%</div>';
    var cell5 = '<div style="display:none" id="PCCT_TEM_' + idx + '">' + Number(TEM * 100).toFixed(2) + '%</div>';
    cell6.innerHTML = cell4 + '<div id="PCCT_Amort_Capital_' + idx + '"></div>';
    cell7.innerHTML = cell5 + '<div id="PCCT_Costo_Financiero_' + idx + '"></div>';
    cell8.innerHTML = '<div id="PCCT_Cuota_Pagar_Aprox_' + idx + '"></div>';
    cell9.innerHTML = '<div id="PCCT_Nro_Cuota_' + idx + '"></div>';
}
function Calcular_Prestamo_Comercial(idx) {
    var PCCT_Mes_Anterior = convNro(document.getElementById("PCCT_Mes_Anterior_" + idx).value);
    var PCCT_Mes_Actual = convNro(document.getElementById("PCCT_Mes_Actual_" + idx).value);

    var PCCT_Amort_Capital = PCCT_Mes_Anterior - PCCT_Mes_Actual;
    document.getElementById("PCCT_Amort_Capital_" + idx).innerHTML = Number(PCCT_Amort_Capital).toLocaleString('en');
    document.getElementById("PCCT_Amort_Capital_" + idx).value = PCCT_Amort_Capital;

    var TEM = retornarTEM(TEAPCCT);
    var PCCT_Costo_Financiero = PCCT_Mes_Anterior * TEM;
    PCCT_Costo_Financiero = Number(PCCT_Costo_Financiero).toFixed(0);
    document.getElementById("PCCT_Costo_Financiero_" + idx).innerHTML = Number(PCCT_Costo_Financiero).toLocaleString('en');
    document.getElementById("PCCT_Costo_Financiero_" + idx).value = PCCT_Costo_Financiero;
    PCCT_Amort_Capital = Number(PCCT_Amort_Capital);
    PCCT_Costo_Financiero = Number(PCCT_Costo_Financiero);
    var PCCT_Cuota_Pagar_Aprox = PCCT_Amort_Capital + PCCT_Costo_Financiero;
    PCCT_Cuota_Pagar_Aprox = Number(PCCT_Cuota_Pagar_Aprox).toFixed(0);
    document.getElementById("PCCT_Cuota_Pagar_Aprox_" + idx).innerHTML = Number(PCCT_Cuota_Pagar_Aprox).toLocaleString('en');
    document.getElementById("PCCT_Cuota_Pagar_Aprox_" + idx).value = PCCT_Cuota_Pagar_Aprox;

    var PCCT_Nro_Cuota = CalcularNroCuotas(PCCT_Mes_Anterior, TEM, PCCT_Cuota_Pagar_Aprox, PCCT_Mes_Actual);
    document.getElementById("PCCT_Nro_Cuota_" + idx).innerHTML = Number(PCCT_Nro_Cuota).toLocaleString('en');
    document.getElementById("PCCT_Nro_Cuota_" + idx).value = PCCT_Nro_Cuota;
}
function Calcular_Prestamo_Comercial_Total() {
    var table = document.getElementById("tablaPrestamoComercial");
    var filas = table.rows.length - 1;

    for (var idx = 0; idx < filas; idx++) {
        Calcular_Prestamo_Comercial(idx);
    }
    Calcular_Resumen();
}
function EliminarPrestamoCancelable() {
    var table = document.getElementById("tablaPrestamoCancelable");
    var idx = table.rows.length - 1;
    if (table.rows.length > 1) {
        table.deleteRow(idx);
    }
    Calcular_Prestamo_Cancelable_Total();
}
function AgregarPrestamoCancelable() {
    var table = document.getElementById("tablaPrestamoCancelable");
    var idx = table.rows.length;
    var row = table.insertRow(idx);
    idx = idx - 1;
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    //var cell4 = row.insertCell(3);
    //var cell5 = row.insertCell(4);
    var cell6 = row.insertCell(3);

    var TEM = retornarTEM(TEAPC);
    TEM = Number(TEM).toFixed(4);

    cell1.innerHTML = '<div><input class="form-control" type="text" id="PC_Banco_' + idx + '"/></div>';
    cell2.innerHTML = '<div><input class="form-control" type="text" id="PC_Monto_' + idx + '" onkeyup="validarNumero(id);Calcular_Prestamo_Cancelable_Total();"/></div>';
    cell3.innerHTML = '<div><input class="form-control" type="text" id="PC_Periodo_' + idx + '" onkeyup="validarNumero(id);"/></div>';
    var cell4 = '<div style="display:none" id="PC_TEA_' + idx + '">' + TEAPC * 100 + '%</div>';
    var cell5 = '<div style="display:none" id="PC_TEM_' + idx + '">' + Number(TEM * 100).toFixed(2) + '%</div>';
    cell6.innerHTML = cell4 + cell5 + '<div id="PC_Costo_Financiero_' + idx + '"></div>';
}
function Calcular_Prestamo_Cancelable(idx) {
    var PC_Monto = convNro(document.getElementById("PC_Monto_" + idx).value);

    var TEM = retornarTEM(TEAPC);

    var PC_Costo_Financiero = PC_Monto * TEM;
    PC_Costo_Financiero = Number(PC_Costo_Financiero).toFixed(2);
    document.getElementById("PC_Costo_Financiero_" + idx).innerHTML = Number(PC_Costo_Financiero).toLocaleString('en');
    document.getElementById("PC_Costo_Financiero_" + idx).value = PC_Costo_Financiero;
}
function Calcular_Prestamo_Cancelable_Total() {
    var table = document.getElementById("tablaPrestamoCancelable");
    var filas = table.rows.length - 1;

    for (var idx = 0; idx < filas; idx++) {
        Calcular_Prestamo_Cancelable(idx);
    }
    Calcular_Resumen();
}
function EliminarPrestamoAdquisicion() {
    var table = document.getElementById("tablaPrestamoAdquisicion");
    var idx = table.rows.length - 1;
    if (table.rows.length > 1) {
        table.deleteRow(idx);
    }
    Calcular_Prestamo_Adquisicion_Total();
}
function AgregarPrestamoAdquisicion() {
    var table = document.getElementById("tablaPrestamoAdquisicion");
    var idx = table.rows.length;
    var row = table.insertRow(idx);
    idx = idx - 1;
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    //var cell4 = row.insertCell(3);
    //var cell5 = row.insertCell(4);
    var cell6 = row.insertCell(3);
    var cell7 = row.insertCell(4);
    var cell8 = row.insertCell(5);
    var cell9 = row.insertCell(6);

    var TEM = retornarTEM(TEAPA);
    TEM = Number(TEM).toFixed(4);

    cell1.innerHTML = '<div><input class="form-control" type="text" id="PA_Banco_' + idx + '"/></div>';
    cell2.innerHTML = '<div><input class="form-control" type="text" id="PA_Mes_Anterior_' + idx + '" onkeyup="validarNumero(id);Calcular_Prestamo_Adquisicion_Total()"/></div>';
    cell3.innerHTML = '<div><input class="form-control" type="text" id="PA_Mes_Actual_' + idx + '" onkeyup="validarNumero(id);Calcular_Prestamo_Adquisicion_Total()"/></div>';
    var cell4 = '<div style="display:none" id="PA_TEA_' + idx + '">' + TEAPA * 100 + '%</div>';
    var cell5 = '<div style="display:none" id="PA_TEM_' + idx + '">' + Number(TEM * 100).toFixed(2) + '%</div>';
    cell6.innerHTML = cell4 + '<div id="PA_Amort_Capital_' + idx + '"></div>';
    cell7.innerHTML = cell5 + '<div id="PA_Costo_Financiero_' + idx + '"></div>';
    cell8.innerHTML = '<div id="PA_Cuota_Pagar_Aprox_' + idx + '"></div>';
    cell9.innerHTML = '<div id="PA_Nro_Cuota_' + idx + '"></div>';
}
function Calcular_Prestamo_Adquisicion(idx) {
    var PA_Mes_Anterior = convNro(document.getElementById("PA_Mes_Anterior_" + idx).value);
    var PA_Mes_Actual = convNro(document.getElementById("PA_Mes_Actual_" + idx).value);

    var PA_Amort_Capital = PA_Mes_Anterior - PA_Mes_Actual;
    document.getElementById("PA_Amort_Capital_" + idx).innerHTML = Number(PA_Amort_Capital).toLocaleString('en');
    document.getElementById("PA_Amort_Capital_" + idx).value = PA_Amort_Capital;

    var TEM = retornarTEM(TEAPA);
    var PA_Costo_Financiero = PA_Mes_Anterior * TEM;
    PA_Costo_Financiero = Number(PA_Costo_Financiero).toFixed(0);
    document.getElementById("PA_Costo_Financiero_" + idx).innerHTML = Number(PA_Costo_Financiero).toLocaleString('en');
    document.getElementById("PA_Costo_Financiero_" + idx).value = PA_Costo_Financiero;
    PA_Amort_Capital = Number(PA_Amort_Capital);
    PA_Costo_Financiero = Number(PA_Costo_Financiero);
    var PA_Cuota_Pagar_Aprox = PA_Amort_Capital + PA_Costo_Financiero;
    PA_Cuota_Pagar_Aprox = Number(PA_Cuota_Pagar_Aprox).toFixed(0);
    document.getElementById("PA_Cuota_Pagar_Aprox_" + idx).innerHTML = Number(PA_Cuota_Pagar_Aprox).toLocaleString('en');
    document.getElementById("PA_Cuota_Pagar_Aprox_" + idx).value = PA_Cuota_Pagar_Aprox;

    var PA_Nro_Cuota = CalcularNroCuotas(PA_Mes_Anterior, TEM, PA_Cuota_Pagar_Aprox, PA_Mes_Actual);
    document.getElementById("PA_Nro_Cuota_" + idx).innerHTML = Number(PA_Nro_Cuota).toLocaleString('en');
    document.getElementById("PA_Nro_Cuota_" + idx).value = PA_Nro_Cuota;
}
function Calcular_Prestamo_Adquisicion_Total() {
    var table = document.getElementById("tablaPrestamoAdquisicion");
    var filas = table.rows.length - 1;

    for (var idx = 0; idx < filas; idx++) {
        Calcular_Prestamo_Adquisicion(idx);
    }
    Calcular_Resumen();
}
function EliminarPrestamoPersonal() {
    var table = document.getElementById("tablaPrestamoPersonal");
    var idx = table.rows.length - 1;
    if (table.rows.length > 1) {
        table.deleteRow(idx);
    }
    Calcular_Prestamo_Personal_Total();
}
function AgregarPrestamoPersonal() {
    var table = document.getElementById("tablaPrestamoPersonal");
    var idx = table.rows.length;
    var row = table.insertRow(idx);
    idx = idx - 1;
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    //var cell5 = row.insertCell(4);
    //var cell6 = row.insertCell(5);
    var cell7 = row.insertCell(4);
    var cell8 = row.insertCell(5);
    var cell9 = row.insertCell(6);
    var cell10 = row.insertCell(7);

    cell1.innerHTML = '<div><input class="form-control" type="text" id="PP_Banco_' + idx + '"/></div>';
    cell2.innerHTML = '<div><select class="form-control" id="PP_Producto_' + idx + '" onchange = "Calcular_Prestamo_Personal_Total();"/><option value = "0"></option> <option value = "1">Vehicular</option> <option value = "2">Hipotecario</option> <option value = "3">Libre Disponibilidad</option> </select> </div>';
    cell3.innerHTML = '<div><input class="form-control" type="text" id="PP_Mes_Anterior_' + idx + '" onkeyup="validarNumero(id);Calcular_Prestamo_Comercial_Total()"/></div>';
    cell3.innerHTML = '<div><input class="form-control" type="text" id="PP_Mes_Anterior_' + idx + '" onkeyup="validarNumero(id);Calcular_Prestamo_Personal_Total()"/></div>';
    cell4.innerHTML = '<div><input class="form-control" type="text" id="PP_Mes_Actual_' + idx + '" onkeyup="validarNumero(id);Calcular_Prestamo_Personal_Total()"/></div>';
    var cell5 = '<div style="display:none" id="PP_TEA_' + idx + '"></div>';
    var cell6 = '<div style="display:none" id="PP_TEM_' + idx + '"></div>';
    cell7.innerHTML = cell5 + '<div id="PP_Amort_Capital_' + idx + '"></div>';
    cell8.innerHTML = cell6 + '<div id="PP_Costo_Financiero_' + idx + '"></div>';
    cell9.innerHTML = '<div id="PP_Cuota_Pagar_Aprox_' + idx + '"></div>';
    cell10.innerHTML = '<div id="PP_Nro_Cuota_' + idx + '"></div>';
}
function Calcular_Prestamo_Personal(idx) {
    var producto = document.getElementById("PP_Producto_" + idx).value;
    if (producto != 0) {
        var TEA = 0;
        if (producto == 1) {
            TEA = TEAPPVehicular;
        } else if (producto == 2) {
            TEA = TEAPPHipotecario;
        } else if (producto == 3) {
            TEA = TEAPPLibre;
        }
        var TEM = retornarTEM(TEA);
        document.getElementById("PP_TEM_" + idx).value = TEM;
        document.getElementById("PP_TEM_" + idx).innerHTML = Number(TEM * 100).toFixed(2) + "%";

        document.getElementById("PP_TEA_" + idx).value = TEA;
        document.getElementById("PP_TEA_" + idx).innerHTML = Number(TEA * 100).toFixed(2) + "%";

        var PP_Mes_Anterior = convNro(document.getElementById("PP_Mes_Anterior_" + idx).value);
        var PP_Mes_Actual = convNro(document.getElementById("PP_Mes_Actual_" + idx).value);

        var PP_Amort_Capital = PP_Mes_Anterior - PP_Mes_Actual;
        document.getElementById("PP_Amort_Capital_" + idx).innerHTML = Number(PP_Amort_Capital).toLocaleString('en');
        document.getElementById("PP_Amort_Capital_" + idx).value = PP_Amort_Capital;

        TEM = Number(TEM);

        var PP_Costo_Financiero = PP_Mes_Anterior * TEM;
        PP_Costo_Financiero = Number(PP_Costo_Financiero).toFixed(0);
        document.getElementById("PP_Costo_Financiero_" + idx).innerHTML = Number(PP_Costo_Financiero).toLocaleString('en');
        document.getElementById("PP_Costo_Financiero_" + idx).value = PP_Costo_Financiero;
        PP_Amort_Capital = Number(PP_Amort_Capital);
        PP_Costo_Financiero = Number(PP_Costo_Financiero);
        var PP_Cuota_Pagar_Aprox = PP_Amort_Capital + PP_Costo_Financiero;
        PP_Cuota_Pagar_Aprox = Number(PP_Cuota_Pagar_Aprox).toFixed(0);
        document.getElementById("PP_Cuota_Pagar_Aprox_" + idx).innerHTML = Number(PP_Cuota_Pagar_Aprox).toLocaleString('en');
        document.getElementById("PP_Cuota_Pagar_Aprox_" + idx).value = PP_Cuota_Pagar_Aprox;

        var PP_Nro_Cuota = CalcularNroCuotas(PP_Mes_Anterior, TEM, PP_Cuota_Pagar_Aprox, PP_Mes_Actual);
        document.getElementById("PP_Nro_Cuota_" + idx).innerHTML = Number(PP_Nro_Cuota).toLocaleString('en');
        document.getElementById("PP_Nro_Cuota_" + idx).value = PP_Nro_Cuota;

    } else {
        document.getElementById("PP_TEM_" + idx).value = 0;
        document.getElementById("PP_TEM_" + idx).innerHTML = "";

        document.getElementById("PP_TEA_" + idx).value = 0;
        document.getElementById("PP_TEA_" + idx).innerHTML = "";

        document.getElementById("PP_Amort_Capital_" + idx).innerHTML = "";
        document.getElementById("PP_Amort_Capital_" + idx).value = 0;

        document.getElementById("PP_Costo_Financiero_" + idx).innerHTML = "";
        document.getElementById("PP_Costo_Financiero_" + idx).value = 0;

        document.getElementById("PP_Cuota_Pagar_Aprox_" + idx).innerHTML = "";
        document.getElementById("PP_Cuota_Pagar_Aprox_" + idx).value = 0;
    }
}
function Calcular_Prestamo_Personal_Total() {
    var table = document.getElementById("tablaPrestamoPersonal");
    var filas = table.rows.length - 1;

    for (var idx = 0; idx < filas; idx++) {
        Calcular_Prestamo_Personal(idx);
    }
    Calcular_Resumen();
}
function EliminarTarjetaConsumo() {
    var table = document.getElementById("tablaTarjetaConsumo");
    var idx = table.rows.length - 1;
    if (table.rows.length > 1) {
        table.deleteRow(idx);
    }
    Calcular_Tarjeta_Consumo_Total();
}
function AgregarTarjetaConsumo() {
    var table = document.getElementById("tablaTarjetaConsumo");
    var idx = table.rows.length;
    var row = table.insertRow(idx);
    idx = idx - 1;
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    //var cell4 = row.insertCell(3);
    //var cell5 = row.insertCell(4);
    var cell6 = row.insertCell(3);
    var cell7 = row.insertCell(4);
    var TEM = retornarTEM(TEATC);
    TEM = Number(TEM).toFixed(4);
    cell1.innerHTML = '<div><input class="form-control" type="text" id="TC_Banco_' + idx + '"/></div>';
    cell2.innerHTML = '<div><input class="form-control" type="text" id="TC_Linea_Utilizada_' + idx + '" onkeyup="validarNumero(id);Calcular_Tarjeta_Consumo_Total();"/></div>';
    cell3.innerHTML = '<div><input class="form-control" type="text" id="TC_Linea_Total_' + idx + '" onkeyup="validarNumero(id);Calcular_Tarjeta_Consumo_Total();"/></div>';
    var cell4 = '<div style="display:none" id="TC_TEA_' + idx + '">' + TEATC * 100 + '%</div>';
    var cell5 = '<div style="display:none" id="TC_TEM_' + idx + '">' + TEM * 100 + '%</div>';
    cell6.innerHTML = cell4 + '<div id="TC_Costo_Financiero_' + idx + '"></div>';
    cell7.innerHTML = cell5 + '<div id="TC_Costo_Aprox_Pagar_' + idx + '"></div>';
}
function Calcular_Tarjeta_Consumo(idx) {
    var TC_Linea_Utilizada = convNro(document.getElementById("TC_Linea_Utilizada_" + idx).value);
    var TC_Linea_Total = convNro(document.getElementById("TC_Linea_Total_" + idx).value);

    var TEM = retornarTEM(TEATC);

    var TC_Costo_Financiero = (TC_Linea_Utilizada * TEM) + ((TC_Linea_Total - TC_Linea_Utilizada) * TEM * 0.36);
    TC_Costo_Financiero = Number(TC_Costo_Financiero).toFixed(0);

    var TC_Costo_Aprox_Pagar = 0;
    if (TC_Linea_Total != 0) {
        var p1 = Calcular_Cuota_Pagar(TEM, 36, TC_Linea_Utilizada);
        var p2 = Calcular_Cuota_Pagar(TEM, 36, (TC_Linea_Total - TC_Linea_Utilizada)) * 0.36;
        p1 = Number(p1);
        p2 = Number(p2);
        TC_Costo_Financiero = Number(TC_Costo_Financiero);
        var p3 = p1 + p2 + TC_Costo_Financiero;

        TC_Costo_Aprox_Pagar = Number(p3).toFixed(0);

    }


    document.getElementById("TC_Costo_Financiero_" + idx).innerHTML = Number(TC_Costo_Financiero).toLocaleString('en');
    document.getElementById("TC_Costo_Financiero_" + idx).value = TC_Costo_Financiero;
    document.getElementById("TC_Costo_Aprox_Pagar_" + idx).innerHTML = Number(TC_Costo_Aprox_Pagar).toLocaleString('en');
    document.getElementById("TC_Costo_Aprox_Pagar_" + idx).value = TC_Costo_Aprox_Pagar;
}
function Calcular_Tarjeta_Consumo_Total() {
    var table = document.getElementById("tablaTarjetaConsumo");
    var filas = table.rows.length - 1;

    for (var idx = 0; idx < filas; idx++) {
        Calcular_Tarjeta_Consumo(idx);
    }
    Calcular_Resumen();
}
function Calcular_Resumen() {
    var LTC_table = document.getElementById("tablaLineaTarjetaCapital");
    var LTC_filas = LTC_table.rows.length - 1;
    var PCCT_table = document.getElementById("tablaPrestamoComercial");
    var PCCT_filas = PCCT_table.rows.length - 1;
    var PC_table = document.getElementById("tablaPrestamoCancelable");
    var PC_filas = PC_table.rows.length - 1;
    var PA_table = document.getElementById("tablaPrestamoAdquisicion");
    var PA_filas = PA_table.rows.length - 1;
    var TC_table = document.getElementById("tablaTarjetaConsumo");
    var TC_filas = TC_table.rows.length - 1;
    var PP_table = document.getElementById("tablaPrestamoPersonal");
    var PP_filas = PP_table.rows.length - 1;

    var S1 = 0;
    var LTC_S1 = 0;
    for (var idx = 0; idx < LTC_filas; idx++) {
        LTC_S1 = LTC_S1 + convNro(document.getElementById("LTC_Linea_Total_" + idx).value);
    }
    var PCCT_S1 = 0;
    for (var idx = 0; idx < PCCT_filas; idx++) {
        PCCT_S1 = PCCT_S1 + convNro(document.getElementById("PCCT_Mes_Actual_" + idx).value);
    }
    var PC_S1 = 0;
    for (var idx = 0; idx < PC_filas; idx++) {
        PC_S1 = PC_S1 + convNro(document.getElementById("PC_Monto_" + idx).value);
    }
    S1 = LTC_S1 + PCCT_S1 + PC_S1;

    var S2 = 0;
    var PA_S2 = 0;
    for (var idx = 0; idx < PA_filas; idx++) {
        PA_S2 = PA_S2 + convNro(document.getElementById("PA_Mes_Actual_" + idx).value);
    }
    S2 = PA_S2;

    var S3 = 0;
    var TC_S3 = 0;
    for (var idx = 0; idx < TC_filas; idx++) {
        TC_S3 = TC_S3 + convNro(document.getElementById("TC_Linea_Total_" + idx).value);
    }

    var PP_S3 = 0;
    for (var idx = 0; idx < PP_filas; idx++) {
        PP_S3 = PP_S3 + convNro(document.getElementById("PP_Mes_Actual_" + idx).value);
    }
    S3 = TC_S3 + PP_S3;



    var S4 = 0;
    var LTC_S4 = 0;
    for (var idx = 0; idx < LTC_filas; idx++) {
        LTC_S4 = LTC_S4 + convNro(document.getElementById("LTC_Costo_Aprox_Pagar_" + idx).value);
    }

    var PCCT_S4 = 0;
    for (var idx = 0; idx < PCCT_filas; idx++) {
        PCCT_S4 = PCCT_S4 + convNro(document.getElementById("PCCT_Cuota_Pagar_Aprox_" + idx).value);
    }
    S4 = LTC_S4 + PCCT_S4;

    var S5 = 0;
    var PA_S5 = 0;
    for (var idx = 0; idx < PA_filas; idx++) {
        PA_S5 = PA_S5 + convNro(document.getElementById("PA_Cuota_Pagar_Aprox_" + idx).value);
    }
    S5 = PA_S5;

    var S6 = 0;
    var TC_S6 = 0;
    for (var idx = 0; idx < TC_filas; idx++) {
        TC_S6 = TC_S6 + convNro(document.getElementById("TC_Costo_Aprox_Pagar_" + idx).value);
    }
    var PP_S6 = 0;
    for (var idx = 0; idx < PP_filas; idx++) {
        PP_S6 = PP_S6 + convNro(document.getElementById("PP_Cuota_Pagar_Aprox_" + idx).value);
    }

    S6 = convNro(TC_S6) + convNro(PP_S6);

    var S7 = 0;
    var LTC_S7 = 0;
    for (var idx = 0; idx < LTC_filas; idx++) {
        LTC_S7 = LTC_S7 + convNro(document.getElementById("LTC_Costo_Financiero_" + idx).value);
    }

    var PCCT_S7 = 0;
    for (var idx = 0; idx < PCCT_filas; idx++) {
        PCCT_S7 = PCCT_S7 + convNro(document.getElementById("PCCT_Costo_Financiero_" + idx).value);
    }
    
    var PC_S7 = 0;
    for (var idx = 0; idx < PC_filas; idx++) {
        PC_S7 = PC_S7 + convNro(document.getElementById("PC_Costo_Financiero_" + idx).value);
    }
    S7 = LTC_S7 + PCCT_S7 + PC_S7;

    var S8 = 0;
    var PA_S8 = 0;
    for (var idx = 0; idx < PA_filas; idx++) {
        PA_S8 = PA_S8 + convNro(document.getElementById("PA_Costo_Financiero_" + idx).value);
    }
    S8 = PA_S8;

    var S9 = 0;
    var TC_S9 = 0;
    for (var idx = 0; idx < TC_filas; idx++) {
        TC_S9 = TC_S9 + convNro(document.getElementById("TC_Costo_Financiero_" + idx).value);
    }

    var PP_S9 = 0;
    for (var idx = 0; idx < PP_filas; idx++) {
        PP_S9 = PP_S9 + convNro(document.getElementById("PP_Costo_Financiero_" + idx).value);
    }
    S9 = TC_S9 + PP_S9;

    document.getElementById("S1").value = S1;
    document.getElementById("S1").innerHTML = Number(Number(S1).toFixed(0)).toLocaleString('en');
    document.getElementById("S2").value = S2;
    document.getElementById("S2").innerHTML = Number(Number(S2).toFixed(0)).toLocaleString('en');
    document.getElementById("S3").value = S3;
    document.getElementById("S3").innerHTML = Number(Number(S3).toFixed(0)).toLocaleString('en');

    document.getElementById("S4").value = S4;
    document.getElementById("S4").innerHTML = Number(Number(S4).toFixed(0)).toLocaleString('en');
    document.getElementById("S5").value = S5;
    document.getElementById("S5").innerHTML = Number(Number(S5).toFixed(0)).toLocaleString('en');
    document.getElementById("S6").value = S6;
    document.getElementById("S6").innerHTML = Number(Number(S6).toFixed(0)).toLocaleString('en');

    document.getElementById("S7").value = S7;
    document.getElementById("S7").innerHTML = Number(Number(S7).toFixed(0)).toLocaleString('en');
    document.getElementById("S8").value = S8;
    document.getElementById("S8").innerHTML = Number(Number(S8).toFixed(0)).toLocaleString('en');
    document.getElementById("S9").value = S9;
    document.getElementById("S9").innerHTML = Number(Number(S9).toFixed(0)).toLocaleString('en');


    document.getElementById("deuda_personal").value = S6;
    document.getElementById("deuda_personal").innerHTML = Number(Number(S6).toFixed(0)).toLocaleString('en');
    calcular_gastopersonal();
}

    //var cell6 = row.insertCell(5);
    var cell7 = row.insertCell(4);
    var cell8 = row.insertCell(5);
    var cell9 = row.insertCell(6);
    var cell10 = row.insertCell(7);

    cell1.innerHTML = '<div><input class="form-control" type="text" id="PP_Banco_' + idx + '"/></div>';
    cell2.innerHTML = '<div><select class="form-control" id="PP_Producto_' + idx + '" onchange = "Calcular_Prestamo_Personal_Total();"/><option value = "0"></option> <option value = "1">Vehicular</option> <option value = "2">Hipotecario</option> <option value = "3">Libre Disponibilidad</option> </select> </div>';
    cell3.innerHTML = '<div><input class="form-control" type="text" id="PP_Mes_Anterior_' + idx + '" onkeyup="validarNumero(id);Calcular_Prestamo_Comercial_Total()"/></div>';
    cell3.innerHTML = '<div><input class="form-control" type="text" id="PP_Mes_Anterior_' + idx + '" onkeyup="validarNumero(id);Calcular_Prestamo_Personal_Total()"/></div>';
    cell4.innerHTML = '<div><input class="form-control" type="text" id="PP_Mes_Actual_' + idx + '" onkeyup="validarNumero(id);Calcular_Prestamo_Personal_Total()"/></div>';
    var cell5 = '<div style="display:none" id="PP_TEA_' + idx + '"></div>';
    var cell6 = '<div style="display:none" id="PP_TEM_' + idx + '"></div>';
    cell7.innerHTML = cell5 + '<div id="PP_Amort_Capital_' + idx + '"></div>';
    cell8.innerHTML = cell6 + '<div id="PP_Costo_Financiero_' + idx + '"></div>';
    cell9.innerHTML = '<div id="PP_Cuota_Pagar_Aprox_' + idx + '"></div>';
    cell10.innerHTML = '<div id="PP_Nro_Cuota_' + idx + '"></div>';
}
function Calcular_Prestamo_Personal(idx) {
    var producto = document.getElementById("PP_Producto_" + idx).value;
    if (producto != 0) {
        var TEA = 0;
        if (producto == 1) {
            TEA = TEAPPVehicular;
        } else if (producto == 2) {
            TEA = TEAPPHipotecario;
        } else if (producto == 3) {
            TEA = TEAPPLibre;
        }
        var TEM = retornarTEM(TEA);
        document.getElementById("PP_TEM_" + idx).value = TEM;
        document.getElementById("PP_TEM_" + idx).innerHTML = Number(TEM * 100).toFixed(2) + "%";

        document.getElementById("PP_TEA_" + idx).value = TEA;
        document.getElementById("PP_TEA_" + idx).innerHTML = Number(TEA * 100).toFixed(2) + "%";

        var PP_Mes_Anterior = convNro(document.getElementById("PP_Mes_Anterior_" + idx).value);
        var PP_Mes_Actual = convNro(document.getElementById("PP_Mes_Actual_" + idx).value);

        var PP_Amort_Capital = PP_Mes_Anterior - PP_Mes_Actual;
        document.getElementById("PP_Amort_Capital_" + idx).innerHTML = Number(PP_Amort_Capital).toLocaleString('en');
        document.getElementById("PP_Amort_Capital_" + idx).value = PP_Amort_Capital;

        TEM = Number(TEM);

        var PP_Costo_Financiero = PP_Mes_Anterior * TEM;
        PP_Costo_Financiero = Number(PP_Costo_Financiero).toFixed(0);
        document.getElementById("PP_Costo_Financiero_" + idx).innerHTML = Number(PP_Costo_Financiero).toLocaleString('en');
        document.getElementById("PP_Costo_Financiero_" + idx).value = PP_Costo_Financiero;
        PP_Amort_Capital = Number(PP_Amort_Capital);
        PP_Costo_Financiero = Number(PP_Costo_Financiero);
        var PP_Cuota_Pagar_Aprox = PP_Amort_Capital + PP_Costo_Financiero;
        PP_Cuota_Pagar_Aprox = Number(PP_Cuota_Pagar_Aprox).toFixed(0);
        document.getElementById("PP_Cuota_Pagar_Aprox_" + idx).innerHTML = Number(PP_Cuota_Pagar_Aprox).toLocaleString('en');
        document.getElementById("PP_Cuota_Pagar_Aprox_" + idx).value = PP_Cuota_Pagar_Aprox;

        var PP_Nro_Cuota = CalcularNroCuotas(PP_Mes_Anterior, TEM, PP_Cuota_Pagar_Aprox, PP_Mes_Actual);
        document.getElementById("PP_Nro_Cuota_" + idx).innerHTML = Number(PP_Nro_Cuota).toLocaleString('en');
        document.getElementById("PP_Nro_Cuota_" + idx).value = PP_Nro_Cuota;

    } else {
        document.getElementById("PP_TEM_" + idx).value = 0;
        document.getElementById("PP_TEM_" + idx).innerHTML = "";

        document.getElementById("PP_TEA_" + idx).value = 0;
        document.getElementById("PP_TEA_" + idx).innerHTML = "";

        document.getElementById("PP_Amort_Capital_" + idx).innerHTML = "";
        document.getElementById("PP_Amort_Capital_" + idx).value = 0;

        document.getElementById("PP_Costo_Financiero_" + idx).innerHTML = "";
        document.getElementById("PP_Costo_Financiero_" + idx).value = 0;

        document.getElementById("PP_Cuota_Pagar_Aprox_" + idx).innerHTML = "";
        document.getElementById("PP_Cuota_Pagar_Aprox_" + idx).value = 0;
    }
}
function Calcular_Prestamo_Personal_Total() {
    var table = document.getElementById("tablaPrestamoPersonal");
    var filas = table.rows.length - 1;

    for (var idx = 0; idx < filas; idx++) {
        Calcular_Prestamo_Personal(idx);
    }
    Calcular_Resumen();
}
function EliminarTarjetaConsumo() {
    var table = document.getElementById("tablaTarjetaConsumo");
    var idx = table.rows.length - 1;
    if (table.rows.length > 1) {
        table.deleteRow(idx);
    }
    Calcular_Tarjeta_Consumo_Total();
}
function AgregarTarjetaConsumo() {
    var table = document.getElementById("tablaTarjetaConsumo");
    var idx = table.rows.length;
    var row = table.insertRow(idx);
    idx = idx - 1;
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    //var cell4 = row.insertCell(3);
    //var cell5 = row.insertCell(4);
    var cell6 = row.insertCell(3);
    var cell7 = row.insertCell(4);
    var TEM = retornarTEM(TEATC);
    TEM = Number(TEM).toFixed(4);
    cell1.innerHTML = '<div><input class="form-control" type="text" id="TC_Banco_' + idx + '"/></div>';
    cell2.innerHTML = '<div><input class="form-control" type="text" id="TC_Linea_Utilizada_' + idx + '" onkeyup="validarNumero(id);Calcular_Tarjeta_Consumo_Total();"/></div>';
    cell3.innerHTML = '<div><input class="form-control" type="text" id="TC_Linea_Total_' + idx + '" onkeyup="validarNumero(id);Calcular_Tarjeta_Consumo_Total();"/></div>';
    var cell4 = '<div style="display:none" id="TC_TEA_' + idx + '">' + TEATC * 100 + '%</div>';
    var cell5 = '<div style="display:none" id="TC_TEM_' + idx + '">' + TEM * 100 + '%</div>';
    cell6.innerHTML = cell4 + '<div id="TC_Costo_Financiero_' + idx + '"></div>';
    cell7.innerHTML = cell5 + '<div id="TC_Costo_Aprox_Pagar_' + idx + '"></div>';
}
function Calcular_Tarjeta_Consumo(idx) {
    var TC_Linea_Utilizada = convNro(document.getElementById("TC_Linea_Utilizada_" + idx).value);
    var TC_Linea_Total = convNro(document.getElementById("TC_Linea_Total_" + idx).value);

    var TEM = retornarTEM(TEATC);

    var TC_Costo_Financiero = (TC_Linea_Utilizada * TEM) + ((TC_Linea_Total - TC_Linea_Utilizada) * TEM * 0.36);
    TC_Costo_Financiero = Number(TC_Costo_Financiero).toFixed(0);

    var TC_Costo_Aprox_Pagar = 0;
    if (TC_Linea_Total != 0) {
        var p1 = Calcular_Cuota_Pagar(TEM, 36, TC_Linea_Utilizada);
        var p2 = Calcular_Cuota_Pagar(TEM, 36, (TC_Linea_Total - TC_Linea_Utilizada)) * 0.36;
        p1 = Number(p1);
        p2 = Number(p2);
        TC_Costo_Financiero = Number(TC_Costo_Financiero);
        var p3 = p1 + p2 + TC_Costo_Financiero;

        TC_Costo_Aprox_Pagar = Number(p3).toFixed(0);

    }


    document.getElementById("TC_Costo_Financiero_" + idx).innerHTML = Number(TC_Costo_Financiero).toLocaleString('en');
    document.getElementById("TC_Costo_Financiero_" + idx).value = TC_Costo_Financiero;
    document.getElementById("TC_Costo_Aprox_Pagar_" + idx).innerHTML = Number(TC_Costo_Aprox_Pagar).toLocaleString('en');
    document.getElementById("TC_Costo_Aprox_Pagar_" + idx).value = TC_Costo_Aprox_Pagar;
}
function Calcular_Tarjeta_Consumo_Total() {
    var table = document.getElementById("tablaTarjetaConsumo");
    var filas = table.rows.length - 1;

    for (var idx = 0; idx < filas; idx++) {
        Calcular_Tarjeta_Consumo(idx);
    }
    Calcular_Resumen();
}
function Calcular_Resumen() {
    var LTC_table = document.getElementById("tablaLineaTarjetaCapital");
    var LTC_filas = LTC_table.rows.length - 1;
    var PCCT_table = document.getElementById("tablaPrestamoComercial");
    var PCCT_filas = PCCT_table.rows.length - 1;
    var PC_table = document.getElementById("tablaPrestamoCancelable");
    var PC_filas = PC_table.rows.length - 1;
    var PA_table = document.getElementById("tablaPrestamoAdquisicion");
    var PA_filas = PA_table.rows.length - 1;
    var TC_table = document.getElementById("tablaTarjetaConsumo");
    var TC_filas = TC_table.rows.length - 1;
    var PP_table = document.getElementById("tablaPrestamoPersonal");
    var PP_filas = PP_table.rows.length - 1;

    var S1 = 0;
    var LTC_S1 = 0;
    for (var idx = 0; idx < LTC_filas; idx++) {
        LTC_S1 = LTC_S1 + convNro(document.getElementById("LTC_Linea_Total_" + idx).value);
    }
    var PCCT_S1 = 0;
    for (var idx = 0; idx < PCCT_filas; idx++) {
        PCCT_S1 = PCCT_S1 + convNro(document.getElementById("PCCT_Mes_Actual_" + idx).value);
    }
    var PC_S1 = 0;
    for (var idx = 0; idx < PC_filas; idx++) {
        PC_S1 = PC_S1 + convNro(document.getElementById("PC_Monto_" + idx).value);
    }
    S1 = LTC_S1 + PCCT_S1 + PC_S1;

    var S2 = 0;
    var PA_S2 = 0;
    for (var idx = 0; idx < PA_filas; idx++) {
        PA_S2 = PA_S2 + convNro(document.getElementById("PA_Mes_Actual_" + idx).value);
    }
    S2 = PA_S2;

    var S3 = 0;
    var TC_S3 = 0;
    for (var idx = 0; idx < TC_filas; idx++) {
        TC_S3 = TC_S3 + convNro(document.getElementById("TC_Linea_Total_" + idx).value);
    }

    var PP_S3 = 0;
    for (var idx = 0; idx < PP_filas; idx++) {
        PP_S3 = PP_S3 + convNro(document.getElementById("PP_Mes_Actual_" + idx).value);
    }
    S3 = TC_S3 + PP_S3;



    var S4 = 0;
    var LTC_S4 = 0;
    for (var idx = 0; idx < LTC_filas; idx++) {
        LTC_S4 = LTC_S4 + convNro(document.getElementById("LTC_Costo_Aprox_Pagar_" + idx).value);
    }

    var PCCT_S4 = 0;
    for (var idx = 0; idx < PCCT_filas; idx++) {
        PCCT_S4 = PCCT_S4 + convNro(document.getElementById("PCCT_Cuota_Pagar_Aprox_" + idx).value);
    }
    S4 = LTC_S4 + PCCT_S4;

    var S5 = 0;
    var PA_S5 = 0;
    for (var idx = 0; idx < PA_filas; idx++) {
        PA_S5 = PA_S5 + convNro(document.getElementById("PA_Cuota_Pagar_Aprox_" + idx).value);
    }
    S5 = PA_S5;

    var S6 = 0;
    var TC_S6 = 0;
    for (var idx = 0; idx < TC_filas; idx++) {
        TC_S6 = TC_S6 + convNro(document.getElementById("TC_Costo_Aprox_Pagar_" + idx).value);
    }
    var PP_S6 = 0;
    for (var idx = 0; idx < PP_filas; idx++) {
        PP_S6 = PP_S6 + convNro(document.getElementById("PP_Cuota_Pagar_Aprox_" + idx).value);
    }

    S6 = convNro(TC_S6) + convNro(PP_S6);

    var S7 = 0;
    var LTC_S7 = 0;
    for (var idx = 0; idx < LTC_filas; idx++) {
        LTC_S7 = LTC_S7 + convNro(document.getElementById("LTC_Costo_Financiero_" + idx).value);
    }

    var PCCT_S7 = 0;
    for (var idx = 0; idx < PCCT_filas; idx++) {
        PCCT_S7 = PCCT_S7 + convNro(document.getElementById("PCCT_Costo_Financiero_" + idx).value);
    }
    
    var PC_S7 = 0;
    for (var idx = 0; idx < PC_filas; idx++) {
        PC_S7 = PC_S7 + convNro(document.getElementById("PC_Costo_Financiero_" + idx).value);
    }
    S7 = LTC_S7 + PCCT_S7 + PC_S7;

    var S8 = 0;
    var PA_S8 = 0;
    for (var idx = 0; idx < PA_filas; idx++) {
        PA_S8 = PA_S8 + convNro(document.getElementById("PA_Costo_Financiero_" + idx).value);
    }
    S8 = PA_S8;

    var S9 = 0;
    var TC_S9 = 0;
    for (var idx = 0; idx < TC_filas; idx++) {
        TC_S9 = TC_S9 + convNro(document.getElementById("TC_Costo_Financiero_" + idx).value);
    }

    var PP_S9 = 0;
    for (var idx = 0; idx < PP_filas; idx++) {
        PP_S9 = PP_S9 + convNro(document.getElementById("PP_Costo_Financiero_" + idx).value);
    }
    S9 = TC_S9 + PP_S9;

    document.getElementById("S1").value = S1;
    document.getElementById("S1").innerHTML = Number(Number(S1).toFixed(0)).toLocaleString('en');
    document.getElementById("S2").value = S2;
    document.getElementById("S2").innerHTML = Number(Number(S2).toFixed(0)).toLocaleString('en');
    document.getElementById("S3").value = S3;
    document.getElementById("S3").innerHTML = Number(Number(S3).toFixed(0)).toLocaleString('en');

    document.getElementById("S4").value = S4;
    document.getElementById("S4").innerHTML = Number(Number(S4).toFixed(0)).toLocaleString('en');
    document.getElementById("S5").value = S5;
    document.getElementById("S5").innerHTML = Number(Number(S5).toFixed(0)).toLocaleString('en');
    document.getElementById("S6").value = S6;
    document.getElementById("S6").innerHTML = Number(Number(S6).toFixed(0)).toLocaleString('en');

    document.getElementById("S7").value = S7;
    document.getElementById("S7").innerHTML = Number(Number(S7).toFixed(0)).toLocaleString('en');
    document.getElementById("S8").value = S8;
    document.getElementById("S8").innerHTML = Number(Number(S8).toFixed(0)).toLocaleString('en');
    document.getElementById("S9").value = S9;
    document.getElementById("S9").innerHTML = Number(Number(S9).toFixed(0)).toLocaleString('en');


    document.getElementById("deuda_personal").value = S6;
    document.getElementById("deuda_personal").innerHTML = Number(Number(S6).toFixed(0)).toLocaleString('en');
    calcular_gastopersonal();
    Calcular_EEFF();
}
