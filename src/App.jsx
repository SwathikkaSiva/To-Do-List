import { useEffect, useState } from "react";
import axios from "axios";
import './App.css';
import favImg from "./Images/fav-icn.png";
import { Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
function todoList() {
  const [Todo, setTodo] = useState([]);
  const [load, setload] = useState(true);
  const [Fav, setFav] = useState([]);
  const [form, setform] = useState({ "todo": "", "id": 0 });
  const [favItems, setFavItemes] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const getdata = async () => {
    const data = await axios.get("https://dummyjson.com/todos")
    console.log(data.data.todos)
    setTodo(data.data.todos)
  }
  useEffect(() => {
    getdata();
    console.log(Todo)
    setload(false)
  }, [])
  function handlechange(e) {
    setform({
      ...form, [e.target.name]: e.target.value
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setTodo([...Todo, form])
    setShow(false)
  }
  const handlefav = async (id) => {
    const favList = Todo.filter(i => {
      const ms = i.id === id
      return ms
    })

    const list = Fav.some(f => f.id === id)
    if (list) {
      setFav(Fav.filter(f => f.id != id))
    }
    else
      setFav([...Fav, favList[0]])
  }
  if (load) return (
    <p>
      Loading...
    </p>
  )
  return (
    <div>
      <div className="tab-wrap">
        <div className="fw-bold d-flex align-items-start justify-content-start todo-title">TO-DO List</div>
        <div className="fav-container">
          <label className="switch">
            <input type="checkbox" />
            <span className="slider round" onClick={() => setFavItemes(favItems ? false : true)}></span>
            <span className="label" style={{left: favItems ? false : true? '45px' : '22px'}} onClick={() => setFavItemes(favItems ? false : true)}>💗Fav List</span>
          </label>
          <Button variant="primary d-flex" onClick={handleShow} style={{columnGap: "5px"}}>
            <FontAwesomeIcon icon={faPlus} />
            <span>Add</span>
          </Button>
        </div>
        
      </div>
      <div className="todo-wrap">
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>My Form Modal</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Add Todo List</Form.Label>
                  <Form.Control type="text" placeholder="Enter Your To-Do List" value={form.todo} onChange={handlechange} name="todo"/>
                </Form.Group>
                <Button variant="primary" type="submit" onClick={handleSubmit}>
                  Submit
                </Button>
              </Form>
            </Modal.Body>
          </Modal>
        <div className="list-wrap">
          {favItems ? Fav.map((todo) => (
            <div className="todo-main-wrap">
              <div className="todo-inpdata-wrap">
                <div><input type="checkbox" name="" id="" checked={todo.completed} /></div>
                <div>{todo.todo}</div>
              </div>
              <div style={{backgroundColor: Fav.some((f) => f.id === todo.id)? '#7b2cbf' : 'transparent'}}><img src={favImg} className="fav-icn" onClick={() => handlefav(todo.id)} style={{filter: Fav.some((f)=> f.id === todo.id)? 'invert(100%) sepia(0%) saturate(0%) hue-rotate(93deg) brightness(103%) contrast(103%)' : 'invert(0%) sepia(0%) saturate(0%) hue-rotate(133deg) brightness(102%) contrast(104%)'}}/></div>
            </div>
          )) :
            Todo.map((todo) => (
              <div className="todo-main-wrap">
                <div className="todo-inpdata-wrap">
                  <div><input type="checkbox" name="" id="" checked={todo.completed} /></div>
                  <div>{todo.todo}</div>
                </div>
                <div style={{backgroundColor: Fav.some((f) => f.id === todo.id)? '#7b2cbf' : 'transparent'}}><img src={favImg} className="fav-icn" onClick={() => handlefav(todo.id)} style={{filter: Fav.some((f)=> f.id === todo.id)? 'invert(100%) sepia(0%) saturate(0%) hue-rotate(93deg) brightness(103%) contrast(103%)' : 'invert(0%) sepia(0%) saturate(0%) hue-rotate(133deg) brightness(102%) contrast(104%)'}}/></div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}
export default todoList