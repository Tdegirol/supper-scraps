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
    $id: Int!
    $description: String
    $thumbnail_url: String
    $ingredients: [String]
    $directions: [String]
  ) {
    saveRecipe(
      name: $name
      id: $id
      description: $description
      thumbnail_url: $thumbnail_url
      ingredients: $ingredients
      directions: $directions
    ) {
      _id
      username
      savedRecipes {
        name
        id
        description
        thumbnail_url
        ingredients
        directions
      }
    }
  }
`;

export const REMOVE_RECIPE = gql`
  mutation removeRecipe($id: Int!) {
    removeRecipe(
      id: $id
    ) {
      _id
      username
      savedRecipes {
        name
        id
        description
        thumbnail_url
        ingredients
        directions
      }
    }
  }
`;

