module.exports = () => ({
  upload: {
    config: {
      provider: "aws-s3",
      providerOptions: {
        s3Options: {
          accessKeyId: "AKIAXGPKCO65VO7A2ZMS",
          secretAccessKey: "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",
          region: "us-west-1",
          params: {
            ACL: "public-read",
            signedUrlExpires: 15 * 60,
            Bucket: "pawpy-bucket",
          },
        },
      },
    },
  },
});
