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

    //teste 11
    test('Testa se push é chamado corretamente', () => {
      const musics = [];
      const music = 'Some Music';
      addMusic(music);
    
      expect(musics.push).toHaveBeenCalledWith(music);
      expect(musics.length).toBe(1);
    });
    
    //teste 12
    test('Testa se irá retornar a música correta quando encontrada', () => {
    const musics = [
    { title: 'Smooth Criminal', artist: 'Michael Jackson' },
    { title: 'Billie Jean', artist: 'Michael Jackson' },
    { title: 'Beat It', artist: 'Michael Jackson' },
    ];

    const title = 'Beat It';
    const result = searchMusic(title);

    expect(result).toEqual({ title: 'Beat It', artist: 'Michael Jackson' });
});

    //teste13
    test('Testa se retorna undefined quando a música não é encontrada', () => {
    const musics = [
    { title: 'One Dance', artist: 'Drake' },
    { title: 'Meu pedaço de pecado', artist: 'João Gomes' },
    { title: 'Acordando o predio', artist: 'Luan Santana' },
    ];

    const title = 'One Dance';
    const result = searchMusic(title);

    expect(result).toBeUndefined();
});
    //teste14
    test('Testa se retorna undefined quando o título fornecido é uma string vazia', () => {
    const musics = [
    { title: 'Se for amor', artist: 'João Gomes' },
    { title: 'Eu tenho a senha', artist: 'João Gomes' },
    { title: 'Dengo', artist: 'João Gomes' },
    ];

    const title = '';
    const result = searchMusic(title);

    expect(result).toBeUndefined();
});
    //tete15
    test('Testa se removerá corretamente quando há 2 músicas com o mesmo título', () => {
    const musics = [
    { title: 'One Dance', artist: 'Drake' },
    { title: 'One Dance', artist: 'Michael' },
    { title: 'Dengo', artist: 'João Gomes' },
    ];
  
    const musicToRemove = { title: 'One Dance', artist: 'Michael' };
    removeMusic(musicToRemove);
  
    expect(musics).toEqual([
      { title: 'One Dance', artist: 'Drake' },
      { title: 'Dengo', artist: 'João Gomes' },
    ]);
  });
  
  //teste16 
  test('Testa se removerá corretamente a primeira música do array', () => {
    const musics = [
      { title: 'One Dance', artist: 'Michael' },
      { title: 'One Dance', artist: 'Drake' },
      { title: 'Dengo', artist: 'João Gomes' },
    ];
  
    const musicToRemove = { title: 'One Dance', artist: 'Michael' };
    removeMusic(musicToRemove);
  
    expect(musics).toEqual([
      { title: 'One Dance', artist: 'Drake' },
      { title: 'Dengo', artist: 'João Gomes' },
    ]);
  });
  //teste17
  test('Testa se removerá corretamente quando há apenas uma música no array', () => {
    const musics = [{ title: 'One Dance', artist: 'Drake' }];
    const musicToRemove = { title: 'One Dance', artist: 'Drake' };
    removeMusic(musicToRemove);
  
    expect(musics).toEqual([]);
  });
  //teste18
  

})

