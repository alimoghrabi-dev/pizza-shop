export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/profile/categories",
    "/profile/menu-items",
    "/profile/community",
    "/cart",
  ],
};
