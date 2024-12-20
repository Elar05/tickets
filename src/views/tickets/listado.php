<?php require_once 'src/views/layout/head.php'; ?>

<link rel="stylesheet" href="https://cdn.datatables.net/1.11.5/css/dataTables.bootstrap5.min.css" />
<link rel="stylesheet" href="https://cdn.datatables.net/responsive/2.2.9/css/responsive.bootstrap.min.css" />

<?php require_once 'src/views/layout/header.php'; ?>

<div class="row">
  <div class="col-lg-12">
    <div class="card shadow-sm">
      <div class="card-header align-items-center d-flex">
        <h3 class="card-title fs-4 mb-0 flex-grow-1">Listado de Tickets - <?= $titulo ?></h3>

        <div class="flex-shrink-0">
          <a href="<?= URL ?>/tickets/nuevo" class="btn btn-sm fs-5 btn-dorado btn-label" onclick="setConfig('tickets', 'nuevo')"> 
            <i class="ri-add-line label-icon align-middle fs-3 me-2"></i>
            Nuevo
          </a>
        </div>
      </div>

      <div class="card-body">
        <input type="hidden" id="tipoTicket" value="<?= $tipoTicket ?>">
        <table id="tableTickets" class="table table-bordered dt-responsive nowrap table-striped align-middle" style="width:100%">
          <thead>
            <tr>
              <th>N° Ticket</th>
              <th>Titulo</th>
              <th>Categoria</th>
              <th>Sub Categoria</th>
              <th>Prioridad</th>
              <th>Soporte</th>
              <th>Fecha Asignada</th>
              <th>Fecha Cierre</th>
              <th>Fecha Creación</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    </div>
  </div>
</div>

<?php require_once "src/views/layout/footer.php"; ?>

<script src="https://cdn.datatables.net/1.11.5/js/jquery.dataTables.min.js"></script>
<script src="https://cdn.datatables.net/1.11.5/js/dataTables.bootstrap5.min.js"></script>
<script src="https://cdn.datatables.net/responsive/2.2.9/js/dataTables.responsive.min.js"></script>

<script src="<?= URL ?>/public/js/Ticket.js"></script>

<?php require_once "src/views/layout/foot.php"; ?>