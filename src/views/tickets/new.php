<?php require_once 'src/views/layout/head.php'; ?>
<?php require_once 'src/views/layout/header.php'; ?>

<div class="row">
  <div class="col-12">
    <div class="card shadow">
      <div class="card-header">
        <h3 class="card-title">
          <span class="card-label fw-bold fs-2">Registrar Nuevo Ticket</span>
        </h3>

        <!-- <div class="card-toolbar">
            <button class="btn btn-sm btn-flex btn-dorado fs-4" id="btnNew" data-bs-toggle="modal"
              data-bs-target="#modalContainer">
              <i class="ki-outline ki-plus-square fs-4 text-white"></i>
              Nuevo
            </button>
          </div> -->
      </div>

      <div class="card-body">
        <!-- <div id="divList"></div> -->
        <div class="row mb-3">
          <label class="form-label fw-bold mb-1 required">Titulo</label>
          <div class="input-group mb-5">
            <span class="input-group-text">
              <i class="fas fa-file-lines fs-2"></i>
            </span>
            <input type="text" id="txtTitulo" class="form-control Popup Reque Save" />
          </div>
        </div>

        <div class="row mb-3">
          <div class="col-lg-6">
            <label class="form-label fw-bold mb-1 required">Categoria</label>
            <div class="input-group mb-5">
              <span class="input-group-text">
                <i class="fas fa-file-lines fs-2"></i>
              </span>
              <select id="cboCategoria" class="form-select Popup Reque Save"></select>
            </div>
          </div>

          <div class="col-lg-6">
            <label class="form-label fw-bold mb-1 required">Sub Categoria</label>
            <div class="input-group mb-5">
              <span class="input-group-text">
                <i class="fas fa-file-lines fs-2"></i>
              </span>
              <select id="cboSubCategoria" class="form-select Popup Reque Save"></select>
            </div>
          </div>
        </div>

        <div class="row mb-3">
          <div class="col-lg-6">
            <label class="form-label fw-bold mb-1 required">Prioridad</label>
            <div class="input-group mb-5">
              <span class="input-group-text">
                <i class="fas fa-file-lines fs-2"></i>
              </span>
              <select id="cboPrioridad" class="form-select Popup Reque Save"></select>
            </div>
          </div>

          <div class="col-lg-6">
            <label class="form-label fw-bold mb-1 required">Documentos Adicionales</label>
            <div class="input-group mb-5">
              <span class="input-group-text">
                <i class="fas fa-file-lines fs-2"></i>
              </span>
              <input type="file" class="form-control" multiple>
            </div>
          </div>
        </div>

        <div class="row mb-5">
          <div class="col-lg-12">
            <label class="form-label fw-bold mb-1 required">Descripción</label>
            <textarea id="ttaDescripcion"></textarea>
          </div>
        </div>

        <div class="text-end">
          <button id="btnguardar" class="btn btn-primary btn-sm btn-flex fs-4">
            <i class="fas fa-save fs-4 pe-2"></i> Guardar
          </button>
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

<?php require_once "src/views/layout/footer.php"; ?>

<script src="<?= URL ?>/public/js/Ticket.js"></script>

<?php require_once "src/views/layout/foot.php"; ?>