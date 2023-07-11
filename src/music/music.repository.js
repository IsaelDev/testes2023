const musics = []


function addMusic (music) {
    return musics.push(music)
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

function searchMusic (title) {
    console.log("title:"+title)
    const indexMusic = musics.findIndex(
        (currentMusic) => currentMusic.title === title
    )
    //console.log(musics[indexMusic])
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

export { musics }