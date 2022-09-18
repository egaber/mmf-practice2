var questionNum = 1;
var maxQuestions = 30;
var correctAnswers = 0;
var mistakes = "";
var timeSeconds = 60;

var startTime = 0;
var num1=0;
var num2=0;


function showFinishedModal(title) {
	$("#finishedMsg").text(title);
	$("#correctAnswers").text(correctAnswers);
	$("#totalQuestions").text(questionNum - 1);
	$("#incorrectAnswers").html(mistakes == "" ? "None" : mistakes);
	$("#modalFinished").modal("show");	
}

function numEntered(num) {
	console.log("number key clicked");
	var sum = num1 + num2;

	var ans = $("#ans").text();
	console.log("current answer=" + ans);

	var val = new Number(num);
	$("#ans").text(val);

	if(sum<10){
		goNext();
	}else if(ans != "__"){
		$("#ans").text(ans + val);
		goNext();
	}
}

function goNext() {
	console.log("Go clicked " + questionNum);
	questionNum++;
	
	var ans = $("#ans").text();

	// check answer
	var sum = num1 + num2;

	console.log("sum=" + sum);
	
	$("#result").removeClass("alert-success alert-danger");	
	if (sum == ans) {
		correctAnswers++;
	} else {
		mistakes += "<li> " + num1 + " + " + num2 + " = " + sum + ",  not " + ans + "</li>";
	}


	$("#qnum").text(questionNum);	
	$("#ans").text("__");

	$("#questions-bar").css("width", (questionNum * 100 / maxQuestions) + "%");


	if (questionNum == maxQuestions) {
		$("#time-bar").stop();
		showFinishedModal("Finished all questions!");
		return;
	}
	
	this.num1 = Math.floor(Math.random() * 10);
	this.num2 = Math.floor(Math.random() * 10);

	$("#num1").text(num1);
	$("#num2").text(num2);

	$("#btnGo").attr("disabled", "disabled");
	$("#btnDel").attr("disabled", "disabled");

}



$(function() {
    FastClick.attach(document.body);
});

$(function() {

$("#btnTryAgain").click(function() {
	location.reload(true);

});

$("#ans").text("__");

$("#num1").text(Math.floor(Math.random() * 10));
$("#num2").text(Math.floor(Math.random() * 10));

startTime = Date.now();

var intervalId = window.setInterval(function() {
	var elapsed = (Date.now() - startTime);
	//console.log("time elapsed " + elapsed);

	var elapsedPercent = elapsed * 100 / (timeSeconds * 1000);

	$("#time-bar").css("width", elapsedPercent + "%");

	if (elapsed > timeSeconds * 1000) {
		console.log("Time is over");
		clearInterval(intervalId);
		showFinishedModal("Sorry, time is up!");
	}

}, 500);


});

$("body").keypress(function(event) {
	console.log ("key pressed: " + event.which + " num=" + (event.which - 48));

	var which = event.which;

	if (which == 13) {
		console.log("go");
		goNext();
	} else if (which > 48 && which < 48 + 10) {
		var num = which - 48;

		console.log ("num pressed = " + num);
		numEntered(num);
	}
});

$("#keys button").click(function() {
console.log("button click val=" + $(this).val());
var num1 = $("#num1").val();
var num2 = $("#num2").val();

var isSingle = num1+num2 < 10


var val = $(this).val();
var ans = $("#ans").text();

if (!isNaN(val)) {
	numEntered(val, isSingle);
}

});

