import { Box, Button, Heading, Text } from "@chakra-ui/react";
import { Task } from "../../pages";

export default function ThreeImages ({task, onDelete } : { task: Task, onDelete: () => void }) {
  return (
    <Box flex='1' textAlign='left' flexDirection="column" shadow="md" _hover={{ scale : 2 }}>
      <Heading>{task.title}</Heading>
      <Text>{task.description}</Text>
      <Button onClick={onDelete}>삭제하기</Button>
    </Box>
  )
}