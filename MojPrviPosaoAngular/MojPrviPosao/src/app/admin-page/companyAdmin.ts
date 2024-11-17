export interface CompanyAdmin {
    id: number;
    name: string;
    description: string;
    place: string;
    number: string;  // Pretpostavljam da je broj telefona String, u skladu sa backendom
    email: string;
    creationDate: Date;
    korisnikId: number
  }