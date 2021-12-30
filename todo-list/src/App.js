import React, { useEffect, useState } from "react";
import "./App.css";
import Form from "./Components/Form";
import TodoList from "./Components/TodoList";





function App() {


  //states
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);

  //run once when app starts
  useEffect(() => {
    getLocalTodos();
  }, []);

   //use effect
   useEffect(() => {
    filterHandler();
    saveLocalTodos();
   }, [todos, status]);

   //functions
  const filterHandler = () => {
    switch (status) {
      case "completed":
        setFilteredTodos(todos.filter((todo) => todo.completed === true));
        break;
      case "uncompleted":
        setFilteredTodos(todos.filter((todo) => todo.completed === false));
      break;

      default:
        setFilteredTodos(todos);
        break;
    }
  };

  //save to local

  const saveLocalTodos = () => {
            localStorage.setItem("todos", JSON.stringify(todos));
  };
  const getLocalTodos = () => {
    if (localStorage.getItem("todos") === null) {
      localStorage.setItem("todos", JSON.stringify([]));
    } else {
    let todoLocal = JSON.parse(localStorage.getItem("todos"));
    setTodos(todoLocal);
    }
  };


  return (

    <div className="App">
     <header>
       <h1>
         Today's ToDo
         </h1>
         </header> 
         <Form inputText={inputText} todos={todos} setTodos={setTodos} setInputText={setInputText} setStatus={setStatus} />   
         <TodoList setTodos={setTodos} todos={todos} filteredTodos={filteredTodos} />
    </div>
  );
}

export default App;
