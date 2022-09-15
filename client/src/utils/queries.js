import { gql } from "@apollo/client";

export const GET_ME = gql`
  {
    me {
      _id
      username
      email
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

export const GET_RECIPES = gql`
  query getRecipe($ingredients: String!) {
    getRecipe(ingredients: $ingredients) {
      name
      id
      description
      thumbnail_url
      ingredients
      directions
    }
  }
`
