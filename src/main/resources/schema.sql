-- Drop tables that need schema changes so Hibernate recreates them correctly on startup.
DROP TABLE IF EXISTS crew_login;
DROP TABLE IF EXISTS bugs_in_route;
DROP TABLE IF EXISTS batteries;
DROP TABLE IF EXISTS ast_stats;

-- Battery state (server-authoritative).
-- location_type: FACILITY_RACK | CHARGING_STATION | ON_BUG
-- drain_started_at  – set for FACILITY_RACK; charge = max(0, 100 - elapsed_sec * 100/30)
-- charge_started_at – set for CHARGING_STATION when actively charging; charge = min(100, elapsed_sec * 100/10)
-- static_charge     – used for ON_BUG (frozen) and fully-charged CS batteries (charge_started_at IS NULL)
CREATE TABLE IF NOT EXISTS batteries (
    id               VARCHAR(36)  NOT NULL PRIMARY KEY,
    location_type    VARCHAR(20)  NOT NULL,
    location_id      VARCHAR(64)  NOT NULL,
    slot_index       INT          NOT NULL,
    static_charge    DOUBLE,
    drain_started_at TIMESTAMP,
    charge_started_at TIMESTAMP
);

-- Per-AST performance stats, cleared on each simulation start/reset.
CREATE TABLE IF NOT EXISTS ast_stats (
    crew_id             VARCHAR(20) NOT NULL PRIMARY KEY,
    routes_completed    INT         NOT NULL DEFAULT 0,
    batteries_delivered INT         NOT NULL DEFAULT 0,
    regolith_distance   DOUBLE      NOT NULL DEFAULT 0,
    shiny_blue_distance DOUBLE      NOT NULL DEFAULT 0
);
