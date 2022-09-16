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

  // create function that accepts the recipe's mongo _id value as param and deletes the recipe from the database
  const handleDeleteRecipes = async (recipeId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

//commenting out lines below bc removing localStorage.
    // try {
    //   await removeRecipe({
    //     variables: { id: recipeId },
    //   });

    //   // upon success, remove recipe's id from localStorage
    //   removeRecipeId(recipeId);
    // } catch (err) {
    //   console.error(err);
    // }
  };

  // if data isn't here yet, say so
  if (loading) {
    return <h2>LOADING...</h2>;
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
          {userData.SavedRecipes.length
            ? `Viewing ${userData.savedRecipes.length} saved ${userData.savedRecipes.length === 1 ? 'recipe' : 'recipes'}:`
            : 'You have no saved recipes!'}
        </h2>
        <CardColumns>
          {userData.savedRecipes.map((recipe) => {
            return (
              <Card key={recipe.recipeId} border='dark'>
                {recipe.image ? <Card.Img src={recipe.image} alt={`The cover for ${recipe.title}`} variant='top' /> : null}
                <Card.Body>
                  <Card.Title>{recipe.title}</Card.Title>
                  <p className='small'>Authors: {recipe.authors}</p>
                  <Card.Text>{recipe.description}</Card.Text>
                  <Button className='btn-block btn-danger' onClick={() => handleDeleteRecipes(recipe.recipeId)}>
                    Delete this Book!
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
