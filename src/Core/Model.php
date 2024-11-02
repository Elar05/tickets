<?php

namespace Instagram\Core;

class Model
{
  private Database $db;

  public function __construct()
  {
    $this->db = new Database();
  }

  protected function connect()
  {
    return $this->db->connect();
  }

  protected function query($sql)
  {
    return $this->db->connect()->query($sql);
  }

  protected function prepare($sql)
  {
    return $this->db->connect()->prepare($sql);
  }
}
