module.exports = recordMapper;

function recordMapper({ id, title, amount, createdAt, updatedAt, ...rest }) {
  return {
    id,
    title,
    amount,
    createdAt,
    updatedAt,
    category: {
      id: rest.categoryId,
      name: rest.categoryName,
      type: rest.type,
      color: rest.color,
    },
  };
}
