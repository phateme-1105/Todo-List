import { Dispatch, SetStateAction, useState } from "react";
import "../CSS/TodoForm.css";
import TodoService from "../TodoService";
import TodoTypes from "../todo";

interface Props {
  setTodos: Dispatch<SetStateAction<TodoTypes[]>>;
  editingTodoId: number | null;
  editedTodoText: string;
  setEditedTodoText: (text: string) => void;
}

const TodoForm = ({
  setTodos,
  editingTodoId,
  editedTodoText,
  setEditedTodoText,
}: Props) => {
  const [newTodoText, setNewTodoText] = useState<string>("");

  const handleAddTodo = () => {
    if (newTodoText.trim() !== "" && editedTodoText === "") {
      const newTodo = TodoService.addTodos(newTodoText);
      setTodos((prevTodos) => [...prevTodos, newTodo]);
      setNewTodoText("");
    } else if (editedTodoText !== "") {
      setTodos((prevTodos) =>
        prevTodos.map((todo) => {
          if (todo.id === editingTodoId) {
            const updatedTodo = { ...todo, text: editedTodoText };
            TodoService.updateTodo(updatedTodo);
            return updatedTodo;
          } else {
            return todo;
          }
        })
      );
      setEditedTodoText("");
    }
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAddTodo();
        }}
        className="inputForm"
      >
        <input
          type="text"
          value={newTodoText || editedTodoText}
          onChange={(e) => {
            editedTodoText
              ? setEditedTodoText(e.target.value)
              : setNewTodoText(e.target.value);
          }}
          placeholder="Add a Task"
        />
        <button>{editedTodoText ? "Edit Todo" : "Add Todo"}</button>
      </form>
    </>
  );
};

export default TodoForm;
