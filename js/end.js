 const username = document.querySelector("#username");
 const saveScoreBtn = document.querySelector("#saveScoreBtn");
 const finalScore = document.querySelector("#finalScore");
 const mostRecentScore = document = localStorage.getItem("mostRecentScore");


 finalScore.innerHTML = mostRecentScore;
 username.addEventListener("keyup", () => {
     saveScoreBtn.disabled = !username;
 });

saveHighScore = (e) => {
    console.log("clicked the save button!");
    e.preventDefault();
};