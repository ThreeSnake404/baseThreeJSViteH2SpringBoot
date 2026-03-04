-- Drop tables that need schema changes so Hibernate recreates them correctly on startup.
DROP TABLE IF EXISTS crew_login;
DROP TABLE IF EXISTS bugs_in_route;
