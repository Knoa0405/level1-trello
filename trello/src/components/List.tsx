import { Box, Checkbox, CheckboxGroup, Heading, HStack, IconButton, Input, InputGroup, InputRightAddon, InputRightElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Stack, Text, useBoolean, useDisclosure } from "@chakra-ui/react";
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";
import { Task, TaskType, Todo } from "../../pages";
import { nanoid } from 'nanoid';
import { AddIcon, CheckIcon, EditIcon } from '@chakra-ui/icons';
type TListProps = {
  tasks : Task[];
  setData : Dispatch<SetStateAction<Task[]>>;
  type : TaskType;
}

function List ({tasks, setData, type}: TListProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [isEditMode, setEditMode] = useBoolean();
  const [isEditTitle, setIsEditTitle] = useBoolean();
  const [isEditDescription, setIsEditDescription] = useBoolean();
  const [isCreateTodo, setIsCreateTodo] = useBoolean();

  const [taskID, setTaskID] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [todoContent, setTodoContent] = useState('');

  const [todos, setTodos] = useState<Todo[]>([]);

  function onDelete (task: Task) {
    const i = tasks.findIndex((item) => item.id === task.id);
    setData([...tasks.slice(0, i), ...tasks.slice(i + 1)]);
  }

  function onCreateTodo () {
    setTodos([{ id: nanoid(), isDone: false, content: todoContent }, ...todos]);
    onUpdate(taskID, todos);
  }

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

  function onCreate () {
    const id = nanoid();
    setTaskID(id);
    setData([{ id, title, description, type }, ...tasks]);
  }

  useEffect(() => {
    if(isEditMode && !isOpen) {
      setTitle('');
      setDescription('');
      setTaskID('');
    }

    if(!isEditMode && isOpen) {
      setTitle('');
      setDescription('');
      setTaskID('');
      onUpdate(taskID);
    }
  }, [isEditMode, isOpen, onUpdate, setIsEditTitle, taskID])

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay/>
          <ModalContent>
            <ModalHeader>
              {isEditTitle ? (
                <InputGroup
                  width="80%"
                >
                  <Input fontSize={24} fontWeight={700} onChange={(e) => setTitle(e.target.value)}/>
                  <InputRightElement>
                    <CheckIcon
                      onClick={() => {
                        if(isEditMode) {
                          onUpdate(taskID);
                        }
                        setIsEditTitle.off();
                      }}
                    />
                  </InputRightElement>
                </InputGroup>
              ) : (
                <HStack
                  onClick={() => setIsEditTitle.on()}
                >
                  <Heading>
                    {title}
                  </Heading>
                  <EditIcon/>
                </HStack>
              )}
              <ModalCloseButton/>
            </ModalHeader>
            <ModalBody>
              <Box>
                {isEditDescription ? (
                  <InputGroup>
                    <Input onChange={(e) => setDescription(e.target.value)}/>
                    <InputRightElement>
                      <CheckIcon
                        onClick={() => {
                          if(isEditMode) {
                            onUpdate(taskID);
                          }
                          setIsEditDescription.off();
                        }}
                      />
                    </InputRightElement>
                  </InputGroup>
                ): (
                  <HStack
                    onClick={() => setIsEditDescription.on()}
                  >
                    <Text>
                      {description}
                    </Text>
                    <EditIcon/>
                  </HStack>
                )}
              </Box>
              {todos.length === 0 ? (
                <HStack
                  display="flex"
                  bg="gray.200"
                  marginTop={5}
                  padding={3}
                  onClick={() => {
                    setIsCreateTodo.on();
                  }}
                >
                 {isCreateTodo ? (
                  <Input onChange={(e) => setTodoContent(e.target.value)} onBlur={() => onCreateTodo()}/>
                 ) : (
                  <>
                    <AddIcon/>
                    <Text fontWeight={700}>
                      ADD TODO
                    </Text>
                  </>
                 )}
                </HStack>
              ) : (
                <CheckboxGroup>
                  {todos.map((todo) => {
                    return (
                      <Checkbox key={todo.id}>{todo.content}</Checkbox>
                    )
                  })}
                </CheckboxGroup>
              )}
            </ModalBody>
          </ModalContent>
      </Modal>
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
              onOpen();
              onCreate();
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
              setTitle(task.title);
              setDescription(task.description);
              setTaskID(task.id);
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
          </Box>
        ))}
      </Stack>
    </>
  )
}

export default List;