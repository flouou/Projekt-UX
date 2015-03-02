$(document).ready(function(){
    
    //MapButtonRight
    $('#mapButtonRight').on('click',toggleStart);
    
    $('#mapButtonRight').on('swipeleft',function(){
        if($('#mapButtonRight i').hasClass('ion-map')){
            toggleStart();
        }    
    });
    
    $('#mapButtonRight').on('swiperight',function(){
        if($('#mapButtonRight i').hasClass('ion-navicon-round')){
            toggleStart();
        }
    });
    
    $('#start').on('swipeleft',toggleStart);
    
    //MapButtonLeft
    $('#mapButtonLeft').on('click',toggleSearch);
    
    $('#mapButtonLeft').on('swipeleft',function(){
        if($('#mapButtonLeft i').hasClass('ion-search')){
            toggleSearch();
        }    
    });
    
    $('#mapButtonLeft').on('swiperight',function(){
        if($('#mapButtonLeft i').hasClass('ion-map')){
            toggleSearch();
        }
    });
    
    $('#options').on('swiperight',toggleSearch);
    
    $('.sideButton:first').on('click',toggleBoth);
    
    function toggleBoth(){
        toggleStart();
        toggleSearch();
    }
    
    function toggleStart(){
        $('#start').toggleClass('swipeToLeft100');
        $('#mapButtonRight').toggleClass('swipeTo0px');
        $('#mapButtonRight i').toggleClass('ion-map');
        $('#mapButtonRight i').toggleClass('ion-navicon-round');
        $('#map').toggleClass('swipeTo0px');
        $('#options').toggleClass('swipeTo100');
        $('#mapButtonLeft').toggleClass('swipeTo80');
    }
    
    function toggleSearch(){
        toggleStart();
        $('#start').toggleClass('swipeToLeft200');
        $('#mapButtonRight').toggleClass('swipeToLeft100');
        $('#mapButtonLeft i').toggleClass('ion-map');
        $('#mapButtonLeft i').toggleClass('ion-search');
        $('#map').toggleClass('swipeToLeft100');
        $('#options').toggleClass('swipeTo15');
        $('#mapButtonLeft').toggleClass('swipeTo0px');
        
    }
    
    $( "#suchbegriff" ).autocomplete({
        source: [ 
            "Ritterstraße 16", 
            "Rintheimer Straße 19", 
            "Sophienstraße 128", 
            "Waldstraße 15", 
            "Kaiserallee 61", 
            "Kriegsstraße 100", 
            "Luisenstraße 23",
            "Moltkrestraße",
            "Bahnhofsplatz West",
            "Durlacher Allee 10",
            "Gottesauer Platz",
            "Englerstraße",
            "Hertzstraße",
            "Kurzheckweg",
            "Blumentorstraße",
            "Steinstraße",
            "Hans-Thoma-Straße",
            "Hermann-Leichtlin-Straße",
            "Stephanienstraße",
            "Am Staatstheater",
            "Kongresszentrum PH1",
            "Kongresszentrum PH2",
            "Luisenstraße",
            "Herrenstraße / Zirkel",
            "Kreuzstraße (C&A)",
            "Kronenplatz",
            "Passagehof",
            "Schlossplatz",
            "Zirkel (P&C)",
            "Ettlinger Tor",
            "Friedrichsplatz",
            "Industrie- und Handelskammer (IHK)",
            "Karstadt",
            "Landesbibliothek",
            "Marktplatz",
            "Mendelssohnplatz (Scheck-In)",
            "Akademiestraße",
            "Ludwigsplatz",
            "Duale Hochschule Baden-Württemberg (DHBW)",
            "Filmpalast"
        ]
    });
    
    /*window.onresize= function(){
        document.getElementById("content").style.height = window.innerHeight + 'px';
		map.invalidateSize(); // relevant to your leaflet map to trigger resizing / redrawing /filling.
    };*/
    
    
    //shake event
    var myShakeEvent = new Shake({
        threshold: 15,
        timeout: 1000 
    });
    
    myShakeEvent.start();
    
    window.addEventListener('shake', shakeEventDidOccur, false);

    function shakeEventDidOccur () {
        alert('Brauchen Sie Hilfe?');
    }
});

