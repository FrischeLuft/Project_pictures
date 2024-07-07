import { postData } from "../services/requests";

const forms = () => {
	//Определение переменных:
	const form = document.querySelectorAll('form'),
		inputs = document.querySelectorAll('input'),
		upload = document.querySelectorAll('[name="upload"]');

	//Сообщение и пути для отправки:
	const message = {
		loading: 'Загрузка...',
		success: 'Спасибо! Скоро мы с вами свяжемся',
		failure: 'Что-то пошло не так...',
		spinner: 'assets/img/spinner.gif',
		ok: 'assets/img/ok.png',
		fail: 'assets/img/fail.png'
	};
	//Объект с путями к серверным скриптам для отправки данных:
	const path = {
		designer: 'assets/server.php',
		question: 'assets/question.php'
	};

	//Очистка полей ввода:
	const clearInputs = () => {
		inputs.forEach(item => {
			item.value = '';
		});
		upload.forEach(item => {
			item.previousElementSibling.textContent = "Файл не выбран";
		});
	};

	//Обработка выбора файлов:
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

	//Обработка отправки формы:
	form.forEach(item => {
		item.addEventListener('submit', (e) => {
			e.preventDefault();

			let statusMessage = document.createElement('div');
			statusMessage.classList.add('status');
			item.parentNode.appendChild(statusMessage);

			item.classList.add('animated', 'fadeOutUp');
			setTimeout(() => {
				item.style.display = 'none';
			}, 400);

			let statusImg = document.createElement('img');
			statusImg.setAttribute('src', message.spinner);
			statusImg.classList.add('animated', 'fadeInUp');
			statusMessage.appendChild(statusImg);

			let textMessage = document.createElement('div');
			textMessage.textContent = message.loading;
			statusMessage.appendChild(textMessage);

			//При помощи formData собираем все данные из формы:
			const formData = new FormData(item);
			let api;
			item.closest('.popup-design') || item.classList.contains('calc_form') ? api = path.designer : api = path.question;
			console.log(api);

			postData(api, formData)
				.then(res => {
					console.log(res);
					statusImg.setAttribute('src', message.ok);
					textMessage.textContent = message.success;
				})
				.catch(() => {
					statusImg.setAttribute('src', message.fail);
					textMessage.textContent = message.failure;
				})
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

//Добавляет обработчик событий на отправку для каждой формы.
//Отменяет стандартное поведение отправки формы (e.preventDefault()).
//Создает элемент для отображения статуса отправки и добавляет его на страницу.
//Добавляет анимацию и прячет форму.
//Отображает спиннер (картинка загрузки) и сообщение о загрузке.
//Собирает данные формы и определяет, на какой серверный скрипт их отправлять.
//Отправляет данные формы на сервер с помощью postData.
//Обрабатывает успешный или неудачный ответ сервера, изменяя изображение и сообщение статуса.
//Очищает поля ввода и через 5 секунд возвращает форму в исходное состояние.

export default forms;