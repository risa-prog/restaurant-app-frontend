import { useEffect, useState } from "react";

import { getMenus } from "../../api/menu";
import type { MenuType } from "../../types/menu";
import CustomerHeader from "../../layouts/header/CustomerHeader";
import MenuCard from "../../components/menu/MenuCard";
import {
  Box,
  Heading,
  SimpleGrid,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useCartContext } from "../../context/CartContext";
import type { CartItemsType } from "../../types/cartItem";

const HomePage = () => {
  const [menus, setMenus] = useState<Array<MenuType>>([]);
  const { cartItems, setCartItems } = useCartContext();

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const fetchMenus = async () => {
      const menuItems: Array<MenuType> = await getMenus();
      setMenus(menuItems);

      const initialCartItems = menuItems.reduce((acc, menu) => {
        acc[menu.id] = { quantity: 0 };
        return acc;
      }, {} as CartItemsType);

      setCartItems(initialCartItems);
    };

    fetchMenus();
  }, []);

  return (
    <>
      <CustomerHeader onOpenCart={onOpen}></CustomerHeader>
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
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>カート</ModalHeader>
          <ModalCloseButton />
          <ModalBody></ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              注文する
            </Button>
            <Button variant="ghost" onClick={onClose}>
              閉じる
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default HomePage;
