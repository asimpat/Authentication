import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
 async getUserAuthorized(userId:number){
    return await `User ${userId} is Authorized`; 
  }
}
