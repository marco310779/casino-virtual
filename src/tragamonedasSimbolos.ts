import * as readline from 'readline';  
import { guardarResultadosEnExcel } from '../src/resultados';  
import { Usuario } from '../src/usuario';
import {mostrarMenuPrincipal} from '../src/main';

const simbolos = ['🔔', '🍀', '🎰', '💎', '⚡'];  

function girarRodillos(): string[][] {  
    const rodillos = [];  
    for (let i = 0; i < 3; i++) {  
        const columna = [];  
        for (let j = 0; j < 3; j++) {  
            const simboloAleatorio = simbolos[Math.floor(Math.random() * simbolos.length)];  
            columna.push(simboloAleatorio);  
        }  
        rodillos.push(columna);  
    }  
    return rodillos;  
}  

function calcularPremio(rodillos: string[][], apuesta: number): number {  
    let premio = 0;  

    // Comprobamos líneas horizontales  
    for (let i = 0; i < 3; i++) {  
        if (rodillos[i][0] === rodillos[i][1] && rodillos[i][1] === rodillos[i][2]) {  
            premio += apuesta * 2; // Premio por línea  
        }  
    }  

    // Comprobamos líneas diagonales  
    if (rodillos[0][0] === rodillos[1][1] && rodillos[1][1] === rodillos[2][2]) {   
        premio += apuesta * 3; // Diagonal de izquierda a derecha   
    }   

    if (rodillos[0][2] === rodillos[1][1] && rodillos[1][1] === rodillos[2][0]) {  
        premio += apuesta * 3; // Diagonal de derecha a izquierda  
    }   

    return premio;   
}  

export function iniciarTragamonedasSimbolos(usuario: Usuario, guardarResultados: (usuario: Usuario, juego: string, resultado: string) => void) {  
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
        const rodillos = girarRodillos();  
        console.table(rodillos);  

        const premio = calcularPremio(rodillos, apuesta);  
        if (premio > 0) {  
            usuario.saldo += premio;  
            console.log(`¡Felicidades! Ganaste: $${premio}. Nuevo saldo: $${usuario.saldo}`);  
            guardarResultados(usuario, 'Tragamonedas de Símbolos', `Ganancia: $${premio}`);  
        } else {  
            console.log(`No ganaste esta vez. Saldo actual: $${usuario.saldo}`);  
            guardarResultados(usuario, 'Tragamonedas de Símbolos', 'Pérdida');  
        }  

        rl.question('¿Quieres jugar de nuevo? (s/n): ', (respuesta) => {  
            rl.close(); // Cerramos la interfaz de readline  
            if (respuesta.toLowerCase() === 's') {  
                iniciarTragamonedasSimbolos(usuario, guardarResultados); // Reinicia el juego  
            } else {  
                console.log('Regresando al menú principal.'); // Mensaje al regresar  
                mostrarMenuPrincipal(usuario); // Llama al menú principal  
            }  
        });  
    });  
}  
   