<?php

namespace Instagram\Core;

use DateTime;

/**
 * @author Elar
 */
class Utils
{
  public $values;

  public function validate(array $rules)
  {
    $data = [];

    foreach ($rules as $field => $ruleString) {
      $rulesArray = explode('|', $ruleString);
      foreach ($rulesArray as $rule) {
        $ruleParts = explode(':', $rule);
        $ruleName = $ruleParts[0];
        $ruleValue = isset($ruleParts[1]) ? $ruleParts[1] : null;

        $value = $_POST[$field] ?? null;

        if ($ruleName === "exists" && !isset($value)) {
          $this->response(["error" => "El parametro {$field} no existe"]);
        }
        if ($ruleName === "required" && empty($value)) {
          $this->response(["error" => "El parametro {$field} esta vacío"]);
        }
        if ($ruleName === "letters" && !$this->isLetters($value)) {
          $this->response(["error" => "El parametro {$field} debe ser letras"]);
        }
        if ($ruleName === "max" && strlen($value) > $ruleValue) {
          $this->response(["error" => "El parametro {$field} debe ser de {$ruleValue} dígitos maximo"]);
        }
        if ($ruleName === "min" && strlen($value) < $ruleValue) {
          $this->response(["error" => "El parametro {$field} debe ser de {$ruleValue} dígitos minimo"]);
        }
        if ($ruleName === "email" && !$this->isEmail($value)) {
          $this->response(["error" => "El parametro {$field} debe ser un correo valido"]);
        }
        if ($ruleName === "file") {
          $parts = explode("?", $ruleValue);
          $folder = $parts[0];
          $extensions = explode(",", $parts[1]);
          $url = $this->saveFile($_FILES[$field], $folder, $extensions, true);
          if ($this->isArray($url))
            $this->response(["error" => $url["error"]]);
          else
            $value = $url;
        }
      }

      if (!isset($errors[$field])) $data[$field] = $value;
    }

    return $data;
  }

  public function saveFile($file, string $folder, array $extensions)
  {
    if (!empty($file['name'])) {
      $ext = pathinfo($file["name"], PATHINFO_EXTENSION);

      if (!in_array($ext, $extensions)) {
        $this->response(["error" => 'Tipo de archivo no valido']);
      }

      if (!file_exists($folder)) mkdir($folder, 0777, true);

      $hash = md5($file['name'] . microtime(true) . mt_rand());
      $url = "$folder$hash.$ext";

      $maxFileSize = str_replace("M", "", ini_get('upload_max_filesize'));
      $maxFileSize = ($maxFileSize * 1024 * 1024);

      if ($file['size'] <= $maxFileSize) {
        if ($file['error'] === UPLOAD_ERR_OK) {
          if (move_uploaded_file($file['tmp_name'], $url)) {
            return "/$url";
          }

          $this->response(["error" => 'Ocurrió un error al guardar el archivo']);
        }

        $this->response(["error" => 'Ocurrió un error durante la carga del archivo']);
      }

      $this->response(["error" => 'El archivo excede el límite de tamaño permitido']);
    }

    $this->response(["error" => 'No hay archivo a guardar']);
  }

  public function deleteFile($file)
  {
    unlink(substr($file, 1));
  }

  public function trim(string $string)
  {
    return trim($string);
  }

  public function isNumber($value)
  {
    return is_numeric($value);
  }

  public function isLetters($value)
  {
    return preg_match('/^[a-zA-ZáéíóúÁÉÍÓÚ\s]+$/', $value);
  }

  public function isAlphanumeric($value)
  {
    return (bool) preg_match('/[a-zA-ZáéíóúÁÉÍÓÚ0-9\s]+$/', $value);
    // return (bool) preg_match('/[a-zA-Z\s]+$/', $value) && (bool) preg_match('/^[a-zA-Z0-9\s]+$/', $value);
  }

  public function isEmail($email)
  {
    return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
  }

  public function isArray($value)
  {
    return is_array($value);
  }

  public function sanitizeHTML($html)
  {
    return $this->trim(strip_tags($html));
  }

  public function isDate($fecha, $formato = 'Y-m-d')
  {
    $dateTime = DateTime::createFromFormat($formato, $fecha);
    return $dateTime && $dateTime->format($formato) === $fecha;
  }

  public function validateDateRange(string $date1, string $date2)
  {
    $birthdate = strtotime($date1);
    $deathdate = strtotime($date2);

    if ($birthdate === false || $deathdate === false) {
      return false;
    }

    return $birthdate > $deathdate;
  }

  protected function response(array $data)
  {
    echo json_encode($data);
    exit;
  }


  public function validarLongitudCadena($string, $minLongitud, $maxLongitud)
  {
    $longitud = strlen($string);
    return $longitud >= $minLongitud && $longitud <= $maxLongitud;
  }

  public function validarNumeroEntero($value)
  {
    return filter_var($value, FILTER_VALIDATE_INT) !== false;
  }

  public function validarNumeroDecimal($value)
  {
    return filter_var($value, FILTER_VALIDATE_FLOAT) !== false;
  }

  public function validarURL($url)
  {
    return filter_var($url, FILTER_VALIDATE_URL) !== false;
  }
}
