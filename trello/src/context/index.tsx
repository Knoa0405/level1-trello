import { createContext, useCallback, useState } from "react";


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

// type ContextValues = {
//   tasks : Task[];
  
// }

// export const useTasks = useCallback(() => {
//   const [tasks, setTasks] = useState<Task[]>([]);

//   const deleteTask = useCallback((task: Task) => {
//     const i = tasks.findIndex((item) => item.id === task.id);
//     setTasks([...tasks.slice(0, i), ...tasks.slice(i + 1)]);
//   }, []);

//   return {
//     tasks,
//     deleteTask,
//   }
// },[]);

// export const TasksContext = createContext<ContextValues>({
//   tasks: [],
// });