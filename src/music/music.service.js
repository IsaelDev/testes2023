import musicRepository from "./music.repository"

class MusicService {
    constructor () {}

    add(music) {
        return musicRepository.addMusic(music) 
    }

    getQtMusic() {
        return musicRepository.getQtMusics()
    }
}

export { MusicService }