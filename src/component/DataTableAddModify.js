import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ModalDialog from './ModalDialog';
import { retrieveDataPage, addUpdateDataTable } from '../service/authService';

const DataTableAddModify = () => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    // Fetch physicians from the API
   
    fetchPhysicians();
  }, []);

 
  const fetchPhysicians = async () => {
    try {
        const requestData = 
            {
                includeTotalCount: true
              
        };
        const response = await retrieveDataPage(requestData, "D_PhysicianDetailsList");
      setData(response.data.data);
      console.log(' fetching physicians:', data);
    } catch (error) {
      console.error('Error fetching physicians:', error);
    }
  };

  const handleSave = async (formData) => {
    const requestData = 
            {
                
                    data: {
                      PhoneNumber: formData.PhoneNumber,
                      PhysicianName: formData.PhysicianName,
                      PhysicianID: formData.PhysicianID,
                      Specialty: formData.Specialty,
                      Email: formData.Email,
                      MedicalSchool: formData.MedicalSchool,
                      YearsOfExperience: formData.YearsOfExperience,
                      BoardCertified: formData.BoardCertified,
                      LanguagesSpoken: formData.LanguagesSpoken,
                      HospitalAffiliations: formData.HospitalAffiliations,
                      pyGUID: formData.pyGUID
                    }      
        };
      if (editData) {
        const requestData = 
            {
                
                    data: {
                      PhoneNumber: editData.PhoneNumber,
                      PhysicianName: editData.PhysicianName,
                      PhysicianID: editData.PhysicianID,
                      Specialty: editData.Specialty,
                      Email: editData.Email,
                      MedicalSchool: editData.MedicalSchool,
                      YearsOfExperience: editData.YearsOfExperience,
                      BoardCertified: editData.BoardCertified,
                      LanguagesSpoken: editData.LanguagesSpoken,
                      HospitalAffiliations: editData.HospitalAffiliations,
                      pyGUID: editData.pyGUID
                    }      
        };
        
      } 
      try {
        
        const response = await addUpdateDataTable(requestData, "D_PhysicianDetailsSavable");
      setData(response.data);
      console.log(' fetching physicians:', data);
      fetchPhysicians();
      setShowModal(false);
      setEditData(null);
    } catch (error) {
      console.error('Error fetching physicians:', error);
    }

     
    
  };

  const handleAddClick = () => {
    setEditData(null);
    setShowModal(true);
  };

  const handleEditClick = (record) => {
    setEditData(record);
    setShowModal(true);
  };

  return (
    <div>
      <button onClick={handleAddClick}>Add New Physician</button>
      <table>
        <thead>
          <tr>
            <th>Physician Name</th>
            <th>Years Of Experience</th>
            <th>Languages Spoken</th>
            <th>Board Certified</th>
            <th>Hospital Affiliations</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(data) && data.length > 0 ? (
            data.map((record) => (
              <tr key={record.pyGUID}>
                <td>{record.PhysicianName}</td>
                <td>{record.YearsOfExperience}</td>
                <td>{record.LanguagesSpoken}</td>
                <td>{record.BoardCertified ? 'Yes' : 'No'}</td>
                <td>{record.HospitalAffiliations}</td>
                <td>
                  <button onClick={() => handleEditClick(record)}>Edit</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No data available</td>
            </tr>
          )}
        </tbody>
      </table>
      <ModalDialog
        show={showModal}
        handleClose={() => setShowModal(false)}
        handleSave={handleSave}
        initialData={editData}
      />
    </div>
  );
};

export default DataTableAddModify;
