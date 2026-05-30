import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface OnboardingState {
  gender: 'male' | 'female' | null;
  age: number | null;
  style: string | null;
  completed: boolean;
}

const initialState: OnboardingState = {
  gender: null,
  age: null,
  style: null,
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
    setStyle(state, action: PayloadAction<string>) {
      state.style = action.payload;
    },
    completeOnboarding(state) {
      state.completed = true;
    },
  },
});

export const { setGender, setAge, setStyle, completeOnboarding } = onboardingSlice.actions;
export default onboardingSlice.reducer;
