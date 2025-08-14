-- 多元陪伴照顧服務試辦計畫資料庫建表 SQL
-- 執行前請確保已建立資料庫
-- USE 語句會由初始化腳本處理，這裡不需要

-- 1. 建立 Users 資料表
CREATE TABLE Users (
    id INT IDENTITY(1,1) PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'admin',
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME DEFAULT GETDATE(),
    is_deleted BIT DEFAULT 0
);

-- 2. 建立 Languages 資料表
CREATE TABLE Languages (
    id INT IDENTITY(1,1) PRIMARY KEY,
    code VARCHAR(5) NOT NULL UNIQUE,
    name NVARCHAR(50) NOT NULL,
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME DEFAULT GETDATE(),
    is_deleted BIT DEFAULT 0
);

-- 3. 建立 Announcements 資料表
CREATE TABLE Announcements (
    id INT IDENTITY(1,1) PRIMARY KEY,
    title NVARCHAR(200) NOT NULL,
    category NVARCHAR(50) NOT NULL,
    content NVARCHAR(MAX),
    publish_date VARCHAR(10) NOT NULL,
    activity_start_date VARCHAR(10) NOT NULL,
    link NVARCHAR(500),
    linkTitle NVARCHAR(200),
    image_id VARCHAR(50),
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME DEFAULT GETDATE(),
    is_deleted BIT DEFAULT 0
);

-- 4. 建立 AnnouncementImages 資料表（新增 file_type 欄位）
CREATE TABLE AnnouncementImages (
    id INT IDENTITY(1,1) PRIMARY KEY,
    announcement_id INT NOT NULL,
    image_id VARCHAR(50) NOT NULL,
    image_content VARBINARY(MAX) NOT NULL,
    file_type VARCHAR(10) DEFAULT 'image',
    original_filename NVARCHAR(255),
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME DEFAULT GETDATE(),
    is_deleted BIT DEFAULT 0,
    FOREIGN KEY (announcement_id) REFERENCES Announcements(id)
);

-- 5. 建立 ServiceUnits 資料表
CREATE TABLE ServiceUnits (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name NVARCHAR(100) NOT NULL,
    service_area NVARCHAR(100) NOT NULL,
    contact_info NVARCHAR(500),
    service_content NVARCHAR(MAX),
    price_image VARBINARY(MAX),
    unit_image VARBINARY(MAX),
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME DEFAULT GETDATE(),
    is_deleted BIT DEFAULT 0
);

-- 6. 建立 QACategories 資料表
CREATE TABLE QACategories (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name NVARCHAR(100) NOT NULL,
    order_num INT DEFAULT 0,
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME DEFAULT GETDATE(),
    is_deleted BIT DEFAULT 0
);

-- 7. 建立 QA 資料表
CREATE TABLE QA (
    id INT IDENTITY(1,1) PRIMARY KEY,
    category_id INT NOT NULL,
    order_num INT DEFAULT 0,
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME DEFAULT GETDATE(),
    is_deleted BIT DEFAULT 0,
    FOREIGN KEY (category_id) REFERENCES QACategories(id)
);

-- 8. 建立 QAContents 資料表
CREATE TABLE QAContents (
    id INT IDENTITY(1,1) PRIMARY KEY,
    qa_id INT NOT NULL,
    language_id INT NOT NULL,
    question NVARCHAR(MAX) NOT NULL,
    answer NVARCHAR(MAX) NOT NULL,
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME DEFAULT GETDATE(),
    is_deleted BIT DEFAULT 0,
    FOREIGN KEY (qa_id) REFERENCES QA(id),
    FOREIGN KEY (language_id) REFERENCES Languages(id)
);

-- 9. 建立 Knowledge 資料表
CREATE TABLE Knowledge (
    id INT IDENTITY(1,1) PRIMARY KEY,
    title NVARCHAR(200) NOT NULL,
    image_content VARBINARY(MAX),
    category NVARCHAR(50),
    order_num INT DEFAULT 0,
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME DEFAULT GETDATE(),
    is_deleted BIT DEFAULT 0
);

-- 10. 建立 Banners 資料表
CREATE TABLE Banners (
    id INT IDENTITY(1,1) PRIMARY KEY,
    title NVARCHAR(200),
    image_content VARBINARY(MAX) NOT NULL,
    link NVARCHAR(500),
    order_num INT DEFAULT 0,
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME DEFAULT GETDATE(),
    is_deleted BIT DEFAULT 0
);

-- 11. 建立 UserReminders 資料表
CREATE TABLE UserReminders (
    id INT IDENTITY(1,1) PRIMARY KEY,
    content TEXT NOT NULL,
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME DEFAULT GETDATE()
);

-- 插入預設語言資料
INSERT INTO Languages (code, name) VALUES
('zh', N'繁體中文'),
('en', N'English'),
('vi', N'Tiếng Việt'),
('id', N'Bahasa Indonesia'),
('th', N'ภาษาไทย');

-- 插入預設管理員帳號（密碼需要加密後再使用）
-- INSERT INTO Users (username, password, role) VALUES
-- ('admin', 'hashed_password_here', 'admin');

-- 建立索引以提升效能
CREATE INDEX IX_AnnouncementImages_AnnouncementId ON AnnouncementImages(announcement_id);
CREATE INDEX IX_AnnouncementImages_FileType ON AnnouncementImages(file_type);
CREATE INDEX IX_Announcements_Category ON Announcements(category);
CREATE INDEX IX_Announcements_PublishDate ON Announcements(publish_date);
CREATE INDEX IX_QAContents_QAId ON QAContents(qa_id);
CREATE INDEX IX_QAContents_LanguageId ON QAContents(language_id);

PRINT 'All tables created successfully!';