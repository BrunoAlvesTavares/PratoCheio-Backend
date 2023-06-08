export interface UserPayload {
  sub: string;
  username: string;
  name: string;
  accessLevel: string;
  iat?: number;
  exp?: number;
}
