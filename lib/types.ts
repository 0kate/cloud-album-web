export interface Memo {
  id: string;
  title: string;
  done: boolean;
  isList: boolean;
  parent: string | null;
}

export interface Anniversary {
  id: string;
  title: string;
  date: string;
  type: string;
}
