CREATE TABLE `stock_table` (
	`code` text(4) PRIMARY KEY NOT NULL,
	`stock_name` text NOT NULL,
	`market` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `trade_table` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`code` text(4) NOT NULL,
	`shares` integer NOT NULL,
	`price` real NOT NULL,
	`buy_sell` text NOT NULL,
	`trading_date` text NOT NULL,
	FOREIGN KEY (`code`) REFERENCES `stock_table`(`code`) ON UPDATE no action ON DELETE no action
);
