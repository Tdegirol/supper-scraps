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
      savedRecipeIds
    }
  }
`;

export const GET_RECIPES = gql`
  query getRecipe($ingredients: String!, $page: Int) {
    getRecipe(ingredients: $ingredients, page: $page) {
      recipes {
        name
        id
        description
        thumbnail_url
        ingredients
        directions
      }
      isMore
    }
  }
`
export const GET_DINNER_INSP = gql`
  query getDinnerInsp($dinnerArr: [String]) {
    getDinnerInsp(dinnerArr: $dinnerArr) {
      name
      id
      description
      thumbnail_url
      ingredients
      directions
    }
  }
`
  export const GET_DESSERT_INSP = gql`
  query getDessertInsp($dessertArr: String!) {
    getDessertInsp(dessertArr: $dessertArr) {
      name
      id
      description
      thumbnail_url
      ingredients
      directions
    }
  }
`