import { getResource } from '../services/requests';

const showMoreStyles = (trigger, wrapper) => {
	const btn = document.querySelector(trigger);

	// cards.forEach(card => {
	// 	card.classList.add('animated', 'fadeInUp');
	// });

	// btn.addEventListener('click', () => {
	// 	cards.forEach(card => {
	// 		card.classList.remove('hidden-lg', 'hidden-md', 'hidden-sm', 'hidden-xs');
	// 		card.classList.add('col-sm-3', 'col-sm-offset-0', 'col-xs-10', 'col-xs-offset-1');
	// 	});
	// 	//btn.style.display = 'none';
	// 	btn.remove();
	// });

	btn.addEventListener('click', function () {
		getResource('http://localhost:3000/styles')
			.then(res => createCards(res))
			.catch(error => console.log(error));

		this.remove(); //Стрелочная функция не будет ссылаться в контексте на событие, на котором прошло событие;
		//Безымянная функция будет ссылаться на это событие => т.е this = btn 
	});

	//Сервер возвращает массив c объектами(res) => этот массив мы передаем в createCards

	function createCards(response) {
		//Берется этот массив (response) => массив перебирается 
		//item - это каждый отдельный объект, который будет находится внутри массива 
		//Далее создаются карточки и помещаются во wrapper
		response.forEach(item => {
			let card = document.createElement('div');

			card.classList.add('animated', 'fadeInUp', 'col-sm-3', 'col-sm-offset-0', 'col-xs-10', 'col-xs-offset-1');

			card.innerHTML = `
				<div class="styles-block">
					<img src=${item.src} alt="style">
					<h4>${item.title}</h4>
					<a href=${item.link}>Подробнее</a>
				</div>
			`;

			document.querySelector(wrapper).appendChild(card);
		});
	};

	// 	<div class="hidden-lg hidden-md hidden-sm hidden-xs styles-2">
	// 	<div class=styles-block>
	// 		<img src=assets/img/styles-5.jpg alt>
	// 		<h4>Пастелью</h4>
	// 		<a href="#">Подробнее</a>
	// 	</div>
	// </div>
};

export default showMoreStyles;