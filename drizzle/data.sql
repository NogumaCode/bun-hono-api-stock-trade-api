INSERT INTO
	stock_table (code, stock_name, market)
VALUES
	("1P01", "P株式会社", "プライム"),
	("1S01", "S株式会社", "スタンダード"),
	("1G01", "G株式会社", "グロース");

INSERT INTO
	trade_table (code, shares, price, buy_sell, trading_date)
VALUES
	("1P01", 200, 2000, "買", "2024-06-10"),
	("1S01", 300, 1000, "買", "2024-06-20"),
	("1G01", 400, 500, "買", "2024-06-30");
