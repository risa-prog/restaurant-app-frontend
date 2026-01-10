import { Box, Button, Flex } from "@chakra-ui/react";
import { FiShoppingCart } from "react-icons/fi";


interface CustomerHeaderProps { 
  onOpenCart?: () => void;
}

const CustomerHeader = ({onOpenCart }: CustomerHeaderProps) => {
  return (
    <Flex
      bg="blue.400"
      color="white"
      h="64px"
      p={4}
      justify="space-between"
      align="center"
    >
      <Box fontWeight="bold" fontSize="xl">
        美食亭
      </Box>
      <Button
        leftIcon={<FiShoppingCart />}
        variant="ghost"
        color="white" 
        _hover={{ bg: "blue.500" }} 
        onClick={onOpenCart}
        size="lg"
      >
        カート
      </Button>
    </Flex>
  );
};

export default CustomerHeader;
