import musicRepository from "../music.repository";
import { MusicService } from "../music.service";
import musics from "../music.repository"

jest.mock('../music.repository')

describe('music servic', ()=>{
    const musicsService = new MusicService()
    test("should be possible add music", () =>{
        const music = {
            title: "Mun-rá",
            artist: "Sabotage",
            genre: "rap"
        }

        musicsService.add(music)
        musicRepository.getQtMusics.mockReturnValue(1)
        const qtMusics = musicsService.getQtMusic()

        expect(qtMusics).toBe(1)
    })

    test("should be able to search a song by its title", ()=>{
        const title = "Mun-rá"
        
        const music = {
            title: "Mun-rá",
            artist: "Sabotage",
            genre: "rap"
        }

        musicsService.add(music)

        const foundMusic = musicRepository.searchMusic(title)
        console.log(foundMusic)
        //return musics[index]

        expect(foundMusic).toBe({
            title: "Mun-rá",
            artist: "Sabotage",
            genre: "rap"
        })
    })
})