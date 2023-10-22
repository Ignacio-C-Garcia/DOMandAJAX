const viewMovie = document.getElementById("viewMovie");
const intro = document.getElementById("intro");
const img = document.querySelector("#movieImg");
const loadingImg = document.querySelector("#loadingDiv");
const movieName = document.querySelector("input");
const button = document.querySelector("button");

button.addEventListener("click", () => {
  if (!movieName.value) {
    return;
  }
  errorDiv.style.display = "none";
  intro.style.display = "none";
  viewMovie.style.display = "none";
  loadingImg.style.display = "block";
  fetch("https://private.omdbapi.com/?apikey=bef9c583&t=" + movieName.value)
    .then((response) => response.json())
    .then((movie) => {
      if (movie.Error) {
        throw new Error(movie.Error);
      }
      movie.RatingsList = "";
      for (const rating of movie.Ratings) {
        movie.RatingsList += `<li>${rating.Source} - ${rating.Value}</li>`;
      }
      viewMovie.innerHTML = "";
      viewMovie.insertAdjacentHTML(
        "beforeend",
        `<div class="col-4">
        <img
          id="movieImg"
          class="img-fluid"
          src="${movie.Poster}"
          alt="${movie.Title} poster image"
        />
        </div>
        <div class="col">
        <h1>${movie.Title}</h1>
        <h2>Director: ${movie.Director}</h2>
        <h3>Argumento:</h3><p>${movie.Plot}</p>
        <h3>Actores</h3>
        <p>${movie.Actors}</p>
        <h3>País</h3>
        <p>${movie.Country}</p>
        <h3>Premios</h3>
        <p>${movie.Awards}</p>
        <h3>Ratings:</h3>
        <ul>${movie.RatingsList}</ul>
        </div>`
      );

      viewMovie.style.display = "flex";
    })
    .catch((err) => {
      console.error(err);
      errorDiv.style.display = "block";
    })
    .then(() => {
      loadingImg.style.display = "none";
    });
});
