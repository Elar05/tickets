<?php

namespace Instagram\Controllers;

use Instagram\Core\Session;

class AgenciasController extends Session
{
  public function __construct()
  {
    parent::__construct("main");
  }

  public function Nueva()
  {
    $this->view("agencias/nueva");
  }

  public function Listado()
  {
    $this->view("agencias/nueva");
  }
}
