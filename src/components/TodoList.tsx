import { Dispatch, useState } from "react";
import TodoService from "../TodoService";
import TodoTypes from "../todo";
import "../CSS/TodoList.css";
import { FaCheck, FaEdit } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";
import { RiDeleteBin5Fill } from "react-icons/ri";
import TodoForm from "./TodoForm";

const TodoList = () => {
  const [todos, setTodos] = useState<TodoTypes[]>(TodoService.getTodos());
  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);
  const [editedTodoText, setEditedTodoText] = useState<string>("");

  const handleEditStart = (todo: TodoTypes) => {
    setEditingTodoId(todo.id);
    setEditedTodoText(todo.text);
  };

  const handleDeleteTodo = (id: number) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    TodoService.deleteTodo(id);
  };

  return (
    <div className="todoContainer">
      <div>
        <TodoForm
          editingTodoId={editingTodoId}
          setEditedTodoText={setEditedTodoText}
          editedTodoText={editedTodoText}
          setTodos={setTodos}
        />
      </div>

      <div className="todos">
        {todos.map((todo) => (
          <div className="item" key={todo.id}>
            <div className="editStart">
              <span>{todo.text}</span>
              <button onClick={() => handleEditStart(todo)}>
                <FaEdit />
              </button>
            </div>

            <button onClick={() => handleDeleteTodo(todo.id)}>
              <RiDeleteBin5Fill />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;
