async function BuscaBanco(){
  
    let btn = document.querySelector(".loginContainer");
    btn.addEventListener('click', function(btnLogin){
        btnLogin.preventDefault();
    });
    
    let emailFiltro = /^.+@.+\..{2,}$/;
    let senhaFiltro = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

    let emailInput = document.querySelector("#emailInput")
    let senhaInput = document.querySelector("#senhaInput");

    let email = emailInput.value;
    let senha = senhaInput.value;
    if(email === '' || senha === ''){
        emailInput.style.borderColor = "#E9B425";
        senhaInput.style.borderColor = "#E9B425";
    }else if(email === "admin" && senha === "admin"){
        window.location.href="bemVindoAdmin.html"
    }else if (!emailFiltro.test(email)) {
        emailInput.style.borderColor = "#E9B425";
        senhaInput.style.borderColor = "#E9B425";
    }else if(!senhaFiltro.test(senha)){
        emailInput.style.borderColor = "#E9B425";
        senhaInput.style.borderColor = "#E9B425";
    }else{
      try{
      const rawResponse = await fetch("http://localhost:8080/users/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        senha: senha
      }),
      });

    const content = await rawResponse.json();      

    if(rawResponse.status === 200){
    console.log(content.id)    
        localStorage.setItem("id", content.id);
        window.location.href="bemVindo.html" 
    }else{
      console.log(rawResponse)
      emailInput.style.borderColor = "#E9B425";
      senhaInput.style.borderColor = "#E9B425";
    }
      
  }catch{

  }
  };
  }

  function voltaCorEmail(){
    let emailInput = document.querySelector("#emailInput")
    emailInput.style.borderColor = "white";
    
    }

  function voltaCorSenha(){
      let senhaInput = document.querySelector("#senhaInput");
      senhaInput.style.borderColor = "white";
    }