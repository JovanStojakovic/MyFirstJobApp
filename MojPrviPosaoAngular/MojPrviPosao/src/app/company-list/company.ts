export interface Company {
    id: number;
    name: string;
    description: string;
    place: string;
    number: string;  // Pretpostavljam da je broj telefona String, u skladu sa backendom
    email: string;
    creationDate: Date;
    user: {
      id: number;  // Ovde dolazi korisnikov ID iz entiteta User
      username: string;  // Možeš dodati druge podatke o korisniku ako su potrebni
    };
  }