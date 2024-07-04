/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/modules/forms.js":
/*!*********************************!*\
  !*** ./src/js/modules/forms.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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

  //Асинхронная функция для отправки данных:
  //postData: функция, которая отправляет данные формы на сервер и возвращает ответ сервера
  const postData = async (url, data) => {
    let res = await fetch(url, {
      method: "POST",
      body: data
    });
    return await res.text();
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
    item.addEventListener('submit', e => {
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
      postData(api, formData).then(res => {
        console.log(res);
        statusImg.setAttribute('src', message.ok);
        textMessage.textContent = message.success;
      }).catch(() => {
        statusImg.setAttribute('src', message.fail);
        textMessage.textContent = message.failure;
      }).finally(() => {
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./src/js/modules/modals.js":
/*!**********************************!*\
  !*** ./src/js/modules/modals.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const modals = () => {
  let btnPressed = false;
  function bindModal(triggerSelector, modalSelector, closeSelector, destroy = false) {
    const trigger = document.querySelectorAll(triggerSelector),
      modal = document.querySelector(modalSelector),
      close = document.querySelector(closeSelector),
      windows = document.querySelectorAll('[data-modal]'),
      scroll = calcScroll();
    trigger.forEach(item => {
      item.addEventListener('click', e => {
        if (e.target) {
          e.preventDefault();
        }
        btnPressed = true;
        if (destroy) {
          item.remove();
        }
        windows.forEach(item => {
          item.style.display = 'none';
          item.classList.add('animated', 'fadeIn');
        });
        modal.style.display = "block";
        document.body.style.overflow = "hidden";
        document.body.style.marginRight = `${scroll}px`;
      });
    });
    close.addEventListener('click', () => {
      windows.forEach(item => {
        item.style.display = 'none';
      });
      modal.style.display = "none";
      document.body.style.overflow = "";
      document.body.style.marginRight = `0px`;
    });
    modal.addEventListener('click', e => {
      if (e.target === modal) {
        windows.forEach(item => {
          item.style.display = 'none';
        });
        modal.style.display = "none";
        document.body.style.overflow = "";
        document.body.style.marginRight = `0px`;
      }
    });
  }
  function showModalByTime(selector, time) {
    setTimeout(function () {
      let display;
      document.querySelectorAll('[data-modal]').forEach(item => {
        if (getComputedStyle(item).display !== 'none') {
          display = "block";
        }
      });
      if (!display) {
        document.querySelector(selector).style.display = 'block';
        document.body.style.overflow = "hidden";
        let scroll = calcScroll();
        document.body.style.marginRight = `${scroll}px`;
      }
    }, time);
  }
  function calcScroll() {
    let div = document.createElement('div');
    div.style.width = '50px';
    div.style.height = '50px';
    div.style.overflowY = 'scroll';
    div.style.visibility = 'hidden';
    document.body.appendChild(div);
    let scrollWidth = div.offsetWidth - div.clientWidth;
    div.remove();
    return scrollWidth;
  }
  function openByScroll(selector) {
    window.addEventListener('scroll', () => {
      let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
      if (!btnPressed && window.scrollY + document.documentElement.clientHeight >= scrollHeight) {
        document.querySelector(selector).click();
      }
    });
  }
  bindModal('.button-design', '.popup-design', '.popup-design .popup-close');
  bindModal('.button-consultation', '.popup-consultation', '.popup-consultation .popup-close');
  bindModal('.fixed-gift', '.popup-gift', '.popup-gift .popup-close', true);
  openByScroll('.fixed-gift');
  // showModalByTime('.popup-consultation', 5000);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modals);

/***/ }),

/***/ "./src/js/modules/sliders.js":
/*!***********************************!*\
  !*** ./src/js/modules/sliders.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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
  } catch (e) {}

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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (sliders);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_modals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/modals */ "./src/js/modules/modals.js");
/* harmony import */ var _modules_sliders__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/sliders */ "./src/js/modules/sliders.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/forms */ "./src/js/modules/forms.js");



window.addEventListener('DOMContentLoaded', () => {
  'use strict';

  (0,_modules_modals__WEBPACK_IMPORTED_MODULE_0__["default"])();
  (0,_modules_sliders__WEBPACK_IMPORTED_MODULE_1__["default"])('.feedback-slider-item', 'horizontal', '.main-prev-btn', '.main-next-btn');
  (0,_modules_sliders__WEBPACK_IMPORTED_MODULE_1__["default"])('.main-slider-item', 'vertical');
  (0,_modules_forms__WEBPACK_IMPORTED_MODULE_2__["default"])();
});
/******/ })()
;
//# sourceMappingURL=script.js.map