function completarInfo(lista) {
    var analistas = lista[0];
    var oficinas = lista[1];
    var codOficina = lista[2];
    var actividad = lista[3];
    var pertenece = lista[4];

    if (pertenece == true) {
        document.getElementById("seccion_sancion").style.display = 'none';
    } else {
        //document.getElementById("seccion_sancion").style.display = 'block';
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
		var dictamen = document.getElementById('dictamen').value;
		alert("El dictamen es " +dictamen+ ". Por favor, imprime o guarda el formato.");
		document.getElementById('seccion_sancion').style.display='block';
		google.script.run.withSuccessHandler(actualizarIDFila).Finalizar(enviar);
		Descargar_Todo();
		location.replace('https://script.google.com/a/macros/bbva.com/s/AKfycbzAyMnXi6KNx96xIqAjv97WA4Fv6vHbsstXnVYS64ODrfg-tvY/exec');
	}else if(checks=="No"){
		var confirmar = confirm("Esta a punto de finalizar un informe de visita sin haber llenado el cronograma de pagos. ¿Desea continuar?");
		if (confirmar) {
		    var dictamen = document.getElementById('dictamen').value;
		    alert("El dictamen es " +dictamen+ ". Por favor, imprime o guarda el formato.");
		    document.getElementById('seccion_sancion').style.display='block';
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
                if (nroEntidades >= 4 && nroEntidades < 6) {
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
                    if (nroEntidades >= 3 && nroEntidades < 5) {
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
                         '         <select class="form-control" id="Tipo_Prod_CP_' + idx + '" onchange="Calcular_Propuestas_CP();Calcular_Estacionalidad();">' +
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
