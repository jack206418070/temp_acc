-- 建立公告資料表
CREATE TABLE Announcements (
    id INT IDENTITY(1,1) PRIMARY KEY,
    publish_date VARCHAR(10) NOT NULL,  -- 發布日期 (2025/04/08)
    activity_start_date VARCHAR(10) NOT NULL,  -- 起始活動日 (2025/04/08)
    category NVARCHAR(50) NOT NULL,  -- 類別
    content NVARCHAR(MAX) NOT NULL,  -- 內容(html)
    title NVARCHAR(200) NOT NULL,  -- 標題
    link NVARCHAR(500),  -- 連結（可為空）
    image_id VARCHAR(50),  -- 圖片ID
    created_at DATETIME DEFAULT GETDATE(),  -- 建立時間
    updated_at DATETIME DEFAULT GETDATE(),  -- 更新時間
    is_deleted BIT DEFAULT 0  -- 軟刪除標記
);

-- 建立公告圖片資料表
CREATE TABLE AnnouncementImages (
    id INT IDENTITY(1,1) PRIMARY KEY,
    announcement_id INT NOT NULL,  -- 公告ID
    image_id VARCHAR(50) NOT NULL,  -- 圖片ID
    image_content VARBINARY(MAX) NOT NULL,  -- 圖片內容
    created_at DATETIME DEFAULT GETDATE(),  -- 建立時間
    updated_at DATETIME DEFAULT GETDATE(),  -- 更新時間
    is_deleted BIT DEFAULT 0,  -- 軟刪除標記
    FOREIGN KEY (announcement_id) REFERENCES Announcements(id)  -- 外鍵關聯
);

-- 建立索引
CREATE INDEX IX_Announcements_PublishDate ON Announcements(publish_date);
CREATE INDEX IX_Announcements_ActivityStartDate ON Announcements(activity_start_date);
CREATE INDEX IX_Announcements_Category ON Announcements(category);
CREATE INDEX IX_AnnouncementImages_ImageId ON AnnouncementImages(image_id); 