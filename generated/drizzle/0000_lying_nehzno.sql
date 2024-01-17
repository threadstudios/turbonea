CREATE TABLE IF NOT EXISTS "post" (
	"id" varchar(36) PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"content" text NOT NULL,
	"author_id" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" varchar(36) PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users_to_users" (
	"from_id" varchar NOT NULL,
	"to_id" varchar NOT NULL,
	CONSTRAINT "users_to_users_from_id_to_id_pk" PRIMARY KEY("from_id","to_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_to_users" ADD CONSTRAINT "users_to_users_from_id_user_id_fk" FOREIGN KEY ("from_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_to_users" ADD CONSTRAINT "users_to_users_to_id_user_id_fk" FOREIGN KEY ("to_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
