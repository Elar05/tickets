-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 02-11-2024 a las 23:08:22
-- Versión del servidor: 8.0.31
-- Versión de PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `instagram`
--

DELIMITER $$
--
-- Procedimientos
--
DROP PROCEDURE IF EXISTS `GenerateMenu`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `GenerateMenu` ()   BEGIN
  -- ELIMINAR MENU
  DELETE FROM menu WHERE app_id = 1;

  -- TICKETS
  INSERT INTO menu (app_id, menu_id, father_id, title, controller, view) 
  VALUES (1, 1001, 0, 'Tickets', NULL, NULL);

  INSERT INTO menu (app_id, menu_id, father_id, title, controller, view) 
  VALUES (1, 1002, 1001, 'Tickets', NULL, NULL);
  
  INSERT INTO menu (app_id, menu_id, father_id, title, controller, view) 
  VALUES (1, 1003, 1002, 'Procesos', NULL, NULL);
  
  INSERT INTO menu (app_id, menu_id, father_id, title, controller, view) 
  VALUES (1, 1004, 1003, 'Registrar Nuevo', 'tickets', 'nuevo-ticket');
  
  INSERT INTO menu (app_id, menu_id, father_id, title, controller, view) 
  VALUES (1, 1005, 1003, 'Tickets Abiertos', 'tickets', 'tickets-abiertos');
  
  INSERT INTO menu (app_id, menu_id, father_id, title, controller, view) 
  VALUES (1, 1006, 1003, 'Tickets Cerrados', 'tickets', 'tickets-cerrados');

  -- INVENTORY
  INSERT INTO menu (app_id, menu_id, father_id, title, controller, view) 
  VALUES (1, 2001, 0, 'Inventario', NULL, NULL);

  INSERT INTO menu (app_id, menu_id, father_id, title, controller, view) 
  VALUES (1, 2002, 2001, 'Inventario', NULL, NULL);

  INSERT INTO menu (app_id, menu_id, father_id, title, controller, view) 
  VALUES (1, 2003, 2002, 'Gestión', NULL, NULL);
  
  INSERT INTO menu (app_id, menu_id, father_id, title, controller, view) 
  VALUES (1, 2004, 2003, 'Productos', 'inventory', 'products');
  
  INSERT INTO menu (app_id, menu_id, father_id, title, controller, view) 
  VALUES (1, 2005, 2003, 'Categorias', 'inventory', 'categories');

  INSERT INTO menu (app_id, menu_id, father_id, title, controller, view) 
  VALUES (1, 2006, 2003, 'Entradas', 'inventory', 'entries');

  INSERT INTO menu (app_id, menu_id, father_id, title, controller, view) 
  VALUES (1, 2007, 2003, 'Salidas', 'inventory', 'exits');
  
  -- SECURITY
  INSERT INTO menu (app_id, menu_id, father_id, title, controller, view) 
  VALUES (1, 3001, 0, 'Seguridad', NULL, NULL);

  INSERT INTO menu (app_id, menu_id, father_id, title, controller, view) 
  VALUES (1, 3002, 3001, 'Seguridad', NULL, NULL);
  
  INSERT INTO menu (app_id, menu_id, father_id, title, controller, view) 
  VALUES (1, 3003, 3002, 'Control', NULL, NULL);
  
  INSERT INTO menu (app_id, menu_id, father_id, title, controller, view) 
  VALUES (1, 3004, 3003, 'Usuarios', 'security', 'users');
  
  INSERT INTO menu (app_id, menu_id, father_id, title, controller, view) 
  VALUES (1, 3005, 3003, 'Roles', 'security', 'user-types');
  
  INSERT INTO menu (app_id, menu_id, father_id, title, controller, view) 
  VALUES (1, 3006, 3003, 'Acciones de Usuario', 'security', 'user-actions');
END$$

DROP PROCEDURE IF EXISTS `SecurityMenuList`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `SecurityMenuList` (IN `_datos` INT)   BEGIN
  IF (_datos = 3) THEN
    SELECT menu_id, father_id, title, controller, view
    FROM menu
    ORDER BY menu_id;
  ELSE
    SELECT menu.menu_id, menu.father_id, menu.title, menu.controller, menu.view
    FROM menu
    INNER JOIN perfil_menu ON menu.menu_id = perfil_menu.menu_id
    WHERE user_type_id = _datos
    ORDER BY menu.menu_id;
  END IF;  
END$$

DROP PROCEDURE IF EXISTS `SecurityUserActionsDelete`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `SecurityUserActionsDelete` (IN `_datos` VARCHAR(255))   BEGIN
  DECLARE error_code INT DEFAULT 0;
  DECLARE error_message TEXT;
  DECLARE response TEXT;

  DECLARE EXIT HANDLER FOR SQLEXCEPTION
  BEGIN
    GET DIAGNOSTICS CONDITION 1
      error_code = MYSQL_ERRNO,
      error_message = MESSAGE_TEXT;

    ROLLBACK;

    SET response = CONCAT('E|Ocurrion un error: ', error_message);
  END;

  START TRANSACTION;

  DELETE FROM user_actions WHERE id = _datos;
  DELETE FROM user_permissions WHERE action_id = _datos;

  SET response = 'A|Registro eliminado correctamente';

  COMMIT;

  SELECT CONCAT(
    'id|Nombre¬10|180¬Int32|String¬',
    IFNULL((
      SELECT GROUP_CONCAT(CONCAT(id, '|', name) SEPARATOR '¬')
      FROM user_actions
    ), ''),
    '¯',
    response
  ) AS data;
END$$

DROP PROCEDURE IF EXISTS `SecurityUserActionsEdit`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `SecurityUserActionsEdit` (IN `_datos` VARCHAR(255))   BEGIN
  SELECT IFNULL(CONCAT( id, '|', name), '') AS data
  FROM user_actions WHERE id = _datos;
END$$

DROP PROCEDURE IF EXISTS `SecurityUserActionsList`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `SecurityUserActionsList` (IN `_datos` VARCHAR(255))   BEGIN
  SELECT CONCAT(
    'id|Nombre¬10|180¬Int32|String¬',
    IFNULL((
      SELECT GROUP_CONCAT(CONCAT(id, '|', name) SEPARATOR '¬')
      FROM user_actions
    ), '')
  ) AS data;
END$$

DROP PROCEDURE IF EXISTS `SecurityUserActionsSave`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `SecurityUserActionsSave` (IN `_datos` VARCHAR(255))   BEGIN
  DECLARE _id INT;
  DECLARE _name VARCHAR(100);
  DECLARE error_code INT DEFAULT 0;
  DECLARE error_message TEXT;
  DECLARE response TEXT;
  
  DECLARE EXIT HANDLER FOR SQLEXCEPTION
  BEGIN
    GET DIAGNOSTICS CONDITION 1
      error_code = MYSQL_ERRNO,
      error_message = MESSAGE_TEXT;

    ROLLBACK;

    SET response = CONCAT('E|Ocurrion un error: ', error_message);
  END;

  START TRANSACTION;

  SET _id = SplitString(_datos, '|', 1);
  SET _name = SplitString(_datos, '|', 2);

  IF (_id = 0) THEN
    INSERT INTO user_actions (id, name) VALUES (_id, _name);
    SET response = 'A|Registro guardado con exito';
  ELSE
    UPDATE user_actions SET name = _name WHERE id = _id;
    SET response = 'A|Registro actualizado con exito';
  END IF;
  
  COMMIT;

  SELECT CONCAT(
    'id|Nombre¬10|180¬Int32|String¬',
    IFNULL((
      SELECT GROUP_CONCAT(CONCAT(id, '|', name) SEPARATOR '¬')
      FROM user_actions
    ), ''),
    '¯',
    response
  ) AS data;
END$$

DROP PROCEDURE IF EXISTS `SecurityUserTypesActionsList`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `SecurityUserTypesActionsList` (IN `_datos` VARCHAR(255))   BEGIN
  SELECT IFNULL((
    SELECT GROUP_CONCAT(action_id SEPARATOR '|')
    FROM user_permissions WHERE user_type_id = _datos
  ), '') AS data;
END$$

DROP PROCEDURE IF EXISTS `SecurityUserTypesActionsSave`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `SecurityUserTypesActionsSave` (IN `_datos` VARCHAR(255))   BEGIN
  DECLARE _USER_TYPE_ID INT;
  DECLARE _ACTION_ID INT;
  DECLARE error_code INT DEFAULT 0;
  DECLARE error_message TEXT;
  DECLARE response TEXT;
  
  DECLARE EXIT HANDLER FOR SQLEXCEPTION
  BEGIN
    GET DIAGNOSTICS CONDITION 1
      error_code = MYSQL_ERRNO,
      error_message = MESSAGE_TEXT;

    ROLLBACK;

    SET response = CONCAT('E|Ocurrion un error: ', error_message);
  END;

  START TRANSACTION;

  SET _USER_TYPE_ID = SplitString(_datos, '|', 1);
  SET _ACTION_ID = SplitString(_datos, '|', 2);

  IF EXISTS (
    SELECT * FROM user_permissions 
    WHERE user_type_id = _USER_TYPE_ID AND action_id = _ACTION_ID
  ) THEN
    DELETE FROM user_permissions 
    WHERE user_type_id = _USER_TYPE_ID AND action_id = _ACTION_ID;
    
    SET response = 'A|Permiso eliminado con exito';
  ELSE
    INSERT INTO user_permissions (user_type_id, action_id) 
    VALUES (_USER_TYPE_ID, _ACTION_ID);

    SET response = 'A|Permiso guardado con exito';
  END IF;
  
  COMMIT;

  SELECT response AS data;
END$$

DROP PROCEDURE IF EXISTS `SecurityUserTypesDelete`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `SecurityUserTypesDelete` (IN `_datos` VARCHAR(255))   BEGIN
  DECLARE error_code INT DEFAULT 0;
  DECLARE error_message TEXT;
  DECLARE response TEXT;
  
  DECLARE EXIT HANDLER FOR SQLEXCEPTION
  BEGIN
    GET DIAGNOSTICS CONDITION 1
      error_code = MYSQL_ERRNO,
      error_message = MESSAGE_TEXT;

    ROLLBACK;

    SET response = CONCAT('E|Ocurrion un error ', error_code, ': ', error_message);
  END;

  START TRANSACTION;

  DELETE FROM user_types WHERE id = _datos;
  SET response = 'A|Registro eliminado correctamente';
  
  COMMIT;

  SELECT CONCAT(
    'id|Nombre¬10|180¬Int32|String¬',
    IFNULL((
      SELECT GROUP_CONCAT(CONCAT(id, '|', name) SEPARATOR '¬')
      FROM user_types
    ), ''),
    '¯',
    response
  ) AS data;
END$$

DROP PROCEDURE IF EXISTS `SecurityUserTypesEdit`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `SecurityUserTypesEdit` (IN `_datos` VARCHAR(255))   BEGIN
  SELECT IFNULL(CONCAT( id, '|', name), '') AS data
  FROM user_types WHERE id = _datos;
END$$

DROP PROCEDURE IF EXISTS `SecurityUserTypesHelpersList`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `SecurityUserTypesHelpersList` (IN `_datos` VARCHAR(255))   BEGIN
  SELECT IFNULL((
    SELECT GROUP_CONCAT(CONCAT(id, '|', name) SEPARATOR '¬')
    FROM user_actions
  ), '') AS data;
END$$

DROP PROCEDURE IF EXISTS `SecurityUserTypesList`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `SecurityUserTypesList` (IN `datos` VARCHAR(255))   BEGIN
  SELECT CONCAT(
    'id|Nombre¬10|180¬Int32|String¬',
    IFNULL((
      SELECT GROUP_CONCAT(CONCAT(id, '|', name) SEPARATOR '¬')
      FROM user_types
    ), '')
  ) AS data;
END$$

DROP PROCEDURE IF EXISTS `SecurityUserTypesSave`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `SecurityUserTypesSave` (IN `_datos` VARCHAR(255))   BEGIN
  DECLARE _id INT;
  DECLARE _name VARCHAR(100);
  DECLARE error_code INT DEFAULT 0;
  DECLARE error_message TEXT;
  DECLARE response TEXT;
  
  DECLARE EXIT HANDLER FOR SQLEXCEPTION
  BEGIN
    GET DIAGNOSTICS CONDITION 1
      error_code = MYSQL_ERRNO,
      error_message = MESSAGE_TEXT;

    ROLLBACK;

    SET response = CONCAT('¯E|Ocurrion un error: ', error_message);
  END;

  START TRANSACTION;

  SET _id = SplitString(_datos, '|', 1);
  SET _name = SplitString(_datos, '|', 2);

  IF (_id = 0) THEN
    INSERT INTO user_types (id, name) VALUES (_id, _name);
    SET response = 'A|Registro guardado con exito';
  ELSE
    UPDATE user_types SET name = _name WHERE id = _id;
    SET response = 'A|Registro actualizado con exito';
  END IF;
  
  COMMIT;

  SELECT CONCAT(
    'id|Nombre¬10|180¬Int32|String¬',
    IFNULL((
      SELECT GROUP_CONCAT(CONCAT(id, '|', name) SEPARATOR '¬')
      FROM user_types
    ), ''),
    '¯',
    response
  ) AS data;
END$$

--
-- Funciones
--
DROP FUNCTION IF EXISTS `SplitString`$$
CREATE DEFINER=`root`@`localhost` FUNCTION `SplitString` (`str` VARCHAR(255), `delim` VARCHAR(10), `pos` INT) RETURNS TEXT CHARSET utf8mb4 COLLATE utf8mb4_unicode_ci  BEGIN
  DECLARE output TEXT;
  SET output = SUBSTRING_INDEX(SUBSTRING_INDEX(str, delim, pos), delim, -1);
  RETURN output;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `entradas`
--

DROP TABLE IF EXISTS `entradas`;
CREATE TABLE IF NOT EXISTS `entradas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `producto_id` int NOT NULL,
  `cantidad` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `menu`
--

DROP TABLE IF EXISTS `menu`;
CREATE TABLE IF NOT EXISTS `menu` (
  `app_id` int NOT NULL,
  `menu_id` int NOT NULL,
  `father_id` int DEFAULT NULL,
  `title` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `controller` varchar(60) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `view` varchar(60) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `icon` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `menu`
--

INSERT INTO `menu` (`app_id`, `menu_id`, `father_id`, `title`, `controller`, `view`, `icon`) VALUES
(1, 3006, 3003, 'Acciones de Usuario', 'security', 'user-actions', NULL),
(1, 3005, 3003, 'Roles', 'security', 'user-types', NULL),
(1, 3004, 3003, 'Usuarios', 'security', 'users', NULL),
(1, 3003, 3002, 'Control', NULL, NULL, NULL),
(1, 3002, 3001, 'Seguridad', NULL, NULL, NULL),
(1, 2007, 2003, 'Salidas', 'inventory', 'exits', NULL),
(1, 3001, 0, 'Seguridad', NULL, NULL, NULL),
(1, 2005, 2003, 'Categorias', 'inventory', 'categories', NULL),
(1, 2006, 2003, 'Entradas', 'inventory', 'entries', NULL),
(1, 2003, 2002, 'Gestión', NULL, NULL, NULL),
(1, 2004, 2003, 'Productos', 'inventory', 'products', NULL),
(1, 2001, 0, 'Inventario', NULL, NULL, NULL),
(1, 2002, 2001, 'Inventario', NULL, NULL, NULL),
(1, 1006, 1003, 'Tickets Cerrados', 'tickets', 'tickets-cerrados', NULL),
(1, 1005, 1003, 'Tickets Abiertos', 'tickets', 'tickets-abiertos', NULL),
(1, 1004, 1003, 'Registrar Nuevo', 'tickets', 'nuevo-ticket', NULL),
(1, 1003, 1002, 'Procesos', NULL, NULL, NULL),
(1, 1002, 1001, 'Tickets', NULL, NULL, NULL),
(1, 1001, 0, 'Tickets', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `m_estado_c`
--

DROP TABLE IF EXISTS `m_estado_c`;
CREATE TABLE IF NOT EXISTS `m_estado_c` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `m_estado_d`
--

DROP TABLE IF EXISTS `m_estado_d`;
CREATE TABLE IF NOT EXISTS `m_estado_d` (
  `id` int NOT NULL AUTO_INCREMENT,
  `estadoc_id` int NOT NULL,
  `nombre` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `m_tipo_c`
--

DROP TABLE IF EXISTS `m_tipo_c`;
CREATE TABLE IF NOT EXISTS `m_tipo_c` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `m_tipo_c`
--

INSERT INTO `m_tipo_c` (`id`, `nombre`) VALUES
(1, 'Categorias'),
(2, 'Sub Categorias'),
(3, 'Prioridades');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `m_tipo_d`
--

DROP TABLE IF EXISTS `m_tipo_d`;
CREATE TABLE IF NOT EXISTS `m_tipo_d` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tipoc_id` int NOT NULL,
  `nombre` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tipoc_refe_id` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `perfil_menu`
--

DROP TABLE IF EXISTS `perfil_menu`;
CREATE TABLE IF NOT EXISTS `perfil_menu` (
  `user_type_id` int NOT NULL,
  `menu_id` int NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `perfil_menu`
--

INSERT INTO `perfil_menu` (`user_type_id`, `menu_id`) VALUES
(1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

DROP TABLE IF EXISTS `productos`;
CREATE TABLE IF NOT EXISTS `productos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `precio` decimal(18,2) NOT NULL,
  `stock` int NOT NULL,
  `estadod_id` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `salidas`
--

DROP TABLE IF EXISTS `salidas`;
CREATE TABLE IF NOT EXISTS `salidas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `producto_id` int NOT NULL,
  `cantidad` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tickets`
--

DROP TABLE IF EXISTS `tickets`;
CREATE TABLE IF NOT EXISTS `tickets` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `user_asignado_id` int DEFAULT NULL,
  `tipod_subcat_id` int NOT NULL,
  `tipod_prio_id` int DEFAULT NULL,
  `titulo` varchar(250) COLLATE utf8mb4_unicode_ci NOT NULL,
  `descripcion` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `fecha_asignada` datetime DEFAULT NULL,
  `ticket_estre` int DEFAULT NULL,
  `comentarios` varchar(300) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fecha_cierra` datetime DEFAULT NULL,
  `fecha_creacion` datetime DEFAULT NULL,
  `estadod_id` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ticket_detalle`
--

DROP TABLE IF EXISTS `ticket_detalle`;
CREATE TABLE IF NOT EXISTS `ticket_detalle` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ticket_id` int NOT NULL,
  `user_id` int NOT NULL,
  `descripcion` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `fecha_creacion` datetime NOT NULL,
  `estadod_id` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ticket_documentos`
--

DROP TABLE IF EXISTS `ticket_documentos`;
CREATE TABLE IF NOT EXISTS `ticket_documentos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ticket_id` int NOT NULL,
  `ticket_detalle_id` int NOT NULL,
  `url_documento` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `fecha_creacion` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ticket_historial_soporte`
--

DROP TABLE IF EXISTS `ticket_historial_soporte`;
CREATE TABLE IF NOT EXISTS `ticket_historial_soporte` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_asignado_id` int NOT NULL,
  `razon` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `fecha_creacion` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_type_id` int NOT NULL,
  `names` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '1',
  `username` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `profile` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `user_type_id`, `names`, `email`, `password`, `status`, `username`, `profile`) VALUES
(1, 3, 'Elar', 'elar@elar.com', '$2y$10$v6ANqw2ZUyUrv7SUKMuVluReGRGM9Ph4pMLjG.Uu3sLBnC8C/OtHK', '1', '', ''),
(2, 2, 'Admin', 'biblioteca@correo.com', '$2y$10$G8VIRtoMO6af56S3p1TBJOog1Q/RK.GV48GxLekk9xs1CphMzkafy', '1', '', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_actions`
--

DROP TABLE IF EXISTS `user_actions`;
CREATE TABLE IF NOT EXISTS `user_actions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `user_actions`
--

INSERT INTO `user_actions` (`id`, `name`) VALUES
(1, 'login'),
(2, 'logout'),
(3, 'main'),
(4, 'user'),
(5, 'usertype'),
(6, 'useraction'),
(16, 'ticket'),
(11, 'inicio');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_permissions`
--

DROP TABLE IF EXISTS `user_permissions`;
CREATE TABLE IF NOT EXISTS `user_permissions` (
  `user_type_id` int NOT NULL,
  `action_id` int NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `user_permissions`
--

INSERT INTO `user_permissions` (`user_type_id`, `action_id`) VALUES
(3, 16),
(2, 2),
(2, 3),
(3, 2),
(3, 3),
(3, 4),
(3, 5),
(3, 6),
(3, 11);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_types`
--

DROP TABLE IF EXISTS `user_types`;
CREATE TABLE IF NOT EXISTS `user_types` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `user_types`
--

INSERT INTO `user_types` (`id`, `name`) VALUES
(1, 'Invitado'),
(2, 'Usuario'),
(3, 'Administrador');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
