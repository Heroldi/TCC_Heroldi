

async function editar(){

    let btn = document.querySelector(".editarContainer");
    btn.addEventListener('click', function(btnLogin){
        btnLogin.preventDefault();
    });

    let email = localStorage.getItem("email");
    try{        
    const rawResponse = await fetch("http://localhost:8080/users/editar", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email
      }),
    });
    
    const content = await rawResponse.json();      

    console.log(content);
  }catch{
    alert("Ops, algo deu errado, tente novamente");
  }
  }