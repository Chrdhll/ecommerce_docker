<?php

$router->get('/cart', function () use ($router){
    return 'Cart Service is running';
});

//dummy cart data
$carts = [
    'items' => [
        [
            'id' => 1,
            'name' => 'Product A',
            'quantity' => 2,
            'price' => 50.00
        ],
        [
            'id' => 2,
            'name' => 'Product B',
            'quantity' => 1,
            'price' => 30.00
        ],
        [
            'id' => 3,
            'name' => 'Product C',
            'quantity' => 1,
            'price' => 50.00
        ]
        
    ],
    'total' => 130.00
];

//get all charts
$router->get('/carts', function () use ($carts){
    return response()->json($carts['items']);
});

$router->get('/carts/{id}', function ($id) use ($carts) {
    foreach ($carts['items'] as $item){
        if($item['id'] == $id){
            return response()->json($item);
        }
    }
    return response()->json(['message' => 'Item not found'], 404);
    
});

$router->delete('/carts/{id}', function ($id) use (&$carts) {

    foreach ($carts['items'] as $index => $item) {
        if ($item['id'] == $id) {
            // Hapus item
            unset($carts['items'][$index]);

            // Reset array index
            $carts['items'] = array_values($carts['items']);

            return response()->json([
                'message' => 'Item deleted successfully'
            ], 200);
        }
    }

    return response()->json([
        'message' => 'Item not found'
    ], 404);
});


?>
