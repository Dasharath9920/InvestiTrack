import React, { useState } from 'react';
import { Container, Row, Col, Card, Image, Button, Form } from 'react-bootstrap';
import { FaEdit, FaSave, FaCamera, FaUser } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { ACCESS_TOKEN } from '../constants/constants';
import { fetchAndUpdateUserDetails } from '../services/userService';

const Profile = () => {
  const user = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [file, setFile] = useState<any>(null);

  const handleUploadProfile = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const authToken = JSON.parse(localStorage.getItem(ACCESS_TOKEN) || '{}');
    const formData = new FormData();
    formData.append('name', 'profilePicture');
    formData.append('profilePicture', file);

    try{
      const response: any = await fetch('http://localhost:3000/api/users/upload-profile-picture', {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });

      if(response.ok){
        console.log('Profile picture uploaded successfully');
        setFile(null);
        setIsHovering(false);
        fetchAndUpdateUserDetails(dispatch);
      } else {
        throw new Error('Failed to upload profile picture');
      }
    } catch (err) {
      console.log('Error uploading profile picture: ', err);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  return (
    <Container className="my-5">
      <Row>
        <Col md={4}>
          <Card className="text-center">
            <Card.Body>
              <div 
                className="position-relative d-inline-block mb-3"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                style={{width: '150px', height: '150px'}}
              >
                {user.profilePicture ? (
                  <Image
                    src={user.profilePicture}
                    roundedCircle
                    className="mb-3"
                    style={{ width: '150px', height: '150px' }}
                  />
                ) : (
                  <div 
                    className="d-flex justify-content-center align-items-center bg-light rounded-circle"
                    style={{ width: '150px', height: '150px' }}
                  >
                    <FaUser size={64} color="#6c757d" />
                  </div>
                )}
              <div className="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center" style={{ background: 'rgba(0,0,0,0.5)', borderRadius: '50%', cursor: 'pointer', visibility: isHovering ? 'visible' : 'hidden' }}>
                  <label htmlFor="profilePictureInput" style={{ cursor: 'pointer' }}>
                    <FaCamera color="white" size={24} />
                  </label>
                  <input
                    id="profilePictureInput"
                    type="file"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                  />
                </div>
              </div>
              <Card.Title>{user.username}</Card.Title>
              <Card.Text>Hyderabad, India</Card.Text>
              <Button variant="outline-primary" className="mt-2" disabled={!file} onClick={(e) => handleUploadProfile(e)}>
                {user.profilePicture? 'Update Profile Picture': 'Upload Profile Picture'}
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={8}>
          <Card>
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Profile Information</h2>
                {isEditing ? (
                  <Button variant="success" onClick={() => setIsEditing(false)}>
                    <FaSave className="me-2" /> Save
                  </Button>
                ) : (
                  <Button variant="primary" onClick={() => setIsEditing(true)}>
                    <FaEdit className="me-2" /> Edit
                  </Button>
                )}
              </div>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={user.username}
                    readOnly={!isEditing}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={user.email}
                    readOnly={!isEditing}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Bio</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="bio"
                    value={'Software developer passionate about creating beautiful and functional web applications.'}
                    readOnly={!isEditing}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Location</Form.Label>
                  <Form.Control
                    type="text"
                    name="location"
                    value={'Hyderabad, India'}
                    readOnly={!isEditing}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Website</Form.Label>
                  <Form.Control
                    type="url"
                    name="website"
                    value={'https://dasharath-9920.netlify.app/'}
                    readOnly={!isEditing}
                  />
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;