import { HStack, useDisclosure } from '@chakra-ui/react'
import type { NextPage } from 'next'
import { useEffect, useState } from 'react';
import List from '../src/components/List';
import useSWR from 'swr';

export type TaskType = 'todo' | 'in-progress' | 'done';

export type Todo = {
  id: string;
  isDone: boolean;
  content: string;
}

export type Task = {
  id: string;
  type: TaskType;
  title: string;
  description: string;
  todos?: Todo[];
}

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
  // TODO - 삭제 버튼은 X Icon 로 변경
  // TODO - 맨 위로 추가 되도록 구현
  // TODO - 위, 아래 버튼 추가
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
