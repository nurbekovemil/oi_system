export class LoginTokenDto {
  readonly tokenKind: 'jacarta' | 'enotoken';
  readonly challengeId: string;
  readonly signature: string;
  readonly user_inn: string;
  readonly company_inn: string;
}
