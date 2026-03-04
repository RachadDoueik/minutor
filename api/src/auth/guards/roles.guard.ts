import { Injectable , CanActivate , ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!requiredRoles) return true;

    const request = context.switchToHttp().getRequest();
    const user = request.user; // Set by your SupabaseStrategy

    // Check if the role we injected into the JWT matches
    return requiredRoles.includes(user.user_role);
  }
}