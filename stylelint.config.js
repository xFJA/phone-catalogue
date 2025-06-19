module.exports = {
  rules: {
    // Allow BEM: block, block__element, block--modifier, block__element--modifier
    'selector-class-pattern': '^[a-z]([a-z0-9]*)(-[a-z0-9]+)*(__[a-z0-9]+)?(--[a-z0-9]+)?$',
  },
};
