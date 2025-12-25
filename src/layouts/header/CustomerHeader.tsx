import { Box, Button, Flex } from "@chakra-ui/react";

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
      {onOpenCart && (
        <Button onClick={onOpenCart}>カート</Button>
      )}
    </Flex>
  );
};

export default CustomerHeader;
