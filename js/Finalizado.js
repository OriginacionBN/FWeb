function CompletarFLP2(lista) {
	var cantidad = lista[0];
	for (var i = 0; i < cantidad; i++) {
		Agregar_Financimiento_LP();
	}
	var codigos = lista[1];
	var data = lista[2];
	for (var i = 0; i < codigos.length; i++) {
		etiquetas.push(codigos[i]);
		document.getElementById(codigos[i]).value = data[i];
		document.getElementById(codigos[i]).innerHTML = data[i];
		document.getElementById(codigos[i]).disabled = true;
	}
}
function CompletarFCP2(lista) {
	var cantidad = lista[0];
	
	for (var i = 0; i < cantidad; i++) {
		Agregar_Financimiento_CP();
	}
	var codigos = lista[1];
	var data = lista[2];
	for (var i = 0; i < codigos.length; i++) {
		etiquetas.push(codigos[i]);
		var codigo = codigos[i];
		var dato = data[i];
		if (codigo.indexOf("Tipo_Prod_CP_") != -1) {
			var index = 0;
			if (dato == "Financiamiento de Importación") {
				index = 1;
			} else if (dato == "Financiamiento de Exportación") {
				index = 2;
			} else if (dato == "Préstamo para capital de trabajo") {
				index = 3;
			} else if (dato == "Tarjeta capital de trabajo") {
				index = 4;
			} else if (dato == "Descuento de letra/factura negociable") {
				index = 5;
			} else if (dato == "Tarjeta Empresarial") {
				index = 6;
			} else if (dato == "Préstamo para adquisición de bienes muebles pequeños") {
				index = 7;
			} else if (dato == "Subrogación de deuda") {
				index = 8;
			} else if (dato == "Incremento de línea de TKT") {
				index = 9;
			} else if (dato == "Incremento de línea de T/C") {
				index = 10;
			} else if (dato == "Otro") {
				index = 11;
			}


			document.getElementById(codigo).selectedIndex = index;
		} else {
			document.getElementById(codigo).value = data[i];
			document.getElementById(codigo).innerHTML = data[i];
		}
		document.getElementById(codigos[i]).disabled = true;
	}
}
function CompletarPI2(lista) {
	var cantidad = lista[0];
	for (var i = 1; i < cantidad; i++) {
		AgregarPatrimonio1();
	}
	var codigos = lista[1];
	var data = lista[2];
	for (var i = 0; i < codigos.length; i++) {
		etiquetas.push(codigos[i]);
		var codigo = codigos[i];
		var dato = data[i];
		if (codigo.indexOf("Realizable_") != -1) {
			var index = 0;
			if (dato == "Si") {
				index = 1;
			} else if (dato == "No") {
				index = 2;
			}


			document.getElementById(codigo).selectedIndex = index;
		} else {
			document.getElementById(codigo).value = data[i];
			document.getElementById(codigo).innerHTML = data[i];
		}
		document.getElementById(codigos[i]).disabled = true;
	}
}
function CompletarPVM2(lista) {
	var cantidad = lista[0];
	for (var i = 1; i < cantidad; i++) {
		AgregarPatrimonio2();
	}
	var codigos = lista[1];
	var data = lista[2];
	for (var i = 0; i < codigos.length; i++) {
		etiquetas.push(codigos[i]);
		var codigo = codigos[i];
		var dato = data[i];
		if (codigo.indexOf("Veh_Maq_") != -1) {
			var index = 0;
			if (dato == "Vehiculo") {
				index = 1;
			} else if (dato == "Maquinaria") {
				index = 2;
			}
			document.getElementById(codigo).selectedIndex = index;
		} else {
			document.getElementById(codigo).value = data[i];
			document.getElementById(codigo).innerHTML = data[i];
		}
		document.getElementById(codigos[i]).disabled = true;
	}
}

function CompletarLTC2(lista) {
	var cantidad = lista[0];
	for (var i = 0; i < cantidad; i++) {
		AgregarLineaTarjeta();
	}
	var codigos = lista[1];
	var data = lista[2];
	for (var i = 0; i < codigos.length; i++) {
		etiquetas.push(codigos[i]);
		document.getElementById(codigos[i]).value = data[i];
		document.getElementById(codigos[i]).innerHTML = data[i];
		document.getElementById(codigos[i]).disabled = true;
	}
}
function CompletarPCCT2(lista) {
	var cantidad = lista[0];
	for (var i = 0; i < cantidad; i++) {
		AgregarPrestamoComercial();
	}
	var codigos = lista[1];
	var data = lista[2];
	for (var i = 0; i < codigos.length; i++) {
		etiquetas.push(codigos[i]);
		document.getElementById(codigos[i]).value = data[i];
		document.getElementById(codigos[i]).innerHTML = data[i];
		document.getElementById(codigos[i]).disabled = true;
	}
}
function CompletarPC2(lista) {
	var cantidad = lista[0];
	for (var i = 0; i < cantidad; i++) {
		AgregarPrestamoCancelable();
	}
	var codigos = lista[1];
	var data = lista[2];
	for (var i = 0; i < codigos.length; i++) {
		etiquetas.push(codigos[i]);
		document.getElementById(codigos[i]).value = data[i];
		document.getElementById(codigos[i]).innerHTML = data[i];
		document.getElementById(codigos[i]).disabled = true;
	}
}
function CompletarPA2(lista) {
	var cantidad = lista[0];
	for (var i = 0; i < cantidad; i++) {
		AgregarPrestamoAdquisicion();
	}
	var codigos = lista[1];
	var data = lista[2];
	for (var i = 0; i < codigos.length; i++) {
		etiquetas.push(codigos[i]);
		document.getElementById(codigos[i]).value = data[i];
		document.getElementById(codigos[i]).innerHTML = data[i];
		document.getElementById(codigos[i]).disabled = true;
	}
}
function CompletarPP2(lista) {
	var cantidad = lista[0];
	for (var i = 0; i < cantidad; i++) {
		AgregarPrestamoPersonal();
	}
	var codigos = lista[1];
	var data = lista[2];
	for (var i = 0; i < codigos.length; i++) {
		etiquetas.push(codigos[i]);
		document.getElementById(codigos[i]).value = data[i];
		document.getElementById(codigos[i]).innerHTML = data[i];
		document.getElementById(codigos[i]).disabled = true;
	}
}
function CompletarTC2(lista) {
	var cantidad = lista[0];
	for (var i = 0; i < cantidad; i++) {
		AgregarTarjetaConsumo();
	}
	var codigos = lista[1];
	var data = lista[2];
	for (var i = 0; i < codigos.length; i++) {
		etiquetas.push(codigos[i]);
		document.getElementById(codigos[i]).value = data[i];
		document.getElementById(codigos[i]).innerHTML = data[i];
		document.getElementById(codigos[i]).disabled = true;
	}
}
function CompletarResumen2(lista) {
	var codigos = lista[0];
	var data = lista[1];
	for (var i = 0; i < codigos.length; i++) {
		etiquetas.push(codigos[i]);
		document.getElementById(codigos[i]).value = data[i];
		document.getElementById(codigos[i]).innerHTML = data[i];
		document.getElementById(codigos[i]).disabled = true;
	}
}
function CompletarGeneral2(lista) {
	document.getElementById('finalizado').value = 1;
	document.getElementById('seccion_sancion').style.display = 'block';
	var codigos = lista[0];
	var data = lista[1];
	for (var i = 0; i < codigos.length; i++) {
		etiquetas.push(codigos[i]);
		
		var codigo = codigos[i];
		var dato = data[i];
		if (codigo.indexOf("oficinas") != -1) {
			document.getElementById(codigo).selectedIndex = dato;
			document.getElementById(codigo).disabled = true;
		} else if (codigo.indexOf("tipoCliente") != -1) {
			var index = 0;
			if (dato == "PNN") {
				index = 1;
			} else if (dato == "PJ") {
				index = 2;
			}
			document.getElementById(codigo).selectedIndex = index;
			document.getElementById(codigo).disabled = true;
		} else if (codigo.indexOf("regimen") != -1) {
			var index = 0;
			if (dato == "Reg General") {
				index = 1;
			} else if (dato == "RER") {
				index = 2;
			} else if (dato == "RUS") {
				index = 3;
			}
			document.getElementById(codigo).selectedIndex = index;
			document.getElementById(codigo).disabled = true;
		} else if (codigo.indexOf("dictamen") != -1) {
			var index = 0;
			if (dato == "Favorable") {
				index = 0;
			} else if (dato == "Desfavorable") {
				index = 1;
			}
			document.getElementById(codigo).selectedIndex = index;
			document.getElementById(codigo).disabled = true;
		} else if (codigo.indexOf("buro") != -1) {
			var index = 0;
			if (dato == "G1") {
				index = 1;
			} else if (dato == "G2") {
				index = 2;
			} else if (dato == "G3") {
				index = 3;
			} else if (dato == "G4") {
				index = 4;
			} else if (dato == "G5") {
				index = 5;
			} else if (dato == "G6") {
				index = 6;
			} else if (dato == "G7") {
				index = 7;
			} else if (dato == "G8") {
				index = 8;
			} else if (dato == "NB") {
				index = 9;
			}
			document.getElementById(codigo).selectedIndex = index;
			document.getElementById(codigo).disabled = true;
		} else if (codigo.indexOf("actividad") != -1) {
			document.getElementById(codigo).selectedIndex = dato;
			document.getElementById(codigo).disabled = true;
		} else if (codigo.indexOf("egp_uneta") != -1 || codigo.indexOf("egp_gastfinan") != -1) {
			document.getElementById(codigo).selectedIndex = convNro(dato).toLocaleString('en');
			document.getElementById(codigo).disabled = true;
		} else {
			document.getElementById(codigo).value = data[i];
			document.getElementById(codigo).innerHTML = data[i];
			document.getElementById(codigo).disabled = true;
		}
		document.getElementById(codigo).disabled = true;
	}
	
	document.getElementById('dictamen').disabled = true;
	
}