let estudantes = [
  {
    nome: "Ana Souza",
    idade: 17,
    turma: "DS-01",
    n1: 8,
    n2: 6,
    media: 7,
    situacao: "Aprovado",
  },

  {
    nome: "Bruno Lima",
    idade: 18,
    turma: "DS-01",
    n1: 5,
    n2: 8,
    media: 6.5,
    situacao: "Reprovado",
  },

  {
    nome: "Carla Dias",
    idade: 19,
    turma: "DS-02",
    n1: 10,
    n2: 9,
    media: 9.5,
    situacao: "Aprovado",
  },
];

const form = document.querySelector("#form");
const nome = document.querySelector("#nome");
const idade = document.querySelector("#idade");
const turma = document.querySelector("#turma");
const n1 = document.querySelector("#nota1");
const n2 = document.querySelector("#nota2");
const cad = document.querySelector("#cadastro");
const ex = document.querySelector("#excluir");
const mensagem = document.querySelector("#mensagem");
const listaEstudantes = document.querySelector("tbody");

function mostrarEstudantes() {
  listaEstudantes.innerHTML = "";

  for (let i = 0; i < estudantes.length; i++) {
    const estudante = estudantes[i];
    const linha = document.createElement("tr");

    linha.innerHTML =
      "<td>" +
      estudante.nome +
      "</td>" +
      "<td>" +
      estudante.idade +
      "</td>" +
      "<td>" +
      estudante.turma +
      "</td>" +
      "<td>" +
      estudante.n1 +
      "</td>" +
      "<td>" +
      estudante.n2 +
      "</td>" +
      "<td>" +
      estudante.media.toFixed(1) +
      "</td>" +
      "<td>" +
      estudante.situacao +
      "</td>" +
      "<td>" +
      "<button class='botao-remover' type='button'>" +
      "Remover" +
      "</button>" +
      "</td>";

    if (estudante.situacao === "Aprovado") {
      linha.classList.add("aprovado");
    } else {
      linha.classList.add("reprovado");
    }

    const botaoRemover = linha.querySelector(".botao-remover");

    botaoRemover.addEventListener("click", function () {
      estudantes.splice(i, 1);
      mostrarEstudantes();
    });

    listaEstudantes.appendChild(linha);
  }
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const nVal = nome.value.trim();
  const iVal = Number(idade.value);
  const tVal = turma.value.trim();
  const n1Val = Number(n1.value);
  const n2Val = Number(n2.value);

  if (nVal === "") {
    mensagem.textContent = "Informe o nome completo.";

    nome.focus();

    return;
  }

  if (idade.value === "" || iVal <= 0) {
    mensagem.textContent = "A idade deve ser maior que zero.";

    idade.focus();

    return;
  }

  if (tVal === "") {
    mensagem.textContent = "Informe a turma.";

    turma.focus();

    return;
  }

  if (n1.value === "" || n1Val < 0 || n1Val > 10) {
    mensagem.textContent = "A nota 1 deve estar entre 0 e 10.";

    n1.focus();

    return;
  }

  if (n2.value === "" || n2Val < 0 || n2Val > 10) {
    mensagem.textContent = "A nota 2 deve estar entre 0 e 10.";

    n2.focus();

    return;
  }

  const media = (n1Val + n2Val) / 2;

  let situacao;

  if (media >= 7) {
    situacao = "Aprovado";
  } else {
    situacao = "Reprovado";
  }

  const estudante = {
    nome: nVal,
    idade: iVal,
    turma: tVal,
    n1: n1Val,
    n2: n2Val,
    media: media,
    situacao: situacao,
  };

  estudantes.push(estudante);

  mostrarEstudantes();

  form.reset();

  mensagem.textContent = "Estudante cadastrado com sucesso.";
});

ex.addEventListener("click", function () {
  form.reset();
  mensagem.textContent = "Formulário limpo.";
  nome.focus();
});

mostrarEstudantes();