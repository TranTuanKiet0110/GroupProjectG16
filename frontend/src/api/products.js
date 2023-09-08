const products = [
  {id: 1, name: 'Computer', description: 'You can use it to learn or play', price: 1000, dateadd: '03/08/2023', sellerId: 1, categoryId: 1},
  {id: 2, name: 'Phone', description: 'You can use it to call your friends', price: 700, dateadd:'04/08/2023', sellerId: 1, categoryId: 4},
  {id: 3, name: 'Book', description: 'You can use it to study', price: 100, dateadd: '05/08/2023', sellerId: 1, categoryId: 2},
  {id: 4, name: 'TV', description: 'You can use it to entertain yourself', price: 1200, dateadd: '06/08/2023', sellerId: 2},
  {id: 5, name: 'Bike', description: 'You can use it to get fit', price: 500, dateadd: '07/08/2023', sellerId: 1, categoryId: 3},
  {id: 6, name: 'Watch', description: 'You can use it to not be late', price: 300, dateadd: '08/08/2023', sellerId: 2},
  {id: 7, name: 'King Kong T-Shirt', description: 'You can use it to wear', price: 300, dateadd: '08/08/2023', sellerId: 2, categoryId: 4},

];

const categories = [
  {categoryId: 1, name: 'Electric', additionalAttr: [{color: ''}],},
  {categoryId:2, name: 'Book', additionalAttr: [{type: ''}],},
  {categoryId: 3, name: 'Vehicle', additionalAttr: [{material: ''}],},
  {categoryId: 4, name: 'Fashion', additionalAttr: [{size: ''}],},
];
export default categories;


export function getAllProducts() {
  return products;
}

export function getProductById(id) {
  return products.find((product) => product.id === id);
}

export function addProduct(newProduct) {
  // Add validation and logic to add a new product here
  products.push(newProduct);
}

export function updateProduct(updatedProduct) {
  // Add validation and logic to update a product here
  const index = products.findIndex((product) => product.id === updatedProduct.id);
  if (index !== -1) {
    products[index] = updatedProduct;
  }
}

export function deleteProduct(id) {
  // Add validation and logic to delete a product here
  const index = products.findIndex((product) => product.id === id);
  if (index !== -1) {
    products.splice(index, 1);
  }
}