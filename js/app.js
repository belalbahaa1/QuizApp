const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCounterText = document.getElementById('questionCounter');
const scoreText = document.getElementById('score');


let currentQuestion = {};
let acceptingAnswers = false;
let score = 0; 
let availablequestions= [];

let questions = [
    {
        question:"من هو اول سفير للاسلام",
        choice1:"عمرو بن العاص",
        choice2:"مصعب بن عمير",
        choice3:"خالد بن الوليد",
        choice4:"علي بن ابي طالب",
        answer:2
    },
    {
        question:"'من الذين قالو 'ونحن عصبة",
        choice1:"إخوة يوسف",
        choice2:"إخوة موسي",
        choice3:"اصحاب الايكة",
        choice4:"سحرة فرعون",
        answer:1
    },
    {
        question:"من هي اخر من ماتت من زوجات النبي صلي الله عليه وسلم ",
        choice1:"'ام سلمة  'رضي الله عنها",
        choice2:"'السيدة خديجة 'رضي الله عنها",
        choice3:"'السيدة عائشة 'رضي الله عنها",
        choice4:"'جويرية بنت الحارث 'رضي الله عنها",
        answer:1
    },
    {
        question:"من الذي أطلق عليه ترجمان القران الكريم؟",
        choice1:"سعد بن أبي وقاص",
        choice2:"عبد الرحمن بن عوف",
        choice3:"عبد الله بن العباس",
        choice4:"عبد الله بن مسعود",
        answer:3
    },
    {
        question:"متي انزل جبريل علي سيدنا محمد بالوحى؟ ",
        choice1:"شهر محرم",
        choice2:"شهر شعبان",
        choice3:"شهر رجب",
        choice4:"شهر رمضان",
        answer:4
    },
    {
        question:"من الملك الذي ينفخ في الصُّور يوم القيامة؟",
        choice1:"ملك الموت",
        choice2:"جبريل",
        choice3:"ميكائيل",
        choice4:"اسرافيل",
        answer:4
    },
    {
        question:"من هو الصحابي الذي أمره سيدنا محمد أن يبقى مع أمه في معركه بدر؟",
        choice1:"ابو أمامة الباهلي",
        choice2:"ابو بكر الصديق",
        choice3:"الزبير بن العوام",
        choice4:"عبد الرحمن بن عوف",
        answer:1
    },
    {
        question:"اول مسجد بني في الاسلام ؟ ",
        choice1:"الاقصي",
        choice2:"الاموي",
        choice3:"قباء",
        choice4:"الحرام",
        answer:3
    },
    {
        question:"في اي سورة ذكرت هذه الآيه الكريمة ؟ : وَلَا يَأْتُونَكَ بِمَثَلٍ إِلَّا جِئْنَاكَ بِالْحَقِّ وَأَحْسَنَ تَفْسِيرًا (33) ",
        choice1:"النور",
        choice2:"الانبياء",
        choice3:"الفرقان",
        choice4:"الجمعة",
        answer:3
    },
    {
        question:"كم مرة ذُكر اسم الرسول محمد صلى الله عليه وسلم في القرآن؟",
        choice1:"4 ",
        choice2:"5 ",
        choice3:"6 ",
        choice4:"8 ",
        answer:1
    },
    {
        question:"في اي سورة ذكرت هذه الآيه الكريمة؟ إِنَّ الْإِنسَانَ لِرَبِّهِ لَكَنُودٌ (6) ",
        choice1:"العلق",
        choice2:"العاديات",
        choice3:"الهمزه",
        choice4:"القلم",
        answer:2
    },
    {
        question:"في اي سورة ذكرت هذه الآيه الكريمة؟ إِنَّ الْأَبْرَارَ لَفِي نَعِيمٍ (22)",
        choice1:"الشمس",
        choice2:"الليل",
        choice3:"الضحي",
        choice4:"المطففين",
        answer:4
    },
    {
        question:"أول صحابي حيّا الرسول صلّ الله عليه وسلم بتحية الإسلام هو؟",
        choice1:"أبو بكر الصديق",
        choice2:"أبو أيوب الأنصاري",
        choice3:"أبو ذر الغفاري",
        choice4:"أبو موسى الأشعري",
        answer:3
    },
    {
        question:"ما هو العام الهجري الذي احتفل فيه المسلمين بعيد الفطر وعيد الأضحى المبارك؟",
        choice1:" العام الأول",
        choice2:"العام الثاني",
        choice3:"العام الثالث",
        choice4:"العام الرابع",
        answer:2
    },
    {
        question:"ما هو أول الأيام التي خلقها الله تعالى؟",
        choice1:"يوم الاحد",
        choice2:"يوم الجمعة",
        choice3:"يوم السبت",
        choice4:"يوم الاثنين",
        answer:1
    },
];
// constants
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 15;

// start game
startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
};

getNewQuestion = () => {

    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem("mostRecentScore", score)
        // go to end page 
        return window.location.assign("end.html");
    }

    questionCounter++;
    questionCounterText.innerHTML = `${questionCounter}/${MAX_QUESTIONS}`;
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers  = true;
};   

choices.forEach(choice => {
    choice.addEventListener("click", e => {
       if (!acceptingAnswers) return;

       acceptingAnswers = false;
       const selectedChoice = e.target;
       const selectedAnswer = selectedChoice.dataset["number"];

   
       const classToApply = 
       selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

       if(classToApply === "correct") {
           incrementScore(CORRECT_BONUS);
       }

       selectedChoice.parentElement.classList.add(classToApply);
        setTimeout(()=> {
            selectedChoice.parentElement.classList.remove(classToApply);
       
            getNewQuestion();
        }, 1000);
    });
});

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
}


startGame();