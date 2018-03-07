/**
 * Добавляется элемент прогресса на страницу.
*/
let progress = new Progress;
let circleContainer = document.getElementsByClassName("circle-container")[0];
circleContainer.appendChild(progress.getElement());

/**
 * Нахождение input для ввода значения прогресса.
*/
let inputNumber = document.getElementsByClassName('switches__number')[0];

/**
 * Нахождение контейнера, который содержит переключатели.
*/
let mainSwitches = document.getElementsByClassName('switches')[0];

/**
 * Функционал ввода значения прогресса.
*/
inputNumber.addEventListener('input', function(){
	progress.setValue(+this.value);
});

/**
 * Функционал переключателей "hide" и "animate".
*/
mainSwitches.addEventListener('click', function(event){
	if(event.target.classList.contains("switches__toolBar")){
		if(event.target.classList.contains("switches__toolBar--on")){
			event.target.classList.remove("switches__toolBar--on");
			event.target.parentNode.classList.remove("switches__switch--on");
			if(event.target.classList.contains("switches__animate")){
				progress.setMod('animated', '');
			};
			if(event.target.classList.contains("switches__hide")){
				progress.setMod('hide', '');
			}
		}else{
			event.target.classList.add("switches__toolBar--on");
			event.target.parentNode.classList.add("switches__switch--on");
			if(event.target.classList.contains("switches__animate")){
				progress.setMod('animated', 'yes');
			};
			if(event.target.classList.contains("switches__hide")){
				progress.setMod('hide', 'yes');
			};
		}
	}
});