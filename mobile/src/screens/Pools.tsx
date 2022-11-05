import { Icon, VStack } from "native-base";

import { Octicons } from '@expo/vector-icons';

import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { Input } from "../components/Input";

export function Pools() {
  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="Meus bolões" />

      <VStack mt={6} mx={5} alignItems="center" borderBottomWidth={1} borderColor="gray.600" pb={4} mb={4}>
        <Button
          title="Buscar bolão por código"
          leftIcon={<Icon as={Octicons} name="search" color="black" size="md" />}
        />
      </VStack>
    </VStack>
  )
}
