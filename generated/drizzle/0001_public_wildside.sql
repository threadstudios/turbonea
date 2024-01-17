CREATE TABLE IF NOT EXISTS "comment" (
	"id" varchar(36) PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"content" text NOT NULL,
	"author_id" varchar NOT NULL,
	"post_id" varchar,
	"parent_id" varchar
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "interaction" (
	"id" varchar(36) PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"type" varchar NOT NULL,
	"author_id" varchar NOT NULL,
	"entity_id" varchar NOT NULL
);
