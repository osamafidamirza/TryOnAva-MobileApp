import client from './client';

export const authApi = {
  register: (data: { name: string; email: string; password: string; role?: string }) =>
    client.post('/auth/register', data),

  verifyOtp: (data: { email: string; code: string }) =>
    client.post('/auth/verify-otp', data),

  login: (data: { email: string; password: string }) =>
    client.post('/auth/login', data),

  logout: (data: { refreshToken: string }) =>
    client.post('/auth/logout', data),

  forgotPassword: (email: string) =>
    client.post('/auth/forgot-password', { email }),

  resetPassword: (token: string, password: string) =>
    client.post(`/auth/reset-password?token=${token}`, { password }),

  verifyResetOtp: (data: { email: string; code: string }) =>
    client.post<{ resetToken: string }>('/auth/verify-reset-otp', data),

  refreshTokens: (refreshToken: string) =>
    client.post('/auth/refresh-tokens', { refreshToken }),
};
