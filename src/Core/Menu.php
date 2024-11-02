<?php

namespace Instagram\Core;

use Instagram\Models\GeneralModel;

class Menu
{
  private $menus;

  static public function generate($userTypeId)
  {
    $menu = new Menu();
    return $menu->create($userTypeId);
  }

  public function create($userTypeId)
  {
    $html = "";
    $this->menus = GeneralModel::menu($userTypeId);

    if (!empty($this->menus)) {
      foreach ($this->menus as $menu) {
        if ($menu["father_id"] === 0) {
          $html .= "
          <div class='menu-item menu-lg-down-accordion me-0 me-lg-2'
            data-kt-menu-trigger=\"{default: 'click', lg: 'hover'}\"
            data-kt-menu-placement='bottom-start'
            data-kt-menu-offset='-200,0'
          >
            <span class='menu-link'>
              <span class='menu-title'>$menu[title]</span>
              <span class='menu-arrow d-lg-none'></span>
            </span>
            <div class='menu-sub menu-sub-lg-down-accordion menu-sub-lg-dropdown p-0'>
              <div class='menu-active-bg px-4 px-lg-0'>
                <div class='d-flex w-100 overflow-auto'>
                  <ul class='nav nav-stretch nav-line-tabs fw-bold fs-6 p-0 p-lg-10 flex-nowrap flex-grow-1'>
          ";

          $html .= $this->crearMenus($menu["menu_id"]);

          $html .= "
                  </ul>
                </div>
                <div class='tab-content py-4 py-lg-8 px-lg-7'>
          ";

          $html .= $this->crearMenusTabs($menu["menu_id"]);

          $html .= "
                </div>
              </div>
            </div>
          </div>
          ";
        }
      }
    }

    return $html;
  }

  private function crearMenus($idPadre)
  {
    $html = "";
    $active = true;

    foreach ($this->menus as $menu) {
      if ($menu["father_id"] === $idPadre) {
        $isActive = $active ? "active" : "";
        $html .= "
          <li class='nav-item mx-lg-1'>
            <a class='nav-link py-3 py-lg-6 text-active-primary $isActive'
              href='#'
              data-bs-toggle='tab'
              data-bs-target='#$menu[menu_id]'
            >
              $menu[title]
            </a>
          </li>
        ";
        $active = false;
      }
    }

    return $html;
  }

  private function crearMenusTabs($idPadre)
  {
    $contenido = "";
    $active = true;

    foreach ($this->menus as $menu) {
      if ($menu["father_id"] === $idPadre) {
        $isActive = $active ? "active" : "";
        $contenido .= "
          <div class='tab-pane w-lg-1000px $isActive' id='$menu[menu_id]'>
              <div class='row'>
                  " . $this->crearSubMenus($menu["menu_id"]) . "
              </div>
          </div>
        ";
        $active = false;
      }
    }

    return $contenido;
  }

  private function crearSubMenus($idPadre)
  {
    $contenido = "";

    foreach ($this->menus as $menu) {
      if ($menu["father_id"] === $idPadre) {
        $contenido .= "
          <div class='col-lg-3 mb-6 mb-lg-0'>
            <div class='mb-6'>
              <h4 class='fs-6 fs-lg-4 fw-bold mb-3 ms-4'>$menu[title]</h4>
        ";

        $contenido .= $this->crearSubMenusOpciones($menu["menu_id"]);

        $contenido .= "
            </div>
          </div>
        ";
      }
    }

    return $contenido;
  }

  private function crearSubMenusOpciones($idPadre)
  {
    $contenido = "";
    $urlBase = URL;

    foreach ($this->menus as $menu) {
      if ($menu["father_id"] === $idPadre) {
        $contenido .= "
          <div class='menu-item p-0 m-0'>
            <a onclick=\"setConfig('$menu[controller]', '$menu[view]')\"
              href='$urlBase/$menu[controller]/$menu[view]'
              class='menu-link $menu[controller]_$menu[view]'
            >
              <span class='menu-title'>$menu[title]</span>
            </a>
          </div>
        ";
      }
    }

    return $contenido;
  }
}
