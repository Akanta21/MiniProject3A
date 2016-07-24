/* globals $ _ event */
var query
var persqm = (price, sqm) => {
  return parseFloat(price / sqm).toFixed(2)
}
function getHouse (element) {
  event.preventDefault()
  $('#hdbresults').empty()
  if ($('#hdbquery').val()) {
    query = $('#hdbquery').val()
  } else {
    query = element
  }
  $.ajax({
    url: 'https://data.gov.sg/api/action/datastore_search',
    data: {
      resource_id: '83b2fc37-ce8c-4df4-968b-370fd818138b',
      q: query,
      limit: 1000
    },
    success: function (data) {
      // console.log(data)
      $('#hdbresults').append('<div class="table-responsive"><table class="table table-hover" id="hdbtable"><thead class="thead-inverse"><tr><th>Town</th><th>Street Name</th><th>Block</th><th>Built in</th><th>Size (in sqm)</th><th>Storey</th><th>Price</th><th>Transaction Date</th><th>Per sqm price</th></tr></thead><tbody></td></tr></tbody></table></div>')
      var sortedData = _.sortBy(data.result.records, 'month')
      console.log('This is the data length upon sorting: ' + sortedData.length)
      $.each(sortedData.reverse(), function (index, item) {
        $('#hdbtable').append('<tr class="text-center"><th scope="row">' + item.town + '</th><th scope="row">' + item.street_name + '</th><th scope="row">' + item.block + '</th><td>' + item.lease_commence_date + '</td><td>' + item.floor_area_sqm+ '</td><td>' + item.storey_range + '</td><td>' + item.resale_price + '</td><td>' + item.month + '</td><td>' + persqm(item.resale_price, item.floor_area_sqm))
      })
    }
  })
}
$(document).ready(function () {
  $.ajax({
    url: 'https://data.gov.sg/api/action/datastore_search',
    data: {
      resource_id: '83b2fc37-ce8c-4df4-968b-370fd818138b',
      limit: 25000
    },
    success: function (data) {
      var sortedData = _.sortBy(data.result.records, 'month')
      console.log(sortedData.length)
      var priceArray = []
      var yearArray = []
      var locationArray = []
      $.each(sortedData.reverse(), function (index, item) {
        priceArray.push(+item.resale_price)
        yearArray.push(item.lease_commence_date)
        locationArray.push(item.town)
        if (priceArray.length === 25000) {
          var uniquePrice = _.sortBy(_.uniq(priceArray, false), function (num) {
            return num
          })
          var uniqueYear = _.sortBy(_.uniq(yearArray, false), function (year) {
            return year
          })
          var uniqueLocation = _.sortBy(_.uniq(locationArray, false), function (year) {
            return year
          })
          uniquePrice.forEach(function (el, index, array) {
            $('.dropdown-price').append('<li><a>' + el + '</li></a>')
          })
          uniqueYear.forEach(function (el, index, array) {
            $('.dropdown-year').append('<li><a>' + el + '</li></a>')
          })
          uniqueLocation.forEach(function (el, index, array) {
            $('.dropdown-location').append('<li><a>' + el + '</li></a>')
          })
        }
      })
    }
  })
  $('.dropdown-price').on('click', 'li', function () {
    var price = $(this).text()
    console.log(price)
    getHouse(price)
  })
  $('.dropdown-year').on('click', 'li', function () {
    var year = $(this).text()
    console.log(year)
    getHouse(year)
  })
  $('.dropdown-location').on('click', 'li', function () {
    var place = $(this).text()
    console.log(place)
    getHouse(place)
  })
  $('#hdb-form').on('submit', function (event) {
    getHouse()
  })
})

// $('#spotify-form').on('submit', function (event) {
//   event.preventDefault()
//   $('#spotifyresults').empty()
//   var query = $('#spotifyquery').val()
//   $.ajax({
//     url: 'https://api.spotify.com/v1/search',
//     data: {
//       q: query,
//       type: 'track',
//       limit: 12
//     },
//     success: function (res) {
//       console.log(res)
//       $.each(res.tracks.items, function (index, item) {
//         $('#spotifyresults').append('<iframe src="' + 'https://embed.spotify.com/?uri=' + item.uri + '"' + 'frameborder="0" allowtransparency="true" width="250" height="80" id="spotifyiframe"></iframe>')
//       })
//     }
//   })
// })
