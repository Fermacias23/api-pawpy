const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "plugin::users-permissions.user",
  ({ strapi }) => ({
    async delete(ctx) {
      const { user } = ctx.state;

      await strapi.query("user", "users-permissions").delete({ id: user.id });

      return ctx.send({ message: "Account deleted successfully" });
    },
  })
);
