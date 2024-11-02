<?php

namespace Instagram\Core;

use PDO;
use PDOException;

class Database
{
  private $host;
  private $db;
  private $user;
  private $password;
  private $charset;

  public function __construct()
  {
    $this->host = HOST;
    $this->db = DB;
    $this->user = USER;
    $this->password = PASS;
    $this->charset = CHARSET;
  }

  public function connect(): PDO
  {
    try {
      $conexion = "mysql:host={$this->host};dbname={$this->db};charset={$this->charset}";
      $options = [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_EMULATE_PREPARES => false,
      ];
      $pdo = new PDO($conexion, $this->user, $this->password, $options);
      return $pdo;
    } catch (PDOException $e) {
      error_log('Database::connec() -> ' . $e->getMessage());
      return false;
    }
  }
}
