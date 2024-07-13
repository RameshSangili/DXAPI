import React, { useRef, useState } from 'react';
import InsuranceAndPatientDetails from './InsuranceAndPatientDetails';
import './DischargeDetails.css';
import { performCaseAssignment, uploadAttachments } from '../service/authService';

const DischargeDetails = ({patientDetails, insuranceDetails, labTests, caseID,  setCaseID, setAssignmentID, setActionID, setETag, eTag, assignmentID, actionID, setScreen, dischargeDetails, setDischargeDetails}) => {
  const [formData, setFormData] = useState({
    AdmissionDate: '2024-07-01',
    DischargeDate: '2024-07-05',
    DischargeDiagnoses: 'Appendicitis',
    DischargeInstructions: 'Rest for one week and avoid heavy lifting.',
    DischargeInstructionsDocument: '',
    DischargeMedications: [
      { name: 'Ibuprofen', dosage: '200mg', startDate: '2024-07-01', endDate: '2024-07-20' },
      { name: 'Paracetamol', dosage: '500mg', startDate: '2024-07-01', endDate: '2024-07-20' },
    ],
    DischargeNotes: 'Patient responded well to the treatment.',
    DischargeStatus: 'Stable',
    DischargeSummary: 'Patient discharged in stable condition after successful appendectomy.',
    DischargeSummaryDocument: '',
    DischargeType: 'Planned',
    FollowupAppointmentDate: '2024-09-12',
    FollowupAppointmentLocation: 'General Surgery Department',
    FollowupAppointmentTime: '1000',  
  } );

  const fileInput = useRef(); /* create a ref*/
  const [file, setFile] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

 

  const handleFileChange = async (e) => {
    e.preventDefault();
    setFile(e.target.files[0]);
    const data = new FormData();
    if (e.target.files[0]) {
      data.append('file', e.target.files[0]);
    }

    try {
      const uploadAttachmentResponseData = await uploadAttachments(data, caseID);
      console.log('Success:', uploadAttachmentResponseData.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleMedicationChange = (index, e) => {
    const { name, value } = e.target;
    const medications = [...formData.DischargeMedications];
    medications[index][name] = value;
    setFormData({ ...formData, DischargeMedications: medications });
  };

  const addMedication = () => {
    setFormData({
      ...formData,
      DischargeMedications: [...formData.DischargeMedications, { name: '', dosage: '', startDate: '', endDate: '' }],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Placeholder for submit logic
    const dischargeNotes = JSON.stringify(formData);
    //const medicationsData = formData.DischargeMedications.map(({lat, lon}) => `Medicine Name: ${name},Dosage: ${dosage}, StartDate: ${startDate},  End Date: ${endDate}`).join('|');
const medicationsData = formData.DischargeMedications.reduce((result, item) => {
  return `${result} Medicine Name: ${item.name}, Dosage: ${item.dosage}|`
}, "");

console.log(medicationsData)
    const submitCaseDetailsRequestData = {
      content: {
        
        DischargeInfo: {
          DischargeInstructions: medicationsData,
          DischargeStatus: formData.DischargeStatus,
          DischargeReason: formData.DischargeReason,
          DischargeSummary: formData.DischargeSummary,
          DischargeDiagnoses: formData.DischargeDiagnoses,
          DischargeNotes: formData.DischargeDate,
          FollowupAppointmentDate: formData.FollowupAppointmentDate,
          FollowupAppointmentInstructions: formData.FollowupAppointmentInstructions,
          FollowupAppointmentLocation: formData.FollowupAppointmentLocation
        }
      
      }
     };
 
     try {
       const submitCaseDetailsResponse = await performCaseAssignment(eTag, assignmentID, actionID, submitCaseDetailsRequestData);
       console.log('Submit Case Details Success:', submitCaseDetailsResponse.data);
       setETag(submitCaseDetailsResponse.headers.etag);
       setCaseID(submitCaseDetailsResponse.data.data.caseInfo.ID);
       setAssignmentID(submitCaseDetailsResponse.data.data.caseInfo.assignments[0].ID);
       setActionID(submitCaseDetailsResponse.data.data.caseInfo.assignments[0].actions[0].ID);
       dischargeDetails = formData;
       setDischargeDetails(dischargeDetails);
       setScreen(5);
     } catch (error) {
       console.error('Error submitting case details:', error);
     }
    console.log('Submitted data:', formData);
  };

  return (
    <div>
      <InsuranceAndPatientDetails patientDetails={patientDetails} insuranceDetails={insuranceDetails} labTests={labTests} />
      <h1>Discharge Details</h1>
      <h4>The intent of this screen for the discharge nurse to capture the discharge information by reviewing the details collected on the previous screen</h4>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-column">
            <label>Admission Date:</label>
            <input
              type="date"
              name="AdmissionDate"
              value={formData.AdmissionDate}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-column">
            <label>Discharge Date:</label>
            <input
              type="date"
              name="DischargeDate"
              value={formData.DischargeDate}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-column">
            <label>Discharge Diagnoses:</label>
            <input
              type="text"
              name="DischargeDiagnoses"
              value={formData.DischargeDiagnoses}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-column">
            <label>Discharge Status:</label>
            <input
              type="text"
              name="DischargeStatus"
              value={formData.DischargeStatus}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-column">
            <label>Discharge Instructions:</label>
            <textarea
              name="DischargeInstructions"
              value={formData.DischargeInstructions}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-column">
            <label>Discharge Instructions Document:</label>
            <input
              type="file"
              name="DischargeInstructionsDocument"
              ref={fileInput} 
              onChange={handleFileChange}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-column">
            <label>Discharge Notes:</label>
            <textarea
              name="DischargeNotes"
              value={formData.DischargeNotes}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-column">
            <label>Discharge Summary:</label>
            <textarea
              name="DischargeSummary"
              value={formData.DischargeSummary}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-column">
            <label>Discharge Summary Document:</label>
            <input
              type="file"
              name="DischargeSummaryDocument"
              onChange={handleInputChange}
            />
          </div>
          <div className="form-column">
            <label>Discharge Type:</label>
            <input
              type="text"
              name="DischargeType"
              value={formData.DischargeType}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-column">
            <label>Follow-up Appointment Date:</label>
            <input
              type="date"
              name="FollowupAppointmentDate"
              value={formData.FollowupAppointmentDate}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-column">
            <label>Follow-up Appointment Location:</label>
            <input
              type="text"
              name="FollowupAppointmentLocation"
              value={formData.FollowupAppointmentLocation}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-column">
            <label>Follow-up Appointment Time:</label>
            <input
              type="text"
              name="FollowupAppointmentTime"
              value={formData.FollowupAppointmentTime}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-column">
            <label>Discharge Medications:</label>
            <table>
              <thead>
                <tr>
                  <th>Medicine Name</th>
                  <th>Dosage</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                </tr>
              </thead>
              <tbody>
                {formData.DischargeMedications.map((medication, index) => (
                  <tr key={index}>
                    <td>
                      <input
                        type="text"
                        name="name"
                        value={medication.name}
                        onChange={(e) => handleMedicationChange(index, e)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="dosage"
                        value={medication.dosage}
                        onChange={(e) => handleMedicationChange(index, e)}
                      />
                    </td>
                    <td>
                      <input
                        type="date"
                        name="startDate"
                        value={medication.startDate}
                        onChange={(e) => handleMedicationChange(index, e)}
                      />
                    </td>
                    <td>
                      <input
                        type="date"
                        name="endDate"
                        value={medication.endDate}
                        onChange={(e) => handleMedicationChange(index, e)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button type="button" onClick={addMedication}>
              Add Medication
            </button>
          </div>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default DischargeDetails;
