import { Box, Button, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const SelectTablePage = () => {
    const navigate = useNavigate();

  return (
    <div>
      <Flex minH="100vh" align="center" justify="center" bg="gray.50">
        <Box bg="white" p={8} rounded="md" shadow="md" maxW="400px" w="full">
          <Text mb={4}>テーブルを選択してください</Text>
          <SimpleGrid columns={4} spacing={4}>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((table) => (
              <Button
                key={table}
                onClick={() => navigate(`/?table=${table}`)}
                size="lg"
              >
                {table}
              </Button>
            ))}
          </SimpleGrid>
        </Box>
      </Flex>
    </div>
  );
};

export default SelectTablePage;
