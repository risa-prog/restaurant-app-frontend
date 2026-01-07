import { Box, Button, Card, CardBody, Image, Text } from "@chakra-ui/react";
import type { MenuType } from "../../types/menu";
import { useCartContext } from "../../context/CartContext";

const MenuCard = ({ menu }: { menu: MenuType }) => {
  const { cartItems, setCartItems } = useCartContext();

  const addCartItemQty = (menuId: number) => {
    setCartItems((prev) => ({
      ...prev,
      [menuId]: { quantity: prev[menu.id].quantity + 1 },
    }));
  };

  const removeCartItemQty = (menuId: number) => {
    setCartItems((prev) => { 
      const currentQty = prev[menuId].quantity;
      if (currentQty < 1) return prev;

      return {
        ...prev,
        [menuId]: { quantity: prev[menu.id].quantity - 1 },
      };
    });
  };

  return (
    <>
      <Card width="250px">
        <CardBody>
          {/* <Image
            src="https://picsum.photos/200/200"
            alt={menu.name}
            h="140px"
            w="100%"
            objectFit="cover"
            mb={2}
            borderRadius="md"
          /> */}

          {menu.image_url && (
            <Image
              src={menu.image_url}
              alt={menu.name}
              h="140px"
              w="100%"
              objectFit="cover"
              mb={2}
              borderRadius="md"
            />
          )}

          <Text fontWeight="bold">{menu.name}</Text>
          <Text>¥{menu.price}</Text>

          <Box mt={2}>
            <Button
              size="sm"
              onClick={() => {
                addCartItemQty(menu.id);
              }}
            >
              +
            </Button>
            <Text as="span" mx={2}>
              {cartItems[menu.id].quantity}
            </Text>
            <Button
              size="sm"
              onClick={() => {
                removeCartItemQty(menu.id);
              }}
            >
              -
            </Button>
          </Box>
        </CardBody>
      </Card>
    </>
  );
};

export default MenuCard;
