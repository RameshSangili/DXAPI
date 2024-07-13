import React, { useEffect, useState } from 'react';
import './MyWorkList.css';
import { retrieveDataPage, getCaseDetails } from '../service/authService';

const MyWorkList = ({setScreen, SetCaseKey, setIsExistingCase, caseKey}) => {
  const [data, setData] = useState([]);
  
  const [viewInfo, setViewInfo] = useState('');
  const [insuranceData, setInsuranceData] = useState([]);
  useEffect(() => {
    // Fetch physicians from the API
   
  const fetchMyWorkList = async () => {
    try {
        const requestData = 
            {
                dataViewParameters: {
                    UserId:"ramesh@sampleconst"
                },
                includeTotalCount: true,
                paging: {
                    pageNumber: 1,
                    pageSize: 41
                  },
                  query: {
                    select: [
                      {
                        field: "pxRefObjectInsName"
                      },
                      {
                        field: "pxTaskLabel"
                      },
                      {
                        field: "pyLabel"
                      },
                      {
                        field: "pyAssignmentStatus"
                      },
                      {
                        field: "pxUrgencyAssign"
                      },
                      {
                        field: "pzInsKey"
                      },
                      {
                        field: "pxRefObjectKey"
                      },
                      {
                        field: "pxAssignedOperatorID"
                      },
                      
                    ]
                  }
              
        };
        
       

        const response = await retrieveDataPage(requestData, "D_MyUserWorkList");
        const myWorkListResponse = await response.data.data;
      setData(response.data.data);
      console.log(' fetching physicians:', myWorkListResponse);
    } catch (error) {
      console.error('Error fetching physicians:', error);
    }
  }

  fetchMyWorkList();
  }, []);

  const getCaseInformation = async () => {
    try {
       
      const requestData = 
      {
        content: {},
        interestPage: ""
      };
        const response = await getCaseDetails(requestData, caseKey, 'InsuranceDetails');
       /* const insuranceDetails = {
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
        insuranceData.insuranceProvider = esponse.data.data.caseInfo.content.InsuranceDetails.;
        insuranceData.policyNumber,
        insuranceData.groupNumber,
        insuranceData.coverageType,
        insuranceData.effectiveDate,
        insuranceData.expirationDate,
        insuranceData.subscriberName,
        insuranceData.subscriberDOB,
        insuranceData.relationshipToPatient,*/
        setInsuranceData(response.data.data.caseInfo.content.InsuranceDetails);
      console.log(' fetching physicians:', insuranceData);
    } catch (error) {
      console.error('Error fetching physicians:', error);
    }
  };

  const handleLinkClick = (pxRefObjectInsName, pxTaskLabel) => {
    let viewInfo = '';
    SetCaseKey("GNW-LONGTERM-WORK "+ pxRefObjectInsName);
    switch (pxTaskLabel.trim()) {
      case 'Gather Insurance Information':
        setViewInfo('PatientDetails');
        getCaseInformation();
        break;
      case 'Gather Lab Test  Results':
        setViewInfo('InsuranceDetails');
        getCaseInformation();
        break;
      // Add more cases for other task labels
      default:
        viewInfo = `/default-path/${pxRefObjectInsName}`;
        break;
    }
    
  };
 
  return (
    <div className="my-worklist">
      <h2>My Work List</h2>
      <table>
        <thead>
          <tr>
            <th>Case ID</th>
            <th>Task Label</th>
            <th>Assigned Operator</th>
            <th>Status</th>
            <th>Case</th>
            <th>Case Urgency</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.pzInsKey}>
                <td>
                <a href="#" onClick={() => handleLinkClick(item.pxRefObjectInsName, item.pxTaskLabel)}>
                  {item.pxRefObjectInsName}
                </a>
              </td>
              <td>{item.pxTaskLabel}</td>
              <td>{item.pxAssignedOperatorID}</td>
              <td>{item.pyAssignmentStatus}</td>
              <td>{item.pyLabel}</td>
              <td>{item.pxUrgencyAssign}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyWorkList;
