import musicRepository from "../music.repository";
import { MusicService } from "../music.service";
import {musics} from "../music.repository"

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
        console.log(musicRepository.searchMusic(title))
        //return musics[index]

        expect(foundMusic).toBe({
            title: "Mun-rá",
            artist: "Sabotage",
            genre: "rap"
        })  
    })

    test("should be able remove one music", ()=>{
        const music = {
            title: "Mun-rá",
            artist: "Sabotage",
            genre: "rap"
        }

        musicsService.add(music)
        musicRepository.getQtMusics.mockReturnValue(1)

        musicRepository.removeMusic(music)
        musicRepository.getQtMusics.mockReturnValue(0)

        const qtMusic = musicsService.getQtMusic()

        expect(qtMusic).toBe(0)
    })


    test("should be able to list all musics in repository", ()=>{
        const music = {
            title: "Mun-rá",
            artist: "Sabotage",
            genre: "rap"
        }

        musicsService.add(music)
        musicRepository.getQtMusics.mockReturnValue(1)

        const qtMusic = musicsService.getQtMusic()
        expect(qtMusic).toBe(1)
    })

    test("should update the music count correctly after adding a new music", () => {
        musicRepository.getQtMusics.mockReturnValue(0)
        let initialQtMusic = musicsService.getQtMusic()
        
        const music = {
            title: "Mun-rá",
            artist: "Sabotage",
            genre: "rap"
        }
      
        
        musicsService.add(music)
        console.log(musics)
        const updatedQtMusic = musicsService.getQtMusic()

        expect(updatedQtMusic).toBe(initialQtMusic += 1)
    })

    test("dont should be add two music equals", () => {      
        const music = {
            title: "Mun-rá",
            artist: "Sabotage",
            genre: "rap"
        }
        
        musicRepository.searchMusic.mockReturnValue(music)

        expect(()=>{
            musicsService.add(music)
        }).toThrowError()
    })

    test("dont should be add music without title", () =>{
        const music = {
            artist: "Sabotage",
            genre: "rap"
        }

        expect(()=>{
            musicsService.add(music)
        }).toThrowError()
    })

    test("dont should be add music without artist", () =>{
        const music = {
            title: "Mun-rá",
            genre: "rap"
        }

        expect(()=>{
            musicsService.add(music)
        }).toThrowError()
    })

    test("should be add music have a much genres", () =>{
        const music = {
            title: "Last nite",
            artist: "The Strokes",
            genre: ["indie", "rock"]
        }

        expect(()=>{
            musicsService.add(music)
        }).toThrowError()
    })

    test("dont should be add music without genres", () =>{
        const music = {
            title: "Last nite",
            artist: "The Strokes"
        }

        expect(()=>{
            musicsService.add(music)
        }).toThrowError()
    })
})