function completarInfo(lista) {
    var analistas = lista[0];
    var oficinas = lista[1];
    var codOficina = lista[2];
    var actividad = lista[3];
    var pertenece = lista[4];

    if (pertenece == true) {
        document.getElementById("seccion_sancion").style.display = 'none';
    } else {
        document.getElementById("seccion_sancion").style.display = 'block';
    }


    var today = new Date();
    var t = today.toISOString().substring(0, 10);

    document.getElementById("fechaVisita").value = t;
    document.getElementById("fechaVisita").innerHTML = t;

    document.getElementById("analista").value = analistas;
    document.getElementById("analista").innerHTML = analistas;
    document.getElementById("analista").disabled = true;


    document.getElementById("oficinas").options[0] = new Option("");
    document.getElementById("actividad").options[0] = new Option("");
    for (i = 0; i < oficinas.length; i++) {
        document.getElementById("oficinas").options[i + 1] = new Option(codOficina[i] + " - " + oficinas[i],codOficina[i] + " - " + oficinas[i]);
    }
    for (i = 0; i < actividad.length; i++) {
        document.getElementById("actividad").options[i + 1] = new Option(actividad[i], actividad[i]);
    }
}

function cambioSancion() {
    var favorable_des = document.getElementById("dictamen").value;
    var CoberturaDeuda = convNro(document.getElementById("CoberturaDeuda").value);
    if (CoberturaDeuda < 1) {
        if (favorable_des == "Desfavorable") {
            document.getElementById("motivo").style.display = 'none';
        } else {
            document.getElementById("motivo").style.display = 'block';
        }
    } else {
        if (favorable_des == "Favorable") {
            document.getElementById("motivo").style.display = 'none';
        } else {
            document.getElementById("motivo").style.display = 'block';
        }
    }
    var gastoFinanciero = convNro(document.getElementById("egp_gastfinan").value);
    if (gastoFinanciero == 0) {
        if (favorable_des == "Favorable") {
            document.getElementById("motivo").style.display = 'none';
        } else {
            document.getElementById("motivo").style.display = 'block';
        }
    }
    if (favorable_des == "0") {
        document.getElementById("motivo").style.display = 'none';
    }
}
function calcTime(offset) {
    var d = new Date();
    var utc = d.getTime() + (d.getTimezoneOffset() * 60000);
    var nd = new Date(utc + (3600000 * offset));
    return nd.toLocaleString();
}
function Finalizar() {
    var idFila = document.getElementById("idFila").value;
    var lista = enviarInformacion();
    var checks = "";
    var radios = document.getElementsByName('crono');
    for (var i = 0, length = radios.length; i < length; i++) {
	if (radios[i].checked) {
	    checks = radios[i].value;
	}
    }
    if (lista != null) {
	var enviar = [idFila, lista];
	if(checks=="Si"){
		alert("Por favor, imprime el formato.");
		google.script.run.withSuccessHandler(actualizarIDFila).Finalizar(enviar);
		Descargar_Todo();
		location.replace('https://script.google.com/a/macros/bbva.com/s/AKfycbzAyMnXi6KNx96xIqAjv97WA4Fv6vHbsstXnVYS64ODrfg-tvY/exec');
	}else if(checks=="No"){
		var confirmar = confirm("Esta a punto de finalizar un informe de visita sin haber llenado el cronograma de pagos. ¿Desea continuar?");
		if (confirmar) {
		    google.script.run.withSuccessHandler(actualizarIDFila).Finalizar(enviar);
		    location.replace('https://script.google.com/a/macros/bbva.com/s/AKfycbzAyMnXi6KNx96xIqAjv97WA4Fv6vHbsstXnVYS64ODrfg-tvY/exec');
		}else{
		    document.getElementById("seccion_cronograma").focus();
		}
		
	}else{
		alert("Debe señalar si existe riesgo vigente (Considerar tambien deudas personales)");
		document.getElementById("seccion_cronograma").focus();
	}
    }
}
function PreFinalizar() {
    var idFila = document.getElementById("idFila").value;
    var lista = enviarInformacion();
    var enviar = [idFila, lista];
    google.script.run.withSuccessHandler(actualizarIDFila).PreFinalizar(enviar);
    alert("Se grabó exitosamente");
}
function enviarInformacion() {
    var listaTodo = [];
    var lista = [];
    var DC = getDatosCliente();
    if (DC != null) {
        var idxLP = Number(document.getElementById("cant_finan_LP").value);
        var idxCP = Number(document.getElementById("cant_finan_CP").value);
        if ((idxLP + idxCP) > 0) {
            var egp_ventas = convNro(document.getElementById("egp_ventas").value);
            if (egp_ventas != 0) {
                lista.push(calcTime(-5));
                lista.push(DC);
                var BG = getBalanceGeneral();
                lista.push(BG);
                var ER = getEstadoResultados();
                lista.push(ER);
                var C = getCanalizacion();
                lista.push(C);
                var R = getRatios();
                lista.push(R);
                var D = getDictamen();
                lista.push(D);
                listaTodo.push(lista);
                listaTodo.push(getFinanciamientoLP());
                listaTodo.push(getFinanciamientoCP());
                listaTodo.push(getPatrimonioInmueble());
                listaTodo.push(getPatrimonioVehMaq());
		listaTodo.push(getIngresos());
		listaTodo.push(getEgresos());
                listaTodo.push(getLTC());
                listaTodo.push(getTC());
                listaTodo.push(getPCCT());
                listaTodo.push(getPA());
                listaTodo.push(getPC());
                listaTodo.push(getPP());
		listaTodo.push(getResumen());
		
                return listaTodo;
            } else {
                alert("Falta completar las ventas");
                return null;
            }
        } else {
            alert("Debe tener al menos un financiamiento");
            return null;
        }
    }
}
function convNro(nroComas) {
    var arreglo = String(nroComas).split(",");
    var sinComas = arreglo.join("");
    if (isNaN(sinComas)) {
        return 0;
    }
    return Number(sinComas);
}
function validarNumero(id) {
    if (document.getElementById(id).value != "") {
        var conComas = document.getElementById(id).value;

        var texto = conComas.split(",");
        var sinComas = texto.join("");
        var n = sinComas.indexOf(".");
        var siguiente = "";
        if (Number(n) != -1) {
            siguiente = sinComas.charAt(n + 1);
        }
        if (sinComas.length > 15) {
            alert("Excedio la cantidad permitida de dígitos");
            document.getElementById(id).value = "";
        } else {
            if (isNaN(sinComas)) {
                alert("Ingrese un número válido");
                document.getElementById(id).value = "";
            } else {
                var nuevo = Number(sinComas).toLocaleString('en');
    //alert(nuevo);
                if (Number(n) == -1) {
                    document.getElementById(id).value = nuevo;
                    document.getElementById(id).setAttribute('value', nuevo);
                } else {
                    if (siguiente == "") {
                        document.getElementById(id).value = nuevo + ".";
                        document.getElementById(id).setAttribute('value', nuevo + ".");
                    } else {
                        document.getElementById(id).value = nuevo;
                        document.getElementById(id).setAttribute('value', nuevo);
                    }

                }
            }
        }
    }
}
function AbrirMensaje(id, Principal) {
    document.getElementById(id).style.display = "block";
    document.getElementById(Principal).style.display = "none";
    if (id == "mensaje") {
        document.getElementById('header').scrollIntoView();
    }
    document.getElementById('btn_Cerrar').style.display = "block";
    document.getElementById('btn_Abrir').style.display = "none";
}
function CerrarMensaje(id, Principal) {
    document.getElementById(id).style.display = "none";
    document.getElementById(Principal).style.display = "block";
    document.getElementById('btn_Abrir').scrollIntoView();
    document.getElementById('btn_Cerrar').style.display = "none";
    document.getElementById('btn_Abrir').style.display = "block";
}

function AbrirMensajeCrono(id, Principal) {
    document.getElementById(id).style.display = "block";
    document.getElementById(Principal).style.display = "none";
    if (id == "mensaje") {
        document.getElementById('header').scrollIntoView();
    }
    document.getElementById('btn_Cerrar').style.display = "block";
    document.getElementById('btn_Abrir').style.display = "none";
    document.getElementById("btn_Descargar_EEFF").style.display = 'none';
    document.getElementById("btn_Descargar").style.display = 'none';
}
function CerrarMensajeCrono(id, Principal) {
    document.getElementById(id).style.display = "none";
    document.getElementById(Principal).style.display = "block";
    document.getElementById('btn_Abrir').scrollIntoView();
    document.getElementById('btn_Cerrar').style.display = "none";
    document.getElementById('btn_Abrir').style.display = "block";
    document.getElementById("btn_Descargar_EEFF").style.display = '';
    document.getElementById("btn_Descargar").style.display = '';
	
}

function Calcular_EEFF(){
    Calcular_BG();
    Calcular_EGP();
    Calcular_Ratios();
    EvaluarCalculadora();
}
function EvaluarCalculadora() {
    var calculadora = false;
    var regimen = document.getElementById('regimen').value;
    var estado = document.getElementById('btn_Calculadora').style.display;
	
    if (regimen == 'Reg General') {
        var favorable = evaluarFavorable();
        if (favorable == true) {
            if(estado != "block"){alert("Puedes ampliar la oferta ingresando a la calculadora!!");}
            document.getElementById('btn_Calculadora').style.display = 'block';
        }else{
            document.getElementById('btn_Calculadora').style.display = 'none';
        }
    }else{
        document.getElementById('btn_Calculadora').style.display = 'none';
    }
    return calculadora;
}
function evaluarFavorable() {
    var favorable = false;
    var ventas = convNro(document.getElementById('egp_ventas').value);
    if (ventas > 30000) {
        var egp_uneta = convNro(document.getElementById('egp_uneta').value);
        if (egp_uneta > 0) {
            var buro = document.getElementById('buro').value;
            var tipoCliente = document.getElementById('tipoCliente').value;
            if ((tipoCliente == 'PJ' && (buro == 'G1' || buro == 'G2' || buro == 'G3' || buro == 'G4' || buro == 'G5')) || (tipoCliente == 'PNN' && (buro == 'G1' || buro == 'G2' || buro == 'G3'))) {
                var edadRL = convNro(document.getElementById('edadRL').value);
                if (edadRL >= 25) {
                    var antiguedad = convNro(document.getElementById('aExp').value);
                    if ((tipoCliente == 'PJ' && antiguedad >= 1) || (tipoCliente == 'PNN' && antiguedad >= 2)) {
                        favorable = true;
                    }
                }
            }
        }
    }
    var nroEntidades = convNro(document.getElementById('nroEnt').value);
    var cobertura = convNro(document.getElementById('CoberturaDeuda').value);
    if (cobertura < 1) {
        favorable = false;
    } else {
        if (tipoCliente == 'PJ') {
            if (cobertura > 1.4) {
                if (nroEntidades >= 6) {
                    favorable = false;
                }
            } else {
                if (nroEntidades >= 4 && nroEntidades <= 5) {
                    favorable = false;
                }
            }
        } else if (tipoCliente == 'PNN') {
            {
                if (cobertura > 1.4) {
                    if (nroEntidades >= 5) {
                        favorable = false;
                    }
                } else {
                    if (nroEntidades >= 3 && nroEntidades <= 4) {
                        favorable = false;
                    }
                }
            }
        }
    }
	document.getElementById("dictamen").disabled = false;
    if(favorable == true){
    	document.getElementById("dictamen").selectedIndex = "0";
	    
    }else{
	document.getElementById("dictamen").selectedIndex = "1";
        document.getElementById("dictamen").disabled = true;
    }
    document.getElementById("motivo").style.display = 'none';
    return favorable;
}
/******************************************************************************************************************************************/

function Agregar_Financimiento_LP() {
    var vIndex = [];
    vIndex.push("Inicio");
    var idx = Number(document.getElementById("cant_finan_LP").value);
    var total = idx;
    var i = 1;
    while (i <= total) {
        vIndex.push(document.getElementById("Tipo_Prod_LP_" + i).selectedIndex);
        i = i + 1;
    }

    i = 1;
    idx += 1;
    var financiamiento = '<div class="col-xs-12" id = "Largo_Plazo_' + idx + '" style="height:547px;">' +
            '<h1>Largo Plazo</h1>' +
            '<h3>(' + idx + '° Financiamiento)</h3>' +
            '<table class="table table-hover">' +
            ' <tr><th colspan="3" class="cabezera">Propuesta de financiamiento Largo Plazo</th></tr>' +
            ' <tr>' +
            '   <td>Tipo de producto</td>' +
            '   <td colspan="2">' +
            '     <select class="form-control" id="Tipo_Prod_LP_' + idx + '" onchange="Calcular_Propuestas_LP();">' +
            '       <option value="0"></option>' +
            '       <option value="Leasing Mobiliario">Leasing Mobiliario</option>' +
            '       <option value="Leasing Inmobiliario">Leasing Inmobiliario</option>' +
            '       <option value="Préstamo para adquisición de inmueble">Préstamo para adquisición de inmueble</option>' +
            '       <option value="Préstamo para adquisición de bienes muebles">Préstamo para adquisición de bienes muebles</option>' +
            '       <option value="Subrogación de deuda">Subrogación de deuda</option>' +
            '       <option value="Otro">Otro</option>' +
            '     </select>' +
            '   </td>' +
            ' </tr>' +
            ' <tr>' +
            '   <td>Precio Venta</td>' +
            '   <td><input min="0"  class="form-control" id="Precio_Venta_' + idx + '" onkeyup="validarNumero(id);Calcular_Propuestas_LP();Calcular_EEFF();"/></td>' +
            '   <td>100%</td>' +
            ' </tr>' +
            ' <tr>' +
            '   <td style="width:40%;">Importe de Financiamiento</td>' +
            '   <td><input  min="0"  class="form-control" id="Finan_LP_' + idx + '" onkeyup="validarNumero(id);Calcular_Propuestas_LP();Calcular_EEFF();" /></td>' +
            '   <td><div id="Porc_LP_1_1"></div></td>' +
            ' </tr>' +
            ' <tr>' +
            '   <td>Cuota Inicial</td><td><div id="Cuota_Inicial_LP_' + idx + '"></div></td><td><div id="Porc_LP_1_2"></div></td>' +
            ' </tr>' +
            ' <tr>' +
            '   <td>Tasa anual</td><td><div><input style = "width:24.5%; display:inline"  min="0"  id="TEA_LP_' + idx + '" class="form-control" onkeyup="validarNumero(id);Calcular_Propuestas_LP();"/><b>&nbsp;%</b></div></td><td></td>' +
            ' </tr>' +
            ' <tr>' +
            '   <td>Tasa mensual</td><td><div id="TEM_LP_' + idx + '"></div></td><td></td>' +
            ' </tr>' +
            ' <tr>' +
            '   <td>Cuota</td><td><div id="Cuota_LP_' + idx + '"></div></td><td></td>' +
            ' </tr>' +
            ' <tr>' +
            '   <td>Plazo (Meses)</td><td><input  min="0"  class="form-control" id="Plazo_LP_' + idx + '" onkeyup="validarNumero(id);Calcular_Propuestas_LP()"/></td><td></td>' +
            ' </tr>' +
            ' <tr>' +
            '   <td>Gtia para Prop:</td><td><input  min="0"  class="form-control" id="GTIA_LP_' + idx + '" onkeyup="validarNumero(id);Calcular_Propuestas_LP();"/></td><td></td>' +
            ' </tr>' +
            '</table>' +
            '<input type="hidden" id="Cuota_LP_' + idx + '_hidden" name="Cuota_LP_' + idx + '_hidden">' +
            '</div>';



    document.getElementById("Financimiento_LP").innerHTML += financiamiento;
    document.getElementById("cant_finan_LP").value = idx;

    while (i <= total) {
        document.getElementById("Tipo_Prod_LP_" + i).selectedIndex = vIndex[i];
        i = i + 1;
    }
}
function Agregar_Financimiento_CP() {
    var vIndex = [];
    vIndex.push("Inicio");
    var idx = Number(document.getElementById("cant_finan_CP").value);
    var total = idx;
    var i = 1;
    while (i <= total) {
        vIndex.push(document.getElementById("Tipo_Prod_CP_" + i).selectedIndex);
        i = i + 1;
    }

    i = 1;
    idx += 1;
    var financiamiento = '<div class="col-xs-12" id = "Corto_Plazo_' + idx + '" style="height:547px;">' +
                         '   <h1>Corto Plazo</h1>' +
                         '   <h3>(' + idx + '° Financiamiento)</h3>' +
                         '   <table class="table table-hover">' +
                         '     <tr><th colspan="2" class="cabezera">Propuesta de financiamiento Corto Plazo</th></tr>' +
                         '     <tr>' +
                         '       <td>Tipo de producto</td>' +
                         '       <td>' +
                         '         <select class="form-control" id="Tipo_Prod_CP_' + idx + '" onchange="Calcular_Propuestas_CP();">' +
                         '           <option value=""></option>' +
                         '           <option value="Financiamiento de Importación">Financiamiento de Importación</option>' +
                         '           <option value="Financiamiento de Exportación">Financiamiento de Exportación</option>' +
                         '           <option value="Préstamo para capital de trabajo">Préstamo para capital de trabajo</option>' +
                         '           <option value="Tarjeta capital de trabajo">Tarjeta capital de trabajo</option>' +
                         '           <option value="Descuento de letra/factura negociable">Descuento de letra/factura negociable</option>' +
                         '           <option value="Tarjeta Empresarial">Tarjeta empresarial</option>' +
                         '           <option value="Préstamo para adquisición de bienes muebles pequeños">Préstamo para adquisición de bienes muebles pequeños</option>' +
                         '           <option value="Subrogación de deuda">Subrogación de deuda</option>' +
                         '           <option value="Incremento de línea de TKT">Incremento de línea de TKT</option>' +
                         '           <option value="Incremento de línea de T/C">Incremento de línea de T/C empresarial</option>' +
                         '           <option value="Otro">Otro</option>' +
                         '         </select>' +
                         '       </td>' +
                         '     </tr>' +
                         '     <tr>' +
                         '       <td style="width:40%;">Importe de Financiamiento</td>' +
                         '       <td><input  min="0"  id="Finan_CP_' + idx + '" class="form-control" onkeyup="validarNumero(id);Calcular_Propuestas_CP();Calcular_EEFF();"/></td>' +
                         '     </tr>' +
                         '     <tr>' +
                         '       <td>Tasa anual</td>' +
                         '       <td><div><input style="width:20%; display:inline;"  min="0"  id="TEA_CP_' + idx + '" class="form-control" onkeyup="validarNumero(id);Calcular_Propuestas_CP();"/> <b>%</b></div></td>' +
                         '     </tr>' +
                         '     <tr>' +
                         '       <td>Tasa mensual</td>' +
                         '       <td><div id="TEM_CP_' + idx + '"></div></td>' +
                         '     </tr>' +
                         '     <tr>' +
                         '       <td>Cuota</td>' +
                         '       <td><div id="Cuota_CP_' + idx + '"></div></td>' +
                         '     </tr>' +
                         '     <tr>' +
                         '       <td>Plazo (Meses)</td>' +
                         '       <td><input  min="0"  id="Plazo_CP_' + idx + '" class="form-control" onkeyup="validarNumero(id);Calcular_Propuestas_CP()"/></td>' +
                         '     </tr>' +
                         '     <tr>' +
                         '       <td>Gastos finan. 1°cuota</td>' +
                         '       <td><div id="GastFin_CP_' + idx + '"></div></td>' +
                         '     </tr>' +
                         '   </table>' +
                         '   <input type="hidden" id="GastFin_CP_' + idx + '_hidden" name="GastFin_CP_' + idx + '_hidden"/>' +
                         '   <input type="hidden" id="Cuota_CP_' + idx + '_hidden" name="Cuota_CP_' + idx + '_hidden">' +
                         ' </div>';




    document.getElementById("Financimiento_CP").innerHTML += financiamiento;
    document.getElementById("cant_finan_CP").value = idx;


    while (i <= total) {
        document.getElementById("Tipo_Prod_CP_" + i).selectedIndex = vIndex[i]
        i = i + 1;
    }
    Calcular_Propuestas_CP();
}
function Eliminar_Financimiento_LP() {
    var idx = document.getElementById("cant_finan_LP").value;
    if (idx > 0) {
        var padre = document.getElementById("Financimiento_LP");
        var hijo = document.getElementById("Largo_Plazo_" + idx);
        var oldChild = padre.removeChild(hijo);
        document.getElementById("cant_finan_LP").value = idx - 1;
    }
}
function Eliminar_Financimiento_CP() {
    var idx = document.getElementById("cant_finan_CP").value;
    if (idx > 0) {
        var padre = document.getElementById("Financimiento_CP");
        var hijo = document.getElementById("Corto_Plazo_" + idx);
        var oldChild = padre.removeChild(hijo);
        document.getElementById("cant_finan_CP").value = idx - 1;
    }
}
function Calcular_Propuestas_LP() {
    var idx = document.getElementById("cant_finan_LP").value;


    for (var i = 1; i <= idx; i++) {
        var Tipo_Prod = document.getElementById("Tipo_Prod_LP_" + i).value;
        document.getElementById("Tipo_Prod_LP_" + i).setAttribute('value', Tipo_Prod);
        var vIndex = document.getElementById("Tipo_Prod_LP_" + i).selectedIndex;
        document.getElementById("Tipo_Prod_LP_" + i).setAttribute('selectedIndex', vIndex);

        Calcular_Cuota_Inicial_LP(i);
        Calcular_Porcentajes_LP(i);
        Calcular_Tasa_Mensual_LP(i);
        Calcular_Cuota_LP(i);
    }
    Calcular_EGP();
}
function Calcular_Cuota_Inicial_LP(idx) {
    var Tipo_Prod = document.getElementById("Tipo_Prod_LP_" + idx).value;
    if (Tipo_Prod != "Subrogación de deuda") {
        var Precio_Venta = convNro(document.getElementById("Precio_Venta_" + idx).value);
        var Finan_LP = convNro(document.getElementById("Finan_LP_" + idx).value);
        var Cuota_Inicial = Precio_Venta - Finan_LP;
        if (Precio_Venta > Finan_LP) {
            document.getElementById("Cuota_Inicial_LP_" + idx).innerHTML = Number(Cuota_Inicial).toLocaleString('en');
            document.getElementById("Cuota_Inicial_LP_" + idx).value = Cuota_Inicial;
        } else {
            document.getElementById("Cuota_Inicial_LP_" + idx).innerHTML = "";
            document.getElementById("Cuota_Inicial_LP_" + idx).value = 0;
        }
    } else {
        document.getElementById("Cuota_Inicial_LP_" + idx).innerHTML = "";
        document.getElementById("Cuota_Inicial_LP_" + idx).value = 0;
    }
}
function Calcular_Porcentajes_LP(idx) {
    var Precio_Venta = convNro(document.getElementById("Precio_Venta_" + idx).value);
    var Finan_LP = convNro(document.getElementById("Finan_LP_" + idx).value);
    var Cuota_Inicial = convNro(document.getElementById("Cuota_Inicial_LP_" + idx).value);
    var Porc_Finan = Finan_LP / Precio_Venta * 100;
    var Porc_Cuota = Cuota_Inicial / Precio_Venta * 100;

    if (Precio_Venta > Finan_LP) {
        document.getElementById("Porc_LP_1_1").innerHTML = Number(Porc_Finan).toFixed(0) + "%";
        document.getElementById("Porc_LP_1_1").value = Porc_Finan;

        document.getElementById("Porc_LP_1_2").innerHTML = Number(Porc_Cuota).toFixed(0) + "%";
        document.getElementById("Porc_LP_1_2").value = Porc_Cuota;
    } else {
        document.getElementById("Porc_LP_1_1").innerHTML = "";
        document.getElementById("Porc_LP_1_1").value = 0;
        document.getElementById("Porc_LP_1_2").innerHTML = "";
        document.getElementById("Porc_LP_1_2").value = 0;
    }
}
function Calcular_Tasa_Mensual_LP(idx) {
    var TEA_LP = convNro(document.getElementById("TEA_LP_" + idx).value);

    if (TEA_LP > 0) {
        var TEM_LP = ((Math.pow(1 + TEA_LP / 100, 1 / 12) - 1) * 100);

        document.getElementById("TEM_LP_" + idx).innerHTML = Number(TEM_LP).toFixed(2) + "%";
        document.getElementById("TEM_LP_" + idx).value = Number(TEM_LP).toFixed(2) + "%";
    } else {
        document.getElementById("TEM_LP_" + idx).innerHTML = "";
    }
}
function Calcular_Cuota_LP(idx) {
    var Plazo_LP = convNro(document.getElementById("Plazo_LP_" + idx).value);
    var Finan_LP = convNro(document.getElementById("Finan_LP_" + idx).value);
    var TEA_LP = convNro(document.getElementById("TEA_LP_" + idx).value);

    if (Plazo_LP > 0 && Finan_LP > 0 && TEA_LP > 0) {

        var TEM_LP = Math.pow(1 + TEA_LP / 100, 1 / 12) - 1;
        document.getElementById("Cuota_LP_" + idx).innerHTML = Number((Finan_LP / ((1 - Math.pow(1 + TEM_LP, -Plazo_LP)) / (TEM_LP))).toFixed()).toLocaleString('en');
        document.getElementById("Cuota_LP_" + idx).value = Number((Finan_LP / ((1 - Math.pow(1 + TEM_LP, -Plazo_LP)) / (TEM_LP))).toFixed());
        document.getElementById("Cuota_LP_" + idx + "_hidden").value = Finan_LP / ((1 - Math.pow(1 + TEM_LP, -Plazo_LP)) / (TEM_LP));
        document.getElementById("Cuota_LP_" + idx + "_hidden").setAttribute('value', (Finan_LP / ((1 - Math.pow(1 + TEM_LP, -Plazo_LP)) / (TEM_LP))));

    } else {
        document.getElementById("Cuota_LP_" + idx).innerHTML = "";
    }
}
function Calcular_Cuotas_LP_Total() {
    var idx = document.getElementById("cant_finan_LP").value;
    var total = 0;
    for (var i = 1; i <= idx; i++) {
        total = total + convNro(document.getElementById("Cuota_LP_" + idx).value);
    }
    return total;
}
function Calcular_Propuestas_CP() {
    var idx = document.getElementById("cant_finan_CP").value;

    for (var i = 1; i <= idx; i++) {
        var Tipo_Prod = document.getElementById("Tipo_Prod_CP_" + i).value;
        document.getElementById("Tipo_Prod_CP_" + i).setAttribute('value', Tipo_Prod);
        var vIndex = document.getElementById("Tipo_Prod_CP_" + i).selectedIndex;
        document.getElementById("Tipo_Prod_CP_" + i).setAttribute('selectedIndex', vIndex);

        Calcular_Tasa_Mensual_CP(i);
        Calcular_Cuota_CP(i);
        Calcular_GastFin_CP(i);
    }
    Calcular_EGP();
}
function Calcular_Tasa_Mensual_CP(idx) {
    var TEA_CP = convNro(document.getElementById("TEA_CP_" + idx).value);
    if (TEA_CP > 0) {
        var TEM_CP = ((Math.pow(1 + TEA_CP / 100, 1 / 12) - 1) * 100);
        document.getElementById("TEM_CP_" + idx).innerHTML = Number(TEM_CP).toFixed(2) + "%";
        document.getElementById("TEM_CP_" + idx).value = Number(TEM_CP).toFixed(2) + "%";
    } else {
        document.getElementById("TEM_CP_" + idx).innerHTML = "";
    }
}
function Calcular_Cuota_CP(idx) {
    var Plazo_CP = convNro(document.getElementById("Plazo_CP_" + idx).value);
    var Finan_CP = convNro(document.getElementById("Finan_CP_" + idx).value);
    var TEA_CP = convNro(document.getElementById("TEA_CP_" + idx).value);

    if (Plazo_CP > 0 && Finan_CP > 0 && TEA_CP > 0) {

        var TEM_CP = Math.pow(1 + TEA_CP / 100, 1 / 12) - 1;
        document.getElementById("Cuota_CP_" + idx).innerHTML = Number((Finan_CP / ((1 - Math.pow(1 + TEM_CP, -Plazo_CP)) / (TEM_CP))).toFixed()).toLocaleString('en');
        document.getElementById("Cuota_CP_" + idx).value = Number((Finan_CP / ((1 - Math.pow(1 + TEM_CP, -Plazo_CP)) / (TEM_CP))).toFixed());
        document.getElementById("Cuota_CP_" + idx + "_hidden").value = Finan_CP / ((1 - Math.pow(1 + TEM_CP, -Plazo_CP)) / (TEM_CP));
        document.getElementById("Cuota_CP_" + idx + "_hidden").setAttribute('value', (Finan_CP / ((1 - Math.pow(1 + TEM_CP, -Plazo_CP)) / (TEM_CP))));
    } else {
        document.getElementById("Cuota_CP_" + idx).innerHTML = "";
        document.getElementById("Cuota_CP_" + idx + "_hidden").setAttribute('value', 0);
    }
}
function Calcular_GastFin_CP(idx) {
    var Finan_CP = convNro(document.getElementById("Finan_CP_" + idx).value);
    var TEA_CP = convNro(document.getElementById("TEA_CP_" + idx).value);
    if (Finan_CP > 0 && TEA_CP > 0) {

        var GastFin_CP = Finan_CP * (Math.pow(1 + TEA_CP / 100, 1 / 12) - 1);

        document.getElementById("GastFin_CP_" + idx).innerHTML = Number(GastFin_CP.toFixed()).toLocaleString('en');
        document.getElementById("GastFin_CP_" + idx).value = GastFin_CP.toFixed();

        document.getElementById("GastFin_CP_" + idx + "_hidden").value = GastFin_CP;
        document.getElementById("GastFin_CP_" + idx + "_hidden").setAttribute('value', GastFin_CP);
        return convNro(GastFin_CP);
    } else {
        document.getElementById("GastFin_CP_" + idx).innerHTML = "";
        document.getElementById("GastFin_CP_" + idx + "_hidden").value = 0;
        document.getElementById("GastFin_CP_" + idx + "_hidden").setAttribute('value', '');
        return 0;
    }

}
function Calcular_Valor_Bien(idx) {
    var Veh_Maq = document.getElementById("Veh_Maq_" + idx).value;
    var Valor_Nuevo = convNro(document.getElementById("Valor_Nuevo_" + idx).value);
    var Antiguedad = convNro(document.getElementById("Antiguedad_" + idx).value);
    var Factor = 0;
    var Valor_Bien = 0;
    if (Veh_Maq != 0 && Valor_Nuevo > 0 && Antiguedad > 0) {
        if (Veh_Maq == "Vehiculo") {
            switch (true) {
                case (0 < Antiguedad && Antiguedad < 3):
                    Factor = 1;
                    break;
                case (2 < Antiguedad && Antiguedad < 5):
                    Factor = 0.8;
                    break;
                case (4 < Antiguedad && Antiguedad < 7):
                    Factor = 0.6;
                    break;
                case (6 < Antiguedad && Antiguedad < 9):
                    Factor = 0.4;
                    break;
                case (8 < Antiguedad):
                    Factor = 0.2;
                    break;
            }
        } else if (Veh_Maq == "Maquinaria") {
            switch (true) {
                case (0 < Antiguedad && Antiguedad < 5):
                    Factor = 1;
                    break;
                case (4 < Antiguedad && Antiguedad < 10):
                    Factor = 0.7;
                    break;
                case (9 < Antiguedad && Antiguedad < 15):
                    Factor = 0.5;
                    break;
                case (14 < Antiguedad):
                    Factor = 0.3;
                    break;
            }
        }
        Valor_Bien = Valor_Nuevo * Factor;
        document.getElementById("Valor_Bien_" + idx).innerHTML = Number(Valor_Bien).toLocaleString('en');
        document.getElementById("Valor_Bien_" + idx).value = Valor_Bien;
    } else {
        document.getElementById("Valor_Bien_" + idx).innerHTML = '';
        document.getElementById("Valor_Bien_" + idx).value = '';
    }
    return Valor_Bien;
}
function Calcular_Valor_Bien_Total() {
    var table = document.getElementById("tablaPatrimonioVehiculos");
    var filas = table.rows.length - 1;
    var Valor_Bien_Total = 0;
    for (var idx = 1; idx < filas; idx++) {
        Valor_Bien_Total += Calcular_Valor_Bien(idx);
    }

    document.getElementById("Valor_Bien_Total").innerHTML = Number(Valor_Bien_Total).toLocaleString('en');
    document.getElementById("Valor_Bien_Total").value = Valor_Bien_Total;

    document.getElementById("bg_14").innerHTML = Number(Valor_Bien_Total).toLocaleString('en');
    document.getElementById("bg_14").value = Valor_Bien_Total;
    Calcular_BG();
}
function AgregarPatrimonio1() {

    var table = document.getElementById("tablaPatrimonioInmueble");
    var idx = table.rows.length - 1;
    var row = table.insertRow(idx);

    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    var cell6 = row.insertCell(5);
    var cell7 = row.insertCell(6);
    var cell8 = row.insertCell(7);
    cell1.innerHTML = '<input class="form-control" id = "Ubic_' + idx + '"/>';
    cell2.innerHTML = '<input class="form-control" id="Propietario_' + idx + '"/>';
    cell3.innerHTML = '<input class="form-control" id="Uso_' + idx + '"/>';
    cell4.innerHTML = '<select class="form-control" id="Realizable_' + idx + '" onchange="calcular_valor_evaluado_Total();">' +
            '<option value="0"></option>' +
            '<option value="Si">Si</option>' +
            '<option value="No">No</option>' +
            '</select>';
    //calcular_util_bruta('+"'"+idx+"'"+');
    cell5.innerHTML = '<input class="form-control" id="Metraje_' + idx + '" onkeyup="validarNumero(id);calcular_valor_declarado_Total();"/>';
    cell6.innerHTML = '<input class="form-control" id="Precio_' + idx + '" onkeyup="validarNumero(id);calcular_valor_declarado_Total();"/>';
    cell7.innerHTML = '<div id="Val_Inm_Dec_' + idx + '">';
    cell8.innerHTML = '<div id="Val_Inm_Eva_' + idx + '">';
}
function EliminarPatrimonio1() {
    var table = document.getElementById("tablaPatrimonioInmueble");
    var idx = table.rows.length - 2;
    if (table.rows.length > 3) {
        table.deleteRow(idx);
        calcular_valor_declarado_Total();
    }
}
function AgregarPatrimonio2() {

    var table = document.getElementById("tablaPatrimonioVehiculos");
    var idx = table.rows.length - 1;
    var row = table.insertRow(idx);

    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    cell1.innerHTML = '<select class="form-control" id="Veh_Maq_' + idx + '" onchange="Calcular_Valor_Bien_Total();">' +
            '<option value="0"></option>' +
            '<option value="Vehiculo">Vehiculo</option>' +
            '<option value="Maquinaria">Maquinaria</option>' +
            '</select>';
    //calcular_util_bruta('+"'"+idx+"'"+');
    cell2.innerHTML = '<input class="form-control" id="Placa_' + idx + '"/>';
    cell3.innerHTML = '<input class="form-control" id="Valor_Nuevo_' + idx + '" onkeyup="validarNumero(id);Calcular_Valor_Bien_Total();"/>';
    cell4.innerHTML = '<input class="form-control" id="Antiguedad_' + idx + '" onkeyup="validarNumero(id);Calcular_Valor_Bien_Total();"/>';
    cell5.innerHTML = '<div id="Valor_Bien_' + idx + '">';
}
function EliminarPatrimonio2() {
    var table = document.getElementById("tablaPatrimonioVehiculos");
    var idx = table.rows.length - 2;
    if (table.rows.length > 3) {
        table.deleteRow(idx);
    }
}
function Calcular_Ratios() {

    var TPC = convNro(document.getElementById("total_pasivo_cte").value);
    var TAC = convNro(document.getElementById("total_activo_cte").value);
    var bg_5 = convNro(document.getElementById("bg_5").value);
    var egp_costoven = convNro(document.getElementById("egp_costoven").value);
    var egp_ventas = convNro(document.getElementById("egp_ventas").value);
    var bg_3 = convNro(document.getElementById("bg_3").value);
    var bg_17 = convNro(document.getElementById("bg_17").value);
    var bg_19 = convNro(document.getElementById("bg_19").value);
    var egp_gastfinan = convNro(document.getElementById("egp_gastfinan").value);
    var egp_uneta = convNro(document.getElementById("egp_uneta").value);

    var LiquidezCTE = TAC / TPC;
    if (TPC == 0) {
        LiquidezCTE = 0;
    }
    var CapitalTrabajo = TAC - TPC;

    var DiasExistencias = ((bg_5 * 365) / (egp_costoven * 12));
    if (egp_costoven == 0) {
        DiasExistencias = 0;
    }
    var DiasCobro = ((bg_3 * 365) / (egp_ventas * 12));
    if (egp_ventas == 0) {
        DiasCobro = 0;
    }
    var DiasPago = ((bg_17 * 360) / (egp_costoven * 12));
    if (egp_costoven == 0) {
        DiasPago = 0;
    }
    var CicloNegocio = DiasExistencias + DiasCobro - DiasPago;

    var cuotas = convNro(Calcular_Cuotas_LP_Total());
    var PA_table = document.getElementById("tablaPrestamoAdquisicion");
    var PA_filas = PA_table.rows.length - 1;
    var PA_S5 = 0;
    for (var idx = 0; idx < PA_filas; idx++) {
        PA_S5 = PA_S5 + convNro(document.getElementById("PA_Cuota_Pagar_Aprox_" + idx).value);
    }
    var suma1 = 0;
    suma1 = convNro(cuotas) + convNro(PA_S5);


    var payback = 0;
    if ((egp_uneta + suma1) != 0) {
        payback = (bg_19 / (egp_uneta + suma1));
    }

    var CoberturaDeuda = 0;

    if (egp_gastfinan != 0) {
        CoberturaDeuda = (egp_uneta + egp_gastfinan) / egp_gastfinan;
    }


    document.getElementById("LiquidezCTE").innerHTML = Number(LiquidezCTE).toFixed(2);
    document.getElementById("CapitalTrabajo").innerHTML = Number(Number(CapitalTrabajo).toFixed(2)).toLocaleString('en');
    document.getElementById("DiasExistencias").innerHTML = Number(DiasExistencias).toFixed(2);
    document.getElementById("DiasCobro").innerHTML = Number(DiasCobro).toFixed(2);
    document.getElementById("DiasPago").innerHTML = Number(DiasPago).toFixed(2);
    document.getElementById("CicloNegocio").innerHTML = Number(CicloNegocio).toFixed(2);
    document.getElementById("PayBack").innerHTML = Number(payback).toFixed(2);
    document.getElementById("CoberturaDeuda").innerHTML = Number(CoberturaDeuda).toFixed(2);


    document.getElementById("LiquidezCTE").value = Number(LiquidezCTE);
    document.getElementById("CapitalTrabajo").value = Number(CapitalTrabajo);
    document.getElementById("DiasExistencias").value = Number(DiasExistencias);
    document.getElementById("DiasCobro").value = Number(DiasCobro);
    document.getElementById("DiasPago").value = Number(DiasPago);
    document.getElementById("CicloNegocio").value = Number(CicloNegocio);
    document.getElementById("PayBack").value = Number(payback);
    document.getElementById("CoberturaDeuda").value = Number(CoberturaDeuda);
    cambioSancion();
}
function getGastosPersonales(){
	var lista = [];
	lista.push(document.getElementById("miembros").value);
	lista.push(document.getElementById("gastos_implicitos").value);
	lista.push(document.getElementById("alquiler").value);
	lista.push(document.getElementById("deuda_personal").value);
	lista.push(document.getElementById("otros_personal").value);
	lista.push(document.getElementById("total_gastpersonal").value);
	return lista;
}
