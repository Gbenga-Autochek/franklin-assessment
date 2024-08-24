/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vehicle } from 'src/vehicle/entities/vehicle.entity';
import { LoanController } from './loan.controller';
import { LoanService } from './loan.service';
import { ValuationService } from 'src/valuation/valuation.service';
import { User } from 'src/user/entities/user.entity';
import { Loan } from './entities/loan.entity';
import { Valuation } from 'src/valuation/entities/valuation.entity';
import { HttpModule } from '@nestjs/axios';
import { RapidService } from 'src/integration/rapid.service';



@Module({
  imports: [
      TypeOrmModule.forFeature([
          Vehicle,
          Valuation,
          User,
          Loan
      ]),
      HttpModule,
  ],
  // the integration should be it's own module which includes the rapid service 
  // and the loan module should import the integration module instead
  // what the candidate impl means is that to use the rapid service anywhere else in the app 
  // you would need to import the loan module which is not ideal
  providers: [LoanService, ValuationService, RapidService ],
  controllers: [LoanController],
  exports: [LoanService, ValuationService, RapidService],
})



export class LoanModule {}
