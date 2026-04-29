// Evento para carregar o DOM
document.addEventListener("DOMContentLoaded", () => {
    // Eventos para selecionar os elementos do DOM
    const $ = (s, root = document) => root.querySelector(s);
    const $$ = (s, root = document) => Array.from(root.querySelectorAll(s));

    // Eventos para definir a interface do usuário
    const ui = {
        botaoMaisInfo: $(".botao-mais-info"),
        campoBusca: $(".campo-busca"),
        inputBusca: $("#busca"),
        botaoPerfil: $(".usuario"),
        heroFilme: $(".hero-filme"),
        sidebar: $(".info-sidebar"),
        overlay: $(".sidebar-overlay"),
        fechar: $(".sidebar-fechar"),
        titulo: $(".sidebar-titulo"),
        sinopse: $(".sidebar-sinopse"),
        meta: $(".sidebar-meta"),
        trailer: $(".sidebar-trailer"),
        player: $(".sidebar-player"),
        playerThumb: $(".sidebar-player-thumb"),
        navLinks: $$(".nav-link"),
        topSemana: $(".sessao-top-semana"),
        sessaoFilmes: $(".sessao-filmes"),
        sessoesGenero: $$(".sessao-genero"),
        secaoMinhaLista: $(".sessao-minha-lista"),
        listaDesejos: $(".minha-lista-lista"),
        listaVazia: $(".minha-lista-vazia"),
        secaoBusca: $(".sessao-busca"),
        buscaLista: $(".busca-lista"),
        buscaStatus: $(".busca-status"),
        secaoPerfil: $(".sessao-perfil"),
        formPerfil: $(".perfil-form"),
        perfilStatus: $(".perfil-status")
    };

    const STORAGE_KEY = "cultMinhaListaJson";
    let listaDesejos = [];
    let perfil = {};
    const capasPorTitulo = {};

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

    const perfilFicticio = () => ({
        nome: "Marina Costa",
        email: "marina.costa@cultplay.com",
        telefone: "(11) 98888-2211",
        plano: "Premium",
        idioma: "Portugues"
    });

    // Eventos para definir a meta da carta de filme
    const metaCard = (info) => {
        const genero = info.detalhes.find((d) => d.startsWith("Genero:"))?.replace("Genero:", "").trim() || "Genero nao informado";
        const ano = info.detalhes.find((d) => d.startsWith("Data de lancamento:"))?.match(/\d{4}/)?.[0] || "----";
        return `${ano} • ${genero}`;
    };

    // Eventos para salvar os dados do usuario em localStorage
    const salvarDadosJson = () => {
        const payload = {
            atualizadaEm: new Date().toISOString(),
            filmes: listaDesejos,
            perfil
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(payload, null, 2));
    };

    // Eventos para carregar os dados do usuario em localStorage
    const carregarDadosJson = () => {
        try {
            const bruto = localStorage.getItem(STORAGE_KEY);
            if (!bruto) return { filmes: [], perfil: perfilFicticio() };
            const dados = JSON.parse(bruto);
            return {
                filmes: Array.isArray(dados.filmes) ? dados.filmes : [],
                perfil: { ...perfilFicticio(), ...(dados.perfil || {}) }
            };
        } catch {
            return { filmes: [], perfil: perfilFicticio() };
        }
    };

    // Eventos para atualizar os botoes de lista de desejos
    const atualizarBotoesLista = () => {
        $$(".card-acao-lista").forEach((botao) => {
            const nome = botao.dataset.nome || "";
            const adicionado = listaDesejos.includes(nome);
            botao.dataset.added = String(adicionado);
            botao.classList.toggle("ativo", adicionado);
            botao.setAttribute("aria-label", adicionado ? "Remover da lista de desejos" : "Adicionar a lista de desejos");
            const texto = $(".sr-only", botao);
            if (texto) texto.textContent = adicionado ? "Remover da lista de desejos" : "Adicionar a lista de desejos";
        });
    };

    // Eventos para montar o card de filme na minha lista
    const montarCardMinhaLista = (nome) => {
        const card = document.createElement("article");
        card.className = "card-filme";
        card.setAttribute("role", "listitem");
        const capa = capasPorTitulo[nome] || "images/capa_principal.jpg";
        card.innerHTML = `<img src="${capa}" alt="${nome}" loading="lazy"><h3>${nome}</h3>`;
        return card;
    };

    // Eventos para renderizar a minha lista de desejos
    const renderMinhaLista = () => {
        if (!ui.listaDesejos || !ui.listaVazia) return;
        ui.listaDesejos.innerHTML = "";

        if (!listaDesejos.length) {
            ui.listaVazia.classList.remove("escondida");
            return;
        }

        ui.listaVazia.classList.add("escondida");
        listaDesejos.forEach((nome) => {
            const card = montarCardMinhaLista(nome);
            ui.listaDesejos.appendChild(card);
            inicializarCard(card);
        });
    };

    // Eventos para renderizar os resultados da busca
    const renderBusca = (termo) => {
        if (!ui.buscaLista || !ui.buscaStatus) return;
        const termoLimpo = termo.trim();
        ui.buscaLista.innerHTML = "";

        if (!termoLimpo) {
            ui.buscaStatus.textContent = "Digite o nome de um filme ou serie para buscar.";
            return;
        }

        const termoLower = termoLimpo.toLowerCase();
        const resultados = Object.keys(catalogo).filter((nome) => nome.toLowerCase().includes(termoLower));

        if (!resultados.length) {
            ui.buscaStatus.textContent = `Nenhum titulo encontrado para "${termoLimpo}".`;
            return;
        }

        ui.buscaStatus.textContent = `${resultados.length} resultado(s) para "${termoLimpo}".`;
        resultados.forEach((nome) => {
            const card = montarCardMinhaLista(nome);
            ui.buscaLista.appendChild(card);
            inicializarCard(card);
        });
    };

    // Eventos para preencher o formulario de perfil
    const preencherPerfil = () => {
        if (!ui.formPerfil) return;
        ui.formPerfil.nome.value = perfil.nome || "";
        ui.formPerfil.email.value = perfil.email || "";
        ui.formPerfil.telefone.value = perfil.telefone || "";
        ui.formPerfil.plano.value = perfil.plano || "Padrao";
        ui.formPerfil.idioma.value = perfil.idioma || "Portugues";
    };

    // Eventos para definir a view atual
    const setView = (view) => {
        const isInicio = view === "inicio";
        const isSeries = view === "series";
        const isFilmes = view === "filmes";
        const isDocumentarios = view === "documentarios";
        const isMinhaLista = view === "minha-lista";
        const isBusca = view === "busca";
        const isPerfil = view === "perfil";

        ui.navLinks.forEach((link) => {
            const ativo = link.dataset.view === view;
            if (ativo) link.setAttribute("aria-current", "page");
            else link.removeAttribute("aria-current");
        });

        ui.secaoMinhaLista?.classList.toggle("escondida", !isMinhaLista);
        ui.secaoBusca?.classList.toggle("escondida", !isBusca);
        ui.secaoPerfil?.classList.toggle("escondida", !isPerfil);
        ui.heroFilme?.classList.toggle("escondida", !isInicio);
        ui.topSemana?.classList.toggle("escondida", !isInicio);
        ui.sessaoFilmes?.classList.toggle("escondida", isMinhaLista || isBusca || isPerfil);

        ui.sessoesGenero.forEach((sessao) => {
            const genero = sessao.dataset.genero;
            const visivel =
                isInicio ||
                (isSeries && genero === "series") ||
                (isFilmes && genero === "filmes") ||
                (isDocumentarios && genero === "documentarios");
            sessao.classList.toggle("escondida", !visivel);
        });
    };

    // Eventos para criar as acoes do card de filme
    const criarAcoesCard = (card, info, meta, nome) => {
        if ($(".card-hover-info", card)) return;

        const painel = document.createElement("div");
        painel.className = "card-hover-info";
        painel.setAttribute("aria-hidden", "true");

        const metaEl = document.createElement("p");
        metaEl.className = "card-hover-meta";
        metaEl.textContent = meta;

        const acoes = document.createElement("div");
        acoes.className = "card-hover-acoes";

        const botaoTrailer = document.createElement("a");
        botaoTrailer.className = "card-acao card-acao-icone card-acao-trailer";
        botaoTrailer.href = info.trailer;
        botaoTrailer.target = "_blank";
        botaoTrailer.rel = "noopener noreferrer";
        botaoTrailer.innerHTML = `
            <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8 5v14l11-7z"></path>
            </svg>
            <span class="sr-only">Reproduzir trailer</span>
        `;
        botaoTrailer.setAttribute("aria-label", "Reproduzir trailer");

        const botaoLista = document.createElement("button");
        botaoLista.className = "card-acao card-acao-icone card-acao-lista";
        botaoLista.type = "button";
        botaoLista.innerHTML = `
            <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 21s-6.3-4.35-9.2-8.25C.9 10.2 1.5 6.5 4.9 5.1c2.1-.9 4.2-.2 5.6 1.4 1.4-1.6 3.5-2.3 5.6-1.4 3.4 1.4 4 5.1 2.1 7.65C18.3 16.65 12 21 12 21z"></path>
            </svg>
            <span class="sr-only">Adicionar a lista de desejos</span>
        `;
        botaoLista.setAttribute("aria-label", "Adicionar a lista de desejos");
        botaoLista.dataset.added = "false";
        botaoLista.dataset.nome = nome;

        botaoLista.addEventListener("click", (e) => {
            e.stopPropagation();
            const existe = listaDesejos.includes(nome);
            if (existe) {
                listaDesejos = listaDesejos.filter((item) => item !== nome);
            } else {
                listaDesejos.push(nome);
            }
            salvarDadosJson();
            atualizarBotoesLista();
            renderMinhaLista();
        });

        botaoTrailer.addEventListener("click", (e) => e.stopPropagation());

        acoes.append(botaoTrailer, botaoLista);
        painel.append(metaEl, acoes);
        card.appendChild(painel);
    };

    // Eventos para inicializar o card de filme
    const inicializarCard = (card) => {
        if (!card || card.dataset.cardInit === "true") return;
        const nome = $("h3", card)?.textContent.trim() || $("img", card)?.alt.trim() || "";
        if (!nome) return;

        const capa = $("img", card)?.getAttribute("src");
        if (capa && !capasPorTitulo[nome]) capasPorTitulo[nome] = capa;

        const info = getInfo(nome);
        const meta = metaCard(info);
        criarAcoesCard(card, info, meta, nome);

        card.tabIndex = 0;
        card.setAttribute("role", "button");
        card.addEventListener("click", () => abrirSidebar(nome));
        card.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                abrirSidebar(nome);
            }
        });
        card.dataset.cardInit = "true";
    };

    // Eventos para abrir o modal de detalhes do filme em destaque
    const abrirSidebar = (nome) => {
        // Eventos para definir o titulo do filme
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

    // Eventos para carregar os dados iniciais do usuario
    const dadosIniciais = carregarDadosJson();
    listaDesejos = dadosIniciais.filmes;
    perfil = dadosIniciais.perfil;
    $$(".card-filme, .top-semana-item").forEach(inicializarCard);
    atualizarBotoesLista();
    renderMinhaLista();
    preencherPerfil();

    // Eventos para definir os links de navegacao
    ui.navLinks.forEach((link) => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            setView(link.dataset.view || "inicio");
        });
    });

    // Eventos para definir o campo de busca
    ui.campoBusca?.addEventListener("submit", (e) => {
        e.preventDefault();
        const termo = ui.inputBusca?.value || "";
        renderBusca(termo);
        setView("busca");
    });

    // Eventos para definir o botao de perfil
    ui.botaoPerfil?.addEventListener("click", () => {
        preencherPerfil();
        setView("perfil");
    });

    // Eventos para definir o formulario de perfil
    ui.formPerfil?.addEventListener("submit", (e) => {
        e.preventDefault();
        perfil = {
            nome: ui.formPerfil.nome.value.trim(),
            email: ui.formPerfil.email.value.trim(),
            telefone: ui.formPerfil.telefone.value.trim(),
            plano: ui.formPerfil.plano.value,
            idioma: ui.formPerfil.idioma.value
        };
        salvarDadosJson();
        if (ui.perfilStatus) ui.perfilStatus.textContent = "Perfil atualizado com sucesso.";
    });

    // Eventos para definir a view inicial
    setView("inicio");

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
