export function formatDate(date) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function validateEmail(email) {
  const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return re.test(email);
}

export function validatePhoneNumber(phoneNumber) {
  const re = /^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$/;
  return re.test(phoneNumber);
}

export function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

export function slugify(input) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "-") // Replace all characters except lowercase letters and numbers with hyphens
    .replace(/-+/g, "-") // Replace multiple consecutive hyphens with a single hyphen
    .replace(/^-|-$/g, "") // Remove leading and trailing hyphens
    .slice(0, 200); // Limit the length to 200 characters
}

export async function isUniqueAcrossAllDocuments(slug, context) {
  const { document, getClient } = context;
  const client = getClient({ apiVersion: "2022-12-07" });
  const id = document._id.replace(/^drafts\./, "");
  const params = {
    draft: `drafts.${id}`,
    published: id,
    slug,
  };
  const query = `!defined(*[!(_id in [$draft, $published]) && slug.current == $slug][0]._id)`;
  const result = await client.fetch(query, params);
  return result;
}
