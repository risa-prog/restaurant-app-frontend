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
  Text,
  useDisclosure,
  Stack,
  Flex,
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
  const { cartItems, setCartItems, getTotalPrice } = useCartContext();

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

  const cartMenuItems = menus
    .filter((menu) => (cartItems[menu.id]?.quantity ?? 0) > 0)
    .map((menu) => ({
      ...menu,
      quantity: cartItems[menu.id]?.quantity ?? 0,
    }));
  
  const totalPrice = getTotalPrice(cartMenuItems);

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
          <ModalBody>
            {cartMenuItems.length === 0 ? (
              <Text textAlign="center" color="gray.500">
                カートは空です
              </Text>
            ) : (
              <Stack spacing={4}>
                {cartMenuItems.map((menu) => (
                  <Flex
                    key={menu.id}
                    justify="space-between"
                    align="center"
                    borderBottom="1px solid"
                    borderColor="gray.200"
                    pb={2}
                  >
                    <Box>
                      <Text fontWeight="bold">{menu.name}</Text>
                      <Text fontSize="sm" color="gray.600">
                        ¥{menu.price} × {menu.quantity}
                      </Text>
                    </Box>
                    <Text fontWeight="bold">¥{menu.price * menu.quantity}</Text>
                  </Flex>
                ))}

                <Flex justify="space-between" pt={2}>
                  <Text fontWeight="bold">合計</Text>
                  <Text fontWeight="bold" fontSize="lg">
                    ¥{totalPrice}
                  </Text>
                </Flex>
              </Stack>
            )}
          </ModalBody>

          <ModalFooter>
            {cartMenuItems.length > 0 && (
              <Button colorScheme="blue" mr={3}>
                注文する
              </Button>
            )}
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
