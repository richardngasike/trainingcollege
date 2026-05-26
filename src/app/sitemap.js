export default function sitemap() {
  const base = "https://www.stjohnstc.ac.ke";
  const routes = [
    "", "/about", "/courses", "/departments", "/admissions",
    "/apply", "/news", "/gallery", "/student-life", "/contact",
    "/faq", "/staff", "/principal-message",
  ];
  return routes.map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1.0 : 0.8,
  }));
}
