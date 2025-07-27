import React, { useState, useEffect, useCallback } from 'react';
import './App.css';

function App() {
  const [toDos, addTodos] = useState([]);
  const [text, setText] = useState('');
  const [quote, setQuote] = useState('');

  useEffect(() => {
    fetch('https://ai-api.thevv.me/utils/weekday-quote-in')
      .then(response => response.json())
      .then(data => setQuote(data.quote))
      .catch(error => console.error('Error fetching quote:', error));
  }, [])

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
    addTodos([newTodo, ...toDos]);
  }, [toDos]);

  return (
    <div className="app container-fluid">
      <div className='d-flex w-100 flex-column' style={{ height: '100vh', overflow: 'hidden' }}>
        <div className="row" style={{ flexShrink: '0' }}>
          <div className="col-12 d-flex justify-content-center">
            <div className="text-center pb-3">
              <div className="subHeading">
                <h4>Hey There, it's {today()}, {todayDate()} </h4>
                <h6 className='text-secondary'>{quote || 'Loading Quote of the Day...'}</h6>
              </div>
              <div className="input py-1">
                <input type="text" placeholder="🖊️ Add item..." onInput={e => setText(e.target.value)} value={text} onKeyDown={(e) => {
                  if (e.key === 'Enter' && text.length > 0) {
                    onAdd({ value: text, done: false, removed: false, id: Date.now() });
                    setText('');
                  }
                }} />
                <i className="fas fa-plus px-2 add-button h-100 d-flex align-items-center justify-content-center" onClick={() => {
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
        <div className="container-fluid" style={{ flexGrow: '1', overflowY: 'auto' }}>
          <div className="row">
            <div className="col-md-4 mb-3 border pb-3 rounded-3 pt-1">
              <h6 align="center " className='m-0'>
                Active ({toDos.filter(el => !el.done && !el.removed).length})
              </h6>
              <div className="row">
                {
                  toDos.map(el => {
                    if (!el.done && !el.removed) {
                      return (
                        <div className="todos" key={el.id}>
                          <div className="todo col-12 border border-primary border-1" style={{ backgroundColor: 'rgba(13, 110, 253, 0.03)' }}>
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
                              <p className="todo-content h5 my-2 text-primary" style={{ marginBottom: '0px' }}>
                                {el.value}
                              </p>
                              <p style={{ marginBottom: '', fontSize: '0.7em', color: '#6c757d' }}>
                                {getTime(el.id)}
                              </p>
                            </div>
                            <div className="col-1 d-flex flex-column gap-1">
                              <button className="btn btn-success btn-sm shadow" onClick={
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
                              } >
                                <i className="fas fa-check fa-xs text-white" />
                              </button>
                              <button className="btn btn-danger btn-sm shadow" onClick={
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
                              } >
                                <i className="fas fa-times fa-xs text-white" />
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
            <div className="col-md-4 mb-3 border pb-3 rounded-3 pt-1">
              <h6 align="center " className='m-0'>Finished ({toDos.filter(el => el.done && !el.removed).length})</h6>
              <div className="row">
                {
                  toDos.map(el => {
                    if (el.done && !el.removed) {
                      return (
                        <div className="todos" key={el.id}>
                          <div className="todo col-12 border border-success border-1" style={{ backgroundColor: 'rgba(25, 135, 84, 0.03)' }}>
                            <div className="col-11 text-center">
                              <p className="todo-content h5 my-2 text-success" style={{ marginBottom: '0px' }}>
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
                              <button className="btn btn-danger btn-sm shadow" onClick={
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
                              } >
                                <i className="fas fa-times fa-xs text-white" />
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
            <div className="col-md-4 mb-3 border pb-3 rounded-3 pt-1">
              <h6 align="center"> Cancelled ({toDos.filter(el => el.removed).length})</h6>
              <div className="row">
                {
                  toDos.map(el => {
                    if (el.removed) {
                      return (
                        <div className="todos" key={el.id}>
                          <div className="todo col-12 border border-danger border-1 text-center" style={{ backgroundColor: 'rgba(220, 53, 69, 0.03)' }}>
                            <div className="col-11">
                              <p className="todo-content h5 my-2 text-danger" style={{ marginBottom: '0px' }}>
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
                              <button className="btn btn-danger btn-sm shadow" onClick={
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
                              } >
                                <i className="fas fa-times fa-xs text-white" />
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