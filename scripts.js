/*
  --------------------------------------------------------------------------------------
  Função para obter a lista existente do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/
const getList = async () => {
  
  /*let url = 'http://127.0.0.1:5000/servico';*/
  let url = 'http://192.168.0.17:5000/servico';
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      data.servicos.forEach(item => insertList(item.servico, item.tipoDeServico, item.valorDoServico, item.contato, item.maisInformacoes))
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Chamada da função para carregamento inicial dos dados
  --------------------------------------------------------------------------------------
*/
getList()


/*
  --------------------------------------------------------------------------------------
  Função para colocar um item na lista do servidor via requisição POST
  --------------------------------------------------------------------------------------
*/
const postItem = async (inputService, inputTypeService, inputPriceService, inputContact, inputMoreInformation) => {
  const formData = new FormData();
  formData.append('servico', inputService);
  formData.append('tipo de servico', inputTypeService);
  formData.append('valor do servico', inputPriceService);
  formData.append('contato', inputContact);
  formData.append('mais informacoes', inputMoreInformation);

  /*let url = 'http://127.0.0.1:5000/servico';*/
  let url = 'http://192.168.0.17:5000/servico';
  fetch(url, {
    method: 'post',
    body: formData
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}


/*
  --------------------------------------------------------------------------------------
  Função para criar um botão close para cada item da lista
  --------------------------------------------------------------------------------------
*/
const insertButton = (parent) => {
  let span = document.createElement("span");
  let txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  parent.appendChild(span);
}


/*
  --------------------------------------------------------------------------------------
  Função para remover um item da lista de acordo com o click no botão close
  --------------------------------------------------------------------------------------
*/
const removeElement = () => {
  let close = document.getElementsByClassName("close");
  // var table = document.getElementById('myTable');
  let i;
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      let div = this.parentElement.parentElement;
      const nomeItem = div.getElementsByTagName('td')[0].innerHTML
      if (confirm("Você tem certeza?")) {
        div.remove()
        deleteItem(nomeItem)
        alert("Removido!")
      }
    }
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para deletar um item da lista do servidor via requisição DELETE
  --------------------------------------------------------------------------------------
*/
const deleteItem = (item) => {
  console.log(item)
  /*let url = ' http://192.168.0.17:5000/servico?servico=' + item;*/
  let url = 'http://127.0.0.1:5000/servico?servico=' + item;
  fetch(url, {
    method: 'delete'
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  -----------------------------------------------------------------------------------------------------------
  Função para adicionar um novo item com nome do serviço, tipo do serviço, valor, contato e mais informações 
  -----------------------------------------------------------------------------------------------------------
*/
const newItem = () => {
  let inputService = document.getElementById("newInput").value;
  let inputTypeService = document.getElementById("newType").value;
  let inputPriceService = document.getElementById("newPriceService").value;
  let inputContact = document.getElementById("newContact").value;
  let inputMoreInformation = document.getElementById("newMoreInformation").value;

  if (inputProduct === '') {
    alert("Escreva o nome do serviço!");
  } else if (isNaN(inputPrice) || isNaN(inputContact)) {
    alert("Valor do serviço e Contato precisam ser números!");
  } else {
    insertList(inputService, inputTypeService, inputPriceService, inputContact, inputMoreInformation)
    postItem(inputService, inputTypeService, inputPriceService, inputContact, inputMoreInformation)
    alert("Serviço adicionado!")
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para inserir items na lista apresentada
  --------------------------------------------------------------------------------------
*/
const insertList = (nameService, typeService, priceService, contact, moreInformation) => {
  var item = [nameService, typeService, priceService, contact, moreInformation]
  var table = document.getElementById('myTableService');
  var row = table.insertRow();

  for (var i = 0; i < item.length; i++) {
    var cel = row.insertCell(i);
    cel.textContent = item[i];
  }
  insertButton(row.insertCell(-1))
  document.getElementById("newInput").value = "";
  document.getElementById("newType").value = "";
  document.getElementById("newPriceService").value = "";
  document.getElementById("newContact").value = "";
  document.getElementById("newMoreInformation").value = "";

  removeElement()
}