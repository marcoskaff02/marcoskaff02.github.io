var bd = openDatabase("meuBD", "1.0", "Meu Banco de Dados", 4080);

bd.transaction(function (criar) {
    criar.executeSql(
        "CREATE TABLE formulario (nome TEXT, idade INTEGER, dataNasc DATE, contatos JSON)"
    );
});
function salvarInfo() {
    const nomeUsuario = document
        .getElementById("nome-usuario")
        .value.toUpperCase();
    const idadeUsuario = parseInt(
        document.getElementById("idade-usuario").value
    );
    const dataNasc = document.getElementById("data-nasc").value;
    const emailUsuario = document.getElementById("endereco-email").value;

    const contatos = { "e-mail": emailUsuario };

    if (nomeUsuario === "" || isNaN(idadeUsuario)) {
        alert("Faltam informações!");
        return false;
    }
    console.log([
        nomeUsuario,
        idadeUsuario,
        dataNasc,
        JSON.stringify(contatos),
    ]);
    bd.transaction(function (inserir) {
        inserir.executeSql(
            "INSERT INTO formulario (nome, idade, dataNasc, contatos) VALUES (?, ?, ?, ?)",
            [nomeUsuario, idadeUsuario, dataNasc, JSON.stringify(contatos)]
        );
    });

    document.getElementById("nome-usuario").value = "";
    document.getElementById("idade-usuario").value = "";
    document.getElementById("data-nasc").value = "";
    document.getElementById("endereco-email").value = "";
}
function pesquisaPorNome() {
    const nomeUsuario = document.getElementById("pesquisa-nome-usuario").value;

    bd.transaction(function (ler) {
        ler.executeSql(
            `SELECT * FROM formulario WHERE nome="${nomeUsuario}"`,
            [],
            function (ler, resultados) {
                const tamanho = resultados.rows.length;
                const msg = tamanho + "linhas encontradas";
                console.log(msg);

                const nome = resultados.rows.item(tamanho - 1).nome;
                const idade = resultados.rows.item(tamanho - 1).idade;
                const email = resultados.rows.item(tamanho - 1).email;
                document.getElementById("pesquisa-nome-usuario").value = nome;
                document.getElementById("resultado-pesquisa").value = idade;
                document.getElementById("endereco-email").value = email;
            }
        );
    });
}
function exibeBD() {
    bd.transaction(function (exibe) {
        exibe.executeSql(
            "SELECT * FROM formulario",
            [],
            function (exibe, resultados) {
                const tamanho = resultados.rows.length;
                let item;

                document.getElementById("lista-bd").innerHTML = "";

                for (let i = 0; i < tamanho; i++) {
                    item = resultados.rows.item(i);
                    document.getElementById(
                        "lista-bd"
                    ).innerHTML += `<p onclick="mostrarCartaoAltera('${item.nome}', ${item.idade})" >Nome: ${item.nome}, ${item.idade} anos</p>`;
                }
            }
        );
    });
}
function alteraInfo() {
    const novoNome = document.getElementById("nome-alteracao").value;
    const novaIdade = parseInt(
        document.getElementById("idade-alteracao").value
    );

    bd.transaction(function (altera) {
        altera.executeSql(
            `UPDATE formulario SET nome="${novoNome}", idade=${novaIdade} WHERE nome="${nomeAtualParaEditar}" AND idade=${idadetualParaEditar} `
        );
    });

    exibeBD();
}
function excluiInfo() {
    bd.transaction(function (exclui) {
        exclui.executeSql(
            `DELETE FROM formulario WHERE nome="${nomeAtualParaEditar}" AND idade=${idadetualParaEditar}`
        );
    });
}
