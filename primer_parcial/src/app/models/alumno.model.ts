export interface Alumno {
    id: number,
    login: string,
    name: string,
    avatar_url?: string,
    isActive: boolean,
    created_at: Date
}
