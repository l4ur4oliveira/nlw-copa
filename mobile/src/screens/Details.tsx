import { useState, useEffect } from 'react';
import { Share } from 'react-native';
import { HStack, useToast, VStack } from 'native-base';
import { useRoute } from '@react-navigation/native';

import { api } from '../services/api';

import { EmptyMyPollList } from '../components/EmptyMyPollList';
import { Header } from '../components/Header';
import { Loading } from '../components/Loading';
import { PollCardProps } from '../components/PollCard';
import { PollHeader } from '../components/PollHeader';
import { Option } from '../components/Option';

interface RouteParams {
  id: string;
}

export function Details() {
  const [isLoading, setIsLoading] = useState(false);
  const [pollDetails, setPollDetails] = useState<PollCardProps>({} as PollCardProps);
  const [optionSelected, setOptionSelected] = useState<'guesses' | 'ranking'>('guesses');

  const route = useRoute();
  const toast = useToast();

  const { id } = route.params as RouteParams;

  async function fetchPolldetails() {
    try {
      setIsLoading(true);

      const response = await api.get(`/polls/${id}`);
      setPollDetails(response.data.poll);
      
      
    } catch (error) {
      console.log(error);
      
      toast.show({
        title: 'Não foi possível carregar os detalhes do bolão.',
        placement: 'top',
        bgColor: 'red.500'
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleCodeShare() {
    await Share.share({
      message: pollDetails.code
    });
  }

  useEffect(() => {
    fetchPolldetails();
  }, [id]);

  if(isLoading) {
    return (
      <Loading />
    )
  }

  return (
    <VStack flex={1} bgColor="gray.900">
      <Header
        title={pollDetails.title}
        showBackButton
        showShareButton
        onShare={handleCodeShare}
      />

      {
        pollDetails._count?.participants > 0 ?
        <VStack px={5} flex={1}>
          <PollHeader data={pollDetails} />

          <HStack bgColor="gray.800" p={1} rounded="sm" mb={5}>
            <Option
              title="Seus palpites"
              isSelected={optionSelected === 'guesses'}
              onPress={() => setOptionSelected('guesses')}
              />
            <Option
              title="Ranking do grupo"
              isSelected={optionSelected === 'ranking'}
              onPress={() => setOptionSelected('ranking')}
            />
          </HStack>
        </VStack>

        : <EmptyMyPollList
            code={pollDetails.code}
            onShare={handleCodeShare}
          />
      }

    </VStack>
  )
}
