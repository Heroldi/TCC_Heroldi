async function listar(){
try{
    
        const rawResponse = await fetch("http://localhost:8080/users/listar", {
          method: "GET",
        });
        
     const content = await rawResponse.json();

     const tbody = document.querySelector(".tbodyListar");
     console.log(tbody);
     content.forEach(element => {
        const tr = document.createElement('tr');
        tbody.appendChild(tr);
        const emailTd = document.createElement('td');
        const cpfTd = document.createElement('td');
        const telefoneTd = document.createElement('td');
        const enderecoTd = document.createElement('td');
        tr.appendChild(emailTd);
        tr.appendChild(cpfTd);
        tr.appendChild(telefoneTd);
        tr.appendChild(enderecoTd);
        
        emailTd.textContent = element.email;
        cpfTd.textContent = element.cpf;
        telefoneTd.textContent = element.telefone;
        enderecoTd.textContent = element.endereco;
        console.log(element.email);
     });

}catch{
  alert("Ops, algo deu errado, tente novamente");
}
}

listar();