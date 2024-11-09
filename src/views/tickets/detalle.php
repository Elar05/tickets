<?php require_once 'src/views/layout/head.php'; ?>
<?php require_once 'src/views/layout/header.php'; ?>

<input type="hidden" id="txtId" value="<?= $id ?>">

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
                    <div class="hstack gap-3 flex-wrap">
                      <div>
                        <i class="ri-user-2-fill align-bottom me-1"></i>
                        <span id="lblSoporte" class="Popup"></span>
                      </div>

                      <div class="vr"></div>

                      <div>Fecha Creación : <span id="lblFechaCreacion" class="Popup fw-medium"></span></div>

                      <div class="vr"></div>

                      <div>Fecha Asignada : <span id="lblFechaAsignada" class="Popup fw-medium"></span></div>

                      <div class="vr"></div>

                      <div>Fecha Cierre : <span id="lblFechaCierre" class="Popup fw-medium"></span></div>

                      <div class="vr"></div>

                      <div>Prioridad: </div>
                      <div id="lblPrioridad" class="Popup badge rounded-pill fs-12"></div>

                      <div class="vr"></div>

                      <div id="lblNuevo" class="Popup badge rounded-pill bg-info fs-12"></div>
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
        <div id="lblDescripcion" class="Popup border rounded p-2" style="height: 60px;"></div>
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
        <div data-simplebar="init" style="height: 300px;" class="px-3 mx-n3 mb-2">
          <div class="simplebar-wrapper" style="margin: 0px -16px;">
            <div class="simplebar-height-auto-observer-wrapper">
              <div class="simplebar-height-auto-observer"></div>
            </div>
            <div class="simplebar-mask">
              <div class="simplebar-offset" style="right: 0px; bottom: 0px;">
                <div class="simplebar-content-wrapper" tabindex="0" role="region" aria-label="scrollable content" style="height: 100%; overflow: hidden scroll;">
                  <div class="simplebar-content" style="padding: 0px 16px;">
                    <div class="d-flex mb-4">
                      <div class="flex-shrink-0">
                        <img src="<?= URL ?>/assets/images/users/avatar-8.jpg" alt="" class="avatar-xs rounded-circle">
                      </div>
                      <div class="flex-grow-1 ms-3">
                        <h5 class="fs-13">Joseph Parker <small class="text-muted ms-2">20 Dec 2021 - 05:47AM</small></h5>
                        <p class="text-muted">I am getting message from customers that when they place order always get error message .</p>
                        <a href="javascript: void(0);" class="badge text-muted bg-light"><i class="mdi mdi-reply"></i> Reply</a>
                        <div class="d-flex mt-4">
                          <div class="flex-shrink-0">
                            <img src="<?= URL ?>/assets/images/users/avatar-10.jpg" alt="" class="avatar-xs rounded-circle">
                          </div>
                          <div class="flex-grow-1 ms-3">
                            <h5 class="fs-13">Alexis Clarke <small class="text-muted ms-2">22 Dec 2021 - 02:32PM</small></h5>
                            <p class="text-muted">Please be sure to check your Spam mailbox to see if your email filters have identified the email from Dell as spam.</p>
                            <a href="javascript: void(0);" class="badge text-muted bg-light"><i class="mdi mdi-reply"></i> Reply</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="simplebar-placeholder" style="width: auto; height: 566px;"></div>
          </div>
          <div class="simplebar-track simplebar-horizontal" style="visibility: hidden;">
            <div class="simplebar-scrollbar" style="width: 0px; display: none;"></div>
          </div>
          <div class="simplebar-track simplebar-vertical" style="visibility: visible;">
            <div class="simplebar-scrollbar" style="height: 159px; transform: translate3d(0px, 0px, 0px); display: block;"></div>
          </div>
        </div>
        <form class="mt-4">
          <div class="row g-3">
            <div class="col-12">
              <label for="exampleFormControlTextarea1" class="form-label text-body">Leave a Comments</label>
              <textarea class="form-control bg-light border-light" id="exampleFormControlTextarea1" rows="3" placeholder="Enter your comment..."></textarea>
            </div>
            <div class="col-12 text-end">
              <button type="button" class="btn btn-ghost-secondary btn-icon waves-effect me-1"><i class="ri-attachment-line fs-16"></i></button>
              <a href="javascript:void(0);" class="btn btn-success">Post Comments</a>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>

<?php require_once "src/views/layout/footer.php"; ?>

<script src="<?= URL ?>/public/js/Ticket.js"></script>

<?php require_once "src/views/layout/foot.php"; ?>