/* globals $ */
$(document).ready(function () {
  $('#hdb-form').on('submit', function (event) {
    event.preventDefault()
    $('#hdbresults').empty()
    var query = $('#hdbquery').val()
    $.ajax({
      url: 'https://data.gov.sg/api/action/datastore_search',
      data: {
        resource_id: '83b2fc37-ce8c-4df4-968b-370fd818138b',
        q: query,
        limit: 30
      },
      success: function (data) {
        console.log(data)
        $('#hdbresults').append('<div class="table-responsive"><table class="table table-hover" id="hdbtable"><thead class="thead-inverse"><tr><th>Street Name</th><th>Size (in sqm)</th><th>Storey</th><th>Price</th><th>Transaction Date</th><th>Per sqm price</th></tr></thead><tbody></td></tr></tbody></table></div>')
        $.each(data.result.records, function (index, item) {
          $('#hdbtable').append('<tr><th scope="row">' + item.street_name + '</th><td>' + item.floor_area_sqm + '</td><td>' + item.storey_range + '</td><td>' + item.resale_price + '</td><td>' + item.month + '</td><td>' + persqm(item.resale_price, item.floor_area_sqm))
        })
      }
    })
  })
  var persqm = (price, sqm) => {
    return parseFloat(price / sqm).toFixed(2)
  }

  $('#spotify-form').on('submit', function (event) {
    event.preventDefault()
    $('#spotifyresults').empty()
    var query = $('#spotifyquery').val()
    $.ajax({
      url: 'https://api.spotify.com/v1/search',
      data: {
        q: query,
        type: 'track',
        limit: 12
      },
      success: function (res) {
        console.log(res)
        $.each(res.tracks.items, function (index, item) {
          $('#spotifyresults').append('<iframe src="' + 'https://embed.spotify.com/?uri=' + item.uri + '"' + 'frameborder="0" allowtransparency="true" width="250" height="80" id="spotifyiframe"></iframe>')
        })
      }
    })
  })
})
