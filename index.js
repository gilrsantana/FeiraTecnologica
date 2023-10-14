import { errors, ethers } from "./ethers-5.1.esm.min.js";
import { contratoAddress, contratoAbi } from "./constants.js";

const connectButton = document.getElementById("btnConnect");
const btnPdf = document.getElementById("btnPdf");
const txtAddress = document.getElementById("txtAddress");

btnPdf.style.display = "none";
let account;

connectButton.onclick = connect;

async function connect() {
  if (typeof window.ethereum !== "undefined") {
    let accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    connectButton.innerHTML = "Conectado";
    toastr.success("Conectado ao Metamask com sucesso!");
    account = accounts[0];
    let address = document.getElementById("txtAddress");
    address.innerHTML = account;
    address.value = account;
    getStudentData();
  } else {
    connectButton.innerHTML = "Please, install Metamask";
    toastr.error("Por favor, instale o Metamask para continuar!");
    connectButton.addEventListener("click", function () {
      window.open("https://metamask.io/download/");
    });
  }
}

async function getStudentData() {
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contratoAddress, contratoAbi, signer);
    try {
      let address = document.getElementById("txtAddress").value;

      const response = await contract.buscarAlunoPorEndereco(address);

      console.log(response);
      document.getElementById("txtNome").value = name;

      if (response.matricula != "" && response.nome != "") {
        document.getElementById("txtMatricula").value = response.matricula;
        document.getElementById("txtNome").value = response.nome;
        btnPdf.style.display = "block";
        toastr.success("Aluno encontrado");
      } else {
        toastr.error("Aluno não encontrado");
      }
    } catch (error) {
      toastr.error(error.message);
    }
  }
}


btnPdf.onclick = function () {
  const address = txtAddress.value;
  const name = document.getElementById("txtNome").value;
  const matricula = document.getElementById("txtMatricula").value;

  const tableElement = document.createElement("table");
  tableElement.className += "text-center w-100 table-success align-middle";
  tableElement.style.width = "50%";
  tableElement.style.textAlign = "center";
  tableElement.style.fontSize = "16px";
  tableElement.style.backgroundColor = "#f0f0f0";

  const row1 = document.createElement("tr");
  const rowCell1 = document.createElement("td");
  rowCell1.textContent = "Certificado de participação na Semana Tecnológica";
  rowCell1.style.fontWeight = "bold";
  rowCell1.style.fontSize = "42px";
  rowCell1.style.textAlign = "center";
  rowCell1.style.width = "100%";
  rowCell1.style.lineHeight = "3.5";
  row1.appendChild(rowCell1);
  tableElement.appendChild(row1);

  const row2 = document.createElement("tr");
  const rowCell2 = document.createElement("td");
  rowCell2.style.textAlign = "center";
  rowCell2.style.fontWeight = "bold";
  rowCell2.style.fontSize = "18px";
  rowCell2.style.width = "100%";
  rowCell2.style.lineHeight = "2.5";
  rowCell2.textContent = "Certificamos que " + name + " participou da Semana Tecnológica com a matrícula " + matricula + ".";
  row2.appendChild(rowCell2);
  tableElement.appendChild(row2);

  const row3 = document.createElement("tr");
  const rowCell3 = document.createElement("td");
  rowCell3.style.textAlign = "center";
  rowCell3.style.fontWeight = "bold";
  rowCell3.style.fontSize = "18px";
  rowCell3.style.width = "100%";
  rowCell3.style.lineHeight = "2.5";
  rowCell3.textContent = "Assinado por " + address + ".";
  row3.appendChild(rowCell3);
  tableElement.appendChild(row3);

  const row4 = document.createElement("tr");
  const rowCell4 = document.createElement("td");
  rowCell4.style.textAlign = "center";
  rowCell4.style.fontWeight = "bold";
  rowCell4.style.fontSize = "18px";
  rowCell4.style.width = "100%";
  rowCell4.style.lineHeight = "2.5";
  rowCell4.style.paddingBottom = "80px";
  rowCell4.textContent = "Rio de Janeiro, " + new Date().toLocaleString() + ".";
  row4.appendChild(rowCell4);
  tableElement.appendChild(row4);

  const certificado = document.getElementById("certificado");
  certificado.className += "d-flex justify-content-center align-items-center";
  certificado.style.height = "710px";
  certificado.style.width = "100%";
  const url = "./blockchain.jpg";
  certificado.style.backgroundImage = `url(${url})` ;
  certificado.style.backgroundSize = '100% 100%';
  certificado.style.backgroundRepeat = 'no-repeat';
  certificado.style.backgroundPosition = 'center';
  certificado.appendChild(tableElement);
  const content = certificado;
  const options = {
    margin: [10, 10, 10, 10],
    filename: "certificado-" + address + ".pdf",
    html2canvas: { scale: 2 },
    jsPDF: {
      unit: "mm",
      format: "a4",
      orientation: "landscape",
      pageHeight: "100%",
    },
  };

  html2pdf().set(options).from(content).save();
};



