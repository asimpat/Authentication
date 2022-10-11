import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from "passport-jwt";
import { Repository } from "typeorm";
import { AuthService } from "../auth.service";
import { Auth } from "../authEntity/auth.entity";


@Injectable()
export class jwtStrategy extends PassportStrategy(Strategy, "jwt") { 
    constructor() {
       
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: true,
            secretOrKey: "OURSECRET",
           
        })
     
    }

    async validate(payload: any) {  
    
               const {password, ...result}=payload
                return result
            
        
     
    }
}