<?php

namespace Instagram\Models;

use PDO;
use PDOException;
use Instagram\Core\Model;

class User extends Model
{
  public function __construct()
  {
    parent::__construct();
  }

  public function login($email, $password)
  {
    try {
      $query = $this->prepare("SELECT * FROM users WHERE email = :email;");
      $query->bindValue(":email", $email, PDO::PARAM_STR);
      $query->execute();
      if ($query->rowCount() === 1) {
        $user = $query->fetch(PDO::FETCH_ASSOC);

        if ($user["estadod_id"] === "2")
          return ["error" => "Usuario no activo"];

        if (!password_verify($password, $user["password"]))
          return ["error" => "Contraseña incorrecta"];

        return $user;
      }

      return ["error" => "Email no registrado"];
    } catch (PDOException $e) {
      error_log("Login::login() -> " . $e->getMessage());
      return null;
    }
  }

  static public function getPermissions($typeUserId)
  {
    try {
      $pdo = new Model();
      $query = $pdo->prepare(
        "SELECT controller
        FROM perfil_menu pm
        INNER JOIN menu m ON pm.menu_id = m.menu_id
        WHERE user_type_id = ? AND father_id != 0;"
      );
      $query->execute([$typeUserId]);
      $data = $query->fetchAll(PDO::FETCH_ASSOC);
      /**
       * ? Lo que devuelve la consulta: [["name" => 'user'], ["name" => 'main']]
       * ! Lo que debemos devolver: ['user', 'main']
       */
      $data = array_column($data, 'controller');
      $data[] = 'main';
      $data[] = 'logout';
      return $data;
    } catch (PDOException $e) {
      error_log("UserPermissionsModel::getPermissions() -> " . $e->getMessage());
      return false;
    }
  }
}
