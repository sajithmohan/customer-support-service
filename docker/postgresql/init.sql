CREATE TABLE customer_support_agents (id TEXT PRIMARY KEY, availability TEXT);

CREATE TABLE customer_support_issues (
  id TEXT NOT NULL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  opened_customer_id TEXT,
  assigned_agent_id TEXT,
  state TEXT NOT NULL
);
