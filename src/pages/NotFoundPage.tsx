import { Box, Text } from '@chakra-ui/react';

const NotFoundPage = () => {
  return (
    <div>
      <Box textAlign="center" mt={20}>
        <Text fontSize="2xl" fontWeight="bold">
          404 - ページが見つかりません
        </Text>
      </Box>
    </div>
  );
}

export default NotFoundPage
