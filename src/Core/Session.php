<?php

namespace Instagram\Core;

use Instagram\Models\User;

class Session extends Controller
{
  public string $defaultSite;
  private int $userId;
  private int $userType;
  private string $userName;
  private array $permissions;

  public function __construct(private string $view)
  {
    if (session_status() == PHP_SESSION_NONE) session_start();

    /**
     * 1 => invitado
     * 2 => user
     * 3 => admin
     * 4 => superadmin
     */

    $this->userId = $_SESSION["userId"] ?? 0;
    $this->userType = $_SESSION["userType"] ?? 1;
    $this->userName = $_SESSION["userName"] ?? "";
    $this->defaultSite = "main";
    $this->permissions = User::getPermissions($this->userType);

    $this->validateSession();

    $menu = Menu::generate($this->userType);

    parent::__construct([
      "name" => $this->userName,
      "type" => $this->userType,
      "id" => $this->userId,
    ], $menu);
  }

  private function validateSession()
  {
    if ($this->existsSession()) {
      if (!$this->isAuthorized($this->view))
        $this->redirect($this->defaultSite);
    } else {
      if ($this->view !== "login")
        $this->redirect("login");
    }
  }

  private function existsSession()
  {
    return isset($_SESSION["userId"]);
  }

  private function isAuthorized($permission)
  {
    return in_array($permission, $this->permissions);
  }

  public function initialize($user)
  {
    $_SESSION["userId"] = $user["id"];
    $_SESSION["userType"] = $user["user_type_id"];
    $_SESSION["userName"] = $user["names"];

    $this->response(["success" => "Incio de Sesión Correcto"]);
  }

  protected function logout()
  {
    session_unset();
    session_destroy();
  }

  public function getUserId()
  {
    return $this->userId;
  }

  public function getUserType()
  {
    return $this->userType;
  }
}
