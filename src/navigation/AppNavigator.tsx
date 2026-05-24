import React, { useState } from 'react';
import SplashScreen from '../screens/onboarding/SplashScreen';
import OnboardingScreen from '../screens/onboarding/OnboardingScreen';
import GenderScreen from '../screens/onboarding/GenderScreen';
import AgeScreen from '../screens/onboarding/AgeScreen';
import StyleScreen from '../screens/onboarding/StyleScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import SignUpScreen from '../screens/auth/SignUpScreen';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen';
import OTPScreen from '../screens/auth/OTPScreen';

type Screen =
  | 'splash'
  | 'onboarding'
  | 'gender'
  | 'age'
  | 'style'
  | 'login'
  | 'signup'
  | 'forgot'
  | 'otp';

export default function AppNavigator() {
  const [screen, setScreen] = useState<Screen>('splash');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [signupEmail, setSignupEmail] = useState('');

  switch (screen) {
    case 'splash':
      return <SplashScreen onFinish={() => setScreen('onboarding')} />;

    case 'onboarding':
      return <OnboardingScreen onNext={() => setScreen('gender')} />;

    case 'gender':
      return (
        <GenderScreen
          onNext={g => { setGender(g); setScreen('age'); }}
          onBack={() => setScreen('onboarding')}
        />
      );

    case 'age':
      return (
        <AgeScreen
          onNext={() => setScreen('style')}
          onBack={() => setScreen('gender')}
        />
      );

    case 'style':
      return (
        <StyleScreen
          onGetStarted={() => setScreen('login')}
          onBack={() => setScreen('age')}
        />
      );

    case 'login':
      return (
        <LoginScreen
          onLogin={() => console.log('logged in')}
          onForgotPassword={() => setScreen('forgot')}
          onSignUp={() => setScreen('signup')}
        />
      );

    case 'signup':
      return (
        <SignUpScreen
          onRegister={data => { setSignupEmail(data.email); setScreen('otp'); }}
          onLogin={() => setScreen('login')}
        />
      );

    case 'forgot':
      return (
        <ForgotPasswordScreen
          onBack={() => setScreen('login')}
          onSent={() => setScreen('login')}
        />
      );

    case 'otp':
      return (
        <OTPScreen
          email={signupEmail}
          onVerified={() => setScreen('login')}
          onBack={() => setScreen('signup')}
        />
      );

    default:
      return <SplashScreen onFinish={() => setScreen('onboarding')} />;
  }
}
