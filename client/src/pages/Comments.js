import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Card, Button, Form, Container, Row, Col } from "react-bootstrap";

function Comments() {
  const { id } = useParams();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [artName, setArtName] = useState("");
  const backend = "https://languagesbackend.onrender.com";

  const fetchComments = async () => {
    try {
      const response = await axios.get(`${backend}/api/comments`);
      setComments(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchArtName = async () => {
    try {
      const response = await axios.get(`${backend}/api/art/${id}`);
      setArtName(response.data.data.data.Art_Form);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchComments();
    fetchArtName();
  }, [id]);

  const handleAddComment = async () => {
    try {
      await axios.post(`${backend}/api/comments`, {
        Page: "art",
        Page_ID: id,
        Comment: newComment,
      });
      setNewComment(""); // Clear the input field
      // Refresh comments after adding a new one
      fetchComments();
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateComment = async (commentId, updatedComment) => {
    try {
      await axios.patch(`${backend}/api/comments/${commentId}`, {
        Comment: updatedComment,
      });
      // Refresh comments after updating
      fetchComments();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(`${backend}/api/comments/${commentId}`);
      // Refresh comments after deleting
      fetchComments();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <h1 className="mt-4 mb-4">{artName}</h1>
      <Row>
        <Col md={6}>
          <Form>
            <Form.Group controlId="newComment">
              <Form.Label>New Comment</Form.Label>
              <Form.Control
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" onClick={handleAddComment}>
              Add Comment
            </Button>
          </Form>
        </Col>
      </Row>
      <Row className="mt-4">
        {comments.map((comment) => (
          <Col key={comment.Comment_ID} md={4} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Text>{comment.Comment}</Card.Text>
                <Button
                  variant="info"
                  onClick={() => {
                    const updatedComment = prompt(
                      "Enter updated comment:",
                      comment.Comment
                    );
                    if (updatedComment !== null) {
                      handleUpdateComment(comment.Comment_ID, updatedComment);
                    }
                  }}
                >
                  Update
                </Button>
                <Button
                  variant="danger"
                  className="ml-2"
                  onClick={() => handleDeleteComment(comment.Comment_ID)}
                >
                  Delete
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Comments;
