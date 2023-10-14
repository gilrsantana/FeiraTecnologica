export const contratoAddress = "0x7eF42FFd472684f7aBDC239edd68f74D121D1990";

export const contratoAbi = [
  {
    inputs: [
      { internalType: "string", name: "matricula", type: "string" },
      { internalType: "string", name: "nome", type: "string" },
    ],
    name: "adicionarAluno",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "string", name: "matricula", type: "string" },
      { internalType: "string", name: "nome", type: "string" },
    ],
    name: "atualizarAluno",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "endereco", type: "address" }],
    name: "buscarAlunoPorEndereco",
    outputs: [
      {
        components: [
          { internalType: "string", name: "matricula", type: "string" },
          { internalType: "string", name: "nome", type: "string" },
        ],
        internalType: "struct FeiraTecnologica.Aluno",
        name: "aluno",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "string", name: "matricula", type: "string" }],
    name: "buscarAlunoPorMatricula",
    outputs: [
      {
        components: [
          { internalType: "string", name: "matricula", type: "string" },
          { internalType: "string", name: "nome", type: "string" },
        ],
        internalType: "struct FeiraTecnologica.Aluno",
        name: "aluno",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "buscarTodosAlunos",
    outputs: [
      {
        components: [
          { internalType: "string", name: "matricula", type: "string" },
          { internalType: "string", name: "nome", type: "string" },
        ],
        internalType: "struct FeiraTecnologica.Aluno[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

