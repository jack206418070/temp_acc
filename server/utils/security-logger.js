import fs from 'fs'
import path from 'path'

// 安全日誌記錄器
class SecurityLogger {
  constructor() {
    this.logDir = path.join(process.cwd(), 'logs')
    this.ensureLogDir()
  }

  ensureLogDir() {
    if (!fs.existsSync(this.logDir)) {
      fs.mkdirSync(this.logDir, { recursive: true })
    }
  }

  logSuspiciousActivity(activity) {
    const logFile = path.join(this.logDir, 'security.log')
    const timestamp = new Date().toISOString()
    
    const logEntry = {
      timestamp,
      type: 'SUSPICIOUS_ACTIVITY',
      ...activity
    }

    const logLine = JSON.stringify(logEntry) + '\n'

    // 異步寫入日誌文件
    fs.appendFile(logFile, logLine, (err) => {
      if (err) {
        console.error('Failed to write security log:', err)
      }
    })

    // 同時輸出到控制台（僅在開發環境）
    if (process.env.NODE_ENV === 'development') {
      console.warn('🚨 Security Alert:', logEntry)
    }
  }

  logErrorActivity(error, request) {
    const logFile = path.join(this.logDir, 'errors.log')
    const timestamp = new Date().toISOString()
    
    const logEntry = {
      timestamp,
      type: 'ERROR',
      statusCode: error.statusCode || 500,
      message: error.message,
      path: request.url,
      method: request.method,
      userAgent: request.headers['user-agent'] || 'Unknown',
      ip: this.getClientIP(request),
      referer: request.headers.referer || 'None'
    }

    const logLine = JSON.stringify(logEntry) + '\n'

    // 異步寫入日誌文件
    fs.appendFile(logFile, logLine, (err) => {
      if (err) {
        console.error('Failed to write error log:', err)
      }
    })
  }

  getClientIP(request) {
    return request.headers['x-forwarded-for'] ||
           request.headers['x-real-ip'] ||
           request.connection.remoteAddress ||
           request.socket.remoteAddress ||
           'Unknown'
  }

  // 檢查是否為重複攻擊（用於防護）
  checkRepeatedAttacks(ip, timeWindow = 300000) { // 5分鐘窗口
    const logFile = path.join(this.logDir, 'security.log')
    
    if (!fs.existsSync(logFile)) {
      return false
    }

    try {
      const logs = fs.readFileSync(logFile, 'utf8')
      const lines = logs.trim().split('\n')
      const recentLogs = lines
        .filter(line => line.trim())
        .map(line => {
          try {
            return JSON.parse(line)
          } catch {
            return null
          }
        })
        .filter(log => log && log.ip === ip)
        .filter(log => {
          const logTime = new Date(log.timestamp).getTime()
          const now = Date.now()
          return (now - logTime) < timeWindow
        })

      // 如果5分鐘內有超過10次可疑活動，視為重複攻擊
      return recentLogs.length > 10
    } catch (error) {
      console.error('Error checking repeated attacks:', error)
      return false
    }
  }

  // 清理舊日誌（防止日誌文件過大）
  cleanupOldLogs(daysToKeep = 30) {
    const cutoffTime = Date.now() - (daysToKeep * 24 * 60 * 60 * 1000)
    
    const logFiles = ['security.log', 'errors.log']
    
    logFiles.forEach(filename => {
      const logFile = path.join(this.logDir, filename)
      
      if (!fs.existsSync(logFile)) return
      
      try {
        const logs = fs.readFileSync(logFile, 'utf8')
        const lines = logs.trim().split('\n')
        
        const recentLines = lines.filter(line => {
          if (!line.trim()) return false
          
          try {
            const log = JSON.parse(line)
            const logTime = new Date(log.timestamp).getTime()
            return logTime > cutoffTime
          } catch {
            // 保留無法解析的行
            return true
          }
        })
        
        if (recentLines.length < lines.length) {
          fs.writeFileSync(logFile, recentLines.join('\n') + '\n')
          console.log(`Cleaned up ${filename}: removed ${lines.length - recentLines.length} old entries`)
        }
      } catch (error) {
        console.error(`Error cleaning up ${filename}:`, error)
      }
    })
  }
}

// 創建單例實例
const securityLogger = new SecurityLogger()

// 添加安全事件記錄方法（為了與 http-security.js 兼容）
securityLogger.logSecurityEvent = function(event) {
  const logFile = path.join(this.logDir, 'security.log')
  const timestamp = new Date().toISOString()
  
  const logEntry = {
    timestamp,
    ...event
  }

  const logLine = JSON.stringify(logEntry) + '\n'

  // 異步寫入日誌文件
  fs.appendFile(logFile, logLine, (err) => {
    if (err) {
      console.error('Failed to write security log:', err)
    }
  })

  // 同時輸出到控制台
  console.warn(`🚨 Security Alert [${event.severity || 'MEDIUM'}]:`, logEntry)
}

// 定期清理舊日誌（每天一次）
setInterval(() => {
  securityLogger.cleanupOldLogs()
}, 24 * 60 * 60 * 1000)

// 同時提供默認導出和命名導出
export default securityLogger
export { securityLogger } 