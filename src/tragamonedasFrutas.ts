import * as readline from 'readline';  
import { guardarResultadosEnExcel } from '../src/resultados';  
import { Usuario } from '../src/usuario';  
import {mostrarMenuPrincipal} from '../src/main';

const frutas = ['🍒', '🍉', '🍊', '🍋', '🍇', '⭐'];  

function girarRodillos(): string[][] {  
    const rodillos: string[][] = [];  
    for (let i = 0; i < 3; i++) {  
        const columna = [];  
        for (let j = 0; j < 3; j++) {  
            const frutaAleatoria = frutas[Math.floor(Math.random() * frutas.length)];  
            columna.push(frutaAleatoria);  
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

export function iniciarTragamonedasFrutas(usuario: Usuario, guardarResultados: (usuario: Usuario, juego: string, resultado: string) => void) {  
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

        usuario.saldo -= apuesta; // Resta la apuesta al saldo del usuario  
        const rodillos = girarRodillos(); // Gira los rodillos  
        console.table(rodillos); // Muestra el resultado de los rodillos en tabla  

        const premio = calcularPremio(rodillos, apuesta); // Calcula el premio  
        if (premio > 0) {  
            usuario.saldo += premio; // Agrega el premio al saldo  
            console.log(`¡Felicidades! Ganaste: $${premio}. Nuevo saldo: $${usuario.saldo}`);  
            guardarResultados(usuario, 'Tragamonedas de Frutas', `Ganancia: $${premio}`);  
        } else {  
            console.log(`No ganaste esta vez. Saldo actual: $${usuario.saldo}`);  
            guardarResultados(usuario, 'Tragamonedas de Frutas', 'Pérdida');  
        }  

        rl.question('¿Quieres jugar de nuevo? (s/n): ', (respuesta) => {  
            rl.close(); // Cierra la interfaz de readline  
            if (respuesta.toLowerCase() === 's') {  
                iniciarTragamonedasFrutas(usuario, guardarResultados); // Reinicia el juego  
            } else {  
                console.log('Regresando al menú principal...');
                return;
                }
        });  
    });  
}


