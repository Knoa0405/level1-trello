import { HStack, useDisclosure } from '@chakra-ui/react'
import type { NextPage } from 'next'
import { useEffect, useState } from 'react';
import List from '../src/components/List';
import useSWR from 'swr';
import { Task } from '../src/context';

const fetcher = (url: string) => fetch(url).then(res => res.json());

const Home: NextPage = () => {
  const { data, error } = useSWR<{ tasks: Task[] }, any>(
    '/api/tasks', 
    fetcher
  );

  const [tasks, setTasks] = useState<Task[]>([]);

  if(error) {
    return <>Error!!</>;
  }

  if(!data) {
    return <div>Loading...</div>
  }
  
  return (
    <>
      <HStack alignItems="flex-start" p={4} >
        <List tasks={tasks} setData={setTasks} type="todo"/>
        <List tasks={tasks} setData={setTasks} type="in-progress"/>
        <List tasks={tasks} setData={setTasks} type="done"/>
      </HStack>
    </>
  )
}

export default Home
