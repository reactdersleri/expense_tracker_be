module.exports = recordMapper;

function recordMapper({ id, title, amount, ...rest }) {
  return {
    id,
    title,
    amount,
    category: {
      id: rest.categoryId,
      name: rest.categoryName,
      type: rest.type,
      color: rest.color,
    },
  };
}
