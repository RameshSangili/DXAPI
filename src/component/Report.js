import React, { useEffect, useState } from 'react';
import PieChartComponent from './PieChartComponent';
import { retrieveDataPage } from '../service/authService';

const Report = () => {
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

    return (
        <div>
            <h2>Discharge case Status Distribution</h2>
            <PieChartComponent data={data} />
        
        </div>
    );
};

export default Report;
