import { useEffect, useState } from "react";

import { getMenus } from "../../api/menu";
import type { MenuType } from "../../types/menu";
import CustomerHeader from "../../layouts/header/CustomerHeader";
import MenuCard from "../../components/menu/MenuCard";
import {
  Box,
  Heading,
  Wrap,
  Text,
  Container,
  SimpleGrid,
} from "@chakra-ui/react";

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
    <>
      <CustomerHeader></CustomerHeader>
      <Box maxW="1400px" mx="auto" px={{ base: 4, md: 6 }} py={6}>
        <Heading mb={4}>メニュー一覧</Heading>
        <SimpleGrid
          columns={{ base: 1, sm: 2, md: 3, lg: 4 }}
          spacing={4}
          justifyItems="center"
        >
          {menus
            .filter((menu) => menu.is_active)
            .map((menu) => (
              <MenuCard key={menu.id} menu={menu} />
            ))}
        </SimpleGrid>
      </Box>
    </>
  );
};

export default HomePage;
