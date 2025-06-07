CREATE TABLE "quotation" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"quot_no" bigint,
	"ins_no" bigint,
	"quotation_date" timestamp with time zone,
	"company_name" text,
	"quotation_amount" bigint,
	"payment_term" text,
	"delivery_term" integer,
	"delivery_condition" text,
	"price_valid" integer,
	"remarks" jsonb,
	"prepared" text,
	"accessory" jsonb,
	"category" jsonb
);
