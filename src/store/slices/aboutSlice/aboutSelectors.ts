import { RootState } from "../../store";

export const currentParametrsSelect = (state: RootState) => state.about.currentParametrs;
export const isOpenSelect = (state: RootState) => state.about.isOpen;
export const messageSelect = (state: RootState) => state.about.messages;