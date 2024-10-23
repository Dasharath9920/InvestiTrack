import React, { useState } from 'react';
import { Container, Row, Col, Card, Image, Button, Form } from 'react-bootstrap';
import { FaEdit, FaSave } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const Profile = () => {
   const user = useSelector((state: any) => state.user);
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user.username,
    email: user.email,
    bio: 'Software developer passionate about creating beautiful and functional web applications.',
    location: 'Hyderabad, India',
    website: 'https://dasharath-9920.netlify.app/',
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically send the updated data to your backend
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData(prevData => ({ ...prevData, [name]: value }));
  };

  return (
    <Container className="my-5">
      <Row>
        <Col md={4}>
          <Card className="text-center">
            <Card.Body>
              <Image
                src="https://via.placeholder.com/150"
                roundedCircle
                className="mb-3"
                style={{ width: '150px', height: '150px' }}
              />
              <Card.Title>{profileData.name}</Card.Title>
              <Card.Text>{profileData.location}</Card.Text>
              <Button variant="outline-primary" className="mt-2">
                Change Profile Picture
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
                  <Button variant="success" onClick={handleSave}>
                    <FaSave className="me-2" /> Save
                  </Button>
                ) : (
                  <Button variant="primary" onClick={handleEdit}>
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
                    value={profileData.name}
                    onChange={handleChange}
                    readOnly={!isEditing}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleChange}
                    readOnly={!isEditing}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Bio</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="bio"
                    value={profileData.bio}
                    onChange={handleChange}
                    readOnly={!isEditing}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Location</Form.Label>
                  <Form.Control
                    type="text"
                    name="location"
                    value={profileData.location}
                    onChange={handleChange}
                    readOnly={!isEditing}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Website</Form.Label>
                  <Form.Control
                    type="url"
                    name="website"
                    value={profileData.website}
                    onChange={handleChange}
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