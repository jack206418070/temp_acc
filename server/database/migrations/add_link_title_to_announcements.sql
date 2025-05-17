-- 檢查 linkTitle 欄位是否存在
IF NOT EXISTS (
  SELECT * FROM sys.columns 
  WHERE object_id = OBJECT_ID('Announcements') 
  AND name = 'linkTitle'
)
BEGIN
  -- 新增 linkTitle 欄位到 Announcements 表
  ALTER TABLE Announcements
  ADD linkTitle NVARCHAR(200) NULL;

  -- 更新現有資料，將 link 欄位的值作為預設的 linkTitle
  UPDATE Announcements
  SET linkTitle = link
  WHERE link IS NOT NULL AND linkTitle IS NULL;
END 