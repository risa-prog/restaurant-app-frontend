import { Box, Flex, Text } from "@chakra-ui/react";
import CustomerHeader from "../../layouts/header/CustomerHeader";

const OrderCompletePage = () => {
  return (
    <>
      {/* <CustomerHeader></CustomerHeader> */}
      <Flex minH="calc(100vh - 64px)" align="center" justify="center">
        <Box>
          <Text fontSize="xl" fontWeight="bold">
            ご注文ありがとうございました！
          </Text>
        </Box>
      </Flex>
    </>
  );
};

export default OrderCompletePage;
