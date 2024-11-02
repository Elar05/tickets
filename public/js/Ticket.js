ClassicEditor.create(document.querySelector("#ttaDescripcion"))
  .then((editor) => {
    console.log(editor);
  })
  .catch((error) => {
    console.error(error);
  });
