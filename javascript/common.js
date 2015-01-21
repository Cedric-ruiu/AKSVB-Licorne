$(document).ready(function()
{
    var cwindow = $(window);
    var action = false;
    var header = $('#header');
    var control_menu_mobile = $('#control-menu-mobile');
    var header_menu = $("#header-menu");
    

    /* ==========================================================================
        PLACEHOLDER SUPPORT
       ========================================================================== */
    
    // Ajoute la fonctionnalité placeholder des formulaires pour les navigateurs ne le supportant pas
    if(!Modernizr.input.placeholder)
    {
        $('input').placeholder();
    }


    /* ==========================================================================
        MENU
       ========================================================================== */

    // Ajout d'une classe sur le boutton du menu correspondant à la page courante
    if(typeof(menu_active)!='undefined')
    {
        $(menu_active).addClass('on');
    }

    // open/close menu mobile
    var method_menu_mobile = '';
    control_menu_mobile.on('click', function() {
        method_menu_mobile = ($(this).hasClass('on')) ? 'slideUp' : 'slideDown';
        $('#header-menu').velocity(method_menu_mobile, { duration: 500 })
        $(this).toggleClass('on');
    });

    // close menu mobile when click on item
    $('#header-menu li').on('click', function()
    {
        if(control_menu_mobile.hasClass('on'))
        {
            control_menu_mobile.click();
        }
    });
    
    // open/close menu lang
    $('#control-lang').on('click', function() {
        $(this).toggleClass('on');
    });


    /* ==========================================================================
       FitVids - MAKE RESPONSIVE VIDEO
       ========================================================================== */

    $("#main").fitVids();


    /* ==========================================================================
        ADDITIONNAL EVENT BOX & FORM
       ========================================================================== */

    // Ferme le div parent lors d'un clique sur un bouton possédant la classe 'close'
    $('.close').on('click', function()
    {
        $(this).parent().fadeOut();
    });

    // Evite qu'un formulaire soit soumis plusieurs fois et ajoute une classe 'on' sur le boutton submit
    $('form').submit(function()
    {
        if(action===false)
        {
            action = true;
            $(this).addClass('on');
        }
        else
        {
            return false;
        }
    });


    /* ==========================================================================
        GMAPS
       ========================================================================== */
    
    // Instanciation de la carte
    var map = new GMaps({
        scrollwheel: false,
        draggable: false,
        div: '#gmaps',
        lat: 48.5680081,
        lng: 7.7551335
    });

    // Ajout d'un marqueur
    var marker = map.addMarker({
        lat: 48.566542,
        lng: 7.7551067,
        title: 'Salle de AKSVB à l\'école du Neufeld',
        infoWindow: {
            content: '<div class="info" style="width:200px;"><div class="aksvb-logo-min-r"></div><p class="font-bold">Ecole du Neufeld</p><p>1, rue de Sundgau<br>67000 Strasbourg</p><a target="_blank" href="https://www.google.fr/maps/place/Ecole+du+Neufeld/@48.5658764,7.7566517,16z/data=!4m2!3m1!1s0x0:0xabba55e97668c48">Voir le plan complet</a></div>',
            maxWidth: 250
        }
    });

    // Ouvre le marqueur au chargement de la page
    marker.infoWindow.open(marker.map, marker);


    /* ==========================================================================
       Smooth Scrolling Anchor
       ========================================================================== */

    $('a[href*=#]:not([href=#])').click(function(e)
    {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') 
            || location.hostname == this.hostname)
        {
            var href = $(this).attr("href");
            var offset_top;

            // manual config target
            switch(href) 
            { 
                case "#m-contact": 
                    offset_top = $(href).offset().top-header_menu_height+1;
                    break; 
                default: 
                    offset_top = $(href).offset().top-header_menu_height_comfort+1;
                    break; 
            }

            $('html,body').velocity(
                'scroll', 
                {offset: offset_top, duration: 500}
            );

            if(e.preventDefault) e.preventDefault();
            e.returnValue = false;
        }
    });


    /* ==========================================================================
       Affix menu
       ========================================================================== */

    // Cache selectors
    var lastId,
        slideshow_height = $('#slideshow').outerHeight(),
        header_menu_height = 60,
        header_menu_height_comfort = header_menu_height + 40, // header menu mobile size + margin comfort
        // All list items
        menu_items = header_menu.find("a"),
        // Anchors corresponding to menu items
        scrollItems = menu_items.map(function()
        {
            var item = $($(this).attr("href"));
            if (item.length) { return item; }
        });

    // Bind to scroll
    cwindow.scroll(function()
    {
        // Get container scroll position
        var from_top = cwindow.scrollTop();
        var from_top_menu = from_top + header_menu_height_comfort;

        // fixed menu
        if(from_top > slideshow_height) header.addClass('fixed');
        else header.removeClass('fixed');

        // Get id of current scroll item
        var cur = scrollItems.map(function()
        {
            if ($(this).offset().top < fromTopMenu) return this;
        });

        // Get the id of the current element
        cur = cur[cur.length-1];
        var id = cur && cur.length ? cur[0].id : "";

        if (lastId !== id)
        {
            lastId = id;
            // Set/remove active class
            menu_items
            .parent().removeClass("on")
            .end().filter("[href=#"+id+"]").parent().addClass("on");
        }                   
    });

});


window.onload = function() 
{
    /* ==========================================================================
       Slideshow
       ========================================================================== */

    var slideshow = $('#slideshow');

    if(slideshow.length)
    {
        slideshow.bxSlider({controls:false, auto:true, pause:6500});
    }
}
