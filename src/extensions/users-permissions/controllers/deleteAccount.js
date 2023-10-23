module.exports = ({}) => ({
    async deleteAccount(ctx) {
        const { user } = ctx.state;
        await strapi.plugins["users-permissions"].services.user.remove({ id: user.id });
        return ctx.send({ message: "Account deleted successfully" });
    },
});