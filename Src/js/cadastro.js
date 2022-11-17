function habilitarBotaoModal(){
  let checkBox = document.querySelector("#termosCheckbox").checked;
  let botaoFechar = document.querySelector(".btnFechaModal");
  let botaoCadastro = document.querySelector("#botaoCadastro");

  if(checkBox){
    botaoFechar.removeAttribute('disabled')
    botaoCadastro.removeAttribute('disabled')
  }else{
    botaoFechar.setAttribute('disabled', 'disabled');
    botaoCadastro.setAttribute('disabled', 'disabled');
  }
}



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
  document.body.style.overflow = 'auto';
}

function mascaraCpf(numero){
   
  var valor = numero.value;
  
  if(isNaN(valor[valor.length-1])){ // impede entrar outro caractere que não seja número
     numero.value = valor.substring(0, valor.length-1);
     return;
  }
  
  if (valor.length == 3 || valor.length == 7) numero.value += ".";
  if (valor.length == 11) numero.value += "-";

}

const handlePhone = (event) => {
  let input = event.target
  input.value = phoneMask(input.value)
}

const phoneMask = (value) => {
  if (!value) return ""
  value = value.replace(/\D/g,'')
  value = value.replace(/(\d{2})(\d)/,"($1) $2")
  value = value.replace(/(\d)(\d{4})$/,"$1-$2")
  return value
}

async function SalvarBanco(){
 
    let btn = document.querySelector(".cadastroContainer");
    btn.addEventListener('click', function(btnCadastro){
        btnCadastro.preventDefault();
    });

    let emailFiltro = /^.+@.+\..{2,}$/;
    let senhaFiltro = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

    let nomeInput = document.querySelector("#nomeInput");
    let emailInput = document.querySelector("#emailInput");
    let senhaInput = document.querySelector("#senhaInput");
    let cpfInput = document.querySelector("#cpfInput");
    let telefoneInput = document.querySelector("#telefoneInput");
    let enderecoInput = document.querySelector("#enderecoInput");

    let nome = nomeInput.value;
    let email = emailInput.value;
    let senha = senhaInput.value;
    let cpf = cpfInput.value;
    let telefone = telefoneInput.value;
    let endereco = enderecoInput.value;

    if(nome ==='' && email ==='' && senha ==='' && cpf ==='' && telefone ==='' && endereco ===''){
        emailInput.style.background = "yellow"
        senhaInput.style.background = "yellow"
        cpfInput.style.background = "yellow";
        telefoneInput.style.background = "yellow";
        enderecoInput.style.background ="yellow"
    }else if(nome === ''){
      nomeInput.style.background = "yellow"
    }else if(email === ''){ 
      emailInput.style.background = "yellow"
    }else if(senha === ''){
      senhaInput.style.background = "yellow"
    }else if(cpf === ''){
      cpfInput.style.background = "yellow";
    }else if(telefone === ''){
      telefoneInput.style.background = "yellow";
    }else if(endereco === ''){
      enderecoInput.style.background ="yellow"
    }else if (!emailFiltro.test(email) && !senhaFiltro.test(senha)) {
        emailInput.style.background = "yellow"
        senhaInput.style.background = "yellow"
    }else if(!emailFiltro.test(email)){
        emailInput.style.background = "yellow"
    }else if(!senhaFiltro.test(senha)){
        senhaInput.style.background = "yellow"
    }else{     
    
      try{
            const rawResponse = await fetch("http://localhost:8080/users/registrar", {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                nome: nome,
                email: email,
                senha: senha,
                cpf: cpf,
                telefone: telefone,
                endereco: endereco
              }),
            });

            window.location.href ='login.html'   
    }catch{
      alert("Ops, algo deu errado, tente novamente");
    }
  }
  };