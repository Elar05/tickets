window.onload = function () {
  getConfig();

  if (VIEW === "users" || VIEW === "user-types") {
    getHelpers();
  }
  if (VIEW === "user-actions") {
    getList();
  }

  configureButtons();
};

function seleccionarBoton(idDiv, id, idButton, event) {
  if (idDiv == "divList") {
    if (idButton == "Editar") {
      let modalTitle = document.getElementById("modalTitle");
      if (modalTitle) modalTitle.innerText = "Actualizar Registro";

      editRegister(id);
    }

    if (idButton == "Eliminar") {
      deleteRegister(id);
    }

    if (idButton == "Permisos") {
      getPermissions(id);
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
        Swal.fire({
          title: "¿Desea guardar la información?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Si",
          cancelButtonText: "No",
        }).then((result) => {
          if (result.value) {
            Swal.fire({
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
}

function configureChecks() {
  if (VIEW === "user-types") {
    let actions = document.querySelectorAll(".actionCheck");
    actions.forEach((action) => {
      action.addEventListener("click", () => {
        let actionId = action.value;
        let userTypeId = document.getElementById("userTypeId").value;
        let url = buildURL("save", "Actions");

        const form = new FormData();
        form.append("data", `${userTypeId}|${actionId}`);

        request(url, form, "POST").then(({ data }) => {
          if (data) {
            let items = data.split("|");

            if (items[0] === "A") {
              iziAlert("success", items[1]);
            } else {
              iziAlert("error", items[1]);
            }
          }
        });
      });
    });
  }
}

function getHelpers() {
  let url = buildURL("list", {}, CONTROLLER, VIEW + "Helpers");

  request(url).then(({ data }) => showHelpers(data));
}

function showHelpers(response) {
  if (response) {
    let listas = response.split("¯");

    if (VIEW === "user-types") {
      let actions = listas[0].split("¬");
      let html = "";
      actions.forEach((action) => {
        let item = action.split("|");
        html += `<div class="form-check">
          <input class="form-check-input actionCheck" value="${item[0]}"id="action_${item[0]}" type="checkbox">
          <label class="form-check-label fw-bold text-black fs-5" for="action_${item[0]}">${item[1]}</label>
        </div>`;
      });
      document.getElementById("contentPermissions").innerHTML = html;
      configureChecks();
    }

    getList();
  }
}

function getList() {
  let url = buildURL("list");

  request(url).then(({ data }) => showList(data));
}

function showList(response) {
  if (response) {
    let listas = response.split("¯");
    let lista = listas[0].split("¬");

    if (VIEW === "user-types") {
      if (botones.length === 2) {
        botones.push({
          cabecera: "Permisos",
          className: "ri-shield-keyhole-line fs-5 btn btn-sm btn-icon btn-info",
          id: "Permisos",
        });
      }
    }

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
  let url = buildURL("edit", `&id=${id}`);

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

function saveData() {
  let data = getDataSave("Popup");
  let url = buildURL("save");

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

    btnCancel.click();

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

function deleteRegister(id) {
  Swal.fire({
    title: "¿Desea eliminar el registro?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si",
    cancelButtonText: "No",
  }).then((result) => {
    if (result.value) {
      Swal.fire({
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

function getPermissions(data) {
  let url = buildURL("list", { data }, CONTROLLER, VIEW + "Actions");
  document.getElementById("userTypeId").value = data;

  request(url).then(({ data }) => showPermissions(data));
}

function showPermissions(response) {
  modal("modalContainerForm1");
  if (response) {
    let checks = document.querySelectorAll(".actionCheck");
    checks.forEach((el) => (el.checked = false));

    let actions = response.split("|");
    actions.forEach((action) => {
      let actionCheck = document.getElementById("action_" + action);
      if (actionCheck) actionCheck.checked = true;
    });
  }
}
