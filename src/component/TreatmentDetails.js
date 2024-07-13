import React, { useState } from 'react';
import { performCaseAssignment } from '../service/authService';

const TreatmentDetails = ({ caseID,  setCaseID, setAssignmentID, setActionID, setETag, eTag, assignmentID, actionID, setScreen, setTreatmentDetails }) => {
  const [careProvider, setCareProvider] = useState('');
  const [treatmentDate, setTreatmentDate] = useState('');
  const [treatmentCost, setTreatmentCost] = useState('');
  const [insuranceDetails, setInsuranceDetails] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const submitCaseDetailsRequestData = {
    
     careProvider,
      treatmentDate,
      treatmentCost,
      insuranceDetails,
    };

    try {
      const submitCaseDetailsResponse = await performCaseAssignment(eTag, assignmentID, actionID, submitCaseDetailsRequestData);
      console.log('Submit Case Details Success:', submitCaseDetailsResponse.data);
      setTreatmentDetails(submitCaseDetailsRequestData);
      setETag(submitCaseDetailsResponse.headers.etag);
      setCaseID(submitCaseDetailsResponse.data.ID);
      setAssignmentID(submitCaseDetailsResponse.data.nextAssignmentInfo.ID);
      setActionID(submitCaseDetailsResponse.data.data.caseInfo.assignments[0].actions[0].ID);
      setScreen(3);
    } catch (error) {
      console.error('Error submitting case details:', error);
    }
  };

  return (
    <div>
      <h2>Treatment Details</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Care Provider:</label>
          <input type="text" value={careProvider} onChange={(e) => setCareProvider(e.target.value)} required />
        </div>
        <div>
          <label>Date of Treatment:</label>
          <input type="date" value={treatmentDate} onChange={(e) => setTreatmentDate(e.target.value)} required />
        </div>
        <div>
          <label>Cost of Treatment:</label>
          <input type="number" value={treatmentCost} onChange={(e) => setTreatmentCost(e.target.value)} required />
        </div>
        <div>
          <label>Insurance Details:</label>
          <input type="text" value={insuranceDetails} onChange={(e) => setInsuranceDetails(e.target.value)} required />
        </div>
        <button type="submit">Next</button>
      </form>
    </div>
  );
};

export default TreatmentDetails;
