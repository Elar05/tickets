<?php require_once 'src/views/layout/head.php'; ?>
<?php require_once 'src/views/layout/header.php'; ?>

<div class="row">
  <div class="col-lg-12">
    <div class="card shadow-sm">
      <div class="card-header align-items-center d-flex">
        <h3 class="card-title fs-4 mb-0 flex-grow-1">Listado de Tickets Cerrados</h3>

        <div class="flex-shrink-0">
          <button class="btn btn-sm fs-5 btn-dorado btn-label waves-effect waves-light" id="btnNew">
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

<?php require_once "src/views/layout/footer.php"; ?>
<script src="<?= URL ?>/public/js/Ticket.js"></script>
<?php require_once "src/views/layout/foot.php"; ?>