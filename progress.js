/**
 * @constructor 
*/
function Progress(){
	this.value = 0;
	this.animated = "yes";
	this.hide = "";
};


Progress.prototype = {
	/**
	 * Возврашает html круга progress.
	 *
	 * @private 
	*/
	_getTemplate: function(){
		return `
		<div class="progress">
			<div class="progress__overlap"></div>
		</div>
		`;
	},

	/**
	 * Находим элемент с классом progress.
	 *
	 * @private 
	*/
	_bind: function(){
		this.elemProgress = this._element.getElementsByClassName("progress")[0];
	},

	/**
	 * В течение времени duration, анимированно происходит прогресс от значения startValue и до установленного значения value.
	 *
	 * @private 
	 * @param {number} value - значение прогресса, от 0 и до 100, которое мы устанавливаем.
	*/
	_animateRender: function(value){
		let self = this;
		if(this.animateInterval){
			clearInterval(this.animateInterval);
		}

		let startValue = this.value;
		let duration = 1000;
		let delay = 50;
		let start =  new Date;
		let totalPath = value - this.value;


		this.animateInterval = setInterval(setStep, delay);
		
		function setStep(){
			let now = new Date;
			let progress = (now - start)/duration * 100;
			if(progress > 100){
				progress = 100;
				clearInterval(self.animateInterval);
				self.animateInterval = null;
			}
			let currentPath = totalPath * progress / 100;

			self.value = startValue +  currentPath;
			self._render(self.value + currentPath);
		};
	},

	/**
	 * Устанавливает параметр и запускает перерисовку прогресса.
	 *
	 * @param {string} mod - устанавливаемый параметр, либо "animated", либо "hide".  
	 * @param {string} state - значение устанавливаемого параметра.
	*/
	setMod: function(mod, state){
		this[mod] = state;
		this._render();
	},

	/**
	 * Устанавливает значение прогресса и запускает перерисовку.
	 *
	 * @param {number} value - значение прогресса, от 0 и до 100, которое мы устанавливаем.
	*/
	setValue: function(value){
		if(value > 100 || value < 0){
			alert("введите число от 0 и до 100");
			return;
		};

		if(this.animated == "yes"){
			this._animateRender(value);
		}else{
			this.value = value;
			this._render()
		};
	},

	/**
	 * Отрисовка прогресса и скрытие/показ прогресса.
	 * 
	 * @private
	*/
	_render: function(){
		if(this.hide == "yes"){
			this.elemProgress.classList.add("progress--hidden");
		}else{
			this.elemProgress.classList.remove("progress--hidden");
		}

		let deg = this.value * 360/100;
		if(0 <= this.value && this.value <= 50){
			this.elemProgress.style.background = `linear-gradient( 90deg, #EBEBE8 50%, transparent 50% ),linear-gradient(${deg+90}deg, #FFDB4D 50%, transparent 50% ),linear-gradient(270deg, #EBEBE8 50%, transparent 50% )`
		}else{
			this.elemProgress.style.background = `linear-gradient( 270deg, #FFDB4D 50%, transparent 50% ),linear-gradient(${deg+90}deg, #FFDB4D 50%, transparent 50% ),linear-gradient(90deg, #EBEBE8 50%, transparent 50% )`
		};
	},

	/**
	 * Если DOM-элемент прогресса не создан, то создает его.
	 *
	 * @return {HTMLElement} DOM-элемент прогресса.
	*/
	getElement: function(){
		if(!this._element){
			this._element = document.createElement('div');
			this._element.innerHTML = this._getTemplate();
			this._bind();
			this._render();
		}
		return this._element;
	}
};
