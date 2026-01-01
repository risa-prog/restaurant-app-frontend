import {
  Box,
  Button,
  Card,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { login } from "../../api/auth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const RegisterPage = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const { setIsLoggedIn } = useAuth();

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const loginResult = await login(email, password);
      localStorage.setItem("token", loginResult.token);
      setIsLoggedIn(true);
      toast.success(loginResult.message);
      navigate("/admin/orders");
    } catch (error: any) {
      if ("status" in error && error.status === 422) {
        const e = error as {
          errors: { email?: string[]; password?: string[] };
        };
        setEmailError(e.errors.email?.[0] || "");
        setPasswordError(e.errors.password?.[0] || "");
      }
      console.error(error);
      toast.error(error.message || "通信に失敗しました");
    }
  };
  return (
    <>
      <Flex minH="100vh" justify="center" align="center" bg="gray.50">
        <Card w="full" maxW="450px" p={8} bg="white" rounded="md" shadow="md">
          <Text fontWeight="bold" fontSize="2xl" mb={6}>
            新規登録
          </Text>
          <form onSubmit={handleLogin} noValidate>
            <Box>
              <FormControl isInvalid={!!emailError} mb={3}>
                <FormLabel>名前</FormLabel>
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <FormErrorMessage>{emailError}</FormErrorMessage>
              </FormControl>
            </Box>
            <Box>
              <FormControl isInvalid={!!emailError} mb={3}>
                <FormLabel>メールアドレス</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <FormErrorMessage>{emailError}</FormErrorMessage>
              </FormControl>
            </Box>
            <Box mt={2}>
              <FormControl isInvalid={!!passwordError} mb={3}>
                <FormLabel>パスワード</FormLabel>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <FormErrorMessage>{passwordError}</FormErrorMessage>
              </FormControl>
            </Box>
            <Box mt={2}>
              <FormControl isInvalid={!!passwordError} mb={3}>
                <FormLabel>確認用パスワード</FormLabel>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <FormErrorMessage>{passwordError}</FormErrorMessage>
              </FormControl>
            </Box>
            <Button
              type="submit"
              mt={6}
              w="full"
              rounded="md"
              colorScheme="blue"
            >
              ログイン
            </Button>
          </form>
        </Card>
      </Flex>
    </>
  );
};

export default RegisterPage;
