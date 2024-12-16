import * as readline from 'readline';  
import { guardarResultadosEnExcel } from '../src/resultados';  
import { Usuario } from '../src/usuario';  
import {mostrarMenuPrincipal} from '../src/main';

function mostrarDados(dado1: number, dado2: number): void {  
    console.log(`\n🎲 Dado 1: ${dado1}  🎲 Dado 2: ${dado2}`);  
}  

export function iniciarJuegoDados(usuario: Usuario, guardarResultados: (usuario: Usuario, juego: string, resultado: string) => void) {  
    const rl = readline.createInterface({  
        input: process.stdin,  
        output: process.stdout,  
    });  

    rl.question('Ingrese su apuesta: ', (respuesta) => {  
        const apuesta = parseFloat(respuesta);  
        if (isNaN(apuesta) || apuesta <= 0 || apuesta > usuario.saldo) {  
            console.log('Apuesta inválida. Regresando al menú principal.');  
            rl.close();  
            return;  
        }  

        usuario.saldo -= apuesta;  
        console.log('Dados girando...');  
        const dado1 = Math.floor(Math.random() * 6) + 1;  
        const dado2 = Math.floor(Math.random() * 6) + 1;  
        mostrarDados(dado1, dado2);  

        const resultado = dado1 + dado2;  
        console.log(`Resultado Total: ${resultado}`);  

        let premio = 0; // Definir la variable premio aquí  
        if (resultado === 7) {  
            premio = apuesta * 2; // Ganar el doble de la apuesta si se obtiene un 7  
            usuario.saldo += premio; // Agregar el premio al saldo  
            console.log(`¡Felicidades! Ganaste: $${premio}. Nuevo saldo: $${usuario.saldo}`);  
            guardarResultados(usuario, 'Juego de Dados', `Ganancia: $${premio}`);  
        } else {  
            console.log('Lo siento, no ganaste esta ronda.');  
            guardarResultados(usuario, 'Juego de Dados', 'Pérdida');  
        }  

        rl.question('¿Quieres jugar de nuevo? (s/n): ', (respuesta) => {  
            rl.close();  
            if (respuesta.toLowerCase() === 's') {  
                iniciarJuegoDados(usuario, guardarResultados);  
            } else {  
                console.log('Regresando al menú principal...');  
                mostrarMenuPrincipal(usuario);
            }  
        });  
    });  
}

