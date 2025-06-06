async function handler({ title, description, type, image_url, url }) {
  if (!title || !type || !["app", "website"].includes(type)) {
    return { error: "Invalid input parameters" };
  }

  try {
    const [project] = await sql`
      INSERT INTO projects (title, description, type, image_url, url)
      VALUES (${title}, ${description}, ${type}, ${image_url}, ${url})
      RETURNING *
    `;

    return { project };
  } catch (error) {
    return { error: "Failed to create project" };
  }
}
export async function POST(request) {
  return handler(await request.json());
}