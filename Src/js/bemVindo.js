let emailReq;
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


    async function excluir(){

        let emailReq = localStorage.getItem("email");
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
      localStorage.removeItem(email);
      location. reload();   
    }catch{
      alert("Ops, algo deu errado, tente novamente");
    }
    }