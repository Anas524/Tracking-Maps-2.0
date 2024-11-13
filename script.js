$(document).ready(function () {
    function toggleNavbarBg() {
        if ($(window).scrollTop() > 200 || $(".navbar-toggler").attr("aria-expanded") === "true") {
            $('.navbar').addClass('bg-light');
            $('#navItem a').css('color', 'black');
            $('#navItem a').css('text-shadow', 'none');
            $('#navItem a').hover(
                function() {
                    $(this).css('color', 'darkgray'); 
                    $(this).css('text-shadow', 'none'); // Shadow on hover
                },
                function() {
                    $(this).css('color', 'black'); // Reset color
                    $(this).css('text-shadow', 'none'); // Reset shadow
                }
            );
        } else {
            $('.navbar').removeClass('bg-light');
            $('#navItem a').css('color', 'white');
            $('#navItem a').css('text-shadow', '0px 0px 4px rgba(0, 0, 0, 0.9)');
            $('#navItem a').hover(
                function() {
                    $(this).css('color', 'lightrgb(199, 199, 199)gray'); // Color on hover
                    $(this).css('text-shadow', 'none'); // Shadow on hover
                },
                function() {
                    $(this).css('color', 'white'); // Reset color
                    $(this).css('text-shadow', '0px 0px 4px rgba(0, 0, 0, 0.9)'); // Reset shadow
                }
            );
        }
    }

    $(window).scroll(toggleNavbarBg);

    // Detect scroll and toggle bg-light class
    $(window).on('scroll', function () {
        toggleNavbarBg();
    });

    // Detect navbar toggler click for mobile view
    $('.navbar-toggler').on('click', function () {
        setTimeout(toggleNavbarBg, 10); // Slight delay to allow toggler state to update
    });
   
    // Set the default language from localStorage or default to 'ar'
    let currentLang = localStorage.getItem('language') || 'ar';

    // Initialize the page with the correct language and direction
    changeLanguage(currentLang);

    // Toggle button click event
    $('#toggleLang').on('click', function () {
        if (currentLang === 'ar') {
            changeLanguage('en');
            $(this).text('عربي'); // Switch to Arabic
        } else {
            changeLanguage('ar');
            $(this).text('English'); // Switch to English
        }
    });

    function changeLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('language', lang); // Store language in localStorage

        // Change direction based on language
        if (lang === 'ar') {
            $('.page-wrapper').attr('dir', 'rtl'); 
            $('#toggleLang').text('English');
            $('#toggleLang').addClass('font-english')
        } else {
            $('.page-wrapper').attr('dir', 'ltr');
            $('#toggleLang').text('عربي');
            $('#toggleLang').removeClass('font-english');
        }

        // Update language-specific text and fonts
        $('[data-lang-ar]').each(function () {
            const text = $(this).data(`lang-${lang}`);

            // Update placeholder for inputs or text for other elements
            if ($(this).is('input')) {
                $(this).attr('placeholder', text);
            } else {
                $(this).text(text);
            }

            // Switch font class based on language
            if (lang === 'ar') {
                $(this).removeClass('font-english').addClass('font-arabic');
            } else {
                $(this).removeClass('font-arabic').addClass('font-english');
            }
        });
        
        // Update the icon based on language
        if (lang === 'ar') {
            $('#showIcon i').removeClass('fa-angle-right').addClass('fa-angle-left');
        } else {
            $('#showIcon i').removeClass('fa-angle-left').addClass('fa-angle-right');
        }
    }
});
        
$(document).ready(function () {
    // Initialize the map centered at the main branch
    const map = L.map('map').setView([26.39783, 43.87193], 10);

    // Add tile layer to the map
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Branch data with names in both Arabic and English
    const branches = [
        { name: { en: 'Qassim (Main Branch)', ar: 'القصيم (الفرع الرئيسي)' }, lat: 26.39783, lng: 43.87193 },
        { name: { en: 'Jeddah Branch', ar: 'فرع جدة' }, lat: 21.45974, lng: 39.25681 },
        { name: { en: 'Riyadh Branch', ar: 'فرع الرياض' }, lat: 24.65974, lng: 46.83165 }
    ];

    // Create markers for each branch and add them to the map
    const markers = branches.map(branch =>
        L.marker([branch.lat, branch.lng])
            .bindPopup(branch.name.en) // Default to English
            .addTo(map)
    );

    // Function to update marker popups with the correct language
    function updateMarkerPopups() {
        const lang = $('html').attr('lang'); // Detect the current language
        markers.forEach((marker, index) => {
            const branchName = branches[index].name[lang] || branches[index].name.en;
            marker.bindPopup(branchName);
        });
    }

    // Handle location link clicks to update the map view and tracking status
    $('#tracking-locations').on('click', '.location-link', function (e) {
        e.preventDefault(); // Prevent default link behavior

        const lat = $(this).data('lat');
        const lng = $(this).data('lng');
        const lang = $('html').attr('lang'); // Detect the current language

        const branch = branches.find(b => b.lat === lat && b.lng === lng);
        const branchName = branch.name[lang] || branch.name.en; // Use correct language

        const marker = markers.find(m => m.getLatLng().lat === lat && m.getLatLng().lng === lng);
        map.setView([lat, lng], 12);
        marker.bindPopup(branchName).openPopup();

    });

    // Initial setup: Open the main branch popup and set tracking status
    const mainBranchMarker = markers[0]; // The marker for the main branch
    mainBranchMarker.openPopup();

    // Bind popups to markers on load
    updateMarkerPopups();

    // Update marker popups when the language changes
    $(document).on('change', '#language-select', function () {
        updateMarkerPopups();
    });
});

$(document).ready(function() {
    $('#home').on('click', function (e) {
        if ($(window).scrollTop() === 0) {
            location.reload(); // Reloads the page
        } else {
            e.preventDefault(); // Prevents default behavior if not at the top
            $('html, body').animate({ scrollTop: 0 }, 'fast'); // Smooth scroll to top
            $('#aboutScreen, #serviceScreen').removeClass('show').fadeOut();
            $('#sec-01, .slider-container, #sec-02').removeClass('zoom');
            $('#moving-panel').removeClass('show');
            $('#sec-01, #sec-02').show();
            $('html, body').css('overflow', 'auto');
        }
    });

    $('#01').on('click', function(e) {
        e.preventDefault(); 
        $('html, body').scrollTop($('.slider-container').offset().top);
    });
    
    $('#aboutUs, #02').on('click', function(e) {
        e.preventDefault(); 
        if (!$('#serviceScreen').hasClass('show')) {
            $('html, body').animate({ scrollTop: $('#aboutScreen').offset().top }, 'slow');
        } else {
            $('#serviceScreen').removeClass('show').fadeOut();
            $('#aboutScreen').addClass('show').fadeOut();
            $('#sec-01, .slider-container, #sec-02').removeClass('zoom');
            $('#moving-panel').removeClass('show');
            $('#sec-01, #sec-02').show();
            $('html, body').css('overflow', 'auto');
            $('html, body').animate({ scrollTop: $('#sec-02').offset().top }, 'slow');
        }
    });
    
    $('#services, #03, #05').on('click', function(e) {
        e.preventDefault();
        if (!$('#aboutScreen').hasClass('show') && !$('#serviceScreen').hasClass('show')) {
            $('html, body').animate({ scrollTop: $('#sec-02').offset().top }, 'slow');
        } else {
            $('#aboutScreen, #serviceScreen').removeClass('show').fadeOut();
            $('#sec-01, .slider-container, #sec-02').removeClass('zoom');
            $('#moving-panel').removeClass('show');
            $('#sec-01, #sec-02').show();
            $('html, body').css('overflow', 'auto');
            $('html, body').animate({ scrollTop: $('#sec-02').offset().top }, 'slow');
        }
    });
    
    $('#contactUs, #04, #06, #07').on('click', function(e) {
        e.preventDefault(); 
        if (!$('#aboutScreen').hasClass('show') && !$('#serviceScreen').hasClass('show')) {
            $('html, body').animate({ scrollTop: $('#sec-03').offset().top }, 'slow');
        } else {
            $('#aboutScreen, #serviceScreen').removeClass('show').fadeOut();
            $('#sec-01, .slider-container, #sec-02').removeClass('zoom');
            $('#moving-panel').removeClass('show');
            $('#sec-01, #sec-02').show();
            $('html, body').css('overflow', 'auto');
            $('html, body').animate({ scrollTop: $('#sec-03').offset().top }, 'slow');
        }
    });
    
    $('#mapViewBtn').on('click', function(e) {
        e.preventDefault(); 
        $('html, body').scrollTop($('#sec-04').offset().top);
    });
});

$(document).ready(function() {
    //common reveal options to create reveal animations
    const sr = ScrollReveal({ 
        reset: true,
        distance: '60px',
        duration: 2500,
        delay: 200,
    });
    
    //target elements, and specify options to create reveal animations
    sr.reveal('.text-container p, .custom-section h1, .text-container h4', { delay: 200, origin: 'left' });
    sr.reveal('#sec-01 .image, .map-btn, #map', { delay: 200, origin: 'bottom' });
    sr.reveal('.text-dec, .bottom-element-1 h4', { delay: 200, origin: 'right' });
    sr.reveal('#sec-03 .image, .tracking-panel, .text-container h1', { delay: 200, origin: 'top' });
    sr.reveal('.button-container', { delay: 200, origin: 'bottom', interval: 200 });
    sr.reveal('.media-info', { delay: 200, origin: 'left', interval: 100 });
    sr.reveal('.aboutScreen h1', { delay: 200, origin: 'top', interval: 100 });

    $('#sec-01Btn, #aboutUs, #02').click(function() {
        sr.reveal('.aboutScreen h1');
    })
});

//trengo ai tool
window.Trengo = window.Trengo || {};
window.Trengo.key = 'Iqs0u1wwdWFgC4pCgja0';
$(document).ready(function () {
    var script = $('<script>', {
        type: 'text/javascript',
        async: true,
        src: 'https://static.widget.trengo.eu/embed.js'
    });
    $('head').append(script);
});

$(document).ready(function() {
    function toggleSection(triggerId, sectionId) {
        $(triggerId).click(function() {
            // Hide all sections first
            $('#sec-05, #sec-06, #sec-07').not(sectionId).hide(); // Hide all except the clicked one
            
            // Show the selected section
            $(sectionId).toggle(); // Toggle visibility
            $(window).scrollTop($(sectionId).offset().top); // Scroll to the section
        });

        // Close button click handler
        $(sectionId).find('.close-btn').click(function() {
            $(sectionId).hide(); // Hide the section
        });
    }

    // Apply toggle for multiple sections
    toggleSection('#08', '#sec-05');
    toggleSection('#09', '#sec-06');
    toggleSection('#10', '#sec-07');
});

$(window).scroll(function () {
    if ($(this).scrollTop() > 200) {
        $('.back-to-top').fadeIn('fast');
    } else {
        $('.back-to-top').fadeOut('fast');
    }
});
$('.back-to-top').click(function () {
    $('html, body').animate({scrollTop: 0}, 1000, 'easeInOutExpo');
    return false;
});

$(document).ready(function(){
    $('.slider-container').slick({
        dots: true,             
        arrows: false,          
        infinite: true,        
        slidesToShow: 1,        
        slidesToScroll: 1,     
        adaptiveHeight: true,    
        rtl: false,
        autoplay: true,
        autoplaySpeed: 20000 // interval to 1 minute (60000 ms)
    });
});

$('.magnetic-btn').each(function() {
    $(this).on('mousemove', function(e) {
        let x = e.offsetX;
        let y = e.offsetY;
        let btnWidth = $(this).width();
        let btnHeight = $(this).height();
        let transX = (x - btnWidth / 2) /10;
        let transY = (y - btnHeight / 2) /10;
        $(this).css('transform', `translate(${transX}px, ${transY}px)`);

        let mx = e.pageX - $(this).offset().left;
        let my = e.pageY - $(this).offset().top;
        $(this).css('--x', mx + 'px');
        $(this).css('--y', my + 'px');
    });

    $(this).on('mouseout', function() {
        $(this).css('transform', '');
    });
});

$(document).ready(function() {
    // Open new window with moving panel and zoom effect
    $('#sec-01Btn, #aboutUs, #02').click(function(event) {
        event.preventDefault();
        // Step 1: Add zoom effect to sec-01
        $('#sec-01, .slider-container').addClass('zoom');

        // Step 2: After the zoom effect ends, show the moving panel
        setTimeout(function() {
            $('#moving-panel').addClass('show');

            // Step 3: After the moving panel animation ends, show the black screen with sliding effect
            setTimeout(function() {
                $('html, body').css('overflow', 'hidden');
                $('#aboutScreen').addClass('show').fadeIn();
                $('#sec-01').hide();
            }, 500); // Wait for the moving panel to finish sliding up
        }, 500); // Duration of the zoom effect
    });

    $('#sec-02Btn').click(function(event) {
        event.preventDefault();
        $('#sec-02').addClass('zoom');
        setTimeout(function() {
            $('#moving-panel').addClass('show');
            setTimeout(function() {
                $('html, body').css('overflow', 'hidden');
                $('#serviceScreen').addClass('show').fadeIn();
                $('#sec-02').hide();
            }, 500);
        }, 500);
    });

    // Close button functionality
    $('.close-btn-2, .close-btn-3').click(function() {
        $('#aboutScreen, #serviceScreen').removeClass('show').fadeOut();
        $('#sec-01, .slider-container, #sec-02').removeClass('zoom');
        $('#moving-panel').removeClass('show');
        $('#sec-01, #sec-02').show();
        $('html, body').css('overflow', 'auto');
    });
});

$(document).ready(function() {
    $('#aboutUs, #02').click(function() {
        setTimeout(function() {
            $('html, body').animate({ scrollTop: 300 }, 'slow');
        })
    });

    // image zoom effect while scrolling
    $(window).on('scroll', function() {
        let scrollPos = $(this).scrollTop();
        let scaleValue = 1 + scrollPos / 12000; // Adjust divisor to control zoom sensitivity
        $('.zoom-image').css('transform', `scale(${scaleValue})`);
    });

    // white shadow effect
    $(window).on('scroll', function() {
        let scrollPos = $(this).scrollTop();
        if (scrollPos > 400) {
            $('#sec-01').addClass('faded');
            let opacityValue = 1 - scrollPos / 1000; // Adjust divisor for smoother transition
            $('.slider-container').css('opacity', opacityValue);
    
        } else {
            $('#sec-01').removeClass('faded');
            $('.slider-container').css('opacity', 1);
        }

        if (scrollPos > 1200) {
            $('#sec-02').addClass('faded');
            let opacityValue = 2 - scrollPos / 1000;
            $('#sec-01').css('opacity', opacityValue);
    
        } else {
            $('#sec-02').removeClass('faded');
            $('#sec-01').css('opacity', 1);
        }

        if (scrollPos > 2400) {
            $('#sec-03').addClass('faded');
            let opacityValue = 3 - scrollPos / 1000;
            $('#sec-02').css('opacity', opacityValue);
    
        } else {
            $('#sec-03').removeClass('faded');
            $('#sec-02').css('opacity', 1);
        }
    });
});

$(document).ready(function() {
    $('.media-info-text h5').hide();

    $('.media-info-text h4').on('click', function() {
        $(this).next('.media-info-text h5').stop(true, true).slideToggle(300); // Slide toggle with animation
    });
});