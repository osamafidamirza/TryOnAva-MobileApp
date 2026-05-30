import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootState } from '../store';
import { setGender, setAge, setStyle } from '../store/onboardingSlice';
import { setCredentials, updateUser } from '../store/authSlice';
import { userApi } from '../api/user';
import { authApi } from '../api/auth';
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
  const [signupPassword, setSignupPassword] = useState('');
  const [forgotEmail, setForgotEmail] = useState('');
  const [resetToken, setResetToken] = useState('');
  const [selectedGender, setSelectedGender] = useState<'male' | 'female'>('male');
  const [selectedAge, setSelectedAge] = useState<number | null>(null);

  // Stores tokens during onboarding so we don't dispatch setCredentials early
  const pendingAuth = useRef<{ user: any; tokens: any } | null>(null);

  const handleSplashFinish = async () => {
    const token = await AsyncStorage.getItem('accessToken');
    if (token) {
      const userJson = await AsyncStorage.getItem('user');
      if (userJson) {
        const user = JSON.parse(userJson);
        const tokens = {
          access: { token },
          refresh: { token: (await AsyncStorage.getItem('refreshToken')) ?? '' },
        };
        dispatch(setCredentials({ user, tokens }));
      }
      setScreen('home');
    } else {
      setScreen('login');
    }
  };

  // Only redirect to home/login from auth screens — not during onboarding
  useEffect(() => {
    const onboardingScreens: Screen[] = ['gender', 'age', 'style'];
    if (isAuthenticated && !onboardingScreens.includes(screen)) {
      setScreen('home');
    } else if (!isAuthenticated && screen === 'home') {
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
          onRegister={(email, password) => {
            setSignupEmail(email);
            setSignupPassword(password);
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
          onVerified={async () => {
            try {
              const res = await authApi.login({ email: signupEmail, password: signupPassword });
              const { user, tokens } = res.data;
              // Save tokens so axios interceptor has them — but DON'T dispatch
              // setCredentials yet, or isAuthenticated=true triggers useEffect → home
              await AsyncStorage.setItem('accessToken', tokens.access.token);
              await AsyncStorage.setItem('refreshToken', tokens.refresh.token);
              await AsyncStorage.setItem('user', JSON.stringify(user));
              pendingAuth.current = { user, tokens };
            } catch {}
            setScreen('gender');
          }}
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
            setSelectedAge(age);
            setScreen('style');
          }}
          onBack={() => setScreen('gender')}
        />
      );

    case 'style':
      return (
        <StyleScreen
          gender={selectedGender}
          onGetStarted={async style => {
            dispatch(setStyle(style));
            try {
              const res = await userApi.updateMe({
                gender: selectedGender,
                age: selectedAge ?? undefined,
                style: style as 'street' | 'sports' | 'casual' | 'formal',
              });
              const updatedUser = res.data;
              await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
              // Now safe to authenticate — onboarding is complete
              const auth = pendingAuth.current;
              if (auth) {
                dispatch(setCredentials({ user: updatedUser, tokens: auth.tokens }));
              }
            } catch {
              // Even if updateMe fails, still authenticate and go home
              if (pendingAuth.current) {
                dispatch(setCredentials(pendingAuth.current));
              }
            }
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
