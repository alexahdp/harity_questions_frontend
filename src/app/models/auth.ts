export type AuthType =  'signin' | 'signup';

export interface AuthDTO {
  username: string;
  password: string;
  token: string;
}
