import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface OnboardingState {
  gender: 'male' | 'female' | null;
  age: number | null;
  styles: string[];
  completed: boolean;
}

const initialState: OnboardingState = {
  gender: null,
  age: null,
  styles: [],
  completed: false,
};

const onboardingSlice = createSlice({
  name: 'onboarding',
  initialState,
  reducers: {
    setGender(state, action: PayloadAction<'male' | 'female'>) {
      state.gender = action.payload;
    },
    setAge(state, action: PayloadAction<number>) {
      state.age = action.payload;
    },
    setStyles(state, action: PayloadAction<string[]>) {
      state.styles = action.payload;
    },
    completeOnboarding(state) {
      state.completed = true;
    },
  },
});

export const { setGender, setAge, setStyles, completeOnboarding } = onboardingSlice.actions;
export default onboardingSlice.reducer;
