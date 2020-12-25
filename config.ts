export default {
  postgres: {
    host: 'postgres',
    port: 5432,
    database: 'customer-support-service',
    user: 'dev',
    password: 'dev',
    tables: {
      customer_support_agents: 'customer_support_agents',
      customer_support_issues: 'customer_support_issues',
    },
  },
}
