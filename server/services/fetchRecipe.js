
const fetchRecipe = async ({ userIngredient }) => {
    const options = {
        method: 'GET',
        headers: {
        'X-RapidAPI-Key': 'd99e0e31admsh16577b49cde0229p1fa008jsn05650f676f5a',
        'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
        }
    };
    
    await fetch(`https://tasty.p.rapidapi.com/recipes/list?from=0&size=40&q=${userIngredient}`, options)
        .then(response => response.json())
        .then(response => {
        console.log(response)
                    //add logic to search for the ingredient that the user input within the response
                    // recipe = response.this.that[25023852].another.section.ingredient.next.another.finally.almost;
                    //add logic to filter the response to get the recipes we need.

                    //save things such as: name, ingredients(name/measurements), instructions, ID
        return response
        })
        .catch(err => console.error(err));
}

module.exports = fetchRecipe;