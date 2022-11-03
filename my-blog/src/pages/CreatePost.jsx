import React, {useState, useEffect} from 'react'
import { Form, Card} from 'react-bootstrap'
import {addDoc, collection} from 'firebase/firestore'
import '../styles/createpost.css'
import {db, auth } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';

const CreatePost = ({isAuth}) => {


  const [title, setTitle] =useState("");
  const [postText, setPostText] = useState("");

  const postCollectionRef = collection(db, "post");
  let navigate = useNavigate();

  const createPost = async ()=>{
    await addDoc(postCollectionRef, {title:title, postText, author:{name:auth.currentUser.displayName, id:auth.currentUser.uid}});
    navigate('/')
  }

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, []);

  return (
    <>
      {/* <div className='m-5 create-post'>
      <Card className='m-5'>
        <Card.Title className='text-center mt-2'>Create A Post</Card.Title>
        <Card.Body>
          <Form className='my-form m-1' >
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Title</Form.Label>
            <Form.Control type="input" placeholder="Title..." onChange={(event)=>{
              setTitle(event.target.value)
            }} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Post:</Form.Label>
            <Form.Control as="textarea" placeholder='Post..' rows={5} onChange={(event)=>{
              setPostText(event.target.value)
            }} />
          </Form.Group>
          <button >Submit Post</button>
          </Form>
          
        </Card.Body>
      </Card>
    </div> */}
  <div className='d-flex justify-content-center align-items-center'
    style={{minHeight:'100vh'}}>
    <div className='create-container w-100'>

      <div className="createPostPage">
        <div className="cpContainer">

          <h1>Create A Post</h1>
          <div className="inputGp">
            <label> Title:</label>
            <input
              required
              placeholder="Title..."
              onChange={(event) => {
                setTitle(event.target.value);
              }}
            />
          </div>
          <div className="inputGp">
            <label> Post:</label>
            <textarea
              required
              placeholder="Post..."
              onChange={(event) => {
                setPostText(event.target.value);
              }}
            />
          </div>
          <button onClick={createPost} className='btn-submit'> Submit Post</button>

        </div>
    </div>
    </div>
    </div>
    </>
    
  )
}

export default CreatePost
