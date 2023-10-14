// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

contract FeiraTecnologica { // Nome do meu smart contract

////////////////////////////////////////////////////////////
//// Declaração das variáveis de meu smart contract ////////
    struct Aluno{
        string matricula;
        string nome;
    }

    mapping(uint256 => Aluno) alunos;
    address[] enderecosAlunos;
////////////////////////////////////////////////////////////

////// Declaração das funções de meu smart contract ////////

    function adicionarAluno                               // Nome da minha função
            (string memory matricula, string memory nome) // Parâmetros da minha função
            public                                        // Tipo de visibilidade
            returns (bool){                               // Tipo de retorno da função 

        if (alunoJaExiste(msg.sender)) return false;

        alunos[enderecosAlunos.length] = Aluno(matricula, nome);
        enderecosAlunos.push(msg.sender);
        return true;
    }

    function atualizarAluno (string memory matricula, string memory nome) public returns (bool) {
        
        if (!alunoJaExiste(msg.sender)) return false;

        for (uint i=0; i < enderecosAlunos.length; i++) {
            if (enderecosAlunos[i] == msg.sender) {
                alunos[i] = Aluno(matricula, nome);
                return true;
            }
        }
        return false;
    }

    function alunoJaExiste           // Nome da minha função
            (address enderecoAluno)  // Parâmetro da minha função
            private                  // Tipo de visibilidade
            view                     // Atributo indicando que não altera estado do contrato
            returns (bool) {         // Tipo de retorno da função
        
        for (uint i = 0; i < enderecosAlunos.length; i++)
            if(enderecosAlunos[i] == enderecoAluno)
                return true;

        return false;
    }


    // A utilização da palavra reservada "memory" indica que a operação armazenará,
    // temporariamente, um valor na memória da máquina virtual ethereum

    function buscarTodosAlunos() public view returns (Aluno[] memory) {

        Aluno[] memory resultado = new Aluno[](enderecosAlunos.length);

        for(uint i=0; i < enderecosAlunos.length; i++ ) {
            resultado[i] = alunos[i];
        }

        return resultado;
    }

    function buscarAlunoPorEndereco(address endereco) public view returns (Aluno memory aluno) {

        for (uint i=0; i < enderecosAlunos.length; i++) {
            if(enderecosAlunos[i] == endereco) {
                return alunos[i];
            }
        }
    }

    function buscarAlunoPorMatricula (string memory matricula) public view returns (Aluno memory aluno) {
        
        for (uint i=0; i < enderecosAlunos.length; i++) {

            // Para comparacao de strings é utilizada uma função especial que compara os hashs das strings

            if ( bytes(alunos[i].matricula).length == bytes(matricula).length && 
                keccak256(abi.encodePacked(alunos[i].matricula)) == keccak256(abi.encodePacked(matricula)) ) {
                return alunos[i];
            }
        }
    }
}
