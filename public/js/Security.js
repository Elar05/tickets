let listaAgencias = [];
let AGENCIAS = [];

window.onload = function () {
  getConfig();

  if (VIEW === "users" || VIEW === "user-types" || VIEW === "agencias") {
    getHelpers();
  } else {
    getList();
  }

  configureButtons();
  configureCombos();
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

      if (VIEW === "users") {
        document.getElementById("txtPassword").classList.add("Reque");
        updateCombo("cboTipoDocumento", 1);
        listaAgencias = [];
        listarAgencias();
      }
    });
  }

  let btnSave = document.getElementById("btnSave");
  if (btnSave !== null) {
    btnSave.addEventListener("click", (e) => {
      let valid = validate("Reque");

      if (VIEW === "users") {
        if (listaAgencias.length === 0) {
          iziAlert("error", "Debe asignar al menos una agencia");
          return;
        }
      }

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

  let btnAddAgencia = document.getElementById("btnAddAgencia");
  if (btnAddAgencia) {
    btnAddAgencia.addEventListener("click", () => {
      let cboAgencia = document.getElementById("cboAgencia");

      if (cboAgencia.value === "") {
        iziAlert("error", "Seleccione una agencia");
        return;
      }

      let id = cboAgencia.value;
      let nombre = cboAgencia.options[cboAgencia.selectedIndex].text;

      if (listaAgencias.find((item) => item.id === id)) {
        iziAlert("error", "La agencia ya existe");
        return;
      }

      listaAgencias.push({ id, nombre });
      listarAgencias();
      updateCombo("cboAgencia", "");
    });
  }

  let btnAddAllAgencias = document.getElementById("btnAddAllAgencias");
  if (btnAddAllAgencias) {
    btnAddAllAgencias.addEventListener("click", () => {
      listaAgencias = [];
      AGENCIAS.forEach((item) => {
        item = item.split("|");
        listaAgencias.push({ id: item[0], nombre: item[1] });
      });
      listarAgencias();
      updateCombo("cboAgencia", "");
    });
  }
}

function configureCombos() {
  let cboTipoDocumento = document.getElementById("cboTipoDocumento");
  if (cboTipoDocumento) {
    cboTipoDocumento.addEventListener("change", (e) => {
      if (cboTipoDocumento.value == 1)
        document
          .getElementById("txtNroDocumento")
          .setAttribute("maxlength", "11");
      else
        document
          .getElementById("txtNroDocumento")
          .setAttribute("maxlength", "20");
    });
  }
}

function configureChecks() {
  if (VIEW === "user-types") {
    let permissions = document.querySelectorAll(".permissionCheck");
    permissions.forEach((permission) => {
      permission.addEventListener("click", () => {
        let userTypeId = document.getElementById("userTypeId").value;
        let permissionId = permission.value;
        let fatherId = permission.dataset.father;
        let url = buildURL("save", [], { extraView: "Permissions" });

        const form = new FormData();
        form.append("data", `${userTypeId}|${permissionId}|${fatherId}`);

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
  let url = buildURL("list", [], { extraView: "Helpers" });

  request(url).then(({ data }) => showHelpers(data));
}

function showHelpers(response) {
  if (response) {
    let listas = response.split("¯");

    if (VIEW === "user-types") {
      listMenu(listas[0]);
    }
    if (VIEW === "agencias") {
      let estados = listas[0].split("¬");
      createCombo(estados, "cboEstado", "Seleccione");
    }
    if (VIEW === "users") {
      let roles = listas[0].split("¬");
      let documentos = listas[1].split("¬");
      let estados = listas[2].split("¬");
      AGENCIAS = listas[3].split("¬");

      createCombo(roles, "cboRol", "Seleccione");
      createCombo(documentos, "cboTipoDocumento", "Seleccione");
      createCombo(estados, "cboEstado", "Seleccione");
      createCombo(AGENCIAS, "cboAgencia", "Seleccione");
      $("#cboAgencia").select2({ dropdownParent: $("#modalContainer") });
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

    let filtro = null;

    if (VIEW === "user-types") {
      filtro = true;

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
      filtro,
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

  request(url).then(({ data }) => showEdit(data));
}

function showEdit(response) {
  if (response) {
    toggleModal("btnNew");
    let inputs = response.split("|");

    let cboEstado = document.getElementById("cboEstado");
    if (cboEstado) cboEstado.disabled = false;

    if (VIEW === "users") {
      listaAgencias = [];
      let listas = response.split("¯");
      inputs = listas[0].split("|");
      let agencias = listas[1];

      if (agencias !== "") {
        agencias = agencias.split("¬");
        agencias.forEach((agencia) => {
          let item = agencia.split("|");
          let id = item[0];
          let nombre = item[1];
          listaAgencias.push({ id, nombre });
        });
      }

      listarAgencias();

      document.getElementById("txtPassword").classList.remove("Reque");
    }

    showDataFrom("Popup", inputs);
  }
}

function saveData() {
  let data = getDataSave("Popup");
  let url = buildURL("save");

  if (VIEW === "users") {
    data += "¯";
    data += getAgenciasText();
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
  let url = buildURL("list", [data], { extraView: "Permissions" });
  document.getElementById("userTypeId").value = data;

  request(url).then(({ data }) => showPermissions(data));
}

function showPermissions(response) {
  toggleModal("btnForm1");
  let checks = document.querySelectorAll(".permissionCheck");
  checks.forEach((el) => (el.checked = false));

  if (response !== "") {
    let permissions = response.split("|");
    permissions.forEach((menu_id) => {
      let permissionCheck = document.getElementById("menu_" + menu_id);
      if (permissionCheck) permissionCheck.checked = true;
    });
  }
}

function listMenu(data) {
  if (data != "") {
    let listaMenu = data.split("¬");
    let contenido = "";

    listaMenu.forEach((menu) => {
      let Campos = menu.split("|");

      if (Campos[2] == "0") {
        contenido += "<tr style='background-color:#202b9b;'>";
      } else {
        contenido += `<tr onclick="seleccionarFila(this, ${Campos[0]})">`;
      }

      contenido += `<td>${Campos[0]}</td>`;

      let titulo = Campos[2] == "0" ? "Módulo de " + Campos[1] : Campos[1];
      contenido += `<td>${titulo}</td>`;

      if (Campos[2] != "0") {
        contenido += `<td>
          <div class="form-check form-check-inline">
            <div class="switchToggle">
              <input type="checkbox" class="form-check-input permissionCheck"
                id="menu_${Campos[0]}" value="${Campos[0]}" data-father="${Campos[2]}"
              >
              <label for="menu_${Campos[0]}"></label>
            </div>
          </div>
        </td>`;
      } else {
        contenido += "<td></td>";
      }

      contenido += "</tr>";
    });

    document.querySelector("#tableMenu tbody").innerHTML = contenido;
    configureChecks();
  }
}

function listarAgencias() {
  document.querySelector("#tableAgencias tbody").innerHTML = "";
  document.querySelector("#tableAgencias tfoot").classList.remove("d-none");

  if (listaAgencias.length > 0) {
    document.querySelector("#tableAgencias tfoot").classList.add("d-none");

    let html = "";
    listaAgencias.forEach((item) => {
      html += `<tr>
        <td>${item.nombre}</td>
        <td>
          <button class="btn btn-sm btn-danger btn-icon"
            onclick="eliminarAgencia(${item.id}, this)"
          >
            <i class="ri-close-line fs-4"></i>
          </button>
        </td>
      </tr>`;
    });
    document.querySelector("#tableAgencias tbody").innerHTML = html;
  }
}

function eliminarAgencia(id, btn) {
  listaAgencias = listaAgencias.filter((item) => item.id != id);
  btn.closest("tr").remove();
}

function getAgenciasText() {
  return listaAgencias.map((item) => item.id).join("|");
}
