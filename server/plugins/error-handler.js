// 集中記錄伺服器錯誤；不改寫回應內容(production 由 Nitro 回通用訊息)
export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('error', (error, { event }) => {
    const path = event?.path ?? '(unknown)';
    const code = error?.statusCode ?? 500;
    // 僅記錄於 server 端，避免機密/除錯資訊外洩到回應
    console.error(`[server-error] ${code} ${path} :: ${error?.message ?? error}`);
  });
});
