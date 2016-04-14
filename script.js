var running = false;
var go = true;
var start = 25;
var pause = 5;
var audio = new Audio('bell.mp3');

function displayToSeconds(str) {
	var minutes = Number(str.split(':')[0]);
	var seconds = Number(str.split(':')[1]);
	var result = minutes * 60 + seconds;
	return result;
}

function displayFromMinutes(num) {
	return num + ':00'
}

function displayFromSeconds(num) {
	var seconds = num % 60;	
	var minutes = (num - seconds) / 60;
	var time = '';

	if (seconds < 10) {
		seconds = "0" + seconds;
	}

	time += minutes;
	time += ':';
	time += seconds;
	return time;
}

function updateTime() {
	var num = displayToSeconds($('#remaining').text());

	if (num > 1) {
		num -= 1;
	} else if (go) {
		
		// switch to break mode
		audio.play();
		num = pause * 60;
		go = false;
		$('#timer').removeClass('green').addClass('red');
		$('#status').text('Sit back')


	} else if (!go) {

		// switch to work mode
		audio.play();
		num = start * 60;
		go = true;
		$('#timer').removeClass('red').addClass('green');
		$('#status').text('Work it!')

	}
	
	$('#remaining').text(displayFromSeconds(num));
}

function reset() {
	running = false;
	go = true;
	window.clearInterval(update);
	$('#remaining').text(displayFromMinutes(start))
	$('#work').text(start)
	$('#break').text(pause)
	$('#timer').removeClass('green red');
	$('#status').text('Ready?')

}

$(document).ready(function(){
	$('#remaining').text(displayFromMinutes(start));
	$('#work').text(start)
	$('#break').text(pause)

	$('#reset').click(function(){
		reset();
	})

	$('#workDown').click(function(){
		if (start > 1) {
			start -= 1;
			$('#work').text(start);
			if (!running) {
				$('#remaining').text(displayFromMinutes(start));
			}
		}
	});

	$('#workUp').click(function(){

		start += 1;
		$('#work').text(start);
		if (!running) {
			$('#remaining').text(displayFromMinutes(start));
		}
	});

	$('#breakDown').click(function(){
		if (pause > 1) {
			pause -= 1;
			$('#break').text(pause);
		}
	});

	$('#breakUp').click(function(){
		pause += 1;
		$('#break').text(pause);
	});

	$('#timer').click(function(){

		if (go) {
			$(this).removeClass('red');
			$(this).addClass('green');
			$('#status').text('Work it!');
		} else {
			$(this).removeClass('green');
			$(this).addClass('red');
			$('#status').text('Sit back');
		}

		if (!running) {
			running = true;
			update = window.setInterval(updateTime, 1000);
		} else if (running) {
			running = false;
			window.clearInterval(update);
			$('#status').text('Paused');
		}
		
	})
});