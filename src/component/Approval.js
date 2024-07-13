// Approval.js
import React, { useState } from 'react';
import { performCaseAssignment } from '../service/authService';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  TextField,
  Button,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Approval = ({ patientDetails, insuranceDetails, dischargeDetails, labTests, caseID,  setCaseID, setAssignmentID, setActionID, setETag, eTag, assignmentID, actionID, setScreen }) => {
  const [notes, setNotes] = useState('');

  const handleNotesChange = (event) => {
    setNotes(event.target.value);
  };

  const handleApprove = async () => {
    const requestData = {
      content: {
        pyApprovalResult: "Approved",
        pyNote: notes
      }
    };
    // Handle approve action
    console.log('Approved with notes:', notes);
    try {
      const submitCaseDetailsResponse = await performCaseAssignment(eTag, assignmentID, actionID, requestData);
      console.log('Submit Case Details Success:', submitCaseDetailsResponse.data);
      setETag(submitCaseDetailsResponse.headers.etag);
      setCaseID(submitCaseDetailsResponse.data.data.caseInfo.ID);
      setAssignmentID(submitCaseDetailsResponse.data.nextAssignmentInfo.ID);
      setActionID(submitCaseDetailsResponse.data.data.caseInfo.assignments[0].actions[0].ID);
      setScreen(6); 
    } catch (error) {
      console.error('Error submitting case details:', error);
      
     }
  };

  const handleReject = () => {
    // Handle reject action
    console.log('Rejected with notes:', notes);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2> Lead Nurse Approval</h2>
      <h4>The intent of this screen to approve to ensure the information is correct by reviewing the details collected on the previous screens.</h4>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography><h3>Patient Details</h3></Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          <div>
            <p>First Name: {patientDetails.firstName}</p>
            <p>Last Name: {patientDetails.lastName}</p>
            <p>Address: {patientDetails.address}</p>
            <p>Email: {patientDetails.email}</p>
            <p>Phone: {patientDetails.phone}</p>
          </div>
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography><h3>Insurance Details</h3></Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          <p>Provider: {insuranceDetails.insuranceProvider}</p>
            <p>Policy Number: {insuranceDetails.policyNumber}</p>
            <p>Group Number: {insuranceDetails.groupNumber}</p>
            <p>Coverage Start Date: {insuranceDetails.PolicyStartDate}</p>
            <p>Coverage End Date: {insuranceDetails.PolicyEndDate}</p>
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography><h3>Discharge Details</h3></Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          <p>Discharge Status: {dischargeDetails.DischargeStatus}</p>
            <p>Discharge Summary: {dischargeDetails.DischargeSummary}</p>
            <p>Discharge Instructions: {dischargeDetails.DischargeInstructions}</p>
            <p>Discharge Diagnoses: {dischargeDetails.DischargeDiagnoses}</p>
            <p>Discharge Notes: {dischargeDetails.DischargeNotes}</p>
            <p>Follow-up Appointment Date: {dischargeDetails.FollowupAppointmentDate}</p>
            <p>Follow-up Appointment Location: {dischargeDetails.FollowupAppointmentLocation}</p>
            <table>
            <thead>
              <tr>
                <th>Medication</th>
                <th>Dosages</th>
              </tr>
            </thead>
            <tbody>
              {dischargeDetails.DischargeMedications.map((test, index) => (
                <tr key={index}>
                  <td>{test.name}</td>
                  <td>{test.dosage}</td>
                </tr>
              ))}
            </tbody>
          </table>
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography><h3>Lab Tests</h3></Typography>
        </AccordionSummary>
        <AccordionDetails>
        
          <table>
            <thead>
              <tr>
                <th>Lab Test Name</th>
                <th>Result</th>
              </tr>
            </thead>
            <tbody>
              {labTests.map((test, index) => (
                <tr key={index}>
                  <td>{test.LabTestName}</td>
                  <td>{test.LabResults}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </AccordionDetails>
      </Accordion>

      <TextField
        label="Notes"
        multiline
        rows={4}
        variant="outlined"
        value={notes}
        onChange={handleNotesChange}
        fullWidth
        style={{ marginTop: '20px' }}
      />

      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
        <Button variant="contained" color="primary" onClick={handleApprove}>
          Approve
        </Button>
        <Button variant="contained" color="secondary" onClick={handleReject}>
          Reject
        </Button>
      </div>
    </div>
  );
};

export default Approval;
