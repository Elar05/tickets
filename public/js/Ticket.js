let listaSubCategorias = [];

window.onload = function () {
  getConfig();

  if (
    VIEW === "categorias" ||
    VIEW === "prioridades" ||
    VIEW === "titulos" ||
    VIEW === "abiertos" ||
    VIEW === "cerrados"
  ) {
    getList();
  }
  if (VIEW === "nuevo") {
    getHelpers();
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
    document.getElementById("txtId").value = id;
    let tipocId = document.getElementById("txtTipocIdDetalle").value;
    let data = tipocId + "|" + id;
    let url = buildURL("list", { data }, "Utilidades", "Detalle");
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
}

function configureCombos() {
  let cboCategoria = document.getElementById("cboCategoria");
  if (cboCategoria)
    cboCategoria.addEventListener("change", (e) => {
      listarSubCategorias();
    });
}

function getHelpers() {
  let url = buildURL("list", {}, CONTROLLER, VIEW + "Helpers");

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

    if (VIEW === "") {
      getList();
    }
  }
}

function getList() {
  let url = buildURL("list");

  if (VIEW === "categorias" || VIEW === "prioridades" || VIEW === "titulos") {
    let tipocId = document.getElementById("tipocId").value;
    url = buildURL("list", { data: tipocId }, "Utilidades", "");
  }
  if (VIEW === "abiertos" || VIEW === "cerrados") {
    let data = VIEW === "abiertos" ? 3 : 4;
    url = buildURL("list", { data }, CONTROLLER, "");
  }

  request(url).then(({ data }) => showList(data));
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
  let url = buildURL("edit", { id });

  if (VIEW === "categorias" || VIEW === "prioridades" || VIEW === "titulos") {
    url = buildURL("edit", { id }, "Utilidades", "");
  }

  request(url).then(({ data }) => showEdit(data));
}

function showEdit(response) {
  if (response) {
    btnNew.click();
    let inputs = response.split("|");

    let cboStatus = document.getElementById("cboStatus");
    if (cboStatus) cboStatus.disabled = false;

    showDataFrom("Popup", inputs);
  }
}

function editRegisterDetalle(id) {
  let url = buildURL("edit", { id }, "Utilidades", "Detalle");

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
    let tipocId = document.getElementById("tipocId").value;
    data += `|${tipocId}`;
    url = buildURL("save", {}, "Utilidades", "");
  }
  if (VIEW === "nuevo") {
    let descripcion = editor.getData();
    data += `|${descripcion}`;
    url = buildURL("save");
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

    if (VIEW === "nuevo") {
      redirect("tickets/abiertos");
    } else {
      btnCancel.click();
    }

    showList(list);

    if (type == "A") {
      iziAlert("success", message);
    } else {
      iziAlert("error", message);
    }
  } else {
    iziAlert("error", "No se realizó el registro");
  }

  btnSave.disabled = false;
}

function saveDataDetalle() {
  let data = getDataSave("PopupD");
  let tipocRefeId = document.getElementById("txtId").value;

  data += `|${tipocRefeId}`;

  let url = buildURL("save", {}, "Utilidades", "Detalle");

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
