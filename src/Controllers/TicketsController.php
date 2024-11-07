<?php

namespace Instagram\Controllers;

use Instagram\Core\Session;

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
    $this->view("tickets/abiertos");
  }

  public function Cerrados()
  {
    $this->view("tickets/cerrados");
  }
}
