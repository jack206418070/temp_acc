CREATE TABLE service_units (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name NVARCHAR(100) NOT NULL,
    unit_image VARBINARY(MAX) NULL,
    category NVARCHAR(50) NOT NULL,
    region NVARCHAR(20) NOT NULL,
    service_area NVARCHAR(200) NOT NULL,
    address NVARCHAR(200) NOT NULL,
    phone NVARCHAR(50) NOT NULL,
    email NVARCHAR(100) NOT NULL,
    description NVARCHAR(MAX) NOT NULL,
    website NVARCHAR(200) NULL,
    price_image VARBINARY(MAX) NULL,
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME DEFAULT GETDATE()
); 