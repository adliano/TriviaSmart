// Global Variables \\
var questionKeys;
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


/******************************************************************************/
/* * * * * * * * * * * * * * * * getQuestions() * * * * * * * * * * * * * * * */
/******************************************************************************/
// Function to get 10 questions from API and save on JSON object
// Get questions from API using promisses
var queryUrl = "https://opentdb.com/api.php?amount=10&category=26&difficulty=easy&type=multiple";
// Save the object
fetch(queryUrl)
    //translate into json
    .then((response) => response.json())
    // do something with the promise
    .then((result) => {
        console.dir(result.results);
        questionKeys = result.results;
        arrayGrab();
    })

// Enable Start Button after data ia loaded
    .then(()=> startButtonClick() )
    // Update view after data arrive
    .then(()=> updateView());
    
 
// Array with Questions keys
function arrayGrab() {
    var arrayKey = Object.keys(questionKeys);
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
    correctAnsGifs.open('GET', 'https://api.giphy.com/v1/gifs/random?api_key=5txQgNzAKY8UPAGRI78q6WpaFO8ls0Zn&tag=${search}');
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
    setText("#timerId", timerCounter);
    //if timer counter is equal to zero, stop timer and show answer also remove red color for next itiration
    if(timerCounter == 0){
        stop();
        showAnwser();
        document.querySelector("#timerId").classList.remove("text-danger");
    }
    // if counter is less than 10, change it to red color
    else if(timerCounter < 10){
        document.querySelector("#timerId").classList.add("text-danger");
    }
    // make counter go down by one each iteration 
    timerCounter--;
}


/***************************************************************************/
/* * * * * * * * * * * * * * * showAnwser() * * * * * * * * * * * * * * * */
/***************************************************************************/
// function showAnwser(isCorrect) {
    function showAnwser(isCorrect){

    }
// Let user see the result for 5 seconds
// remove timerHearder, question and btnColumn from view
//display displayGIF
// Get Element of img, there is only one element child so we most use [0]
// Check if user answer correct,wrong or timeout
// User answered correct
// Update toatlWin
// set text for answer status
// add the src to img
// User Missed
// update totalLost
// set text for answer status
// Not Answer, Time out
// Update notAnswered counter
// set text for answer status
//}
//


/* ********************************************************************** */
/* * * * * * * * * * * * * * * * updateView() * * * * * * * * * * * * * * */
/* ********************************************************************** */
// Fubction used to update view with new question
// this function will return the correct_answer 
// to compare with user answer
// function updateView() {
function updateView() {
    console.log("view has been updated duuuude");
}
// Check for Game Over
// stop timer
// update view
// Get a rand key ussing splice (splice return a Array)
// Get randon object from questionsObjects using splice to void erpetitive questions
// Get string question
// Set the question
// Get the correct_answer (it will be the return of this function)
// Add correct_answer to incorrect_answers array to shuffle
// Get all answer buttons
// Random place correct and incorrect answer on the buttons
// Get Correct answer gif url
// Get wronganswer git url
// remove gif animation displayGIF
// display timerHearder, question and btnColumn
// Stop timer
// Reset counter
// timerCounter = 30;
//Start timer and update each 1 second
//}


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
    // counter used to set ordinal
    let counter = 0;
    /*****************/
    /* printScores() */
    /*****************/
    // Function using recursion to display 10 tops scores on view 
    function printScores(scorreArray) {
        // check if array still have data
        if (scorreArray.length > 0) {
            // pop item from array
            let item = scorreArray.pop();
            // debug \\
            console.log(`%c ${getNumberWithOrdinal(++counter)} ${item}`, `color:white; background-color : blue;`);
            //
            // TODO: display score on view 
            //
            // print next score
            printScores(scorreArray);
        }
    }
    // get data from '${country}/', order by score and get the 10 last objects
    myDatabase.ref(`${country}/`).orderByChild('score').limitToLast(10).on("value", function (snapshot) {
        // create a stack to place data
        // remember stack is last in, first out data structure
        let stack = [];
        // debug
        console.log(`snapshot length : ${snapshot.numChildren()}`); 
        // debug
        console.dir(snapshot.val()); 
        // iterate through object 
        snapshot.forEach(function (data) {
            // push data in format cityName cityScore to stack
            ///// TODO: Display format should be done here \\\\\
            stack.push(`${data.val().city} ${data.val().score}`);
        });
        // call function printScores() to display scores in Ascending order
        printScores(stack);
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
            // Get current city's score
            getCurrentCityScore(userCountry, userPostalCode);

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
       // userCityScore = snapshot.val()[zipCode].score;
        // debugging
       // console.log(`%cuserCityScore : ${userCityScore}`, `background-color: cyan;`);
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

}

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
/* * * * * * * * * * * * * * onReloadClick() * * * * * * * * * * * * * * * */
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
// Method to handle the game reload
// function onReloadClick(event) {
// update view
// reset initial variables that hold scores
// Get start button element 
// upload questions
//}

/////////////////////////////////////////////////////////////////////////////////////
getGeoLocation();
//document.querySelector("#reloadButton").addEventListener("click", onReloadClick);

// Add the onclick listener to answers buttons
document.querySelector("#btnColumn").addEventListener("click", onAnswerClick);
//
// getQuestions("easy");

