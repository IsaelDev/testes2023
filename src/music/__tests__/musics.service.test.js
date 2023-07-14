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
    test('Testa se retorna o número correto de músicas quando a lista contém várias músicas', () => {

  const musics = ['Dengo', 'Amor e fé', 'One Dance'];

 
  const result = getQtMusics(musics);

  // Verifica se o resultado é igual ao comprimento da lista de músicas (3 musicas neste caso)
  expect(result).toBe(musics.length);
});

//teste19

test('Retorna 0 se a lista de músicas estáiver vazia, contendo apenas espaços em branco', () => {
  
  const musics = ['   ', '    ', '   '];

  
  const result = getQtMusics(musics);

  // Verifica se o resultado é 0
  expect(result).toBe(0);
});
//teste20

    test('Retorna o número total de músicas na lista após adicionar uma nova música', () => {

    const musics = ['One Dance', 'Amor e fé'];
    const result = addMusic('Meu pedaço de pecado');

    // Verificando se o resultado retornado pela função é igual ao tamanho total da lista de músicas
    expect(result).toBe(musics.length);
});

//teste21
    test('Irá testar se retorna o número correto de músicas após adicionar duas músicas', () => {
    const musics = ['One Dance'];
    const result1 = addMusic('Amor e fé');
    const result2 = addMusic('Meu pedaço de pecado');

    // Verificando se o resultado retornado pela função é igual ao tamanho total da lista de músicas
    expect(result1).toBe(2);
    expect(result2).toBe(3);
});

//teste22
    test('Não é permitido adicionar músicas vazias', () => {
    const musics = ['One Dance', 'Amor e fé'];

    addMusic('');

    // Verificando se a lista de músicas não foi modificada
    expect(musics).toEqual(['One Dance', 'Amor e fé']);
});

//teste23
    test('Permite adicionar músicas com números, já que muitas músicas tem seu nome como caracteres', () => {
    const musics = ['One Dance', 'Amor e fé'];


    addMusic('212');

    // Verificando se a lista de músicas contém a música com nome de número
    expect(musics).toContain('212');
});

//teste24
    test('Permite adicionar músicas com hífen no nome', () => {
    const musics = ['One Dance', 'Amor e fé'];


    addMusic('Summer-Love');

    // Verificando se a lista de músicas contém a música com hífen no nome
    expect(musics).toContain('Summer-Love');
});

//teste25
    test('Permite adicionar músicas com caracteres especiais no nome, como "$", "&" e "*"', () => {
    const musics = ['One Dance', 'Amor e fé'];

    addMusic('Love $amp');

    // Verificando se a lista de músicas contém a música com caracteres especiais no nome
    expect(musics).toContain('Love $amp');
});

//teste26
    test('Não permite buscar valores vazios', () => {
    const musics = [
        { title: "One Dance", artist: "Drake" },
        { title: "Amor e fé", artist: "Hungria" },
        { title: "Temporal", artist: "Hungria" }
    ];

    const result = searchMusic('');

    // Verificando se o resultado retornado pela função é undefined
    expect(result).toBeUndefined();
});

//teste27
    test('Permite fazer busca por caracteres', () => {
    const musics = [
        { title: "One Dance", artist: "Drake" },
        { title: "212", artist: "artista desconhecido" },
        { title: "Amor e fé", artist: "Hungria" }
    ];

    const result = searchMusic('212');

    // Verificando se o resultado retornado pela função é a música com o título correspondente
    expect(result).toEqual({ title: "212", artist: "artista desconhecido" });
});

//teste28
test('Permite fazer busca por caractere especial', () => {
    const musics = [
        { title: "Cama de casal", artist: "Hungria" },
        { title: "One Dance", artist: "Drake" },
        { title: "Lind@", artist: "Rita de Cassia" }
    ];

    const result = searchMusic('@');

    // Verificando se o resultado retornado pela função é a música com o título correspondente
    expect(result).toEqual({ title: "Lind@", artist: "Rita de Cassia" });
});

//teste29
test('Retorna a música correta ao buscar por um título válido', () => {
    const musics = [
        { title: "Amor e fé", artist: "Hungria" },
        { title: "One Dance", artist: "Drake" },
    
    ];

    const result = searchMusic("Amor e fé");

    // Verificando se o resultado retornado pela função é a música com o título correspondente
    expect(result).toEqual({ title: "Amor e fé", artist: "Hungria" });
});

//teste30


test('Permite realizar a busca mesmo que o usuário esqueça algum assento no título', () => {
    const musics = [
        { title: "Amor e fé", artist: "Hungria" },
        { title: "One dance", artist: "Drake" },
    ];

    const result = searchMusic("Amor e fe");

    // Verificando se o resultado retornado pela função é a música com o título correspondente
    expect(result).toEqual({ title: "Amor e fé", artist: "Hungria" });
});












})

