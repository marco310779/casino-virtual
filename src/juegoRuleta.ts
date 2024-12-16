import * as readline from 'readline';  
import { guardarResultadosEnExcel } from '../src/resultados';  
import { Usuario } from '../src/usuario';  
import {mostrarMenuPrincipal} from '../src/main';

export function iniciarRuleta(usuario: Usuario, guardarResultados: (usuario: Usuario, juego: string, resultado: string) => void) {  
    const rl = readline.createInterface({  
        input: process.stdin,  
        output: process.stdout,  
    });  

    console.log("\nRULETA V/R");  
    console.log("🎡 Imagen de Ruleta giratoria 🎡\n");  

    rl.question('Ingrese el número que desea apostar (0-36): ', (numeroApostado) => {  
        const apuesta = Math.floor(Math.random() * usuario.saldo);  
        if (isNaN(Number(numeroApostado)) || Number(numeroApostado) < 0 || Number(numeroApostado) > 36) {  
            console.log('Número inválido. Regresando al menú principal.');  
            rl.close();  
            return;  
        }  

        usuario.saldo -= apuesta;  
        console.log(`Apostando $${apuesta} al número ${numeroApostado}...`);  

        const numeroGanador = Math.floor(Math.random() * 37);  
        console.log(`🎡 La ruleta ha parado en: ${numeroGanador}`);  

        let premio = 0;  
        if (Number(numeroApostado) === numeroGanador) {  
            premio = apuesta * 36; // Ganar si aciertas el número  
            console.log(`¡Felicidades! Ganaste: $${premio}. Nuevo saldo: $${usuario.saldo + premio}`);  
            usuario.saldo += premio;  
            guardarResultados(usuario, 'Ruleta', `Ganancia: $${premio}`);  
        } else {  
            console.log(`Perdiste. Saldo actual: $${usuario.saldo}`);  
            guardarResultados(usuario, 'Ruleta', 'Pérdida');  
        }  

        rl.question('¿Quieres jugar de nuevo? (s/n): ', (respuesta) => {  
            rl.close();  
            if (respuesta.toLowerCase() === 's') {  
                iniciarRuleta(usuario, guardarResultados);  
            } else {  
                console.log('Regresando al menú principal...');  
                mostrarMenuPrincipal(usuario);  
            }  
        });  
    });  
}
