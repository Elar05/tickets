<?php

date_default_timezone_set("America/Lima");

error_reporting(E_ALL);
ini_set('ignore_repeated_errors', TRUE);
ini_set('display_errors', FALSE);
ini_set('log_errors', TRUE);
ini_set("error_log", 'debug.log');

require_once "vendor/autoload.php";
require_once "config/config.php";
require_once "src/Core/Router.php";