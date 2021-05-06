module.exports = recordMapper;

function recordMapper(record) {
  const { id, title, amount, ...rest } = record;
  return {
    id,
    title,
    amount,
    category: {
      name: rest.categoryName,
      id: rest.categoryId,
      type: {
        id: rest.typeId,
        name: rest.typeName,
        color: rest.typeColor,
      },
    },
  };
}
