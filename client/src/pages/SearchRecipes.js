import React, { useState } from "react";
import { useQuery, useMutation, useApolloClient } from "@apollo/client";
import { SAVE_RECIPE } from "../utils/mutations";
import { GET_RECIPES, GET_ME } from "../utils/queries";
import {
  Jumbotron,
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  CardColumns,
  Grid,
  Modal,
  ListGroup,
  Spinner,
  Image
} from "react-bootstrap";

import Auth from "../utils/auth";
const backgroundArr = require('../utils/pics');
const backgroundPic = {
  backgroundImage: `url(${backgroundArr[0]})`,
  backgroundSize:'contain'
}


const SearchRecipes = () => {
  // create state for holding returned graphql data
  const [searchedRecipes, setSearchedRecipes] = useState([]);
  // create state for holding clicked recipe
  const [recipe, setRecipe] = useState({});
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState("");
  // set modal display state
  const [showModal, setShowModal] = useState(false);

  // create state to hold saved bookId values
  // const [savedRecipeIds, setSavedRecipeIds] = useState(getSavedRecipeIds());

  // save recipe using graphql
  const [saveRecipe] = useMutation(SAVE_RECIPE);
  const { loading, data } = useQuery(GET_ME);

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
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    // graphql query
    const { data } = await client.query({
      query: GET_RECIPES,
      variables: { ingredients: searchInput },
    });

    // console.log(data.getRecipe);
    // const background = data.getRecipe.map(pics => {
    //   return(pics.thumbnail_url)
    // })
    // console.log(background);

    setSearchedRecipes(data.getRecipe);
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
      <Jumbotron fluid className="text-light bg-dark jumbo" >
          <Container>
            <h1>Search for Recipes!</h1>
            <Form onSubmit={handleFormSubmit}>
              <Form.Row>
                <Col xs={12} md={8}>
                  <Form.Control
                    name="searchInput"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    type="text"
                    size="lg"
                    placeholder="Search for a recipe by ingredients"
                  />
                </Col>
                <Col xs={12} md={4}>
                  <Button type="submit" variant="success" size="lg">
                    Submit Search
                  </Button>
                </Col>
              </Form.Row>
            </Form>
          </Container>
      </Jumbotron>
      <div className='wrap' style={backgroundPic}>
      <Container>
        <h2>
          {searchedRecipes.length
            ? `Viewing ${searchedRecipes.length} results:`
            : "Search for a recipe to begin"}
        </h2>
        <CardColumns>
          {searchedRecipes.map((recipe) => {
            return (
              <Card
                key={recipe.id}
                border="dark"
                className="cp"
                onClick={() => {
                  setRecipe(recipe);
                  setShowModal(true);
                }}
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
      </div>
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
                        const arraySearch = searchInput.split(' ');
                        const isPresent = arraySearch.reduce((is, word) => is || ingredient.includes(word), false);
                        if (isPresent) {
                          return <ListGroup.Item variant="success" key={index}>{ingredient}</ListGroup.Item>;  
                        } else {
                          return <ListGroup.Item key={index}>{ingredient}</ListGroup.Item>;
                        }
                      })}
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

export default SearchRecipes;
