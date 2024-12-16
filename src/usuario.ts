export interface Usuario {
    nombre: any;  
    codigo: string;  
    saldo: number;  
}  

// Crear un código de usuario aleatorio  
export function crearCodigoUsuario(): string {  
    return Math.floor(100000 + Math.random() * 900000).toString(); // Código de 6 dígitos  
}