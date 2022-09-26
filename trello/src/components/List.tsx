import { Box, Button, Text } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";
import { Task, TaskType } from "../../pages";
import { nanoid } from 'nanoid';

type TListProps = {
  tasks : Task[];
  setData : Dispatch<SetStateAction<Task[]>>;
  type : TaskType; 
}

function List ({tasks, setData, type}: TListProps) {

  function onDelete (task: Task) {
    const i = tasks.findIndex((item) => item.id === task.id);
    setData([...tasks.slice(0, i), ...tasks.slice(i + 1)]);
  }

  return (
    <Box 
      display="flex" 
      flexDirection="column"
      backgroundColor="yellow.200"
      width="30%"
      height="100%"
      borderRadius={10}
      p={5}
      >
      <Text fontWeight={700} fontSize={20} pb={2}>
        {type.toUpperCase()}
      </Text>
      {tasks
        .filter((task) => task.type === type)
        .map((task) => (
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          backgroundColor="yellow.300"
          height={150}
          padding={5}
          mb={5}
          borderRadius={10}
          key={task.id}
        >
          <Box display="flex" flexDirection="column">
            <Text fontWeight={600}>
              {task.title}
            </Text>
            <Text>
              {task.description}
            </Text>
          </Box>
          <Button
              alignSelf="flex-end"
              onClick={() => onDelete(task)}
            >
            삭제하기
          </Button>
        </Box>
      ))}
      <Button
        onClick={() => setData([...tasks, { id: nanoid(), title: '타이틀', description : '내용' , type }])}
      >추가하기</Button>
    </Box>
  )
}

export default List;