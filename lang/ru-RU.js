export default {
  header: {
    menuBtn: 'Каталог',
    searchPlaceholder: 'Поиск',
    basket:{
      inOrder: 'В корзине',
    },
  },
  footer: {
    help: 'Помощь',
    contact: 'Контакт',
    privacy: 'Конфиденциальность',
    terms: 'Условия',
    copyright: 'Все права защищены.',
  },
  popup: {
    auth: {
      logInToContinue: 'Войдите, чтобы продолжить',
      notAMemberYet: 'Не зарегистрированы?',
      registerNow: 'Зарегистрируйтесь сейчас',
      field: {
        login: 'Логин',
        password: 'Пароль',
        keepMeLoggedIn: 'Запомнить',
      },
      logIn: 'Войти'
    },
    registration: {
      registerWithEmail: 'Зарегистрируйтей с помощью E-mail',
      haveAccount: 'У Вас есть учетная запись?',
      login: 'Войти',
      field: {
        name: 'Имя',
        password: 'Пароль',
        repeat: 'Повторите пароль',
      },
      termsPrivacy: 'Я прочитал и принял <nuxt-link>Условия использования</nuxt-link> и <nuxt-link>Политику конфиденциальности</nuxt-link>',
      create: 'Создать учетную запись',
    },
  },
  home: {
    newLooks: 'Новинки',
    followUs: 'Подпишитесь',
    ScrollToSee: 'Прокрутите, чтобы увидеть больше',
  },
  common: {
    return: 'Вернуться в каталог',
    share: 'Поделиться',
    products: 'товар | товаров',
    checkout: 'Оформление заказа',
    next: 'Продолжить',
    helpCheckout: 'Нужна помощь? Свяжитесь с нашими менеджерами:',
    field: {
      phone: 'Телефон',
      email: 'E-mail',
      firstName: 'Имя',
      lastName: 'Фамилия',
    },
    cost: 'Общая стоимость',
    discounted: 'Цена со скидкой',
    total: 'Итого',
    select: 'Выбрать',
  },
  catalog: {
    mostPopularProducts: 'Самые популярные продукты',
    price: 'Цена',
    descendingPrice: 'По убыванию',
    ascendingPrice: 'По возрастанию',
    popular: 'По популярности',
    article: 'Артикул',
    share: 'Поделится',
    favorites: 'Добавить в избранное',
    read: 'Читать далее',
    hide: 'Скрыть текст',
    detail: 'Посмотреть',
    sizeTable: 'Таблица размеров',
    sizeSelect: 'Выбрать размер',
    add: 'Добавить в корзину',
    stylist: 'Подбор образа со стилистом',
    composition: 'Состав и уход за изделием',
    instagram: 'Instagram',
    whatsapp: 'Написать в Whatsapp',
    call: 'Позвонить',
  },
  filter: {
    clearAll: 'Очистить все',
    seeAll: 'Показать все',
    hideAll: 'Скрыть все',
  },
  basket: {
    title: 'Корзина',
    empty: 'Ваша корзина пуста.<br> <a class="black hover" href="/catalog/">Нажмите здесь</a>, чтобы продолжить покупки.',
    total: {
      estimated: 'Стоимость доставки',
      coupon: 'Введите код купона на скидку',
      remove: 'Удалить'
    },
  },
  checkout: {
    city: {
      title: 'Город',
      text: 'Введите название города',
      error: 'К сожалению, произошла внутренняя ошибка',
      nothing: 'К сожалению, ничего не найдено',
    },
    tab: {
      basic: {
        title: 'Основная информация',
        text: 'Предоставьте основную информацию о себе и напишите комментарии к заказу, если таковые имеются.',
        field:{
          comment: 'Комментарий к заказу',
        }
      },
      delivery: {
        title: 'Доставка',
        text: 'Выберите способ доставки заказа',
        field:{
          index: 'Индекс',
          address: 'Адрес доставки',
        }
      },
      payment: {
        title: 'Оплата',
        text: 'Выберите способ оплаты или введите платежные данные',
      },
    },
    total: {
      delivery: 'Цена доставки',
      help: 'Нужна помощь? Свяжитесь<br>с&nbsp;нашими менеджерами:',
    },
  },
  profile: {
    title: 'Профиль',
    subtitle: 'Учетная запись',
    text: 'Не стесняйтесь редактировать любую из ваших данных ниже, чтобы ваша учетная запись BULVIN была полностью обновлена.',
    welcome: 'Привет',
    menu: {
      account: 'Учетная запись',
      orders: 'Мои заказы',
      help: 'Нужна помощь?',
      logout: 'Выход',
    },
    field: {
      middleName: 'Отчество',
      address: 'Адрес',
    },
    save: 'Сохранить изменения'
  }
}
