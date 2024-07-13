// SlideInModal.js
import React, { useState, useEffect } from 'react';
import './SlideInModal.css'; // Create this file for modal styling
import { getRecents } from '../service/authService';

const SlideInModal = ({ isOpen, onClose }) => {
    const [data, setData] = useState([]);

  
    useEffect(()  => {
        if (isOpen) {
            try {
            
                const response =  getRecents();
                setData(response.data.recents);
    
              console.log(' fetching physicians:', data);
            } catch (error) {
              console.error('Error fetching physicians:', error);
            }
        }
    }, [isOpen]);

    return (
        <div className={`slide-in-modal ${isOpen ? 'open' : ''}`}>
            <div className="modal-content">
                <button onClick={onClose} className="close-button">Cancel</button>
                <ul>
                    {data.map(item => (
                        <li key={item.resourceID}>
                            {item.resourceID} - {item.name}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default SlideInModal;
