import React, { useState } from 'react';
import { Jumbotron, Container, CardColumns, Card, Modal, Button, Row, Col, Image, ListGroup } from 'react-bootstrap';
import { GET_ME } from "../utils/queries"
import { REMOVE_RECIPE } from '../utils/mutations';
import Auth from '../utils/auth';
// import { removeRecipeId } from '../utils/localStorage';
import { useQuery, useMutation } from "@apollo/client";


const SavedRecipes = () => {
  const { loading, data } = useQuery(GET_ME);
  let userData = data?.me || {};
  // removed error from [removeRecipe, {error}] since we don't call it.
  const [removeRecipe] = useMutation(REMOVE_RECIPE);
  console.log(userData);
  const [recipe, setRecipe] = useState({});
  const [showModal, setShowModal] = useState(false);

  // create function that accepts the recipe's mongo _id value as param and deletes the recipe from the database
  const handleDeleteRecipes = async (id) => {
    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      console.log(id);
      await removeRecipe({
        variables: {
          id: id,
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  // if data isn't here yet, say so
  if (loading) {
    return (<h2>LOADING...</h2>);
  }

  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Need some ideas?</h1>
        </Container>
      </Jumbotron>
      {/* added another div- don't know if needed, but if want to set background */}
      <div className='wrap' 
      // style={backgroundPic}
      >
      <Container>
        <h2> Need to figure out how to call api to pull random recipes </h2>
        <h2> Currently showing saved recipes...  </h2>
            <h2>
          {userData.savedRecipes.length
            ? `Viewing ${userData.savedRecipes.length} saved ${userData.savedRecipes.length === 1 ? 'recipe' : 'recipes'}:`
            : 'You have no saved recipes!'}
        </h2>
        <CardColumns>
          {userData.savedRecipes.map((recipe) => {
            return (
              <Card 
                key={recipe.recipeId} 
                border='dark'
                className="savedRecipeCard"
                >
                {recipe.thumbnail_url ? (
                <Card.Img 
                  src={recipe.thumbnail_url} 
                  alt={`The image for ${recipe.name}`} 
                  variant='top' 
                  />
                ) : null}
                <Card.Body>
                  <Card.Title>{recipe.name}</Card.Title>
                  {/* <p className='small'>Authors: {recipe.authors}</p> */}
                  <Card.Text>{recipe.description}</Card.Text>
                  <Button
                    className="btn-block btn- border-dark"
                    variant="light"
                    onClick={() => {
                      setRecipe(recipe);
                      setShowModal(true);
                    }}
                  >
                    View this Recipe!
                  </Button>
                  <Button className='btn-block btn-danger' onClick={() => handleDeleteRecipes(recipe.id)}>
                    Delete this Recipe!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
      </div>
      {/* set modal data up */}
      <Modal
        size="xl"
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby="recipe-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title id="recipe-modal">
            <h2>{recipe.name}</h2>
            <h5>{recipe.description}</h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col xs={12} md={3}>
            {recipe.thumbnail_url ? (
              <Image
                src={recipe.thumbnail_url}
                alt={`The thumbnail image for ${recipe.name}`}
                fluid
              />
            ) : null}
            </Col>
            <Col xs={12} md={3}>
                  <h4>Ingredients</h4>
                  <ListGroup variant="flush">
                    {recipe.ingredients &&
                      recipe.ingredients.map((ingredient, index) => {
                          return <ListGroup.Item key={index}>{ingredient}</ListGroup.Item>;
                        })
                      }
                  </ListGroup>
            </Col>
            <Col xs={12} md={6}>
              <h4>Directions</h4>
              <ListGroup variant="flush">
                {recipe.directions &&
                  recipe.directions.map((direction, index) => {
                    return <ListGroup.Item key={index}>{direction}</ListGroup.Item>;
                  })}
              </ListGroup>
            </Col>
          </Row>
          <Container handleModalClose={() => setShowModal(false)}>
          </Container>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SavedRecipes;
