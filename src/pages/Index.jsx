import { useState } from "react";
import { Box, Input, Button, List, ListItem, IconButton, Checkbox, Text } from "@chakra-ui/react";
import { FaPlus, FaTrash } from "react-icons/fa";

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  const handleAddTask = () => {
    if (input.trim() !== "") {
      const newTask = {
        id: Date.now(),
        text: input,
        isCompleted: false,
      };
      setTasks([...tasks, newTask]);
      setInput("");
    }
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleToggleComplete = (id) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          return { ...task, isCompleted: !task.isCompleted };
        }
        return task;
      }),
    );
  };

  return (
    <Box p={5}>
      <Box mb={4}>
        <Input placeholder="Add a new task..." value={input} onChange={(e) => setInput(e.target.value)} mr={2} />
        <Button onClick={handleAddTask} leftIcon={<FaPlus />} colorScheme="red">
          Add Task
        </Button>
      </Box>
      <List spacing={3}>
        {tasks.map((task) => (
          <ListItem key={task.id} display="flex" alignItems="center">
            <Checkbox isChecked={task.isCompleted} onChange={() => handleToggleComplete(task.id)} mr={2} />
            <Text as={task.isCompleted ? "del" : undefined} flex="1">
              {task.text}
            </Text>
            <IconButton aria-label="Delete task" icon={<FaTrash />} onClick={() => handleDeleteTask(task.id)} colorScheme="red" />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Index;
