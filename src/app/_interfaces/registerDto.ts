export interface RegisterDto {
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  phoneNumber: string;
  address?: string;
  city?: string;
  state?: string;
  password: string;
  confirmPassword: string;
  profileImage?: File;
}
