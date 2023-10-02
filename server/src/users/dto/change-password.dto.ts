export class ChangePasswordDto {
  readonly userId: number;
  readonly password: string;
  readonly confirmPassword: string;
}
