module.exports = {
    routes: [
        {
            method: "DELETE",
            path: "/delete-account/:id",
            handler: "user.deleteAccount",
        },
    ],
};