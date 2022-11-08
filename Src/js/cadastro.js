async function SalvarBanco(){

    let btn = document.querySelector(".cadastroContainer");
    btn.addEventListener('click', function(btnLogin){
        btnLogin.preventDefault();
    });

    let emailFiltro = /^.+@.+\..{2,}$/;
    let senhaFiltro = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

    let emailInput = document.querySelector("#emailInput");
    let senhaInput = document.querySelector("#senhaInput");
    let cpfInput = document.querySelector("#cpfInput");
    let telefoneInput = document.querySelector("#telefoneInput");
    let enderecoInput = document.querySelector("#enderecoInput");

    let email = emailInput.value;
    let senha = senhaInput.value;
    let cpf = cpfInput.value;
    let telefone = telefoneInput.value;
    let endereco = enderecoInput.value;

    if(email ==='' && senha === ''){
        emailInput.style.background = "yellow"
        senhaInput.style.background = "yellow"
        cpfInput.style.background = "yellow";
        telefoneInput.style.background = "yellow";
        enderecoInput.style.background ="yellow"
    }else if(email === ''){ 
        emailInput.style.background = "yellow"
    }else if(senha === ''){
        senhaInput.style.background = "yellow"
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