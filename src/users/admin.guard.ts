import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class Admin implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest();
        const role = req.headers['role'] as string;

        if (role !== 'admin') {
            throw new UnauthorizedException('only admins can do it');
        }
        return true;
    }
}




