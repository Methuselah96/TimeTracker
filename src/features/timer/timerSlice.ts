import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Task {
    readonly description: string;
    readonly estimate: number;
}

export interface TasksState {
    readonly tasks: readonly Task[];
}

const initialState: TasksState = {
    tasks: [],
};

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        add: (state, action: PayloadAction<Task>) => {
            state.tasks.push(action.payload);
        },
    },
});

export const { add } = tasksSlice.actions;

export default tasksSlice.reducer;
