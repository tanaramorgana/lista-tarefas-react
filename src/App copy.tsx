import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";
import { ButtonStyled } from "./components/Button";
import { SectionTask } from "./components/Section";

function App() {
  interface Task {
    id: number;
    title: string;
    status: boolean;
    date: number;
  }

  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentView, setCurrentView] = useState<string>("all");
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [sorted, setSorted] = useState(false);
  const [sortedTasks, setSortedTasks] = useState<Task[]>([]);

  // useEffect(() => {
  //   const firstTasks: Task[] = [
  //     { id: 1, title: "tarefa1", status: false },
  //     { id: 2, title: "tarefa2", status: true },
  //   ];
  //   setTasks(firstTasks);
  // }, []);

  useEffect(() => {
    if (sorted) {
      const sorted = [...tasks];
      sorted.sort((a, b) => a.date - b.date);
      setSortedTasks(sorted);
    }
  }, [sorted, tasks]);

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");

    if (savedTasks) {
      const parsedTasks = JSON.parse(savedTasks);
      setTasks(parsedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const titleRef = useRef<HTMLInputElement>(null);

  function onClickClear() {
    if (titleRef.current) {
      titleRef.current.value = "";
    }
  }

  const addTask = useCallback(() => {
    const newTask = {
      id: tasks.length + 1,
      title: titleRef.current?.value || "",
      status: false,
      date: Date.now(),
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
    onClickClear();
  }, [tasks]);

  function toggleTask(id: number) {
    setTasks((prevTasks) => {
      return prevTasks.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            status: !task.status,
          };
        }
        return task;
      });
    });
  }

  function showAll() {
    setCurrentView("all");
  }

  function showCompleted() {
    setCurrentView("completed");
  }

  function showPending() {
    setCurrentView("pending");
  }

  const filteredTasks = tasks.filter((task) => {
    if (currentView === "completed") {
      return task.status;
    } else if (currentView === "pending") {
      return !task.status;
    }
    return true;
  });

  function deleteTask(id: number) {
    const updatedTasks = tasks.filter((task) => {
      return task.id !== id;
    });

    setTasks([...updatedTasks]);
  }

  function startEditingTask(id: number) {
    setEditingTaskId(id);
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

  const toggleSort = () => {
    setSorted(!sorted);
  };

  function sortAlphabetically() {
    const sorted = [...tasks];
    sorted.sort((a, b) => a.title.localeCompare(b.title));
    setTasks(sorted);
    setSorted(false);
  }

  function sortByStatus() {
    const sorted = [...tasks];
    sorted.sort((a, b) => (a.status === b.status ? 0 : a.status ? -1 : 1));
    sorted.sort((a, b) => a.date - b.date);

    setTasks(sorted);
    setSorted(false);
  }

  return (
    <>
      <input type="text" ref={titleRef} placeholder="Adicione uma tarefa" />
      <ButtonStyled title={"Adicionar"} clickFunction={addTask} />
      <div>
        <ButtonStyled title={"Todas"} clickFunction={showAll} />
        <ButtonStyled title={"Concluídas"} clickFunction={showCompleted} />
        <ButtonStyled title={"Pendentes"} clickFunction={showPending} />
      </div>
      <div>
        <ButtonStyled title={"Ordenar por Data"} clickFunction={toggleSort} />
        <ButtonStyled
          title={"Ordenar por Ordem Alfabética"}
          clickFunction={sortAlphabetically}
        />
        <ButtonStyled
          title={"Ordenar por Concluídas"}
          clickFunction={sortByStatus}
        />
      </div>
      {sorted
        ? sortedTasks.map((task) => (
            <SectionTask
              onClick={() => toggleTask(task.id)}
              key={task.id}
              id={task.id}
              title={task.title}
              date={task.date}
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
          ))
        : filteredTasks.map((task) => (
            <SectionTask
              onClick={() => toggleTask(task.id)}
              key={task.id}
              id={task.id}
              title={task.title}
              date={task.date}
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
          ))}
    </>
  );
}

export default App;
