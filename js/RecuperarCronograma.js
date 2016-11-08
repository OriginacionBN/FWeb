function getLTC(){
	var lista = [];
    var table = document.getElementById("tablaLineaTarjetaCapital");
    var total = table.rows.length-1;
	lista.push(total);
    for (var i = 0; i< total; i++){
		var idx = i;
		lista.push(document.getElementById("LTC_Banco_"+idx).value);
		lista.push(convNro(document.getElementById("LTC_Linea_Utilizada_"+idx).value));
		lista.push(convNro(document.getElementById("LTC_Linea_Total_"+idx).value));
		lista.push(convNro(document.getElementById("LTC_Costo_Financiero_"+idx).value));
		lista.push(convNro(document.getElementById("LTC_Costo_Aprox_Pagar_"+idx).value));
	}
	return lista;
}
function getPCCT(){
	var lista = [];
    var table = document.getElementById("tablaPrestamoComercial");
    var total = table.rows.length-1;
	lista.push(total);
    for (var i = 0; i< total; i++){
		var idx = i;
		lista.push(document.getElementById("PCCT_Banco_"+idx).value);
		lista.push(convNro(document.getElementById("PCCT_Mes_Anterior_"+idx).value));
		lista.push(convNro(document.getElementById("PCCT_Mes_Actual_"+idx).value));
		lista.push(convNro(document.getElementById("PCCT_Amort_Capital_"+idx).value));
		lista.push(convNro(document.getElementById("PCCT_Costo_Financiero_"+idx).value));
		lista.push(convNro(document.getElementById("PCCT_Cuota_Pagar_Aprox_"+idx).value));
		lista.push(convNro(document.getElementById("PCCT_Nro_Cuota_"+idx).value));
	}
	return lista;
}
function getPC(){
	var lista = [];
    var table = document.getElementById("tablaPrestamoCancelable");
    var total = table.rows.length-1;
	lista.push(total);
    for (var i = 0; i< total; i++){
		var idx = i;
		lista.push(document.getElementById("PC_Banco_"+idx).value);
		lista.push(convNro(document.getElementById("PC_Monto_"+idx).value));
		lista.push(convNro(document.getElementById("PC_Periodo_"+idx).value));
		lista.push(convNro(document.getElementById("PC_Costo_Financiero_"+idx).value));
	}
	return lista;
}

function getPA(){
	var lista = [];
    var table = document.getElementById("tablaPrestamoAdquisicion");
    var total = table.rows.length-1;
	lista.push(total);
    for (var i = 0; i< total; i++){
		var idx = i;
		lista.push(document.getElementById("PA_Banco_"+idx).value);
		lista.push(convNro(document.getElementById("PA_Mes_Anterior_"+idx).value));
		lista.push(convNro(document.getElementById("PA_Mes_Actual_"+idx).value));
		lista.push(convNro(document.getElementById("PA_Amort_Capital_"+idx).value));
		lista.push(convNro(document.getElementById("PA_Costo_Financiero_"+idx).value));
		lista.push(convNro(document.getElementById("PA_Cuota_Pagar_Aprox_"+idx).value));
		lista.push(convNro(document.getElementById("PA_Nro_Cuota_"+idx).value));
	}
	return lista;
}

function getPP(){
	var lista = [];
    var table = document.getElementById("tablaPrestamoPersonal");
    var total = table.rows.length-1;
	lista.push(total);
    for (var i = 0; i< total; i++){
		var idx = i;
		lista.push(document.getElementById("PP_Banco_"+idx).value);
		lista.push(document.getElementById("PP_Producto_"+idx).value);
		lista.push(convNro(document.getElementById("PP_Mes_Anterior_"+idx).value));
		lista.push(convNro(document.getElementById("PP_Mes_Actual_"+idx).value));
		lista.push(convNro(document.getElementById("PP_Amort_Capital_"+idx).value));
		lista.push(convNro(document.getElementById("PP_Costo_Financiero_"+idx).value));
		lista.push(convNro(document.getElementById("PP_Cuota_Pagar_Aprox_"+idx).value));
		lista.push(convNro(document.getElementById("PP_Nro_Cuota_"+idx).value));
	}
	return lista;
}

function getTC(){
	var lista = [];
    var table = document.getElementById("tablaTarjetaConsumo");
    var total = table.rows.length-1;
	lista.push(total);
    for (var i = 0; i< total; i++){
		var idx = i;
		lista.push(document.getElementById("TC_Banco_"+idx).value);
		lista.push(convNro(document.getElementById("TC_Linea_Utilizada_"+idx).value));
		lista.push(convNro(document.getElementById("TC_Linea_Total_"+idx).value));
		lista.push(convNro(document.getElementById("TC_Costo_Financiero_"+idx).value));
		lista.push(convNro(document.getElementById("TC_Costo_Aprox_Pagar_"+idx).value));
	}
	return lista;
}

function getResumen(){
	var lista = [];

	lista.push(document.getElementById("S1").value);
	lista.push(document.getElementById("S2").value);
	lista.push(document.getElementById("S3").value);
	
    lista.push(document.getElementById("S4").value);
	lista.push(document.getElementById("S5").value);
	lista.push(document.getElementById("S6").value);
	
    lista.push(document.getElementById("S7").value);
	lista.push(document.getElementById("S8").value);
	lista.push(document.getElementById("S9").value);
	lista.push(document.getElementById("comentario").value);
	

	return lista;
}
