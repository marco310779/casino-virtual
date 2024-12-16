import * as readline from 'readline';  
import { crearCodigoUsuario, Usuario } from '../src/usuario';  
import { iniciarTragamonedasFrutas } from '../src/tragamonedasFrutas';  
import { iniciarTragamonedasSimbolos } from '../src/tragamonedasSimbolos';  
import { iniciarJuegoDados } from '../src/juegoDados';  
import { iniciarRuleta } from '../src/juegoRuleta';  
import { guardarResultadosEnExcel } from '../src/resultados';  


const rl = readline.createInterface({  
    input: process.stdin,  
    output: process.stdout,  
});  

let usuarios: Usuario[] = [];  

// Menú principal del casino  
export function mostrarMenuPrincipal(usuario: Usuario): void {  
    console.log(`\nBienvenido al Casino Virtual!`);  
    console.log(`Código de Usuario: ${usuario.codigo}`);  
    console.log(`Saldo Disponible: $${usuario.saldo}\n`);  
    console.log('Seleccione un juego:');  
    console.table([  
        { 'Número': 1, 'Juego': 'Tragamonedas de Frutas' },  
        { 'Número': 2, 'Juego': 'Tragamonedas de Símbolos' },  
        { 'Número': 3, 'Juego': 'Juego de Dados' },  
        { 'Número': 4, 'Juego': 'Ruleta' },  
        { 'Número': 5, 'Juego': 'Salir' }  
    ]);  

    rl.question('Ingrese el número del juego que desea jugar: ', (respuesta) => {  
        switch (respuesta) {  
            case '1':  
                iniciarTragamonedasFrutas(usuario, guardarResultadosEnExcel);  
                break;  
            case '2':  
                iniciarTragamonedasSimbolos(usuario, guardarResultadosEnExcel);  
                break;  
            case '3':  
                iniciarJuegoDados(usuario, guardarResultadosEnExcel);  
                break;  
            case '4':  
                iniciarRuleta(usuario, guardarResultadosEnExcel);  
                break;  
            case '5':  
                console.log('¡Gracias por jugar! Hasta luego.');  
                rl.close();  
                return;  
            default:  
                console.log('Opción inválida. Inténtalo de nuevo.');  
                mostrarMenuPrincipal(usuario);  
                break;  
        }  
    });  
}  

// Crear nuevo usuario  
function crearUsuario(): void {  
    rl.question('Ingrese el saldo inicial: ', (respuesta) => {  
        const saldoInicial = parseFloat(respuesta);  
        if (isNaN(saldoInicial) || saldoInicial <= 0) {  
            console.log('Saldo inválido. Inténtalo de nuevo.');  
            crearUsuario();  
        } else {  
            const codigo = crearCodigoUsuario();  
            const nuevoUsuario: Usuario = {
                codigo, saldo: saldoInicial,
                nombre: undefined
            };  
            usuarios.push(nuevoUsuario);  
            console.log(`Usuario creado con éxito. Tu código es: ${codigo}`);  
            mostrarMenuPrincipal(nuevoUsuario);  
        }  
    });  
}  

// Iniciar el programa  
crearUsuario();