<?php require_once 'src/views/layout/head.php'; ?>
<?php require_once 'src/views/layout/header.php'; ?>

<div class="app-main flex-column flex-row-fluid" id="kt_app_main">
  <div class="d-flex flex-column flex-column-fluid">
    <div id="kt_app_content" class="app-content flex-column-fluid">

      <div class="card shadow">
        <div class="card-header">
          <h3 class="card-title">
            <span class="card-label fw-bold fs-2">Tipos de Usuario</span>
          </h3>

          <div class="card-toolbar">
            <button class="btn btn-sm btn-flex btn-dorado fs-4" id="btnNew" data-bs-toggle="modal"
              data-bs-target="#modalContainer">
              <i class="ki-outline ki-plus-square fs-4 text-white"></i>
              Nuevo
            </button>
          </div>
        </div>

        <div class="card-body">
          <div id="divList"></div>
        </div>
      </div>

    </div>
  </div>
</div>

<div class="modal fade" id="modalContainer" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header h-50px">
        <h3 class="modal-title fw-bold text-black" id="modalTitle"></h3>

        <div class="btn btn-icon btn-sm btn-danger" id="btnCancel" data-bs-dismiss="modal" aria-label="Close">
          <i class="ki-solid ki-cross fs-1"></i>
        </div>
      </div>
      <div class="modal-body">
        <input type="hidden" id="txtId" class="Popup Save">

        <label for="name" class="form-label fw-bold mb-1">Nombre</label>
        <div class="input-group mb-5">
          <span class="input-group-text">
            <i class="ki-solid ki-user fs-1"></i>
          </span>
          <input type="text" id="txtName" class="form-control Popup Reque Save" />
        </div>

        <div class="text-end">
          <button class="btn btn-primary" id="btnSave">
            <i class="fa fa-save"></i> Guardar
          </button>
        </div>
      </div>
    </div>
  </div>
</div>

<div class="modal fade" id="modalContainerForm1" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header h-50px">
        <h3 class="modal-title fw-bold text-black">Permisos de tipo de usuario</h3>

        <div class="btn btn-icon btn-sm btn-danger" id="btnCancelForm1" data-bs-dismiss="modal" aria-label="Close">
          <i class="ki-solid ki-cross fs-1"></i>
        </div>
      </div>
      <div class="modal-body">
        <input type="hidden" id="userTypeId">
        <div id="contentPermissions"></div>
      </div>
    </div>
  </div>
</div>

<?php require_once "src/views/layout/footer.php"; ?>
<script src="<?= URL ?>/public/js/Security.js"></script>
<?php require_once "src/views/layout/foot.php"; ?>