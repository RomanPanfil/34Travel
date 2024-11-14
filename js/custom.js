
$(document).ready(function() {

	//Подключаем попап на страницах
	$( ".popup-with-form" ).each(function() {
		$(this).magnificPopup({
			type: 'inline',
			preloader: false,
		});
	  });

	  $( ".popup-with-form_faves" ).each(function() {
		let href = $(this).data('href');

		$(this).magnificPopup({
			items: {
				src: href,
				type: 'inline'
			},
			preloader: false,
		});
	});
	

	//Стилизуем select

	$('.form__select').each(function() {
		const _this = $(this),
			selectOption = _this.find('option'),
			selectOptionLength = selectOption.length,
			selectedOption = selectOption.filter(':selected'),
			duration = 450; 

		_this.hide();
		_this.wrap('<div class="select"></div>');
		$('<div>', {
			class: 'new-select',
		}).insertAfter(_this);
		$('<span>', {
			text: _this.children('option:disabled').text()
		}).appendTo('.new-select');

		const selectHead = _this.next('.new-select');
		const selectHeadBlock = selectHead.find('span');
		$('<div>', {
			class: 'new-select__list'
		}).insertAfter(selectHead);

		const selectList = selectHead.next('.new-select__list');
		if(selectOptionLength > 1) {
			for (let i = 1; i < selectOptionLength; i++) {
				$('<div>', {
					class: 'new-select__item',
					html: $('<span>', {
						text: selectOption.eq(i).text()
					})
				})
				.attr('data-value', selectOption.eq(i).val())
				.appendTo(selectList);
			}
			$('<div>', {
				class: 'new-select__item',
				html: $('<span>', {
					text: '... без коллекции'
				})
			})
			.prependTo(selectList);

		} else if (selectOptionLength == 1) {
			selectHead.addClass('empty');
			$('<div>', {
				class: 'new-select__item',
				html: $('<span>', {
					text: '... без коллекции'
				})
			})
			.appendTo(selectList);
		}

		const createCollection = $('#form__create');
		$(createCollection).on('submit',function(event) {
			event.preventDefault();
		});

		const selectItem = selectList.find('.new-select__item');
		selectList.slideUp(0);
		selectHead.on('click', function() {
			if(!$(this).hasClass('empty')) {
				if ( !$(this).hasClass('on') ) {
					$(this).addClass('on');
					selectList.slideDown(duration);
	
					selectItem.on('click', function() {
						let chooseItem = $(this).data('value');
	
						$('select').val(chooseItem).attr('selected', 'selected');
						selectHeadBlock.text( $(this).find('span').text() );
	
						selectList.slideUp(duration);
						selectHead.removeClass('on');
					});
	
				} else {
					$(this).removeClass('on');
					selectList.slideUp(duration);
				}
			}
			
		});

		
	});

	//Валидация форм
	$(".form").each(function() {
		$(this).validate({
			rules: {
				email: {
					required: true,
					email: true,
					minlength: 5
				},
				pass: {
					required: true,
					minlength: 8
				},
				old_pass: {
					required: true,
					minlength: 8
				},
				new_pass: {
					required: true,
					minlength: 8
				},
				repeat_pass: {
					required: true,
					minlength: 8
				},
				name: {
					required: true,
					minlength: 2
				}
			},
			messages: {
				email: {
					required: "Введите Email",
					minlength: "Поле должно быть более 5-ти символов",
					email: "Некорректно введен Email"
				},
				name: {
					required: "Введите название",
					minlength: "Поле должно быть более 2 символов"
				},
				pass: {
					required: "Введите пароль",
					minlength: "Пароль должно быть более 8 символов",
				},
				old_pass: {
					required: "Введите старый пароль",
					minlength: "Пароль должно быть более 8 символов",
				},
				new_pass: {
					required: "Введите новый пароль",
					minlength: "Пароль должно быть более 8 символов"
				},
				repeat_pass: {
					required: "Повторите пароль",
					minlength: "Пароль должно быть более 8 символов",
				}
			},
			focusInvalid: true,
		});
	});

	//Устанавливаем куки
	function cookieSet() {
		if($.cookie('user_agree')) {
			$(".bottom__cookies").addClass("closed")
		}

		$("#bottom__cookies").on("click", function(){
			$.cookie("user_agree", "Yes", {expires: 72 / 24}); 
			$(".bottom__cookies").addClass("closed")
	   })
	}

	cookieSet();



	 //Открываем форму поиска
	 $('.open__search').each(function() {
		$(this).click(function(){
			if(!$('html').hasClass('search-visible')) {
				$('html').addClass('search-visible').removeClass('menu-open').find('.search__form input[type="text"]').focus();
				$('.user-menu-box').removeClass('visible');
			}
			else {
				$('html').removeClass('search-visible');
			}
		});
	});

	$('.search__form').click(function(e){
        e.stopPropagation();
    })

	//Добавляем желтый бэкграунд для чекбоксов подписки

	$('.subscription__tariffs_check .custom-radio').each(function() {
		$(this).click(function(){
			$('.subscription__tariffs_check .custom-radio').each(function() {
				$('.subscription__tariffs_item').removeClass('active');
			})
			$(this).closest('.subscription__tariffs_item').addClass('active');
		});
	})


	//Открываем скрытый текст в подписках
	$('.subscription_open-hidden').click(function(){
		$('.subscription__hidden').toggleClass('open');
	})

	//Табы для страницы подписок

	$('.tabs__wrapper').each(function() {
		let ths = $(this);
		ths.find('.tab__item').not(':first').hide();
		ths.find('.tab').click(function() {
			ths.find('.tab').removeClass('active').eq($(this).index()).addClass('active');
			ths.find('.tab__item').hide().eq($(this).index()).fadeIn()
		}).eq(0).addClass('active');
	});

	//переключение экшенов в карточках избранного/коллекций
	$(document).on('click', '.faves__item_action_toggler', function(e) {
		e.preventDefault();
		const cur = $(this).find('.faves__item_action_drop');
		$('.faves__item_action_drop').not(cur).removeClass('opened');
		$(this).find('.faves__item_action_drop').toggleClass('opened');
	});

	//переключение экшенов в карточках избранного/коллекций
	$(document).on('mouseup',function(e){
    if (
			$('.faves__item_action_drop.opened').has(e.target).length === 0 
			&& $('.faves__item_action').has(e.target).length === 0
		) {
			$('.faves__item_action_drop.opened').removeClass('opened');
    }
	});

	// Получаем текущую дату
	let today = new Date();
	// Форматируем дату в строку dd.mm.yyyy
	let dd = String(today.getDate()).padStart(2, '0');
	let mm = String(today.getMonth() + 1).padStart(2, '0');
	let yyyy = today.getFullYear();
	let todayFormatted = dd + '.' + mm + '.' + yyyy;

	$.datepicker.regional['ru'] = {
        closeText: 'Закрыть',
        prevText: 'Предыдущий',
        nextText: 'Следующий',
        currentText: 'Сегодня',
        monthNames: ['Январь','Февраль','Март','Апрель','Май','Июнь',
        'Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
        monthNamesShort: ['Янв','Фев','Мар','Апр','Май','Июн',
        'Июл','Авг','Сен','Окт','Ноя','Дек'],
        dayNames: ['воскресенье','понедельник','вторник','среда','четверг','пятница','суббота'],
        dayNamesShort: ['вск','пнд','втр','срд','чтв','птн','сбт'],
        dayNamesMin: ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'],
        weekHeader: 'Нед',
        dateFormat: 'dd.mm.yy',
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ''
      };
      $.datepicker.setDefaults($.datepicker.regional['ru']);

      $('#datepicker').datepicker({
        dateFormat: 'dd.mm.yy',
        minDate: 0,
        autoclose: true
    });

	// Устанавливаем сегодняшнюю дату в поле ввода
	$('#datepicker').val(todayFormatted);

	//Стилизуем select в группе
	$('.form__select-group').each(function() {
		const _this = $(this),
			selectOption = _this.find('option'),
			selectOptionLength = selectOption.length,            
			duration = 450; 
	
		_this.hide();
		_this.wrap('<div class="select"></div>');
		$('<div>', {
			class: 'new-select',
		}).insertAfter(_this);
		$('<span>', {
			text: _this.children('option:disabled').text()
		}).appendTo('.new-select');
	
		const selectHead = _this.next('.new-select');
		const selectHeadBlock = selectHead.find('span');
		$('<div>', {
			class: 'new-select__list'
		}).insertAfter(selectHead);
	
		const selectList = selectHead.next('.new-select__list');
		if(selectOptionLength > 1) {
			for (let i = 1; i < selectOptionLength; i++) {
				$('<div>', {
					class: 'new-select__item',
					html: $('<span>', {
						text: selectOption.eq(i).text()
					})
				})
				.attr('data-value', selectOption.eq(i).val())
				.appendTo(selectList);
			}
	
		} else if (selectOptionLength == 1) {
			selectHead.addClass('empty');            
		}
	
		const createCollection = $('#form__create');
		$(createCollection).on('submit',function(event) {
			event.preventDefault();
		});
	
		const selectItem = selectList.find('.new-select__item');
		selectList.slideUp(0);
	
		// Функция для обработки открытия/закрытия селекта
		function toggleSelect() {
			if(!selectHead.hasClass('empty')) {
				if (!selectHead.hasClass('on')) {
					selectHead.addClass('on');
					selectList.slideDown(duration);
	
					selectItem.on('click', function() {
						let chooseItem = $(this).data('value');
	
						$('select').val(chooseItem).attr('selected', 'selected');
						selectHeadBlock.text($(this).find('span').text());
	
						selectList.slideUp(duration);
						selectHead.removeClass('on');
					});
	
				} else {
					selectHead.removeClass('on');
					selectList.slideUp(duration);
				}
			}
		}
	
		// Обработчик клика на сам селект
		selectHead.on('click', toggleSelect);
	
		// Добавляем обработчик клика на .form__group-info
		const groupInfo = _this.closest('.form__field').find('.form__group-info');
		groupInfo.on('click', toggleSelect);
	});
});