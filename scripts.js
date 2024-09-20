let web3;
let addressSpan = document.getElementById('address-span');
let addressList = document.getElementById('address-list');
let enviar = document.getElementById('enviar').addEventListener('click', sendTo);


document.getElementById('connectButton').addEventListener('click', getAddress);



async function getAddress() {
    if (isMMconnected) {
        try {
            window.ethereum.request({ method: 'eth_requestAccounts' })
                .then(accounts => {
                    addressSpan.textContent = accounts[0]; 
                    console.log('Dirección de la cuenta conectada:', accounts[0]);
            
                    for (let c = 0; c < accounts.length; c++) {
            
                        let listElement = document.createElement('li');
                        listElement.textContent = accounts[c];
            
                        addressList.appendChild(listElement);
                    }
                })
                .catch(error => {
                    console.error('Error al solicitar acceso a MetaMask:', error);
                });
        } catch (error) {
            console.error("El usuario rechazó la conexión", error);
        }
    } else {
        console.error("MetaMask no está instalado");
    }
}

async function sendTo(){
    let addressDestination = document.getElementById('address-destination');

    if(isMMconnected && addressDestination.value.trim() !== ""){
        console.log(addressDestination.value);
        window.ethereum.enviar
    }
}

async function isMMconnected(){
    return window.ethereum; // window.ethereum no es solo para MetaMask, sino que es el estándar para proveedores compatibles con Ethereum que siguen el estándar EIP-1193.
}

