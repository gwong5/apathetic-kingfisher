$(document).ready(() => {

  // Load sidebar
  $.ajax({
    method: 'GET',
    url: '/api/getSidebar',
    dataType: 'json',
    success: (json) => {
      $.each(json[0], (jsonIndex, artist) => {
        $('.artists').prepend($(`<div id=artist${artist.id} class=artist>${artist.name}</div>`))
      })
      $.each(json[1], (jsonIndex, album) => {
        $('.albums').prepend($(`<div id=album${album.id} class=album>${album.title}</div>`))
      })
    }
  })

  $(document).on('click', '.artist', (e) => {
    const name = $(e.target).text()
    $('.albums').children().removeClass('active')
    $('.artists').children().removeClass('active')
    $(e.target).addClass('active')
    $.ajax({
      method: 'GET',
      url: `/api/getSongsOfArtist/${name}`,
      dataType: 'json',
      success: (json) => {
        $('.songStage').empty()
        $('.songStage').append($(`
        <span>
          <h2>${name}</h2>
        </span>
        <span>
          <div class=artistAlbums><h3>Albums</h3></div>
        </span>
        `))
        $.each(json, (jsonIndex, artist) => {
          console.log(artist)
          if (!$(`.albumId${artist.album_id}`).length) {
            $('.artistAlbums').append($(`
              <ol id=albumId${artist.album_id}>${artist.album_title} ${artist.year}</ol>`)
            )
          }
          $(`#albumId${artist.album_id}`).append($(`
            <li class=song>${artist.title}</li>
          `))
        })
      }
    })
  })

  $(document).on('click', '.album', (e) => {
    const title = $(e.target).text()
    $('.artists').children().removeClass('active')
    $('.albums').children().removeClass('active')
    $(e.target).addClass('active')
    $.ajax({
      method: 'GET',
      url: `/api/getAlbum/${title}`,
      dataType: 'json',
      success: (json) => {
        $('.songStage').empty()
        $('.songStage').append($(`
        <span>
          <h2>${title}</h2>
          <button id=${title} class=addNewSong>Add new song</button>
        </span>
        `))
        $.each(json, (jsonIndex, albumSong) => {
          $('.songStage').append($(`
            <div id=songId${albumSong.id}>
              <span class=track_no>${albumSong.track_no}</span>
              <span class=songTitle>${albumSong.title}</span
              <span class=duration>${albumSong.length}</span>
            </div>`))
        })
      }
    })
  })

  $(document).on('click', '.newArtist', (e) => {
    const title = $(e.target).text()
    $('.artists').children().removeClass('active')
    $('.albums').children().removeClass('active')
    $(e.target).addClass('active')
  })

    $(document).on('click', '.newAlbum', (e) => {
    const title = $(e.target).text()
    $('.artists').children().removeClass('active')
    $('.albums').children().removeClass('active')
    $(e.target).addClass('active')
    })
})
