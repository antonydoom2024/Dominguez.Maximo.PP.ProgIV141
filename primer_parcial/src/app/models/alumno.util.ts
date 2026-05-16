import { Alumno } from "./alumno.model";

export class AlumnoUtil{
    
    static getFullName (alumno: Alumno): string {
        return `${alumno.name}`;
    }

    static formatDate (date: Date): string {
        return date.toLocaleDateString('es-AR', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    }

}
