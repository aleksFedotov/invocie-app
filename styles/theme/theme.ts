import { DefaultTheme } from 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    mainBg: string;
    secondbg: string;
    mainText: string;
    secondTExt: string;
    tertiaryText: string;
    quaternaryText: string;
    editBtn: string;
    editBtnHover: string;
    statusDraft: string;
    statusDraftText: string;
    tableFooter: string;
    billEditor: string;
    addBtn: string;
    addBtnHover: string;
    saveBtn: string;
    saveBtnHover: string;
    saveBtnText: string;
    checkBoxBg: string;
    boxShadow: string;
    totalText: string;
    deleteText: string;
  }
}

export const lightTheme: DefaultTheme = {
  mainBg: '#F8F8FB',
  secondbg: '#FFFFFF',
  mainText: '#0C0E16',
  secondTExt: '#7E88C3',
  tertiaryText: '#888EB0',
  quaternaryText: '#7E88C3',
  editBtn: '#FEF9F9',
  editBtnHover: '#DFE3FA',
  statusDraft: 'rgba(55, 59, 83,0.05)',
  statusDraftText: '#373B53',
  tableFooter: '#373B53',
  billEditor: '#ffffff',
  addBtn: '#F9FAFE',
  addBtnHover: '#DFE3FA',
  saveBtn: '#373B53',
  saveBtnHover: '#0C0E16',
  saveBtnText: '#888EB0',
  checkBoxBg: '#DFE3FA',
  boxShadow: 'rgba(72, 84, 159, 0.25)',
  totalText: '#7E88C3',
  deleteText: '#888EB0',
};

export const darkTheme: DefaultTheme = {
  mainBg: '#141625',
  secondbg: '#1E2139',
  mainText: '#FFFFFF',
  secondTExt: '#FFFFFF',
  tertiaryText: '#DFE3FA',
  quaternaryText: '#DFE3FA',
  editBtn: '#252945',
  editBtnHover: '#FFFFFF',
  statusDraft: 'rgba(223, 227, 250,0.05)',
  statusDraftText: '#FFFFFF',
  tableFooter: '#0C0E16',
  billEditor: '#141625',
  addBtn: '#252945',
  addBtnHover: '#DFE3FA',
  saveBtn: '#373B53',
  saveBtnHover: '#1E2139',
  saveBtnText: '#DFE3FA',
  checkBoxBg: '#1E2139',
  boxShadow: 'rgba(0, 0, 0, 0.25)',
  totalText: '#888EB0',
  deleteText: '#DFE3FA',
};
