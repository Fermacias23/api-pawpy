module.exports = {
  routes: [
    {
      method: "DELETE",
      path: "/users/:id",
      handler: "user.delete",
      config: {
        policies: [],
      },
    },
  ],
};
