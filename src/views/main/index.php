<?php require_once 'src/views/layout/head.php'; ?>
<?php require_once 'src/views/layout/header.php'; ?>

<div class="card">
  <div class="card-body">
    <h1>Bienvenido <?= $this->user['name'] ?></h1>
  </div>
</div>

<?php require_once 'src/views/layout/footer.php'; ?>
<?php require_once 'src/views/layout/foot.php'; ?>