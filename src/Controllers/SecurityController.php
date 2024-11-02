<?php

namespace Instagram\Controllers;

use Instagram\Core\Session;

class SecurityController extends Session
{
  public function __construct()
  {
    parent::__construct("usertype");
  }

  public function UserTypes()
  {
    $this->view("user-types/index");
  }

  public function UserActions()
  {
    $this->view("user-actions/index");
  }
}
