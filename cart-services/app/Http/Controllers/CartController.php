<?php

namespace App\Http\Controllers;

use App\Models\CartItem;
use Illuminate\Http\Request;

class CartController extends Controller
{
    public function index()
    {
        $items = CartItem::all();
        $total = $items->sum(fn ($item) => $item->price * $item->quantity);

        return response()->json([
            'data' => $items,
            'total_cart_value' => $total
        ]);
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'product_name' => 'required',
            'quantity' => 'required|integer|min:1',
            'price' => 'required|numeric'
        ]);

        $cart = CartItem::create($request->all());
        return response()->json($cart, 201);
    }

    public function update(Request $request, $id)
    {
        $cart = CartItem::find($id);
        if (!$cart) {
            return response()->json(['message' => 'Not found'], 404);
        }

        $cart->update($request->all());
        return response()->json($cart);
    }

    public function destroy($id)
    {
        $cart = CartItem::find($id);
        if (!$cart) {
            return response()->json(['message' => 'Not found'], 404);
        }

        $cart->delete();
        return response()->json(['message' => 'Item deleted']);
    }
}
