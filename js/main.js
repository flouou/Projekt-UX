var pp = true;
var ph = true;
var el = true;
var kp = true;
var searchString;
$(document).ready(function () {

    //MapButtonRight
    $('#mapButtonRight').on('click', toggleStart);

    $('#mapButtonRight').on('swipeleft', function () {
        if ($('#mapButtonRight i').hasClass('ion-map')) {
            toggleStart();
        }
    });

    $('#mapButtonRight').on('swiperight', function () {
        if ($('#mapButtonRight i').hasClass('ion-navicon-round')) {
            toggleStart();
        }
    });

    $('#start').on('swipeleft', toggleStart);

    //MapButtonLeft
    $('#mapButtonLeft').on('click', toggleSearch);

    $('#mapButtonLeft').on('swipeleft', function () {
        if ($('#mapButtonLeft i').hasClass('ion-search')) {
            toggleSearch();
        }
    });

    $('#mapButtonLeft').on('swiperight', function () {
        if ($('#mapButtonLeft i').hasClass('ion-map')) {
            toggleSearch();
        }
    });

    $('#options').on('swiperight', toggleSearch);

    $('.sideButton:first').on('click', toggleBoth);

    //Overlay-Swipe-Effect

    $('.overlay').on('swipeleft', function () {
        if ($('#mapButtonRight i').hasClass('ion-map') && $('#mapButtonLeft i').hasClass('ion-search')) {
            toggleStart();
        }
    });

    $('.overlay').on('swiperight', function () {
        if ($('#mapButtonLeft i').hasClass('ion-map') && $('#mapButtonRight i').hasClass('ion-map')) {
            toggleSearch();
        }
    });

    //Invisible Map Swipe

    $('.invisibleSwipeLeft').on('swiperight', function () {
        toggleStart();
    });

    $('.invisibleSwipeRight').on('swipeleft', function () {
        toggleSearch();
    });

    //Toggle Checkbox and add/remove Map-XYZLayerGroups
    $('.customCheckbox').change(function (e) {
        var ccId = e.target.id;
        ccId = ccId.split("_")[1];
        if (e.target.checked) {
            switch (ccId) {
            case 'PH':
                addParkhausLayer();
                ph = true;
                break;
            case 'PP':
                addParkplatzLayer();
                pp = true;
                break;
            case 'EL':
                addEStationenLayer();
                el = true;
                break;
            case 'KP':
                addKostenlosLayer();
                kp = true;
                break;
            }
        } else {
            switch (ccId) {
            case 'PH':
                removeParkhausLayer();
                ph = false;
                break;
            case 'PP':
                removeParkplatzLayer();
                pp = false;
                break;
            case 'EL':
                removeEStationenLayer();
                el = false;
                break;
            case 'KP':
                removeKostenlosLayer();
                kp = false;
                break;
            }
        }
    });
    
    $('#searchButton').on('click', function(){
        var temp = markers[searchString];
        if(typeof temp !== 'undefined'){
            var latlng = temp.getLatLng();
            map.setView(latlng);
            temp.openPopup();   
            toggleSearch();
        } 
    });
    
    function toggleBoth() {
        toggleStart();
        toggleSearch();
    }

    function toggleStart() {
        $('.invisibleSwipe').toggle();
        $('.overlay').fadeToggle('fast');
        $('.overlay').toggleClass('swipeTo0px');
        $('#start').toggleClass('swipeToLeft100');
        $('#mapButtonRight').toggleClass('swipeTo0px');
        $('#mapButtonRight i').toggleClass('ion-map');
        $('#mapButtonRight i').toggleClass('ion-navicon-round');
        $('#map').toggleClass('swipeTo0px');
        $('#options').toggleClass('swipeTo100');
        $('#mapButtonLeft').toggleClass('swipeTo80');
    }

    function toggleSearch() {
        toggleStart();
        $('.overlay').toggleClass('swipeToLeft100');
        $('#start').toggleClass('swipeToLeft200');
        $('#mapButtonRight').toggleClass('swipeToLeft100');
        $('#mapButtonLeft i').toggleClass('ion-map');
        $('#mapButtonLeft i').toggleClass('ion-search');
        $('#map').toggleClass('swipeToLeft100');
        $('#options').toggleClass('swipeTo15');
        $('#mapButtonLeft').toggleClass('swipeTo0px');
    }
    
    /*function openPopupAfterSearch(){
            var temp = markers[searchString];
        if(typeof temp !== 'undefined'){
            var latlng = temp.getLatLng();
            map.setView(latlng);
            temp.openPopup();   
        }
    }*/

    //Suchergebniss-Filterung
    $.widget("custom.catcomplete", $.ui.autocomplete, {
        _renderMenu: function (ul, items) {
            var that = this;
            $.each(items, function (index, item) {
                var li;
                if (item.category == 'pp' && pp) {
                    li = that._renderItemData(ul, item);
                }
                if (item.category == 'ph' && ph) {
                    li = that._renderItemData(ul, item);
                }
                if (item.category == 'el' && el) {
                    li = that._renderItemData(ul, item);
                }
                if (item.category == 'kp' && kp) {
                    li = that._renderItemData(ul, item);
                }
            });
        }
    });
    $(".suchbegriffAllgemein").catcomplete({
        minLength: 3,
        select: function (event, ui) {
            $(".suchbegriffAllgemein").val(ui.item.label);
            searchString = ui.item.value;
            return false;
        },
        source: [
            //Parkplätze
            {
                value: "Ritterstraße 16",
                category: "pp",
                label: "Ritterstraße 16"
            },
            {
                value: "Rintheimer Straße 19",
                category: "pp",
                label: "Rintheimer Straße 19"
            },
            {
                value: "Sophienstraße 128",
                category: "pp",
                label: "Sophienstraße 128"
            },
            {
                value: "Waldstraße 15",
                category: "pp",
                label: "Waldstraße 15"
            },
            {
                value: "Kaiserallee 61",
                category: "pp",
                label: "Kaiserallee 61"
            },
            {
                value: "Kriegsstraße 100",
                category: "pp",
                label: "Kriegsstraße 100"
            },
            {
                value: "Luisenstraße 23",
                category: "pp",
                label: "Luisenstraße 23"
            },
            {
                value: "Moltkestraße",
                category: "pp",
                label: "Moltkestraße"
            },
            {
                value: "Bahnhofsplatz West",
                category: "pp",
                label: "Bahnhofsplatz West"
            },
            {
                value: "Durlacher Allee 10",
                category: "pp",
                label: "Durlacher Allee 10"
            },
            //E-Stationen
            {
                value: "Gottesauer Platz",
                category: "el",
                label: "Gottesauer Platz"
            },
            {
                value: "Englerstraße",
                category: "el",
                label: "Englerstraße"
            },
            {
                value: "Hertzstraße",
                category: "el",
                label: "Hertzstraße"
            },
            {
                value: "Kurzheckweg",
                category: "el",
                label: "Kurzheckweg"
            },
            {
                value: "Blumentorstraße",
                category: "el",
                label: "Blumentorstraße"
            },
            {
                value: "Steinstraße",
                category: "el",
                label: "Steinstraße"
            },
            {
                value: "Hans-Thoma-Straße",
                category: "el",
                label: "Hans-Thoma-Straße"
            },
            {
                value: "Hermann-Leichtlin-Straße",
                category: "el",
                label: "Hermann-Leichtlin-Straße"
            },
            {
                value: "Stephanienstraße",
                category: "el",
                label: "Stephanienstraße"
            },
            {
                value: "Bahnhofstraße",
                category: "el",
                label: "Bahnhofstraße"
            },
            //Parkhäuser
            {
                value: "Am Staatstheater",
                category: "ph",
                label: "Am Staatstheater, Baumeisterstraße 9"
            },
            {
                value: "Kongresszentrum PH1",
                category: "ph",
                label: "Kongresszentrum PH1, Hermann-Billing-Straße 1"
            },
            {
                value: "Kongresszentrum PH2",
                category: "ph",
                label: "Kongresszentrum PH2, Beiertheimer Allee 9"
            },
            {
                value: "Luisenstraße",
                category: "ph",
                label: "Parkhaus Luisenstraße, Luisenstraße 2f"
            },
            {
                value: "Herrenstraße/Zirkel",
                category: "ph",
                label: "Herrenstraße/Zirkel, Herrenstraße 9"
            },
            {
                value: "Kreuzstraße (C & A)",
                category: "ph",
                label: "Kreuzstraße (C & A), Kreuzstraße 5"
            },
            {
                value: "Kronenplatz",
                category: "ph",
                label: "Kronenplatz, Fritz-Erler-Str. u. Markgrafen 1"
            },
            {
                value: "Passagehof",
                category: "ph",
                label: "Passagehof, Waldstraße 14-18"
            },
            {
                value: "Schlossplatz",
                category: "ph",
                label: "Schlossplatz, Am Schlossplatz"
            },
            {
                value: "Zirkel (P & C)",
                category: "ph",
                label: "Zirkel (P & C), Zirkelstraße 25"
            },
            {
                value: "Ettlinger Tor",
                category: "ph",
                label: "Ettlinger Tor, Lammstraße/Kriegsstraße"
            },
            {
                value: "Friedrichsplatz",
                category: "ph",
                label: "Friedrichsplatz, Friedrichsplatz 7 / Ritterstr."
            },
            {
                value: "Industrie- und Handelskammer",
                category: "ph",
                label: "Industrie- und Handelskammer, Erbprinzenstraße 4-12"
            },
            {
                value: "Karstadt",
                category: "ph",
                label: "Karstadt, Zähringerstraße 69"
            },
            {
                value: "Landesbibliothek",
                category: "ph",
                label: "Landesbibliothek, Ritterstraße 20"
            },
            {
                value: "Marktplatz",
                category: "ph",
                label: "Marktplatz, Kreuzstraße 13a"
            },
            {
                value: "Mendelssohnplatz (Scheck-In)",
                category: "ph",
                label: "Mendelssohnplatz (Scheck-In), Ludwig-Erhard-Allee"
            },
            {
                value: "Akademiestraße",
                category: "ph",
                label: "Akademiestraße, Akademiestraße 51-55"
            },
            {
                value: "Ludwigsplatz",
                category: "ph",
                label: "Ludwigsplatz, Amalienstraße 10"
            },
            {
                value: "Berufsakademie Karlsruhe",
                category: "ph",
                label: "Duale Hochschule Baden-Württemberg (DHBW), Erzbergerstr. 117-121"
            },
            {
                value: "Filmpalast",
                category: "ph",
                label: "Filmpalast, Brauerstr. 40"
            },
            //Kostenlose Plätze
            {
                value: "Ernst-Friedrich-Straße",
                category: "kp",
                label: "Ernst-Friedrich-Straße"
            },
            {
                value: "Waldparkplatz",
                category: "kp",
                label: "Waldparkplatz"
            },
            {
                value: "Wilhelmstraße",
                category: "kp",
                label: "Wilhelmstraße"
            },
            {
                value: "Erzbergerstraße",
                category: "kp",
                label: "Erzbergerstraße"
            },
            {
                value: "Peter-und-Paul-Platz",
                category: "kp",
                label: "Peter-und-Paul-Platz"
            }
        ]
    });

    $(".suchbegriffTicket").autocomplete({
        minLength: 2,
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
            "Durlacher Allee 10"
        ],
        messages: {
            noResults: '',
            results: function () {}
        }
    });
    
    $("#suchbegriff").on("click", function () {
        $(this).select();
    });
    
    $("#suchbegriffTicket").on("click", function () {
        $(this).select();
    });


    //alertify - shake meldung
    alertify.set({ labels: {
        ok     : "Hilfe",
        cancel : "Nein, danke"
    } });
    var al = function(){
        alertify.confirm("Brauchen Sie Hilfe oder weitere Informationen?", function (e) {
            if (e) {
                window.location = "FAQ.html";
            } else {

            }
        });   
    }
    al();
    //shake event
    var myShakeEvent = new Shake({
        threshold: 15,
        timeout: 1000
    });

    myShakeEvent.start();

    window.addEventListener('shake', shakeEventDidOccur, false);
    
    function shakeEventDidOccur() {
        al();
    }
});