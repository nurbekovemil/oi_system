export class CreateContractDto {
    readonly contract: Contract;
    readonly contract_companies: number[];
}

class Contract {
    readonly userId: number;
    readonly typeId: number;
    readonly content: string; 
}
