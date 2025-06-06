ALTER TABLE "user" ALTER COLUMN "role" SET DEFAULT 'user';--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "role" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "confirmed" SET DEFAULT false;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "confirmed" SET NOT NULL;