

function cifrarAtbash(mensagem) {
  let resultado = '';

  for (let i = 0; i < mensagem.length; i++) {
    let char = mensagem[i];
    let codigo = mensagem.charCodeAt(i);

    
    if (codigo >= 65 && codigo <= 90) {
      
      let novoCodigo = 90 - (codigo - 65);
      resultado += String.fromCharCode(novoCodigo);
    }
    
    else if (codigo >= 97 && codigo <= 122) {
      
      let novoCodigo = 122 - (codigo - 97);
      resultado += String.fromCharCode(novoCodigo);
    }
    
    else {
      resultado += char;
    }
  }

  return resultado;
}


console.log(cifrarAtbash("OlaMundo")); 


function cifrarCesar(mensagem, chave) {
    let resultado = "";
    const deslocamento = ((chave % 26) + 26) % 26; 

    for (let i = 0; i < mensagem.length; i++) {
        let char = mensagem[i];

        
        if (char >= 'A' && char <= 'Z') {
            let codigo = ((char.charCodeAt(0) - 65 + deslocamento) % 26) + 65;
            resultado += String.fromCharCode(codigo);
        }
      
        else if (char >= 'a' && char <= 'z') {
            let codigo = ((char.charCodeAt(0) - 97 + deslocamento) % 26) + 97;
            resultado += String.fromCharCode(codigo);
        }
        
        else {
            resultado += char;
        }
    }

    return resultado;
}


console.log(cifrarCesar("criptografia", 3)); // Esperado: "fulswrjudiia"
console.log(cifrarCesar("fulswrjudiia", -3)); // Esperado: "criptografia"


function cifrarVigenere(mensagem, palavraChave, modo = 'codificar') {
    let resultado = "";
    const chave = palavraChave.toLowerCase();
    let indiceChave = 0;

    for (let i = 0; i < mensagem.length; i++) {
        let char = mensagem[i];
        let deslocamento;

        
        if ((char >= 'A' && char <= 'Z') || (char >= 'a' && char <= 'z')) {

            
            deslocamento = chave.charCodeAt(indiceChave % chave.length) - 97;

            
            if (modo === 'decodificar') {
                deslocamento = -deslocamento;
            }

            
            if (char >= 'A' && char <= 'Z') {
                let codigo = ((char.charCodeAt(0) - 65 + deslocamento + 26) % 26) + 65;
                resultado += String.fromCharCode(codigo);
            } else {
                let codigo = ((char.charCodeAt(0) - 97 + deslocamento + 26) % 26) + 97;
                resultado += String.fromCharCode(codigo);
            }

            
            indiceChave++;
        } else {
            
            resultado += char;
        }
    }

    return resultado;
}

const chaveV = "CHAVE";
const codificadoV = cifrarVigenere("Enigma!", chaveV, 'codificar'); 
console.log(codificadoV); // Ex: "Gñlgnx!"
console.log(cifrarVigenere(codificadoV, chaveV, 'decodificar'));


function gerarChavesRSA_Didaticas(p, q) {
    if (p <= 1 || q <= 1) return null; 
    
    const N = p * q;
    const phi_N = (p - 1) * (q - 1);
    
    let E = 3;
    while (E < phi_N) {
        // Encontrar o primeiro E que é coprimo de phi_N
        if ((phi_N % E !== 0) && ((p - 1) % E !== 0) && ((q - 1) % E !== 0)) {
             // Otimização: A verificação (p-1)%E e (q-1)%E não é rigorosamente a do RSA, 
             // mas é didática e evita fatores óbvios para primos pequenos.
            break;
        }
        E++;
    }

    let D = 1;
    while (D < phi_N) {
        // Encontrar D tal que (D * E) % phi_N === 1
        if ((D * E) % phi_N === 1) {
            break;
        }
        D++;
    }
    
    return {
        publica: { E, N }, // Use E e N para CIFRAR
        privada: { D, N }  // Use D e N para DECIFRAR
    };
}

let chaves = gerarChavesRSA_Didaticas(13,17) 
console.log(chaves);

// 1. Cifrar com a Chave Pública
const cifrado = cifrarRSA_Didatico(textoOriginal, CHAVES.publica.E, CHAVES.publica.N);
console.log("RSA Cifrado:", cifrado); // Array de números

// 2. Decifrar com a Chave Privada
const decifrado = decifrarRSA_Didatico(cifrado, CHAVES.privada.D, CHAVES.privada.N);
console.log("RSA Decifrado:", decifrado); // Esperado: "OLA"






