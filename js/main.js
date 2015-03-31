var pp = true;
var ph = true;
var el = true;
var kp = true;
var searchString;
var isChecked = true;
var showNotAgain = false;

$(document).ready(function () {
    var searchClicked = false;

    /*
     *Funktionen, die beim Drücken des linken (ja, links) Buttons ausgeführt werden
     *Alle Funktionen dienen zum Verschieben der verschiedenen Komponenten der App
     */
    $('#mapButtonRight').on('click', toggleStart);

    $('#mapButtonRight').on('swipeleft', function () {
        if ($('#mapButtonRight i').hasClass('ion-earth')) {
            toggleStart();
        }
    });

    $('#mapButtonRight').on('swiperight', function () {
        if ($('#mapButtonRight i').hasClass('ion-navicon-round')) {
            toggleStart();
        }
    });

    $('#start').on('swipeleft', toggleStart);

    /*
     *Funktionen, die beim Drücken des rechten (ja, rechts) Buttons ausgeführt werden
     *Alle Funktionen dienen zum Verschieben der verschiedenen Komponenten der App
     */
    $('#mapButtonLeft').on('click', toggleSearch);

    $('#mapButtonLeft').on('swipeleft', function () {
        if ($('#mapButtonLeft i').hasClass('ion-search')) {
            toggleSearch();
        }
    });

    $('#mapButtonLeft').on('swiperight', function () {
        if ($('#mapButtonLeft i').hasClass('ion-earth')) {
            toggleSearch();
        }
    });

    $('#options').on('swiperight', toggleSearch);

    $('.sideButton:first').on('click', toggleBoth);

    /*
     *Funktionen, die beim Swipen auf dem grauen Overlay, das angezeigt wird, wenn man sich ganz rechts
     *oder ganz links auf der App befindet, ausgeführt werden
     */
    $('.overlay').on('swipeleft', function () {
        if ($('#mapButtonRight i').hasClass('ion-earth') && $('#mapButtonLeft i').hasClass('ion-search')) {
            toggleStart();
        }
    });

    $('.overlay').on('swiperight', function () {
        if ($('#mapButtonLeft i').hasClass('ion-earth') && $('#mapButtonRight i').hasClass('ion-earth')) {
            toggleSearch();
        }
    });

    //Invisible Map Swipe am rechten und linken Bildschirmrand, wenn man sich auf der Kartenansicht befindet
    $('.invisibleSwipeLeft').on('swiperight', function () {
        toggleStart();
    });

    $('.invisibleSwipeRight').on('swipeleft', function () {
        toggleSearch();
    });

    /*
     *Je nach ausgewählten Filtern wird der jeweilige Pin-Layer sofort ein- oder ausgeblendet
     */
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
            case 'pinPopUp':
                /*isChecked = true;*/
                console.log('hola');
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
            case 'pinPopUp':
                /*isChecked = false;*/
                console.log('hola');
                break;
            }
        }
    });
    
    /*
     *Wenn Suchbutton auf der Suchseite gedrückt wird, schiebt sich der Bildschirm zur Karte und landet
     *beim dementsprechenden Pin und öffnet dort das Pop-Up
     */
    $('#searchButton').on('click', function(){
        var temp = markers[searchString];
        if(typeof temp !== 'undefined'){
            var latlng = temp.getLatLng();
            map.setView(latlng);
            temp.openPopup();   
            toggleSearch();
        } 
    });
    
    /*
     *Wird nur für den Button "Parkplatz suchen" benötigt
     */
    function toggleBoth() {
        searchClicked = true;
        toggleStart();
        toggleSearch();
        searchClicked = false;
    }
    
    /*
     *Zeige/Verstecke die Startseite (Menüseite)
     */
    function toggleStart() {
        showPinPopUp();
        $('.invisibleSwipe').toggle();
        $('.overlay').fadeToggle('fast');
        $('.overlay').toggleClass('swipeTo0px');
        $('#start').toggleClass('swipeToLeft100');
        $('#mapButtonRight').toggleClass('swipeTo0px');
        $('#mapButtonRight i').toggleClass('ion-earth');
        $('#mapButtonRight i').toggleClass('ion-navicon-round');
        $('#map').toggleClass('swipeTo0px');
        $('#options').toggleClass('swipeTo100');
        $('#mapButtonLeft').toggleClass('swipeTo80');
        searchClicked = false;
    }
    
    /*
     *Zeige/Verstecke die Suchseite (Filterseite)
     */
    function toggleSearch() {
        toggleStart();
        $('.overlay').toggleClass('swipeToLeft100');
        $('#start').toggleClass('swipeToLeft200');
        $('#mapButtonRight').toggleClass('swipeToLeft100');
        $('#mapButtonLeft i').toggleClass('ion-earth');
        $('#mapButtonLeft i').toggleClass('ion-search');
        $('#map').toggleClass('swipeToLeft100');
        $('#options').toggleClass('swipeTo15');
        $('#mapButtonLeft').toggleClass('swipeTo0px');
        searchClicked = false;
    }
    
    /*function openPopupAfterSearch(){
            var temp = markers[searchString];
        if(typeof temp !== 'undefined'){
            var latlng = temp.getLatLng();
            map.setView(latlng);
            temp.openPopup();   
        }
    }*/

    /*
     *Je nach Filterung werden auch nur die entsprechenden Autocomplete-Vorschläge angezeigt
     */
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
    
    /*
     *Zusammenbauen der allgemeinen Autocomplete-Funktion auf der Suchseite
     */
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
                value: "Ritterstr. 16",
                category: "pp",
                label: "Ritterstr. 16"
            },
            {
                value: "Rintheimer Str. 19",
                category: "pp",
                label: "Rintheimer Str. 19"
            },
            {
                value: "Sophienstr. 128",
                category: "pp",
                label: "Sophienstr. 128"
            },
            {
                value: "Waldstr. 15",
                category: "pp",
                label: "Waldstr. 15"
            },
            {
                value: "Kaiserallee 61",
                category: "pp",
                label: "Kaiserallee 61"
            },
            {
                value: "Kriegsstr. 100",
                category: "pp",
                label: "Kriegsstr. 100"
            },
            {
                value: "Luisenstr. 23",
                category: "pp",
                label: "Luisenstr. 23"
            },
            {
                value: "Moltkestr.",
                category: "pp",
                label: "Moltkestr."
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
                value: "Herrmann-Leichtlin-Straße",
                category: "el",
                label: "Herrmann-Leichtlin-Straße"
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
    
    /*
     *Zusammenbauen der Filterfunktion für Ticket-Seite
     */
    $(".suchbegriffTicket").autocomplete({
        minLength: 2,
        source: [
            "Ritterstr. 16",
            "Rintheimer Str. 19",
            "Sophienstr. 128",
            "Waldstr. 15",
            "Kaiserallee 61",
            "Kriegsstr. 100",
            "Luisenstr. 23",
            "Moltkestr.",
            "Bahnhofsplatz West",
            "Durlacher Allee 10"
        ],
        messages: {
            noResults: '',
            results: function () {}
        }
    });
    
    /*
     *Markiere gesamten Input des Suchfeldes, um Ändern des Begriffs zu erleichtern
     */
    $("#suchbegriff").on("click", function () {
        $(this).select();
    });
    
    $("#suchbegriffTicket").on("click", function () {
        $(this).select();
    });


    /*
     *Meldung, wenn das Smartphone geschüttelt wird
     */    
    var al = function(){
        alertify.set({ labels: {
            ok     : "Hilfe",
            cancel : "Nein, danke"
        } });
        alertify.confirm("Brauchen Sie Hilfe oder weitere Informationen?", function (e) {
            if (e) {
                window.location = "FAQ.html";
            } else {

            }
        });   
    }
    
    /*
     *Allgemeines Shake-Event instanziieren
     */
    var myShakeEvent = new Shake({
        threshold: 15,
        timeout: 1000
    });

    myShakeEvent.start();

    window.addEventListener('shake', shakeEventDidOccur, false);
    
    function shakeEventDidOccur() {
        al();
    }
    
    /*
     *Zusammenbauen des Pop-Ups, das auf die Legende für die Karte hinweist
     */
    function pinPopUp(){
        alertify.set({ labels: {
            ok      : "Hilfe",
            cancel  : "Schließen"
        }});
        alertify.confirm('Weitere Informationen zur Karte finden Sie in der Hilfe. <div class="customCheckbox pinPopUpCheckbox"><input type="checkbox" value="None" id="customCheckbox_pinPopUp" onchange="setShowNotAgainCookie()" name="check" checked/><label for="customCheckbox_pinPopUp"></label><span style="white-space: nowrap">Nicht mehr anzeigen</span></div>', function(e) {
            if(e){
                window.location = "FAQ.html#pins";
            }else{
                
            }
        });
        //$('p:contains("Weitere Informationen")').append('<div class="customCheckbox pinPopUpCheckbox"><input type="checkbox" value="None" id="customCheckbox_pinPopUp" name="check" checked/><label for="customCheckbox_pinPopUp"></label><span style="white-space: nowrap">Nicht mehr anzeigen</span></div>');
    }
    
    /*
     *Zeige/Verstecke je nach gesetztem Cookie, ob die Legende weiterhin gezeigt werden soll
     */
    function showPinPopUp(){
        if($('#mapButtonRight i').hasClass('ion-navicon-round') && $('#mapButtonLeft i').hasClass('ion-search')){
            
        }else if(searchClicked === false && !isShowNotAgainCookieSet()){
            pinPopUp();  
        }
    }
    
    
    
});

/*
 *Zeigt eine Meldung an, wenn bereits ein Parkvorgang aktiv ist und noch ein weiterer Parkvorgang getätigt werden soll
 */
function alertifyActivParking(){
        alertify.alert("Es ist bereits ein Parkvorgang aktiv. Bitte beenden Sie diesen zunächst, um anschließend die gewünschte Funktion ausführen zu können.", function () {
            alertify.message('OK');
        });  
    }

/*
 *Evaluiert beim Laden der FAQ-Seite, ob der Hash-Wert "pins" gesetzt ist.
 *Das ist nur der Fall, wenn die FAQ-Seite über das Legenden-Pop-Up aufgerufen wird
 *Dementsprechend öffnet sich das Accordion an der Legenden-Stelle und scrollt dort hin
 */
function onFaqLoad(){
    if(window.location.hash === '#pins'){
        $('.accordion').accordion('option', 'active', 4 );
        $('body').scrollTo('.accordion-section-title:nth-of-type(6)');
    }    
}
function setShowNotAgainCookie(){
    //Wenn Cookie nicht gesetzt und Häkchen nicht drin, dann kein Cookie setzen und wieder anzeigen
    //Wenn Cokie nicht gesetzt und Häkchen drin, dann Cookie setzen
    //Wenn Cookie bereits gesetzt, dann showNotAgain auf true
    console.log("setShowNotAgainCookie(): start");
    console.log("checked? "+$('#customCheckbox_pinPopUp').attr('checked'));
    if(!isShowNotAgainCookieSet() && !$('#customCheckbox_pinPopUp').attr('checked')){
        showNotAgain = false;
        console.log("Case 1; showNotAgain false");
    } else if(!isShowNotAgainCookieSet() && $('#customCheckbox_pinPopUp').attr('checked')){
        showNotAgain = true;
        document.cookie = "showNotAgain=true; max-age="+3600*24;
        console.log("Case 2; showNotAgain true");
    } else if(isShowNotAgainCookieSet()){
        showNotAgain = true;
        console.log("Case 3; showNotAgain true");
    } else {
        console.log("undefined Case 4;");
    }
}
function isShowNotAgainCookieSet(){
    console.log("isShowNotCookieSet(): start");
    if (document.cookie.indexOf("showNotAgain") >= 0){
        showNotAgain = true;
        console.log("isShowNotCookieSet(): true");
        return true;
    } else {
        showNotAgain = false;
        console.log("isShowNotCookieSet(): false");
        return false;
    }
}
function status(){
    console.log("checked? "+$('#customCheckbox_pinPopUp').attr('checked'));
}