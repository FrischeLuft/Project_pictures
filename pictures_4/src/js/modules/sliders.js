const sliders = (slides, dir, prev, next) => {
	let slideIndex = 1,
		paused = false;

	const items = document.querySelectorAll(slides);

	function showSlides(n) {

		//Станадартный показ слайдов
		if (n > items.length) {
			slideIndex = 1;
		}

		if (n < 1) {
			slideIndex = items.length;
		}

		//Когда показываем определенный слайд, необходимо скрыть остальные
		items.forEach(item => {
			item.classList.add('animated');
			item.style.display = 'none';
		});

		items[slideIndex - 1].style.display = 'block';
	}
	//Первичная инициализация => для того, что когда пользователь зайдет на страницу => будут скрыты все остальные слайды
	//=> будет показан только первый слайд 

	showSlides(slideIndex);

	//Реализация функционала в слайдере
	function plusSlides(n) {
		showSlides(slideIndex += n);
	}

	//Позволяет использвать код, если 'например' кнопки не были переданы
	try {
		const prevBtn = document.querySelector(prev),
			nextBtn = document.querySelector(next);

		prevBtn.addEventListener('click', () => {
			plusSlides(-1);
			items[slideIndex - 1].classList.remove('slideInLeft');
			items[slideIndex - 1].classList.add('slideInRight');
		});

		nextBtn.addEventListener('click', () => {
			plusSlides(1);
			items[slideIndex - 1].classList.remove('slideInRight');
			items[slideIndex - 1].classList.add('slideInLeft');
		});
	} catch (e) { }

	//Автопереключение слайдов
	function activateAnimation() {
		if (dir === 'vertical') {
			paused = setInterval(function () {
				plusSlides(1);
				items[slideIndex - 1].classList.add('slideInDown');
			}, 3000);
		} else {
			paused = setInterval(function () {
				plusSlides(1);
				items[slideIndex - 1].classList.remove('slideInRight');
				items[slideIndex - 1].classList.add('slideInLeft');
			}, 3000);
		}
	}
	activateAnimation();

	items[0].parentNode.addEventListener('mouseenter', () => {
		clearInterval(paused);
	});
	items[0].parentNode.addEventListener('mouseleave', () => {
		activateAnimation();
	});

};

export default sliders;