import musicRepository from "./music.repository"

class MusicService {
    constructor () {}

    add(music) {
        const existMusic = musicRepository.searchMusic(music)
        if (existMusic) {
            throw Error("the music has been add")
        }

        const containTitle = "title" in music && music.title !== ""
        if (!containTitle) {
            throw Error('the music should be contain a title')
        }

        const containArtist = "artist" in music && music.artist !==""
        if (!containArtist) {
            throw Error('the music should be contain a artist')
        }

        if (music.genre === undefined || music.genre.length === 0) {
            throw Error('the music should be one genre')
        }
        return musicRepository.addMusic(music) 
    }

    getQtMusic() {
        return musicRepository.getQtMusics()
    }
}

export { MusicService }