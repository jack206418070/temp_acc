// 測試 API 安全性 - 確保敏感編碼攻擊返回 404
const BASE_URL = 'http://localhost:3000';

// 測試用例：各種敏感編碼攻擊
const testCases = [
  // URL 編碼攻擊
  {
    name: 'URL Encoding Attack',
    url: '/service-price?id=%33%31%33%31%31',
    expectedStatus: 404
  },
  {
    name: 'Dynamic Code Evaluation',
    url: '/service-price?id=https://zero.webappsecurity.com/PRcxaxaxcihfhfbggbabdiajaegRP',
    expectedStatus: 404
  },
  {
    name: 'Build Metadata Access',
    url: '/_nuxt/builds/meta/z%3F.x.%3Fz849003f2-7404-4629-9a2e-c7497202b14f.json',
    expectedStatus: 404
  },
  {
    name: 'HTML Entity Encoding',
    url: '/api/service-unit/&#x33;&#x31;',
    expectedStatus: 404
  },
  {
    name: 'Unicode Encoding',
    url: '/api/service-unit/\\u0031\\u0031',
    expectedStatus: 404
  },
  {
    name: 'Hex Encoding',
    url: '/api/service-unit/0x31',
    expectedStatus: 404
  },
  {
    name: 'XSS Attack',
    url: '/api/service-unit/1?test=<script>alert(1)</script>',
    expectedStatus: 404
  },
  {
    name: 'SQL Injection',
    url: '/api/service-unit/1?test=union select * from users',
    expectedStatus: 404
  },
  {
    name: 'Path Traversal',
    url: '/api/service-unit/../../../etc/passwd',
    expectedStatus: 404
  },
  {
    name: 'Command Injection',
    url: '/api/service-unit/1?cmd=; ls -la',
    expectedStatus: 404
  }
];

async function testEndpoint(testCase) {
  try {
    console.log(`\n🧪 Testing: ${testCase.name}`);
    console.log(`📍 URL: ${testCase.url}`);
    
    const response = await fetch(BASE_URL + testCase.url, {
      method: 'GET',
      headers: {
        'User-Agent': 'Security-Test-Bot/1.0'
      }
    });
    
    const actualStatus = response.status;
    const statusMatch = actualStatus === testCase.expectedStatus;
    
    console.log(`📊 Expected: ${testCase.expectedStatus}, Got: ${actualStatus}`);
    console.log(`${statusMatch ? '✅ PASS' : '❌ FAIL'} - ${statusMatch ? 'Correct status code' : 'Wrong status code'}`);
    
    if (!statusMatch) {
      const responseText = await response.text();
      console.log(`📄 Response body (first 200 chars):`, responseText.substring(0, 200));
    }
    
    return statusMatch;
  } catch (error) {
    console.log(`❌ FAIL - Network error: ${error.message}`);
    return false;
  }
}

async function runSecurityTests() {
  console.log('🔒 開始安全測試 - 驗證敏感編碼攻擊返回 404');
  console.log('=' * 60);
  
  let passed = 0;
  let failed = 0;
  
  for (const testCase of testCases) {
    const result = await testEndpoint(testCase);
    if (result) {
      passed++;
    } else {
      failed++;
    }
    
    // 延遲避免請求過快
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  console.log('\n' + '=' * 60);
  console.log(`🎯 測試完成:`);
  console.log(`✅ 通過: ${passed}`);
  console.log(`❌ 失敗: ${failed}`);
  console.log(`📊 成功率: ${((passed / (passed + failed)) * 100).toFixed(1)}%`);
  
  if (failed === 0) {
    console.log('\n🎉 所有測試通過！API 安全性符合要求。');
    console.log('📋 弱點掃描工具將收到 404 回應，認為攻擊被拒絕。');
  } else {
    console.log('\n⚠️ 部分測試失敗，需要檢查安全配置。');
  }
}

// 如果直接執行此文件
if (typeof module !== 'undefined' && require.main === module) {
  runSecurityTests().catch(console.error);
}

module.exports = { runSecurityTests, testCases }; 