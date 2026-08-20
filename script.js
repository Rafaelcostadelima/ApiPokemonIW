// 1. Array com os animais disponíveis
    const listaAnimais = ["cachorro", "gato", "urso", "raposa", "pato"];

    // 2. Manipulação do DOM (captura dos elementos)
    const elNome = document.getElementById("nome-animal");
    const elImagem = document.getElementById("imagem-animal");
    const elStatus = document.getElementById("status-texto");
    const elBotao = document.getElementById("btn-gerar");

    // 3. Função principal
    function Animal() {
      // Desabilita o botão enquanto carrega para evitar cliques repetidos
      elBotao.disabled = true;
      elStatus.style.display = "block";
      elStatus.innerText = "Carregando...";
      elImagem.style.display = "none";

      // Gera número aleatório para sortear um índice do array
      const indiceAleatorio = Math.floor(Math.random() * listaAnimais.length);
      const animalSorteado = listaAnimais[indiceAleatorio];

      // Atualiza o nome na tela
      elNome.innerText = "Animal: " + animalSorteado;

      // 4. Estruturas condicionais (if / else if) para selecionar a API correspondente
      if (animalSorteado === "cachorro") {
        fetch("https://dog.ceo/api/breeds/image/random")
          .then(resposta => resposta.json())
          .then(dados => {
            exibirImagem(dados.message); // A URL do cachorro vem na chave 'message'
          })
          .catch(erro => tratarErro(erro));

      } else if (animalSorteado === "gato") {
        fetch("https://api.thecatapi.com/v1/images/search")
          .then(resposta => resposta.json())
          .then(dados => {
            exibirImagem(dados[0].url); // A API de gatos retorna um Array []
          })
          .catch(erro => tratarErro(erro));

      } else if (animalSorteado === "raposa") {
        fetch("https://randomfox.ca/floof/")
          .then(resposta => resposta.json())
          .then(dados => {
            exibirImagem(dados.image); // A URL da raposa vem na chave 'image'
          })
          .catch(erro => tratarErro(erro));

      } else if (animalSorteado === "pato") {
        fetch("https://random-d.uk/api/v2/random")
          .then(resposta => resposta.json())
          .then(dados => {
            exibirImagem(dados.url); // A URL do pato vem na chave 'url'
          })
          .catch(erro => tratarErro(erro));

      } else if (animalSorteado === "urso") {
        const urlUrso = `https://placebear.com/400/300?t=${Date.now()}`;
        exibirImagem(urlUrso);
      }
    }

    // Função auxiliar para renderizar a imagem na tela
    function exibirImagem(url) {
      elImagem.src = url;
      elImagem.onload = () => {
        elStatus.style.display = "none";
        elImagem.style.display = "block";
        elBotao.disabled = false;
      };
    }

    // Função auxiliar para tratamento de erros
    function tratarErro(erro) {
      console.error("Erro na requisição:", erro);
      elStatus.innerText = "Erro ao carregar a imagem. Tente novamente.";
      elBotao.disabled = false;
    }