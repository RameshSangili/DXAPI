import React, { useState } from 'react';
import PatientDetails from './component/PatientDetails';
import TreatmentDetails from './component/TreatmentDetails';
import Report from './component/Report';
import Approval from './component/Approval';
import Confirm from './component/Confirm';
import DischargeDetails from './component/DischargeDetails';
import './App.css';
import InsuranceDetails from './component/InsuranceDetails';
import LabTest from './component/LabTest';
import DoctorReview from './component/DoctorReview';
import PhysicianList from './component/PhysicianList';
import MyWorkList from './component/MyWorkList';
import DoctorApproval from './component/DoctorApproval';
import Home from './component/Home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DataTableAddModify from './component/DataTableAddModify';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import SlideInModal from './component/SlideInModal';
import logo from './logo.png';

const App = () => {
  const [caseID, setCaseID] = useState('');
  const [assignmentID, setAssignmentID] = useState('');
  const [eTag, setETag] = useState('');
  const [actionID, setActionID] = useState('');
  const [patientDetails, setPatientDetails] = useState({});
  const [treatmentDetails, setTreatmentDetails] = useState({});
  const [insuranceDetails, setInsuranceDetails] = useState({});
  const [dischargeDetails, setDischargeDetails] = useState({});
  const [labTests, setLabTests] = useState({});
  const [screen, setScreen] = useState(10);
  const [caseKey, SetCaseKey] = useState('');
  const [isExistingCase, setIsExistingCase] = useState(false);
  const [selectedPhysician, setSelectedPhysician] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => {
    setIsModalOpen(true);
};

const handleCloseModal = () => {
    setIsModalOpen(false);
};
  return (
    <Router>
    <div className="app-container">
      <ToastContainer/>
      <header className="top-nav">
        <div>
        <img src={logo} alt="DX API Logo" className="logo" />

        </div>
        {caseID && (
            <div className="app-name">Case ID: {caseID}</div>
         )}
        <span></span>
        <div className="case-info">
          
          <button onClick={() => { /* Logoff logic here */ }}>Logoff</button>
        </div>
      </header>
      
      <main className="main-content">
      <aside className="left-nav">
        <ul>
          <li onClick={() => setScreen(10)}>Home</li>
          <li onClick={() => setScreen(9)}>My Worklist</li>
          <li onClick={() => setScreen(11)}>Reports</li>
          <li onClick={() => setScreen(12)}>Landing Pages </li>
          <li onClick={(handleOpenModal)}>My Recents </li>
        </ul>
      </aside>
      <SlideInModal isOpen={isModalOpen} onClose={handleCloseModal} />

      <div className="main-panel">
      
      
        {screen === 1 && (
          <PatientDetails
            setScreen={setScreen}
            setCaseID={setCaseID}
            setAssignmentID={setAssignmentID}
            setActionID={setActionID}
            setETag={setETag}
            setPatientDetails={setPatientDetails}
          />
        )}
        {screen === 2 && (
          <InsuranceDetails
            setCaseID={setCaseID}
            setAssignmentID={setAssignmentID}
            setActionID={setActionID}
            setETag={setETag}
            caseID={caseID}
            assignmentID={assignmentID}
            actionID={actionID}
            eTag={eTag}
            isExistingCase={isExistingCase}
            setScreen={setScreen}
            setInsuranceDetails={setInsuranceDetails}
            
          />
        )}
        {screen === 3 && (
          <LabTest
          setCaseID={setCaseID}
          setAssignmentID={setAssignmentID}
          setActionID={setActionID}
          setETag={setETag}
          caseID={caseID}
          assignmentID={assignmentID}
          actionID={actionID}
          eTag={eTag}
          labTests={labTests}
            patientDetails={patientDetails}
            insuranceDetails={insuranceDetails}
            treatmentDetails={treatmentDetails}
            dischargeDetails={dischargeDetails}
            setLabTests = {setLabTests}
            setDischargeDetails={setDischargeDetails}
            selectedPhysician = {selectedPhysician}
            setSelectedPhysician= {setSelectedPhysician}
            setScreen={setScreen}
          />
        )}
        {screen === 4 && (
           <DischargeDetails
           setCaseID={setCaseID}
           setAssignmentID={setAssignmentID}
           setActionID={setActionID}
           setETag={setETag}
           caseID={caseID}
           assignmentID={assignmentID}
           actionID={actionID}
           eTag={eTag}
             patientDetails={patientDetails}
             insuranceDetails={insuranceDetails}
             treatmentDetails={treatmentDetails}
             labTests={labTests}
             dischargeDetails={dischargeDetails}
             setDischargeDetails={setDischargeDetails}
             setScreen={setScreen}
             />
        )}
        {screen === 5 && ( <Approval
           setCaseID={setCaseID}
           setAssignmentID={setAssignmentID}
           setActionID={setActionID}
           setETag={setETag}
           caseID={caseID}
           assignmentID={assignmentID}
           actionID={actionID}
           eTag={eTag}
             patientDetails={patientDetails}
             insuranceDetails={insuranceDetails}
             treatmentDetails={treatmentDetails}
             labTests={labTests}
             dischargeDetails={dischargeDetails}
             setDischargeDetails={setDischargeDetails}
             setScreen={setScreen}
             />
            )}
             {screen === 6 && ( <DoctorReview
           setCaseID={setCaseID}
           setAssignmentID={setAssignmentID}
           setActionID={setActionID}
           setETag={setETag}
           caseID={caseID}
           assignmentID={assignmentID}
           actionID={actionID}
           eTag={eTag}
             patientDetails={patientDetails}
             insuranceDetails={insuranceDetails}
             labTests={labTests}
             treatmentDetails={treatmentDetails}
             dischargeDetails={dischargeDetails}
             setScreen={setScreen}
             />
            )}
             {screen === 7 && ( <DoctorApproval
           setCaseID={setCaseID}
           setAssignmentID={setAssignmentID}
           setActionID={setActionID}
           setETag={setETag}
           caseID={caseID}
           assignmentID={assignmentID}
           actionID={actionID}
           eTag={eTag}
             patientDetails={patientDetails}
             insuranceDetails={insuranceDetails}
             labTests={labTests}
             treatmentDetails={treatmentDetails}
             dischargeDetails={dischargeDetails}
             setScreen={setScreen}
             />
            )}
              {screen === 8 && ( <PhysicianList
               setCaseID={setCaseID}
               setAssignmentID={setAssignmentID}
               setActionID={setActionID}
               setETag={setETag}
               caseID={caseID}
               assignmentID={assignmentID}
               actionID={actionID}
               eTag={eTag}
               selectedPhysician = {selectedPhysician}
               setSelectedPhysician= {setSelectedPhysician}
             setScreen={setScreen}
             />
            )}
             {screen === 9 && ( <MyWorkList
               setScreen={setScreen}
               setCaseID={setCaseID}
               caseKey={caseKey}
               SetCaseKey={SetCaseKey}
               isExistingCase={isExistingCase}
               setIsExistingCase={setIsExistingCase}
              />
            )}
            {screen === 10 && ( <Home
               setScreen={setScreen}
             />
            )}
            {screen === 11 && ( <Report
               setScreen={setScreen}
             />
            )}
            {screen === 12 && ( <DataTableAddModify
               setScreen={setScreen}
             />
            )}
          
            </div>
      </main>
    </div>
     
 </Router>
  );
};

export default App;
