import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [toDos, addTodos] = useState([]);
  const [text, setText] = useState('');
  useEffect(() => {
    if (toDos.length === 0) {
      let notes = JSON.parse(localStorage.getItem('todos'))
      if (notes && notes.length > 0) {
        addTodos(notes)
      }
    } else {
      localStorage.setItem('todos', JSON.stringify(toDos));
    }
    return () => {
      localStorage.setItem('todos', JSON.stringify(toDos));
    }
  }, [toDos])

  return (
    <div className="app container-fluid">
      <div className="mainHeading">
        <h1 align="center ">ToDo List</h1>
      </div>
      <div className="row">
        <div className="col-12 d-flex justify-content-center">
          <div className="text-center py-3">
            <div className="subHeading">
              <br />
              <h2>Whoop, it's {today()} 🌝 ☕ </h2>
            </div>
            <div className="input py-3">
              <input type="text" placeholder="🖊️ Add item..." onInput={e => setText(e.target.value)} value={text} />
              <i className="fas fa-plus" onClick={() => {
                addTodos([...toDos, { value: text, done: false, removed: false, id: toDos.length }]);
                setText('');
              }}></i>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid">
        <div className="row">
          <div className="col-md-4">
            <h2 align="center ">Active Todos</h2>
            <div className="row">
              {
                toDos.map(el => {
                  if (!el.done && !el.removed) {
                    return (
                      <div className="todos" key={el.id}>
                        <div className="todo">
                          <div className="left">
                            <input type="checkbox" name="" id="" value={el.done} onChange={
                              () => {
                                addTodos(
                                  toDos.map(o => {
                                    if (o.id === el.id) {
                                      o.done = !o.done;
                                    }
                                    return o
                                  })
                                )
                              }
                            } />
                            <p style={{ marginBottom: '0px' }}>{el.value}</p>
                          </div>
                          <div className="right">
                            <i className="fas fa-times" onClick={
                              () => {
                                addTodos(
                                  toDos.map(o => {
                                    if (o.id === el.id) {
                                      o.removed = !o.removed;
                                    }
                                    return o
                                  })
                                )
                              }
                            } />
                          </div>
                        </div>
                      </div>
                    )
                  }
                  else {
                    return (<></>)
                  }
                })
              }
            </div>
          </div>
          <div className="col-md-4">
            <h2 align="center ">Todos finished</h2>
            <div className="row">
              {
                toDos.map(el => {
                  if (el.done && !el.removed) {
                    return (
                      <div className="todos" key={el.id}>
                        <div className="todo">
                          <div className="left">
                            <input type="checkbox" name="" id="" checked={el.done} onChange={
                              () => {
                                addTodos(
                                  toDos.map(o => {
                                    if (o.id === el.id) {
                                      o.done = !o.done
                                    }
                                    return o
                                  })
                                )
                              }
                            } />
                            <p style={{ marginBottom: '0px' }}>{el.value}</p>
                          </div>
                          <div className="right">
                            <i className="fas fa-times" onClick={
                              () => {
                                addTodos(
                                  toDos.filter(o => {
                                    if (o.done) {
                                      return false
                                    }
                                    return true
                                  })
                                )
                              }
                            } />
                          </div>
                        </div>
                      </div>
                    )
                  }
                  else {
                    return (<></>)
                  }
                })
              }
            </div>
          </div>
          <div className="col-md-4">
            <h2 align="center"> Todos cancelled</h2>
            <div className="row">
              {
                toDos.map(el => {
                  if (el.removed) {
                    return (
                      <div className="todos" key={el.id}>
                        <div className="todo">
                          <div className="left">
                            <input type="checkbox" name="" id="" value={el.done} onChange={
                              () => {
                                addTodos(
                                  toDos.map(o => {
                                    if (o.id === el.id) {
                                      o.removed = !o.removed
                                    }
                                    return o
                                  })
                                )
                              }
                            } />
                            <p style={{ marginBottom: '0px' }}>{el.value}</p>
                          </div>
                          <div className="right">
                            <i className="fas fa-times" onClick={
                              () => {
                                addTodos(
                                  toDos.filter(o => {
                                    if (o.id === el.id) {
                                      return false
                                    }
                                    return true
                                  })
                                )
                              }
                            } />
                          </div>
                        </div>
                      </div>
                    )
                  }
                  else {
                    return (<></>)
                  }
                })
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;


function today() {
  var a = new Date();
  var weekdays = new Array(7);
  weekdays[0] = "Sunday";
  weekdays[1] = "Monday";
  weekdays[2] = "Tuesday";
  weekdays[3] = "Wednesday";
  weekdays[4] = "Thursday";
  weekdays[5] = "Friday";
  weekdays[6] = "Saturday";
  var r = weekdays[a.getDay()];
  return r
}