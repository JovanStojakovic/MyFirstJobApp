export interface myProfileDTO{
    id: number,
    username: string,
    password:string,
    email:string,
    name:string,
    surname:string,
    phone:string,
    birthDate: Date
    registrationDate?: string;
    suspended: boolean; // Ako ne želite da obavezno uključujete ovo polje

    
}