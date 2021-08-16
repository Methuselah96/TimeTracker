import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TimeSpan {
    readonly start: number;
    readonly end: number;
}

export interface TimerState {
    readonly timeSpans: readonly TimeSpan[];
}

const initialState: TimerState = {
    timeSpans: [],
};

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
    },
});

export default tasksSlice.reducer;
