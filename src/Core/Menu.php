<?php

namespace Instagram\Core;

use Instagram\Models\GeneralModel;

class Menu
{
  private $menus;

  static public function generate($userTypeId)
  {
    $menu = new Menu();
    return $menu->createMenu($userTypeId);
  }

  public function createMenu($userTypeId)
  {
    $html = "";
    $this->menus = GeneralModel::menu($userTypeId);

    if (!empty($this->menus)) {
      foreach ($this->menus as $menu) {
        if ($menu["father_id"] === 0) {
          $html .= "            
            <li class='nav-item'>
              <a class='nav-link menu-link collapsed' 
                href='#sidebar_$menu[menu_id]'
                data-bs-toggle='collapse'
                role='button'
                aria-expanded='false'
                aria-controls='sidebar_$menu[menu_id]'
              >
                <i class='ri-dashboard-2-line'></i> <span data-key='t-tickets'>$menu[title]</span>
              </a>
              <div class='collapse menu-dropdown' id='sidebar_$menu[menu_id]'>
                <ul class='nav nav-sm flex-column'>
          ";
          $html .= $this->createSubMenu($menu["menu_id"]);
          $html .= "
                </ul>
              </div>
            </li>
          ";
        }
      }
    }

    return $html;
  }

  private function createSubMenu($idPadre)
  {
    $contenido = "";
    $urlBase = URL;

    foreach ($this->menus as $menu) {
      if ($menu["father_id"] === $idPadre) {
        $contenido .= "
          <li class='nav-item'>
            <a onclick=\"setConfig('$menu[controller]', '$menu[view]')\"
              href='$urlBase/$menu[controller]/$menu[view]'
              class='nav-link $menu[controller]_$menu[view]'
              data-key='t-$menu[controller]-$menu[view]'
            >
              $menu[title]
            </a>
          </li>
        ";
      }
    }

    return $contenido;
  }
}
