import { useEffect, useState } from "react";

import { getMenus } from "../../api/menu";
import type { MenuType } from "../../types/menu";
import CustomerHeader from "../../layouts/header/CustomerHeader";

const HomePage = () => {
  const [menus, setMenus] = useState<Array<MenuType>>([]);
  useEffect(() => {
    const fetchMenus = async () => {
      const menuItems = await getMenus();
      setMenus(menuItems);
    };

    fetchMenus();
  }, []);

  return (
    <div>
      <CustomerHeader></CustomerHeader>
      {menus.length > 0 ? (
        menus
          .filter((menu) => menu.is_active)
          .map((menu) => (
            <div key={menu.id}>
              <p>{menu.name}</p>
              <p>{menu.description}</p>
              <p>{menu.price}</p>
            </div>
          ))
      ) : (
        <p>メニューがありません</p>
      )}
    </div>
  );
};

export default HomePage;
