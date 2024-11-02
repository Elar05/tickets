const URL_BASE = document.getElementById("urlBase").value;
let CONTROLLER = "";
let VIEW = "";

async function request(url, data = "", method = "GET") {
  const options = { method };

  if (method !== "GET" && method !== "HEAD") {
    options.body = data;
  }

  try {
    const response = await fetch(URL_BASE + url, options);
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

function validate(className) {
  let requireds = required(className);

  if (requireds > 0) {
    iziAlert("error", "Los datos en rojo es obligatorio");
    return false;
  }

  return true;
}

function required(className) {
  let controls = document.querySelectorAll("." + className);
  let required = 0;
  controls.forEach((control) => {
    control.style.borderColor = "";

    let select2 = document.getElementById(`select2-${control.id}-container`);
    if (select2) select2.style.borderColor = "";

    if (control.value === "") {
      control.style.borderColor = "red";
      if (select2) select2.style.borderColor = "red";
      required++;
    }
  });

  return required;
}

function getDataSave(className) {
  let data = "";
  let controls = document.querySelectorAll("." + className);
  controls.forEach((control) => {
    let tagName = control.tagName;
    if (tagName === "INPUT") {
      let prefix = control.id.slice(0, 3);
      if (
        prefix === "txt" ||
        prefix === "num" ||
        prefix === "tim" ||
        prefix === "dtt"
      ) {
        data += control.value.trim();
      }
      if (prefix === "chk" || prefix === "opt") {
        data += control.checked ? "1" : "0";
      }
    }
    if (tagName === "SELECT" || tagName === "TEXTAREA") {
      data += control.value;
    }
    data += "|";
  });

  return data.slice(0, data.length - 1);
}

function iziAlert(status, message) {
  toastr.options = {
    closeButton: true,
    newestOnTop: true,
    progressBar: true,
    positionClass: "toastr-top-right",
    timeOut: "5000",
    showEasing: "swing",
    hideEasing: "linear",
    showMethod: "fadeIn",
    hideMethod: "fadeOut",
  };

  const alerts = {
    success: () => toastr.success("", message),
    error: () => toastr.error("", message),
    info: () => toastr.info("", message),
    warning: () => toastr.warning("", message),
  };

  if (alerts[status]) {
    alerts[status]();
  } else {
    alert("Tipo de alerta no válido: " + status);
  }
}

function cambiarImagen(fup, idImagen) {
  var file = fup.files[0];
  var reader = new FileReader();
  reader.onloadend = function (event) {
    var img = document.getElementById(idImagen);
    if (img != null) img.src = reader.result;
  };
  reader.readAsDataURL(file);
}

function hideSection(className) {
  let inputs = document.getElementsByClassName(className);
  inputs.forEach((input) => input.setAttribute("hidden", true));
}

function showSection(className) {
  let inputs = document.getElementsByClassName(className);
  inputs.forEach((input) => input.removeAttribute("hidden"));
}

function blockSection(className) {
  let inputs = document.getElementsByClassName(className);
  inputs.forEach((input) => input.setAttribute("disabled", true));
}

function unlockSection(className) {
  let inputs = document.getElementsByClassName(className);
  inputs.forEach((input) => input.removeAttribute("disabled"));
}

function createCombo(list, id, firstElement = false) {
  let content = "";
  if (firstElement) {
    content += `<option value="">${firstElement}</option>`;
  }
  list.forEach((element) => {
    element = element.split("|");
    if (element[1] !== "") {
      content += `<option value="${element[0]}">${element[1]}</option>`;
    }
  });
  let cbo = document.getElementById(id);
  if (cbo !== null) cbo.innerHTML = content;
}

function imgToBase64(src, callback) {
  var outputFormat = src.slice(-3) === "png" ? "image/png" : "image/jpeg";
  var img = new Image();
  img.crossOrigin = "Anonymous";
  img.onload = function () {
    var canvas = document.createElement("CANVAS");
    var ctx = canvas.getContext("2d");
    var dataURL;
    canvas.height = this.naturalHeight;
    canvas.width = this.naturalWidth;
    ctx.drawImage(this, 0, 0);
    dataURL = canvas.toDataURL(outputFormat);
    callback(dataURL);
  };
  img.src = src;
  if (img.complete || img.complete === undefined) {
    img.src =
      "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
    img.src = src;
  }
}

function validarNumeros(className) {
  var controles = document.getElementsByClassName(className);
  var control;
  var nControles = controles.length;
  var fila;
  var mensaje = "";
  for (var j = 0; j < nControles; j++) {
    control = controles[j];
    if (isNaN(control.value)) {
      fila = control.parentNode.parentNode;
      mensaje += "<li>";
      mensaje += control.getAttribute("data-msg");
      mensaje += " debe ser numérico</li>";
      control.style.borderColor = "red";
    } else {
      if (control.value * 1 < 0) {
        fila = control.parentNode.parentNode;
        mensaje += "<li>";
        mensaje += control.getAttribute("data-msg");
        mensaje += " debe ser numérico mayor o igual a cero</li>";
        control.style.borderColor = "red";
      } else control.style.borderColor = "";
    }
  }
  return mensaje;
}

function redirect(url) {
  window.location.href = URL_BASE + url;
}

function messageAlert(message, alert) {
  const alertTitles = {
    error: "Alerta del Sistema",
    info: "Información del Sistema",
    success: "Correcto",
  };

  const title = alertTitles[alert] || "Correcto";

  Swal.fire({
    icon: alert,
    title,
    text: message,
    confirmButtonColor: "#2143FD",
    closeOnCancel: false,
    closeOnConfirm: false,
    allowOutsideClick: false,
  });
}

function equivalenciasMeses(mes) {
  const meses = {
    Jan: "01",
    Feb: "02",
    Mar: "03",
    Apr: "04",
    May: "05",
    Jun: "06",
    Jul: "07",
    Aug: "08",
    Sep: "09",
    Oct: "10",
    Nov: "11",
    Dec: "12",
  };
  return meses[mes] || "";
}

function formatearFechaYMD(fecha) {
  if (!fecha) {
    return "";
  }

  let mes = "";
  let dia = "";
  let anio = "";

  if (fecha.includes("/")) {
    let dfecha = fecha.split("/");
    if (dfecha.length !== 3) {
      return "";
    }
    dia = dfecha[0].padStart(2, "0");
    mes = dfecha[1].padStart(2, "0");
    anio = dfecha[2];
  } else if (fecha.includes("-")) {
    return fecha;
  } else {
    // Reemplaza múltiples espacios por uno solo y recorta espacios en los extremos
    fecha = fecha.replace(/\s+/g, " ").trim();
    let dfecha = fecha.split(" ");
    if (dfecha.length !== 3) {
      return "";
    }
    mes = equivalenciasMeses(dfecha[0]);
    dia = dfecha[1].padStart(2, "0");
    anio = dfecha[2];
  }

  return `${anio}-${mes}-${dia}`;
}

function showLoading(div) {
  var div = document.getElementById(div);
  if (div != null) {
    div.style.textAlign = "center";
    div.innerHTML =
      "<span style='color:red;font-size:28px'>Procesando información <i class='fa fa-circle-o-notch fa-spin'></i><span>";
  }
}

function redondearDecimales(numero, decimales) {
  return Math.round(numero * Math.pow(10, decimales)) / Math.pow(10, decimales);
}

function redondearNumero(num, dec) {
  if (dec == null) dec = 2;
  var m = Number((Math.abs(num) * 100).toPrecision(15));
  return (Math.round(m) / 100) * Math.sign(num);
}

function formatoNumeroDecimal(num, dec) {
  if (dec == null) dec = 2;
  let decimalString = "000000";
  let valor = num.toString().split(".");
  valorEntero = valor[0];
  valorEntero = valorEntero.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  valor[1] == null
    ? (valorDecimal = decimalString.substring(0, dec))
    : (valorDecimal = valor[1].toString().substring(0, dec));

  return valorEntero + "." + valorDecimal;
}

function formatoNumeroEntero(num) {
  if (!num || num == "NaN") return "-";
  if (num == "Infinity") return "&#x221e;";
  num = num.toString().replace(/\$|\,/g, "");
  if (isNaN(num)) num = "0";
  sign = num == (num = Math.abs(num));
  num = Math.floor(num * 100 + 0.50000000001);
  cents = num % 100;
  num = Math.floor(num / 100).toString();
  if (cents < 10) cents = "0" + cents;
  for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
    num =
      num.substring(0, num.length - (4 * i + 3)) +
      "," +
      num.substring(num.length - (4 * i + 3));
  return (sign ? "" : "-") + num;
}

function formatDate(fecha) {
  return fecha.split("/").reverse().join("-");
}

function updateCombo(control, value) {
  const element = document.getElementById(control);
  if (element) {
    element.value = value;
    const event = new Event("change", { bubbles: true });
    element.dispatchEvent(event);
  }
}

function showDataFrom(className, values) {
  const controls = document.querySelectorAll(`.${className}`);
  controls.forEach((control, index) => {
    control.style.borderColor = "";
    const type = control.id.slice(0, 3);
    const value = values[index];

    if (type === "txt" || type === "tta" || type === "tim")
      control.value = value;

    if (type === "num") control.value = redondearNumero(value);
    if (type === "dtt") control.value = value;
    if (type === "lbl") control.innerText = value;
    if (type === "cbo") updateCombo(control.id, value);
    if (type === "img") control.src = `data:image/jpeg;base64,${value}`;
    if (type === "chk" || type === "opt") control.checked = value === "1";
  });
}

function clearForm(className) {
  let controls = document.querySelectorAll("." + className);
  controls.forEach((control) => {
    let tipo = control.id.slice(0, 3);
    if (tipo === "chk" || tipo === "opt") {
      control.checked = false;
    } else if (tipo == "lbl") {
      control.innerHTML = "";
    } else {
      control.value = "";
      control.style.borderColor = "";
      updateCombo(control.id, "");
    }
  });
}

function uncheckAll(className) {
  const controles = document.getElementsByClassName(className);
  controles.forEach((control) => (control.checked = false));
}

function validarURL(url) {
  var res = url.match(
    /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
  );
  if (res == null) return false;
  else return true;
}

function contadorHoras(segundos) {
  var hour = Math.floor(segundos / 3600);
  hour = hour < 10 ? "0" + hour : hour;
  var minute = Math.floor((segundos / 60) % 60);
  minute = minute < 10 ? "0" + minute : minute;
  var second = segundos % 60;
  second = second < 10 ? "0" + second : second;
  return hour + ":" + minute + ":" + second;
}

function reproducirVoz(texto) {
  speechSynthesis.speak(new SpeechSynthesisUtterance(texto));
}

var botones = [
  {
    cabecera: "Editar",
    className:
      "ki-solid ki-pencil fs-3 btn btn-sm btn-icon btn-primary w-30px h-30px",
    id: "Editar",
  },
  {
    cabecera: "Anular",
    className:
      "ki-solid ki-minus-circle fs-3 btn btn-sm btn-icon btn-danger w-30px h-30px",
    id: "Eliminar",
  },
];

var btnListNew = [];

function GrillaScroll(
  lista,
  divGrilla,
  registrosPagina,
  paginasBloque,
  tabla,
  controlador,
  listas,
  sinFiltros,
  sinReporte,
  botones,
  altoGrilla,
  tieneFiltro,
  tieneChecks,
  tieneMensajeRegistros,
  tieneOrden,
  subtotales,
  estilos,
  colOculEliminar,
  listaCheck,
  dec,
  anchoBotonera
) {
  var nListas = listas != null ? listas.length : 0;
  var matriz = [];
  var ordenIndice = 0;
  var ordenTipo = 0;
  subtotales = subtotales == null ? [] : subtotales;
  estilos = estilos == null ? [] : estilos;

  var indicePagina = 0;
  if (registrosPagina == null) registrosPagina = 20;
  if (anchoBotonera == null) anchoBotonera = 80;

  var indiceBloque = 0;
  if (paginasBloque == null) paginasBloque = 10;
  var archivo;
  var cabeceras = [];
  var anchos = [];
  var tipos = [];
  botones = botones == null ? [] : botones;
  //Botones Lista
  for (var i = 0; i < btnListNew.length; i++) {
    let index = botones.findIndex((obj) => obj["id"] === btnListNew[i]);
    if (index !== -1) {
      botones.splice(index, 1);
    }
  }

  var nBotones = botones.length;
  var existeFiltro = tieneFiltro == null;
  var existeChecks = tieneChecks != null;
  var tieneMensajeRegistros =
    tieneMensajeRegistros == null ? true : tieneMensajeRegistros;
  tieneOrden = tieneOrden == null ? true : tieneOrden;
  dec = dec == null ? 2 : dec;
  var ids = [];

  //Subtotales
  var totales = [];
  if (listaCheck != null && listaCheck.length > 0) {
    var nChecks = listaCheck.length;
    for (var i = 0; i < nChecks; i++) {
      ids.push(listaCheck[i]);
    }
  }

  iniciarGrilla();

  function iniciarGrilla() {
    crearTabla();
    filtrarMatriz();
    configurarFiltros();
    if (tieneOrden) configurarOrdenacion();
    configurarPaginacion();
    configurarBotones();
    configControlSecond(2, divGrilla, botones);
  }

  function crearTabla() {
    cabeceras = lista[0].split("|");
    anchos = lista[1].split("|");
    tipos = lista[2].split("|");

    var nRegistros = lista.length;
    var nCampos = cabeceras.length;
    var contenido = `
    <div class='table-container' style='height:${altoGrilla}em;'>
      <div>
        <div style='text-align: right;'>
    `;
    if (sinFiltros == null) {
      contenido += `
          <button id='btnLimpiar${divGrilla}' 
            class='btn btn-warning btn-sm' style='background-color:#f3e92d'>
            <i class='fa fa-paint-brush p-0'></i>
          </button>
      `;
    }
    if (existeFiltro) {
      contenido += `
          <button id='btnFiltro${divGrilla}' class='btn btn-info btn-sm' style='background-color:#f3e92d'
            value='Filtro' title='${
              sinFiltros == null ? "Quitar Filtro" : "Activar Filtro"
            }'
          >
            <i class='fa fa-filter p-0'></i>
          </button>
      `;
    }
    if (sinReporte) {
      contenido += `
          <button id='btnExportarXlsx${divGrilla}' class='btn btn-success btn-sm'>
            <i class='fa fa-file-excel text-c-green p-0'></i> Excel
          </button>
          <button id='btnExportarPdf${divGrilla}' class='btn btn-danger btn-sm'>
            <i class='fa fa-file-pdf text-c-red p-0'></i> PDF
          </button>
      `;
    }
    contenido += `
        </div>
      </div>
    `;

    contenido += `
      <table class='grilla bordered Tabla table-scroll' id='tbl${divGrilla}'>
        <thead>
          <tr class='FilaHead'>
    `;

    if (existeChecks) {
      contenido += `
            <th style='width:30px' class='NoImprimir'>
              <input type='checkbox' class='selcheckbox' />
            </th>
      `;
    }

    var totalancho = 0;
    var prefijo = "";
    var ancho;
    for (var j = 0; j < nCampos; j++) {
      prefijo = anchos[j].slice(0, 1);
      contenido += "<th style='white-space:pre-wrap;width:";

      if (prefijo == "c") ancho = anchos[j].slice(1, anchos[j].length - 1);
      else ancho = anchos[j];

      totalancho = totalancho + ancho * 1;
      contenido += ancho + "px";

      if (j == 0) contenido += ";display:none";

      contenido += "'>";
      contenido += `<span class='Enlace ${divGrilla} Enlace' data-ind='${j}'>${cabeceras[j]}</span>`;

      if (sinFiltros == null) {
        contenido += "<br/>";
        if (prefijo === "c") {
          contenido += `<select class='${divGrilla}Cabecera Combo bordered' style='width:90%`;
          if (sinFiltros != null) contenido += ";display:none";
          contenido += "'>";
        } else {
          contenido += `<input type='text' class='${divGrilla}Cabecera Texto bordered'`;
          contenido += "style='width:90%; outline:none;";
          if (sinFiltros != null) contenido += "display:none;";
          contenido += "'>";
        }
      }
      contenido += "</th>";
    }
    if (nBotones > 0) {
      contenido += `<th style='width:${anchoBotonera}px'></th>`;
    }
    contenido += `</tr></thead><tbody id='tbData${divGrilla}'></tbody>`;

    if (subtotales.length > 0) {
      contenido += "<tfoot>";
      var nCols = existeChecks ? nCampos + 1 : nCampos;
      var n = existeChecks ? 1 : 0;
      contenido += "<tr class='FilaHead'>";
      var ccs = 0;
      for (var j = 0; j < nCols; j++) {
        contenido += "<th style='white-space:pre-wrap;text-align:right;width:";
        if (prefijo == "c") ancho = anchos[j].slice(1, anchos[j].length - 1);
        else ancho = anchos[j];
        contenido += ancho;
        contenido += "px";
        if (j == 0) contenido += ";display:none";
        if (subtotales.indexOf(j - n) > -1) {
          contenido += "' id='total";
          contenido += divGrilla;
          contenido += subtotales[ccs];
          contenido += "'";
          ccs++;
        }
        contenido += "'>";

        if (subtotales.indexOf(j - n) > -1) {
          contenido += "0";
        }
        contenido += "</th>";
      }
      contenido += "</tr></tfoot>";
    }

    contenido += "</table>";
    contenido += "<div>";
    contenido += "<div style='margin-top:10px'>";

    if (tieneMensajeRegistros) {
      contenido += "<div style='float:left;width:30%;text-align:left'>";
      contenido += "Registros: <span id='spnRegistros";
      contenido += divGrilla;
      contenido += "' class='fw-bold'></span>";
      contenido += "</div>";
    }

    contenido += "<div id='tdPagina";
    contenido += divGrilla;
    contenido += "' style='float:left;width:70%;text-align:right'>";
    contenido += "</div>";

    contenido += "</div>";

    document.getElementById(divGrilla).innerHTML = "";
    document.getElementById(divGrilla).innerHTML = contenido;
    var ancho = document.getElementById("tbl" + divGrilla).clientWidth;
    if (totalancho > ancho) {
      document.getElementById("tbl" + divGrilla).style.width =
        totalancho + "px";
    }
  }

  function crearMatriz() {
    matriz = [];
    var campos = [];
    var nRegistros = lista.length;
    var nCampos = lista[0].split("|").length;

    var valores = [];
    var controles = document.getElementsByClassName(divGrilla + "Cabecera");
    var nControles = controles.length;
    var control;
    var valor = "";

    if (subtotales.length > 0) {
      totales = [];
      var nSubtotales = subtotales.length;
      for (var j = 0; j < nSubtotales; j++) {
        totales.push(0);
      }
    }

    if (sinFiltros == null) {
      for (var j = 0; j < nControles; j++) {
        control = controles[j];
        if (control.className.indexOf("Combo") > -1) {
          valores.push(
            control.options[control.selectedIndex].text.toLowerCase()
          );
        } else valores.push(control.value.toLowerCase());
      }
    }
    //else {
    //    var txtSearch = document.getElementById("txtSearch" + divGrilla);
    //    if (txtSearch != null) valor = txtSearch.value.toLowerCase();
    //}
    var c = 0;
    var exito = true;
    var fila = [];
    var nFilas = lista[3].length;
    if (nFilas > 0 && lista[3] != "" && lista[3] != null) {
      for (var i = 3; i < nRegistros; i++) {
        campos = lista[i].split("|");

        exito = true;
        if (sinFiltros == null) {
          for (var j = 0; j < nControles; j++) {
            control = controles[j];
            if (control.className.indexOf("Combo") > -1) {
              exito =
                valores[j] == "todos" || campos[j].toLowerCase() == valores[j];
            } else
              exito =
                valores[j] == "" ||
                campos[j].toLowerCase().indexOf(valores[j]) > -1;
            if (!exito) break;
          }
        } else {
          for (var j = 0; j < nCampos; j++) {
            exito = valor == "" || campos[j].toLowerCase().indexOf(valor) > -1;
            if (exito) break;
          }
        }
        ccs = 0;
        if (exito) {
          c++;
          fila = [];
          for (var j = 0; j < nCampos; j++) {
            if (campos[j] == "" || isNaN(campos[j])) fila.push(campos[j]);
            else {
              if (campos[j].slice(0, 1) == "0") {
                if (campos[j].indexOf(".") > -1) fila.push(+campos[j]);
                else fila.push(campos[j]);
              } else fila.push(+campos[j]);
            }
            if (subtotales.length > 0 && subtotales.indexOf(j) > -1) {
              valor = fila[j];
              totales[ccs] += valor;
              ccs++;
            }
          }
          matriz.push(fila);
        }
      }
    }
  }

  function mostrarMatriz() {
    var contenido = "";
    var campos = [];
    var nRegistros = matriz.length;
    var prefijo = "";

    if (nRegistros > 0) {
      var nCampos = matriz[0].length;
      var tipos = lista[2].split("|");
      var inicio = indicePagina * registrosPagina;
      var fin = inicio + (sinFiltros == null ? registrosPagina : nRegistros);
      var valor = "";
      for (var i = inicio; i < fin; i++) {
        if (i < nRegistros) {
          seleccionada = ids.indexOf(matriz[i][0].toString()) > -1;
          contenido += "<tr class='";
          contenido += seleccionada ? "FilaSeleccionada" : "FilaDatos";
          contenido += "' onclick='seleccionarFila(this, \"";
          contenido += matriz[i][0];
          contenido += '","';
          contenido += divGrilla;
          contenido += "\", event);'>";
          if (existeChecks) {
            contenido += "<td style='width:30px' class='NoImprimir'>";
            contenido += "<input type='checkbox' class='selcheckbox' ";
            contenido += seleccionada ? "checked " : "";
            contenido += "/>";
            contenido += "</td>";
          }
          for (var j = 0; j < nCampos; j++) {
            prefijo = anchos[j].slice(0, 1);
            contenido +=
              "<td style='white-space:pre-wrap;overflow:hidden;text-overflow:ellipsis;width:";
            if (prefijo == "c")
              ancho = anchos[j].slice(1, anchos[j].length - 1);
            else ancho = anchos[j];
            contenido += ancho;
            contenido += "px";
            if (j == 0) contenido += ";display:none";
            contenido += ";text-align:";

            switch (tipos[j]) {
              case "Int32":
                contenido += "right";
                valor = matriz[i][j];
                break;
              case "Int64":
                contenido += "right";
                valor = matriz[i][j];
                break;
              case "Decimal":
                contenido += "right";
                valor = formatoNumeroDecimal(matriz[i][j], dec);
                break;
              case "String":
                contenido += "left";
                valor = matriz[i][j];
                break;
              case "DateTime":
                contenido += "center";
                valor = matriz[i][j];
                break;
            }
            if (estilos.length > 0) {
              var obj = estilos.find((x) => x.Col == j);
              if (obj != null) {
                var valores = obj["valores"];
                var colores = obj["colores"];
                var pos = valores.indexOf(valor.toLocaleLowerCase());
                if (pos > -1) {
                  contenido += ";color:";
                  contenido += colores[pos];
                }
              }
            }
            contenido += "' title = '";
            contenido += valor;
            contenido += "'>";
            contenido += valor;
            contenido += "</td>";
          }
          if (nBotones > 0) {
            contenido += "<td style='width:";
            contenido += anchoBotonera;
            contenido += "px'>";
            for (var j = 0; j < nBotones; j++) {
              var visible = true;
              if (botones[j].id == "Eliminar" && colOculEliminar != null) {
                if (
                  matriz[i][colOculEliminar] == "ANULADA" ||
                  matriz[i][colOculEliminar] == "ANULADO" ||
                  matriz[i][colOculEliminar] == "ELIMINADA"
                ) {
                  visible = false;
                }
              }
              if (visible) {
                contenido += "<i class='";
                contenido += botones[j].className;
                contenido += " BotonGrilla";
                contenido += divGrilla;
                contenido += "' data-id='";
                contenido += botones[j].id;
                contenido += "'aria-hidden='true' Title='";
                contenido += botones[j].cabecera;
                contenido += "'></i > ";
              }
            }
            contenido += "</td>";
          }
          contenido += "</tr>";
        } else break;
      }
    } else {
      var nCampos = lista[0].split("|").length;
      contenido += "<tr>";
      contenido += "<td style='text-align:center' colspan='";
      contenido += nCampos;
      contenido += "'>";
      contenido += "No se encontraron registros";
      contenido += "</td>";
      contenido += "</tr>";
    }

    document.getElementById("tbData" + divGrilla).innerHTML = contenido;
    var CantidaddivGrilla = document.getElementById("spnRegistros" + divGrilla);
    if (CantidaddivGrilla != null)
      document.getElementById("spnRegistros" + divGrilla).innerHTML =
        formatoNumeroEntero(nRegistros);
    crearPaginacion();
    configurarSelCheckBox();
    if (nBotones > 0) configurarBotonesExtra();
    mostrarSubtotales();
  }

  function mostrarSubtotales() {
    if (subtotales.length > 0) {
      var nSubtotales = subtotales.length;
      var tipo;
      var esDecimal;
      for (var j = 0; j < nSubtotales; j++) {
        var celdaSubtotal = document.getElementById(
          "total" + divGrilla + subtotales[j]
        );
        if (celdaSubtotal != null) {
          tipo = tipos[subtotales[j]];
          esDecimal = tipo.indexOf("Decimal") > -1;
          if (esDecimal)
            celdaSubtotal.innerText = formatoNumeroDecimal(
              redondearNumero(totales[j], 2),
              dec
            );
          else celdaSubtotal.innerText = formatoNumeroEntero(totales[j]);
        }
      }
    }
  }

  function configurarBotonesExtra() {
    var btns = document.getElementsByClassName("BotonGrilla" + divGrilla);
    var nBtns = btns.length;
    for (var j = 0; j < nBtns; j++) {
      btns[j].onclick = function (event) {
        var n = existeChecks ? 1 : 0;
        var fila = this.parentNode.parentNode;
        var idRegistro = fila.childNodes[n].innerText;

        seleccionarBoton(
          divGrilla,
          idRegistro,
          this.getAttribute("data-id"),
          event
        );
      };
    }
  }

  function configurarFiltros() {
    var cabeceras = document.getElementsByClassName(divGrilla + "Cabecera");
    var nCabeceras = cabeceras.length;
    var cabecera;
    for (var i = 0; i < nCabeceras; i++) {
      cabecera = cabeceras[i];
      if (cabecera.className.indexOf("Combo") > -1) {
        cabecera.onchange = function () {
          filtrarMatriz();
        };
      } else
        cabecera.onkeyup = function (event) {
          filtrarMatriz();
        };
    }
    var txtSearch = document.getElementById("txtSearch" + divGrilla);
    if (txtSearch != null) {
      txtSearch.onkeyup = function (event) {
        console.log(this.value);
        filtrarMatriz();
      };
    }
  }

  function configurarOrdenacion() {
    var enlaces = document.getElementsByClassName(divGrilla + "Enlace");
    var nEnlaces = enlaces.length;
    var enlace;
    for (var i = 0; i < nEnlaces; i++) {
      enlace = enlaces[i];
      enlace.onclick = function () {
        ordenar(this, this.getAttribute("data-ind") * 1);
      };
    }
  }

  function configurarPaginacion() {
    var paginas = document.getElementsByClassName(divGrilla + "Pagina");
    var nPaginas = paginas.length;
    var pagina;
    for (var i = 0; i < nPaginas; i++) {
      pagina = paginas[i];
      pagina.onclick = function () {
        paginar(this.getAttribute("data-pag") * 1);
      };
    }
  }

  function crearPaginacion() {
    var contenido = "";
    var nRegistros = matriz.length;
    var indiceUltimaPagina = Math.floor(nRegistros / registrosPagina);
    if (nRegistros % registrosPagina == 0) indiceUltimaPagina--;
    var registrosBloque = Math.floor(registrosPagina * paginasBloque);
    var indiceUltimoBloque = Math.floor(nRegistros / registrosBloque);
    if (nRegistros % registrosBloque == 0) indiceUltimoBloque--;
    if (nRegistros > registrosPagina) {
      if (indiceBloque > 0) {
        contenido += "<input type='button' class='Pagina ";
        contenido += divGrilla;
        contenido += "Pagina' value='<<' data-pag='-1'/>";
        contenido += "<input type='button' class='Pagina ";
        contenido += divGrilla;
        contenido += "Pagina' value='<' data-pag='-2'/>";
      }
      var inicio = indiceBloque * paginasBloque;
      var fin = inicio + paginasBloque;
      for (var i = inicio; i < fin; i++) {
        if (i <= indiceUltimaPagina) {
          contenido += "<input type='button' class='Pagina";
          if (indicePagina == i) contenido += "Sel";
          contenido += " ";
          contenido += divGrilla;
          contenido += "Pagina' value='";
          contenido += i + 1;
          contenido += "' data-pag='";
          contenido += i;
          contenido += "'/>";
        } else break;
      }
      if (indiceBloque < indiceUltimoBloque) {
        contenido += "<input type='button' class='Pagina ";
        contenido += divGrilla;
        contenido += "Pagina' value='>' data-pag='-3'/>";
        contenido += "<input type='button' class='Pagina ";
        contenido += divGrilla;
        contenido += "Pagina' value='>>' data-pag='-4'/>";
      }
    }
    document.getElementById("tdPagina" + divGrilla).innerHTML = contenido;
    configurarPaginacion();
  }

  function filtrarMatriz() {
    indicePagina = 0;
    indiceBloque = 0;
    crearMatriz();
    mostrarMatriz();
  }

  function ordenar(span, indice) {
    ordenIndice = indice;
    var simbolo = "▲";
    ordenTipo = 0;
    if (span.innerHTML.indexOf("▲") > -1 || span.innerHTML.indexOf("▼") > -1) {
      if (span.innerHTML.indexOf("▲") > -1) simbolo = "▼";
      matriz.reverse();
    } else matriz.sort(ordenaAsc);
    borrarSimboloOrden();
    span.innerHTML += " " + simbolo;
    mostrarMatriz();
  }

  function ordena(x, y) {
    var valX = x[ordenIndice];
    var valY = y[ordenIndice];
    if (ordenTipo == 0) return valX > valY ? 1 : -1;
    else return valX < valY ? 1 : -1;
  }

  function ordenaAsc(x, y) {
    var valX = x[ordenIndice];
    var valY = y[ordenIndice];
    return valX > valY ? 1 : -1;
  }

  function borrarSimboloOrden() {
    var enlaces = document.getElementsByClassName(divGrilla + "Enlace");
    var nEnlaces = enlaces.length;
    var enlace;
    for (var i = 0; i < nEnlaces; i++) {
      enlace = enlaces[i];
      enlace.innerHTML = enlace.innerHTML.replace("▲", "").replace("▼", "");
    }
  }

  function paginar(indice) {
    if (indice > -1) indicePagina = indice;
    else {
      var nRegistros = matriz.length;
      var indiceUltimaPagina = Math.floor(nRegistros / registrosPagina);
      if (nRegistros % registrosPagina == 0) indiceUltimaPagina--;
      var registrosBloque = Math.floor(registrosPagina * paginasBloque);
      var indiceUltimoBloque = Math.floor(nRegistros / registrosBloque);
      if (nRegistros % registrosBloque == 0) indiceUltimoBloque--;
      switch (indice) {
        case -1: //Ir al primer bloque
          indicePagina = 0;
          indiceBloque = 0;
          break;
        case -2: //Ir al bloque anterior
          if (indiceBloque > 0) {
            indiceBloque--;
            indicePagina = indiceBloque * paginasBloque;
          }
          break;
        case -3: //Ir al bloque siguiente
          if (indiceBloque < indiceUltimoBloque) {
            indiceBloque++;
            indicePagina = indiceBloque * paginasBloque;
          }
          break;
        case -4: //Ir al último bloque
          indicePagina = indiceUltimaPagina;
          indiceBloque = indiceUltimoBloque;
          break;
      }
    }
    mostrarMatriz();
  }

  function configurarBotones() {
    var btnLimpiar = document.getElementById("btnLimpiar" + divGrilla);
    if (btnLimpiar != null) {
      btnLimpiar.onclick = function () {
        var textos = document.getElementsByClassName(divGrilla + "Cabecera");
        var nTextos = textos.length;
        for (var j = 0; j < nTextos; j++) {
          textos[j].value = "";
        }
        filtrarMatriz();
      };
    }

    var btnFiltro = document.getElementById("btnFiltro" + divGrilla);
    if (btnFiltro != null)
      btnFiltro.onclick = function () {
        sinFiltros = this.title == "Quitar Filtro" ? "true" : null;
        iniciarGrilla();
      };

    var btnImprimir = document.getElementById("btnImprimir" + divGrilla);
    if (btnImprimir != null) {
      btnImprimir.onclick = function () {
        imprimir(crearHtml());
      };
    }

    var btnExportarXlsx = document.getElementById(
      "btnExportarXlsx" + divGrilla
    );
    if (btnExportarXlsx != null) {
      btnExportarXlsx.onclick = function () {
        archivo = tabla + ".xlsx";
        var contenido = crearTexto("|", "¬", true);
        Http.postDownloadBytes(
          "General/exportar/?orienta=V&nombreArchivo=" + archivo,
          mostrarExportar,
          contenido
        );
      };
    }

    var btnExportarDocx = document.getElementById(
      "btnExportarDocx" + divGrilla
    );
    if (btnExportarDocx != null) {
      btnExportarDocx.onclick = function () {
        archivo = tabla + ".docx";
        var contenido = crearTexto("|", "¬", true);
        Http.postDownloadBytes(
          "General/exportar/?orienta=V&nombreArchivo=" + archivo,
          mostrarExportar,
          contenido
        );
      };
    }

    var btnExportarPdf = document.getElementById("btnExportarPdf" + divGrilla);
    if (btnExportarPdf != null) {
      btnExportarPdf.onclick = function () {
        divPopupContainerPDF.style.display = "block";
      };
    }

    var btnAceptarPDF = document.getElementById("btnAceptarPDF");
    if (btnAceptarPDF != null) {
      btnAceptarPDF.onclick = function () {
        if (optVertical.checked) {
          archivo = tabla + ".pdf";
          var contenido = crearTexto("|", "¬", true);
          Http.postDownloadBytes(
            "General/exportar/?orienta=V&nombreArchivo=" + archivo,
            mostrarPDF,
            contenido
          );
        } else {
          archivo = tabla + ".pdf";
          var contenido = crearTexto("|", "¬", true);
          Http.postDownloadBytes(
            "General/exportar/?orienta=H&nombreArchivo=" + archivo,
            mostrarPDF,
            contenido
          );
        }
      };
    }
  }

  function descargarArchivo(contenido, tipoMime) {
    var blob = new Blob([contenido], { type: tipoMime });
    var enlace = document.createElement("a");
    enlace.href = URL.createObjectURL(blob);
    enlace.download = archivo;
    enlace.click();
    document.removeChild(enlace);
  }

  function crearTexto(sepCampo, sepRegistros, conCabeceras) {
    var nRegistros = matriz.length;
    var nCampos = matriz[0].length;
    var contenido = cabeceras.join(sepCampo);
    contenido += sepRegistros;
    if (conCabeceras != null) {
      contenido += anchos.join(sepCampo).replace(/c/g, "").replace(/m/g, "");
      contenido += sepRegistros;
      contenido += tipos.join(sepCampo);
      contenido += sepRegistros;
    }
    for (var i = 0; i < nRegistros; i++) {
      for (var j = 0; j < nCampos; j++) {
        contenido += matriz[i][j];
        if (j < nCampos - 1) contenido += sepCampo;
      }
      if (i < nRegistros - 1) contenido += sepRegistros;
    }
    return contenido;
  }

  function crearHtml() {
    var campos = [];
    var nRegistros = matriz.length;
    var nCampos = matriz[0].length;
    var contenido = "<html><body><table><thead>";
    contenido += "<tr>";
    for (var j = 0; j < nCampos; j++) {
      contenido += "<th style='background-color:blue;color:white'>";
      contenido += cabeceras[j];
      contenido += "</th>";
    }
    contenido += "</tr></thead><tbody>";
    for (var i = 0; i < nRegistros; i++) {
      contenido += "<tr>";
      for (var j = 0; j < nCampos; j++) {
        contenido += "<td>";
        contenido += matriz[i][j];
        contenido += "</td>";
      }
      contenido += "</tr>";
    }
    contenido += "</tbody></table></body></html>";
    return contenido;
  }

  function mostrarExportar(rpta) {
    descargarArchivo(rpta, obtenerMime());
  }

  function mostrarPDF(rpta) {
    if (rpta.byteLength > 0) {
      var blob = new Blob([rpta], { type: "application/pdf" });
      var urlBlob = URL.createObjectURL(blob);
      window.open(urlBlob);
    }
  }

  function obtenerMime() {
    var campos = archivo.split(".");
    var n = campos.length;
    var extension = campos[n - 1].toLowerCase();
    switch (extension) {
      case "xlsx":
        tipoMime =
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
        break;
      case "docx":
        tipoMime =
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
        break;
      case "pdf":
        tipoMime = "aplication/pdf";
        break;
      default:
        tipoMime = "aplication/octect-stream";
        break;
    }
    return tipoMime;
  }

  /************************** Funciones de impresion *********************/
  function imprimir(contenido) {
    pagina = document.body;
    var ventana = window.frames["print_frame"];
    ventana.document.body.innerHTML = "";
    ventana.document.write(contenido);
    ventana.focus();
    ventana.print();
    ventana.close();
    document.body = pagina;
  }

  function configurarSelCheckBox() {
    var div = document.getElementById(divGrilla);
    var allcheck = div.getElementsByClassName("selcheckbox");
    for (var p = 0; p < allcheck.length; p++) {
      if (p == 0) {
        allcheck[p].onclick = function () {
          seleccionarTodosCheck(this);
        };
      } else {
        allcheck[p].onclick = function () {
          seleccionarFilaCheck(this);
        };
      }
    }
  }

  function seleccionarTodosCheck(chkCab) {
    var filas = document.getElementById("tbData" + divGrilla).rows;
    var nfilas = filas.length;
    for (var i = 0; i < nfilas; i++) {
      filas[i].className = chkCab.checked ? "FilaSeleccionada" : "FilaDatos";
      filas[i].cells[0].firstChild.checked = chkCab.checked;
    }
    ids = [];
    if (chkCab.checked) {
      var nregistros = matriz.length;
      for (var i = 0; i < nregistros; i++) {
        ids.push(matriz[i][0].toString());
      }
    }
  }

  function seleccionarFilaCheck(check) {
    var fila = check.parentNode.parentNode;
    var id = fila.childNodes[1].innerText;
    var pos = ids.indexOf(id);
    if (check.checked) {
      if (ids.length == 0 || (ids.length > 0 && pos == -1)) {
        ids.push(id);
        fila.className = "FilaSeleccionada";
      }
    } else {
      if (ids.length > 0 && pos > -1) {
        var n = ids.length;
        for (var i = 0; i < n; i++) {
          if (ids[i] == id) {
            ids.splice(i, 1);
            fila.className = "FilaDatos";
          }
        }
      }
    }
  }

  GrillaScroll.prototype.obtenerIdsMatriz = function () {
    var idsGrilla = [];
    var nregistros = matriz.length;
    for (var i = 0; i < nregistros; i++) {
      idsGrilla.push(matriz[i][0]);
    }
    return idsGrilla;
  };

  GrillaScroll.prototype.obtenerIdsChecks = function () {
    return ids;
  };

  GrillaScroll.prototype.obtenerFilaCheckPorId = function (id) {
    var fila = [];
    var nregistros = matriz.length;
    for (var i = 0; i < nregistros; i++) {
      if (matriz[i][0] == id) {
        fila = matriz[i];
        break;
      }
    }
    return fila;
  };
}

function NumCheck(e, field) {
  key = e.keyCode ? e.keyCode : e.which;
  // backspace
  if (key == 8) return true;
  // 0-9
  if (key > 47 && key < 58) {
    if (field.value == "") return true;
    regexp = /^\d+(\.\d{0,2})?$/;
    return regexp.test(field.value);
  }
  return false;
}

function generarInmovilizarColumna(tabla) {
  //Calculo para detectar la columna con la className 'fixed' y asignarle la className 'col-fixed' a las columnas anteriores para fijarlas

  // Obtén la referencia a la tabla por su ID
  var table = document.getElementById(tabla);

  // Busca la fila con la className "mainHeader" en el encabezado (thead)
  var mainHeaderRow = table.querySelector("thead tr.mainHeader");

  if (mainHeaderRow) {
    // Encuentra todas las celdas de la fila con la className "fixed"
    var fixedCells = mainHeaderRow.querySelectorAll("th.fixed");

    if (fixedCells.length > 0) {
      // La fila con la className 'mainHeader' contiene columnas con la className 'fixed'

      // Itera a través de todas las celdas en la fila con la className 'mainHeader'
      var cells = mainHeaderRow.cells;
      for (var i = 0; i < cells.length; i++) {
        var cell = cells[i];
        // Verifica si la celda tiene la className 'fixed'
        if (cell.classList.contains("fixed")) {
          // Asigna la className 'pepe' a todas las celdas anteriores
          for (var j = 0; j < i; j++) {
            cells[j].classList.add("col-fixed");
          }
          break; // Termina el bucle una vez que se encuentra una celda 'fixed'
        }
      }
    }
  }

  // Obtén la referencia a la fila del encabezado (thead)
  var headerRow = document.querySelector(".FilaHead.mainHeader");

  if (headerRow) {
    var prevWidth = 0; // Variable para rastrear el ancho de la columna anterior

    // Itera a través de todas las celdas en la fila del encabezado
    Array.from(headerRow.cells).forEach(function (cell) {
      cell.style.left = prevWidth + "px";
      prevWidth += cell.offsetWidth;
    });
  }

  // Obtén la referencia a la tabla por su ID
  var table = document.getElementById(tabla);

  // Busca todas las filas en el cuerpo (tbody)
  var tbodyRows = table.getElementsByTagName("tbody")[0].rows;

  // Itera a través de todas las filas en el cuerpo (tbody)
  for (var rowIndex = 0; rowIndex < tbodyRows.length; rowIndex++) {
    var tbodyRow = tbodyRows[rowIndex];
    var cells = tbodyRow.cells;
    var foundFixed = false; // Variable para rastrear si se encontró la className 'fixed'

    // Itera a través de todas las celdas en la fila del cuerpo
    for (var i = 0; i < cells.length; i++) {
      var cell = cells[i];

      // Verifica si la celda tiene la className 'fixed'
      if (cell.classList.contains("fixed")) {
        foundFixed = true;
      }

      // Asigna la className 'col-fixed' a todas las celdas anteriores si se encontró la className 'fixed'
      if (foundFixed) {
        for (var j = 0; j < i; j++) {
          cells[j].classList.add("col-fixed");
        }
        break;
      }
    }
  }

  // Obtén la referencia a la tabla por su ID
  var table = document.getElementById(tabla);

  // Busca todas las filas en el cuerpo (tbody)
  var tbodyRows = table.getElementsByTagName("tbody")[0].rows;

  // Itera a través de todas las filas en el cuerpo (tbody)
  for (var rowIndex = 0; rowIndex < tbodyRows.length; rowIndex++) {
    var tbodyRow = tbodyRows[rowIndex];
    var cells = tbodyRow.cells;
    var prevWidth = 0; // Variable para rastrear el ancho de la columna anterior

    // Itera a través de todas las celdas en la fila del cuerpo
    for (var i = 0; i < cells.length; i++) {
      var cell = cells[i];

      // Asigna el atributo 'left' a la celda actual con el ancho de la columna anterior
      cell.style.left = prevWidth + "px";

      // Actualiza el ancho de la columna anterior
      prevWidth += cell.offsetWidth;
    }
  }
}

function getConfigMn() {
  // let viewForm = window.sessionStorage.getItem("Vista");
  // request("/listarconfigurarControles?data=" + viewForm).then((data) =>
  //   denegarAccionesUserPerfil(data)
  // );
}

function denegarAccionesUserPerfil(controles) {
  if (controles != null && controles != "") {
    var lista = controles.split("¬");
    btnListNew = lista;
    var campos = [];
    var nRegistros = lista.length;
    var control;

    for (var i = 0; i < nRegistros; i++) {
      campos = lista[i];
      control = document.getElementById(campos);
      if (control != null) control.style.display = "none";
      if (control != null) control.disabled = true;
    }
  }
}

function configControlSecond(idOrden, divGrilla, botones) {
  //----------------Ocultar botones --------------
  for (var i = 0; i < btnListNew.length; i++) {
    var btn = btnListNew[i] + divGrilla;
    control = document.getElementById(btn);
    if (control != null) control.style.display = "none";
    if (control != null) control.disabled = true;
  }
}

function configurarControles(controles) {
  if (controles != null && controles != "") {
    var lista = controles.split("¬");
    var campos = [];
    var nRegistros = lista.length;
    var control;

    for (var i = 0; i < nRegistros; i++) {
      campos = lista[i];
      control = document.getElementById(campos);
      if (control != null) control.style.display = "none";
      if (control != null) control.disabled = true;
    }
  }
}

function buildURL(action, params = "") {
  return `/${CONTROLLER}/${VIEW}/${action}?controller=${CONTROLLER}&view=${VIEW}${params}`;
}

function modal(modalId, open = true) {
  var modal = new bootstrap.Modal(document.getElementById(modalId));

  if (open) modal.show();
  else document.querySelector(`#${modalId} button.btn-close`).click();
}

function setConfig(controller, view) {
  sessionStorage.setItem("controller", controller);
  sessionStorage.setItem("view", view);

  let classItem = controller + "_" + view;
  sessionStorage.setItem("classItem", classItem);
}

function getConfig() {
  CONTROLLER = sessionStorage.getItem("controller");
  VIEW = sessionStorage.getItem("view");

  let className = sessionStorage.getItem("classItem");
  let link = document.querySelector(`.${className}`);

  link.classList.add("active");

  link
    .closest(".menu-item.menu-lg-down-accordion")
    .children[0].classList.add("active");

  let idTabP = link
    .closest(".tab-content")
    .querySelector(".tab-pane.active")
    .getAttribute("id");

  document
    .querySelector(`.nav-link[data-bs-target='#${idTabP}']`)
    .classList.remove("active");

  link
    .closest(".tab-content")
    .querySelector(".tab-pane.active")
    .classList.remove("active");

  link.closest(".tab-pane").classList.add("active");

  let idTab = link.closest(".tab-pane").getAttribute("id");

  document
    .querySelector(`.nav-link[data-bs-target='#${idTab}']`)
    .classList.add("active");
}
