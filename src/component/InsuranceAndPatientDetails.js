import React from 'react';

const InsuranceAndPatientDetails = ({ patientDetails, insuranceDetails, labTests }) => {
  return (
    <div>
      <ul className="tabs">
        <li className="tab">
          <a href="#patientDetails">Patient Details</a>
        </li>
        <li className="tab">
          <a href="#insuranceDetails">Insurance Details</a>
        </li>
        <li className="tab">
          <a href="#labTEstResults">Lab Test Results</a>
        </li>
      </ul>
      <div id="patientDetails" className="tab-content">
        <h2>Patient Details</h2>
        <p>First Name: {patientDetails.firstName}</p>
        <p>Last Name: {patientDetails.lastName}</p>
        <p>Address: {patientDetails.address}</p>
        <p>Phone: {patientDetails.phone}</p>
        <p>Email: {patientDetails.email}</p>
      </div>
      <div id="insuranceDetails" className="tab-content">
        <h2>Insurance Details</h2>
        <p>Provider: {insuranceDetails.insuranceProvider}</p>
        <p>Policy Number: {insuranceDetails.policyNumber}</p>
        <p>Group Number: {insuranceDetails.groupNumber}</p>
        <p>Coverage Start Date: {insuranceDetails.PolicyStartDate}</p>
        <p>Coverage End Date: {insuranceDetails.PolicyEndDate}</p>
      </div>
      <div>
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
    </div>
  );
};

export default InsuranceAndPatientDetails;
