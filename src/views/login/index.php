<!DOCTYPE html>
<html lang="es">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">

  <title>Login</title>
</head>

<body class="bg-secondary container text-white">
  <input type="hidden" id="urlBase" value="<?= URL ?>">

  <div class="row">
    <div class="col-4 mx-auto mt-5">
      <form id="formLogin" class="needs-validation" novalidate>
        <div class="mb-3">
          <label for="email" class="mb-1">Email</label>
          <input type="email" name="email" id="email" class="form-control" placeholder="correo@corre.com" required>
          <div class="invalid-feedback">
            Ingrese un correo valido
          </div>
        </div>

        <div class="mb-3">
          <label for="password" class="mb-1">Password</label>
          <input type="password" name="password" id="password" class="form-control" placeholder="**********" required>
          <div class="invalid-feedback">
            Ingrese una contraseña
          </div>
        </div>

        <button class="btn btn-primary">Sign In</button>

        <div class="mb-3" id="result"></div>
      </form>
    </div>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous">
  </script>

  <script src="<?= URL ?>/public/js/App.js"></script>
  <script src="<?= URL ?>/public/js/Login.js"></script>
</body>

</html>