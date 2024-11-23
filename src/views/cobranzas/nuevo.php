<?php require_once 'src/views/layout/head.php'; ?>
<link href="<?= URL ?>/assets/libs/dropzone/dropzone.css" rel="stylesheet">
<?php require_once 'src/views/layout/header.php'; ?>

<div class="row">
  <div class="col-12">
    <div class="card shadow">
      <div class="card-header">
        <h3 class="card-title">
          <span class="card-label fw-bold fs-2">Registrar Nuevo Ticket</span>
        </h3>
      </div>

      <div class="card-body">
        <div class="row mb-4">
          <div class="col-lg-4">
            <label class="form-label fw-bold mb-1 required">Agencia</label>
            <div class="input-group">
              <span class="input-group-text py-1 px-2"><i class="ri-building-line fs-4"></i></span>
              <select id="cboAgencia" class="form-select Popup Reque"></select>
            </div>
          </div>

          <div class="col-lg-4">
            <label class="form-label fw-bold mb-1 required">Monto</label>
            <div class="input-group">
              <span class="input-group-text py-1 px-2"><i class="ri-money-dollar-box-fill fs-4"></i></span>
              <input type="text" id="txtMonto" class="form-control Popup Reque">
            </div>
          </div>
        </div>

        <div class="row d-none mb-4">
          <div class="col-lg-12">
            <label class="form-label fw-bold mb-1 required">Descripción</label>
            <textarea id="ttaDescripcion" class="Popup"></textarea>
          </div>
        </div>

        <div class="row mb-4">
          <div class="col-lg-12">
            <label class="form-label fw-bold mb-1 required">Cargar Voucher</label>
            <div class="dropzone">
              <div class="fallback">
                <input name="file" type="file" multiple="multiple">
              </div>
              <div class="dz-message needsclick">
                <div class="mb-3">
                  <i class="display-4 text-muted ri-upload-cloud-2-fill"></i>
                </div>

                <h5>Soltar archivos aquí</h5>
              </div>
            </div>

            <ul class="list-unstyled mb-0" id="dropzone-preview">
              <li class="mt-2" id="dropzone-preview-list">
                <div class="border rounded">
                  <div class="d-flex p-2">
                    <div class="flex-shrink-0 me-3">
                      <div class="avatar-sm bg-light rounded">
                        <img src="#" alt="Project-Image" data-dz-thumbnail
                          class="img-fluid rounded d-block" />
                      </div>
                    </div>
                    <div class="flex-grow-1">
                      <div class="pt-1">
                        <h5 class="fs-14 mb-1" data-dz-name>&nbsp;</h5>
                        <p class="fs-13 text-muted mb-0" data-dz-size></p>
                        <strong class="error text-danger"
                          data-dz-errormessage></strong>
                      </div>
                    </div>
                    <div class="flex-shrink-0 ms-3">
                      <button data-dz-remove
                        class="btn btn-sm btn-danger">Eliminar</button>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div class="text-center">
          <button class="btn btn-primary btn-label fs-4" id="btnSave">
            <i class="ri-save-line label-icon align-middle fs-4 me-2"></i> Guardar
          </button>
        </div>
      </div>
    </div>
  </div>
</div>

<?php require_once "src/views/layout/footer.php"; ?>
<script src="<?= URL ?>/assets/libs/dropzone/dropzone-min.js"></script>

<script src="<?= URL ?>/public/js/Cobranzas.js"></script>
<?php require_once "src/views/layout/foot.php"; ?>