import React, { useState } from 'react';
import { submitCase, performCaseAssignment } from '../service/authService';


const PatientDetails = ({ setScreen, setCaseID, setAssignmentID, setActionID, setETag, setPatientDetails }) => {
  const [firstName, setFirstName] = useState('John');
  const [lastName, setLastName] = useState('Doe');
  const [address, setAddress] = useState('123 Main Street, Boston, MA');
  const [phone, setPhone] = useState('123-456-7890');
  const [email, setEmail] = useState('johndoe@johndoe.com');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      
        caseTypeID: "GNW-LongTerm-Work-Discharge",
        content: {},
        processID: "pyStartCase"
      
    };
    const patientInformation = {
    
      firstName,
      lastName,
      address,
      email,
      phone,
     };
    try {
      const response = await submitCase(data);

      console.log('Success:', response.data.ID);
      console.log('etag:', response.headers.etag);
      const caseTypeIDFromResponse = response.data.ID;
      const eTag = response.headers.etag;
      const assignmentID = response.data.nextAssignmentInfo.ID;
      const actionID = response.data.data.caseInfo.assignments[0].actions[0].ID;
      setETag(eTag);
      setCaseID(caseTypeIDFromResponse);
      setAssignmentID(assignmentID);
      setActionID(actionID);

      setPatientDetails(patientInformation);
      //setETag(eTag);
      const submitCaseDetailsRequestData = {
        
          content: {
            PatientDetails: {
              
              FirstName: firstName,
              LastName: lastName,
              Address: address,
              Phone : phone,
              Email : email
            }
           
          }
        
      };
      const submitCaseDetailsResponse = await performCaseAssignment(eTag, assignmentID, actionID, submitCaseDetailsRequestData);
     
      setETag(submitCaseDetailsResponse.headers.etag);
      setCaseID(submitCaseDetailsResponse.data.data.caseInfo.ID);
      setAssignmentID(submitCaseDetailsResponse.data.nextAssignmentInfo.ID);
      setActionID(submitCaseDetailsResponse.data.data.caseInfo.assignments[0].actions[0].ID);

      console.log('Submit Case Details Success:', submitCaseDetailsResponse.data);
      setScreen(2);
 

      
     
     
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2>Patient Details screen</h2>
      <h4>The intent of this screen for the discharge specialist to capture the patient details</h4>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
        </div>
        <div>
          <label>Last Name:</label>
          <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
        </div>
        <div>
          <label>Address:</label>
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
        </div>
        <div>
          <label>Phone:</label>
          <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <button type="submit">Next</button>
      </form>
    </div>
  );
};

export default PatientDetails;
