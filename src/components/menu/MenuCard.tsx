import {
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  Image,
  Text,
} from "@chakra-ui/react";
import type { MenuType } from "../../types/menu";

const MenuCard = ({ menu }: { menu: MenuType }) => {
  return (
    <>
      <Card width="250px">
        <CardBody>
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
            <Button size="sm">+</Button>
            <Text as="span" mx={2}>
              0
            </Text>
            <Button size="sm">-</Button>
          </Box>
        </CardBody>
      </Card>
      {/* <Card w="250px">
        <CardBody>
          <Flex>
            {menu.image_url && (
              <Image
                src={menu.image_url}
                alt="サンプル画像"
                boxSize="150px"
                objectFit="cover"
                borderRadius="md"
              />
            )}
            <Box>
              <Text>{menu.name}</Text>
              <Text>{menu.price}</Text>
              <Flex align="center" gap={2}>
                <Button size="sm">+</Button>
                <Text minW="24px" textAlign="center">
                  0
                </Text>
                <Button size="sm">-</Button>
              </Flex>
            </Box>
          </Flex>
          <Text>{menu.description}</Text>
        </CardBody>
      </Card> */}
    </>
  );
};

export default MenuCard;
