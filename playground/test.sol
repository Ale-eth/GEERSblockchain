// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleWallet {
    address public owner;
    
    // Evento para registro de depósitos
    event Deposit(address indexed sender, uint amount);
    
    // Evento para registro de retiros
    event Withdraw(address indexed receiver, uint amount);

    constructor() {
        // Establecer la cuenta que despliega el contrato como el propietario
        owner = msg.sender;
    }

        // Función para recibir depósitos (payable permite enviar ether al contrato)
        function deposit() public payable {
            require(msg.value > 0, "Debe enviar algún ether");
            emit Deposit(msg.sender, msg.value);
        }

        // Función para retirar fondos solo por el propietario
        function withdraw(uint _amount) public {
            require(msg.sender == owner, "Solo el propietario puede retirar");
            require(address(this).balance >= _amount, "Fondos insuficientes");
            
            payable(msg.sender).transfer(_amount);
            emit Withdraw(msg.sender, _amount);
        }

        // Obtener el saldo actual del contrato
        function getBalance() public view returns (uint) {
            return address(this).balance;
        }
}
