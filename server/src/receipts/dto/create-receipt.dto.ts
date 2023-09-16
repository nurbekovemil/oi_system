export class CreateReceiptDto {
  readonly reportId: number;
  readonly cert: string;
  readonly hash: string;
  readonly userId: number;
}
