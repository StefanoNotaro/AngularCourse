
export class FileItem {
    public archivo: File;
    public nombreArchivo: string;
    public url: string;
    public estaSubiendo: boolean;
    public progreso: number;

    constructor(file: File) {
        this.archivo = file;
        this.nombreArchivo = file.name;
        this.estaSubiendo = false;
        this.progreso = 0;
    }
}
