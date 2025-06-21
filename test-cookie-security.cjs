#!/usr/bin/env node

// Cookie 安全檢查腳本
// 專門測試 Cookie Security (CWE-614) 防護

const axios = require('axios');

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

console.log('🍪 Cookie 安全檢查測試');
console.log('==================================');

// Cookie 安全檢查函數
function analyzeCookieSecurity(setCookieHeaders) {
  const results = [];
  const cookies = Array.isArray(setCookieHeaders) ? setCookieHeaders : [setCookieHeaders];
  
  for (const cookie of cookies) {
    const cookieName = cookie.split('=')[0];
    const analysis = {
      name: cookieName,
      cookie: cookie,
      issues: [],
      score: 0,
      maxScore: 5
    };
    
    // 檢查 Secure 標志
    if (cookie.toLowerCase().includes('secure')) {
      analysis.score += 1;
      console.log(`   ✅ ${cookieName}: 包含 Secure 標志`);
    } else {
      analysis.issues.push('缺少 Secure 標志');
      console.log(`   ❌ ${cookieName}: 缺少 Secure 標志`);
    }
    
    // 檢查 SameSite 屬性
    if (cookie.toLowerCase().includes('samesite')) {
      analysis.score += 1;
      const sameSiteMatch = cookie.toLowerCase().match(/samesite=(\w+)/);
      const sameSiteValue = sameSiteMatch ? sameSiteMatch[1] : 'unknown';
      console.log(`   ✅ ${cookieName}: SameSite=${sameSiteValue}`);
    } else {
      analysis.issues.push('缺少 SameSite 屬性');
      console.log(`   ❌ ${cookieName}: 缺少 SameSite 屬性`);
    }
    
    // 檢查 HttpOnly 標志
    if (cookie.toLowerCase().includes('httponly')) {
      analysis.score += 1;
      console.log(`   ✅ ${cookieName}: 包含 HttpOnly 標志`);
    } else {
      analysis.issues.push('缺少 HttpOnly 標志');
      console.log(`   ⚠️  ${cookieName}: 缺少 HttpOnly 標志 (某些情況下可能為正常)`);
    }
    
    // 檢查過期時間
    if (cookie.toLowerCase().includes('max-age') || cookie.toLowerCase().includes('expires')) {
      analysis.score += 1;
      console.log(`   ✅ ${cookieName}: 設定了過期時間`);
    } else {
      analysis.issues.push('缺少過期時間');
      console.log(`   ⚠️  ${cookieName}: 缺少過期時間 (Session Cookie)`);
    }
    
    // 檢查 Path 屬性
    if (cookie.toLowerCase().includes('path=')) {
      analysis.score += 1;
      const pathMatch = cookie.match(/path=([^;]+)/i);
      const pathValue = pathMatch ? pathMatch[1] : '/';
      console.log(`   ✅ ${cookieName}: Path=${pathValue}`);
    } else {
      analysis.issues.push('缺少 Path 屬性');
      console.log(`   ⚠️  ${cookieName}: 缺少 Path 屬性`);
    }
    
    results.push(analysis);
  }
  
  return results;
}

// 測試案例
const testCases = [
  {
    name: 'Captcha API Cookie 測試',
    url: `${BASE_URL}/api/captcha`,
    params: { t: Date.now() },
    expectedCookies: ['captcha']
  },
  {
    name: '登入 API Cookie 測試',
    url: `${BASE_URL}/api/auth/login`,
    method: 'POST',
    data: {
      username: 'test',
      password: 'test',
      captcha: '1234' // 這會失敗，但我們主要測試 Cookie 格式
    },
    expectedCookies: ['captcha'] // 清除 captcha cookie
  }
];

// 執行測試
async function runCookieTests() {
  let totalScore = 0;
  let maxTotalScore = 0;
  
  console.log(`開始執行 ${testCases.length} 個 Cookie 安全測試...\n`);

  for (const testCase of testCases) {
    try {
      console.log(`🧪 測試: ${testCase.name}`);
      console.log(`   URL: ${testCase.url}`);
      
      let response;
      if (testCase.method === 'POST') {
        response = await axios.post(testCase.url, testCase.data, {
          timeout: 10000,
          validateStatus: function (status) {
            return status < 500; // 接受所有非 5xx 錯誤
          }
        });
      } else {
        response = await axios.get(testCase.url, { 
          params: testCase.params,
          timeout: 10000,
          validateStatus: function (status) {
            return status < 500;
          }
        });
      }
      
      const setCookieHeader = response.headers['set-cookie'];
      if (setCookieHeader) {
        console.log(`   Set-Cookie 標頭: ${JSON.stringify(setCookieHeader)}`);
        
        const cookieAnalysis = analyzeCookieSecurity(setCookieHeader);
        
        for (const analysis of cookieAnalysis) {
          totalScore += analysis.score;
          maxTotalScore += analysis.maxScore;
          
          const percentage = Math.round((analysis.score / analysis.maxScore) * 100);
          console.log(`   📊 ${analysis.name} 安全分數: ${analysis.score}/${analysis.maxScore} (${percentage}%)`);
          
          if (analysis.issues.length > 0) {
            console.log(`   ⚠️  安全問題: ${analysis.issues.join(', ')}`);
          }
        }
      } else {
        console.log(`   ℹ️  此響應未設置 Cookie`);
      }
      
    } catch (error) {
      console.log(`   ❌ 請求失敗: ${error.message}`);
    }
    
    console.log('');
  }
  
  // 顯示總體結果
  console.log('==================================');
  const overallPercentage = maxTotalScore > 0 ? Math.round((totalScore / maxTotalScore) * 100) : 0;
  console.log(`📊 Cookie 安全總分: ${totalScore}/${maxTotalScore} (${overallPercentage}%)`);
  
  if (overallPercentage >= 80) {
    console.log('🎉 Cookie 安全性良好！');
    return true;
  } else if (overallPercentage >= 60) {
    console.log('⚠️  Cookie 安全性需要改善');
    return false;
  } else {
    console.log('❌ Cookie 安全性嚴重不足');
    return false;
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
  const success = await runCookieTests();
  process.exit(success ? 0 : 1);
}

// 執行測試
if (require.main === module) {
  main().catch(error => {
    console.error('測試執行錯誤:', error.message);
    process.exit(1);
  });
}

module.exports = { runCookieTests }; 