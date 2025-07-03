// database.service.ts
export function getConnection(tenantId: string) {
  return this.dataSource.createQueryRunner({
    defaultSchema: `tenant_${tenantId}`
  });
}
