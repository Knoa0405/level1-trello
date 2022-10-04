import { AddIcon, CheckIcon, EditIcon } from "@chakra-ui/icons";
import { Box, Checkbox, CheckboxGroup, Heading, HStack, Input, InputGroup, InputRightElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Stack, Text, useBoolean, useDisclosure } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";
import { Todo } from "../context";

type TProps = {
  isOpen: boolean;
  onClose: () => void;
  isEditTitle: boolean;
  onUpdate: (id: string, todos?: Todo[]) => void;
  setIsEditTitle: { on: () => void; off: () => void; toggle: () => void; };
  setTitle: (title: string) => void;
  taskID: string;
  onCreateTodo: () => void;
  setIsUpdateTodos: { on: () => void; off: () => void; toggle: () => void; };
  onUpdateDescription : (id: string) => void;
  todos : Todo[];
  isCreateTodo : boolean;
  setIsCreateTodo : { on: () => void; off: () => void; toggle: () => void; };
  isUpdateTodos : boolean;
  setTodoContent: Dispatch<SetStateAction<string>>;
  title: string;
  description: string;
  setDescription: Dispatch<SetStateAction<string>>;
  isEditMode: boolean;
  isEditDescription: boolean;
  setIsEditDescription: { on: () => void; off: () => void; toggle: () => void; };
};

function ModalContainer ({
  isOpen,
  onClose,
  isEditTitle,
  onUpdate,
  setIsEditTitle,
  setTitle,
  taskID,
  onCreateTodo,
  onUpdateDescription,
  todos,
  isCreateTodo,
  setIsCreateTodo,
  isUpdateTodos,
  setIsUpdateTodos,
  setTodoContent,
  title,
  description,
  setDescription,
  isEditMode,
  isEditDescription,
  setIsEditDescription
}: TProps) {

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay/>
        <ModalContent pb={5}>
          <ModalHeader>
            {isEditTitle ? (
              <InputGroup
                width="80%"
              >
                <Input fontSize={24} fontWeight={700} onChange={(e) => setTitle(e.target.value)}/>
                <InputRightElement>
                  <CheckIcon
                    onClick={() => {
                      onUpdate(taskID, todos);
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
                          onUpdateDescription(taskID);
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
              <>
                {isCreateTodo ? (
                  <Box display="flex">
                    <Checkbox defaultChecked={false} paddingRight={2}/>
                    <Input
                      variant='unstyled'
                      fontSize={14}
                      onChange={(e) => setTodoContent(e.target.value)} onBlur={() => onCreateTodo()}
                    />
                  </Box>
                ) : (
                  <HStack
                    display="flex"
                    bg="gray.100"
                    marginTop={5}
                    padding={3}
                    borderRadius={4}
                    cursor="pointer"
                    _hover={{ background : 'gray.200'}}
                    onClick={() => {
                      setIsCreateTodo.on();
                    }}
                    >
                    <AddIcon/>
                    <Text fontWeight={700}>
                      ADD TODO
                    </Text>
                  </HStack>
                )}
              </>
            ) : (
              <Stack pt={3}>
                <CheckboxGroup>
                  {todos.map((todo) => {
                    return (
                      <Checkbox defaultChecked={todo.isDone} key={todo.id}>{todo.content}</Checkbox>
                    )
                  })}
                </CheckboxGroup>
                {
                  isUpdateTodos ? (
                    <Box display="flex">
                      <Checkbox defaultChecked={false} paddingRight={2}/>
                      <Input
                        variant='unstyled'
                        fontSize={14}
                        onChange={(e) => setTodoContent(e.target.value)} onBlur={() => onCreateTodo()}
                      />
                    </Box>
                  ) : (
                    <Stack
                    cursor="pointer"
                    _hover={{ background: 'gray.200' }} 
                    display="flex"
                    bg="gray.100" 
                    padding={2} 
                    borderRadius={4} 
                    alignItems="center"
                    onClick={() => setIsUpdateTodos.on()}
                  >
                  <AddIcon
                    fontSize={10} 
                    fontWeight={900}
                  />
                  </Stack>
                  )
                }
              </Stack>
            )}
          </ModalBody>
        </ModalContent>
    </Modal>
  </>
  )
}

export default ModalContainer;