<?php

namespace Instagram\Controllers;

use Instagram\Core\Session;

class Logout extends Session
{
  public function __construct()
  {
    parent::__construct("logout");
    $this->logout();
    $this->redirect("");
  }
}
