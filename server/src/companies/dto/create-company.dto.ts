export class CreateCompanyDto {
  readonly id?: number;
  readonly name: string; // название компании
  readonly activity: string; // деятельность компании
  readonly phone_number: string; // номер телефона
  readonly address: string; // адрес компании
  readonly email: string; // почта
  readonly director: string; // директор
  readonly accounting: string; // бухгалтерия
  readonly inn: string; // ПИН
}
