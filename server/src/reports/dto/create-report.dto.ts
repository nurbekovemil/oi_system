export class CreateReportDto {
  readonly typeId: number;
  readonly statusId: number;
  readonly userId?: number;
  readonly companyId?: number;
}
