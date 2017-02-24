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
