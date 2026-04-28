// Evento para carregar o DOM
document.addEventListener("DOMContentLoaded", () => {
    // Eventos para selecionar os elementos do DOM
    const $ = (s, root = document) => root.querySelector(s);
    const $$ = (s, root = document) => Array.from(root.querySelectorAll(s));

    // Eventos para definir a interface do usuário
    const ui = {
        botaoMaisInfo: $(".botao-mais-info"),
        sidebar: $(".info-sidebar"),
        overlay: $(".sidebar-overlay"),
        fechar: $(".sidebar-fechar"),
        titulo: $(".sidebar-titulo"),
        sinopse: $(".sidebar-sinopse"),
        meta: $(".sidebar-meta"),
        trailer: $(".sidebar-trailer"),
        player: $(".sidebar-player"),
        playerThumb: $(".sidebar-player-thumb")
    };

    // Eventos para definir o catalogo de filmes
    const catalogo = {
        "O Sal da Terra": {
            sinopse: "Documentario sobre a trajetoria do fotografo Sebastiao Salgado, de Serra Pelada ao projeto Genesis.",
            detalhes: [
                "Genero: Documentario",
                "Diretores: Wim Wenders, Juliano Ribeiro Salgado",
                "Duracao: 1h 50m",
                "Data de lancamento: 26 de marco de 2015"
            ],
            trailer: "https://www.youtube.com/watch?v=QAN6Blm5gA8",
            youtubeId: "QAN6Blm5gA8"
        },
        "A Casa das Sete Mulheres": {
            sinopse: "Minisserie historica ambientada na Revolucao Farroupilha.",
            detalhes: [
                "Genero: Drama historico",
                "Direcao: Jayme Monjardim",
                "Duracao: 50 min (episodio)",
                "Data de lancamento: 7 de janeiro de 2003"
            ],
            trailer: "https://www.youtube.com/results?search_query=A+Casa+das+Sete+Mulheres+trailer",
            youtubeId: ""
        },
        "Amar e para os Fortes": {
            sinopse: "Duas maes buscam justica apos tragedia em acao policial.",
            detalhes: [
                "Genero: Drama",
                "Direcao: Katia Lund, Yasmin Thayna, Daniel Lieff",
                "Duracao: 35 min (episodio)",
                "Data de lancamento: 17 de novembro de 2023"
            ],
            trailer: "https://www.youtube.com/results?search_query=Amar+e+Para+os+Fortes+trailer",
            youtubeId: ""
        },
        AmarElo: {
            sinopse: "Emicida revisita a cultura negra brasileira.",
            detalhes: [
                "Genero: Documentario musical",
                "Direcao: Fred Ouro Preto",
                "Duracao: 1h 29m",
                "Data de lancamento: 8 de dezembro de 2020"
            ],
            trailer: "https://www.youtube.com/watch?v=FQ9hCN0ZYSg",
            youtubeId: "FQ9hCN0ZYSg"
        },
        Bacurau: {
            sinopse: "Moradores do sertao resistem a ameacas misteriosas.",
            detalhes: [
                "Genero: Drama, ficcao cientifica, thriller",
                "Direcao: Kleber Mendonca Filho, Juliano Dornelles",
                "Duracao: 2h 11m",
                "Data de lancamento: 29 de agosto de 2019"
            ],
            trailer: "https://www.youtube.com/results?search_query=Bacurau+trailer",
            youtubeId: ""
        },
        "O Auto da Compadecida": {
            sinopse: "Joao Grilo e Chico no sertao com humor e fantasia.",
            detalhes: [
                "Genero: Comedia dramatica, fantasia",
                "Direcao: Guel Arraes",
                "Duracao: 1h 44m",
                "Data de lancamento: 15 de setembro de 2000"
            ],
            trailer: "https://www.youtube.com/results?search_query=O+Auto+da+Compadecida+trailer",
            youtubeId: ""
        },
        "Cidade de Deus": {
            sinopse: "Ascensao da violencia na favela Cidade de Deus.",
            detalhes: [
                "Genero: Drama, crime",
                "Direcao: Fernando Meirelles, Katia Lund",
                "Duracao: 2h 10m",
                "Data de lancamento: 30 de agosto de 2002"
            ],
            trailer: "https://www.youtube.com/watch?v=dcUOO4Itgmw",
            youtubeId: "dcUOO4Itgmw"
        },
        "Emergencia Radioativa": {
            sinopse: "Minisserie inspirada no acidente com cesio-137.",
            detalhes: [
                "Genero: Drama, ficcao historica",
                "Direcao: Fernando Coimbra, Ibere Carvalho",
                "Duracao: 53 a 65 min (episodio)",
                "Data de lancamento: 18 de marco de 2026"
            ],
            trailer: "https://www.youtube.com/results?search_query=Emergencia+Radioativa+trailer",
            youtubeId: ""
        },
        "Hoje Eu Quero Voltar Sozinho": {
            sinopse: "Descobertas sobre independencia, amizade e amor.",
            detalhes: [
                "Genero: Drama, romance",
                "Direcao: Daniel Ribeiro",
                "Duracao: 1h 36m",
                "Data de lancamento: 10 de abril de 2014"
            ],
            trailer: "https://www.youtube.com/results?search_query=Hoje+Eu+Quero+Voltar+Sozinho+trailer",
            youtubeId: ""
        },
        "Irmaos de Guerra": {
            sinopse: "Companhia Easy na Segunda Guerra Mundial.",
            detalhes: [
                "Genero: Drama de guerra",
                "Direcao: Phil Alden Robinson, Tom Hanks e outros",
                "Duracao: 49 a 70 min (episodio)",
                "Data de lancamento: 9 de setembro de 2001"
            ],
            trailer: "https://www.youtube.com/results?search_query=Band+of+Brothers+trailer",
            youtubeId: ""
        },
        "Tropa de Elite": {
            sinopse: "Capitao Nascimento no BOPE.",
            detalhes: [
                "Genero: Acao, crime, drama",
                "Direcao: Jose Padilha",
                "Duracao: 1h 55m",
                "Data de lancamento: 12 de outubro de 2007"
            ],
            trailer: "https://www.youtube.com/watch?v=uZBiNJQxtGw",
            youtubeId: "uZBiNJQxtGw"
        },
        Carandiru: {
            sinopse: "Historias de sobrevivencia no presidio do Carandiru.",
            detalhes: [
                "Genero: Drama",
                "Direcao: Hector Babenco",
                "Duracao: 2h 25m",
                "Data de lancamento: 11 de abril de 2003"
            ],
            trailer: "https://www.youtube.com/results?search_query=Carandiru+trailer",
            youtubeId: ""
        },
        "Central do Brasil": {
            sinopse: "Dora e Josue em busca do pai.",
            detalhes: [
                "Genero: Drama",
                "Direcao: Walter Salles",
                "Duracao: 1h 50m",
                "Data de lancamento: 3 de abril de 1998"
            ],
            trailer: "https://www.youtube.com/watch?v=lARFBFxjLNI",
            youtubeId: "lARFBFxjLNI"
        },
        Chernobyl: {
            sinopse: "Desastre nuclear e esforcos de contencao.",
            detalhes: [
                "Genero: Drama historico",
                "Direcao: Johan Renck",
                "Duracao: 59 a 71 min (episodio)",
                "Data de lancamento: 6 de maio de 2019"
            ],
            trailer: "https://www.youtube.com/results?search_query=Chernobyl+HBO+trailer",
            youtubeId: ""
        },
        "O Pagador de Promessa": {
            sinopse: "Promessa religiosa e conflitos sociais.",
            detalhes: [
                "Genero: Drama",
                "Direcao: Anselmo Duarte",
                "Duracao: 1h 38m",
                "Data de lancamento: 6 de agosto de 1962"
            ],
            trailer: "https://www.youtube.com/results?search_query=O+Pagador+de+Promessas+trailer",
            youtubeId: ""
        },
        "Que Horas Ela Volta": {
            sinopse: "Conflitos de classe em Sao Paulo.",
            detalhes: [
                "Genero: Drama",
                "Direcao: Anna Muylaert",
                "Duracao: 1h 52m",
                "Data de lancamento: 27 de agosto de 2015"
            ],
            trailer: "https://www.youtube.com/results?search_query=Que+Horas+Ela+Volta+trailer",
            youtubeId: ""
        },
        "Terra em Transe": {
            sinopse: "Conflitos politicos em Eldorado.",
            detalhes: [
                "Genero: Drama",
                "Direcao: Glauber Rocha",
                "Duracao: 1h 46m",
                "Data de lancamento: 19 de maio de 1967"
            ],
            trailer: "https://www.youtube.com/results?search_query=Terra+em+Transe+trailer",
            youtubeId: ""
        }
    };

    // Eventos para definir as informações do filme
    const getInfo = (nome) => catalogo[nome] || {
        sinopse: "Informacoes deste titulo estao em atualizacao no catalogo.",
        detalhes: ["Genero: Nao informado", "Direcao: Nao informada", "Duracao: Nao informada", "Data de lancamento: Nao informada"],
        trailer: `https://www.youtube.com/results?search_query=${encodeURIComponent(nome + " trailer")}`,
        youtubeId: ""
    };

    // Eventos para definir a meta da carta de filme
    const metaCard = (info) => {
        const genero = info.detalhes.find((d) => d.startsWith("Genero:"))?.replace("Genero:", "").trim() || "Genero nao informado";
        const ano = info.detalhes.find((d) => d.startsWith("Data de lancamento:"))?.match(/\d{4}/)?.[0] || "----";
        return `${ano} • ${genero}`;
    };

    // Eventos para abrir o modal de detalhes do filme em destaque
    const abrirSidebar = (nome) => {
        const info = getInfo(nome);
        ui.titulo.textContent = nome;
        ui.sinopse.textContent = info.sinopse;
        ui.meta.innerHTML = "";
        info.detalhes.forEach((d) => {
            const p = document.createElement("p");
            p.textContent = d;
            ui.meta.appendChild(p);
        });
        // Eventos para definir os links do trailer e do player
        ui.trailer.href = info.trailer;
        // Eventos para definir o link do player
        ui.player.href = info.trailer;
        // Eventos para definir a imagem do player
        ui.playerThumb.src = info.youtubeId ? `https://i.ytimg.com/vi/${info.youtubeId}/hqdefault.jpg` : "images/capa_principal.jpg";
        // Eventos para definir o alt da imagem do player
        ui.playerThumb.alt = `Capa do trailer de ${nome}`;
        // Eventos para definir o aria-hidden da sidebar
        ui.sidebar.setAttribute("aria-hidden", "false");
        // Eventos para definir o aria-hidden da overlay
        ui.overlay.setAttribute("aria-hidden", "false");
        // Eventos para adicionar a classe sidebar-aberta ao body
        document.body.classList.add("sidebar-aberta");
    };

    // Eventos para fechar o modal de detalhes do filme em destaque
    const fecharSidebar = () => {
        // Eventos para fechar o modal de detalhes do filme em destaque
        ui.sidebar.setAttribute("aria-hidden", "true");
        ui.overlay.setAttribute("aria-hidden", "true");
        document.body.classList.remove("sidebar-aberta");
    };

    // Eventos para duplicar os filmes na lista de filmes
    $$(".lista-filmes").forEach((lista) => {
        const base = Array.from(lista.children);
        while (lista.children.length < 18 && base.length) {
            lista.appendChild(base[lista.children.length % base.length].cloneNode(true));
        }
    });

    // Eventos para os botões de navegação dos trilhos
    $$(".card-filme, .top-semana-item").forEach((card) => {
        const nome = $("h3", card)?.textContent.trim() || $("img", card)?.alt.trim() || "";
        const info = getInfo(nome);
        const meta = metaCard(info);

        // Eventos para os botões de navegação dos trilhos
        if (card.classList.contains("card-filme")) {
            // Eventos para os botões de navegação dos trilhos
            const h3 = $("h3", card);
            if (h3 && !$(".card-meta", h3)) {
                const span = document.createElement("span");
                span.className = "card-meta";
                span.textContent = meta;
                h3.appendChild(span);
            }
        } else if (!$(".top-meta", card)) {
            // Eventos para os botões de navegação dos trilhos
            const span = document.createElement("span");
            span.className = "top-meta";
            span.textContent = meta;
            card.appendChild(span);
        }

        // Eventos para os botões de navegação dos trilhos
        card.tabIndex = 0;
        card.setAttribute("role", "button");
        card.addEventListener("click", () => abrirSidebar(nome));
        // Eventos para os botões de navegação dos trilhos
        card.addEventListener("keydown", (e) => {
            // Eventos para os botões de navegação dos trilhos
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                abrirSidebar(nome);
            }
        });
    });

    // Evento para abrir o modal de detalhes do filme em destaque quando o botão "Mais informações" é clicado
    ui.botaoMaisInfo?.addEventListener("click", () => abrirSidebar("O Sal da Terra"));
    // Evento para fechar o modal de detalhes do filme em destaque quando o botão "Fechar" é clicado
    ui.fechar?.addEventListener("click", fecharSidebar);
    // Evento para fechar o modal de detalhes do filme em destaque quando a sobreposição é clicada
    ui.overlay?.addEventListener("click", fecharSidebar);
    // Evento para fechar o modal de detalhes do filme em destaque quando a tecla "Escape" é pressionada
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && ui.sidebar.getAttribute("aria-hidden") === "false") fecharSidebar();
    });

    // Evento para rolar os trilhos quando os botões de navegação são clicados
    $$(".sessao-trilho, .top-trilho").forEach((trilho) => {
        const lista = $(".lista-filmes, .top-semana-lista", trilho);
        const prev = $(".trilho-nav-prev", trilho);
        const next = $(".trilho-nav-next", trilho);
        if (!lista || !prev || !next) return;

        // Função para rolar os trilhos
        const rolar = (dir) => lista.scrollBy({ left: dir * Math.max(300, lista.clientWidth * 0.72), behavior: "smooth" });
        prev.addEventListener("click", () => rolar(-1));
        next.addEventListener("click", () => rolar(1));

    });
});
