<?php require_once 'src/views/layout/head.php'; ?>
<?php require_once 'src/views/layout/header.php'; ?>

<div class="row">
  <div class="col-lg-12">
    <div class="card shadow-sm">
      <div class="card-header align-items-center d-flex">
        <h3 class="card-title fs-4 mb-0 flex-grow-1">Prioridades de Tickets</h3>

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
  </div>
</div>

<div class="modal fade" id="modalContainer" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header py-2 border-bottom">
        <h5 class="modal-title" id="modalTitle">Nuevo Registro</h5>
        <button id="btnCancel" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <input type="hidden" id="txtTipocId" value="3" class="Save">
        <input type="hidden" id="txtId" class="Popup Save">
 
        <label for="name" class="form-label fw-semibold mb-1">Nombre de Prioridad</label>
        <div class="input-group">
          <span class="input-group-text"><i class="ri-user-line fs-5"></i></span>
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

<?php require_once "src/views/layout/footer.php"; ?>
<script src="<?= URL ?>/public/js/Ticket.js"></script>
<?php require_once "src/views/layout/foot.php"; ?>