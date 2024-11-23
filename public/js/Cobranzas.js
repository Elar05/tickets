let previewTemplate;
let dropzone;
let dropzonePreviewNode = document.querySelector("#dropzone-preview-list");

window.onload = function () {
  getConfig();

  if (VIEW === "nuevo") {
    getHelpers();
  } else {
    getList();
  }

  // dropzone
  if (VIEW === "nuevo") {
    if (dropzonePreviewNode) {
      dropzonePreviewNode.id = "";
      previewTemplate = dropzonePreviewNode.parentNode.innerHTML;
      dropzonePreviewNode.parentNode.removeChild(dropzonePreviewNode);

      dropzone = new Dropzone(".dropzone", {
        url: `${URL_BASE}/${CONTROLLER}/${VIEW}/guardar-documento`,
        method: "POST",
        previewTemplate: previewTemplate,
        previewsContainer: "#dropzone-preview",
        clickable: true,
        autoProcessQueue: false,
        paramName: "documento",
        acceptedFiles: ".jpg, .jpeg, .png, .webp, .pdf",
        maxFiles: 1,
        maxFilesize: 1,
      });
    }
  }

  configureButtons();
};

function seleccionarBoton(idDiv, id, idButton, event) {
  if (idDiv === "divList") {
    if (idButton === "Editar") {
      let modalTitle = document.getElementById("modalTitle");
      if (modalTitle) modalTitle.innerText = "Actualizar Registro";

      editRegister(id);
    }

    if (idButton === "Eliminar") {
      deleteRegister(id);
    }
  }
}

function seleccionarFila(fila, id, prefijo, event) {
  if (window["fila" + prefijo])
    window["fila" + prefijo].className = "FilaDatos";

  fila.className = "FilaSeleccionada";
  window["fila" + prefijo] = fila;
}

function configureButtons() {
  let btnNew = document.getElementById("btnNew");
  if (btnNew) {
    btnNew.addEventListener("click", (e) => {
      clearForm("Popup");

      let modalTitle = document.getElementById("modalTitle");
      if (modalTitle) modalTitle.innerText = "Nuevo Registro";

      let cboEstado = document.getElementById("cboEstado");
      if (cboEstado) {
        cboEstado.value = 1;
        cboEstado.disabled = true;
      }
    });
  }

  let btnSave = document.getElementById("btnSave");
  if (btnSave !== null) {
    btnSave.addEventListener("click", (e) => {
      let valid = validate("Reque");

      if (VIEW === "nuevo") {
        if (dropzone.files.length === 0) {
          iziAlert("error", "Agregar el voucher");
          return;
        }
      }

      if (valid) {
        btnSave.disabled = true;
        swal
          .fire({
            title: "¿Desea guardar la información?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si",
            cancelButtonText: "No",
          })
          .then((result) => {
            if (result.value) {
              swal.fire({
                title: "Procesando...",
                icon: "info",
                allowEscapeKey: false,
                allowOutsideClick: false,
                showConfirmButton: false,
              });
              saveData();
            } else {
              btnSave.disabled = false;
            }
          });
      }
    });
  }

  let btnConsultar = document.getElementById("btnConsultar");
  if (btnConsultar) {
    btnConsultar.addEventListener("click", () => getList());
  }
}

function getHelpers() {
  let data = [];

  let url = buildURL("list", data, { extraView: "Helpers" });

  request(url).then(({ data }) => showHelpers(data));
}

function showHelpers(response) {
  if (response) {
    let listas = response.split("¯");

    if (VIEW === "nuevo") {
      let agencias = listas[0].split("¬");

      createCombo(agencias, "cboAgencia", "Seleccione");
    }
  }
}

function getList() {
  let url = buildURL("list");

  if (VIEW === "listado") {
    let fechaInicio = document.getElementById("fechaInicio").value;
    let fechaFin = document.getElementById("fechaFin").value;

    url = buildURL("list", [fechaInicio, fechaFin]);

    let tipoCobranza = document.getElementById("tipoCobranza").value;

    $("#tableCobranzas").DataTable({
      destroy: true,
      aProcessing: true,
      aServerSide: true,
      responsive: true,
      ajax: {
        url: URL_BASE + url,
        type: "GET",
        dataType: "json",
        data: { tipoCobranza },
        success: function (response) {
          if (response.data) {
            $("#tableCobranzas").DataTable().clear();

            let datos = response.data.replace("¯", "");
            if (datos !== "") {
              datos = datos.split("¬");
              datos.forEach(function (item) {
                item = item.split("|");

                let img = `<img src="${URL_BASE}${item[3]}" onclick="showVoucher('${URL_BASE}${item[3]}')" class="img-fluid avatar-sm">`;

                let row = [item[0], item[1], item[2], img, formatDate(item[4])];
                if (tipoCobranza == 2) {
                  // viewTicket += `<button
                  //   class="btn btn-sm btn-danger waves-effect waves-light ms-1"
                  //   onclick="cambiarEstadoTicket(${item[0]}, this)"
                  // >
                  //   <i class="ri-login-circle-line fs-6"></i>
                  // </button>`;
                }

                $("#tableCobranzas").DataTable().row.add(row);
              });
            }

            // Dibujamos la tabla con los datos nuevos
            $("#tableCobranzas").DataTable().draw();
          }
        },
      },
      order: [[0, "desc"]],
    });
  }
}

function showList(response) {
  if (response) {
    let listas = response.split("¯");
    let lista = listas[0].split("¬");

    grillaItem = new GrillaScroll(
      lista,
      "divList",
      100,
      6,
      VIEW,
      CONTROLLER,
      null,
      null,
      null,
      botones,
      30,
      false,
      null
    );
  }
}

function editRegister(id) {
  let url = buildURL("edit", [id]);

  if (VIEW === "categorias" || VIEW === "prioridades" || VIEW === "titulos") {
    url = buildURL("edit", [id], { controller: "Utilidades", view: "" });
  }

  request(url).then(({ data }) => showEdit(data));
}

function showEdit(response) {
  if (response) {
    let btnNew = document.getElementById("btnNew");
    if (btnNew) btnNew.click();

    let lists = response.split("¯");
    let inputs = lists[0].split("|");

    let cboStatus = document.getElementById("cboStatus");
    if (cboStatus) cboStatus.disabled = false;

    showDataFrom("Popup", inputs);
  }
}

function saveData() {
  let data = getDataSave("Popup");
  let url = buildURL("save");

  const form = new FormData();
  form.append("data", data);

  request(url, form, "POST").then(({ data }) => showSave(data));
}

function showSave(response) {
  swal.close();
  let btnSave = document.getElementById("btnSave");
  if (btnSave) btnSave.disabled = false;

  if (response) {
    let lists = response.split("¯");
    let list = lists[0];

    let result = lists[1].split("|");
    let type = result[0];
    let message = result[1];

    if (VIEW === "nuevo") {
      let id = list;

      if (id !== "") {
        // Ahora agregamos ese parámetro a la configuración de Dropzone
        dropzone.on("sending", function (files, xhr, formData) {
          formData.append("cobranza_id", id);
        });

        // Procesar la cola de archivos
        dropzone.processQueue();

        dropzone.on("success", function (files, response) {
          response = JSON.parse(response);
          if (response.error) {
            iziAlert("error", response.error);
          }

          if (response.success) {
            let res = response.success.split("|");
            if (res[0] == "A") {
              iziAlert("success", res[1]);
              setTimeout(() => window.location.reload(), 2000);
            } else {
              iziAlert("error", res[1]);
            }
          }
        });

        document.querySelector("#dropzone-preview").innerHTML = "";
      }
    }

    if (type == "A") {
      iziAlert("success", message);
    } else {
      iziAlert("error", message);
    }
  } else {
    iziAlert("error", "No se realizó el registro");
  }
}

function deleteRegister(id) {
  swal
    .fire({
      title: "¿Desea eliminar el registro?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
      cancelButtonText: "No",
    })
    .then((result) => {
      if (result.value) {
        swal.fire({
          title: "Procesando...",
          icon: "info",
          allowEscapeKey: false,
          allowOutsideClick: false,
          showConfirmButton: false,
        });

        let url = buildURL("delete");

        const form = new FormData();
        form.append("data", id);

        request(url, form, "POST").then(({ data }) => showDelete(data));
      }
    });
}

function showDelete(response) {
  swal.close();
  if (response) {
    let lists = response.split("¯");
    let list = lists[0];

    let result = lists[1].split("|");
    let type = result[0];
    let message = result[1];

    showList(list);

    if (type == "A") {
      iziAlert("success", message);
    } else {
      iziAlert("error", message);
    }
  } else {
    iziAlert("error", "Ocurrio un error al realizar la acción");
  }
}

function showVoucher(url) {
  document.getElementById("imgVoucher").setAttribute("src", url);
  var modal = new bootstrap.Modal(document.getElementById("modalContainer"));
  modal.show();
}
