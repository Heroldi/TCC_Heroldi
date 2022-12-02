let idReq;
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

async function pegaIdEdit() {
  idReq = localStorage.getItem("id");
  try {
    const rawResponse = await fetch("http://localhost:8080/users/listarum", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: idReq
      }),      
    });

    const content = await rawResponse.json();
    console.log(content)
    let data = JSON.stringify(content);

    localStorage.setItem('user', data);

    location.href="editar.html";
  } catch {
    alert("Ops, algo deu errado, tente novamente");
  }
}


function pegaIdDel() {
  idReq = localStorage.getItem("id");

  openModal('modalBox');
}
async function excluir() {

  console.log(idReq);
  try {
    const rawResponse = await fetch("http://localhost:8080/users/excluir", {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: idReq
      }),
    });
    localStorage.removeItem('id');
    location.reload();
  } catch {
    alert("Ops, algo deu errado, tente novamente");
  }
}

function logout(){
  window.location.href = "login.html"
}