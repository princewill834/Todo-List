import React, { useState } from "react";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const Todo = () => {
  const today = dayjs();
  const yesterday = dayjs().subtract(1, "day");
  console.log(yesterday);
  console.log(dayjs()); // view the current date

  const [currTask, setValue] = useState("");
  const [selectDate, setSelectDate] = useState(null);
  const [show, setShow] = useState(false);
  const [todoItems, setTodoItems] = useState([]);
  const [editIndex, setEditedIndex] = useState(null);

  const getDateColor = (date) => {
    return date < today;
  };

  const handleCreateTodo = () => {
    setShow(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTodoItems = {
      // Create the new task and date object
      newtasks: currTask,
      newDate: selectDate,
    };

    setTodoItems([...todoItems, newTodoItems]); // update the array with the new array

    console.log(newTodoItems);

    setValue(""); // Reset the form field after submiting
    setSelectDate(null);
    setShow(false);
  };

  const handleDelete = (todo) => {
    setTodoItems(todoItems.filter((i) => i !== todo));
  };

  const handleEdit = (index) => {
    const todo = todoItems[index];
    setValue(todo.newtasks);
    setSelectDate(todo.newDate);
    setShow(true);
    setEditedIndex(index);
  };

  return (
    <div>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "3%",
        }}
      >
        <h2 style={{ color: "#020202" }}>KCEE-Tech To-do</h2>
        <button
          style={{
            backgroundColor: "#020202",
            color: "white",
            width: "165px",
            height: "40px",
            borderRadius: "105px",
            cursor: "pointer",
          }}
          onClick={handleCreateTodo}
        >
          Create Todo
        </button>
      </header>

      <ul style={{ listStyle: "none", paddingLeft: "0" }}>
        {todoItems.map((todo, index) => {
          return (
            <li
              key={index}
              style={{
                borderBottom: "1px solid #eee",
                marginBottom: "5px",
              }}
            >
              <div
                style={{
                  marginBottom: "15px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <input
                    id={`checkbox-${index}`}
                    type="checkbox"
                    style={{
                      backgroundColor: getDateColor(todo.newDate)
                        ? "red"
                        : "green",
                      display: "none",
                    }}
                  />
                  <label
                    htmlFor={`checkbox-${index}`}
                    style={{
                      height: "20px",
                      width: "20px",
                      borderRadius: "50px",
                      cursor: "pointer",
                      border: "2px solid gray",
                      display: "inline-block",
                      marginRight: "12px",
                      backgroundColor: getDateColor(todo.newDate)
                        ? "red"
                        : "green",
                    }}
                  />
                  <span
                    style={{
                      color: getDateColor(todo.newDate) ? "gray" : "null",
                    }}
                  >
                    {todo.newtasks}
                  </span>
                  <span
                    style={{
                      paddingTop: "10px",
                      display: "block",
                      paddingLeft: "35px",
                      color: getDateColor(todo.newDate) ? "red" : "null",
                    }}
                  >
                    {todo.newDate
                      ? todo.newDate.format("YYYY-MM-DD HH:mm")
                      : "No date set"}
                  </span>
                </div>

                <div
                  style={{
                    gap: "15px",
                    display: "flex",
                  }}
                >
                  <button
                    onClick={() => handleEdit(index)}
                    style={{
                      backgroundColor: "green",
                      color: "white",
                      borderRadius: "5px",
                      cursor: "pointer",
                      width: "65px",
                      height: "40px",
                      border: "1px solid green",
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(todo)}
                    style={{
                      backgroundColor: "orange",
                      border: "1px solid orange",
                      color: "white",
                      borderRadius: "5px",
                      cursor: "pointer",
                      width: "65px",
                      height: "40px",
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      {show && (
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "10px" }}>
            <input
              style={{
                padding: "8px",
                fontSize: ".9em",
                width: "210px",
                color: "gray",
                marginBottom: "10px",
              }}
              placeholder="Daily Stand-up"
              value={currTask}
              onChange={(e) => setValue(e.target.value)}
            />
            <div>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  label="Add Date"
                  value={selectDate}
                  onChange={(newValue) => setSelectDate(newValue)}
                />
              </LocalizationProvider>
            </div>
          </div>

          <button
            type="submit"
            disabled={!currTask}
            style={{
              display: "block",
              marginTop: "10px",
              backgroundColor: !currTask ? "#ccc" : "#020202",
              color: "white",
              width: "100px",
              height: "40px",
              borderRadius: "105px",
              cursor: !currTask ? "not-allowed" : "pointer",
            }}
          >
            Add task
          </button>
        </form>
      )}
    </div>
  );
};

export default Todo;
