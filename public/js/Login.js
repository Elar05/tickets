const formLogin = document.getElementById("formLogin");

formLogin.addEventListener("submit", function (e) {
  e.preventDefault();

  if (this.checkValidity()) {
    const data = new FormData(this);
    request("/login/auth", data, "POST").then((data) => {
      if ("success" in data) {
        document.getElementById("result").innerHTML = `<p>${data.success}</p>`;

        setTimeout(() => {
          window.location.href = URL_BASE;
        }, 1000);
      }
    });
  }

  this.classList.add("was-validated");
});
