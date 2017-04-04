function CompletarCronograma(datos){
	// Lineas / Tarjetas Capital
	AgregarLineaTarjeta();
	D_TKT = datos[1];
	document.getElementById("LTC_Linea_Total_0").value = D_TKT;
	document.getElementById("LTC_Linea_Total_0").innerHTML = convNro(D_TKT).toLocaleString('en');

	Calcular_Linea_Tarjeta_Total();

	// Prestamo Cancelable
	AgregarPrestamoCancelable();
	D_PC = datos[2];
	document.getElementById("PC_Monto_0").value = D_PC;
	document.getElementById("PC_Monto_0").innerHTML = convNro(D_PC).toLocaleString('en');

	Calcular_Prestamo_Cancelable_Total();

	// Prestamo Arrendamiento
	AgregarPrestamoAdquisicion();
	D_LP_M2 = datos[3];
	document.getElementById("PA_Mes_Anterior_0").value = D_LP_M2;
	document.getElementById("PA_Mes_Anterior_0").innerHTML = convNro(D_LP_M2).toLocaleString('en');
	D_LP_M1 = datos[4];
	document.getElementById("PA_Mes_Actual_0").value = D_LP_M1;
	document.getElementById("PA_Mes_Actual_0").innerHTML = convNro(D_LP_M1).toLocaleString('en');

	Calcular_Prestamo_Adquisicion_Total();

	// Prestamo Personal - Vehicular
	AgregarPrestamoPersonal();
	document.getElementById("PP_Producto_0").selectedIndex = "1";
	D_VEHI_M2 = datos[5];
	document.getElementById("PP_Mes_Anterior_0").value = D_VEHI_M2;
	document.getElementById("PP_Mes_Anterior_0").innerHTML = convNro(D_VEHI_M2).toLocaleString('en');
	D_VEHI_M1 = datos[6];
	document.getElementById("PP_Mes_Actual_0").value = D_VEHI_M1;
	document.getElementById("PP_Mes_Actual_0").innerHTML = convNro(D_VEHI_M1).toLocaleString('en');

	// Prestamo Personal - Hipotecario
	AgregarPrestamoPersonal();
	document.getElementById("PP_Producto_1").selectedIndex = "2";
	D_HIP_M2 = datos[7];
	document.getElementById("PP_Mes_Anterior_1").value = D_HIP_M2;
	document.getElementById("PP_Mes_Anterior_1").innerHTML = convNro(D_HIP_M2).toLocaleString('en');
	D_HIP_M1 = datos[8];
	document.getElementById("PP_Mes_Actual_1").value = D_HIP_M1;
	document.getElementById("PP_Mes_Actual_1").innerHTML = convNro(D_HIP_M1).toLocaleString('en');

	// Prestamo Personal - Libre Disponibilidad
	AgregarPrestamoPersonal();
	document.getElementById("PP_Producto_2").selectedIndex = "3";
	D_P_M2 = datos[9];
	document.getElementById("PP_Mes_Anterior_2").value = D_P_M2;
	document.getElementById("PP_Mes_Anterior_2").innerHTML = convNro(D_P_M2).toLocaleString('en');
	D_P_M1 = datos[10];
	document.getElementById("PP_Mes_Actual_2").value = D_P_M1;
	document.getElementById("PP_Mes_Actual_2").innerHTML = convNro(D_P_M1).toLocaleString('en');

	Calcular_Prestamo_Personal_Total();

	//Tarjeta de Consumo
	AgregarTarjetaConsumo();
	D_TUSADA = datos[11];
	document.getElementById("TC_Linea_Utilizada_0").value = D_TUSADA;
	document.getElementById("TC_Linea_Utilizada_0").innerHTML = convNro(D_TUSADA).toLocaleString('en');
	D_NOUSADA = datos[12];
	document.getElementById("TC_Linea_Total_0").value = D_TUSADA+D_NOUSADA;
	document.getElementById("TC_Linea_Total_0").innerHTML = convNro(D_TUSADA+D_NOUSADA).toLocaleString('en');

	Calcular_Tarjeta_Consumo_Total();

}