let listaSubCategorias = [];
let previewTemplate;
let dropzone;
let dropzonePreviewNode = document.querySelector("#dropzone-preview-list");
let editor;
const prioridadMap = { 8: "danger", 9: "warning", 10: "primary" };

window.onload = function () {
  getConfig();

  if (
    VIEW === "categorias" ||
    VIEW === "prioridades" ||
    VIEW === "titulos" ||
    VIEW === "abiertos" ||
    VIEW === "cerrados" ||
    VIEW === "manejo-abiertos" ||
    VIEW === "manejo-cerrados"
  ) {
    getList();
  }
  if (VIEW === "nuevo" || VIEW === "manejo") {
    getHelpers();
  }
  if (VIEW === "detalle") {
    let id = document.querySelector("#txtId").value;
    editRegister(id);
  }

  // dropzone y ckeditor
  if (VIEW === "nuevo" || VIEW === "detalle" || VIEW === "manejo") {
    if (dropzonePreviewNode) {
      dropzonePreviewNode.id = "";
      previewTemplate = dropzonePreviewNode.parentNode.innerHTML;
      dropzonePreviewNode.parentNode.removeChild(dropzonePreviewNode);

      dropzone = new Dropzone(".dropzone", {
        url: `${URL_BASE}/tickets/${VIEW}/guardar-documento`,
        method: "POST",
        previewTemplate: previewTemplate,
        previewsContainer: "#dropzone-preview",
        clickable: true,
        autoProcessQueue: false,
        uploadMultiple: true,
        parallelUploads: 10,
        paramName: "documento",
        acceptedFiles: ".jpg, .jpeg, .png, .webp, .pdf",
        maxFiles: 10,
        maxFilesize: 1,
        init: function () {
          this.on("errormultiple", function (files, response) {});
          this.on("complete", function () {});

          this.on("removedfile", function (file) {
            // let fileName = file.name;
            // request("/tickets/nuevo/eliminar-documento", { fileName }, "POST")
            //   .then(({ data }) => {
            //     if (data.success) {
            //       console.log("Archivo eliminado correctamente en el servidor.");
            //     } else {
            //       console.error("Error al eliminar el archivo en el servidor.");
            //     }
            //   })
            //   .catch((error) => {
            //     console.error("Error al intentar eliminar el archivo:", error);
            //   });
          });
        },
      });
    }

    var ckeditorClassic = document.querySelector("#ttaDescripcion");
    if (ckeditorClassic) {
      ClassicEditor.create(ckeditorClassic, {
        toolbar: [
          "undo",
          "redo",
          "|",
          "heading",
          "|",
          "bold",
          "italic",
          "|",
          "blockQuote",
          "|",
          "bulletedList",
          "numberedList",
          "|",
          "outdent",
          "indent",
        ],
      })
        .then(function (e) {
          e.ui.view.editable.element.style.height = "200px";
          editor = e;
        })
        .catch(function (e) {
          console.error(e);
        });
    }
  }

  configureButtons();
  configureCombos();
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
  if (idDiv === "divListDetalle") {
    if (idButton === "Editar") {
      let modalTitle = document.getElementById("modalTitleForm1");
      if (modalTitle) modalTitle.innerText = "Actualizar Registro";

      editRegisterDetalle(id);
    }
    if (idButton === "Eliminar") {
      // deleteRegisterDetalle(id);
    }
  }
}

function seleccionarFila(fila, id, prefijo, event) {
  if (window["fila" + prefijo])
    window["fila" + prefijo].className = "FilaDatos";

  fila.className = "FilaSeleccionada";
  window["fila" + prefijo] = fila;

  if (VIEW === "categorias" && prefijo === "divList") {
    showSection("btnNewDetalle");

    let tipocId = document.getElementById("txtTipocIdDetalle").value;
    document.getElementById("txtTipocIdRef").value = id;
    let data = [tipocId, id];
    let url = buildURL("list", data, {
      controller: "Utilidades",
      view: "Detalle",
    });
    request(url).then(({ data }) => showListDetalle(data));
  }
}

function configureButtons() {
  let btnNew = document.getElementById("btnNew");
  if (btnNew)
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

  let btnNewDetalle = document.getElementById("btnNewDetalle");
  if (btnNewDetalle)
    btnNewDetalle.addEventListener("click", (e) => {
      clearForm("PopupD");

      let modalTitle = document.getElementById("modalTitle");
      if (modalTitle) modalTitle.innerText = "Nuevo Registro";
    });

  let btnSave = document.getElementById("btnSave");
  if (btnSave !== null)
    btnSave.addEventListener("click", (e) => {
      let valid = validate("Reque");

      if (valid) {
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
            }
          });
      }
    });

  let btnSaveDetalle = document.getElementById("btnSaveDetalle");
  if (btnSaveDetalle !== null)
    btnSaveDetalle.addEventListener("click", (e) => {
      let valid = validate("RequeD");

      if (valid) {
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
              saveDataDetalle();
            }
          });
      }
    });

  let btnSaveComent = document.getElementById("btnSaveComent");
  if (btnSaveComent !== null)
    btnSaveComent.addEventListener("click", (e) => {
      let valid = validate("Reque");

      if (valid) {
        swal.fire({
          title: "Procesando...",
          icon: "info",
          allowEscapeKey: false,
          allowOutsideClick: false,
          showConfirmButton: false,
        });
        saveData();
      }
    });
}

function configureCombos() {
  let cboCategoria = document.getElementById("cboCategoria");
  if (cboCategoria)
    cboCategoria.addEventListener("change", (e) => {
      listarSubCategorias();
    });
}

function getHelpers() {
  let url = buildURL("list", [], { extraView: "Helpers" });

  request(url).then(({ data }) => showHelpers(data));
}

function showHelpers(response) {
  if (response) {
    let listas = response.split("¯");

    if (VIEW === "nuevo") {
      let listaTitulos = listas[0].split("¬");
      let listaCategorias = listas[1].split("¬");
      listaSubCategorias = listas[2].split("¬");
      let listaPrioridades = listas[3].split("¬");

      createCombo(listaTitulos, "cboTitulo", "Seleccione");
      createCombo(listaCategorias, "cboCategoria", "Seleccione");
      createCombo([], "cboSubCategoria", "Seleccione");
      createCombo(listaPrioridades, "cboPrioridad", "Seleccione");
    }
    if (VIEW === "manejo") {
      let listaCategorias = listas[0].split("¬");
      createCombo(listaCategorias, "cboCategoria", "Seleccione");
    }

    if (VIEW === "") {
      getList();
    }
  }
}

function getList() {
  let url = buildURL("list");

  if (VIEW === "categorias" || VIEW === "prioridades" || VIEW === "titulos") {
    let tipocId = document.getElementById("txtTipocId").value;
    url = buildURL("list", [tipocId], { controller: "Utilidades", view: "" });
  }

  if (VIEW === "abiertos" || VIEW === "cerrados") {
    let data = document.querySelector("#tipoTicket").value;
    url = buildURL("list", [data], { view: "" });
    document.getElementById("topnav-hamburger-icon").click();

    $("#tableTickets").DataTable({
      aProcessing: true,
      aServerSide: true,
      // responsive: false,
      ajax: {
        url: URL_BASE + url,
        type: "GET",
        dataType: "json",
        data: {},
        success: function (response) {
          if (response.data) {
            // Aquí limpiamos la tabla antes de agregar nuevas filas
            $("#tableTickets").DataTable().clear();

            let datos = response.data.replace("¯", "");
            if (datos !== "") {
              datos = datos.split("¬");
              datos.forEach(function (item) {
                item = item.split("|");

                let classPrio = prioridadMap[item[10]];
                let prioridad = `<span class="badge rounded-pill bg-${classPrio} fs-6">${item[4]}</span>`;

                let classSoporte = item[5] === "" ? "info" : "success";
                let soporte = `<span class="badge rounded-pill bg-${classSoporte} fs-6">
                  ${item[5] || "Sin Soporte"}
                </span>`;

                let fechaAsignada =
                  item[6] === ""
                    ? `<span class="badge rounded-pill bg-info fs-6">Sin Asignar</span>`
                    : formatDate(item[6]);

                let fechaCierre =
                  item[8] === ""
                    ? `<span class="badge rounded-pill bg-info fs-6">Sin Cierre</span>`
                    : formatDate(item[8]);

                let viewTicket = `<a 
                  href="${URL_BASE}/${CONTROLLER}/detalle/${item[0]}"
                  class="btn btn-sm btn-primary waves-effect waves-light"
                  onclick="setConfig('tickets', 'detalle')"
                >
                  <i class="ri-eye-line fs-6"></i>
                </a>`;

                if (VIEW === "abiertos") {
                  viewTicket += `<button
                    class="btn btn-sm btn-danger waves-effect waves-light ms-1"
                    onclick="cambiarEstadoTicket(${item[0]}, this)"
                  >
                    <i class="ri-login-circle-line fs-6"></i>
                  </button>`;
                } else {
                  viewTicket += `<button
                    class="btn btn-sm btn-success waves-effect waves-light ms-1"
                    onclick="cambiarEstadoTicket(${item[0]}, this)"
                  >
                    <i class="ri-logout-circle-line fs-6"></i>
                  </button>`;
                }

                let row = [
                  item[0], // N° Ticket
                  item[1], // Titulo
                  item[2], // Categoria
                  item[3], // Sub Categoria
                  prioridad,
                  soporte,
                  fechaAsignada,
                  fechaCierre,
                  formatDate(item[7]),
                  viewTicket,
                ];
                $("#tableTickets").DataTable().row.add(row);
              });
            }

            // Dibujamos la tabla con los datos nuevos
            $("#tableTickets").DataTable().draw();
          }
        },
      },
      order: [[0, "desc"]],
    });
  }
  if (VIEW === "manejo-abiertos" || VIEW === "manejo-cerrados") {
    let data = document.querySelector("#tipoTicket").value;
    url = buildURL("list", [data], { view: "Manejo" });
    document.getElementById("topnav-hamburger-icon").click();

    $("#tableTickets").DataTable({
      aProcessing: true,
      aServerSide: true,
      responsive: false,
      ajax: {
        url: URL_BASE + url,
        type: "GET",
        dataType: "json",
        data: {},
        success: function (response) {
          if (response.data) {
            // Aquí limpiamos la tabla antes de agregar nuevas filas
            $("#tableTickets").DataTable().clear();

            let datos = response.data.replace("¯", "");
            if (datos !== "") {
              datos = datos.split("¬");
              datos.forEach(function (item) {
                item = item.split("|");

                let classSoporte = item[2] === "" ? "info" : "success";
                let soporte = `<span class="badge rounded-pill bg-${classSoporte} fs-6">
                  ${item[2] || "Sin Soporte"}
                </span>`;

                let fechaAsignada =
                  item[3] === ""
                    ? `<span class="badge rounded-pill bg-info fs-6">Sin Asignar</span>`
                    : formatDate(item[3]);

                let fechaCierre =
                  item[4] === ""
                    ? `<span class="badge rounded-pill bg-info fs-6">Sin Cierre</span>`
                    : formatDate(item[4]);

                let viewTicket = `<a 
                  href="${URL_BASE}/${CONTROLLER}/detalle/${item[0]}"
                  class="btn btn-sm btn-primary waves-effect waves-light"
                  onclick="setConfig('tickets', 'detalle')"
                >
                  <i class="ri-eye-line fs-6"></i>
                </a>`;

                if (VIEW === "manejo-abiertos") {
                  viewTicket += `<button
                    class="btn btn-sm btn-danger waves-effect waves-light ms-1"
                    onclick="cambiarEstadoTicket(${item[0]}, this)"
                  >
                    <i class="ri-login-circle-line fs-6"></i>
                  </button>`;
                } else {
                  viewTicket += `<button
                    class="btn btn-sm btn-success waves-effect waves-light ms-1"
                    onclick="cambiarEstadoTicket(${item[0]}, this)"
                  >
                    <i class="ri-logout-circle-line fs-6"></i>
                  </button>`;
                }

                let row = [
                  item[0], // N° Ticket
                  item[1], // Categoria
                  soporte,
                  fechaAsignada,
                  fechaCierre,
                  formatDate(item[5]),
                  viewTicket,
                ];
                $("#tableTickets").DataTable().row.add(row);
              });
            }

            // Dibujamos la tabla con los datos nuevos
            $("#tableTickets").DataTable().draw();
          }
        },
      },
      order: [[0, "desc"]],
    });
  }

  if (
    VIEW !== "abiertos" &&
    VIEW !== "cerrados" &&
    VIEW !== "manejo-abiertos" &&
    VIEW !== "manejo-cerrados"
  ) {
    request(url).then(({ data }) => showList(data));
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

function showListDetalle(response) {
  if (response) {
    let listas = response.split("¯");
    let lista = listas[0].split("¬");

    grillaItem = new GrillaScroll(
      lista,
      "divListDetalle",
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

    if (VIEW === "detalle") {
      if (inputs[1] === "") {
        document.getElementById("lblSoporte").innerHTML =
          "<span class='badge rounded-pill bg-info'>Sin Soporte</span>";
      } else {
        document
          .getElementById("lblSoporte")
          .classList.add("badge", "rounded-pill", "bg-success");
      }

      document.getElementById("lblPrioridad").classList.add(inputs[10]);
      document.getElementById("lblEstado").classList.add(inputs[11]);
      document.getElementById("lblFechaCreacion").innerHTML = formatDate(
        inputs[6]
      );

      if (inputs[7] === "") {
        document.getElementById("lblFechaAsignada").innerHTML =
          "<span class='badge rounded-pill bg-info'>Sin Asignar</span>";
      } else {
        document.getElementById("lblFechaAsignada").innerHTML = formatDate(
          inputs[7]
        );
      }

      if (inputs[8] === "") {
        document.getElementById("lblFechaCierre").innerHTML =
          "<span class='badge rounded-pill bg-info'>Sin Cierre</span>";
      } else {
        document.getElementById("lblFechaCierre").innerHTML = formatDate(
          inputs[8]
        );
      }

      editor.setData(inputs[9]);
      editor.isReadOnly = true;

      if (inputs[12] === "1") {
        document.getElementById("lblNuevo").innerText = "Nuevo";
      }

      if (inputs[13] === "1") {
        hideSection("NoDetalle");
      }

      if (lists[1] !== "") {
        let documentos = lists[1].split("¬");
        let rows = "";
        documentos.forEach((doc) => {
          let item = doc.split("|");
          rows += `<tr>
            <td>${item[0]}</td>
            <td>
              <a href="${URL_BASE}${item[1]}" download="${item[0]}" target="_blank">
                <i class="ri-download-2-line fs-3 text-primary"></i> 
              </a>
            </td>
          </tr>`;
        });
        document.querySelector("#tableDocumentos tbody").innerHTML += rows;
      }

      getDetalleComentarios();
    }
  }
}

function editRegisterDetalle(id) {
  let url = buildURL("edit", [id], {
    controller: "Utilidades",
    view: "Detalle",
  });

  request(url).then(({ data }) => showEditDetalle(data));
}

function showEditDetalle(response) {
  if (response) {
    btnNewDetalle.click();
    let inputs = response.split("|");
    showDataFrom("PopupD", inputs);
  }
}

function saveData() {
  let data = getDataSave("Popup");
  let url = buildURL("save");

  if (VIEW === "categorias" || VIEW === "prioridades" || VIEW === "titulos") {
    data = getDataSave("Save");
    url = buildURL("save", [], { controller: "Utilidades", view: "" });
  }
  if (VIEW === "nuevo" || VIEW === "manejo") {
    let descripcion = editor.getData();
    data += `|${descripcion}`;
  }
  if (VIEW === "detalle") {
    data = getDataSave("Save");
  }

  const form = new FormData();
  form.append("data", data);

  request(url, form, "POST").then(({ data }) => showSave(data));
}

function showSave(response) {
  swal.close();
  if (response) {
    let lists = response.split("¯");
    let list = lists[0];

    let result = lists[1].split("|");
    let type = result[0];
    let message = result[1];

    if (VIEW === "nuevo" || VIEW === "manejo" || VIEW === "detalle") {
      let id = list;

      if (id !== "") {
        // Ahora agregamos ese parámetro a la configuración de Dropzone
        dropzone.on("sendingmultiple", function (files, xhr, formData) {
          if (VIEW === "detalle") {
            let ticket_id = document.getElementById("txtId").value;
            formData.append("ticket_id", ticket_id);
            formData.append("ticket_detalle_id", id);
          } else {
            formData.append("ticket_id", id);
          }
        });

        // Procesar la cola de archivos
        dropzone.processQueue();

        dropzone.on("successmultiple", function (files, response) {
          response = JSON.parse(response);
          if (response.error) {
            iziAlert("error", response.error);
          }

          if (response.success) {
            let res = response.success.split("|");
            if (res[0] == "A") {
              iziAlert("success", res[1]);
              if (VIEW !== "detalle") {
                setTimeout(() => {
                  redirect("/tickets/" + VIEW);
                }, 2000);
              } else {
                getDetalleComentarios();
              }
            } else {
              iziAlert("error", res[1]);
            }
          }
        });

        document.querySelector("#dropzone-preview").innerHTML = "";

        if (VIEW === "detalle") {
          document.getElementById("ttaComentario").value = "";
          getDetalleComentarios();
        }
      }
    } else {
      btnCancel.click();
      showList(list);
    }

    if (VIEW === "categorias") {
      document.getElementById("divListDetalle").innerHTML = "";
      hideSection("btnNewDetalle");
    }

    if (type == "A") {
      iziAlert("success", message);
    } else {
      iziAlert("error", message);
    }
  } else {
    iziAlert("error", "No se realizó el registro");
  }

  let btnSave = document.getElementById("btnSave");
  if (btnSave) btnSave.disabled = false;
}

function saveDataDetalle() {
  let data = getDataSave("SaveD");

  let url = buildURL("save", [], { controller: "Utilidades", view: "Detalle" });

  const form = new FormData();
  form.append("data", data);

  request(url, form, "POST").then(({ data }) => showSaveDetalle(data));
}

function showSaveDetalle(response) {
  swal.close();
  if (response) {
    let lists = response.split("¯");
    let list = lists[0];

    let result = lists[1].split("|");
    let type = result[0];
    let message = result[1];

    btnCancelForm1.click();

    showListDetalle(list);

    if (type == "A") {
      iziAlert("success", message);
    } else {
      iziAlert("error", message);
    }
  } else {
    iziAlert("error", "No se realizó el registro");
  }

  btnSaveDetalle.disabled = false;
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

function listarSubCategorias() {
  let lista = [];
  let idCategoria = document.getElementById("cboCategoria").value;
  listaSubCategorias.forEach((subCategoria) => {
    let item = subCategoria.split("|");
    if (item[2] == idCategoria) {
      lista.push(subCategoria);
    }
  });
  createCombo(lista, "cboSubCategoria", "Seleccione");
}

function getDetalleComentarios() {
  let data = document.querySelector("#txtId").value;
  let url = buildURL("list", [data]);
  request(url).then(({ data }) => listarDetalleComentarios(data));
}

function listarDetalleComentarios(data) {
  if (data !== "") {
    document.getElementById("divComentarios").innerHTML = "";

    let listas = data.split("¯");
    let comentarios = listas[0] !== "" ? listas[0].split("¬") : [];
    let documentos = listas[1] !== "" ? listas[1].split("¬") : [];

    comentarios.forEach((comentario) => {
      let item = comentario.split("|");
      addComentario(item, documentos);
    });
    scrollToBottom();
  }
}

function addComentario(item, documentos) {
  let coment = `<div class="d-flex mb-2">
    <div class="flex-shrink-0">
      <img src="${URL_BASE}/assets/images/users/avatar-8.jpg" alt="" class="avatar-xs rounded-circle">
    </div>
    <div class="flex-grow-1 ms-3">
      <h5 class="fs-13">
        ${item[1]}
        <small class="text-muted ms-2">${formatDate(item[2])}</small>
      </h5>
      <p class="text-muted">${item[3]}</p>
      ${addDocumentos(item[0], documentos)}
    </div>
  </div>`;

  document.getElementById("divComentarios").innerHTML += coment;
}

function addDocumentos(idComentario, documentos) {
  let rows = "";

  documentos.forEach((documento) => {
    let item = documento.split("|");
    if (item[0] == idComentario) {
      rows += `<tr>
        <td>${item[1]}</td>
        <td>
          <a href="${URL_BASE}${item[2]}" download="${item[1]}" target="_blank">
            <i class="ri-download-2-line fs-3 text-primary"></i> 
          </a>
        </td>
      </tr>`;
    }
  });

  let content = `<div class="row mb-2">
    <div class="col-12 col-lg-8">
      <table class="table table-sm table-bordered dt-responsive nowrap table-striped align-middle" style="width:100%">
        <tbody>${rows}</tbody>
      </table>
    </div>
  </div>`;

  return rows !== "" ? content : "";
}

function scrollToBottom() {
  const divComentarios = document.getElementById("divComentarios");
  divComentarios.scrollTop = divComentarios.scrollHeight;
}

function cambiarEstadoTicket(id, element) {
  let row = element.closest("tr");
  let estado = VIEW === "abiertos" || VIEW === "manejo-abiertos" ? 4 : 3;
  swal
    .fire({
      title: "¿Desea cambiar el estado del ticket?",
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

        let url = buildURL("save", [id], { view: "Estado" });
        let data = id + "|" + estado;

        const form = new FormData();
        form.append("data", data);

        request(url, form, "POST").then(({ data }) => {
          if (data) {
            let result = data.split("|");
            let type = result[0];
            let message = result[1];

            if (type == "A") {
              iziAlert("success", message);

              $("#tableTickets").DataTable().row(row).remove().draw();
            } else {
              iziAlert("error", message);
            }
          }
          swal.close();
        });
      }
    });
}
