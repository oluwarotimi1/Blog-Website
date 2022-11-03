import React, {useState, useEffect}from 'react'
import { collection, getDocs, deleteDoc, doc} from 'firebase/firestore'
import { auth, db} from '../firebaseConfig';
import { Card } from 'react-bootstrap';
import {RiDeleteBinLine} from 'react-icons/ri'
import '../styles/home.css'

const Home = ({isAuth}) => {

  const [postList, setPostList] =useState([]);
  const postCollectionRef =collection(db, "post");

  
    useEffect(()=>{
      const getPosts = async ()=>{
        const data =await getDocs(postCollectionRef);
        setPostList(data.docs.map((doc)=>({...doc.data(), id:doc.id})));
      };

      getPosts();

    });

    const deletePost = async (id) => {
      const postDoc = doc(db, "post", id);
      await deleteDoc(postDoc);
    };

  return (
    <>
      <div>
        {postList.map((post)=>{
          return (
            <div>
              <div className='d-flex justify-content-center align-items-center'>
                <div className='w-100 m-2'
                        style={{maxWidth:'800px', maxHeight:'400px', overflow:'hidden', overflowY:'auto', wordWrap:'break-word'}}>
                  <Card className='home-card mt-2'>
                    <Card.Body>
                      <Card.Title className='card-title'>
                        <div>{post.title}</div>
                        <div className="deletePost">
                          {isAuth && post.author.id === auth.currentUser.uid && (
                            <button
                              onClick={() => {
                                deletePost(post.id);
                              }}
                              style={{outline:'none', border:'none'}}
                            >
                              {" "}
                              <RiDeleteBinLine />
                            </button>
                          )}
                        </div>
                      </Card.Title>
                      <Card.Text>
                        {post.postText}
                      </Card.Text>
                      <h5>Writer: {post.author.name}{post.author.date}</h5>
                    </Card.Body>
                  </Card>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </>
    
  )
}

export default Home