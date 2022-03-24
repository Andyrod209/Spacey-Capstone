import React, { useEffect, useState } from 'react';
import axios from "axios";
import { MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
  } from 'mdb-react-ui-kit';
import CommentsForum from '../CommentsForum/CommentsForum';

const Comments = (props) => {

    const [scrollableModal, setScrollableModal] = useState(false);
    const [comments, setComments] = useState([]);
    console.log(comments)

    async function getComments(){
        let response = await axios.get(`http://127.0.0.1:8000/api/comments/all/${props.postId}/`)
        console.log(response)
        setComments(response.data)
     }

    function handleClick(){
      setScrollableModal(!scrollableModal)
      getComments();
    }

  return (
    <div>
      <MDBBtn onClick={() => handleClick()}>Comments</MDBBtn>

      <MDBModal show={scrollableModal} setShow={setScrollableModal} tabIndex='-1'>
        <MDBModalDialog scrollable>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Comments</MDBModalTitle>
              <MDBBtn
                className='btn-close'
                color='none'
                onClick={() => setScrollableModal(!scrollableModal)}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              {comments.map((comment, id) => {
                return (
                  <div className="form-grid">
                    <div key={id} className="form-control" >
                    <h4 className="form-heading">{comment.user.username}</h4>
                    <div  className="post-content">{comment.text}</div>
                  </div>
                  </div>
                );
              })}
            </MDBModalBody>
            <MDBModalFooter>
              <CommentsForum postId={props.postId} getComments={getComments}/>
              {/* <MDBBtn color='secondary' onClick={() => setScrollableModal(!setScrollableModal)}>
                Close
              </MDBBtn> */}
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
        </MDBModal>
        </div>
        );
}
 
export default Comments;