//getting all the required elements
const start_btn = document.querySelector(".start-btn button");
const welcome_box = document.querySelector(".welcome-box");
const content_box = document.querySelector(".content-box");
const exit_btn = content_box.querySelector(".bottom-btn .quit");
const continue_btn = document.querySelector(".bottom-btn .restart");
const quiz_box = document.querySelector(".quiz-box");
const timeCount = quiz_box.querySelector(".timer .timer-sec");
const timeLine = quiz_box.querySelector("header .time-line");
const timeOff = quiz_box.querySelector("header .time-text");
 

const option_list = document.querySelector(".option-list");



//when start quiz button is clicked
start_btn.onclick = ()=>{
	content_box.classList.add("activeContent");//show the content box
	welcome_box.style.display = "none"; //hides the welcome box
} 

//when exit quiz button is clicked
exit_btn.onclick = ()=>{
	content_box.classList.remove("activeContent");//hides the content box
	welcome_box.style.display = "block"; //hides the welcome box
	
} 

//when continue quiz button is clicked
continue_btn.onclick = ()=>{
	content_box.classList.remove("activeContent");//hides the content box
	quiz_box.classList.add("activeQuiz");//shows the quiz box
	showQuestions(0);
	queCounter(1);
	startTimer(15);
	startTimerLine(0);
} 

let que_count = 0;
let que_numb = 1;
let counter;
let counterLine;
let timeValue = 15;
let widthValue = 0;
let userScore = 0;

const next_btn = quiz_box.querySelector(".next-btn");
const result_box = document.querySelector(".result-box");
const restart_quiz = result_box.querySelector(".bottom-btn .restart");
const quit_quiz = result_box.querySelector(".bottom-btn .quit");

restart_quiz.onclick = ()=>{
	result_box.classList.remove("activeResult");
	quiz_box.classList.add("activeQuiz");
	let que_count = 0;
	let que_numb = 1;
	let timeValue = 15;
	let widthValue = 0;
	let userScore = 0;
	showQuestions(que_count);
    queCounter(que_numb);
    clearInterval(counter);
    startTimer(timeValue);
    clearInterval(counterLine);
    startTimerLine(widthValue);
    next_btn.style.display = "none";  
}

quit_quiz.onclick = ()=>{
	window.location.reload();
}

//when next quiz button is clicked
next_btn.onclick = ()=>{
	if (que_count < questions.length - 1) {
		que_count++;
		que_numb++;
	    showQuestions(que_count);
	    queCounter(que_numb);
	    clearInterval(counter);
	    startTimer(timeValue);
	    clearInterval(counterLine);
	    startTimerLine(widthValue);
	    next_btn.style.display = "none";    
	}else{
		console.log("Questions completed");
		showResultBox();
	}
}

//Gets the questions and options from array
function showQuestions(index){
	const que_text = document.querySelector(".que-text");
	let que_tag = '<span>'+ questions[index].numb +". " + questions[index].question +'</span>';
	let option_tag = '<div class="option">'+ questions[index].options[0] +'<span></span></div>'
	                  + '<div class="option">'+ questions[index].options[1] +'<span></span></div>'
	                  + '<div class="option">'+ questions[index].options[2] +'<span></span></div>'
	                  + '<div class="option">'+ questions[index].options[3] +'<span></span></div>'
	que_text.innerHTML = que_tag;
	option_list.innerHTML = option_tag;
	const option = option_list.querySelectorAll(".option");
	for (let i = 0; i < option.length; i++) {
		option[i].setAttribute("onclick", "optionSelected(this)");
	}
}

let tickIcon = '<div class="icon tick"><i class="uil uil-check"></i></div>';
let crossIcon = '<div class="icon cross"><i class="uil uil-times"></i></div>';


//This shows if the correct answer is clicked 
function optionSelected(answer){
	clearInterval(counter);
	clearInterval(counterLine);
	let userAns = answer.textContent;
	let correctAns = questions[que_count].answer;
	let allOptions = option_list.children.length;

	if (userAns == correctAns) {
		userScore += 1;
		console.log(userScore);
		answer.classList.add("correct");
		console.log("correct answer");
		
	}else{
		answer.classList.add("incorrect");
		console.log("wrong answer");
		answer.insertAdjacentHTML("beforeend", crossIcon);
	}

	//if an incorrect answer is clicked, automatically select the correct answer
	for (let i = 0; i < allOptions; i++) {
		if (option_list.children[i].textContent == correctAns) {
			option_list.children[i].setAttribute("class", "option correct");
			option_list.children[i].insertAdjacentHTML("beforeend", tickIcon);
		}
	}

	//once the user clicks the correct answer, disable all other options
	for (let i = 0; i < allOptions; i++) {
		option_list.children[i].classList.add("disabled");
	}
	next_btn.style.display = "block";
}

//shows the result box
function showResultBox(){
	content_box.classList.remove("activeContent");//hides the content box
	quiz_box.classList.remove("activeQuiz");//hides the quiz box
	result_box.classList.add("activeResult");//shows the result box
	const scoreText = result_box.querySelector(".score-text");
	if (userScore > 5) {
		let scoreTag = '<span>Congrats! You scored <p>'+ userScore +'</p>out of <p>'+ questions.length +'</p></span>';
		scoreText.innerHTML = scoreTag;
	}
	else if(userScore > 3) {
		let scoreTag = '<span>Nice, You scored only<p>'+ userScore +'</p>out of <p>'+ questions.length +'</p></span>';
		scoreText.innerHTML = scoreTag;
	}
	else{
		let scoreTag = '<span>Sorry, You scored only<p>'+ userScore +'</p>out of <p>'+ questions.length +'</p></span>';
		scoreText.innerHTML = scoreTag;
	}
}

//The timer counter
function startTimer(time){
	counter = setInterval(timer, 1000);
	function timer(){
		timeCount.textContent = time;
		time--;
		if (time < 9) {
			let addZero = timeCount.textContent;
			timeCount.textContent = "0" + addZero;
		}
		if (time < 0) {
			clearInterval(counter);
			timeCount.textContent = "00";
			timeOff.textContent = "Time Off";

			let correctAns = questions[que_count].answer;
	        let allOptions = option_list.children.length;

	        for (let i = 0; i < allOptions; i++) {
				if (option_list.children[i].textContent == correctAns) {
					option_list.children[i].setAttribute("class", "option correct");
					option_list.children[i].insertAdjacentHTML("beforeend", tickIcon);
				}
			}

			for (let i = 0; i < allOptions; i++) {
				option_list.children[i].classList.add("disabled");
			}
			next_btn.style.display = "block";
		}
	}
}

function startTimerLine(time){
	counterLine = setInterval(timer, 29); //29 is a time in milliseconds that means the timer function will run after every 29 ms 
	function timer(){
		time += 1;
		timeLine.style.width = time + "px";
		
		if (time > 549) { //and 549 means if the time is greater than 549 then execute the given codes.
			clearInterval(counterLine);
		}
	}
}


	
//makes the bottom counter count
function queCounter(index){
	const bottom_que_counter = quiz_box.querySelector(".total-que");
    let totalQueCountTag = '<span><p>'+ index +'</p>of<p>'+ questions.length +'</p>Questions</span>'
    bottom_que_counter.innerHTML = totalQueCountTag;
}

