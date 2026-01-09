<?php

/** @var \Laravel\Lumen\Routing\Router $router */

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function () {
    return 'Cart Service Database Ready!';
});

$router->group(['prefix' => 'carts'], function () use ($router) {
    $router->get('/', 'CartController@index');
    $router->post('/', 'CartController@store');
    $router->put('/{id}', 'CartController@update'); // Fitur update
    $router->delete('/{id}', 'CartController@destroy');
});

