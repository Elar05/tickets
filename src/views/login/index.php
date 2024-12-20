<!doctype html>
<html lang="en" data-layout="vertical" data-topbar="light" data-sidebar="dark" data-sidebar-size="lg" data-sidebar-image="none">

<head>

  <meta charset="utf-8" />
  <title>Iniciar Sessión</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta content="Premium Multipurpose Admin & Dashboard Template" name="description" />
  <meta content="Themesbrand" name="author" />
  <!-- App favicon -->
  <link rel="shortcut icon" href="assets/images/favicon.ico">

  <link href="assets/libs/iziToast/css/iziToast.min.css" rel="stylesheet">

  <!-- Layout config Js -->
  <script src="assets/js/layout.js"></script>
  <!-- Bootstrap Css -->
  <link href="assets/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
  <!-- Icons Css -->
  <link href="assets/css/icons.min.css" rel="stylesheet" type="text/css" />
  <!-- App Css-->
  <link href="assets/css/app.min.css" rel="stylesheet" type="text/css" />
  <!-- custom Css-->
  <link href="assets/css/custom.min.css" rel="stylesheet" type="text/css" />
</head>

<body>
  <div class="auth-page-wrapper pt-5">
    <!-- auth page bg -->
    <div class="auth-one-bg-position auth-one-bg" id="auth-particles">
      <div class="bg-overlay"></div>

      <div class="shape">
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1440 120">
          <path d="M 0,36 C 144,53.6 432,123.2 720,124 C 1008,124.8 1296,56.8 1440,40L1440 140L0 140z"></path>
        </svg>
      </div>
    </div>

    <input type="hidden" id="urlBase" value="<?= URL ?>">

    <!-- auth page content -->
    <div class="auth-page-content">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="text-center mt-sm-5 mb-4 text-white-50">
              <div>
                <a href="index.html" class="d-inline-block auth-logo">
                  <img src="<?= URL ?>/assets/images/logo-pro.png" width="100">
                </a>
              </div>
              <p class="mt-3 fs-15 fw-medium">Sistema Administrativo</p>
            </div>
          </div>
        </div>
        <!-- end row -->
        <div class="row justify-content-center">
          <div class="col-md-8 col-lg-6 col-xl-5">
            <div class="card mt-4">

              <div class="card-body p-4">
                <div class="text-center mt-2">
                  <h5 class="text-primary">Ingresar al Sistema !</h5>
                  <!-- <p class="text-muted">Sign in to continue to Velzon.</p> -->
                </div>
                <div class="p-2 mt-4">
                  <form id="formLogin" class="needs-validation" novalidate>

                    <div class="mb-3">
                      <label for="email" class="form-label">Correo</label>
                      <input type="email" name="email" id="email" class="form-control" placeholder="correo@corre.com" required>
                      <div class="invalid-feedback">
                        Ingrese un correo valido
                      </div>
                    </div>

                    <div class="mb-3">
                      <div class="float-end">
                        <!-- <a href="auth-pass-reset-basic.html" class="text-muted">Forgot password?</a> -->
                      </div>
                      <label class="form-label" for="password-input">Password</label>
                      <div class="position-relative auth-pass-inputgroup mb-3">
                        <input type="password" class="form-control pe-5" name="password" id="password" placeholder="**********" required>
                        <div class="invalid-feedback">
                          Ingrese una contraseña
                        </div>
                      </div>
                    </div>

                    <div class="mt-4">
                      <button class="btn btn-success w-100">Iniciar Sesión</button>
                    </div>
                  </form>
                </div>
              </div>
              <!-- end card body -->
            </div>
          </div>
        </div>
        <!-- end row -->
      </div>
      <!-- end container -->
    </div>
    <!-- end auth page content -->
  </div>
  <!-- end auth-page-wrapper -->

  <!-- JAVASCRIPT -->
  <script src="assets/libs/bootstrap/js/bootstrap.bundle.min.js"></script>
  <script src="assets/libs/simplebar/simplebar.min.js"></script>
  <script src="assets/libs/node-waves/waves.min.js"></script>
  <script src="assets/libs/feather-icons/feather.min.js"></script>
  <script src="assets/js/pages/plugins/lord-icon-2.1.0.js"></script>
  <script src="assets/js/plugins.js"></script>

  <script src="assets/libs/iziToast/js/iziToast.min.js"></script>

  <!-- particles js -->
  <script src="assets/libs/particles.js/particles.js"></script>
  <!-- particles app js -->
  <script src="assets/js/pages/particles.app.js"></script>
  <!-- password-addon init -->
  <script src="assets/js/pages/password-addon.init.js"></script>

  <script src="<?= URL ?>/public/js/App.js"></script>
  <script src="<?= URL ?>/public/js/Login.js"></script>
</body>

</html>