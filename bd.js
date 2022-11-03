var bd = openDatabase("meuBD", "1.0", "Meu Banco de Dados", 4080);

bd.transaction(function(criar){
    criar.executeSql(
        "CREATE TABLE nomes (nome TEXT)"
    );
});
function salvarNome(){
    const nomeUsuario = document.getElementById("nome-usuario").value;

bd.transaction(function(inserir){
    inserir.executeSql(
        "INSERT INTO nomes (nome) VALUES (?)", [nomeUsuario]
    );
});
}