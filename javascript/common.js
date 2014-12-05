$(document).ready(function()
{
    var action = false;
    

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

    var method_menu_mobile = '';
    $('#control-menu-mobile').on('click', function() {
        method_menu_mobile = ($(this).hasClass('on')) ? 'slideUp' : 'slideDown';
        $('#header-menu').velocity(method_menu_mobile, { duration: 500 })
        $(this).toggleClass('on');
    });
    
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

    $('a[href*=#]:not([href=#])').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') 
            || location.hostname == this.hostname) {

            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
                if (target.length) {
                    $('html,body').velocity(
                        'scroll', 
                        {offset: target.offset().top, duration: 1000}
                    );
                return false;
            }
        }
    });


    /* ==========================================================================
        EVENTS
       ========================================================================== */

    var method_slide_event = '';
    var c_event = null;
    $('#events li:not(.empty)').on('click', function() {
        c_event = $(this);
        method_slide_event = (c_event.hasClass('on')) ? 'slideUp' : 'slideDown';
        c_event.children('.content').velocity(method_slide_event, { duration: 500 });
        c_event.toggleClass('on');
    });
});


window.onload = function() 
{
    /* ==========================================================================
       Slideshow
       ========================================================================== */

    if($('#slideshow').length)
    {
        $('#slideshow').bxSlider({controls:false, auto:true, pause:6500});
    }


    /* ==========================================================================
       VERTICALLY CENTER FLOATING DIV
       ========================================================================== */

    var current_height = 0;
    var current_width  = 0;
    var brother_height = 0;

    $( window ).resize(function() {
        parse_center_div_float();
    });

    parse_center_div_float();
    
    function parse_center_div_float()
    {
        $('.grid-center-l').each(function(){ center_div_float($(this), $(this).next()); });
        $('.grid-center-r').each(function(){ center_div_float($(this), $(this).prev()); });
    }
    
    function center_div_float(current, brother)
    {
        current_width = parseFloat(current.css('width')) + parseFloat(current.css('padding-left')) + parseFloat(current.css('padding-right'));
        parent_width = parseFloat(current.parent().css('width')) + parseFloat(current.parent().css('padding-left')) + parseFloat(current.parent().css('padding-right'));
        if(1 > (current_width / parseFloat(current.parent().css('width'))) )
        {
            current_height = current.outerHeight();
            brother_height = brother.outerHeight();

            if(current_height < brother_height)
            {
                current.css('margin-top', ((brother_height - current_height) / 2) +'px' );
            }
            else
            {
                current.css('margin-top', 0);
            }
        }
        else
        {
            current.css('margin-top', 0);
        }
    }
}
