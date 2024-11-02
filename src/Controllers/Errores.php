<?php

namespace Instagram\Controllers;

use Instagram\Core\Controller;

class Errores extends Controller
{
  public function __construct()
  {
    parent::__construct();
    $this->view("errores/index");
  }
}