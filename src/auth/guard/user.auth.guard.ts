import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard as NestAuthGuard } from "@nestjs/passport";

@Injectable()
export class JwtUserAuthGuard extends NestAuthGuard("jwt-user") {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }
}
