import React, { useState } from 'react';
import { performOptionalActions, performCaseAssignment } from '../service/authService';
import './LabTest.css';
import { Button, Modal, Form } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';


const LabTest = ({caseID,  setCaseID, setAssignmentID, setActionID, setETag, eTag, assignmentID, actionID, setScreen, labTests, setLabTests}) => {
  const [labTestsData, setLabTestsData] = useState([
    { LabTestName: 'White Blood Cell Count', LabResults: 'High', LabStatus: 'Positive' },
    { LabTestName: 'Ultrasound', LabResults: 'Appendix visible and inflamed', LabStatus: 'Positive' },
    { LabTestName: 'CT Scan', LabResults: 'Appendix enlargement', LabStatus: 'Positive' },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [workbasket, setWorkbasket] = useState('');

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  
  const handleSelectChange = (event) => setWorkbasket(event.target.value);

  const handleSubmitWorkbasket = async () => {
    console.log('Selected Workbasket:', workbasket);
    const requestData = {
      content: {
        pyAssignment: {
          pyReassignType: "workbasket",
          pyReassignToWorkbasket: workbasket,
          pyAuditNote: "Transferring the assignment to Workbasket"
        }
      }
    };
    const submitCaseDetailsResponse = await performOptionalActions(eTag, assignmentID, "pyTransferAssignment", requestData);
     
      setETag(submitCaseDetailsResponse.headers.etag);
      setCaseID(submitCaseDetailsResponse.data.data.caseInfo.ID);
      //setAssignmentID(submitCaseDetailsResponse.data.nextAssignmentInfo.ID);
      setActionID(submitCaseDetailsResponse.data.data.caseInfo.assignments[0].actions[0].ID);

      console.log('Submit Case Details Success:', submitCaseDetailsResponse.data);
      
    handleCloseModal();
  };

  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    const newLabTests = [...labTestsData];
    newLabTests[index][name] = value;
    setLabTests(newLabTests);
    
  };
  const handleTransfer = () => {
    // Add logic to handle case transfer to another junior doctor
    console.log('Transferring case');
  };
  const addLabTest = () => {
    setLabTests([...labTestsData, { LabTestName: '', LabResults: '', LabStatus: '' }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Placeholder for submit logic
    

        
    const labTestRequestData = {
        content: {},
        pageInstructions: [
          {
            target: ".LabTestResults",
            content: {},
            listIndex: 1,
            instruction: "INSERT"
          },
          {
            content: {
              LabResults: "Appendix visible and inflamed",
              LabTestName: "Ultrasound"
            },
            target: ".LabTestResults",
            listIndex: 1,
            instruction: "UPDATE"
          },
          {
            content: {
              LabResults: "High",
              LabTestName: "White Blood Cell Count"
            },
            target: ".LabTestResults",
            listIndex: 2,
            instruction: "UPDATE"
          },
          {
            content: {
              LabResults: "Appendix enlargement",
              LabTestName: "CT Scan"

            },
            target: ".LabTestResults",
            listIndex: 3,
            instruction: "UPDATE"
          }
        ]
      };
        
      labTests= labTestsData;
      setLabTests(labTests);
       try {
         const submitCaseDetailsResponse = await performCaseAssignment(eTag, assignmentID, actionID, labTestRequestData);
         console.log('Submit Case Details Success:', submitCaseDetailsResponse.data);
         setETag(submitCaseDetailsResponse.headers.etag);
         setCaseID(submitCaseDetailsResponse.data.data.caseInfo.ID);
         setAssignmentID(submitCaseDetailsResponse.data.nextAssignmentInfo.ID);
         setActionID(submitCaseDetailsResponse.data.data.caseInfo.assignments[0].actions[0].ID);
         console.log(caseID);
         setScreen(8); 
       } catch (error) {
         console.error('Error submitting case details:', error);
         
        }
        
    console.log('Submitted lab tests:', labTests);
  };

  return (
    <div>
      <h1>Lab Tests for Appendicitis</h1>
      <h4>The intent of this screen for the lab specialist to capture the Lab Test results and other details</h4>
      <form onSubmit={handleSubmit}>
        <table>
          <thead>
            <tr>
              <th>Test Name</th>
              <th>Result</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {labTestsData.map((test, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="text"
                    name="LabTestName"
                    value={test.LabTestName}
                    onChange={(e) => handleInputChange(index, e)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="LabResults"
                    value={test.LabResults}
                    onChange={(e) => handleInputChange(index, e)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="LabStatus"
                    value={test.LabStatus}
                    onChange={(e) => handleInputChange(index, e)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
   
        
        <div className="d-flex justify-content-end mb-3">

      <Button variant="primary" onClick={handleShowModal}>
        Transfer to Workbasket
      </Button>
      <Button variant="secondary">
        Send Email to clarify
      </Button>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Select Workbasket</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="workbasketSelect">
              <Form.Label>Workbasket</Form.Label>
              <Form.Control as="select" value={workbasket} onChange={handleSelectChange}>
                <option value="">Select a Workbasket</option>
                <option value="LabTest Workbasket">LabTest Workbasket</option>
                <option value="Physician Workbasket">Physician Workbasket</option>
                <option value="Payment Workbasket">Payment Workbasket</option>
                <option value="Diagnosis Workbasket">Diagnosis Workbasket</option>
                <option value="Doctor Review Workbasket">Doctor Review Workbasket</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmitWorkbasket}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
   
    </div>
    <button type="form">Submit</button>
      </form>
    </div>
  );
};

export default LabTest;
