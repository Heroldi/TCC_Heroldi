
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
  let nomeFiltro = /[a-zA-Z]{1,150}/;
  let emailFiltro = /^.+@.+\..{2,}$/;
  let cpfFiltro = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/;
  let telefoneFiltro = /(\(?\d{2}\)?\s)?(\d{4,5}\-\d{4})/;
  let enderecoFiltro = /[0-9a-zA-Z]{1,300}/;

let nome = nomeInput.value;
let email = emailInput.value;
let cpf = cpfInput.value;
let telefone = telefoneInput.value;
let endereco = enderecoInput.value;

    let btn = document.querySelector(".editarContainer");
    btn.addEventListener('click', function(btnLogin){
        btnLogin.preventDefault();
    });

    let idReq = localStorage.getItem("id");

    
  if(nome ==='' && email ==='' && cpf ==='' && telefone ==='' && endereco ===''){
      nomeInput.style.borderColor = "#E9B425";
      emailInput.style.borderColor = "#E9B425"
      cpfInput.style.borderColor = "#E9B425";
      telefoneInput.style.borderColor = "#E9B425";
      enderecoInput.style.borderColor ="#E9B425"
  }else if(nome === ''){
    nomeInput.style.borderColor = "#E9B425"
  }else if(email === ''){ 
    emailInput.style.borderColor = "#E9B425"
  }else if(cpf === ''){
    cpfInput.style.borderColor = "#E9B425";
  }else if(telefone === ''){
    telefoneInput.style.borderColor = "#E9B425";
  }else if(endereco === ''){
    enderecoInput.style.borderColor ="#E9B425"
  }else if (!nomeFiltro.test(nome) && !emailFiltro.test(email) && !cpfFiltro.test(cpf) && !telefoneFiltro.test(telefone) && !enderecoFiltro.test(endereco)) {
      nomeInput.style.borderColor = "#E9B425"
      emailInput.style.borderColor = "#E9B425";
      cpfInput.style.borderColor = "#E9B425";
      enderecoInput.style.borderColor = "#E9B425";
  }else if(!nomeFiltro.test(nome)){
      nomeInput.style.borderColor = "#E9B425"
  }else if(!emailFiltro.test(email)){
        emailInput.style.borderColor = "#E9B425"
  }else if(!cpfFiltro.test(cpf)){
    cpfInput.style.borderColor = "#E9B425";
  }else if(!telefoneFiltro.test(telefone)){
    telefoneInput.style.borderColor = "#E9B425";
  }else if(!enderecoFiltro.test(endereco)){
    enderecoInput.style.borderColor = "#E9B425";
  }else{ 
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

    alert("Seus dados foram atualizados com sucesso");
    window.location.href="bemVindo.html";
    localStorage.removeItem("user");
  }catch{
    alert("Ops, algo deu errado, tente novamente");
  }
  }
}

  function voltar(){
    window.location.href="bemVindo.html";
  }

  function voltaCorNome(){
    let nomeInput = document.querySelector("#nomeInput")
    nomeInput.style.borderColor = "white";
  }

  function voltaCorEmail(){
    let emailInput = document.querySelector("#emailInput")
    emailInput.style.borderColor = "white";
  }

  function voltaCorCpf(){
    let cpfInput = document.querySelector("#cpfInput")
    cpfInput.style.borderColor = "white";
  }

  function voltaCorTelefone(){
    let telefoneInput = document.querySelector("#telefoneInput")
    telefoneInput.style.borderColor = "white";
  }

  function voltaCorEndereco(){
    let enderecoInput = document.querySelector("#enderecoInput")
    enderecoInput.style.borderColor = "white";
  }