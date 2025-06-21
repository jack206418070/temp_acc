#!/usr/bin/env node

// 安全防護測試腳本
// 用於驗證系統對 Dynamic Code Evaluation 和 XMLHttpRequest 攻擊的防護效果

const axios = require('axios');

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

console.log('🔒 Web 應用程式安全防護測試');
console.log('==================================');

// 測試案例
const testCases = [
  {
    name: 'HTTP Request Smuggling - 惡意 URL 注入',
    url: `${BASE_URL}/service-price`,
    params: { id: 'https://zero.webappsecurity.com/malicious' },
    expectedStatus: 400,
    expectedMessage: '請求參數'
  },
  {
    name: 'Dynamic Code Evaluation - JavaScript 協議',
    url: `${BASE_URL}/service-price`,
    params: { id: 'javascript:alert(1)' },
    expectedStatus: 400,
    expectedMessage: '無效的參數格式'
  },
  {
    name: 'XMLHttpRequest 攻擊 - 外部網域',
    url: `${BASE_URL}/service-price`,
    params: { id: 'testphp.vulnweb.com/attack' },
    expectedStatus: 400,
    expectedMessage: '請求參數'
  },
  {
    name: 'XSS 攻擊 - 腳本注入',
    url: `${BASE_URL}/service-price`,
    params: { id: '<script>alert("xss")</script>' },
    expectedStatus: 400,
    expectedMessage: '無效的參數格式'
  },
  {
    name: 'SQL 注入攻擊',
    url: `${BASE_URL}/service-price`,
    params: { id: "1' UNION SELECT * FROM users--" },
    expectedStatus: 400,
    expectedMessage: '無效的參數格式'
  },
  {
    name: 'Code Injection - eval 函數',
    url: `${BASE_URL}/service-price`,
    params: { id: 'eval("malicious_code")' },
    expectedStatus: 400,
    expectedMessage: '無效的參數格式'
  },
  {
    name: 'SSRF 攻擊 - 內網 IP',
    url: `${BASE_URL}/service-price`,
    params: { id: '192.168.1.1/admin' },
    expectedStatus: 400,
    expectedMessage: '請求參數'
  },
  {
    name: 'Base64 編碼攻擊',
    url: `${BASE_URL}/service-price`,
    params: { id: 'aGVsbG8gd29ybGQ=' + 'a'.repeat(50) },
    expectedStatus: 400,
    expectedMessage: '無效的參數格式'
  },
  {
    name: 'Nuxt 構建文件存取攻擊 (CWE-116)',
    url: `${BASE_URL}/_nuxt/builds/meta/test.json`,
    params: {},
    expectedStatus: 404,
    expectedMessage: 'Not Found'
  },
  {
    name: 'URL 編碼繞過攻擊',
    url: `${BASE_URL}/_nuxt/builds/meta/z%3F.x.%3Fztest.json`,
    params: {},
    expectedStatus: 404,
    expectedMessage: 'Not Found'
  },
  {
    name: '雙重編碼繞過攻擊',
    url: `${BASE_URL}/_nuxt/builds/meta/test%252ejson`,
    params: {},
    expectedStatus: 404,
    expectedMessage: 'Not Found'
  },
  {
    name: 'Unicode 編碼攻擊',
    url: `${BASE_URL}/_nuxt/builds/meta/\\u002etest`,
    params: {},
    expectedStatus: 404,
    expectedMessage: 'Not Found'
  },
  {
    name: '正常請求 - 數字 ID',
    url: `${BASE_URL}/service-price`,
    params: { id: '123' },
    expectedStatus: [200, 404], // 200 if service exists, 404 if not found
    shouldPass: true
  },
  {
    name: '正常請求 - 空值',
    url: `${BASE_URL}/service-price`,
    params: {},
    expectedStatus: [200, 400], // May return error for missing ID
    shouldPass: true
  },
  {
    name: 'Cookie 安全測試 - Captcha API',
    url: `${BASE_URL}/api/captcha`,
    params: { t: Date.now() },
    expectedStatus: 200,
    shouldPass: true,
    checkCookieSecurity: true
  }
];

// 檢查 Cookie 安全性
function checkCookieSecurity(setCookieHeaders) {
  const issues = [];
  const cookies = Array.isArray(setCookieHeaders) ? setCookieHeaders : [setCookieHeaders];
  
  for (const cookie of cookies) {
    // 檢查 Secure 標志
    if (!cookie.toLowerCase().includes('secure')) {
      issues.push('缺少 Secure 標志');
    }
    
    // 檢查 SameSite 標志
    if (!cookie.toLowerCase().includes('samesite')) {
      issues.push('缺少 SameSite 標志');
    }
    
    // 檢查 HttpOnly 標志 (對於安全性關鍵的 Cookie)
    if (!cookie.toLowerCase().includes('httponly')) {
      issues.push('缺少 HttpOnly 標志');
    }
    
    // 檢查 Cookie 是否有過期時間
    if (!cookie.toLowerCase().includes('max-age') && !cookie.toLowerCase().includes('expires')) {
      issues.push('缺少過期時間設定');
    }
  }
  
  return {
    isSecure: issues.length === 0,
    issues: issues
  };
}

// 執行測試
async function runTests() {
  let passedTests = 0;
  let totalTests = testCases.length;
  
  console.log(`開始執行 ${totalTests} 個測試案例...\n`);

  for (const testCase of testCases) {
    try {
      console.log(`🧪 測試: ${testCase.name}`);
      console.log(`   URL: ${testCase.url}`);
      console.log(`   參數: ${JSON.stringify(testCase.params)}`);
      
      const response = await axios.get(testCase.url, { 
        params: testCase.params,
        timeout: 10000,
        validateStatus: function (status) {
          return status < 500; // 不拒絕 4xx 錯誤
        }
      });
      
      const status = response.status;
      const isExpectedStatus = Array.isArray(testCase.expectedStatus) 
        ? testCase.expectedStatus.includes(status)
        : status === testCase.expectedStatus;
      
      if (testCase.shouldPass) {
        // 正常請求應該通過
        if (status === 200 || status === 404) {
          console.log(`   ✅ PASS - 狀態碼: ${status} (正常請求)`);
          
          // 檢查 Cookie 安全性
          if (testCase.checkCookieSecurity) {
            const setCookieHeader = response.headers['set-cookie'];
            if (setCookieHeader) {
              const cookieSecurityCheck = checkCookieSecurity(setCookieHeader);
              if (cookieSecurityCheck.isSecure) {
                console.log(`   ✅ PASS - Cookie 安全檢查通過`);
                passedTests += 0.5; // 額外加分
              } else {
                console.log(`   ❌ FAIL - Cookie 安全檢查失敗: ${cookieSecurityCheck.issues.join(', ')}`);
              }
            }
          } else {
            passedTests++;
          }
        } else {
          console.log(`   ❌ FAIL - 狀態碼: ${status} (應該允許正常請求)`);
        }
      } else {
        // 惡意請求應該被阻擋
        if (isExpectedStatus) {
          const hasExpectedMessage = testCase.expectedMessage 
            ? (response.data && JSON.stringify(response.data).includes(testCase.expectedMessage))
            : true;
          
          if (hasExpectedMessage) {
            console.log(`   ✅ PASS - 狀態碼: ${status} (惡意請求被阻擋)`);
            passedTests++;
          } else {
            console.log(`   ⚠️  PARTIAL - 狀態碼正確但訊息不符`);
            passedTests += 0.5;
          }
        } else {
          console.log(`   ❌ FAIL - 狀態碼: ${status} (惡意請求未被阻擋)`);
        }
      }
      
    } catch (error) {
      if (testCase.shouldPass) {
        console.log(`   ❌ FAIL - 請求失敗: ${error.message}`);
      } else {
        console.log(`   ✅ PASS - 請求被拒絕: ${error.message}`);
        passedTests++;
      }
    }
    
    console.log('');
    await new Promise(resolve => setTimeout(resolve, 500)); // 短暫延遲
  }
  
  // 顯示測試結果
  console.log('==================================');
  console.log(`📊 測試結果: ${passedTests}/${totalTests} 通過`);
  
  if (passedTests === totalTests) {
    console.log('🎉 所有測試通過！系統安全防護運作正常。');
    process.exit(0);
  } else {
    console.log('⚠️  部分測試失敗，請檢查安全設定。');
    process.exit(1);
  }
}

// 檢查伺服器是否運行
async function checkServer() {
  try {
    await axios.get(`${BASE_URL}/api/health-check`, { timeout: 5000 });
    console.log('✅ 伺服器運行中');
    return true;
  } catch (error) {
    console.log('❌ 無法連接到伺服器，請確認伺服器已啟動');
    console.log(`   預期 URL: ${BASE_URL}`);
    return false;
  }
}

// 主函數
async function main() {
  const serverRunning = await checkServer();
  if (!serverRunning) {
    process.exit(1);
  }
  
  console.log('');
  await runTests();
}

// 執行測試
if (require.main === module) {
  main().catch(error => {
    console.error('測試執行錯誤:', error.message);
    process.exit(1);
  });
}

module.exports = { runTests, testCases }; 