import * as XLSX from 'xlsx';  
import { Usuario } from './usuario';  

export function guardarResultadosEnExcel(usuario: Usuario, juego: string, resultado: string) {  
    // Nombre del archivo  
    const nombreArchivo = 'resultados.xlsx';  

    // Intenta abrir el archivo existente  
    let libro: XLSX.WorkBook;  
    try {  
        libro = XLSX.readFile(nombreArchivo);  
    } catch (error) {  
        console.log('No se pudo abrir el archivo, se creará uno nuevo.');  
        libro = XLSX.utils.book_new(); // Crear un nuevo libro si no existe  
    }  

    // Obtener la hoja de resultados, si no existe, crearla  
    let hoja: XLSX.WorkSheet;  
    const nombreHoja = 'Resultados';  
    if (libro.SheetNames.includes(nombreHoja)) {  
        hoja = libro.Sheets[nombreHoja];  
    } else {  
        hoja = XLSX.utils.aoa_to_sheet([['Usuario', 'Juego', 'Resultado', 'Fecha']]); // Agregar encabezados  
        XLSX.utils.book_append_sheet(libro, hoja, nombreHoja);  
    }  

    // Obtener el rango actual de la hoja para hallar la última fila  
    const rango = XLSX.utils.decode_range(hoja['!ref']!);  
    const filaNueva = rango.e.r + 1; // Calcula la nueva fila  

    // Agregar el nuevo resultado  
    hoja[`A${filaNueva}`] = { v: usuario.nombre }; // Suponiendo que 'nombre' es una propiedad del usuario  
    hoja[`B${filaNueva}`] = { v: juego };  
    hoja[`C${filaNueva}`] = { v: resultado };  
    hoja[`D${filaNueva}`] = { v: new Date().toLocaleString() }; // Fecha y hora actual  

    // Actualizar el rango de la hoja  
    hoja['!ref'] = XLSX.utils.encode_range(rango);  

    // Guardar el libro  
    XLSX.writeFile(libro, nombreArchivo);  
    console.log('Resultados guardados en el archivo Excel.');  
}