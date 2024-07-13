import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { postPulseMessage } from '../service/authService';

const CommentModal = ({ show, handleClose, handlePostPulse, caseID }) => {
  const [comment, setComment] = useState('');

  const onChangeComment = (e) => {
    setComment(e.target.value);
  };


  const onSubmit = async (e) => {
    e.preventDefault();
    // Placeholder for submit logic
    
    const postMessageData = {
      
        context: caseID,
        parentMessageId: "",
        message: comment,
      
     };
 
     try {
       const responseData = await postPulseMessage(postMessageData);
       console.log('Submit Case Details Success:', responseData);
       
       handlePostPulse(); // Notify parent component of successful submit
       handleClose(); // Close the modal
     
     } catch (error) {
       console.error('Error submitting case details:', error);
     }
    
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Enter Comment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="comment">
            <Form.Label>Comment</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={comment}
              onChange={onChangeComment}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={onSubmit}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CommentModal;
