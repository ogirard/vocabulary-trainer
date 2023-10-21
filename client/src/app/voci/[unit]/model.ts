export interface UnitData {
  id: number;
  name: string;
  translations: Translation[];
}

export interface Translation {
  id: number;
  german: string;
  english: string;
}
