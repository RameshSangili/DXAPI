// src/components/DoctorReview.js
import React, { useState } from 'react';
import './Form.css';
import { performCaseAssignment, followCase } from '../service/authService';
import { toast } from 'react-toastify';
import CommentModal from './CommentModal';
import AuditHistoryModal from './AuditHistoryModal';
const DoctorReview = ({ patientDetails, insuranceDetails, labTests, dischargeDetails, caseID,  setCaseID, setAssignmentID, setActionID, setETag, eTag, assignmentID, actionID, setScreen }) => {
  const [physiotherapyRequired, setPhysiotherapyRequired] = useState(dischargeDetails.physiotherapyRequired);
  const [referral, setReferral] = useState('Patient successfully treated for acute appendicitis with appendectomy. Recommend follow-up with primary care physician in 1 week. Monitor for signs of infection. Refer to physiotherapy for abdominal muscle recovery. Continue prescribed antibiotics and pain management regimen. Follow-up ultrasound in 4 weeks to ensure complete recovery.');
  const [notes, setNotes] = useState('Maintain a high-fiber diet, including fruits and vegetables, to support digestive health and potentially reduce the risk of appendicitis. Stay hydrated.');
  const [showModal, setShowModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  
  const handleOpenModal = () => {
    setIsModalOpen(true);
};

const handleCloseModal = () => {
    setIsModalOpen(false);
};
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Placeholder for submit logic
    
    const submitCaseDetailsRequestData = {
      content: {
        DischargeNotes: notes,
        DischargeInstructions: referral,

      }
     };
 
     try {
       const submitCaseDetailsResponse = await performCaseAssignment(eTag, assignmentID, actionID, submitCaseDetailsRequestData);
       console.log('Submit Case Details Success:', submitCaseDetailsResponse.data);
       setETag(submitCaseDetailsResponse.headers.etag);
       setCaseID(submitCaseDetailsResponse.data.data.caseInfo.ID);
       setAssignmentID(submitCaseDetailsResponse.data.data.caseInfo.assignments[0].ID);
       setActionID(submitCaseDetailsResponse.data.data.caseInfo.assignments[0].actions[0].ID);
       
       setScreen(7);
     } catch (error) {
       console.error('Error submitting case details:', error);
     }
    
  };

  const handleTransfer = () => {
    // Add logic to handle case transfer to another junior doctor
    console.log('Transferring case');
  };

  const handleFollow = async (e) => {
    e.preventDefault();
    // Placeholder for submit logic
    
    const followCaseData = {
        users: [
          {
            ID: "ramesh@sampleconst"
          }
        ]
     };
 
     try {
       const responseData = await followCase(followCaseData, caseID);
       console.log('Submit Case Details Success:', responseData);
       toast.success("You're now following this case!");

     } catch (error) {
       console.error('Error submitting case details:', error);
     }
    
  };

  const handlePostPulse = async (e) => {
    toast.success('Your messaged posted to the case successfully!');
    
  };
  

  return (
    <div className="container">
      <h2>Doctor Review - assigned to a doctor </h2>
      <h4>The intent of this screen for the doctor to review the information and add additional instruction for Discharge notes, Physio and Referral.</h4>
      <div className="accordion">
        <div className="accordion-item">
          <h3>Patient Details</h3>
          <div>
            <p>First Name: {patientDetails.firstName}</p>
            <p>Last Name: {patientDetails.lastName}</p>
            <p>Address: {patientDetails.address}</p>
            <p>Email: {patientDetails.email}</p>
            <p>Phone: {patientDetails.phone}</p>
          </div>
        </div>
        
        <div className="accordion-item">
          <h3>Insurance Details</h3>
          <div>
            <p>Provider: {insuranceDetails.insuranceProvider}</p>
            <p>Policy Number: {insuranceDetails.policyNumber}</p>
            <p>Group Number: {insuranceDetails.groupNumber}</p>
            <p>Coverage Start Date: {insuranceDetails.PolicyStartDate}</p>
            <p>Coverage End Date: {insuranceDetails.PolicyEndDate}</p>
          </div>
        </div>
        
        <div className="accordion-item">
          <h3>Lab Tests</h3>
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
        </div>
        
        <div className="accordion-item">
          <h3>Discharge Info</h3>
          <div>
            <p>Discharge Status: {dischargeDetails.DischargeStatus}</p>
            <p>Discharge Summary: {dischargeDetails.DischargeSummary}</p>
            <p>Discharge Instructions: {dischargeDetails.DischargeInstructions}</p>
            <p>Discharge Diagnoses: {dischargeDetails.DischargeDiagnoses}</p>
            <p>Discharge Notes: {dischargeDetails.DischargeNotes}</p>
            <p>Follow-up Appointment Date: {dischargeDetails.FollowupAppointmentDate}</p>
            <p>Follow-up Appointment Location: {dischargeDetails.FollowupAppointmentLocation}</p>
          </div>
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
        </div>
      </div>

      <form>
        <div className="form-group">
          <label>Physiotherapy Required</label>
          <input 
            type="text" 
            value={physiotherapyRequired} 
            onChange={(e) => setPhysiotherapyRequired(e.target.value)} 
            className="form-control" 
          />
        </div>
        <div className="form-group">
          <label>Referral to other Speciality</label>
          <input 
            type="text" 
            value={referral} 
            onChange={(e) => setReferral(e.target.value)} 
            className="form-control" 
          />
        </div>
        <div className="form-group">
          <label>Notes</label>
          <textarea 
            value={notes} 
            onChange={(e) => setNotes(e.target.value)} 
            className="textarea" 
          />
        </div>
        <button type="button" className="button" onClick={handleSubmit}>Submit</button>
        <button type="button" className="button" onClick={handleOpenModal}>Audit History</button>
        <button type="button" className="button" onClick={handleFollow}>Follow this case</button>
        <button type="button"  className="mt-5" onClick={handleShow}>Post Pulse comments</button>
        <button type="button" className="button">Cancel</button>
      </form>
      {showModal && ( <CommentModal
        show={showModal}
        handleClose={handleClose}
        handlePostPulse={handlePostPulse}
        caseID = {caseID}
      />
      )}
          {isModalOpen && (
                <AuditHistoryModal caseID={caseID} onClose={handleCloseModal} />
            )}
    </div>
  );
};

export default DoctorReview;
