CREATE TABLE "clan_events" (
	"id" text PRIMARY KEY NOT NULL,
	"clan_id" text,
	"author_id" text,
	"author_display_name" text,
	"auth_display_name" text,
	"type" text,
	"message" text,
	"description" text,
	"clan_reward_id" text,
	"value" numeric(14, 4),
	"bits_amount" integer,
	"bits_amout_legacy" integer,
	"coins_amount" integer,
	"subs_amount" integer,
	"is_renew" boolean,
	"redeemed_at" timestamp with time zone,
	"created_at" timestamp with time zone,
	"raw_data" jsonb DEFAULT '{}'::jsonb NOT NULL
);
--> statement-breakpoint
CREATE TABLE "clan_rewards" (
	"id" text PRIMARY KEY NOT NULL,
	"type" text,
	"name" text,
	"reward_id" text,
	"status" text,
	"tier" integer,
	"value" numeric(14, 4),
	"visible" boolean,
	"raw_data" jsonb DEFAULT '{}'::jsonb NOT NULL
);
--> statement-breakpoint
CREATE TABLE "clans" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text,
	"display_name" text,
	"display_name_fr" text,
	"color" text,
	"image_path" text,
	"description" text,
	"chieftain_profile_id" text,
	"total_members" integer,
	"total_points" numeric(14, 4),
	"created_at" timestamp with time zone,
	"raw_data" jsonb DEFAULT '{}'::jsonb NOT NULL
);
--> statement-breakpoint
CREATE TABLE "profiles" (
	"id" text PRIMARY KEY NOT NULL,
	"username" text,
	"display_name" text,
	"email" text,
	"photo_url" text,
	"description" text,
	"clan_id" text,
	"broadcaster_type" text,
	"twitch_created_at" timestamp with time zone,
	"is_follow" boolean,
	"followed_at" timestamp with time zone,
	"is_bought_clan_access" boolean,
	"discord_id" text,
	"discord_username" text,
	"discord_nickname" text,
	"discord_tag" text,
	"discord_linked_at" timestamp with time zone,
	"type" text,
	"is_subscribed" boolean,
	"is_sub_gift" boolean,
	"sub_tier" integer,
	"sub_duration_months" integer,
	"sub_streak_months" integer,
	"sub_cumulative_months" integer,
	"subscribed_at" timestamp with time zone,
	"created_at" timestamp with time zone,
	"updated_at" timestamp with time zone,
	"raw_data" jsonb DEFAULT '{}'::jsonb NOT NULL
);
--> statement-breakpoint
CREATE TABLE "test_clan_answers" (
	"id" text PRIMARY KEY NOT NULL,
	"test_id" text,
	"question_index" integer,
	"answer_a" text,
	"answer_b" text,
	"answer_c" text,
	"created_at" timestamp with time zone,
	"raw_data" jsonb DEFAULT '{}'::jsonb NOT NULL
);
--> statement-breakpoint
CREATE TABLE "test_clan_questions" (
	"id" text PRIMARY KEY NOT NULL,
	"test_id" text,
	"question_index" integer,
	"text" text,
	"answers" jsonb,
	"created_at" timestamp with time zone,
	"raw_data" jsonb DEFAULT '{}'::jsonb NOT NULL
);
--> statement-breakpoint
CREATE TABLE "test_clan_responses" (
	"id" text PRIMARY KEY NOT NULL,
	"test_id" text,
	"current_question" text,
	"is_done" boolean,
	"result_clan_id" text,
	"list" jsonb,
	"totals_members" integer,
	"created_at" timestamp with time zone,
	"updated_at" timestamp with time zone,
	"finished_at" timestamp with time zone,
	"raw_data" jsonb DEFAULT '{}'::jsonb NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tests" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text,
	"created_at" timestamp with time zone,
	"raw_data" jsonb DEFAULT '{}'::jsonb NOT NULL
);
--> statement-breakpoint
ALTER TABLE "clan_events" ADD CONSTRAINT "clan_events_clan_id_clans_id_fk" FOREIGN KEY ("clan_id") REFERENCES "public"."clans"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "clan_events" ADD CONSTRAINT "clan_events_author_id_profiles_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."profiles"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "clan_events" ADD CONSTRAINT "clan_events_clan_reward_id_clan_rewards_id_fk" FOREIGN KEY ("clan_reward_id") REFERENCES "public"."clan_rewards"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_clan_id_clans_id_fk" FOREIGN KEY ("clan_id") REFERENCES "public"."clans"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "test_clan_answers" ADD CONSTRAINT "test_clan_answers_test_id_tests_id_fk" FOREIGN KEY ("test_id") REFERENCES "public"."tests"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "test_clan_questions" ADD CONSTRAINT "test_clan_questions_test_id_tests_id_fk" FOREIGN KEY ("test_id") REFERENCES "public"."tests"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "test_clan_responses" ADD CONSTRAINT "test_clan_responses_test_id_tests_id_fk" FOREIGN KEY ("test_id") REFERENCES "public"."tests"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "test_clan_responses" ADD CONSTRAINT "test_clan_responses_result_clan_id_clans_id_fk" FOREIGN KEY ("result_clan_id") REFERENCES "public"."clans"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "clan_events_clan_id_idx" ON "clan_events" USING btree ("clan_id");--> statement-breakpoint
CREATE INDEX "clan_events_author_id_idx" ON "clan_events" USING btree ("author_id");--> statement-breakpoint
CREATE INDEX "clan_events_type_idx" ON "clan_events" USING btree ("type");--> statement-breakpoint
CREATE INDEX "clan_events_created_at_idx" ON "clan_events" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "clan_rewards_type_idx" ON "clan_rewards" USING btree ("type");--> statement-breakpoint
CREATE INDEX "clans_name_idx" ON "clans" USING btree ("name");--> statement-breakpoint
CREATE INDEX "clans_chieftain_profile_id_idx" ON "clans" USING btree ("chieftain_profile_id");--> statement-breakpoint
CREATE INDEX "profiles_username_idx" ON "profiles" USING btree ("username");--> statement-breakpoint
CREATE INDEX "profiles_clan_id_idx" ON "profiles" USING btree ("clan_id");--> statement-breakpoint
CREATE INDEX "test_clan_answers_test_id_idx" ON "test_clan_answers" USING btree ("test_id");--> statement-breakpoint
CREATE INDEX "test_clan_questions_test_id_idx" ON "test_clan_questions" USING btree ("test_id");--> statement-breakpoint
CREATE INDEX "test_clan_responses_test_id_idx" ON "test_clan_responses" USING btree ("test_id");--> statement-breakpoint
CREATE INDEX "test_clan_responses_result_clan_id_idx" ON "test_clan_responses" USING btree ("result_clan_id");