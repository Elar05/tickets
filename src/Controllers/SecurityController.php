<?php

namespace Instagram\Controllers;

use Instagram\Core\Session;
use Instagram\Models\GeneralModel;

class SecurityController extends Session
{
  public function __construct()
  {
    parent::__construct("main");
  }

  public function UserTypes()
  {
    $this->view("user-types/index");
  }

  public function UserActions()
  {
    $this->view("user-actions/index");
  }

  public function Users()
  {
    $this->view("users/index");
  }

  public function Agencias()
  {
    $this->view("agencias/index");
  }

  public function saveUser()
  {
    $data = $_POST["data"];
    $data = explode("¯", $data);

    $datos = explode("|", $data[0]);
    $userId = $datos[0];
    $password = $datos[3];

    if ($userId === "") {
      $password = password_hash($password, PASSWORD_DEFAULT, ["cost" => 10]);
    } else {
      if ($password !== "") {
        $password = password_hash($password, PASSWORD_DEFAULT, ["cost" => 10]);
      }
    }

    $datos[3] = $password;

    $datos = implode("|", $datos);
    $data[0] = $datos;

    $data = implode("¯", $data);
    $data .= "¯" . $this->getUserId();

    $controller = ucfirst($_GET["controller"]);
    $view = str_replace(" ", "", ucwords(str_replace("-", " ", $_GET["view"])));

    $sp = $controller . $view;
    $response = GeneralModel::save($sp, $data);
    $this->response(["data" => $response]);
  }
}
