export interface Application {
    id: number;
    ime: string;
    prezime: string;
    email: string;
    creationDate: Date;
    number: string;
    address: string;
    srednjaSkola: string;
    fakultet: string;
    korisnikId: number;
    jobId: number;
    jobName: string;     // Dodaj polje za naziv posla
    companyId: number;
    companyName: string;  // Dodaj polje za ime kompanije
    pdfContent: string;
  }
  