function openModal(mn) {
  let modal = document.getElementById(mn);

  if (typeof modal == 'undefined' || modal === null)
      return;

  modal.style.display = 'Block';
}

function closeModal(mn) {
  let modal = document.getElementById(mn);

  if (typeof modal == 'undefined' || modal === null)
      return;
  modal.style.display = 'none';
}


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
        excluirTd.setAttribute("onClick", "pegaEmail(event)");

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
     });

}catch{
  alert("Ops, algo deu errado, tente novamente");
}
}

listar();


      async function excluir(){
        try{        
        const rawResponse = await fetch("http://localhost:8080/users/excluir", {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: emailReq
          }),
        });
        location. reload();   
      }catch{
        alert("Ops, algo deu errado, tente novamente");
      }
      }