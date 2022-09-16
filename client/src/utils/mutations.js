import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SAVE_RECIPE = gql`
  mutation saveRecipe(
    $name: String!
    $saveRecipeId: Int!
    $description: String
    $thumbnail_url: String
    $ingredients: [String]
    $directions: [String]
  ) {
    saveRecipe(
      name: $name
      id: $saveRecipeId
      description: $description
      thumbnail_url: $thumbnail_url
      ingredients: $ingredients
      directions: $directions
    ) {
      _id
      username
      savedRecipes {
        authors
        description
        recipeId
        image
        link
        title
      }
    }
  }
`;

export const REMOVE_RECIPE = gql`
  mutation removeRecipe($id: Int!) {
    removeRecipe(
      recipeId: $id
    ) {
      _id
      username
      savedRecipes {
        name
        recipeId
        description
        thumbnail_url
        ingredients
        directions
      }
    }
  }
`;

