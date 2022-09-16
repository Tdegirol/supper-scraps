import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';
import { GET_ME } from "../utils/queries"
import { REMOVE_RECIPE } from '../utils/mutations';
import Auth from '../utils/auth';
// import { removeRecipeId } from '../utils/localStorage';
import { useQuery, useMutation } from "@apollo/client";

const SavedRecipes = () => {
  const { loading, data } = useQuery(GET_ME);
  let userData = data?.me || {};
  const [removeRecipe, {error}] = useMutation(REMOVE_RECIPE);
  console.log(userData);
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
          <h1>Viewing saved Recipes!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {userData.savedRecipes.length
            ? `Viewing ${userData.savedRecipes.length} saved ${userData.savedRecipes.length === 1 ? 'recipe' : 'recipes'}:`
            : 'You have no saved recipes!'}
        </h2>
        <CardColumns>
          {userData.savedRecipes.map((recipe) => {
            return (
              <Card key={recipe.recipeId} border='dark'>
                {recipe.thumbnail_url ? <Card.Img src={recipe.thumbnail_url} alt={`The image for ${recipe.name}`} variant='top' /> : null}
                <Card.Body>
                  <Card.Title>{recipe.name}</Card.Title>
                  {/* <p className='small'>Authors: {recipe.authors}</p> */}
                  <Card.Text>{recipe.description}</Card.Text>
                  <Button className='btn-block btn-danger' onClick={() => handleDeleteRecipes(recipe.id)}>
                    Delete this Recipe!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SavedRecipes;
