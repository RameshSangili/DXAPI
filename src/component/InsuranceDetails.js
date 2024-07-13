import React, { useState } from 'react';
import { performCaseAssignment } from '../service/authService';


const InsuranceDetails = ({ setScreen,  caseID,  setCaseID, setAssignmentID, setActionID, setETag, eTag, assignmentID, actionID, setInsuranceDetails }) => {
  const [insuranceProvider, setInsuranceProvider] = useState('HealthFirst');
  const [policyNumber, setPolicyNumber] = useState('HF123456789');
  const [groupNumber, setGroupNumber] = useState('HF987654321');
  const [coverageType, setCoverageType] = useState('Full Coverage');
  const [effectiveDate, setEffectiveDate] = useState('2024-07-01');
  const [expirationDate, setExpirationDate] = useState('2025-07-01');
  const [subscriberName, setSubscriberName] = useState('John Doe');
  const [subscriberDOB, setSubscriberDOB] = useState('1980-01-01');
  const [relationshipToPatient, setRelationshipToPatient] = useState('Self');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const insuranceDetails = {
      insuranceProvider,
      policyNumber,
      groupNumber,
      coverageType,
      effectiveDate,
      expirationDate,
      subscriberName,
      subscriberDOB,
      relationshipToPatient,

    
    };
    setInsuranceDetails(insuranceDetails);
    const insuranceRequestData = {
        content: {
            InsuranceDetails: {
                InsuranceProvider: insuranceProvider,
                CoverageType: coverageType,
                PolicyStatus: "Active",
                PolicyNumber: policyNumber,
                PolicyStartDate: "20240701",
                PolicyEndDate: "20250701",
                PremiumAmount: 1500.5,
                CoverageAmount: 100000,
                BenefitPeriod: 5,
                WaitingPeriod: 30,
                InflationProtection: false
            } 
        }
    };
    try {
        const submitCaseDetailsResponse = await performCaseAssignment(eTag, assignmentID, actionID, insuranceRequestData);
        console.log('Submit Case Details Success:', submitCaseDetailsResponse.data);
        setETag(submitCaseDetailsResponse.headers.etag);
        setCaseID(submitCaseDetailsResponse.data.data.caseInfo.ID);
        setAssignmentID(submitCaseDetailsResponse.data.nextAssignmentInfo.ID);
        setActionID(submitCaseDetailsResponse.data.data.caseInfo.assignments[0].actions[0].ID);
        
      setScreen(3);
    } catch (error) {
      console.error('Error submitting insurance details:', error);
    }
  };

  return (
    <div>
      <h2>Insurance Details</h2>
      <h4>The intent of this screen for the discharge specialist to capture the insurance details</h4>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Insurance Provider:</label>
          <input  type="text" value={insuranceProvider} onChange={(e) => setInsuranceProvider(e.target.value)} required />
        </div>
        <div>
          <label>Policy Number:</label>
          <input type="text" value={policyNumber} onChange={(e) => setPolicyNumber(e.target.value)} required />
        </div>
        <div>
          <label>Group Number:</label>
          <input type="text" value={groupNumber} onChange={(e) => setGroupNumber(e.target.value)} required />
        </div>
        <div>
          <label>Coverage Type:</label>
          <input type="text" value={coverageType} onChange={(e) => setCoverageType(e.target.value)} required />
        </div>
        <div>
          <label>Effective Date:</label>
          <input type="date" value={effectiveDate} onChange={(e) => setEffectiveDate(e.target.value)} required />
        </div>
        <div>
          <label>Expiration Date:</label>
          <input type="date" value={expirationDate} onChange={(e) => setExpirationDate(e.target.value)} required />
        </div>
        <div>
          <label>Subscriber Name:</label>
          <input type="text" value={subscriberName} onChange={(e) => setSubscriberName(e.target.value)} required />
        </div>
        <div>
          <label>Subscriber Date of Birth:</label>
          <input type="date" value={subscriberDOB} onChange={(e) => setSubscriberDOB(e.target.value)} required />
        </div>
        <div>
          <label>Relationship to Patient:</label>
          <input type="text" value={relationshipToPatient} onChange={(e) => setRelationshipToPatient(e.target.value)} required />
        </div>
        <button type="submit">Next</button>
      </form>
    </div>
  );
};

export default InsuranceDetails;
