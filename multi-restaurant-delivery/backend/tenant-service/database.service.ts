// database.service.ts
getConnection(tenantId: string) {
  return this.dataSource.createQueryRunner({
    defaultSchema: `tenant_${tenantId}`
  });
}
