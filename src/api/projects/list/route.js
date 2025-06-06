async function handler({ type }) {
  if (!type || !["app", "website"].includes(type)) {
    return { error: "Invalid project type" };
  }

  try {
    const projects = await sql`
      SELECT * FROM projects 
      WHERE type = ${type}
      ORDER BY created_at DESC
    `;

    return { projects };
  } catch (error) {
    return { error: "Failed to fetch projects" };
  }
}
export async function POST(request) {
  return handler(await request.json());
}