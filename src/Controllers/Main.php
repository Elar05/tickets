<?php

namespace Instagram\Controllers;

use Instagram\Core\Session;

class Main extends Session
{
  public function __construct()
  {
    parent::__construct("main");
  }

  public function render()
  {
    $this->view('main/index');
  }
}
