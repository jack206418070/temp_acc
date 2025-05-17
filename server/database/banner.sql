-- 建立 Banner 資料表
CREATE TABLE Banners (
    id INT IDENTITY(1,1) PRIMARY KEY,
    title NVARCHAR(100),                    -- Banner 標題
    description NVARCHAR(500),              -- Banner 描述
    image_data VARBINARY(MAX),              -- 圖片資料
    image_type NVARCHAR(50),                -- 圖片類型 (例如: image/jpeg, image/png)
    sort_order INT DEFAULT 0,               -- 排序順序
    is_active BIT DEFAULT 1,                -- 是否啟用
    is_deleted BIT DEFAULT 0,               -- 是否刪除
    created_at DATETIME DEFAULT GETDATE(),  -- 建立時間
    updated_at DATETIME DEFAULT GETDATE()   -- 更新時間
); 