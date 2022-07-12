export default {
  header: {
    menuBtn: 'Catalog',
    searchPlaceholder: 'Search',
    basket:{
      inOrder: 'In order',
    },
  },
  footer: {
    help: 'Help',
    contact: 'Contact',
    privacy: 'Privacy',
    terms: 'Terms',
    copyright: 'All rights reserved.',
  },
  popup: {
    auth: {
      logInToContinue: 'Log in to continue',
      notAMemberYet: 'Not a member yet?',
      registerNow: 'Register now',
      field: {
        login: 'Login',
        password: 'Password',
        keepMeLoggedIn: 'Keep me logged in',
      },
      logIn: 'Log in'
    },
    registration: {
      registerWithEmail: 'Register with your E-mail',
      haveAccount: 'Have an account?',
      login: 'Login',
      field: {
        name: 'Name',
        password: 'Password',
        repeat: 'Repeat Password',
      },
      termsPrivacy: 'I have read and accepted the <nuxt-link>Terms and Conditions</nuxt-link> and <nuxt-link>Privacy Policy</nuxt-link>',
      create: 'Create your account',
    },
  },
  home: {
    newLooks: 'New LOOKS',
    followUs: 'Follow us',
    ScrollToSee: 'Scroll to see more',
  },
  common: {
    return: 'Return to catalog',
    products: 'product | products',
    checkout: 'Checkout',
    share: 'Share',
    helpCheckout: 'Help is needed? Contact our managers:',
    field: {
      phone: 'Phone',
      email: 'E-mail',
      firstName: 'First name',
      lastName: 'Last name',
    },
    cost: 'Total cost',
    discounted: 'Discounted price',
    total: 'Total',
    select: 'Select',
  },
  catalog: {
    mostPopularProducts: 'Most Popular Products',
    price: 'Price',
    descendingPrice: 'Descending price',
    ascendingPrice: 'Ascending price',
    popular: 'Popular',
    article: 'Article',
    share: 'Share',
    favorites: 'Add to favorites',
    read: 'Read more',
    hide: 'Hide text',
    detail: 'View details',
    sizeSelect: 'Select size',
    sizeTable: 'Sizes table',
    add: 'Add to Shopping cart',
    stylist: 'Selection of the image with a stylist',
    composition: 'Composition and care of the product',
    instagram: 'Instagram',
    whatsapp: 'Write to Whatsapp',
    call: 'Call',
  },
  filter: {
    clearAll: 'Clear All',
    seeAll: 'See All',
    hideAll: 'Hide All',
  },
  basket: {
    title: 'Basket',
    empty: 'Your cart is empty.<br> <nuxt-link class="black hover" to="/catalog/">Click here</nuxt-link> to continue shopping.',
    total: {
      estimated: 'Estimated delivery cost',
      coupon: 'Enter coupon code of discount',
      remove: 'Remove'
    },
  },
  checkout: {
    city: {
      title: 'City',
      text: 'Enter the name of the city',
      error: 'Sorry, an internal error has occurred',
      nothing: 'Sorry, nothing found',
    },
    tab: {
      basic: {
        title: 'Basic information',
        text: 'Provide basic information about you and write comments on the order, if any.',
        field:{
          comment: 'Order commentary',
        }
      },
      delivery: {
        title: 'Delivery',
        text: 'Select order delivery method',
        field:{
          index: 'Index',
          address: 'Address',
        }
      },
      payment: {
        title: 'Payment',
        text: 'Select a payment method',
      },
    },
    total: {
      delivery: 'Delivery price',
      help: 'Help is needed?<br> Contact our managers:',
      next: 'Next',
    },
  },
  profile: {
    title: 'Profile',
    subtitle: 'Account',
    text: 'Feel free to edit any of your details below so your BULVIN account is totally up to date.',
    welcome: 'Hi',
    menu: {
      account: 'Account',
      orders: 'My Orders',
      help: 'Need help?',
      logout: 'Sign out',
    },
    field: {
      middleName: 'Middle name',
      address: 'Address',
    },
    save: 'Save changes'
  }
}
