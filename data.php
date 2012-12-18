<?php
$products[123] = array(
	'id'=>123,
	'title'=>'Product Title 1',
	'price'=>'1000',
	'description'=>'Product Description 1'
);
$products[534] = array(
	'id'=>534,
	'title'=>'Product Title 2',
	'price'=>'2000',
	'description'=>'Product Description 2'
);
$products[987] = array(
	'id'=>987,
	'title'=>'Product Title 3',
	'price'=>'3000',
	'description'=>'Product Description 3'
);
echo json_encode($products);
?>