import { Box, HStack, IconButton, Stack, Text, useBoolean, useDisclosure } from "@chakra-ui/react";
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";
import { nanoid } from 'nanoid';
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import ModalContainer from "./Modal";
import { Task, TaskType, Todo } from "../context";
type TListProps = {
  tasks : Task[];
  setData : Dispatch<SetStateAction<Task[]>>;
  type : TaskType;
}

function List ({tasks, setData, type}: TListProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [isEditMode, setEditMode] = useBoolean();
  const [isEditTitle, setIsEditTitle] = useBoolean();
  const [isCreateTodo, setIsCreateTodo] = useBoolean();
  const [isUpdateTodos, setIsUpdateTodos] = useBoolean();
  const [isEditDescription, setIsEditDescription] = useBoolean();

  const [taskID, setTaskID] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [todoContent, setTodoContent] = useState('');

  const [todos, setTodos] = useState<Todo[]>([]);

  function onCreateTodo () {
    setTodos((prev) => {
      const updatedTodos = [{ id: nanoid(), isDone: false, content: todoContent }, ...prev];
      onUpdate(taskID, updatedTodos);
      return updatedTodos;
    });
    setIsCreateTodo.off();
    setIsUpdateTodos.off();
  }

    const onDelete = useCallback((task: Task) => {
      const i = tasks.findIndex((item) => item.id === task.id);
      setData([...tasks.slice(0, i), ...tasks.slice(i + 1)]);
    }, []);

  const onUpdate = useCallback(
    (id: string, todos?: Todo[]) => {
      const i = tasks.findIndex((item) => item.id === id);
      
      const updatedTask = {
        id,
        title,
        description,
        // TODO: drag drop 으로 타입 변경
        type,
        todos,
      }
  
      if(updatedTask.id) {
        setData([...tasks.slice(0, i), updatedTask, ...tasks.slice(i + 1)]);
      }

    },[description, setData, tasks, title, type]);

  const onUpdateDescription = useCallback(
    (id: string) => {
      const i = tasks.findIndex((item) => item.id === id);
  
      const updatedTask = {
        id,
        title,
        description,
        // TODO: drag drop 으로 타입 변경
        type,
        todos,
      }
  
      if(updatedTask.id) {
        setData([...tasks.slice(0, i), updatedTask, ...tasks.slice(i + 1)]);
      }
    },[description, setData, tasks, title, type]
  )

  function onCreate (id : string) {
    setTaskID(id);
    setData([{ id, title, description, type }, ...tasks]);
  }

  useEffect(() => {
    if(isEditMode && !isOpen) {
      setTitle('');
      setDescription('');
      setTaskID('');
      setTodos([]);
      setIsEditTitle.off();
      setIsEditDescription.off();
    }

    if(!isEditMode && isOpen) {
      setTitle('');
      setDescription('');
      setTaskID('');
    }
  }, [isEditMode, isOpen, onUpdate, taskID])

  return (
    <>
      <ModalContainer
        isOpen={isOpen}
        onClose={onClose}
        isEditTitle={isEditTitle}
        onUpdate={onUpdate}
        setIsEditTitle={setIsEditTitle}
        setTitle={setTitle}
        taskID={taskID}
        onCreateTodo={onCreateTodo}
        onUpdateDescription={onUpdateDescription}
        todos={todos}
        isCreateTodo={isCreateTodo}
        setIsCreateTodo={setIsCreateTodo}
        isUpdateTodos={isUpdateTodos}
        setIsUpdateTodos={setIsUpdateTodos}
        setTodoContent={setTodoContent}
        isEditMode={isEditMode}
        title={title}
        description={description}
        setDescription={setDescription}
        isEditDescription={isEditDescription}
        setIsEditDescription={setIsEditDescription}
      />
      <Stack
        flex={1}
        backgroundColor="yellow.200"
        borderRadius={6}
        spacing={5}
        p={4}
        >
        <HStack
          spacing="auto"
        >
          <Text fontWeight={700} fontSize={20} pb={2}>
            {type.toUpperCase()}
          </Text>
          <IconButton
            width="10%"
            colorScheme='yellow'
            aria-label="Add database"
            icon={<AddIcon/>}
            onClick={() => {
              setIsEditTitle.on();
              setEditMode.off();
              const id = nanoid();
              onCreate(id);
              setTimeout(() => {
                setEditMode.on();
                setTaskID(id);
                onOpen();
              }, 100)
            }}
          />
        </HStack>
        {tasks
          .filter((task) => task.type === type)
          .map((task) => (
          <Box
            key={task.id}
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            backgroundColor="yellow.300"
            padding={5}
            mb={5}
            borderRadius={10}
            onClick={() => {
              setEditMode.on();
              if(task.title.length === 0) setIsEditTitle.on();
              setTitle(task.title);
              setDescription(task.description);
              setTaskID(task.id);
              setTodos([...task.todos ?? []]);
              onOpen();
            }}
          >
            <Box display="flex" flexDirection="column">
              <Text fontSize={22} fontWeight={600}>
                {task.title}
              </Text>
              <Text>
                {task.description}
              </Text>
            </Box>
            <DeleteIcon
              onClick={(e) => {
                e.stopPropagation();
                onDelete(task);
              }}
            />
          </Box>
        ))}
      </Stack>
    </>
  )
}

export default List;