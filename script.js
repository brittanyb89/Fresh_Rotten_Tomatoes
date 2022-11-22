const review1 = document.querySelector("#choice1");
const review2 = document.querySelector("#choice2");

let movieReviewTitle1 = {}

function grabMovieGenre () {
    fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=d6a051201733ccdafa7109a2dba8cbc6&language=en-US")
    .then(function (movieGenre) {
        return movieGenre.json();
    })
    .then(function (data) {
        const genreId = data.genres.find((element) => element.name === "Action");
        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=d6a051201733ccdafa7109a2dba8cbc6&with_genres=${genreId.id}`)
        .then(function (movieList) {
            return movieList.json();
        })
        .then (function (data) {

            pullReview (data).then(data=>{
                console.log('function results',data)

            })
        })
    })
}

grabMovieGenre ();

async function pullReview (movieList) {
    const randomMovie = Math.floor(Math.random() * movieList.results.length);
    movieReviewTitle1 = movieList.results[randomMovie].title
    console.log(movieReviewTitle1)
    const request = await fetch(`https://api.themoviedb.org/3/movie/${movieList.results[randomMovie].id}/reviews?api_key=d6a051201733ccdafa7109a2dba8cbc6&language=en-US&page=1`)
   const jsonResult = await request.json()
   if (jsonResult.results[0]?.content) {
    return jsonResult
   } else {
    return pullReview(movieList);
   }

}