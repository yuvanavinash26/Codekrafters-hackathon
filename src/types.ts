export enum Domain {
  CyberSecurity = 'Cyber Security',
  Development = 'Development',
  Web3 = 'Web3',
  PR_Management = 'PR & Management',
  CompetitiveProgramming = 'Competitive Programming',
  Content = 'Content',
  Creative = 'Creative'
}

export interface Member {
  id: string;
  name: string;
  domain: Domain;
  joinDate: string;
}

export interface AttendanceRecord {
  date: string; // ISO Date String YYYY-MM-DD
  memberId: string;
  present: boolean;
}

export interface AppState {
  members: Member[];
  attendance: AttendanceRecord[];
}
