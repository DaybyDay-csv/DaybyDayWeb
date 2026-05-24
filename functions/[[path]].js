export async function onRequest(context) {
  const path = new URL(context.request.url).pathname;
  
  // If it's a file request (has extension), let it through
  if (path.includes('.')) {
    return context.next();
  }
  
  // For SPA routes, serve index.html
  return context.next({ request: new Request("https://" + new URL(context.request.url).host + "/index.html", context.request) });
}
