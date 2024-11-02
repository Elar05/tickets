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
  // $router->get("/", function () {
  //   $controller = new SecurityController();
  //   $controller->UserActions();
  // });

  $router->get("/nuevo-ticket", function () {
    $controller = new TicketsController();
    $controller->Nuevo();
  });
});

$router->get("/logout", function () {
  new Logout();
});

$router->set404(function () {
  new Errores();
});

$router->run();
