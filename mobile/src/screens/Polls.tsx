import { useCallback, useState } from 'react';
import { Icon, useToast, VStack, FlatList } from 'native-base';
import { Octicons } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import { api } from '../services/api';

import { Button } from '../components/Button';
import { EmptyPollList } from '../components/EmptyPollList';
import { Header } from '../components/Header';
import { Loading } from '../components/Loading';
import { PollCard, PollCardProps } from '../components/PollCard';

export function Polls() {
  const [isLoading, setIsLoading] = useState(true);
  const [polls, setPolls] = useState<PollCardProps[]>([]);

  const { navigate } = useNavigation();
  const toast = useToast();

  async function fetchPolls() {
    try {
      setIsLoading(true);
      
      const response = await api.get('/polls');
      setPolls(response.data.polls);
      
      
    } catch (error) {
      console.log(error);
      
      toast.show({
        title: 'Não foi possível carregar os bolões.',
        placement: 'top',
        bgColor: 'red.500'
      });
    } finally {
      setIsLoading(false);
    }
  }

  useFocusEffect(useCallback(() => {
    fetchPolls();
  }, []));

  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="Meus bolões" />

      <VStack mt={6} mx={5} alignItems="center" borderBottomWidth={1} borderColor="gray.600" pb={4} mb={4}>
        <Button
          title="Buscar bolão por código"
          leftIcon={<Icon as={Octicons} name="search" color="black" size="md" />}
          onPress={() => navigate('find')}
        />
      </VStack>

      {
        isLoading ? <Loading /> :
          <FlatList
            data={polls}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <PollCard
                data={item}
                onPress={() => navigate('details', { id: item.id })}
              />
            )}
            px={5}
            showsVerticalScrollIndicator={false}
            _contentContainerStyle={{ pb: 10 }}
            ListEmptyComponent={() => <EmptyPollList />}
          />
      }
    </VStack>
  )
}
