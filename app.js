/* globals $ */
$(document).ready(function () {
  $('#search-form').on('submit', function (event) {
    event.preventDefault()
    $('#results').empty()
    var query = $('#query').val()
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
          $('#results').append('<iframe src="' + 'https://embed.spotify.com/?uri=' + item.uri + '"' + 'frameborder="0" allowtransparency="true" width="250" height="80" id="spotifyiframe"></iframe>')
        })
      }
    })
  })
})
