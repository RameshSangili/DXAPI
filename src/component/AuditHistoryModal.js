// src/AuditHistoryModal.js
import React, { useState, useEffect } from 'react';
//import './AuditHistoryModal.css';
import { retrieveDataPage } from '../service/authService';

const AuditHistoryModal = ({ caseID, onClose }) => {
    const [auditHistory, setAuditHistory] = useState([]);
    const [visibleItems, setVisibleItems] = useState(5);
    const [loading, setLoading] = useState(false);

    const fetchAuditHistory = async () => {
        try {
            const requestData = {
                    dataViewParameters: {
                        CaseInstanceKey: caseID
                    }
            };
            const response = await retrieveDataPage(requestData, "D_pyWorkHistory");
            if(response && response.data) { 
                setAuditHistory(response.data.data);
            }
        console.log(' fetching response:', auditHistory);
        } catch (error) {
        console.error('Error fetching response:', error);
        }
    };
    
    useEffect(() => {
       
            fetchAuditHistory();

    }, [  caseID]);

    const loadMoreItems = () => {
        setVisibleItems(prevVisibleItems => prevVisibleItems + 5);
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>

                <h4>Audit History for Case ID: {caseID}</h4>
                <table className="audit-table">
                    <thead>
                        <tr>
                            <th>pxTimeCreated</th>
                            <th>pyPerformer</th>
                            <th>pyMessageKey</th>
                        </tr>
                    </thead>
                    <tbody>
                        {auditHistory.slice(0, visibleItems).map((item, index) => (
                            <tr key={index}>
                                <td>{item.pxTimeCreated}</td>
                                <td>{item.pyPerformer}</td>
                                <td>{item.pyMessageKey}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {visibleItems < auditHistory.length && (
                    <button onClick={loadMoreItems} disabled={loading}>
                        {loading ? 'Loading...' : 'Load More'}
                    </button>
                )}
            </div>
        </div>
    );
};

export default AuditHistoryModal;
