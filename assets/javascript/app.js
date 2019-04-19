// Global Variables \\
var questionsObjects;
//creating a global variable for accessing gif url
var gifUrl;

//global varibale to hold timeOut id
var timeId;

// variable to save the user city's current score (Adriano Apr 15 2019)
let userCityScore;

// Save interval ID to be able to stop when need it

// Time given to user to answer 30 seconds
var timerCounter;
///////// Location API URL \\\\\\\\\ Adriano Alves Apr 14 2019
const LOCATION_API_URL = `http://open.mapquestapi.com/geocoding/v1/reverse?`
//
let locationApiParams = {
    key: `PnXATGIJA1knu3AIiLfjICBBfLexttAQ`,
    outFormat: `json`,
    location: ``,
}
///////////////////\\\\\\\\\\\\\\\\\\\\\

///////// Initialize Firebase \\\\\\\\\ Adriano Alves Apr 15 2019
let config = {
    apiKey: "AIzaSyBXZX6svzyC6NN6ZQiBKsP5VqZjnH07U_Y",
    authDomain: "triviasmart-c21fb.firebaseapp.com",
    databaseURL: "https://triviasmart-c21fb.firebaseio.com",
    projectId: "triviasmart-c21fb",
    storageBucket: "triviasmart-c21fb.appspot.com",
    messagingSenderId: "142508179498"
};
firebase.initializeApp(config);
let myDatabase = firebase.database();
///////////////////\\\\\\\\\\\\\\\\\\\\\

let gameInfo = { toatlWin: 0, totalLost: 0, totalRounds: 0, notAnswered: 0 };

let correctAnswer; // Adriano

var arrayKey; // Luiz

/******************************************************************************/
/* * * * * * * * * * * * * * * * getQuestions() * * * * * * * * * * * * * * * */
/******************************************************************************/
// Function to get 10 questions from API and save on JSON object
// Get questions from API using promisses
function getQuestions(){
var queryUrl = "https://opentdb.com/api.php?amount=1&category=26&difficulty=easy&type=multiple";
// Save the object
fetch(queryUrl)
    //translate into json
    .then((response) => response.json())
    // do something with the promise
    .then((result) => {
        console.dir(result.results);
        questionsObjects = result.results;
        arrayGrab();
    })

// Enable Start Button after data ia loaded
    .then(()=> startButtonClick() )
    // Update view after data arrive
    .then(()=> updateView());
    
} 
// Array with Questions keys
function arrayGrab() {
    arrayKey = Object.keys(questionsObjects);
    console.dir(arrayKey);
}

/*****************************************************************************/
/* * * * * * * * * * * * * * getCorrectAnswerGIF() * * * * * * * * * * * * * */
/*****************************************************************************/
// Functions to get gif animation for the corret answer
//api.giphy.com/v1/gifs/random?api_key=5txQgNzAKY8UPAGRI78q6WpaFO8ls0Zn&tag=${search}&rating=G`;
function displayGIF(search) {
    //created a variable to new pull request from the source url
    var correctAnsGifs = new XMLHttpRequest();
    //method open to GET url from the source
    correctAnsGifs.open('GET', `https://api.giphy.com/v1/gifs/random?api_key=5txQgNzAKY8UPAGRI78q6WpaFO8ls0Zn&tag=${search}`);
    //method onload, function to access the object by converting into a JSON format
    correctAnsGifs.onload = function () {
        //variable to store gifs from JSON by parsing response text
        var ourGifs = JSON.parse(correctAnsGifs.responseText);
        gifUrl = ourGifs.data.images.fixed_width.url;
        //console.dir dislays in the console
        console.dir(gifUrl);
    }
    //sending the request to the source url 
    correctAnsGifs.send();
}
displayGIF('horse');



/*****************************************************************************/
/* * * * * * * * * * * * * * getWrongAnswerGIF() * * * * * * * * * * * * * * */
/*****************************************************************************/
// Functions to get gif animation for the wrong answer
//api.giphy.com/v1/gifs/random?api_key=5txQgNzAKY8UPAGRI78q6WpaFO8ls0Zn&tag=wrong+answer&rating=G`;


/*****************************************************************************/
/* * * * * * * * * * * * * * * mkVisible() * * * * * * * * * * * * * * * * * */
/*****************************************************************************/
// function used to make element visible, argument for function will be ids or classes
function mkVisible(selector) {
    document.querySelector(selector).classList.remove("invisible");
}


/*******************************************************************************/
/* * * * * * * * * * * * * * * mkInvisible() * * * * * * * * * * * * * * * * * */
/*******************************************************************************/
// function used to make element invisible, argument for function will be ids or classes
function mkInvisible(selector) {
    document.querySelector(selector).classList.add("invisible");
}

/*******************************************************************************/
/* * * * * * * * * * * * * * * * * setText() * * * * * * * * * * * * * * * * * */
/*******************************************************************************/
// function to set text content on element, argument will be selector and text to be set
// function setText(selector, text) {
//}
function setText(selector,text){
    document.querySelector(selector).innerHTML = text;
}
// test
//setText("#question","you are ugly");

/******************************************************************************/
/* * * * * * * * * * * * * * * * * * rand() * * * * * * * * * * * * * * * * * */
/******************************************************************************/
// Function that generate random number
// this will return a number beteween 0 and (exclusive) range argument
function rand(range){
    return Math.floor(Math.random()* range);
}
//test

//console.log(rand(5));



//console.log(rand(5));


//console.log(rand(5));

/******************************************************************************/
/* * * * * * * * * * * * * * * * startTimer() * * * * * * * * * * * * * * * * */
/******************************************************************************/
// function to start timer that user will have to answer
function startTimer(callback, seconds = 1) {
    //starting the time Interval and saving its ID to timeID vairbale
    timeId = setInterval(callback, 1000 * seconds);
}
/****************************************************************************/
/* * * * * * * * * * * * * * * * * stop() * * * * * * * * * * * * * * * * * */
/****************************************************************************/
// function to stop timer
function stop(){
    clearInterval(timeId);
}

/*******************************************************************************/
/* * * * * * * * * * * * * * * * updateTimer() * * * * * * * * * * * * * * * * */
/*******************************************************************************/
// function updateTimer() {
// Set Counter to always show two digits
// Display Updated conter
// Stop if counter reachs zero
// Make it red color if counter bellow 10
// Update Counter
//}
function updateTimer(){
    // makes sure to leave 2 digits for seconds even if under 2 digits
    timerCounter = ("0"+timerCounter).slice(-2);
    //changes text of timer with timercounter
    setText("#timerID", timerCounter);
    //if timer counter is equal to zero, stop timer and show answer also remove red color for next itiration
    if(timerCounter == 0){
        stop();
        showAnwser();
        document.querySelector("#timerID").classList.remove("text-danger");
    }
    // if counter is less than 10, change it to red color
    else if(timerCounter < 10){
        document.querySelector("#timerID").classList.add("text-danger");
    }
    // make counter go down by one each iteration 
    timerCounter--;
}


/***************************************************************************/
/* * * * * * * * * * * * * * * showAnwser() * * * * * * * * * * * * * * * */
/***************************************************************************/
// Adriano
function showAnwser(isCorrect) {
    // Stop timer
    stop();
    // Let user see the result for 5 seconds
    startTimer(updateView, 5);
    // remove timerHearder, question and btnColumn from view
    mkInvisible("#timerHearder");
    mkInvisible("#btnColumn");
    //display displayGIF
    mkVisible("#displayGIF");
    // Get Element of img, there is only one element child so we most use [0]
    let _imgElement = document.querySelector("#displayGIF").children[0];
    // Check if user answer correct,wrong or timeout
    switch (isCorrect) {
        case true: // User answered correct
            // Update toatlWin
            gameInfo.toatlWin++;
            // set text for answer status
            setText("#question", 'You Got IT Right!');
            // add the src to img
            _imgElement.setAttribute("src", gifUrl);
            break;
        case false: // User Missed
            // update totalLost
            gameInfo.totalLost++;
            // set text for answer status
            setText("#question", `Nope! Right Answer is ${correctAnswer}`);
            _imgElement.setAttribute("src", gifUrl);
            break;
        default: // Not Answer, Time out
            // Update notAnswered counter
            gameInfo.notAnswered++;
            // set text for answer status
            setText("#question", `Time out! Right Answer is ${correctAnswer}`);
            _imgElement.setAttribute("src", gifUrl);
            break;
    }
}


/* ********************************************************************** */
/* * * * * * * * * * * * * * * * updateView() * * * * * * * * * * * * * * */
/* ********************************************************************** */
// Adriano
// Fubction used to update view with new question
// this function will return the correct_answer 
// to compare with user answer
function updateView() {
    // Stop timer
    stop();
    // Check for Game Over
    if (arrayKey.length < 1) {
        stop();
        setText("#correctAnswersCount", gameInfo.toatlWin);
        setText("#wrongAnswersCount", gameInfo.totalLost);
        setText("#noAnswersCount", gameInfo.notAnswered);
        mkInvisible("#questionsContainer");
        mkVisible("#gameOverContainer");
        mkVisible("#scoreContainer");//TODO:

        return;
    }
    // Reset counter
    timerCounter = 20;
    //Start timer and update each 1 second
    startTimer(updateTimer, 1);
    // Get a rand key ussing splice (splice return a Array)
    let _key = arrayKey.splice(rand(arrayKey.length), 1);
    // Get randon object from questionsObjects using splice to void erpetitive questions
    let _obj = questionsObjects[_key[0]];
    // Get string question
    let _question = _obj.question;
    // Set the question
    setText("#question", _question);
    // Get the correct_answer (it will be the return of this function)
    correctAnswer = _obj.correct_answer;
    // Add correct_answer to incorrect_answers array to shuffle
    _obj.incorrect_answers.push(correctAnswer);
    // Get all answer buttons
    let _questionButtons = document.querySelector("#btnColumn").children
    // Random place correct and incorrect answer on the buttons
    for (let _btn of _questionButtons) {
        let _question = _obj.incorrect_answers.splice(rand(_obj.incorrect_answers.length), 1)[0];
        _btn.innerHTML = _question;
    }
    // Get Correct answer gif url
    displayGIF(`right answer ${correctAnswer}`);
    // Get wronganswer git url
    displayGIF(`wrong answer ${correctAnswer}`);
    // remove gif animation displayGIF
    mkInvisible("#displayGIF");
    // display timerHearder, question and btnColumn
    mkVisible("#timerHearder");
    mkVisible("#question");
    mkVisible("#btnColumn");
}


/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
/* * * * * * * * * * * * * * onStartButtonClick() * * * * * * * * * * * * * * */
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
// callback used on start button event listener

//function onStartButtonClick() {
function startButtonClick() {
    // Get start button element 
    var btn = document.querySelector("#startButton");
    // Enable the start button
    btn.disabled = false;
    // Add the event listner
    btn.addEventListener("click", function () {
        //console log if button was clicked        
        console.log("button clickeddddd son");
        //get rid of container holding button 
        mkInvisible("#containerStart");
        mkVisible("#questionsContainer");
        mkInvisible("#scoreContainer")
    });
};

//}

/* ********************************************************************** */
/* * * * * * * * * * * * getNumberWithOrdinal() * * * * * * * * * * * * * */
/* ********************************************************************** */
// Adriano Apr 15 2019
// function to parse numbers to a Ordinal Format like 1st, 2nd, 3rd ...
// https://community.shopify.com/c/Shopify-Design/Ordinal-Number-in-javascript-1st-2nd-3rd-4th/m-p/72156
function getNumberWithOrdinal(number) {
    // array with ordinals to be refer from return
    let ord = ["th", "st", "nd", "rd"];
    // get mod 100 of input number
    let mod = number % 100;
    return number + (ord[(mod - 20) % 10] || ord[mod] || ord[0]);
}
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
/* * * * * * * * * * * * * * updateScoresView() * * * * * * * * * * * * * * */
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
// Adriano Apr 15 2019
// event listner trigged on any value change,
// this willl get the 10 highest scores from firebase of user's country
// this function will be called from function getCityInfo() 
function updateScoresView(country) {
    // get parent element to append table row
    let parent = document.querySelector(".table-body");
    // Firebase on value change listener
    myDatabase.ref(`${country}/`).orderByChild('score').limitToLast(10).on("value", function (snapshot) {
        // clear parrent
        parent.innerHTML = "";
        // create a counter
        let counter = snapshot.numChildren();
        // debug
        console.dir(counter);
        // debug
        console.dir(snapshot.val());
        // loop trough object
        snapshot.forEach(function (data) {
            // create a table row to append table data
            let tableRow = document.createElement("tr");
            // create table datas elements and add data to it
            let tableDataPosition = document.createElement("td");
            tableDataPosition.innerHTML = getNumberWithOrdinal(counter--);
            tableRow.appendChild(tableDataPosition);
            let tableDataCity = document.createElement("td");
            tableDataCity.innerHTML = data.val().city;
            tableRow.appendChild(tableDataCity);
            let tableDataScore = document.createElement("td");
            tableDataScore.innerHTML = data.val().score;
            tableRow.appendChild(tableDataScore);
            parent.prepend(tableRow);
        });
    });
}

/* ********************************************************************** */
/* * * * * * * * * * * * * * getGeoLocation() * * * * * * * * * * * * * * */
/* ********************************************************************** */
// Adriano Apr 14 2019
// get user geolocation 
function getGeoLocation() {
    // if geolocation is available in browser
    if (navigator.geolocation) {
        // call getCity with geo possition
        navigator.geolocation.getCurrentPosition(getCity);
    }
}
/* ********************************************************************* */
/* * * * * * * * * * * * * * * * getCity() * * * * * * * * * * * * * * * */
/* ********************************************************************* */
// Adriano Apr 14 2019
// this function will use Mapquest API to get info about user current location
// like country, state, city, etc
function getCity(userPosition) {
    // get latitude
    let lat = userPosition.coords.latitude;
    // get longitude
    let lng = userPosition.coords.longitude;
    // add location to apiParams
    locationApiParams.location = `${lat},${lng}`
    // create the url parameters
    let searchParams = new URLSearchParams(locationApiParams);
    // send request to API  
    fetch(`${LOCATION_API_URL}${searchParams}`)
        // get the api response and parse to JSON
        .then((apiResponse) => apiResponse.json())
        // get the results (by API docs its a array)
        .then((jsonObj) => jsonObj.results[0])
        // get the locations (by API docs its a array)
        .then((result) => result.locations[0])
        // set city and state
        .then((location) => {
            let currentCity = `${location.adminArea5}, ${location.adminArea3}`;
            // get user postal code
            userPostalCode = location.postalCode;
            // get users country
            userCountry = location.adminArea1;
            // Get current city's score bt calling getCurrentCityScore()
            getCurrentCityScore(userCountry, userPostalCode);

            updateScoresView(userCountry);
            // TODO: use function setText(selector)
            document.querySelector('.footer h6').innerHTML = currentCity;
            // document.querySelector('#map').setAttribute(`src`, location.mapUrl);
        });
}
/* ********************************************************************* */
/* * * * * * * * * * * * * getCurrentCityScore() * * * * * * * * * * * * */
/* ********************************************************************* */
// Adriano Apr 15 2019
// Function to get city score, the score will be saved, 
// updated the score and update firebase
function getCurrentCityScore(country, zipCode) {
    // get firbase snapshot  
    myDatabase.ref(`${country}/`).on(`value`, function (snapshot) {
        // and get the score on database for current city
       userCityScore = snapshot.val()[zipCode].score;
        // debugging
       console.log(`%cuserCityScore : ${userCityScore}`, `background-color: cyan;`);
    },
    // check for error 
    function (error) {
        console.log("Error: " + error.code);
    });
}


/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
/* * * * * * * * * * * * * * onAnswerClick() * * * * * * * * * * * * * * * */
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
// Method to handle event wen user click in any answer
// function onAnswerClick(event) {
// Get text from clicked button
// check answer status
//}
function onAnswerClick(event){
    var clickedAnswer = event.target.innerHTML;
    console.log(clickedAnswer);

    showAnwser(clickedAnswer == correctAnswer);

}

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
/* * * * * * * * * * * * * * onReloadClick() * * * * * * * * * * * * * * * */
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
// Method to handle the game reload
// function onReloadClick(event) {
// reset initial variables that hold scores
// Get start button element 
// upload questions
//}
function onReloadClick(event){
    mkInvisible("#gameOverContainer");
    for (let key of Object.keys(questionsObjects)){
        gameInfo[key]=0;
    };
    mkVisible("#containerStart");
    let _btn = document.querySelector("#startButton");
    _btn.disabled= false;
    getQuestions();
}
document.querySelector("#reloadButton").addEventListener("click", onReloadClick);

/////////////////////////////////////////////////////////////////////////////////////
getGeoLocation();
//document.querySelector("#reloadButton").addEventListener("click", onReloadClick);

// Add the onclick listener to answers buttons
document.querySelector("#btnColumn").addEventListener("click", onAnswerClick);
//
getQuestions();

