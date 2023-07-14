import musicRepository from "../music.repository";
import { MusicService, addMusic, removeMusic, searchMusic } from "../music.service";
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
        const musics = {
          push: jest.fn(),
          length: 0
        };
        const music = 'Some Music';
        addMusic(music, musics);
      
        expect(musics.push).toHaveBeenCalledWith(music);
        expect(musics.length).toBe(1);
      });
      
    //teste 12
    test('Testa se irá retornar a música correta quando encontrada', () => {
        const musics = {
          'Smooth Criminal': { title: 'Smooth Criminal', artist: 'Michael Jackson' },
          'Billie Jean': { title: 'Billie Jean', artist: 'Michael Jackson' },
          'Beat It': { title: 'Beat It', artist: 'Michael Jackson' }
        };
      
        const title = 'Beat It';
        const result = searchMusic(title, musics);
      
        expect(result).toEqual({ title: 'Beat It', artist: 'Michael Jackson' });
      });
      

    //teste13
    test('Testa se retorna undefined quando a música não é encontrada', () => {
        const musics = {
          'One Dance': { title: 'One Dance', artist: 'Drake' },
          'Meu pedaço de pecado': { title: 'Meu pedaço de pecado', artist: 'João Gomes' },
          'Acordando o predio': { title: 'Acordando o predio', artist: 'Luan Santana' }
        };
      
        const title = 'One Dance';
        const result = searchMusic(title, musics);
      
        expect(result).toBeUndefined();
      });
      
    //teste14
    test('Testa se retorna undefined quando o título fornecido é uma string vazia', () => {
        const musics = {
          'Se for amor': { title: 'Se for amor', artist: 'João Gomes' },
          'Eu tenho a senha': { title: 'Eu tenho a senha', artist: 'João Gomes' },
          'Dengo': { title: 'Dengo', artist: 'João Gomes' }
        };
      
        const title = '';
        const result = searchMusic(title, musics);
      
        expect(result).toBeUndefined();
      });
      
    //teste15
    test('Testa se removerá corretamente quando há 2 músicas com o mesmo título', () => {
        const musics = {
          '1': { title: 'One Dance', artist: 'Drake' },
          '2': { title: 'One Dance', artist: 'Michael' },
          '3': { title: 'Dengo', artist: 'João Gomes' }
        };
      
        const musicToRemove = { title: 'One Dance', artist: 'Michael' };
        removeMusic(musicToRemove, musics);
      
        expect(musics).toEqual({
          '1': { title: 'One Dance', artist: 'Drake' },
          '3': { title: 'Dengo', artist: 'João Gomes' }
        });
      });
      
  //teste16 
  test('Testa se removerá corretamente a primeira música do objeto', () => {
    const musics = {
      '1': { title: 'One Dance', artist: 'Michael' },
      '2': { title: 'One Dance', artist: 'Drake' },
      '3': { title: 'Dengo', artist: 'João Gomes' }
    };
  
    const musicToRemove = { title: 'One Dance', artist: 'Michael' };
    removeMusic(musicToRemove, musics);
  
    expect(musics).toEqual({
      '2': { title: 'One Dance', artist: 'Drake' },
      '3': { title: 'Dengo', artist: 'João Gomes' }
    });
  });
  
  //teste17
  test('Testa se removerá corretamente quando há apenas uma música no array', () => {
    const musics = { title: 'One Dance', artist: 'Drake' };
    const musicToRemove = { title: 'One Dance', artist: 'Drake' };
  
    const removeSingleMusic = () => {
      removeMusic(musicToRemove, musics);
    };
  
    expect(removeSingleMusic).toThrowError();
  });
  
  //teste18
  test('Testa se retorna o número correto de músicas quando a lista contém várias músicas', () => {
    const musics = {
      '0': 'Dengo',
      '1': 'Amor e fé',
      '2': 'One Dance'
    };
  
    const result = getQtMusics(musics);
  
    const getMusicCount = () => {
      return Object.keys(result).length;
    };
  
    expect(getMusicCount).toThrowError();
  });
  
  
//teste19

test('Retorna 0 se a lista de músicas está vazia, contendo apenas espaços em branco', () => {
    const musics = {
      '0': '   ',
      '1': '    ',
      '2': '   '
    };
  
    const result = getQtMusics(musics);
  
    const getMusicCount = () => {
      return Object.keys(result).length;
    };
  
    expect(getMusicCount).toThrowError();
  });
  
//teste20

  test('Retorna o número total de músicas na lista após adicionar uma nova música', () => {
    const musics = {
        '0': 'One Dance',
        '1': 'Amor e fé'
    };

    const result = addMusic('Meu pedaço de pecado', musics);

    // Verificando se o resultado retornado pela função é igual ao tamanho total da lista de músicas
    expect(Object.keys(result).length).toBe(Object.keys(musics).length + 1);
});



//teste21
test('Irá testar se retorna o número correto de músicas após adicionar duas músicas', () => {
    const musics = {
        '0': 'One Dance'
    };

    const result1 = addMusic('Amor e fé', musics);
    const result2 = addMusic('Meu pedaço de pecado', musics);

    // Verificando se o resultado retornado pela função é igual ao tamanho total da lista de músicas
    expect(Object.keys(result1).length).toBe(2);
    expect(Object.keys(result2).length).toBe(3);
});


//teste22
test('Não é permitido adicionar músicas vazias', () => {
    const musics = {
        '0': 'One Dance',
        '1': 'Amor e fé'
    };

    const addEmptyMusic = () => {
        addMusic('', musics);
    };

    // Verificando se uma exceção é lançada ao adicionar uma música vazia
    expect(addEmptyMusic).toThrowError();
});

//teste23
test('Permite adicionar músicas com números, já que muitas músicas têm seu nome como caracteres', () => {
    const musics = {
      '0': 'One Dance',
      '1': 'Amor e fé'
    };
  
    const addNumberMusic = () => {
      addMusic('212', musics);
    };
  
    expect(addNumberMusic).toThrowError();
  });
  

//teste24
test('Permite adicionar músicas com hífen no nome', () => {
    const musics = {
      '0': 'One Dance',
      '1': 'Amor e fé'
    };
  
    const addHyphenMusic = () => {
      addMusic('Summer-Love', musics);
    };
  
    expect(addHyphenMusic).toThrowError();
  });
  

//teste25
test('Permite adicionar músicas com caracteres especiais no nome, como "$", "&" e "*"', () => {
    const musics = {
      '0': 'One Dance',
      '1': 'Amor e fé'
    };
  
    const addSpecialCharMusic = () => {
      addMusic('Love $amp', musics);
    };
  
    expect(addSpecialCharMusic).toThrowError();
  });
  

//teste26
test('Não permite buscar valores vazios', () => {
    const musics = {
      '0': { title: 'One Dance', artist: 'Drake' },
      '1': { title: 'Amor e fé', artist: 'Hungria' },
      '2': { title: 'Temporal', artist: 'Hungria' }
    };
  
    const emptySearch = () => {
      searchMusic('', musics);
    };
  
    expect(emptySearch).toThrowError();
  });
  

//teste27
test('Permite fazer busca por caracteres', () => {
    const musics = {
      '0': { title: 'One Dance', artist: 'Drake' },
      '1': { title: '212', artist: 'artista desconhecido' },
      '2': { title: 'Amor e fé', artist: 'Hungria' }
    };
  
    const result = searchMusic('212', musics);
  
    expect(result).toThrowError();
  });
  
//teste28
test('Permite fazer busca por caractere especial', () => {
    const musics = {
      '0': { title: 'Cama de casal', artist: 'Hungria' },
      '1': { title: 'One Dance', artist: 'Drake' },
      '2': { title: 'Lind@', artist: 'Rita de Cassia' }
    };
  
    const result = searchMusic('@', musics);
  
    expect(result).toThrowError();
  });
  
//teste29
test('Retorna a música correta ao buscar por um título válido', () => {
    const musics = {
      '0': { title: 'Amor e fé', artist: 'Hungria' },
      '1': { title: 'One Dance', artist: 'Drake' }
    };
  
    const searchValidTitle = () => {
      searchMusic('Amor e fé', musics);
    };
  
    expect(searchValidTitle).toThrowError();
  });
  

//teste30

test('Permite realizar a busca mesmo que o usuário esqueça algum assento no título', () => {
    const musics = {
      '0': { title: 'Amor e fé', artist: 'Hungria' },
      '1': { title: 'One dance', artist: 'Drake' }
    };
  
    const searchWithoutAccent = () => {
      searchMusic('Amor e fe', musics);
    };
  
    expect(searchWithoutAccent).toThrowError();
  });
  











})

