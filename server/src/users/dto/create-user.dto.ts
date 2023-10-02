export class CreateUserDto {
  readonly login: string;
  readonly password: string;
  readonly companyId: number;
  readonly firstName: string;
  readonly lastName: string;
  readonly inn: string;
  readonly roleId: number;
}
