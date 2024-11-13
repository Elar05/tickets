<?php require_once 'src/views/layout/head.php'; ?>
<link href="<?= URL ?>/assets/libs/dropzone/dropzone.css" rel="stylesheet">
<?php require_once 'src/views/layout/header.php'; ?>

<input type="hidden" id="txtId" class="Save" value="<?= $id ?>">

<div class="row">
  <div class="col-lg-12">
    <div class="card mt-n4 mx-n4">
      <div class="bg-soft-warning">
        <div class="card-body pb-0 px-4">
          <div class="row mb-3">
            <div class="col-md">
              <div class="row align-items-center g-3">
                <div class="col-md-auto">
                  <div class="avatar-md">
                    <div class="avatar-title bg-white rounded-circle">
                      <img src="<?= URL ?>/assets/images/brands/slack.png" alt="" class="avatar-xs">
                    </div>
                  </div>
                </div>
                <div class="col-md">
                  <div>
                    <h4 class="fw-bold">Detalle de Ticket - <span id="lblTitulo" class="Popup"></span> - <?= $id ?></h4>
                    <div class="hstack gap-3 flex-wrap fs-5 mb-2">
                      <div>
                        <i class="ri-user-2-fill align-bottom me-1"></i>
                        <span id="lblSoporte" class="Popup"></span>
                      </div>

                      <div class="vr"></div>

                      <div>Categoría : <span id="lblCategoria" class="Popup fw-medium"></span></div>

                      <div class="vr NoDetalle"></div>

                      <div class="NoDetalle">Sub Categoría : <span id="lblSubCategoria" class="Popup fw-medium"></span></div>

                      <div class="vr NoDetalle"></div>

                      <div class="NoDetalle">Prioridad: </div>
                      <div id="lblPrioridad" class="Popup NoDetalle badge rounded-pill fs-12"></div>

                      <div class="vr"></div>

                      <div>Estado: </div>
                      <div id="lblEstado" class="Popup badge rounded-pill fs-12"></div>

                      <div class="vr"></div>

                      <div id="lblNuevo" class="badge rounded-pill bg-danger fs-12"></div>
                    </div>
                    <div class="d-flex hastck gap-3 flex-wrap fs-5">
                      <div>Fecha Creación : <span id="lblFechaCreacion" class="Popup fw-medium"></span></div>

                      <div class="vr"></div>

                      <div>Fecha Asignada : <span id="lblFechaAsignada" class="Popup fw-medium"></span></div>

                      <div class="vr"></div>

                      <div>Fecha Cierre : <span id="lblFechaCierre" class="Popup fw-medium"></span></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<div class="row">
  <div class="col-lg-6">
    <div class="card shadow">
      <div class="card-body">
        <label class="form-label fw-bold mb-1">Descripción</label>
        <div id="ttaDescripcion"></div>
      </div>
    </div>
  </div>
  <div class="col-lg-6">
    <div class="card">
      <div class="card-body">
        <label class="form-label fw-bold mb-1">Documentos Adicionales</label>
        <div id="documentos">
          <table id="tableDocumentos" class="table table-bordered dt-responsive nowrap table-striped align-middle" style="width:100%">
            <thead>
              <tr>
                <th>Nombre de archivo</th>
                <th></th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </div>
      </div>
    </div>
  </div>

  <div class="col-lg-12">
    <div class="card">
      <div class="card-header align-items-center d-flex">
        <h4 class="card-title mb-0 flex-grow-1">Comentarios</h4>
      </div>

      <div class="card-body">
        <div id="divComentarios" style="height: 300px;max-height: 800px;overflow-y: scroll;overflow-x:hidden;" style="padding: 0px 16px;"></div>
        <hr>
        <div class="row g-3 mt-3">
          <div class="col-12">
            <label for="ttaComentario" class="form-label text-body">Dejar un Comentario</label>
            <textarea class="form-control bg-light border-light Reque Save" id="ttaComentario" rows="4" placeholder="Escribe tu comentario..."></textarea>
          </div>
          <div class="col-12">
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
          <div class="col-12">
            <button class="btn btn-success" id="btnSaveComent">Enviar Comentario</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<?php require_once "src/views/layout/footer.php"; ?>
<script src="<?= URL ?>/assets/libs/@ckeditor/ckeditor5-build-classic/build/ckeditor.js"></script>
<script src="<?= URL ?>/assets/libs/dropzone/dropzone-min.js"></script>

<script src="<?= URL ?>/public/js/Ticket.js"></script>
<?php require_once "src/views/layout/foot.php"; ?>