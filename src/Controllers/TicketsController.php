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
    $this->view("tickets/new");
  }
}
