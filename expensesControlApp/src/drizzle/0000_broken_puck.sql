CREATE TABLE `expense` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`amount` real NOT NULL,
	`parcelas` integer NOT NULL,
	`type` text NOT NULL
);
