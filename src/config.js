export default {
  assetBasePath: process.env.NODE_ENV === 'development'
    ? '/assets'
    : 'https://s3-us-west-2.amazonaws.com/phlntn-com/emojibuilder/assets',
  compSize: 128,
};