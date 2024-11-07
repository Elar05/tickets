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
        <input type="hidden" id="txtId" class="Popup">
        <div class="row mb-4">
          <div class="col-4">
            <label class="form-label fw-bold mb-1 required">Titulo</label>
            <div class="input-group">
              <span class="input-group-text py-1 px-2"><i class="ri-dashboard-line fs-4"></i></span>
              <select id="cboTitulo" class="form-select Popup Reque"></select>
            </div>
          </div>

          <div class="col-8">
            <div class="row">
              <div class="col-lg-4">
                <label class="form-label fw-bold mb-1 required">Categoria</label>
                <div class="input-group">
                  <span class="input-group-text py-1 px-2"><i class="ri-dashboard-line fs-4"></i></span>
                  <select id="cboCategoria" class="form-select Popup Reque"></select>
                </div>
              </div>

              <div class="col-lg-4">
                <label class="form-label fw-bold mb-1 required">Sub Categoria</label>
                <div class="input-group">
                  <span class="input-group-text py-1 px-2"><i class="ri-dashboard-line fs-4"></i></span>
                  <select id="cboSubCategoria" class="form-select Popup Reque"></select>
                </div>
              </div>

              <div class="col-lg-4">
                <label class="form-label fw-bold mb-1 required">Prioridad</label>
                <div class="input-group">
                  <span class="input-group-text py-1 px-2"><i class="ri-dashboard-line fs-4"></i></span>
                  <select id="cboPrioridad" class="form-select Popup Reque"></select>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="row mb-4">
          <div class="col-lg-12">
            <label class="form-label fw-bold mb-1 required">Descripción</label>
            <div id="ttaDescripcion"></div>
          </div>
        </div>

        <div class="row mb-4">
          <div class="col-lg-12">
            <label class="form-label fw-bold mb-1 required">Documentos Adicionales</label>
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
<script src="<?= URL ?>/assets/libs/@ckeditor/ckeditor5-build-classic/build/ckeditor.js"></script>
<script src="<?= URL ?>/assets/libs/dropzone/dropzone-min.js"></script>

<script>
  var editor;
  var ckeditorClassic = document.querySelector("#ttaDescripcion");
  if (ckeditorClassic) {
    ClassicEditor.create(ckeditorClassic, {
        toolbar: [
          'undo',
          'redo',
          '|',
          'heading',
          '|',
          'bold',
          'italic',
          'underline',
          '|',
          // 'link',
          // 'uploadImage',
          'ckbox',
          // 'insertTable',
          'blockQuote',
          // 'mediaEmbed',
          '|',
          'bulletedList',
          'numberedList',
          '|',
          'outdent',
          'indent',
        ],
      })
      .then(function(e) {
        e.ui.view.editable.element.style.height = "200px";

        editor = e;
      })
      .catch(function(e) {
        console.error(e);
      });
  }

  var previewTemplate,
    dropzone,
    dropzonePreviewNode = document.querySelector("#dropzone-preview-list");

  if (dropzonePreviewNode) {
    dropzonePreviewNode.id = "";
    previewTemplate = dropzonePreviewNode.parentNode.innerHTML;
    dropzonePreviewNode.parentNode.removeChild(dropzonePreviewNode);

    dropzone = new Dropzone(".dropzone", {
      url: "<?= URL ?>/tickets/nuevo/guardar-documento",
      method: "POST",
      previewTemplate: previewTemplate,
      previewsContainer: "#dropzone-preview",
      clickable: true,
      // addRemoveLinks: true, // Añadir enlaces para eliminar archivos
      autoProcessQueue: true, // Procesa los archivos automáticamente cuando se agregan
      paramName: "documento",
      acceptedFiles: ".jpg,.jpeg,.png,.webp,.pdf",
      maxFiles: 10, // Número máximo de archivos que se pueden subir
      maxFilesize: 1, // Tamaño máximo por archivo en MB
    });

    // Opcional: Manejar evento de éxito
    dropzone.on("success", function(file, response) {
      console.log("Archivo subido con éxito:", file);
      console.log(response);
    });

    // Opcional: Manejar evento de error
    dropzone.on("error", function(file, errorMessage) {
      console.log("Error al subir el archivo:", file, errorMessage);
    });

    dropzone.on("removedfile", function(file) {
      // Esto se ejecuta cuando un archivo es eliminado de Dropzone

      // Hacer una petición AJAX al servidor para eliminar el archivo
      var fileName = file.name; // El nombre del archivo eliminado

      fetch("<?= URL ?>/tickets/nuevo/eliminar-documento", {
          method: "POST", // Usamos POST para enviar la solicitud de eliminación
          headers: {
            "Content-Type": "application/json", // Indicamos que enviamos JSON
          },
          body: JSON.stringify({
            fileName: fileName
          }) // Enviamos el nombre del archivo
        })
        .then(response => response.json()) // Parseamos la respuesta del servidor
        .then(data => {
          if (data.success) {
            console.log("Archivo eliminado correctamente en el servidor.");
          } else {
            console.error("Error al eliminar el archivo en el servidor.");
          }
        })
        .catch(error => {
          console.error("Error al intentar eliminar el archivo:", error);
        });
    });

  }
</script>

<script src="<?= URL ?>/public/js/Ticket.js"></script>
<?php require_once "src/views/layout/foot.php"; ?>