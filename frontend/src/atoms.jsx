import { atom } from 'recoil';

// atom for idea submission
export const ideaAtom = atom({
    key: 'ideaSubmissionAtom',
    default: "",
});

// atom for react app tree structure
export const treeAtom = atom({
    key: 'treeAtom',
    default: {},
});

