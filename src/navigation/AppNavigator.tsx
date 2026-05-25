import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootState } from '../store';
import { setGender, setAge, setStyles } from '../store/onboardingSlice';
import { setCredentials } from '../store/authSlice';
import SplashScreen from '../screens/onboarding/SplashScreen';
import GenderScreen from '../screens/onboarding/GenderScreen';
import AgeScreen from '../screens/onboarding/AgeScreen';
import StyleScreen from '../screens/onboarding/StyleScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import SignUpScreen from '../screens/auth/SignUpScreen';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen';
import ResetPasswordScreen from '../screens/auth/ResetPasswordScreen';
import SetNewPasswordScreen from '../screens/auth/SetNewPasswordScreen';
import OTPScreen from '../screens/auth/OTPScreen';
import MainNavigator from './MainNavigator';

type Screen =
  | 'splash'
  | 'login'
  | 'signup'
  | 'forgot'
  | 'reset-password'
  | 'set-password'
  | 'otp'
  | 'gender'
  | 'age'
  | 'style'
  | 'home';

export default function AppNavigator() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const [screen, setScreen] = useState<Screen>('splash');
  const [signupEmail, setSignupEmail] = useState('');
  const [forgotEmail, setForgotEmail] = useState('');
  const [resetToken, setResetToken] = useState('');
  const [selectedGender, setSelectedGender] = useState<'male' | 'female'>('male');

  const handleSplashFinish = async () => {
    const token = await AsyncStorage.getItem('accessToken');
    setScreen(token ? 'home' : 'login');
  };

  useEffect(() => {
    if (isAuthenticated) {
      setScreen('home');
    } else if (screen === 'home') {
      setScreen('login');
    }
  }, [isAuthenticated]);

  switch (screen) {
    case 'splash':
      return <SplashScreen onFinish={handleSplashFinish} />;

    case 'login':
      return (
        <LoginScreen
          onLogin={data => {
            dispatch(setCredentials(data));
            setScreen('home');
          }}
          onForgotPassword={() => setScreen('forgot')}
          onSignUp={() => setScreen('signup')}
        />
      );

    case 'signup':
      return (
        <SignUpScreen
          onRegister={email => {
            setSignupEmail(email);
            setScreen('otp');
          }}
          onLogin={() => setScreen('login')}
        />
      );

    case 'forgot':
      return (
        <ForgotPasswordScreen
          onBack={() => setScreen('login')}
          onSent={email => {
            setForgotEmail(email);
            setScreen('reset-password');
          }}
        />
      );

    case 'reset-password':
      return (
        <ResetPasswordScreen
          email={forgotEmail}
          onVerified={token => {
            setResetToken(token);
            setScreen('set-password');
          }}
          onBack={() => setScreen('forgot')}
        />
      );

    case 'set-password':
      return (
        <SetNewPasswordScreen
          resetToken={resetToken}
          onReset={() => setScreen('login')}
          onBack={() => setScreen('reset-password')}
        />
      );

    case 'otp':
      return (
        <OTPScreen
          email={signupEmail}
          onVerified={() => setScreen('gender')}
          onBack={() => setScreen('signup')}
        />
      );

    case 'gender':
      return (
        <GenderScreen
          onNext={g => {
            dispatch(setGender(g));
            setSelectedGender(g);
            setScreen('age');
          }}
          onBack={() => setScreen('otp')}
        />
      );

    case 'age':
      return (
        <AgeScreen
          onNext={age => {
            dispatch(setAge(age));
            setScreen('style');
          }}
          onBack={() => setScreen('gender')}
        />
      );

    case 'style':
      return (
        <StyleScreen
          gender={selectedGender}
          onGetStarted={styles => {
            dispatch(setStyles(styles));
            setScreen('home');
          }}
          onBack={() => setScreen('age')}
        />
      );

    case 'home':
      return <MainNavigator onLogout={() => setScreen('login')} />;

    default:
      return <SplashScreen onFinish={handleSplashFinish} />;
  }
}
