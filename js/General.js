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
