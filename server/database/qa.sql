-- 創建語言列舉表
CREATE TABLE Languages (
    id INT IDENTITY(1,1) PRIMARY KEY,
    code VARCHAR(10) NOT NULL UNIQUE,
    name NVARCHAR(50) NOT NULL,
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME DEFAULT GETDATE(),
    is_deleted BIT DEFAULT 0
);

-- 創建 QA 類別表
CREATE TABLE QACategories (
    id INT IDENTITY(1,1) PRIMARY KEY,
    parent_id INT NULL,
    name NVARCHAR(100) NOT NULL,
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME DEFAULT GETDATE(),
    is_deleted BIT DEFAULT 0,
    FOREIGN KEY (parent_id) REFERENCES QACategories(id)
);

-- 創建 QA 內容表
CREATE TABLE QAContents (
    id INT IDENTITY(1,1) PRIMARY KEY,
    category_id INT NOT NULL,
    language_id INT NOT NULL,
    question NVARCHAR(500) NOT NULL,
    answer NVARCHAR(MAX) NOT NULL,
    sort_order INT DEFAULT 0,
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME DEFAULT GETDATE(),
    is_deleted BIT DEFAULT 0,
    FOREIGN KEY (category_id) REFERENCES QACategories(id),
    FOREIGN KEY (language_id) REFERENCES Languages(id)
);

-- 創建索引
CREATE INDEX idx_qa_category ON QAContents(category_id);
CREATE INDEX idx_qa_language ON QAContents(language_id);
CREATE INDEX idx_qa_sort ON QAContents(sort_order);

-- 插入預設語言
INSERT INTO Languages (code, name) VALUES 
('zh-TW', N'中文'),
('en', N'英文'),
('vi', N'越南文'),
('th', N'泰文'),
('id', N'印尼文');

-- 創建觸發器以自動更新 updated_at
CREATE TRIGGER trg_QACategories_UpdateTimestamp
ON QACategories
AFTER UPDATE
AS
BEGIN
    UPDATE QACategories
    SET updated_at = GETDATE()
    FROM QACategories t
    INNER JOIN inserted i ON t.id = i.id;
END;

CREATE TRIGGER trg_QAContents_UpdateTimestamp
ON QAContents
AFTER UPDATE
AS
BEGIN
    UPDATE QAContents
    SET updated_at = GETDATE()
    FROM QAContents t
    INNER JOIN inserted i ON t.id = i.id;
END;

CREATE TRIGGER trg_Languages_UpdateTimestamp
ON Languages
AFTER UPDATE
AS
BEGIN
    UPDATE Languages
    SET updated_at = GETDATE()
    FROM Languages t
    INNER JOIN inserted i ON t.id = i.id;
END; 