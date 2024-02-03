export interface aboutTypes {
    isOpen: boolean;
    currentParametrs: null | currentParametrsTypes;
    messages: aboutParametrsTypes[];
  }
  

  
  export type aboutParametrsTypes = {
    id: number;
    boardId: number;
    itemId: number;
    messages: Array<messageTypes>;
  };

  export type messageTypes = {
    id: number;
    text: string;
    date:string;
  };

  export type currentParametrsTypes = {
    itemId:number;
    boardId:number;
    id:number;
  }