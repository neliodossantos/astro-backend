const { Cart : CartModel } = require("../models/Cart");

exports.addItemToCart = async (req, res) => {
  try {
    const mesaId = req.body.mesaId;
    const productId = req.body.productId;
    const quantity = req.body.quantity;
    let cart = await CartModel.findOne({ mesaId });

    if (!cart) {
      cart = new CartModel({ mesaId });
    }
    const cartItem = cart.items.find((item) => item.productId.equals(productId));

    if (cartItem) {
      cartItem.quantity += quantity;
    } else {
      cart.items.push({ productId, quantity});
    }

    await cart.save();

    res.status(201).json({ message: 'Item adicionado com sucesso!' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to add item to cart' });
  }
};
exports.updateCartItem = async (req, res) => {
  try {
    const { itemId } = req.params;
    const { quantity } = req.body;
    const cart = await CartModel.findOneAndUpdate(
      { 'items._id': itemId },
      { $set: { 'items.$.quantity': quantity } }
    );

    if (!cart) {
      return res.status(404).json({ error: 'Item não foi encontrado no pedido' });
    }

    res.status(200).json({ message: 'Items carrinho actualizado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Falha ao actualizar o item do carrinho' });
  }
};
exports.removeCartItem = async (req, res) => {
  try {
    const { itemId } = req.params;

    const cart = await CartModel.findOneAndUpdate(
      {},
      { $pull: { items: { _id: itemId } } }
    );
    if (!cart) {
      return res.status(404).json({ error: 'Item não foi encontrado' });
    }
    res.status(200).json({ message: 'O item do Carrinho foi removido com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Falha ao remover o item do carrinho' });
  }
};
