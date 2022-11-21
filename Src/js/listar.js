async function listar(){
try{
    
        const rawResponse = await fetch("http://localhost:8080/users/listar", {
          method: "GET",
        });
        
     const content = await rawResponse.json();

     const tbody = document.querySelector(".tbodyListar");
     content.forEach(element => {
        const tr = document.createElement('tr');
        tbody.appendChild(tr);
        const nomeTd = document.createElement('td');
        const emailTd = document.createElement('td');
        const cpfTd = document.createElement('td');
        const telefoneTd = document.createElement('td');
        const enderecoTd = document.createElement('td');
        const excluirTd = document.createElement('td');
        excluirTd.setAttribute("class", "excluir");
        excluirTd.setAttribute("onClick", "excluir()");

        tr.appendChild(nomeTd);
        tr.appendChild(emailTd);
        tr.appendChild(cpfTd);
        tr.appendChild(telefoneTd);
        tr.appendChild(enderecoTd);
        tr.appendChild(excluirTd);
        
        nomeTd.textContent = element.nome;
        emailTd.textContent = element.email;
        cpfTd.textContent = element.cpf;
        telefoneTd.textContent = element.telefone;
        enderecoTd.textContent = element.endereco;
        excluirTd.textContent = "Excluir";
        console.log(element.email);
     });

}catch{
  alert("Ops, algo deu errado, tente novamente");
}
}

listar();

function excluir(){
  window.location.href = "login.html";
}