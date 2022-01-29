const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const finalScore = document.getElementById("finalScore");
const mostRecentScore = localStorage.getItem("mostRecentScore");
const MAX_HIGHT_SCORES = 10;
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
console.log(highScores);

finalScore.innerText = mostRecentScore;
username.addEventListener("keyup", ()=> {
    saveScoreBtn.disabled = !username.value
})

saveHighScore = e => {
    e.preventDefault();
    console.log("clicked the button");

    const score = {
        score: mostRecentScore,
        name: username.value,
    };
    highScores.push(score);
    highScores.sort((a,b) => b.score - a.score)
    highScores.splice(10);
    localStorage.setItem("highScores", JSON.stringify(highScores));
    window.location.assign("/")
}