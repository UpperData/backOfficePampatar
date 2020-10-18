import React, { useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Card, CardBody, ListGroup, ListGroupItem } from "reactstrap";

import user1 from "../../../assets/images/users/1.jpg";
import user2 from "../../../assets/images/users/2.jpg";
import user3 from "../../../assets/images/users/3.jpg";
import user4 from "../../../assets/images/users/4.jpg";

const TaskList = () => {
  const [todos, setTodos] = useState([
    {
      id: 1,
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      completed: false,
      labelname: "Today",
      labelcolor: "danger",
      image1: user1,
      image2: user2,
      time: "1 August 2019",
    },
    {
      id: 2,
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      completed: false,
      labelname: "1 week",
      labelcolor: "primary",
      image1: user3,
      image2: user4,
      time: "26 Jun 2017",
    },
    {
      id: 3,
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      completed: false,
      labelname: "Yesterday",
      labelcolor: "info",
      image1: user3,
      image2: user4,
      time: "20 July 2018",
    },
    {
      id: 4,
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      completed: false,
      labelname: "2 week",
      labelcolor: "warning",
      image1: user3,
      image2: user4,
      time: "26 jun 2017",
    },
    {
      id: 5,
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      completed: false,
      labelname: "Rejected",
      labelcolor: "danger",
      image1: user3,
      image2: user4,
      time: "26 Fab 2017",
    },
  ]);

  const toggleComplete = (todoId) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === todoId) todo.completed = !todo.completed;
        return todo;
      })
    );
  };

  const deleteTodo = (todoId) => {
    setTodos(todos.filter((todo) => todo.id !== todoId));
  };

  return (
    <Card>
      <span className="lstick"></span>
      <CardBody>
        <h4 className="card-title">Task List</h4>
        <div
          className="todo-widget scrollable position-relative"
          style={{ height: "452px" }}
        >
          <PerfectScrollbar>
            <ListGroup
              className="list-task todo-list list-group m-b-0"
              data-role="tasklist"
            >
              {todos.map((todo) => (
                <ListGroupItem
                  className={
                    "list-group-item todo-item border-0 " +
                    (todo.completed ? "completed" : "")
                  }
                  key={todo.id}
                >
                  <div>
                    <div className="custom-control custom-checkbox">
                      <input
                        type="checkbox"
                        defaultChecked={todo.completed}
                        id={todo.id}
                        className="custom-control-input"
                        data-toggle="checkbox"
                        onClick={(todoId) => toggleComplete(todo.id)}
                      />
                      <label
                        className="custom-control-label todo-label"
                        htmlFor={todo.id}
                      >
                        <span className="todo-desc">{todo.content}</span>
                      </label>
                    </div>
                    <div className="d-flex align-items-center">
                      <span
                        className={
                          "badge-pill ml-4 mt-2 badge badge-" + todo.labelcolor
                        }
                      >
                        {todo.labelname}
                      </span>
                      <ul className="list-inline ml-4 mt-2">
                        <li className="list-inline-item">
                          <img
                            src={todo.image1}
                            alt="user"
                            className="rounded-circle img-fluid"
                            width="30"
                          />
                        </li>
                        <li className="list-inline-item">
                          <img
                            src={todo.image2}
                            alt="user"
                            className="rounded-circle img-fluid"
                            width="30"
                          />
                        </li>
                      </ul>
                    </div>
                    <span className="text-muted ml-4 mt-2 font-12">
                      {todo.time}
                    </span>
                  </div>
                  <div className="ml-auto">
                    <span onClick={(todoId) => deleteTodo(todo.id)}>
                      <i className="ti-trash"></i>
                    </span>
                  </div>
                </ListGroupItem>
              ))}
            </ListGroup>
          </PerfectScrollbar>
        </div>
      </CardBody>
    </Card>
  );
};

export default TaskList;
