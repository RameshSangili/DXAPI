// src/services/authService.js
import axios from 'axios';

const clientId = '16178196299642418162';
const clientSecret = 'A87FFEF8B3EB76EF3079011D54EDDF07';
const tokenUrl = 'https://lab0662.lab.pega.com/prweb/api/oauth2/v1/token';
const apiUrl =  'https://lab0662.lab.pega.com/prweb/api/application/v2/cases?viewType=none&pageName=%3Cstring%3E';

const getAccessToken = async () => {
  const tokenData = {
    grant_type: 'client_credentials',
    client_id: clientId,
    client_secret: clientSecret,
  };

  try {
    const response = await axios.post(tokenUrl, tokenData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    console.log("access token " + response.data.access_token);
    return response.data.access_token;
  } catch (error) {
    console.error('Error fetching access token:', error);
    throw error;
  }
};

const submitCase = async (data) => {
  const accessToken = await getAccessToken();

  try {
    const response = await axios.post(apiUrl, data, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });
    return response;
  } catch (error) {
    console.error('Error submitting case:', error);
    throw error;
  }
};

// Function to submit case details with PATCH request
const performCaseAssignment = async (eTag, assignmentID, actionID, requestData) => {
    const token = await getAccessToken();
    const apiUrl = `https://lab0662.lab.pega.com/prweb/api/application/v2/assignments/${assignmentID}/actions/${actionID}?viewType=none`;
  
    try {
      const response = await axios.patch(apiUrl, requestData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'if-match': `${eTag}`,
        },
      });
      return response;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };

  // Function to submit case details with PATCH request
const performOptionalActions = async (eTag, assignmentID, actionID, requestData) => {
  const token = await getAccessToken();
  const apiUrl = `https://lab0662.lab.pega.com/prweb/app/long-term-care/api/application/v2/assignments/${assignmentID}/actions/${actionID}?viewType=form`;

  try {
    const response = await axios.patch(apiUrl, requestData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'if-match': `${eTag}`,
      },
    });
    return response;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

  // Function to submit case details with PATCH request
const uploadAttachments = async (requestData, caseID) => {
  const token = await getAccessToken();
  const apiUrl = 'https://lab0662.lab.pega.com/prweb/app/long-term-care/api/application/v2/attachments/upload';

  try {
    const response = await axios.post(apiUrl, requestData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`,
        
      },
    });

    const attachUrl = `https://lab0662.lab.pega.com/prweb/app/long-term-care/api/application/v2/cases/${caseID}/attachments`;

    const attachmentID = response.data.ID;
    const attachRequestData = {
      attachments: [
        {
          "type": "File",
          "category": "File",
          "ID": attachmentID
        }
      ]
    };
    const attachResponse = await axios.post(attachUrl, attachRequestData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        
      },
    });
    return attachResponse;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

  // Function to submit case details with PATCH request
  const retrieveDataPage = async (requestData, dataPageName) => {
    const token = await getAccessToken();

    const apiUrl = `https://lab0662.lab.pega.com/prweb/app/long-term-care/api/application/v2/data_views/${dataPageName}`;

    try {
      const response = await axios.post(apiUrl, requestData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          
        },
      });
      return response;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };
  
   // Function to submit case details with PATCH request
   const addUpdateDataTable = async (requestData, dataPageName) => {
    const token = await getAccessToken();

    const apiUrl = `https://lab0662.lab.pega.com/prweb/app/long-term-care/api/application/v2/data/${dataPageName}`;

    try {
      const response = await axios.patch(apiUrl, requestData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          
        },
      });
      return response;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };
  
  
// Function to submit case details with PATCH request
const postPulseMessage = async (requestData) => {
  const token = await getAccessToken();

  const apiUrl = 'https://lab0662.lab.pega.com/prweb/app/long-term-care/api/application/v2/messages';

  try {
    const response = await axios.post(apiUrl, requestData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        
      },
    });
    return response;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
  
// Function to submit case details with PATCH request
const followCase = async (requestData, caseID) => {
  const token = await getAccessToken();

  const apiUrl = `https://lab0662.lab.pega.com/prweb/app/long-term-care/api/application/v2/cases/${caseID}/followers`;
  try {
    const response = await axios.post(apiUrl, requestData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        
      },
    });
    return response;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

// Function to submit case details with PATCH request
const getRecents = async () => {
  const token = await getAccessToken();

  const apiUrl = 'https://lab0662.lab.pega.com/prweb/app/long-term-care/api/application/v2/recents?maxResultsToFetch=15';
  try {
    const response = await axios.get(apiUrl,  {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        
      },
    });
    return response;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

// Function to submit case details with PATCH request
const getCaseDetails = async (requestData, caseID, viewInfo) => {
  const token = await getAccessToken();

  const apiUrl = `https://lab0662.lab.pega.com/prweb/app/long-term-care/api/application/v2/cases/${caseID}/views/${viewInfo}/refresh`;
  try {
    const response = await axios.patch  (apiUrl, requestData,  {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        
      },
    });
    return response;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export { submitCase, performCaseAssignment, uploadAttachments, retrieveDataPage, performOptionalActions, addUpdateDataTable, followCase, postPulseMessage, getCaseDetails, getRecents } ;
