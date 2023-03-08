import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class AccessTokenGuard extends AuthGuard("jwt") {
  getRequest(context: ExecutionContext) {
    return super.canActivate(context);
  }
}
