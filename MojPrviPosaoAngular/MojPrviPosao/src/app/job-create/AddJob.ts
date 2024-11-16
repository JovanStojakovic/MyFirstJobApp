export interface AddJob {
    name: string;
    plata: number;
    opisPosla: string;
    jobType: string; // JobType je string jer ga šaljemo kao vrednost enumeracije
    activeDate: Date;
  }
  