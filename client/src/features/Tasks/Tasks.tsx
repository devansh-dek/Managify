import { Button } from "@/components/ui/button";
import { CheckCircle2, Circle, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Icon from "../../assets/check-list.png";

interface taskObj {
  title: string;
  isCompleted: boolean;
}

function Tasks() {
  const [tasks, setTasks] = useState<taskObj[] | null>([]);
  const taskList = localStorage.getItem("taskList");
  const [render, setRender] = useState<number>(0);
  const [task, setTask] = useState<string>("");

  useEffect(() => {
    if (taskList?.length) {
      setTasks(JSON.parse(taskList));
    }
  }, []);

  function addTask() {
    try {
      if (task?.length) {
        let newTasks: taskObj[] = [];
        if (tasks?.length) newTasks = tasks;
        newTasks.push({ title: task, isCompleted: false });
        setTasks(newTasks);
        setRender(render + 1);
        localStorage.setItem("taskList", JSON.stringify(newTasks));
      }
    } catch (error) {
      console.log(error);
      toast("Something went wrong!");
    }
  }

  function completeTask(index: number) {
    try {
      if (tasks?.length) {
        let newTasks = tasks;
        newTasks[index].isCompleted = !newTasks[index].isCompleted;
        setTasks(newTasks);
        setRender(render + 1);
        localStorage.setItem("taskList", JSON.stringify(newTasks));
      }
    } catch (error) {
      console.log(error);
      toast("Something went wrong!");
    }
  }

  function deleteTask(index: number) {
    try {
      if (tasks?.length) {
        let tasksArray = tasks;
        tasksArray.splice(index, 1);
        setTasks(tasksArray);
        setRender(render + 1);
        localStorage.setItem("taskList", JSON.stringify(tasksArray));
      }
    } catch (error) {
      console.log(error);
      toast("Something went wrong!");
    }
  }

  return (
    <div className="h-[640px] my-3 mx-1 bg-[#232634] w-[400px] rounded-[20px] p-5">
      <div className="flex gap-2 items-center mb-3">
        <img src={Icon} className="h-10" />
        <span className="text-white text-xl font-[500]">Todo List</span>
      </div>
      <div className="w-[350px] flex mb-3 justify-between items-center">
        <input
          className="rounded-[20px] font-roboto w-[250px] h-10 text-sm font-regular px-3 py-0"
          placeholder="Enter your task"
          value={task}
          onChange={(e) => {
            setTask(e.target.value);
          }}
        />
        <Button
          className="flex left-[-80px] rounded-[20px] bg-red-400 text-sm font-roboto px-5 ml-[10px] hover:bg-white hover:text-gray-400"
          onClick={addTask}
        >
          Add
        </Button>
      </div>
      <ul>
        {!tasks?.length ? (
          <div className="p-5 font-roboto font-semibold text-sm text-gray-400">
            No tasks today
          </div>
        ) : (
          tasks.map((task, i) => {
            return (
              <li
                key={i}
                className="flex justify-between items-center cursor-pointer"
              >
                {!task.isCompleted ? (
                  <Circle
                    className="h-7 w-7 text-white"
                    onClick={() => {
                      completeTask(i);
                    }}
                  />
                ) : (
                  <CheckCircle2
                    className="h-7 w-7 text-gray-400"
                    onClick={() => {
                      completeTask(i);
                    }}
                  />
                )}
                <div
                  className={
                    !task.isCompleted
                      ? "max-w-[100px] py-3 font-regular text-sm font-roboto text-white"
                      : "max-w-[100px] py-3 font-regular text-sm font-roboto text-gray-400 text line-through"
                  }
                  onClick={() => {
                    completeTask(i);
                  }}
                >
                  {task.title}
                </div>
                <X
                  className="h-5 w-5 text-white"
                  onClick={() => {
                    deleteTask(i);
                  }}
                />
              </li>
            );
          })
        )}
      </ul>
    </div>
  );
}

export default Tasks;
