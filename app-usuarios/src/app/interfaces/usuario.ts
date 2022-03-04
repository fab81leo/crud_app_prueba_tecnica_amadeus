export interface Usuario {
    uid: number,
    usuario: string;
    nombre: string;
    apellido: string;
    edad: number,
    sexo: string; 
    descripcion: string;
    esadministrador: boolean;
    nacionalidad: string;
    fechanacimiento: string;
    aficiones: string[];
    // fecharegistro? : string;
    // fechamodificacion? : string;
}

// export interface Usuario {
//     userId: number,
//     userName: string;
//     firstName: string;
//     lastName: string;
//     age: number,
//     sex: string; 
//     description: string;
//     isAdministrator: boolean;
//     nationality: string;
//     birthDate: string;
//     interest: string[];
// }

export interface Sexo {
    tipo: string;
    nombre: string;
}