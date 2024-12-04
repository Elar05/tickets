<?php require_once 'src/views/layout/head.php'; ?>
<?php require_once 'src/views/layout/header.php'; ?>

<div class="card shadow">
  <div class="card-header align-items-center d-flex">
    <h3 class="card-title fs-4 mb-0 flex-grow-1">Roles de Usuario</h3>

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
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header py-3 border-bottom">
        <h5 class="modal-title" id="modalTitle">Nuevo Registro</h5>
        <button id="btnCancel" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <input type="hidden" id="txtId" class="Popup Save">

        <label for="name" class="form-label fw-bold mb-1">Nombre</label>
        <div class="input-group">
          <span class="input-group-text">
            <i class="ri-user-2-fill fs-5"></i>
          </span>
          <input type="text" id="txtName" class="form-control Popup Reque Save" />
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

<div class="modal fade" id="modalContainerForm1" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1">
  <div class="modal-dialog modal-dialog-scrollable modal-lg">
    <div class="modal-content">
      <div class="modal-header py-3 border-bottom">
        <h5 class="modal-title">Permisos de tipo de usuario</h5>
        <button id="btnCancelForm1" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        <button class="d-none" id="btnForm1" data-bs-toggle="modal" data-bs-target="#modalContainerForm1"></button>
      </div>
      <div class="modal-body">
        <input type="hidden" id="userTypeId">
        <div id="contentPermissions">

        </div>
        <table id="tableMenu" class="table table-striped text-center">
          <thead>
            <tr class="FilaHead">
              <th>MenuId</th>
              <th>Titulo</th>
              <th>Permitir</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    </div>
  </div>
</div>

<?php require_once "src/views/layout/footer.php"; ?>
<script src="<?= URL ?>/public/js/Security.js"></script>
<?php require_once "src/views/layout/foot.php"; ?>