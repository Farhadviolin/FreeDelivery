import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
@Injectable()
export class TenantGuard implements CanActivate {
  canActivate(ctx: ExecutionContext) {
    const req = ctx.switchToHttp().getRequest();
    const tenantId = req.headers['x-tenant-id'];
    req.tenant = tenantId;
    return !!tenantId;
  }
}
