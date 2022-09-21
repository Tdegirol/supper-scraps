import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { React, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SearchRecipes from "./pages/SearchRecipes";
import SavedRecipes from "./pages/SavedRecipes";
import Inspirations from "./pages/Inspirations";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";


const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
    // create state for holding returned graphql data
    const [searchedRecipes, setSearchedRecipes] = useState([]);
    // create state for holding our search field data
    const [searchInput, setSearchInput] = useState("");
  
  return (
    <ApolloProvider client={client}>
      <Router>
        <>
          <Navbar />
          <div className="content-container"> 
          <Routes>
            <Route exact path="/" element={<SearchRecipes value={{ searchInput, setSearchInput, searchedRecipes, setSearchedRecipes }}/>} />
            <Route exact path="/saved" element={<SavedRecipes />} />
            <Route exact path="/inspirations" element={<Inspirations />} />

            <Route render={() => <h1 className="display-2">Wrong page!</h1>} />
          </Routes>
          </div>
          <Footer className="footer--pin"/>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
