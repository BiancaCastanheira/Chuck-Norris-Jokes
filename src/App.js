import { useState, useEffect } from "react";
import { api } from "./api/chuckNorrisApi";
import Loading from "./components/Loading";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [joke, setJoke] = useState("");
  const [jokeCategories, setJokeCategories] = useState([
    "Animal",
    "Career",
    "Celebrity",
    "Dev",
    "Explicit",
    "Fashion",
    "Food",
    "History",
    "Money",
    "Movie",
    "Music",
    "Political",
    "Religion",
    "Science",
    "Sport",
    "Travel",
  ]);

  const getRandomJokes = () => {
    setIsLoading(true);

    api
      .get("random")
      .then((response) => {
        setJoke(response.data.value);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(`Deu ruim na requisição da api random: ${error}`);
      });
  };

  useEffect(() => {
    getRandomJokes();
  }, []);
  const getCategoryJoke = (categoryName) => {
    console.log(categoryName);
    setIsLoading(true);
    api
      .get(`random?category=${categoryName.toLowerCase()}`)
      .then((response) => {
        setJoke(response.data.value);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(
          `Algo deu errado na requisição da api category: ${error}`
        );
      });
  };

  return (
    <div className="App">
      <h1>Chuck Norris Jokes</h1>
      <div>
        {jokeCategories.map((category) => {
          return (
            // TODO: Deixar os elementos (categorias) com uma aparência de icones clicáveis.
            <span key={category}>
              <small onClick={() => getCategoryJoke(category)}>
                {category}
              </small>{" "}
              |
            </span>
          );
        })}
      </div>
      {isLoading ? <Loading /> : <h3>{joke}</h3>}
    </div>
  );
};

export default App;
