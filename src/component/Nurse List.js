import React, { useEffect, useState } from 'react';
import './MyWorkList.css';
import { retrieveDataPage } from '../service/authService';

const MyWorkList = ({setScreen}) => {
  const [data, setData] = useState([]);

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

  const handleLinkClick = (pxRefObjectInsName, pxTaskLabel) => {
    let path = '';
    switch (pxTaskLabel.trim()) {
      case 'Primary Physician':
        path = `/primary-physician/${pxRefObjectInsName}`;
        break;
      case 'Another Task Label':
        path = `/another-component/${pxRefObjectInsName}`;
        break;
      // Add more cases for other task labels
      default:
        path = `/default-path/${pxRefObjectInsName}`;
        break;
    }
    setScreen(1);
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
