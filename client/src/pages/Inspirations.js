import React, { useState } from 'react';
import { Jumbotron, Container, CardColumns, Card, Form, Modal, Button, Row, Col, Image, ListGroup } from 'react-bootstrap';
import { GET_DINNER_INSP, GET_DESSERT_INSP, GET_ME } from "../utils/queries"
import { REMOVE_RECIPE, SAVE_RECIPE } from '../utils/mutations';
import Auth from '../utils/auth';
import Mosaic from '../components/Mosaic';
// import { removeRecipeId } from '../utils/localStorage';
import { useQuery, useMutation, useApolloClient } from "@apollo/client";

const dinnerArr = ['chicken', 'beef', 'fish']
const dessertArr = 'sugar chocolate'

const InspRecipes = () => {
  // create state for holding returned graphql data
  const [searchedRecipes, setSearchedRecipes] = useState([]);
  // create state for holding clicked recipe
  const [recipe, setRecipe] = useState({});
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState("");
  // set modal display state
  const [showModal, setShowModal] = useState(false);
  // error state variable
  const [error, setError] = useState("");
  // create state to hold saved recipeId values
  // this is used to utilize useEffect hook to save savedRecipeIds to local storage.
  // We aren't using local storage - would just use for MongoDB?
  // ******* const [savedRecipeIds, setSavedRecipeIds] = useState(getSavedRecipeIds());

  // save recipe using graphql
  const [saveRecipe] = useMutation(SAVE_RECIPE);
  // rremoved loading from const { loading, data } since we aren't calling it... yet.
  const { data } = useQuery(GET_ME);

  const client = useApolloClient();

  const user = data?.me;
  // if (!user?.username) {
  //   return (
  //     <h4>
  //       You need to be logged in to see this page. Use the navigation links
  //       above to sign up or log in!
  //     </h4>
  //   );
  // }

  // create method to search for recipes and set state on form submit
  const handleFormSubmitDessert = async (event) => {
    event.preventDefault();   
    const { data } = await client.query({
      query: GET_DESSERT_INSP,
      variables: { dessertArr: dessertArr },
    });
    setSearchedRecipes(data.getDessertInsp);
  };

  const handleFormSubmitDinner = async (event) => {
    event.preventDefault();    
    const { data } = await client.query({
      query: GET_DINNER_INSP,
      variables: { dinnerArr: dinnerArr },
    });
    setSearchedRecipes(data.getDinnerInsp);
  };
  // create function to handle saving a book to our database
  const handleSaveRecipe = async (recipe) => {
    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      console.log(
        recipe.name,
        recipe.id,
        recipe.description,
        recipe.thumbnail_url,
        recipe.ingredients,
        recipe.directions
      );
      await saveRecipe({
        variables: {
          name: recipe.name,
          id: recipe.id,
          description: recipe.description,
          thumbnail_url: recipe.thumbnail_url,
          ingredients: recipe.ingredients,
          directions: recipe.directions,
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Jumbotron fluid className="text-light bg-dark jumbo">
        <Container>
          <h1>Need some inspirations?</h1>
              <Col xs={12} md={4}>
                <Button type="submit" variant="success" size="lg" className='my-2' onClick={handleFormSubmitDessert}>
                  Find Dessert Recipes!
                </Button>
                <Button type="submit" variant="success" size="lg" onClick={handleFormSubmitDinner}>
                  Find Dinner Recipes!
                </Button>
              </Col>
        </Container>
      </Jumbotron>
      {searchedRecipes.length ? (
        <Container></Container>
      ) : (
        <Mosaic />
      )}
      <Container>
        <h2>
          {searchedRecipes.length
            ? `Viewing ${searchedRecipes.length} results:`
            : null}
        </h2>
        <CardColumns>
          {searchedRecipes.map((recipe) => {
            return (
              <Card
                key={recipe.id}
                border="dark"
                className="cp"
              >
                {recipe.thumbnail_url ? (
                  <Card.Img
                    src={recipe.thumbnail_url}
                    alt={`The thumbnail image for ${recipe.name}`}
                    variant="top"
                  />
                ) : null}
                <Card.Body>
                  <Card.Title>{recipe.name}</Card.Title>
                  {/* <p className='small'>Authors: {book.authors}</p> */}
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
                  {Auth.loggedIn() && (
                    <Button
                      disabled={user.savedRecipeIds?.some(
                        (savedRecipeId) => savedRecipeId === recipe.id
                      )}
                      className="btn-block btn-info"
                      onClick={() => handleSaveRecipe(recipe)}
                    >
                      {user.savedRecipeIds?.some(
                        (savedRecipeId) => savedRecipeId === recipe.id
                      )
                        ? "This recipe has already been saved!"
                        : "Save this Recipe!"}
                    </Button>
                  )}
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
      {/* set modal data up */}
      <Modal
        size="xl"
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby="recipe-modal"
        // className="my-modal"
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
                    const arraySearch = searchInput.split(" ");
                    const isPresent = arraySearch.reduce(
                      (is, word) => is || ingredient.includes(word),
                      false
                    );
                    if (isPresent) {
                      return (
                        <ListGroup.Item variant="success" key={index}>
                          {ingredient}
                        </ListGroup.Item>
                      );
                    } else {
                      return (
                        <ListGroup.Item key={index}>
                          {ingredient}
                        </ListGroup.Item>
                      );
                    }
                  })}
              </ListGroup>
            </Col>
            <Col xs={12} md={6}>
              <h4>Directions</h4>
              <ListGroup variant="flush">
                {recipe.directions &&
                  recipe.directions.map((direction, index) => {
                    return (
                      <ListGroup.Item key={index}>{direction}</ListGroup.Item>
                    );
                  })}
              </ListGroup>
            </Col>
          </Row>
          <Container handleModalClose={() => setShowModal(false)}></Container>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default InspRecipes;
