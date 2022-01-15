export interface Memo {
  id: string;
  title: string;
  done: boolean;
  isList: boolean;
  parent: string | null;
}
