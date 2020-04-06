window.addEventListener('load', () => {

  var Ayoba = getAyoba()

/**
 * Determine the mobile operating system and returns the 
 * proper javascript interface
 */
function getAyoba() {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;

    // Windows Phone must come first because its UA also contains "Android"
    if (/windows phone/i.test(userAgent)) {
        return null;
    }

    if (/android/i.test(userAgent)) {
        return Android;
    }

    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return null; // todo 
    }

    return "unknown";
}

  const el = $('#app');
  var msisdn = Ayoba.getMsisdn();

  $(".welcome-text").text(msisdn);

  // Compile Handlebar Templates
  const errorTemplate = Handlebars.compile($('#error-template').html());
  const restaurantsTemplate = Handlebars.compile($('#restaurants-template').html());
  const ordersTemplate = Handlebars.compile($('#orders-template').html());
  const restaurantTemplate = Handlebars.compile($('#restaurant-template').html());
  const exchangeTemplate = Handlebars.compile($('#exchange-template').html());
  const historicalTemplate = Handlebars.compile($('#historical-template').html());

  // Instantiate api handler
  const api = axios.create({
    baseURL: 'https://efb30d56.ngrok.io/api',
    timeout: 5000,
  });

  const router = new Router({
    mode: 'history',
    page404: (path) => {
      const html = errorTemplate({
        color: 'yellow',
        title: 'Error 404 - Page NOT Found!',
        message: `The path '/${path}' does not exist on this site`,
      });
      el.html(html);
      $('.loading').removeClass('loading');
    },
  });

  // Display Error Banner
  const showError = (error) => {
    const { title, message } = error.response.data;
    const html = errorTemplate({ color: 'red', title, message });
    el.html(html);
    $('.loading').removeClass('loading');
  };

  // Display landing page with restaurant
  router.add('/', async () => {
    // Display loader first
    let html = restaurantsTemplate();
    el.html(html);
    try {
      // Load Currency Rates
      const response = await api.get('/stores');
      var restaurants = response.data;
      // Display Rates Table
      html = restaurantsTemplate(restaurants);
      el.html(html);
      $('.loading').removeClass('loading');
    } catch (error) {
      showError(error);
    }

    // Someone clicks on view company button
    $(".view-button").click(function () {
      let html = restaurantTemplate();
      let id = $(this).attr('id');

      try {
        api.get(`/stores/${id}`).then(function( restaurant ) {
          restaurant = restaurant.data;
          api.get(`/stores/${id}/menus`).then(function( menu ) {
            menu = menu.data[0];
            api.get(`/menus/${menu.id}/items`).then(function( items ) {
            items = items.data;
            html = restaurantTemplate({restaurant, menu, items});
            el.html(html);
            $('.loading').removeClass('loading');
           });
          });
        });
      } catch (error) {
        showError(error);
      }
    });
  });

  // Display restaurants
  router.add('/orders', async () => {
    // Display loader first
    let html = ordersTemplate();
    el.html(html);
    try {
      // Load Currency Rates
      const response = await api.get('/users/1/orders');
      var orders = response.data;
      // Display Rates Table
      html = ordersTemplate(orders);
      el.html(html);
      $('.loading').removeClass('loading');
    } catch (error) {
      showError(error);
    }

    // Someone clicks on view company button
    $(".view-button").click(function () {
      let html = restaurantTemplate();
      let id = $(this).attr('id');

      try {
        api.get(`/stores/${id}`).then(function( restaurant ) {
          restaurant = restaurant.data;
          api.get(`/stores/${id}/menus`).then(function( menu ) {
            menu = menu.data[0];
            api.get(`/menus/${menu.id}/items`).then(function( items ) {
            items = items.data;
            html = restaurantTemplate({restaurant, menu, items});
            el.html(html);
            $('.loading').removeClass('loading');
           });
          });
        });
      } catch (error) {
        showError(error);
      }
    });
  });

  // Display one restaurant with menu
  router.add('/restaurant', async () => {
    // Display loader first
    let html = restaurantTemplate();
    let id = window.location.search.split('=')[1];

    el.html(html);
    try {
      // Load Currency Rates
      const response = await api.get(`/restaurants/${id}`);
      var restaurant = response.data;
      // Display Rates Table
      html = restaurantTemplate(restaurant);
      el.html(html);
      $('.loading').removeClass('loading');
    } catch (error) {
      showError(error);
    }
  });

  // // Perform POST request, calculate and display conversion results
  // const getConversionResults = async () => {
  //   // Extract form data
  //   const from = $('#from').val();
  //   const to = $('#to').val();
  //   const amount = $('#amount').val();
  //   // Send post data to express(proxy) server
  //   try {
  //     const response = await api.post('/convert', { from, to });
  //     const { rate } = response.data;
  //     const result = rate * amount;
  //     $('#result').html(`${to} ${result}`);
  //   } catch (error) {
  //     showError(error);
  //   } finally {
  //     $('#result-segment').removeClass('loading');
  //   }
  // };

  // // Handle Convert Button Click Event
  // const convertRatesHandler = () => {
  //   if ($('.ui.form').form('is valid')) {
  //     // hide error message
  //     $('.ui.error.message').hide();
  //     // Post to express server
  //     $('#result-segment').addClass('loading');
  //     getConversionResults();
  //     // Prevent page from submitting to server
  //     return false;
  //   }
  //   return true;
  // };

  // router.add('/exchange', async () => {
  //   // Display loader first
  //   let html = exchangeTemplate();
  //   el.html(html);
  //   try {
  //     // Load Symbols
  //     const response = await api.get('/symbols');
  //     const { symbols } = response.data;
  //     html = exchangeTemplate({ symbols });
  //     el.html(html);
  //     $('.loading').removeClass('loading');
  //     // Specify Form Validation Rules
  //     $('.ui.form').form({
  //       fields: {
  //         from: 'empty',
  //         to: 'empty',
  //         amount: 'decimal',
  //       },
  //     });
  //     // Specify Submit Handler
  //     $('.submit').click(convertRatesHandler);
  //   } catch (error) {
  //     showError(error);
  //   }
  // });

  // const getHistoricalRates = async () => {
  //   const date = $('#date').val();
  //   try {
  //     const response = await api.post('/historical', { date });
  //     const { base, rates } = response.data;
  //     const html = ratesTemplate({ base, date, rates });
  //     $('#historical-table').html(html);
  //   } catch (error) {
  //     showError(error);
  //   } finally {
  //     $('.segment').removeClass('loading');
  //   }
  // };

  // const historicalRatesHandler = () => {
  //   if ($('.ui.form').form('is valid')) {
  //     // hide error message
  //     $('.ui.error.message').hide();
  //     // Indicate loading status
  //     $('.segment').addClass('loading');
  //     getHistoricalRates();
  //     // Prevent page from submitting to server
  //     return false;
  //   }
  //   return true;
  // };

  // router.add('/historical', () => {
  //   const html = historicalTemplate();
  //   el.html(html);
  //   // Activate Date Picker
  //   $('#calendar').calendar({
  //     type: 'date',
  //     formatter: {
  //       date: date => new Date(date).toISOString().split('T')[0],
  //     },
  //   });
  //   $('.ui.form').form({
  //     fields: {
  //       date: 'empty',
  //     },
  //   });
  //   $('.submit').click(historicalRatesHandler);
  // });

  router.navigateTo(window.location.pathname);

  // Highlight Active Menu on Load
  const link = $(`a[href$='${window.location.pathname}']`);
  link.addClass('active');

  $('a').on('click', (event) => {
    // Block page load
    event.preventDefault();

    // Highlight Active Menu on Click
    const target = $(event.target);
    $('.item').removeClass('active');
    target.addClass('active');

    // Navigate to clicked url
    const href = target.attr('href');
    // const path = href.substr(href.lastIndexOf('/'));
    router.navigateTo(href);
  });
});