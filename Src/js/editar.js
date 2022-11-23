
let nomeInput = document.querySelector("#nomeInput");
let emailInput = document.querySelector("#emailInput");
let cpfInput = document.querySelector("#cpfInput");
let telefoneInput = document.querySelector("#telefoneInput");
let enderecoInput = document.querySelector("#enderecoInput");

let data = localStorage.getItem('user');

data = JSON.parse(data);
// console.log(data.nome);

nomeInput.value = data.nome;
emailInput.value = data.email;
cpfInput.value = data.cpf;
telefoneInput.value = data.telefone;
enderecoInput.value = data.endereco;




async function editar(){
let nome = nomeInput.value;
let email = emailInput.value;
let cpf = cpfInput.value;
let telefone = telefoneInput.value;
let endereco = enderecoInput.value;

  console.log(nome)

    let btn = document.querySelector(".editarContainer");
    btn.addEventListener('click', function(btnLogin){
        btnLogin.preventDefault();
    });

    let idReq = localStorage.getItem("id");
    try{        
    const rawResponse = await fetch("http://localhost:8080/users/editar", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id : idReq,
        nome: nome,
        email : email,
        cpf : cpf,
        telefone : telefone,
        endereco : endereco
      }),
    });
    
    const content = await rawResponse.json();      

    console.log(content);
  }catch{
    alert("Ops, algo deu errado, tente novamente");
  }
  }