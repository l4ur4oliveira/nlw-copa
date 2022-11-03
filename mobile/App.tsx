import { StatusBar } from 'expo-status-bar';

import { NativeBaseProvider, Center, Text } from 'native-base';

export default function App() {
  return (
    <NativeBaseProvider>
      <Center flex={1} bgColor="green.300">
        <Text color="black" fontSize={24}>Iiiiirra</Text>
        <StatusBar style="auto" />
      </Center>
    </NativeBaseProvider>
  );
}
