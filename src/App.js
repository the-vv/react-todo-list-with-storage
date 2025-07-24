import React, { useState, useEffect, useCallback } from 'react';
import './App.css';

function App() {
  const [toDos, addTodos] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    let notes = JSON.parse(localStorage.getItem('todos'))
    if (notes && notes.length > 0) {
      addTodos(notes)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(toDos));
  }, [toDos])

  const onAdd = useCallback((newTodo) => {
    addTodos([...toDos, newTodo]);
  }, [toDos]);

  return (
    <div className="app container-fluid">
      <div className="mainHeading mt-3">
        {/* <h1 align="center ">To do list</h1> */}
      </div>
      <div className="row">
        <div className="col-12 d-flex justify-content-center">
          <div className="text-center pb-3">
            <div className="subHeading">
              <br />
              <h2>Whoop, it's {today()}, {todayDate()} </h2>
            </div>
            <div className="input py-3">
              <input type="text" placeholder="🖊️ Add item..." onInput={e => setText(e.target.value)} value={text} onKeyDown={(e) => {
                if (e.key === 'Enter' && text.length > 0) {
                  onAdd({ value: text, done: false, removed: false, id: Date.now() });
                  setText('');
                }
              }} />
              <i className="fas fa-plus" onClick={() => {
                if (text.length > 0) {
                  onAdd({ value: text, done: false, removed: false, id: Date.now() });
                  setText('');
                }
              }}>
              </i>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-4 mb-3 border pb-3">
            <h2 align="center ">Active</h2>
            <div className="row">
              {
                toDos.map(el => {
                  if (!el.done && !el.removed) {
                    return (
                      <div className="todos" key={el.id}>
                        <div className="todo col-12 border border-primary border-3 animate__animated animate__bounceIn animate__faster" style={{ backgroundColor: 'rgba(13, 110, 253, 0.1)' }}>
                          <div className="col-11 text-center">
                            {/* <button className="btn btn-success shadow" onClick={
                              () => {
                                addTodos(
                                  toDos.map(o => {
                                    if (o.id === el.id) {
                                      o.done = !o.done;
                                      o.id = Date.now()
                                    }
                                    return o
                                  })
                                )
                              }
                            }>Mark as Done</button> */}
                            <p className="todo-content h4 my-2 text-primary" style={{ marginBottom: '0px' }}>
                              {el.value}
                            </p>
                            <p style={{ marginBottom: '', fontSize: '0.7em', color: '#6c757d' }}>
                              {getTime(el.id)}
                            </p>
                          </div>
                          <div className="col-1 d-flex flex-column gap-1">
                            <button className="btn btn-success btn-sm shadow">
                              <i className="fas fa-check fa-xs text-white" onClick={
                                () => {
                                  addTodos(
                                    toDos.map(o => {
                                      if (o.id === el.id) {
                                      o.done = !o.done;
                                      o.id = Date.now()
                                    }
                                    return o
                                  })
                                )
                              }
                            } />
                            </button>
                            <button className="btn btn-danger btn-sm shadow">
                              <i className="fas fa-times fa-xs text-white" onClick={
                                () => {
                                  addTodos(
                                    toDos.map(o => {
                                      if (o.id === el.id) {
                                        o.removed = !o.removed;
                                        o.id = Date.now()
                                      }
                                      return o
                                    })
                                  )
                                }
                              } />
                            </button>
                          </div>
                        </div>
                      </div>
                    )
                  }
                  else {
                    return (null)
                  }
                })
              }
            </div>
          </div>
          <div className="col-md-4 mb-3 border pb-3">
            <h2 align="center ">Finished</h2>
            <div className="row">
              {
                toDos.map(el => {
                  if (el.done && !el.removed) {
                    return (
                      <div className="todos" key={el.id}>
                        <div className="todo col-12 border border-success border-3 animate__animated animate__bounceIn animate__faster" style={{ backgroundColor: 'rgba(25, 135, 84, 0.1)' }}>
                          <div className="col-11 text-center">
                            <p className="todo-content h4 my-2 text-success" style={{ marginBottom: '0px' }}>
                              {el.value}
                            </p>
                            <p style={{ marginBottom: '', fontSize: '0.7em', color: '#6c757d' }}>
                              Done on: {getTime(el.id)}
                            </p>
                          </div>
                          <div className="col-1 d-flex flex-column gap-1">
                            <button className="btn btn-primary btn-sm shadow" onClick={
                              () => {
                                addTodos(
                                  toDos.map(o => {
                                    if (o.id === el.id) {
                                      o.done = !o.done;
                                      o.id = Date.now();
                                    }
                                    return o
                                  })
                                )
                              }
                            }>
                              <i className="fas fa-undo fa-xs text-white" />
                            </button>
                            <button className="btn btn-danger btn-sm shadow">
                              <i className="fas fa-times fa-xs text-white" onClick={
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
                            </button>
                          </div>
                        </div>
                      </div>
                    )
                  }
                  else {
                    return null
                  }
                })
              }
            </div>
          </div>
          <div className="col-md-4 mb-3 border pb-3">
            <h2 align="center"> Cancelled</h2>
            <div className="row">
              {
                toDos.map(el => {
                  if (el.removed) {
                    return (
                      <div className="todos" key={el.id}>
                        <div className="todo col-12 border border-danger border-3 text-center animate__animated animate__bounceIn animate__faster" style={{ backgroundColor: 'rgba(220, 53, 69, 0.1)' }}>
                          <div className="col-11">
                            <p className="todo-content h4 my-2 text-danger" style={{ marginBottom: '0px' }}>
                              {el.value}
                            </p>
                            <p style={{ marginBottom: '', fontSize: '0.7em', color: '#6c757d' }}>
                              Cancelled on: {getTime(el.id)}
                            </p>
                          </div>
                          <div className="col-1 d-flex flex-column gap-1">
                            <button className="btn btn-success btn-sm shadow" onClick={
                              () => {
                                addTodos(
                                  toDos.map(o => {
                                    if (o.id === el.id) {
                                      o.removed = !o.removed;
                                      o.id = Date.now()
                                    }
                                    return o
                                  })
                                )
                              }
                            }>
                              <i className="fas fa-redo fa-xs text-white" />
                            </button>
                            <button className="btn btn-danger btn-sm shadow">
                              <i className="fas fa-times fa-xs text-white" onClick={
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
                            </button>
                          </div>
                        </div>
                      </div>
                    )
                  }
                  else {
                    return (null)
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

function todayDate() {
  var today = new Date();
  var dd = today.getDate();

  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();
  if (dd < 10) {
    dd = '0' + dd;
  }

  if (mm < 10) {
    mm = '0' + mm;
  }
  today = dd + '/' + mm + '/' + yyyy;
  return today;
}

function getTime(time) {
  var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  // var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  var d = new Date(time);
  // var day = days[d.getDay()];
  var hr = d.getHours();
  var min = d.getMinutes();
  if (min < 10) {
    min = "0" + min;
  }
  var ampm = "am";
  if (hr > 12) {
    hr -= 12;
    ampm = "pm";
  }
  var date = d.getDate();
  var month = months[d.getMonth()];
  var year = d.getFullYear();
  return hr + ":" + min + ampm + " " + date + " " + month + " " + year;
}