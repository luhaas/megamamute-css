$(document).ready(function(){

	// abre/fecha o menu hamburguer - MOBILE
	$('header .hamburguer > .icon,.category-menu-small .has-children h3,.cms-page-menu h2').on('click', function(){
		$(this).parent().toggleClass('active');
	});
	
	// move banners para o menu horizontal
	$('.main-category .level-1 .menu-wrapper').each(function(index, item){
		$(item).append($('#mainmenu-area #categoria-'+(index+1)));
	});
	
	// move banners para o menu todas categorias
	$('.all-category .level-1 .menu-wrapper').each(function(index, item){
		$(item).append($('#allmenu-area #category-'+(index+1)));
	});
	
	// abre/fecha as facetas - MOBILE
	$('#showFacets').on('click', function(){
		$(this).toggleClass('active');
		$('#left').toggleClass('active');
		// manipula overlay
		$('#overlay').toggleClass('hide');
	});
	// manipula overlay
	$('.category-bar .all-category, .category-bar .main-category .level-1 > .has-children')
	.on('mouseover', function(){
		$('#overlay').removeClass('hide');
	})
	.on('mouseout', function(){
		$('#overlay').addClass('hide');
	});
	
	// Adiciona seta ao banner
	if($('.wd-marketing-banner.slider').length){
		$('.wd-marketing-banner.slider').append('<div class="nav-control"><a href="#" class="previous"><i class="fas fa-chevron-left"></i></a><a href="#" class="next"><i class="fas fa-chevron-right"></i></a></div>');
		$('.nav-control a').on('click', function(e){
			e.preventDefault();
			var direction = $(this).attr('class');
			if(direction == 'previous'){
				if ($('.slider-controller li.current').prev().length){
					$('.slider-controller li.current').prev().click();
				}else {
					$('.slider-controller li:last').click();
				}
			} else {
				if ($('.slider-controller li.current').next().length){
					$('.slider-controller li.current').next().click();
				}else {
					$('.slider-controller li:first').click();
				}
			}
		});
	}
	
	// remove item do resumo do carrinho	
	$('body').on('click', '.summaryheader-products .remove', function() {
		var basketItemID = $(this).data('basket-item-id');
		$.ajax({
			url: '/carrinho/remover-produto',
			type: 'post',
			data: {
				BasketItemID: basketItemID
			}
		}).done(function() {
			$.publish('/checkout/basket/changed');			
		});
	});
	
	
	// atualiza o hamburguer e a mensagem de boas vindas quando cliente se loga
	if(browsingContext.Common.ready){
		if (browsingContext.Common.Shopper.IsAuthenticated) {
			$('.welcome-shopper .text-hello').html('Olá, '+ browsingContext.Common.Shopper.Name);
			$('.welcome-shopper .authenticated').removeClass('hide');
			$('.welcome-shopper .unauthenticated').addClass('hide');
			
			$('.hamburguer .autenticated').removeClass('hide');
			$('.hamburguer .unautenticated').addClass('hide');
		} else {
			$('.welcome-shopper .authenticated').addClass('hide');
			$('.welcome-shopper .unauthenticated').removeClass('hide');
		}
	}
	
	// CATEGORY ROUTE
	// Valida se há banner associado na descrição
	$('body.category-route .page-description .wd-marketing-banner').closest('.page-description').addClass('hasBanner');
	$('body.category-route #full-description .wd-marketing-banner').closest('#full-description').addClass('hasBanner');
	$('body.category-route .page-description:not(.hasBanner)').closest('#middle').addClass('wrapper');
	$('body.category-route .page-description:not(.hasBanner)').closest('#middle').prepend($('.wd-browsing-breadcrumbs'));
	
	// seleciona exibicao de 3 ou 4 produtos no grid
	$('body').on('click', '.select-grid > div', function(){
		$('.select-grid > div').toggleClass('selected');
		$('.wd-browsing-grid-list').toggleClass('four-columns');
	});
	
	// trigger para abrir menu e detalhe do produto flutuantes
	var startPosition = 0;
	$(window).trigger("scroll").scroll(function () {
		var $window = $(this),
			$body = $("body:not(.area-profile,.BasketIndexRoute) #header .header-content");
		
		var $position = $window.scrollTop();
		if ($position >= 100){
			$body.addClass('scrolling');
			if ($position <= startPosition) {
				$body.addClass('scrolling-top');
			} else {
				$body.removeClass('scrolling-top');
			}
			startPosition = $position;
		} else {
			$body.removeClass('scrolling');
			$body.removeClass('scrolling-top');
		}
	});
	
	$('header .hamburguer .icon').on('click', function(){
		$('body').toggleClass('menu-opened');
		$(".hamburguer").removeClass('fechado');
	});
	
	$(".close-icon .close-hamburguer").on("click", function(){
	$("body").removeClass("menu-opened");
	$(".hamburguer").removeClass("active");
	$(".hamburguer").addClass('fechado');
});
});