let gridCount = 0, gridVisible = false, hrsLoaded = false

        // This function will be called after it stops being called for
        // N milliseconds. If `immediate` is passed, trigger the function on the
        // leading edge, instead of the trailing.
        function debounce(func, wait, immediate) {
            var timeout;
            return function() {
                var context = this, args = arguments;
                var later = function() {
                    timeout = null;
                    if (!immediate) func.apply(context, args);
                };
                var callNow = immediate && !timeout;
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
                if (callNow) func.apply(context, args);
            };
        };

        function checkScroll() {
            let anchor_offset = $('.banner').offset().top,
            anchor_offset_two = $('.description').offset().top, 
            anchor_offset_three = $('.bannerTwo').offset().top,
            anchor_offset_four = $('.display-4').offset().top,
            anchor_offset_five = $($('.card-text')[3]).offset().top

            $(window).on('scroll', function() {

                //logo
                if ($(window).scrollTop() > anchor_offset) {
                    $('.navbar-brand').removeClass('expand')
                    $('.navbar-brand').addClass('shrink')
                } else {
                    $('.navbar-brand').removeClass('shrink')
                    $('.navbar-brand').addClass('expand')
                }

                if (gridVisible === false) {
                    //1st hr
                    if ($(window).scrollTop() > anchor_offset_four) {
                        $($('hr')[0]).addClass('expandHr')
                    }

                    //grid top half
                    if ($(window).scrollTop() > anchor_offset_two) {
                        setTimeout(()=> {
                            if (gridCount < 3) {
                                $($('.card')[gridCount]).addClass('appear')
                                gridCount++
                            }
                        }, 300)
                    }

                    //grid bottom half
                    if ($(window).scrollTop() > anchor_offset_three) {
                        setTimeout(()=> {
                            if (gridCount < 6) {
                                $($('.card')[gridCount]).addClass('appear')
                                gridCount++
                                if (gridCount === 6) {
                                    gridVisible = true;
                                }
                            } 
                        }, 300)
                    }
                }

                //2nd hr
                if ($(window).scrollTop() > anchor_offset_five && hrsLoaded === false) {
                    $($('hr')[1]).addClass('expandHr')
                    hrsLoaded = true;
                }

            }) //end onScroll
        }

        $(window).scroll(debounce(function() {
            checkScroll();
        }, 15)); //delay the firing slightly

        $(document).ready(function() { 
            setTimeout(function() {
                $('.fadeIn').addClass('appear')

                //disable the long, midpage parallax on Safari browsers (known issue with jittering)
                let is_safari = (navigator.userAgent.indexOf('Safari') != -1) && (navigator.userAgent.indexOf('Chrome') == -1);
                if (navigator.userAgent.match(/(iPod|iPhone|iPad)/) || is_safari) {
                    $('column div').attr("id","safari-parallax-disable")
                    $('.heroImage').addClass('fixBG')
                }

                checkScroll(); //check if page is pre-scrolled
            }, 200);
        });