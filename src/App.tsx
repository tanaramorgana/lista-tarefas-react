import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { SectionTask } from "./components/Section";
import CssBaseline from "@mui/material/CssBaseline";
import { Box, Button, TextField, ThemeProvider } from "@mui/material";
import { LightTheme } from "./shared/themes/Light";

function App() {
  interface Task {
    id: number;
    title: string;
    status: boolean;
    date: number;
  }

  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<"all" | "completed" | "uncompleted">(
    "all"
  );
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [statusOrder, setStatusOrder] = useState<"asc" | "desc">("asc");
  const [alphabetOrder, setAlphabetOrder] = useState<"asc" | "desc">("asc");
  const [dateOrder, setDateOrder] = useState<"asc" | "desc">("asc");

  function onClickClear() {
    if (titleRef.current) {
      titleRef.current.value = "";
    }
  }

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");

    if (savedTasks) {
      const parsedTasks = JSON.parse(savedTasks);
      setTasks(parsedTasks);
    }
  }, []);

  const titleRef = useRef<HTMLInputElement>(null);

  const addTask = useCallback(() => {
    const newTask = {
      id: tasks.length + 1,
      title: titleRef.current?.value || "",
      status: false,
      date: Date.now(),
    };
    const newArrayTaks = [...tasks, newTask];
    localStorage.setItem("tasks", JSON.stringify(newArrayTaks));
    setTasks(newArrayTaks);
    onClickClear();
  }, [tasks]);

  function toggleTask(id: number) {
    const tasksUpdated = tasks.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          status: !task.status,
        };
      }
      return task;
    });
    localStorage.setItem("tasks", JSON.stringify(tasksUpdated));

    setTasks(tasksUpdated);
  }

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      if (filter === "all") {
        return task;
      }
      return task.status == (filter === "completed" ? true : false);
    });
  }, [tasks, filter]);

  function sortByStatus() {
    const tasksOrderedByStatus = [...tasks].sort((a, b) => {
      if (statusOrder === "asc") {
        return a.status === b.status ? 0 : a.status ? -1 : 1;
      } else {
        return a.status === b.status ? 0 : a.status ? 1 : -1;
      }
    });

    localStorage.setItem("tasks", JSON.stringify(tasksOrderedByStatus));
    setTasks(tasksOrderedByStatus);
    setStatusOrder(statusOrder === "asc" ? "desc" : "asc");
  }

  function sortByAlphabet() {
    const tasksOrderedByAlphabet = [...tasks].sort((a, b) => {
      if (alphabetOrder === "asc") {
        return a.title.localeCompare(b.title);
      } else {
        return b.title.localeCompare(a.title);
      }
    });

    localStorage.setItem("tasks", JSON.stringify(tasksOrderedByAlphabet));
    setTasks(tasksOrderedByAlphabet);
    setAlphabetOrder(alphabetOrder === "asc" ? "desc" : "asc");
  }

  function sortByDate() {
    const tasksOrderedByDate = [...tasks].sort((a, b) => {
      if (dateOrder === "asc") {
        return a.date - b.date;
      } else {
        return b.date - a.date;
      }
    });

    localStorage.setItem("tasks", JSON.stringify(tasksOrderedByDate));
    setTasks(tasksOrderedByDate);
    setDateOrder(dateOrder === "asc" ? "desc" : "asc");
  }

  const showAll = () => {
    setFilter("all");
  };

  const showCompleted = () => {
    setFilter("completed");
  };

  const showUncompleted = () => {
    setFilter("uncompleted");
  };

  function deleteTask(id: number) {
    const updatedTasks = tasks.filter((task) => {
      return task.id !== id;
    });

    localStorage.setItem("tasks", JSON.stringify(updatedTasks));

    setTasks([...updatedTasks]);
  }

  function updateTaskTitle(id: number, newTitle: string) {
    setTasks((prevTasks) => {
      return prevTasks.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            title: newTitle,
          };
        }
        return task;
      });
    });
    setEditingTaskId(null);
  }

  return (
    <ThemeProvider theme={LightTheme}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "20px",
          height: "100vh",
          justifyContent: "center",
          bgColor: "#132043",
        }}
      >
        <CssBaseline />
        <Box display="flex" gap={1}>
          <TextField
            type="text"
            inputRef={titleRef}
            placeholder="Adicione uma tarefa"
          />
          <Button variant="contained" onClick={addTask}>
            Adicionar
          </Button>
        </Box>
        <Box display="flex" padding="20px" gap={1}>
          <Button variant="contained" onClick={showAll}>
            Todas
          </Button>
          <Button variant="contained" onClick={showCompleted}>
            Concluídas
          </Button>
          <Button variant="contained" onClick={showUncompleted}>
            Pendentes
          </Button>
        </Box>
        <Box display="flex" padding="20px" gap={1}>
          <Button variant="contained" onClick={sortByStatus}>
            Ordenar por status
          </Button>
          <Button variant="contained" onClick={sortByAlphabet}>
            Ordenar alfabeticamente
          </Button>
          <Button variant="contained" onClick={sortByDate}>
            Ordenar por data
          </Button>
        </Box>
        <Box display="flex" padding="20px" gap={2}>
          {filteredTasks.map((task) => {
            return (
              <SectionTask
                key={task.id}
                id={task.id}
                title={task.title}
                date={task.date}
                onClick={() => toggleTask(task.id)}
                handleDeleteTask={deleteTask}
                handleEditTask={updateTaskTitle}
              >
                {editingTaskId === task.id ? (
                  <input
                    type="text"
                    value={task.title}
                    onChange={(e) => updateTaskTitle(task.id, e.target.value)}
                    onBlur={() => setEditingTaskId(null)}
                    autoFocus
                  />
                ) : task.status ? (
                  <s>{task.title}</s>
                ) : (
                  task.title
                )}
              </SectionTask>
            );
          })}
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
