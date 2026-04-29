# CULT - Streaming UI

Interface web inspirada em plataformas de streaming, com destaque principal, trilhos de conteudo, busca, perfil editavel.

## Visao Geral

O projeto foi construido com HTML, CSS e JavaScript puro, focando em:

- visual estilo streaming (hero em destaque, cards com hover e acoes)
- navegacao por sessoes (`Inicio`, `Series`, `Filmes`, `Documentarios`, `Minha Lista`)
- experiencia interativa sem backend
- persistencia de dados via `localStorage` em formato JSON

## Funcionalidades

- **Header dinamico**
  - menu central com abas de navegacao
  - busca ao lado do icone de perfil
  - header fixo com fade

- **Home (`Inicio`)**
  - exibe o hero principal
  - exibe top filmes da semana
  - exibe trilhos de genero

- **Navegacao por sessoes**
  - `Series`: mostra apenas "Series e minisséries"
  - `Filmes`: mostra apenas "Acao e crime"
  - `Documentarios`: mostra apenas "Drama e documentarios"
  - `Minha Lista`: mostra filmes salvos na lista de desejos

- **Cards interativos**
  - hover com meta (`ano • genero`)
  - botao de reproduzir trailer
  - botao de lista de desejos (icone de coracao)

- **Lista de desejos persistida**
  - adicionar/remover diretamente pelos cards
  - dados salvos em JSON no `localStorage`

- **Busca funcional**
  - ao pressionar Enter ou clicar no icone de busca, exibe tela de resultados
  - lista titulos encontrados com base no catalogo local

- **Perfil editavel**
  - tela acessada pelo icone de usuario
  - dados ficticios iniciais (nome, e-mail, telefone, plano, idioma)
  - atualizacao salva em JSON no `localStorage`

## Persistencia (JSON no navegador)

Chave usada no `localStorage`:

- `cultMinhaListaJson`

Exemplo de estrutura:

```json
{
  "atualizadaEm": "2026-04-29T12:00:00.000Z",
  "filmes": [
    "O Sal da Terra",
    "Cidade de Deus"
  ],
  "perfil": {
    "nome": "Marina Costa",
    "email": "marina.costa@cultplay.com",
    "telefone": "(11) 98888-2211",
    "plano": "Premium",
    "idioma": "Portugues"
  }
}
```

## Estrutura do Projeto

```text
cult/
  index.html
  style.css
  script.js
  images/
  README.md
```

## Como Executar

Como o projeto e estatico, basta abrir o `index.html` no navegador.

## Tecnologias

- HTML5
- CSS3
- JavaScript (ES6+)

## Melhorias Futuras (sugestoes)

- exportar/importar JSON da lista/perfil
- ordenacao e filtros avancados na busca
- pagina individual de detalhes para cada titulo
- integracao com API real de filmes/series

