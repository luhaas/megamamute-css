function removeItem() {
	// remove faceta ao clicar nos filtros selecionas fake
	$(' body').on('click', '.wd-browsing-grid .selected-filters-fake .clear-filter', function(){
		var dataURL = $(this).closest('.selected-option').data('url');
		$('.wd-facet-group .selected-facets .selected-option[data-url="'+ dataURL +'"] .clear-filter').click();
	});
}

function cloneFilters() {
	// clona facetas selecionadas e adiciona dentro da div .selected-filters-fake
	$('.wd-browsing-grid .selected-filters-fake').html($('.wd-facet-group .selected-facets.show').html());
}


$(document).ready(function(){
	
	// Ação do +/- da faceta fake de categoria
	$('#left .wd-category-menu .selected > ul > li > h4 .icon').on('click', function(){ 
		$(this).closest('li').toggleClass('active'); 
	});
	
	$(' body').on('onFacetingComplete', function(){
		cloneFilters();
		removeItem();
	});
	
	$(' body').on('onBuildFacetingComplete', function(){
		cloneFilters();
		removeItem();
	});
	
	removeItem();
});
