// ==========================================
// DOLCE FIORE - SCRIPT.JS
// ==========================================


// ==========================================
// POSTAGENS / NOVIDADES
// ==========================================

function adicionarPost() {

    const titulo = document.getElementById("titulo").value.trim();
    const texto = document.getElementById("texto").value.trim();

    if (titulo === "" || texto === "") {
        alert("Preencha o título e o texto.");
        return;
    }

    // Procura o local das postagens
    const postagens =
        document.getElementById("postagem") ||
        document.getElementById("postagens");

    if (!postagens) {
        console.error("Elemento de postagens não encontrado.");
        return;
    }

    // Cria a postagem
    const post = document.createElement("div");

    post.className = "post";

    post.innerHTML = `
        <h3>${titulo}</h3>
        <p>${texto}</p>
    `;

    // Coloca a postagem mais nova no começo
    postagens.prepend(post);

    // Limpa os campos
    document.getElementById("titulo").value = "";
    document.getElementById("texto").value = "";

    alert("Novidade publicada com sucesso!");
}


// ==========================================
// MOSTRAR CATÁLOGO
// ==========================================

function mostrarCatalogo() {

    const catalogo = document.getElementById("catalogo");

    if (!catalogo) {
        console.error("Catálogo não encontrado.");
        return;
    }

    catalogo.style.display = "block";

    // Rola suavemente até o catálogo
    catalogo.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}


// ==========================================
// PESQUISA
// ==========================================

function buscar() {

    const campo = document.getElementById("pesquisa");

    if (!campo) {
        return;
    }

    const texto = campo.value.trim();

    if (texto === "") {
        alert("Digite algo para pesquisar.");
        return;
    }

    alert("Você pesquisou: " + texto);
}


// ==========================================
// ABRIR PRODUTO
// ==========================================

function abrirProduto(produto) {

    alert("Abrindo: " + produto);

    // Caso queira criar uma página individual:
    // window.location.href = "produto.html";
}


// ==========================================
// NEWSLETTER
// ==========================================

function cadastrarEmail() {

    const campo = document.getElementById("email");

    if (!campo) {
        return;
    }

    const email = campo.value.trim();

    if (email === "") {
        alert("Digite seu e-mail.");
        return;
    }

    // Validação simples
    if (!email.includes("@")) {
        alert("Digite um e-mail válido.");
        return;
    }

    alert("Cadastro realizado com sucesso! 💜");

    campo.value = "";
}


// ==========================================
// CARRINHO
// ==========================================

let carrinho = [];


// ==========================================
// ADICIONAR PRODUTO
// ==========================================

function adicionarAoCarrinho(nome, preco, imagem) {

    const produtoExistente = carrinho.find(
        produto => produto.nome === nome
    );

    if (produtoExistente) {

        produtoExistente.quantidade++;

    } else {

        carrinho.push({
            nome: nome,
            preco: Number(preco),
            imagem: imagem,
            quantidade: 1
        });

    }

    atualizarCarrinho();

    abrirCarrinho();
}


// ==========================================
// ATUALIZAR CARRINHO
// ==========================================

function atualizarCarrinho() {

    const lista =
        document.getElementById("itens-carrinho");

    const contador =
        document.getElementById("quantidade-carrinho");

    const totalElemento =
        document.getElementById("total-carrinho");


    if (!lista) {
        return;
    }


    lista.innerHTML = "";


    let quantidadeTotal = 0;
    let total = 0;


    // Carrinho vazio
    if (carrinho.length === 0) {

        lista.innerHTML = `
            <p class="carrinho-vazio">
                🛒 Seu carrinho está vazio.
            </p>
        `;

    }


    // Produtos
    carrinho.forEach((produto, index) => {

        quantidadeTotal += produto.quantidade;


        const subtotal =
            produto.preco * produto.quantidade;


        total += subtotal;


        lista.innerHTML += `

            <div class="item-carrinho">

                <img
                    src="${produto.imagem}"
                    alt="${produto.nome}"
                >

                <div class="item-info">

                    <h4>
                        ${produto.nome}
                    </h4>

                    <p>
                        R$ ${formatarPreco(produto.preco)}
                    </p>

                    <div class="controles">

                        <button
                            onclick="diminuirQuantidade(${index})">
                            −
                        </button>

                        <span>
                            ${produto.quantidade}
                        </span>

                        <button
                            onclick="aumentarQuantidade(${index})">
                            +
                        </button>

                    </div>

                </div>

                <button
                    class="remover"
                    onclick="removerProduto(${index})">

                    🗑️

                </button>

            </div>

        `;

    });


    // Atualiza quantidade
    if (contador) {
        contador.textContent = quantidadeTotal;
    }


    // Atualiza total
    if (totalElemento) {

        totalElemento.textContent =
            "R$ " + formatarPreco(total);

    }

}


// ==========================================
// FORMATAR PREÇO
// ==========================================

function formatarPreco(valor) {

    return Number(valor)
        .toFixed(2)
        .replace(".", ",");
}


// ==========================================
// AUMENTAR QUANTIDADE
// ==========================================

function aumentarQuantidade(index) {

    if (!carrinho[index]) {
        return;
    }

    carrinho[index].quantidade++;

    atualizarCarrinho();
}


// ==========================================
// DIMINUIR QUANTIDADE
// ==========================================

function diminuirQuantidade(index) {

    if (!carrinho[index]) {
        return;
    }

    carrinho[index].quantidade--;


    if (carrinho[index].quantidade <= 0) {

        carrinho.splice(index, 1);

    }


    atualizarCarrinho();
}


// ==========================================
// REMOVER PRODUTO
// ==========================================

function removerProduto(index) {

    if (!carrinho[index]) {
        return;
    }

    carrinho.splice(index, 1);

    atualizarCarrinho();
}


// ==========================================
// ABRIR CARRINHO
// ==========================================

function abrirCarrinho() {

    const carrinhoElemento =
        document.getElementById("carrinho");

    const overlay =
        document.getElementById("overlay");


    if (carrinhoElemento) {

        carrinhoElemento.classList.add("aberto");

    }


    if (overlay) {

        overlay.classList.add("aberto");

    }

}


// ==========================================
// FECHAR CARRINHO
// ==========================================

function fecharCarrinho() {

    const carrinhoElemento =
        document.getElementById("carrinho");

    const overlay =
        document.getElementById("overlay");


    if (carrinhoElemento) {

        carrinhoElemento.classList.remove("aberto");

    }


    if (overlay) {

        overlay.classList.remove("aberto");

    }

}


// ==========================================
// FINALIZAR PEDIDO PELO WHATSAPP
// ==========================================

function finalizarCompra() {

    if (carrinho.length === 0) {

        alert("Seu carrinho está vazio!");

        return;
    }


    const telefone = "5531984051113";


    let mensagem =
        "Olá! Gostaria de fazer um pedido:%0A%0A";


    let total = 0;


    carrinho.forEach(produto => {

        const subtotal =
            produto.preco * produto.quantidade;


        total += subtotal;


        mensagem +=
            `${produto.quantidade}x ${produto.nome} - R$ ${formatarPreco(subtotal)}%0A`;

    });


    mensagem +=
        `%0ATotal: R$ ${formatarPreco(total)}`;


    const url =
        `https://wa.me/${telefone}?text=${mensagem}`;


    window.open(url, "_blank");

}


// ==========================================
// FECHAR CARRINHO COM A TECLA ESC
// ==========================================

document.addEventListener("keydown", function(event) {

    if (event.key === "Escape") {

        fecharCarrinho();

    }

});


// ==========================================
// INICIALIZAÇÃO
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        atualizarCarrinho();

    }
);

// ==========================================
// PESQUISA DE PRODUTOS
// ==========================================

function buscar() {

    const campo = document.getElementById("pesquisa");

    const texto = campo.value
        .toLowerCase()
        .trim();

    const produtos = document.querySelectorAll(".produto-card");


    // Se não digitou nada, mostra todos os produtos
    if (texto === "") {

        produtos.forEach(produto => {
            produto.style.display = "flex";
        });

        return;
    }


    let encontrou = false;


    produtos.forEach(produto => {

        const nome =
            produto.querySelector("h3").textContent.toLowerCase();

        const ingredientes =
            produto.querySelector("ul").textContent.toLowerCase();


        // Procura pelo nome ou pelos ingredientes
        if (
            nome.includes(texto) ||
            ingredientes.includes(texto)
        ) {

            produto.style.display = "flex";

            encontrou = true;

        } else {

            produto.style.display = "none";

        }

    });


    // Mensagem caso não encontre
    let mensagem = document.getElementById("resultado-pesquisa");


    if (!encontrou) {

        if (!mensagem) {

            mensagem = document.createElement("p");

            mensagem.id = "resultado-pesquisa";

            mensagem.style.textAlign = "center";

            mensagem.style.color = "#8b3a62";

            mensagem.style.fontWeight = "bold";

            document
                .getElementById("produtos")
                .appendChild(mensagem);

        }

        mensagem.textContent =
            "😔 Nenhum produto encontrado.";

    } else {

        if (mensagem) {
            mensagem.remove();
        }

    }

}


// ==========================================
// PESQUISAR AO APERTAR ENTER
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    const campoPesquisa =
        document.getElementById("pesquisa");

    if (campoPesquisa) {

        campoPesquisa.addEventListener(
            "keydown",
            function (event) {

                if (event.key === "Enter") {

                    buscar();

                }

            }
        );

    }

});
