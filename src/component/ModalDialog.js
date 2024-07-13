import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';

const ModalDialog = ({ show, handleClose, handleSave, initialData }) => {
  const [formData, setFormData] = useState({
    PhysicianName: '',
    YearsOfExperience: '',
    LanguagesSpoken: '',
    BoardCertified: false,
    HospitalAffiliations: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      [name]: checked,
    });
  };

  const handleSubmit = () => {
    handleSave(formData);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{initialData ? 'Edit Physician' : 'Add Physician'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Physician Name</Form.Label>
            <Form.Control
              type="text"
              name="PhysicianName"
              value={formData.PhysicianName}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Years Of Experience</Form.Label>
            <Form.Control
              type="number"
              name="YearsOfExperience"
              value={formData.YearsOfExperience}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Languages Spoken</Form.Label>
            <Form.Control
              type="text"
              name="LanguagesSpoken"
              value={formData.LanguagesSpoken}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Check
              type="checkbox"
              label="Board Certified"
              name="BoardCertified"
              checked={formData.BoardCertified}
              onChange={handleCheckboxChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Hospital Affiliations</Form.Label>
            <Form.Control
              type="text"
              name="HospitalAffiliations"
              value={formData.HospitalAffiliations}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalDialog;
