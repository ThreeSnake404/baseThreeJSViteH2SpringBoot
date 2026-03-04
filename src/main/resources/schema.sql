-- Drop the old crew_login table so Hibernate can recreate it with the new schema
-- (old table used BIGINT auto-increment id; new schema uses VARCHAR(36) GUID as primary key).
DROP TABLE IF EXISTS crew_login;
