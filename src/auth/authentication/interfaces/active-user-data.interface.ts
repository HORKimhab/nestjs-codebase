import { PermissionType } from '../permission.type';
export interface ActiveUserData {
  sub: number;
  email: string;
  permissions: PermissionType[]; 
}
