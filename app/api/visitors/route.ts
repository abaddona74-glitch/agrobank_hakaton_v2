let count = 12500;

export async function GET() {
  // Increment a simple in-memory counter (resets on redeploy). Hybrid: can be swapped for DB later.
  count += 1;
  return Response.json({ count });
}
