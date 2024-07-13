import React, { useEffect, useState } from 'react';
import './PhysicianList.css';
import { performCaseAssignment } from '../service/authService';

import { retrieveDataPage } from '../service/authService';

const PhysicianList = ({caseID,  setCaseID, setAssignmentID, setActionID, setETag, eTag, assignmentID, actionID, selectedPhysician, setSelectedPhysician, setScreen}) => {
  const [physicians, setPhysicians] = useState([]);

  useEffect(() => {
    // Fetch physicians from the API
   
  const fetchPhysicians = async () => {
    try {
        const requestData = 
            {
                includeTotalCount: true
              
        };
        const response = await retrieveDataPage(requestData, "D_PhysicianList");
        const physiciansResponse = await response.data.data;
      setPhysicians(response.data.data);
      console.log(' fetching physicians:', physicians);
    } catch (error) {
      console.error('Error fetching physicians:', error);
    }
  }

    fetchPhysicians();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Placeholder for submit logic
    

        
    const requestData ={
        content: {
          PrimaryCarePhysician: {
            pyGUID : selectedPhysician.pyGUID
          }
        },

      };
        
       try {
         const submitCaseDetailsResponse = await performCaseAssignment(eTag, assignmentID, actionID, requestData);
         console.log('Submit Case Details Success:', submitCaseDetailsResponse.data);
         setETag(submitCaseDetailsResponse.headers.etag);
         setCaseID(submitCaseDetailsResponse.data.data.caseInfo.ID);
         setAssignmentID(submitCaseDetailsResponse.data.nextAssignmentInfo.ID);
         setActionID(submitCaseDetailsResponse.data.data.caseInfo.assignments[0].actions[0].ID);
         console.log(caseID);
         setScreen(4); 
       } catch (error) {
         console.error('Error submitting case details:', error);
         
        }        
  };

  const handleSelectPhysician = (physician) => {
    setSelectedPhysician(physician);
  };

  return (
   <div className="main-content">
   <div className="physician-list">
      <h2>Select a Physician</h2>
      <h4>The intent of this screen for the nurse to capture the Primary Physician</h4>
      <ul>
        {physicians.map((physician) => (
          <li key={physician.pyGUID} onClick={() => handleSelectPhysician(physician)}>
            <div className="physician-info">
              <span className="physician-name">{physician.PhysicianName}</span>
              <span className="physician-specialty">{physician.Specialty}</span>
            </div>
            <div className="physician-contact">
              <span>{physician.Email}</span>
              <span>{physician.Phone}</span>
            </div>
          </li>
        ))}
      </ul>
      </div>
      <div className="physician-selected">
      {selectedPhysician && (
        <div className="selected-physician">
          <h3>Selected Physician:</h3>
          <p>{selectedPhysician.PhysicianName}</p>
          <p>{selectedPhysician.Specialty}</p>
          <p>{selectedPhysician.Email}</p>
          <p>{selectedPhysician.Phone}</p>
        </div>
      )}
      <button type="button" onClick={handleSubmit}>
          Submit
        </button>
        </div>
    </div>
  );
};

export default PhysicianList;
