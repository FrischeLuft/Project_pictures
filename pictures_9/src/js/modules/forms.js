import { postData } from '../services/requests';

//Объявление функции 'forms', которая настраивает обработку форм на веб-странице:
const forms = () => {

	//Выбор всех форм, инпутов и атрибутов name="upload"
	const form = document.querySelectorAll('form'),
		inputs = document.querySelectorAll('input'),
		upload = document.querySelectorAll('[name="upload"]'),
		selects = document.querySelectorAll('select'),
		calcPriceDiv = document.querySelector('.calc-price');

	//Создание объекта 'message' с текстами сообщений и путями к изображениям:
	const message = {
		loading: 'Загрузка...',
		success: 'Спасибо! Скоро мы с вами свяжемся',
		failure: 'Что-то пошло не так...',
		spinner: 'assets/img/spinner.gif',
		ok: 'assets/img/ok.png',
		fail: 'assets/img/fail.png'
	};

	//Создание объекта 'path' с путями для отправки данных:
	const path = {
		designer: 'assets/server.php',
		question: 'assets/question.php'
	};

	//Функция clearInputs для очистки всех инпутов и сброса текста у элементов загрузки файлов:
	const clearInputs = () => {
		inputs.forEach(item => {
			item.value = '';
		});
		upload.forEach(item => {
			item.previousElementSibling.textContent = "Файл не выбран";
		});
	};

	//Добавление обработчиков событий для 'input' загрузки файлов:
	//При изменении файла в инпуте, выводится его имя, обрезанное до 6 символов, если оно длинное 
	upload.forEach(item => {
		item.addEventListener('input', () => {
			console.log(item.files[0]);
			let dots;
			const arr = item.files[0].name.split('.');

			arr[0].length > 6 ? dots = "..." : dots = '.';
			const name = arr[0].substring(0, 6) + dots + arr[1];
			item.previousElementSibling.textContent = name;
		});
	});

	//Добавление обработчиков событий для отправки формы:

	form.forEach(item => {
		//1. При отправке формы, предотвращается стандартное поведение (перезагрузка страницы)
		item.addEventListener('submit', (e) => {
			e.preventDefault();

			//* Получаем текстовое содержимое элемента .calc-price
			const calcPrice = calcPriceDiv ? calcPriceDiv.textContent : '0';

			//2. Создается элемент div для отображения статуса отправки, который добавляется на страницу
			let statusMessage = document.createElement('div');
			statusMessage.classList.add('status');
			item.parentNode.appendChild(statusMessage);

			//3. Форма плавно скрывается 
			item.classList.add('animated', 'fadeOutUp');
			setTimeout(() => {
				item.style.display = 'none';
			}, 400);

			//4. Создается и добавляется изображение статуса с анимацией
			let statusImg = document.createElement('img');
			statusImg.setAttribute('src', message.spinner);
			statusImg.classList.add('animated', 'fadeInUp');
			statusMessage.appendChild(statusImg);

			//5. Cоздается и добавляется текствое сообщение 'Загрузка...'
			let textMessage = document.createElement('div');
			textMessage.textContent = message.loading;
			statusMessage.appendChild(textMessage);

			//6. Считываются данные формы в объект 'FormData'
			const formData = new FormData(item);
			let api;

			//*  Добавление выбранных опций из всех селекторов
			selects.forEach(select => {
				const selectedOption = select.options[select.selectedIndex];
				formData.append(select.id, selectedOption.textContent);
			});

			//* Добавление содержимого calc-price в FormData
			formData.append('calc_price', calcPrice);


			//7. Определяем, на какой сервер отправлять данные, в зависимости от класса или родителя формы:
			item.closest('.popup-design') || item.classList.contains('calc_form') ? api = path.designer : api = path.question;
			console.log(api);

			//8. Данные отправляются на сервер с использваоние функции 'postData'
			postData(api, formData)

				//9. При успешной отправке изображение и текст обновляются на успешные 
				.then(res => {
					console.log(res);
					statusImg.setAttribute('src', message.ok);
					textMessage.textContent = message.success;
				})
				//10. При ошибке изображение и текст обновляются на ошибочные 
				.catch(() => {
					statusImg.setAttribute('src', message.fail);
					textMessage.textContent = message.failure;
				})
				//11. После отправки форма очищается, а сообщение со статусом удаляется через 5 секунд, форма становится видимой
				.finally(() => {
					clearInputs();
					setTimeout(() => {
						statusMessage.remove();
						item.style.display = 'block';
						item.classList.remove('fadeOutUp');
						item.classList.add('fadeInUp');
					}, 5000);
				});
		});
	});
};

//12. Экспорт функции 'forms' для использования в других частях приложения
export default forms;