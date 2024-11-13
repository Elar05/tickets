<?php

namespace Instagram\Controllers;

use Instagram\Core\Session;
use Instagram\Models\GeneralModel;

class TicketsController extends Session
{
  public function __construct()
  {
    parent::__construct("ticket");
  }

  public function Nuevo()
  {
    $this->view("tickets/nuevo");
  }

  public function Manejo()
  {
    $this->view("tickets/manejo");
  }

  public function Detalle($id)
  {
    $this->view("tickets/detalle", ["id" => $id]);
  }

  public function Categorias()
  {
    $this->view("tickets/categorias");
  }

  public function Prioridades()
  {
    $this->view("tickets/prioridades");
  }

  public function Titulos()
  {
    $this->view("tickets/titulos");
  }

  public function Abiertos()
  {
    $this->view("tickets/listado", [
      "tipoTicket" => 3,
      "titulo" => "Abiertos"
    ]);
  }

  public function Cerrados()
  {
    $this->view("tickets/listado", [
      "tipoTicket" => 4,
      "titulo" => "Cerrados"
    ]);
  }

  public function ManejoAbiertos()
  {
    $this->view("tickets/manejo-listado", [
      "tipoTicket" => 3,
      "titulo" => "Abiertos"
    ]);
  }

  public function ManejoCerrados()
  {
    $this->view("tickets/manejo-listado", [
      "tipoTicket" => 4,
      "titulo" => "Cerrados"
    ]);
  }

  public function guardarDocumentos()
  {
    $data = $this->validate(["ticket_id" => "exists|required"]);

    $uploadedFiles = $this->saveFiles($_FILES['documento'], "assets/documentos/$data[ticket_id]/", ['jpg', 'png', 'pdf', 'webp', 'jpeg']);

    if ($uploadedFiles["success"]) {
      $urls = implode("¬", $uploadedFiles["success"]);
      $res = GeneralModel::save("TicketsDocumentos", "$data[ticket_id]|0¯$urls");
      $this->response(["success" => $res]);
    }

    $this->response(["error" => $uploadedFiles["error"]]);
  }

  public function guardarDetalleDocumentos()
  {
    $data = $this->validate(["ticket_id" => "exists|required", "ticket_detalle_id" => "exists|required"]);

    $uploadedFiles = $this->saveFiles($_FILES['documento'], "assets/documentos/$data[ticket_id]/detalle/", ['jpg', 'png', 'pdf', 'webp', 'jpeg']);

    if ($uploadedFiles["success"]) {
      $urls = implode("¬", $uploadedFiles["success"]);
      $res = GeneralModel::save("TicketsDocumentos", "$data[ticket_id]|$data[ticket_detalle_id]¯$urls");
      $this->response(["success" => $res, "urls" => $urls]);
    }

    $this->response(["error" => $uploadedFiles["error"]]);
  }
}
