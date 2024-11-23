<?php

namespace Instagram\Controllers;

use Instagram\Core\Session;
use Instagram\Models\GeneralModel;

class CobranzasController extends Session
{
  public function __construct()
  {
    parent::__construct("main");
  }

  public function Nuevo()
  {
    $this->view("cobranzas/nuevo");
  }

  public function Listado()
  {
    $fechaInicio = date("Y-m-d");
    $fechaFin = date("Y-m-d");
    $view = ($this->getUserType() == 3) ? "listado-admin" : "listado";
    $this->view("cobranzas/$view", ["fechaInicio" => $fechaInicio, "fechaFin" => $fechaFin]);
  }

  public function saveVoucher()
  {
    $data = $this->validate(["cobranza_id" => "exists|required"]);

    $url = $this->saveFile(
      $_FILES['documento'],
      "assets/cobranzas/",
      ['jpg', 'png', 'pdf', 'webp', 'jpeg']
    );

    $res = GeneralModel::save("CobranzasDocumento", "$data[cobranza_id]¯$url");
    $this->response(["success" => $res, "url" => $url]);
  }
}
