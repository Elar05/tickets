<?php

namespace Instagram\Core;

class Controller extends Utils
{
  private View $view;

  public function __construct(array $user = [], string $menu = "")
  {
    $this->view = new View($user, $menu);
  }

  protected function view(string $name, array $data = [])
  {
    $this->view->render($name, $data);
  }

  protected function redirect($url, $messages = [])
  {
    $data = [];
    $params = "";

    foreach ($messages as $key => $value) {
      $data[] = $key . '=' . $this->encrypt($value);
    }
    $params = join('&', $data);

    if ($params !== "")
      $params = "?$params";

    header("Location: " . URL . "/$url$params");
    exit;
  }

  protected function existsPOST($params)
  {
    foreach ($params as $param) {
      if (!isset($_POST[$param]) || empty($_POST[$param]))
        return false;
    }

    return true;
  }

  protected function post($params)
  {
    $data = [];
    $errors = [];

    foreach ($params as $param) {
      if (!isset($_POST[$param]) || empty($_POST[$param]))
        $errors[] = $param;
      else
        $data[$param] = $_POST[$param];
    }

    if (count($errors) > 0)
      $this->response(["error" => true, "errorData" => $errors]);
    else
      return $data;
  }

  protected function existsGET($params)
  {
    foreach ($params as $param) {
      if (!isset($_GET[$param]) || empty($_GET[$param]))
        return false;
    }

    return true;
  }

  protected function existsFILE($param)
  {
    if (!isset($_FILES[$param]) || empty($_FILES[$param]))
      return false;

    return true;
  }

  protected function encrypt($value)
  {
    return base64_encode($value);
  }
}