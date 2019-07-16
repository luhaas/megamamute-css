$(document).ready(function() {
	$('.HomeRoute .mega-oferta .list li:nth-child(2)').addClass('current');
	$('.HomeRoute .mega-oferta .jcarousel-control-prev').on('click', function(){
		$('.HomeRoute .mega-oferta .list li.current').removeClass('current').prev().addClass('current');
	});
	$('.HomeRoute .mega-oferta .jcarousel-control-next').on('click', function(){
		$('.HomeRoute .mega-oferta .list li.current').removeClass('current').next().addClass('current');
	});
});