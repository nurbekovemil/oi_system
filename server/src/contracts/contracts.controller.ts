import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ContractsService } from './contracts.service';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';

@Controller('contracts')
export class ContractsController {
  constructor(private readonly contractsService: ContractsService) {}

  @Post('/')
  createContract(@Body() createContractDto: CreateContractDto) {
    return this.contractsService.createContract(createContractDto);
  }

  @Get('/types')
  getContractTypes() {
    return this.contractsService.getContractTypes();
  }

  @Get('/:cid')
  getContractById(@Param('cid') cid: number) {
    return this.contractsService.getContractById(cid);
  } 

  @Get('/')
  getContractList() {
    return this.contractsService.getContractList();
  }  

  @Get('/types/:id')
  getContractTypeById(@Param('id') id: number) {
    return this.contractsService.getContractTypeById(id);
  }

}
