<div class="fs-5">
  <span>Menu</span>
  <ul>
    <li>
      <a class="text-white" href="<?= URL ?>">Inicio</a>
    </li>
    <?php if ($this->user['type'] === 3) : ?>
    <li>
      Seguridad
      <ul>
        <li><a class="text-white" href="<?= URL ?>/security/users">Users</a></li>
        <li><a class="text-white" href="<?= URL ?>/security/user-types">User Types</a></li>
        <li><a class="text-white" href="<?= URL ?>/security/user-actions">User Actions</a></li>
      </ul>
    </li>
    <?php endif; ?>
    <li>
      <a class="text-white" href="<?= URL ?>/logout">Logout</a>
    </li>
  </ul>
</div>