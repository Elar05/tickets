<?php

use Instagram\Controllers\Main;
use Instagram\Controllers\Login;
use Instagram\Controllers\Logout;
use Instagram\Controllers\Errores;
use Instagram\Controllers\GeneralController;
use Instagram\Controllers\TicketsController;
use Instagram\Controllers\SecurityController;

$router = new \Bramus\Router\Router();

$router->get("/", function () {
  $main = new Main();
  $main->render();
});

$router->get("/main", function () {
  $main = new Main();
  $main->render();
});

$router->mount("/login", function () use ($router) {
  $router->get("/", function () {
    $login = new Login();
    $login->render();
  });

  $router->post("/auth", function () {
    $login = new Login();
    $login->auth();
  });
});

$router->mount("/security/user-types", function () use ($router) {
  $router->get("/", function () {
    $controller = new SecurityController();
    $controller->UserTypes();
  });

  $router->get("/list", function () {
    $controller = new GeneralController();
    $controller->list();
  });

  $router->get("/edit", function () {
    $controller = new GeneralController();
    $controller->edit();
  });

  $router->post("/save", function () {
    $controller = new GeneralController();
    $controller->store();
  });

  $router->post("/delete", function () {
    $controller = new GeneralController();
    $controller->destroy();
  });
});

$router->mount("/security/user-actions", function () use ($router) {
  $router->get("/", function () {
    $controller = new SecurityController();
    $controller->UserActions();
  });

  $router->get("/list", function () {
    $controller = new GeneralController();
    $controller->list();
  });

  $router->get("/edit", function () {
    $controller = new GeneralController();
    $controller->edit();
  });

  $router->post("/save", function () {
    $controller = new GeneralController();
    $controller->store();
  });

  $router->post("/delete", function () {
    $controller = new GeneralController();
    $controller->destroy();
  });
});

$router->mount("/tickets", function () use ($router) {
  $router->get("/(\d+)", function ($id) {
    $controller = new TicketsController();
    $controller->Detalle($id);
  });

  // Nuevo
  $router->get("/nuevo", function () {
    $controller = new TicketsController();
    $controller->Nuevo();
  });
  $router->get("/nuevo/list", function () {
    $controller = new GeneralController();
    $controller->list();
  });
  $router->post("/nuevo/save", function () {
    $controller = new GeneralController();
    $controller->store();
  });
  $router->post("/nuevo/guardar-documento", function () {
    $controller = new TicketsController();
    $controller->guardarDocumentos();
  });

  // Abiertos
  $router->get("/abiertos", function () {
    $controller = new TicketsController();
    $controller->Abiertos();
  });
  $router->get("/abiertos/list", function () {
    $controller = new GeneralController();
    $controller->list();
  });

  // Cerrados
  $router->get("/cerrados", function () {
    $controller = new TicketsController();
    $controller->Cerrados();
  });
  $router->get("/cerrados/list", function () {
    $controller = new GeneralController();
    $controller->list();
  });

  // Categorias
  $router->get("/categorias", function () {
    $controller = new TicketsController();
    $controller->Categorias();
  });
  $router->get("/categorias/list", function () {
    $controller = new GeneralController();
    $controller->list();
  });
  $router->get("/categorias/edit", function () {
    $controller = new GeneralController();
    $controller->edit();
  });
  $router->post("/categorias/save", function () {
    $controller = new GeneralController();
    $controller->store();
  });
  $router->post("/categorias/delete", function () {
    $controller = new GeneralController();
    $controller->destroy();
  });

  // Prioridades
  $router->get("/prioridades", function () {
    $controller = new TicketsController();
    $controller->Prioridades();
  });
  $router->get("/prioridades/list", function () {
    $controller = new GeneralController();
    $controller->list();
  });
  $router->get("/prioridades/edit", function () {
    $controller = new GeneralController();
    $controller->edit();
  });
  $router->post("/prioridades/save", function () {
    $controller = new GeneralController();
    $controller->store();
  });
  $router->post("/prioridades/delete", function () {
    $controller = new GeneralController();
    $controller->destroy();
  });

  // Titulos
  $router->get("/titulos", function () {
    $controller = new TicketsController();
    $controller->Titulos();
  });
  $router->get("/titulos/list", function () {
    $controller = new GeneralController();
    $controller->list();
  });
  $router->get("/titulos/edit", function () {
    $controller = new GeneralController();
    $controller->edit();
  });
  $router->post("/titulos/save", function () {
    $controller = new GeneralController();
    $controller->store();
  });
  $router->post("/titulos/delete", function () {
    $controller = new GeneralController();
    $controller->destroy();
  });
});

$router->get("/logout", function () {
  new Logout();
});

$router->set404(function () {
  new Errores();
});

$router->run();
