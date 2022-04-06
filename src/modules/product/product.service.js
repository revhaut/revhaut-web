class ProductService {
  generateProductRef() {
    let result = '';
    let length = 5;
    const Characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const CharactersLength = Characters.length;

    // NOTE: Max Length Allowed Is 500...
    if (length >= 500) {
      length = 500;
    }
    // Shuffle The Characters String According To The Passed In The Length...
    for (let index = 0; index < length; index++) {
      result += Characters.charAt(Math.floor(Math.random() * CharactersLength));
    }

    // Return The Generated String...
    return result;
  }
}

module.exports = new ProductService();
