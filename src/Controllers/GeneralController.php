<?php

namespace Instagram\Controllers;

use Instagram\Core\Session;
use Instagram\Models\GeneralModel;

class GeneralController extends Session
{
  public function __construct()
  {
    parent::__construct("main");
  }

  public function list()
  {
    $data = $_GET["data"] ?? "";
    $sp = $this->getSP();
    $data = GeneralModel::getAll($sp, $data);
    $this->response(["data" => $data]);
  }

  public function edit()
  {
    $sp = $this->getSP();
    $data = GeneralModel::get($sp, $_GET["id"]);
    $this->response(["data" => $data]);
  }

  public function store()
  {
    $sp = $this->getSP();
    $datos = $_POST["data"] . "¯" . $this->getUserId();
    $data = GeneralModel::save($sp, $datos);
    $this->response(["data" => $data]);
  }

  public function destroy()
  {
    $sp = $this->getSP();
    $datos = $_POST["data"] . "¯" . $this->getUserId();
    $data = GeneralModel::delete($sp, $datos);
    $this->response(["data" => $data]);
  }

  public function getSP(): string
  {
    $controller = ucfirst($_GET["controller"]);
    $view = str_replace(" ", "", ucwords(str_replace("-", " ", $_GET["view"])));
    return "{$controller}{$view}";
  }
}
