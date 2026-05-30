import client from './client';

export interface UpdateMePayload {
  name?: string;
  email?: string;
  age?: number;
  gender?: 'male' | 'female';
  style?: 'street' | 'sports' | 'casual' | 'formal';
  avatar?: string;
}

export const userApi = {
  getMe: () => client.get('/users/me'),
  updateMe: (data: UpdateMePayload) => client.patch('/users/me', data),
  deleteMe: () => client.delete('/users/me'),
};
