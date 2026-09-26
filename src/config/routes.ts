export const routeCatalog = [
  { key: "home", path: "/", index: true },
  { key: "shop", path: "/shop", index: true },
  { key: "about", path: "/about", index: true },
  { key: "whyChooseUs", path: "/why-choose-us", index: true },
  { key: "chairmanMessage", path: "/chairman-message", index: true },
  { key: "contact", path: "/contact", index: true },
  { key: "terms", path: "/terms", index: true },
  { key: "privacy", path: "/privacy", index: true },
  { key: "shipping", path: "/shipping", index: true },
  { key: "returns", path: "/returns", index: true },
  { key: "disclaimer", path: "/disclaimer", index: true },
  { key: "cart", path: "/cart", index: true },
  { key: "categories", path: "/categories", index: true },
  { key: "product", path: "/product/[slug]", index: false },
  { key: "articles", path: "/articles", index: true },
  { key: "article", path: "/articles/[slug]", index: false },
  { key: "orderForm", path: "/order-form", index: true },
  { key: "connectWithAssociate", path: "/connect-with-associate", index: true },
  { key: "consultDietician", path: "/consult-dietician", index: true },
  { key: "login", path: "/login", index: true },
  { key: "forgotPassword", path: "/forgot-password", index: true },
  { key: "customerRegister", path: "/customer/register", index: true },
  { key: "paymentSuccess", path: "/payment/success", index: true },
  { key: "paymentFailure", path: "/payment/failure", index: true },
  { key: "dieticianLogin", path: "/dietician/login", index: true },
  { key: "wellnessHub", path: "/wellness-hub", index: true },
  { key: "wellnessHubAbout", path: "/wellness-hub/about", index: true },
  { key: "wellnessHubConcept", path: "/wellness-hub/concept", index: true },
  { key: "wellnessHubServices", path: "/wellness-hub/services", index: true },
  {
    key: "wellnessHubService",
    path: "/wellness-hub/services/[slug]",
    index: false,
  },
  { key: "wellnessHubProducts", path: "/wellness-hub/products", index: true },
  {
    key: "wellnessHubConsultation",
    path: "/wellness-hub/consultation",
    index: true,
  },
  { key: "wellnessHubFranchise", path: "/wellness-hub/franchise", index: true },
  {
    key: "wellnessHubDistributor",
    path: "/wellness-hub/distributor",
    index: true,
  },
  { key: "wellnessHubLocate", path: "/wellness-hub/locate", index: true },
  { key: "wellnessHubStories", path: "/wellness-hub/stories", index: true },
  { key: "wellnessHubEvents", path: "/wellness-hub/events", index: true },
  { key: "wellnessHubTraining", path: "/wellness-hub/training", index: true },
  { key: "wellnessHubBlog", path: "/wellness-hub/blog", index: true },
  { key: "wellnessHubContact", path: "/wellness-hub/contact", index: true },
  { key: "wellnessHubLogin", path: "/wellness-hub/login", index: true },
] as const;

export type RouteKey = (typeof routeCatalog)[number]["key"];

export function getRoute(routeKey: RouteKey) {
  const route = routeCatalog.find((item) => item.key === routeKey);
  if (!route) {
    throw new Error(`Unknown route: ${routeKey}`);
  }
  return route;
}
