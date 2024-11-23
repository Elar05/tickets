<!-- Layout config Js -->
<script src="<?= URL ?>/assets/js/layout.js"></script>
<!-- Bootstrap Css -->
<link href="<?= URL ?>/assets/css/bootstrap.min.css" rel="stylesheet">
<!-- Icons Css -->
<link href="<?= URL ?>/assets/css/icons.min.css" rel="stylesheet">
<!-- App Css-->
<link href="<?= URL ?>/assets/css/app.min.css" rel="stylesheet">
<!-- custom Css-->
<link href="<?= URL ?>/assets/css/custom.min.css" rel="stylesheet">

<link href="<?= URL ?>/public/css/styles.css" rel="stylesheet">
</head>

<body>
  <!-- Begin page -->
  <div id="layout-wrapper">
    <header id="page-topbar">
      <div class="layout-width">
        <div class="navbar-header">
          <div class="d-flex">
            <!-- LOGO -->
            <div class="navbar-brand-box horizontal-logo">
              <a href="index.html" class="logo logo-dark">
                <span class="logo-sm">
                  <img src="assets/images/logo-sm.png" alt="" height="22">
                </span>
                <span class="logo-lg">
                  <img src="assets/images/logo-dark.png" alt="" height="17">
                </span>
              </a>

              <a href="index.html" class="logo logo-light">
                <span class="logo-sm">
                  <img src="assets/images/logo-sm.png" alt="" height="22">
                </span>
                <span class="logo-lg">
                  <img src="assets/images/logo-light.png" alt="" height="17">
                </span>
              </a>
            </div>

            <button type="button"
              class="btn btn-sm px-3 fs-16 header-item vertical-menu-btn topnav-hamburger"
              id="topnav-hamburger-icon">
              <span class="hamburger-icon">
                <span></span>
                <span></span>
                <span></span>
              </span>
            </button>
          </div>

          <div class="d-flex align-items-center">
            <div class="ms-1 header-item d-none d-sm-flex">
              <button type="button" class="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle"
                data-toggle="fullscreen">
                <i class='bx bx-fullscreen fs-22'></i>
              </button>
            </div>

            <div class="ms-1 header-item d-none d-sm-flex">
              <button type="button"
                class="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle light-dark-mode">
                <i class='bx bx-moon fs-22'></i>
              </button>
            </div>

            <div class="dropdown ms-sm-3 header-item topbar-user">
              <button type="button" class="btn" id="page-header-user-dropdown" data-bs-toggle="dropdown"
                aria-haspopup="true" aria-expanded="false">
                <span class="d-flex align-items-center">
                  <img class="rounded-circle header-profile-user"
                    src="<?= URL ?>/assets/images/logo-pro-sm.png">

                  <span class="text-start ms-xl-2">
                    <span class="d-none d-xl-inline-block ms-1 fw-medium user-name-text">
                      <?= $this->user['name'] ?>
                    </span>
                  </span>
                </span>
              </button>
              <div class="dropdown-menu dropdown-menu-end">
                <a class="dropdown-item" href="<?= URL ?>/logout">
                  <i class="mdi mdi-logout text-muted fs-16 align-middle me-1"></i>
                  <span class="align-middle" data-key="t-logout">Logout</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
    <!-- ========== App Menu ========== -->
    <div class="app-menu navbar-menu">
      <!-- LOGO -->
      <div class="navbar-brand-box">
        <!-- Dark Logo-->
        <a href="index.html" class="logo logo-dark">
          <span class="logo-sm">
            <img src="<?= URL ?>/assets/images/logo-pro-sm.png" width="30">
          </span>
          <span class="logo-lg">
            <img src="<?= URL ?>/assets/images/logo-pro.png" width="100">
          </span>
        </a>
        <!-- Light Logo-->
        <a href="index.html" class="logo logo-light">
          <span class="logo-sm">
            <img src="<?= URL ?>/assets/images/logo-pro-sm.png" width="30">
          </span>
          <span class="logo-lg">
            <img src="<?= URL ?>/assets/images/logo-pro.png" width="100">
          </span>
        </a>
        <button type="button" class="btn btn-sm p-0 fs-20 header-item float-end btn-vertical-sm-hover"
          id="vertical-hover">
          <i class="ri-record-circle-line"></i>
        </button>
      </div>

      <div id="scrollbar">
        <div class="container-fluid">
          <div id="two-column-menu"></div>
          <ul class='navbar-nav' id='navbar-nav'>
            <li class='menu-title'><span data-key='t-menu'>Menu</span></li>

            <?= $this->menu ?>
          </ul>
        </div>
        <!-- Sidebar -->
      </div>

      <div class="sidebar-background"></div>
    </div>

    <input type="hidden" id="urlBase" value="<?= URL ?>">

    <div class="vertical-overlay"></div>

    <div class="main-content">

      <div class="page-content">
        <div class="container-fluid">