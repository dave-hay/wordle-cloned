export interface KeyLetter {
  letter: string;
  color: string;
}

export interface KeyLetterState {
  value: KeyLetter[];
}

export interface NewKeyColor {
  index: number;
  newColor: string;
}