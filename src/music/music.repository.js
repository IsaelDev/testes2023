const musics = []


function addMusic (music) {
    musics.push(music)
}


function removeMusic (music) {
    const indexMusic = musics.findIndex(
        (currentMusic) => currentMusic.title === music.title && currentMusic.artist === music.artist
    )
    musics.splice(indexMusic, 1)
}

function getQtMusics () {
    return musics.length
}

function searchMusic (music) {
    const indexMusic = musics.findIndex(
        (currentMusic) => currentMusic.title === music.title
    )
    return musics[indexMusic]
}

function listAllMusics () {
    return Array.from(musics)
}


export default {
    addMusic,
    removeMusic,
    searchMusic,
    getQtMusics,
    listAllMusics
}