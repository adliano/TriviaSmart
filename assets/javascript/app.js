// Global Variables \\
var questionKeys;
// "https://media.giphy.com/media/Ax0kmy0IEqq9W/giphy.gif";
//"https://media.giphy.com/media/BPZenX37AtXyw/giphy.gif";
// Save interval ID to be able to stop when need it
// Time given to user to answer 30 seconds

///////// Location API URL \\\\\\\\\ Adriano Alves Apr 14 2019
const LOCATION_API_URL = `http://open.mapquestapi.com/geocoding/v1/reverse?`
//
let locationApiParams = {
    key: `PnXATGIJA1knu3AIiLfjICBBfLexttAQ`,
    outFormat: `json`,
    location: ``,
}
///////// end of Location API URL \\\\\\\

/******************************************************************************/
/* * * * * * * * * * * * * * * * getQuestions() * * * * * * * * * * * * * * * */
/******************************************************************************/
// Function to get 10 questions from API and save on JSON object
// Get questions from API using promisses
var queryUrl= "https://opentdb.com/api.php?amount=10&category=26&difficulty=easy&type=multiple";
// Save the object
fetch(queryUrl)
//translate into json
    .then((response) => response.json()) 
// do something with the promise
    .then((result)=> {
        console.dir(result.results);
        questionKeys=result.results;
        arrayGrab();
    })
// Enable Start Button after data ia loaded
    .then(()=> startButtonClick() )
    .then(()=> updateView());
    
// Array with Questions keys
function arrayGrab(){
var arrayKey  = Object.keys(questionKeys);
console.dir(arrayKey);
}


// Update view after data arrive




/*****************************************************************************/
/* * * * * * * * * * * * * * getCorrectAnswerGIF() * * * * * * * * * * * * * */
/*****************************************************************************/
// Functions to get gif animation for the corret answer
//api.giphy.com/v1/gifs/random?api_key=5txQgNzAKY8UPAGRI78q6WpaFO8ls0Zn&tag=${search}&rating=G`;



/*****************************************************************************/
/* * * * * * * * * * * * * * getWrongAnswerGIF() * * * * * * * * * * * * * * */
/*****************************************************************************/
// Functions to get gif animation for the wrong answer
//api.giphy.com/v1/gifs/random?api_key=5txQgNzAKY8UPAGRI78q6WpaFO8ls0Zn&tag=wrong+answer&rating=G`;


/*****************************************************************************/
/* * * * * * * * * * * * * * * mkVisible() * * * * * * * * * * * * * * * * * */
/*****************************************************************************/
// function used to make element visible, argument for function will be ids or classes
function mkVisible(selector){
    document.querySelector(selector).classList.remove("invisible");
}


/*******************************************************************************/
/* * * * * * * * * * * * * * * mkInvisible() * * * * * * * * * * * * * * * * * */
/*******************************************************************************/
// function used to make element invisible, argument for function will be ids or classes
function mkInvisible(selector){
    document.querySelector(selector).classList.add("invisible");
}

/*******************************************************************************/
/* * * * * * * * * * * * * * * * * setText() * * * * * * * * * * * * * * * * * */
/*******************************************************************************/
// function to set text content on element, argument will be selector and text to be set
// function setText(selector, text) {
//}


/******************************************************************************/
/* * * * * * * * * * * * * * * * * * rand() * * * * * * * * * * * * * * * * * */
/******************************************************************************/
// Function that generate random number
// this will return a number beteween 0 and (exclusive) range argument


/******************************************************************************/
/* * * * * * * * * * * * * * * * startTimer() * * * * * * * * * * * * * * * * */
/******************************************************************************/
// function to start timer that user will have to answer
// function startTimer(callback, seconds = 1) 


/****************************************************************************/
/* * * * * * * * * * * * * * * * * stop() * * * * * * * * * * * * * * * * * */
/****************************************************************************/
// function to stop timer


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


/***************************************************************************/
/* * * * * * * * * * * * * * * showAnwser() * * * * * * * * * * * * * * * */
/***************************************************************************/
// function showAnwser(isCorrect) {
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
    function updateView(){
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
function startButtonClick(){
// Get start button element 
    var btn = document.querySelector("#startButton");
// Enable the start button
    btn.disabled=false;
// Add the event listner
    btn.addEventListener("click",function(){
//console log if button was clicked        
        console.log("button clickeddddd son");
        //get rid of container holding button 
        mkInvisible("#containerStart");
        mkVisible("#questionsContainer");
    });
};  
    
//}


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
            console.log(currentCity);
            
            // TODO: use function setText(selector)
            document.querySelector('.footer h6').innerHTML = currentCity;
            // document.querySelector('#map').setAttribute(`src`, location.mapUrl);
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
//document.querySelector("#btnColumn").addEventListener("click", onAnswerClick);
//
// getQuestions("easy");

