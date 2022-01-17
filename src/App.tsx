import React, { useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import "./App.css";
import InputField from "./Components/InputField";
import TodoList from "./Components/TodoList";
import { Todo } from "./Modal";

const App: React.FC = () => {
  //basic ts examples
  // let name:string;
  // let age:string | number;
  // let isStudent:boolean;
  // let hobbies: string[]
  // let role:[number,string];

  // type Person = {
  //     name: string,
  //     age?:number
  // }
  // let person:Person = {
  //   name:"abcd",
  //   // age:20
  // }

  // let lotsOfPeople:Person[]

  // name = "3";
  // age=5;
  // isStudent = true;
  // hobbies=["one","two","three"]
  // role = [2,"two"]

  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo) {
      setTodos([...todos, { id: Date.now(), todo: todo, isDone: false }]);
      setTodo("");
    }
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

      let add, 
      active = todos,
      complete = completedTodos;

      if(source.droppableId === "TodosList"){
        add = active[source.index]
        active.splice(source.index,1)
      }
      else{
        add = active[source.index]
        complete.splice(source.index,1)
      }

      if(destination.droppableId === "TodosList"){
        active.splice(destination.index,0,add)
      }
      else{
        complete.splice(destination.index,0,add)
      }

      setCompletedTodos(complete);
        setTodos(active)
  };

  return (
    <DragDropContext onDragEnd={(e) => onDragEnd(e)}>
      <div className="App">
        <span className="heading">Taskify</span>
        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
        <TodoList
          todos={todos}
          setTodos={setTodos}
          completedTodos={completedTodos}
          setCompletedTodos={setCompletedTodos}
        />
      </div>
    </DragDropContext>
  );
};

export default App;
