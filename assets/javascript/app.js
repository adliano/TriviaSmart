// Global Variables \\
// "https://media.giphy.com/media/Ax0kmy0IEqq9W/giphy.gif";
//"https://media.giphy.com/media/BPZenX37AtXyw/giphy.gif";
// Save interval ID to be able to stop when need it
// Time given to user to answer 30 seconds

/******************************************************************************/
/* * * * * * * * * * * * * * * * getQuestions() * * * * * * * * * * * * * * * */
/******************************************************************************/
// Function to get 10 questions from API and save on JSON object
// Get questions from API using promisses
// Save the object
//
// Array with Questions keys
// Enable Start Button after data ia loaded
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


/*******************************************************************************/
/* * * * * * * * * * * * * * * mkInvisible() * * * * * * * * * * * * * * * * * */
/*******************************************************************************/
// function used to make element invisible, argument for function will be ids or classes


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
    // Get start button element 
    // Enable the start button
    // Add the event listner
    // remove Start button from view 
    // Add the Question container on view
//}


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

//document.querySelector("#reloadButton").addEventListener("click", onReloadClick);

// Add the onclick listener to answers buttons
//document.querySelector("#btnColumn").addEventListener("click", onAnswerClick);
//
// getQuestions("easy");

