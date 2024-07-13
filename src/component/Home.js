import React, { useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './2.png';

const Home = ({setScreen}) => {


  const handleButtonClick = () => {
    setScreen(1);
  };

  return (
    <Container>
      <Row className="mt-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <img src={logo} alt="DX API Logo" className="logohome" />
            <h1>Welcome to the Application</h1>
            
            <Button variant="primary" onClick={handleButtonClick}>
              Create New Case
            </Button>
          </div>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>About the Application</Card.Title>
              <Card.Text>
              The front end of this application is developed with React JS and seamlessly integrated with the Pega workflow engine, leveraging DX APIs to manage the complete case lifecycle efficiently.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mt-4">
        
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Application Functionalities</Card.Title>
              <ul>
                <li>Create a new Case in Pega</li>
                <li>Complete the assignment</li>
                <li>My WorkList</li>
                <li>Optional Actions - Transfer Assignments, Send Email, etc.. </li>
                <li>Attachments </li>
                <li>Reports </li>
                <li>Data table (Add/Modify)</li>
                
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Sample Pie Chart</Card.Title>
              
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
