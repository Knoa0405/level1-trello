import { Box } from '@chakra-ui/react'
import type { NextPage } from 'next'
import { useEffect, useState } from 'react';
import List from '../src/components/List';
import useSWR from 'swr';

export type TaskType = 'todo' | 'in-progress' | 'done';

export type Task = {
  id: string;
  type: TaskType;
  title: string;
  description: string;
}

const fetcher = (url: string) => fetch(url).then(res => res.json());

const Home: NextPage = () => {
  const { data, error } = useSWR<{ tasks: Task[] }, any>(
    '/api/tasks', 
    fetcher
  );

  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    setTasks([...data?.tasks ?? []])
  }, [data]);

  if(error) {
    return <>Error!!</>;
  }

  if(!data) {
    return <div>Loading...</div>
  }

  return (
    <Box>
      <Box padding={5}>
        <Box display="flex" justifyContent="space-around">
          <List tasks={tasks} setData={setTasks} type="todo"/>
          <List tasks={tasks} setData={setTasks} type="in-progress"/>
          <List tasks={tasks} setData={setTasks} type="done"/>
        </Box>
      </Box>
    </Box>
  )
}

export default Home
