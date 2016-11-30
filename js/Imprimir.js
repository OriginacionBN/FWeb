function Descargar_EEFF() {
	document.getElementById("header").style.display = 'none';
	document.getElementById("seccion_datos_cliente").style.display = 'none';
	document.getElementById("seccion_financiamiento").style.display = 'none';
	document.getElementById("seccion_ingresos").style.display = 'none';
	document.getElementById("seccion_egresos").style.display = 'none';
	document.getElementById("seccion_patrimonio").style.display = 'none';
	
	document.getElementById("btn_Descargar_EEFF").style.display = 'none';
	document.getElementById("btn_Descargar").style.display = 'none';
	document.getElementById("btn_Abrir").style.display = 'none';
	document.getElementById("btn_Cerrar").style.display = 'none';
	document.getElementById("btn_grabar").style.display = 'none';
	window.print();

	document.getElementById("btn_Descargar_EEFF").style.display = 'block';
	document.getElementById("btn_Descargar").style.display = 'block';
	document.getElementById("btn_Abrir").style.display = 'block';
	document.getElementById("btn_grabar").style.display = 'block';
	
	document.getElementById("header").style.display = 'block';
	document.getElementById("seccion_datos_cliente").style.display = 'block';
	document.getElementById("seccion_financiamiento").style.display = 'block';
	document.getElementById("seccion_ingresos").style.display = 'block';
	document.getElementById("seccion_egresos").style.display = 'block';
	document.getElementById("seccion_patrimonio").style.display = 'block';
}
function Descargar_Todo() {
	document.getElementById("btn_grabar").style.display = 'none';
	document.getElementById("mensaje").style.display = '';
	document.getElementById("btn_Descargar_EEFF").style.display = 'none';
	document.getElementById("btn_Descargar").style.display = 'none';
	document.getElementById("btn_Abrir").style.display = 'none';
	document.getElementById("btn_Cerrar").style.display = 'none';
	
	window.print();
	document.getElementById("btn_grabar").style.display = 'block';
	document.getElementById("mensaje").style.display = 'none';
	document.getElementById("btn_Descargar_EEFF").style.display = 'block';
	document.getElementById("btn_Descargar").style.display = 'block';
	document.getElementById("btn_Abrir").style.display = 'block';
}