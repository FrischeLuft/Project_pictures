const mask = (selector) => {

	//Вспомогательная функция setCursorPosition
	//Функция отвечает за постановку курсора в поле ввода:

	//pos — Позиция курсора, которую нужно установить
	//elem — Элемент поля ввода
	let setCursorPosition = (pos, elem) => {
		elem.focus(); //Устанавливаем фокус на поле ввода

		if (elem.setSelectionRange) { //Если метод доступен
			elem.setSelectionRange(pos, pos); //Устанавлиаем курсор на позицию 'pos'
		} else if (elem.createTextRange) {
			let range = elem.createTextRange();

			range.collapse(true);
			range.moveEnd('character', pos);
			range.moveStart('character', pos);
			range.select();
		}
	};

	//Основная функция, которая создает маску для телефонного номера
	function createMask(event) {
		let matrix = '+7 (___) ___ __ __', //Маска телефоннного номера 
			i = 0, //Счетчик символов
			def = matrix.replace(/\D/g, ''), //Получаем только цифры из маски 
			val = this.value.replace(/\D/g, ''); //Убираем все нецифровые символы из введенных данных 

		if (def.length >= val.length) { //Если введенное значение короче или равно маске, обновляем значение 
			val = def;
		}

		//Обновляем поле ввода в соотвествии с маской
		this.value = matrix.replace(/./g, function (a) {
			return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
		});

		//Пример 1
		//Маска: '+7 (___) ___ __ __'

		//Введенные данные: '1234567890'

		//val: '1234567890' (все цифры без нецифровых символов)

		//Процесс:

		// matrix.replace(/./g, function (a) { ... }); заменяет каждый символ в matrix:
		// Символы маски (, ), и пробелы остаются без изменений.
		// Подчеркивания _ заменяются на цифры из val в порядке их поступления.
		// Как только все цифры из val использованы, оставшиеся подчеркивания _ будут удалены.
		// Результат:

		//Результат: '+7 (123) 456 78 90'

		// Устанавливаем курсор в конец введённых данных при каждом вводе или фокусировке
		if (event.type === 'blur') {
			if (this.value.length == 2) { // Очищаем поле, если значение слишком короткое при потере фокуса
				this.value = '';
			}
		} else {
			setCursorPosition(this.value.length, this); // Устанавливаем курсор в конец текста
		}
	}

	// Применяем маску ко всем элементам, соответствующим селектору
	let inputs = document.querySelectorAll(selector);

	inputs.forEach(input => {
		input.addEventListener('input', createMask); // Применяем маску при вводе
		input.addEventListener('focus', createMask); // Применяем маску при фокусировке
		input.addEventListener('blur', createMask); // Применяем маску при потере фокуса
	});
};

export default mask;

//Функция mask предназначена 'например' для создания маски ввода телефонного номера
//с помощью маски в формате +7 (___) ___ __ __
