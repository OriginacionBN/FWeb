function getFinanciamientoLP(){
	var cant_finan_LP = convNro(document.getElementById("cant_finan_LP").value);
	var listaFinanLP = [];
	listaFinanLP.push(cant_finan_LP);
	for(var i=0; i<cant_finan_LP;i++){
		var idx = i + 1;
		var Tipo_Prod_LP = document.getElementById("Tipo_Prod_LP_"+idx).value;
		listaFinanLP.push(Tipo_Prod_LP);
		var Precio_Venta = convNro(document.getElementById("Precio_Venta_"+idx).value);
		listaFinanLP.push(Precio_Venta);
		var Finan_LP = convNro(document.getElementById("Finan_LP_"+idx).value);
		listaFinanLP.push(Finan_LP);
		var Cuota_Inicial_LP = convNro(document.getElementById("Cuota_Inicial_LP_"+idx).value);
		listaFinanLP.push(Cuota_Inicial_LP);
		var TEA_LP = convNro(document.getElementById("TEA_LP_"+idx).value);
		listaFinanLP.push(TEA_LP);
		var TEM_LP = convNro(document.getElementById("TEM_LP_"+idx).value);
		listaFinanLP.push(TEM_LP);
		var Cuota_LP = convNro(document.getElementById("Cuota_LP_"+idx).value);
		listaFinanLP.push(Cuota_LP);
		var Plazo_LP = convNro(document.getElementById("Plazo_LP_"+idx).value);
		listaFinanLP.push(Plazo_LP);
		var GTIA_LP = convNro(document.getElementById("GTIA_LP_"+idx).value);
		listaFinanLP.push(GTIA_LP);
	}
	return listaFinanLP;
}
function getFinanciamientoCP(){
	var cant_finan_CP = convNro(document.getElementById("cant_finan_CP").value);
	var listaFinanCP = [];
	listaFinanCP.push(cant_finan_CP);
	for(var i=0; i<cant_finan_CP;i++){
		var idx = i + 1;
		var Tipo_Prod_CP = document.getElementById("Tipo_Prod_CP_"+idx).value;
		listaFinanCP.push(Tipo_Prod_CP);
		var Finan_CP = convNro(document.getElementById("Finan_CP_"+idx).value);
		listaFinanCP.push(Finan_CP);
		var TEA_CP = convNro(document.getElementById("TEA_CP_"+idx).value);
		listaFinanCP.push(TEA_CP);
		var TEM_CP = convNro(document.getElementById("TEM_CP_"+idx).value);
		listaFinanCP.push(TEM_CP);
		var Cuota_CP = convNro(document.getElementById("Cuota_CP_"+idx).value);
		listaFinanCP.push(Cuota_CP);
		var Plazo_CP = convNro(document.getElementById("Plazo_CP_"+idx).value);
		listaFinanCP.push(Plazo_CP);
		var GastFin_CP = convNro(document.getElementById("GastFin_CP_"+idx).value);
		listaFinanCP.push(GastFin_CP);
		
	}
	return listaFinanCP;
}

function getPatrimonioInmueble(){
	var listaPat = [];
    var table = document.getElementById("tablaPatrimonioInmueble");
    var total = table.rows.length-2;
	listaPat.push(total);
    for (var i = 0; i< total; i++){
		var idx = i +1;
		var Ubic = document.getElementById("Ubic_"+idx).value;
		listaPat.push(Ubic);
		var Propietario = document.getElementById("Propietario_"+idx).value;
		listaPat.push(Propietario);
		var Uso = document.getElementById("Uso_"+idx).value;
		listaPat.push(Uso);
		var Realizable = document.getElementById("Realizable_"+idx).value;
		listaPat.push(Realizable);
		var Metraje = convNro(document.getElementById("Metraje_"+idx).value);
		listaPat.push(Metraje);
		var Precio = convNro(document.getElementById("Precio_"+idx).value);
		listaPat.push(Precio);
		var Val_Inm_Dec = convNro(document.getElementById("Val_Inm_Dec_"+idx).value);
		listaPat.push(Val_Inm_Dec);
		var Val_Inm_Eva = convNro(document.getElementById("Val_Inm_Eva_"+idx).value);
		listaPat.push(Val_Inm_Eva);
	}
	return listaPat;
}
function getPatrimonioVehMaq() {
	var listaPat = [];
    var table = document.getElementById("tablaPatrimonioVehiculos");
    var total = table.rows.length - 2;
	listaPat.push(total);
    for (var i = 0; i< total; i++){
		var idx = i +1;
		var Veh_Maq = document.getElementById("Veh_Maq_"+idx).value;
		listaPat.push(Veh_Maq);
		var Placa = document.getElementById("Placa_"+idx).value;
		listaPat.push(Placa);
		var Valor_Nuevo = convNro(document.getElementById("Valor_Nuevo_"+idx).value);
		listaPat.push(Valor_Nuevo);
		var Antiguedad = convNro(document.getElementById("Antiguedad_"+idx).value);
		listaPat.push(Antiguedad);
		var Valor_Bien = convNro(document.getElementById("Valor_Bien_"+idx).value);
		listaPat.push(Valor_Bien);
	}
	return listaPat;
}

function getBalanceGeneral() {
    Calcular_Porcentajes_BG();
    var lista = [];
    var bg_1 = convNro(document.getElementById('bg_1').value);
    lista.push(bg_1);
    var bg_porc_1 = document.getElementById('bg_porc_1').value;
    lista.push(bg_porc_1);
    var bg_2 = convNro(document.getElementById('bg_2').value);
    lista.push(bg_2);
    var bg_porc_2 = document.getElementById('bg_porc_2').value;
    lista.push(bg_porc_2);
    var bg_3 = convNro(document.getElementById('bg_3').value);
    lista.push(bg_3);
    var bg_porc_3 = (document.getElementById('bg_porc_3').value);
    lista.push(bg_porc_3);
    var bg_4 = convNro(document.getElementById('bg_4').value);
    lista.push(bg_4);
    var bg_porc_4 = (document.getElementById('bg_porc_4').value);
    lista.push(bg_porc_4);
    var bg_5 = convNro(document.getElementById('bg_5').value);
    lista.push(bg_5);
    var bg_porc_5 = (document.getElementById('bg_porc_5').value);
    lista.push(bg_porc_5);
    var bg_6 = convNro(document.getElementById('bg_6').value);
    lista.push(bg_6);
    var bg_porc_6 = (document.getElementById('bg_porc_6').value);
    lista.push(bg_porc_6);
    var bg_7 = convNro(document.getElementById('bg_7').value);
    lista.push(bg_7);
    var bg_porc_7 = (document.getElementById('bg_porc_7').value);
    lista.push(bg_porc_7);
    var bg_8 = convNro(document.getElementById('bg_8').value);
    lista.push(bg_8);
    var bg_porc_8 = (document.getElementById('bg_porc_8').value);
    lista.push(bg_porc_8);
    var bg_9 = convNro(document.getElementById('bg_9').value);
    lista.push(bg_9);
    var bg_porc_9 = (document.getElementById('bg_porc_9').value);
    lista.push(bg_porc_9);
    var bg_10 = convNro(document.getElementById('bg_10').value);
    lista.push(bg_10);
    var bg_porc_10 = (document.getElementById('bg_porc_10').value);
    lista.push(bg_porc_10);
    var bg_11 = convNro(document.getElementById('bg_11').value);
    lista.push(bg_11);
    var bg_porc_11 = (document.getElementById('bg_porc_11').value);
    lista.push(bg_porc_11);

    var total_activo_cte = convNro(document.getElementById('total_activo_cte').value);
    lista.push(total_activo_cte);
    var total_activo_cte_porc = (document.getElementById('total_activo_cte_porc').value);
    lista.push(total_activo_cte_porc);

    var bg_12 = convNro(document.getElementById('bg_12').value);
    lista.push(bg_12);
    var bg_porc_12 = (document.getElementById('bg_porc_12').value);
    lista.push(bg_porc_12);
    var bg_13 = convNro(document.getElementById('bg_13').value);
    lista.push(bg_13);
    var bg_porc_13 = (document.getElementById('bg_porc_13').value);
    lista.push(bg_porc_13 );
    var bg_14 = convNro(document.getElementById('bg_14').value);
    lista.push(bg_14);
    var bg_porc_14 = (document.getElementById('bg_porc_14').value);
    lista.push(bg_porc_14);
    var bg_15 = convNro(document.getElementById('bg_15').value);
    lista.push(bg_15);
    var bg_porc_15 = (document.getElementById('bg_porc_15').value);
    lista.push(bg_porc_15);

    var total_activo_no_cte = convNro(document.getElementById('total_activo_no_cte').value);
    lista.push(total_activo_no_cte);
    var total_activo_no_cte_porc = (document.getElementById('total_activo_no_cte_porc').value);
    lista.push(total_activo_no_cte_porc);

    var total_activo = convNro(document.getElementById('total_activo').value);
    lista.push(total_activo);

    var bg_16 = convNro(document.getElementById('bg_16').value);
    lista.push(bg_16);
    var bg_porc_16 = (document.getElementById('bg_porc_16').value);
    lista.push(bg_porc_16);
    var bg_17 = convNro(document.getElementById('bg_17').value);
    lista.push(bg_17);
    var bg_porc_17 = (document.getElementById('bg_porc_17').value);
    lista.push(bg_porc_17);
    var bg_18 = convNro(document.getElementById('bg_18').value);
    lista.push(bg_18);
    var bg_porc_18 = (document.getElementById('bg_porc_18').value);
    lista.push(bg_porc_18);

    var total_pasivo_cte = convNro(document.getElementById('total_pasivo_cte').value);
    lista.push(total_pasivo_cte);
    var total_pasivo_cte_porc = (document.getElementById('total_pasivo_cte_porc').value);
    lista.push(total_pasivo_cte_porc);

    var bg_19 = convNro(document.getElementById('bg_19').value);
    lista.push(bg_19);
    var bg_porc_19 = (document.getElementById('bg_porc_19').value);
    lista.push(bg_porc_19);
    var bg_20 = convNro(document.getElementById('bg_20').value);
    lista.push(bg_20);
    var bg_porc_20 = (document.getElementById('bg_porc_20').value);
    lista.push(bg_porc_20);
    var bg_21 = convNro(document.getElementById('bg_21').value);
    lista.push(bg_21);
    var bg_porc_21 = (document.getElementById('bg_porc_21').value);
    lista.push(bg_porc_21);

    var total_pasivo_no_cte = convNro(document.getElementById('total_pasivo_no_cte').value);
    lista.push(total_pasivo_no_cte);
    var total_pasivo_no_cte_porc = (document.getElementById('total_pasivo_no_cte_porc').value);
    lista.push(total_pasivo_no_cte_porc);

    var total_pasivo = convNro(document.getElementById('total_pasivo').value);
    lista.push(total_pasivo);
    var total_pasivo_porc = (document.getElementById('total_pasivo_porc').value);
    lista.push(total_pasivo_porc);

    var patrimonio = convNro(document.getElementById('patrimonio').value);
    lista.push(patrimonio);
    var patrimonio_porc = (document.getElementById('patrimonio_porc').value);
    lista.push(patrimonio_porc);

    var pasivo_patrimonio = convNro(document.getElementById('pasivo_patrimonio').value);
    lista.push(pasivo_patrimonio);


    return lista;
}
function getEstadoResultados() {
    var lista = [];
    var egp_ventas = convNro(document.getElementById("egp_ventas").value);
    lista.push(egp_ventas);
    var egp_costoven = convNro(document.getElementById("egp_costoven").value);
    lista.push(egp_costoven);
    var egp_costoven_p = document.getElementById("egp_costoven_p").value;
    lista.push(egp_costoven_p);
    var egp_gastop = convNro(document.getElementById("egp_gastop").value);
    lista.push(egp_gastop);
    var egp_gastop_p = convNro(document.getElementById("egp_gastop_p").value);
    lista.push(egp_gastop_p);
    var egp_uoperativa = egp_ventas - egp_costoven - egp_gastop;
    lista.push(egp_uoperativa);
    var egp_uoperativa_p = document.getElementById("egp_uoperativa_p").value;
    lista.push(egp_uoperativa_p);
    var egp_gastfinan = convNro(document.getElementById("egp_gastfinan").value);
    lista.push(egp_gastfinan);
    var egp_gastfinan_p = document.getElementById("egp_gastfinan_p").value;
    lista.push(egp_gastfinan_p);
    var egp_gastfam = convNro(document.getElementById("egp_gastfam").value);
    lista.push(egp_gastfam);
    var egp_gastfam_p = document.getElementById("egp_gastfam_p").value;
    lista.push(egp_gastfam_p);
    var egp_otrosing = convNro(document.getElementById("egp_otrosing").value);
    lista.push(egp_otrosing);
    var egp_otrosing_p = document.getElementById("egp_otrosing_p").value;
    lista.push(egp_otrosing_p);
    var egp_impuestos = convNro(document.getElementById("egp_impuestos").value);
    lista.push(egp_impuestos);
    var egp_impuestos_p = convNro(document.getElementById("egp_impuestos_p").value);
    lista.push(egp_impuestos_p);
    var egp_uneta = egp_uoperativa - egp_gastfinan - egp_gastfam + egp_otrosing - egp_impuestos;
    lista.push(egp_uneta);
    var egp_uneta_p = convNro(document.getElementById("egp_uneta_p").value);
    lista.push(egp_uneta_p);
    var espOtrosIng = document.getElementById("espOtrosIng").value;
    lista.push(espOtrosIng);
    return lista;
}
function getCanalizacion() {
    var lista = [];
    var AnteriorIngresos = convNro(document.getElementById("AnteriorIngresos").value);
    lista.push(AnteriorIngresos);
    var AnteriorSMA = convNro(document.getElementById("AnteriorSMA").value);
    lista.push(AnteriorSMA);
    var EnCursoIngresos = convNro(document.getElementById("EnCursoIngresos").value);
    lista.push(EnCursoIngresos);
    var EnCursoSMA = convNro(document.getElementById("EnCursoSMA").value);
    lista.push(EnCursoSMA);
    return lista;
}
function getRatios() {
    var lista = [];
    var LiquidezCTE = convNro(document.getElementById("LiquidezCTE").value);
    LiquidezCTE = Number(LiquidezCTE).toFixed(2);
    lista.push(LiquidezCTE);
    var CapitalTrabajo = convNro(document.getElementById("CapitalTrabajo").value);
    CapitalTrabajo = Number(CapitalTrabajo).toFixed(2);
    lista.push(CapitalTrabajo);
    var DiasExistencias = convNro(document.getElementById("DiasExistencias").value);
    DiasExistencias = Number(DiasExistencias).toFixed(2);
    lista.push(DiasExistencias);
    var DiasCobro = convNro(document.getElementById("DiasCobro").value);
    DiasCobro = Number(DiasCobro).toFixed(2);
    lista.push(DiasCobro);
    var DiasPago = convNro(document.getElementById("DiasPago").value);
    DiasPago = Number(DiasPago).toFixed(2);
    lista.push(DiasPago);
    var CicloNegocio = convNro(document.getElementById("CicloNegocio").value);
    CicloNegocio = Number(CicloNegocio).toFixed(2);
    lista.push(CicloNegocio);
    var PayBack = convNro(document.getElementById("PayBack").value);
    PayBack = Number(PayBack).toFixed(2);
    lista.push(PayBack);
    var CoberturaDeuda = convNro(document.getElementById("CoberturaDeuda").value);
    CoberturaDeuda = Number(CoberturaDeuda).toFixed(2);
    lista.push(CoberturaDeuda);
    return lista;
}

function getDictamen() {
    var lista = [];
    var dictamen = document.getElementById('dictamen').value;
    lista.push(dictamen);
    var motivo = document.getElementById('motivo').value;
    lista.push(motivo);
    return lista;
}
