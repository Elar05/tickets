<?php require_once 'src/views/layout/head.php'; ?>
<?php require_once 'src/views/layout/header.php'; ?>

<div class="card shadow">
  <div class="card-header align-items-center d-flex">
    <h3 class="card-title fs-4 mb-0 flex-grow-1">Usuarios</h3>

    <div class="flex-shrink-0">
      <button class="btn btn-sm fs-5 btn-dorado btn-label waves-effect waves-light" id="btnNew" data-bs-toggle="modal"
        data-bs-target="#modalContainer">
        <i class="ri-add-line label-icon align-middle fs-3 me-2"></i>
        Nuevo
      </button>
    </div>
  </div>

  <div class="card-body">
    <div id="divList"></div>
  </div>
</div>

<div class="modal fade" id="modalContainer" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1">
  <div class="modal-dialog modal-xl">
    <div class="modal-content">
      <div class="modal-header py-3 border-bottom">
        <h5 class="modal-title" id="modalTitle">Nuevo Registro</h5>
        <button id="btnCancel" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <input type="hidden" id="txtId" class="Popup Save">

        <div class="row">
          <div class="col-lg-4">
            <div class="mb-3">
              <label for="name" class="form-label fw-bold mb-1">Nombres</label>
              <div class="input-group">
                <span class="input-group-text"><i class="ri-user-2-fill fs-5"></i></span>
                <input type="text" id="txtName" class="form-control Popup Reque Save" />
              </div>
            </div>

            <div class="mb-3">
              <label for="name" class="form-label fw-bold mb-1">Correo</label>
              <div class="input-group">
                <span class="input-group-text"><i class="ri-mail-line fs-5"></i></span>
                <input type="email" id="txtEmail" class="form-control Popup Reque Save" />
              </div>
            </div>

            <div class="mb-3">
              <label for="name" class="form-label fw-bold mb-1">Contraseña</label>
              <div class="input-group">
                <span class="input-group-text"><i class="ri-lock-password-line fs-5"></i></span>
                <input type="password" id="txtPassword" class="form-control Popup Reque Save" />
              </div>
            </div>

            <div class="mb-3">
              <label for="name" class="form-label fw-bold mb-1">Rol</label>
              <div class="input-group">
                <span class="input-group-text"><i class="ri-shield-user-line fs-5"></i></span>
                <select id="cboRol" class="form-select Popup Reque Save"></select>
              </div>
            </div>
            
            <div class="mb-3">
              <label for="name" class="form-label fw-bold mb-1">Función / Descripción</label>
              <div class="input-group">
                <span class="input-group-text"><i class="ri-user-2-fill fs-5"></i></span>
                <textarea id="txtDescripcion" class="form-control Popup Reque Save"></textarea>
              </div>
            </div>            
          </div>

          <div class="col-lg-4">
            <div class="mb-3">
              <label for="name" class="form-label fw-bold mb-1">Tipo Documento</label>
              <div class="input-group">
                <span class="input-group-text"><i class="ri-user-2-fill fs-5"></i></span>
                <select id="cboTipoDocumento" class="form-select Popup Save"></select>
              </div>
            </div>

            <div class="mb-3">
              <label for="name" class="form-label fw-bold mb-1">N° Documento</label>
              <div class="input-group">
                <span class="input-group-text"><i class="ri-user-2-fill fs-5"></i></span>
                <input type="text" id="txtNroDocumento" class="form-control Popup Save" maxlength="11">
              </div>
            </div>

            <div class="mb-3">
              <label for="name" class="form-label fw-bold mb-1">Télefono</label>
              <div class="input-group">
                <span class="input-group-text"><i class="ri-user-2-fill fs-5"></i></span>
                <input type="text" id="txtTelefono" class="form-control Popup Save">
              </div>
            </div>

            <div class="mb-3">
              <label for="name" class="form-label fw-bold mb-1">Fecha Nacimiento</label>
              <div class="input-group">
                <span class="input-group-text"><i class="ri-user-2-fill fs-5"></i></span>
                <input type="date" id="dttFechaNacimiento" class="form-control Popup Save">
              </div>
            </div>
            
            <div class="mb-3">
              <label for="name" class="form-label fw-bold mb-1">Estado</label>
              <div class="input-group">
                <span class="input-group-text"><i class="ri-information-fill fs-5"></i></span>
                <select id="cboEstado" class="form-select Popup Reque Save"></select>
              </div>
            </div>
          </div>

          <div class="col-lg-4">
            <div class="mb-3">
              <label for="name" class="form-label fw-bold mb-1">Agencias</label>
              <div class="input-group flex-nowrap">
                <span class="input-group-text"><i class="ri-database-line fs-5"></i></span>
                <select id="cboAgencia" class="form-select"></select>
                <span id="btnAddAgencia" class="input-group-text bg-success text-white cursor-pointer"><i class="ri-add-line fs-5"></i></span>
                <span id="btnAddAllAgencias" class="input-group-text bg-primary text-white cursor-pointer">Todo</span>
              </div>
            </div>

            <div class="mb-3">
              <label class="form-label fw-bold mb-1">Agencias Asignadas</label>
              <div class="table-responsive" style="max-height: 300px; overflow-y: scroll;">
                <table id="tableAgencias" class="table align-middle table-nowrap mb-0">
                  <thead>
                    <tr>
                      <th scope="col">Agencia</th>
                      <th scope="col">Acción</th>
                    </tr>
                  </thead>
                  <tbody></tbody>
                  <tfoot>
                    <tr>
                      <th colspan="2" scope="col" class="text-center">No Hay Agencias</th>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer py-2 border-top">
        <button class="btn btn-primary btn-label" id="btnSave">
          <i class="ri-save-line label-icon align-middle me-2"></i> Guardar
        </button>
      </div>
    </div>
  </div>
</div>

<?php require_once "src/views/layout/footer.php"; ?>
<script src="<?= URL ?>/public/js/Security.js"></script>
<?php require_once "src/views/layout/foot.php"; ?>