//TESTE 01

describe('Teste de Sistema - Serviço de Música', () => {
  beforeEach(() => {
    cy.visit('../music.repository');
    cy.window().its('MusicService').invoke('resetState');
  });

  it('deve ser possível adicionar uma música', () => {
    const music = {
      title: "Mun-rá",
      artist: "Sabotage",
      genre: "rap"
    };

    cy.get('seletor css').click();
    cy.get('seletor css').type(music.title);
    cy.get('seletor css').type(music.artist);
    cy.get('seletor css').type(music.genre);
    cy.get('seletor css').click();

    cy.get('sucesso').should('contain', 'A Música foi adicionada com sucesso!');

    const qtMusics = cy.get('.contador-musicas').invoke('text');
    expect(qtMusics).to.eq('1');
  });
});

// TESTE 03

describe('Remover uma Música', () => {
    it('deve ser capaz de remover uma música', () => {
      cy.visit('../music.repository') 
  
      const music = {
        title: 'Mun-rá',
        artist: 'Sabotage',
        genre: 'rap'
      }
  
      cy.request('POST', 'aqui vai ser a URL-do-seu-endpoint', music) 
  
      cy.visit('') 
  
      cy.get('seletor css').click()
  
      cy.get('seletor css').should('contain', 'Música removida com sucesso!')
  
      cy.get('seletor css').should('contain', '0')
    })
  })
  
