/* ============================================================
   LUMIÈRE BEAUTY STUDIO — script.js
   ============================================================ */

$(document).ready(function () {

  /* ── NAVBAR SCROLL ─────────────────────────────────────── */
  $(window).on('scroll', function () {
    if ($(this).scrollTop() > 60) {
      $('#mainNavbar').addClass('scrolled');
    } else {
      $('#mainNavbar').removeClass('scrolled');
    }
    // Scroll-to-top button
    if ($(this).scrollTop() > 400) {
      $('#scrollTopBtn').addClass('visible');
    } else {
      $('#scrollTopBtn').removeClass('visible');
    }
    // Reveal elements
    revealOnScroll();
  });

  /* ── SMOOTH SCROLL ─────────────────────────────────────── */
  $('a[href^="#"]').on('click', function (e) {
    var target = $(this.getAttribute('href'));
    if (target.length) {
      e.preventDefault();
      $('html, body').animate({ scrollTop: target.offset().top - 80 }, 700, 'swing');
      // Close mobile menu
      $('.navbar-collapse').collapse('hide');
    }
  });

  /* ── SCROLL TO TOP ─────────────────────────────────────── */
  $('#scrollTopBtn').on('click', function () {
    $('html, body').animate({ scrollTop: 0 }, 600);
  });

  /* ── PARTICLES ─────────────────────────────────────────── */
  function createParticles() {
    var container = document.getElementById('particles');
    if (!container) return;
    for (var i = 0; i < 25; i++) {
      var p = document.createElement('div');
      p.classList.add('hero-particle');
      var size = Math.random() * 4 + 1;
      p.style.cssText = [
        'width:' + size + 'px',
        'height:' + size + 'px',
        'left:' + Math.random() * 100 + '%',
        'animation-duration:' + (Math.random() * 12 + 8) + 's',
        'animation-delay:' + Math.random() * 10 + 's',
        'opacity:' + (Math.random() * 0.5 + 0.1)
      ].join(';');
      container.appendChild(p);
    }
  }
  createParticles();

  /* ── COUNTER ANIMATION ─────────────────────────────────── */
  var countersAnimated = false;
  function animateCounters() {
    if (countersAnimated) return;
    countersAnimated = true;
    $('.stat-num').each(function () {
      var $el = $(this);
      var target = parseInt($el.data('count'));
      var duration = 2000;
      var step = target / (duration / 16);
      var current = 0;
      var timer = setInterval(function () {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        $el.text(Math.floor(current).toLocaleString());
      }, 16);
    });
  }

  // Trigger counter when hero is visible
  function checkCounters() {
    var heroBottom = $('.hero-section').offset().top + $('.hero-section').outerHeight();
    if ($(window).scrollTop() + $(window).height() > heroBottom * 0.3) {
      animateCounters();
    }
  }

  // Animate on load
  setTimeout(animateCounters, 2500);

  /* ── SERVICE FILTER TABS ───────────────────────────────── */
  $('.svc-tab').on('click', function () {
    var filter = $(this).data('filter');

    // Update active tab
    $('.svc-tab').removeClass('active');
    $(this).addClass('active');

    // Filter cards
    if (filter === 'all') {
      $('.svc-item').each(function (i) {
        var $item = $(this);
        setTimeout(function () {
          $item.removeClass('hidden').css({ opacity: 0, transform: 'translateY(20px)' });
          setTimeout(function () {
            $item.css({ opacity: 1, transform: 'translateY(0)', transition: 'all 0.4s ease' });
          }, 50);
        }, i * 60);
      });
    } else {
      $('.svc-item').each(function () {
        var $item = $(this);
        if ($item.data('category') === filter) {
          $item.removeClass('hidden').css({ opacity: 0, transform: 'translateY(20px)' });
          setTimeout(function () {
            $item.css({ opacity: 1, transform: 'translateY(0)', transition: 'all 0.4s ease' });
          }, 100);
        } else {
          $item.addClass('hidden');
        }
      });
    }
  });

  /* ── REVEAL ON SCROLL ──────────────────────────────────── */
  function revealOnScroll() {
    var windowBottom = $(window).scrollTop() + $(window).height();
    $('.reveal-left, .reveal-right').each(function () {
      if ($(this).offset().top < windowBottom - 80) {
        $(this).addClass('revealed');
      }
    });
  }

  // Run once on load
  revealOnScroll();
  $(window).on('scroll', revealOnScroll);

  /* ── BOOKING FORM ──────────────────────────────────────── */
  $('#bookingForm').on('submit', function (e) {
    e.preventDefault();
    var $btn = $(this).find('button[type="submit"]');
    $btn.html('<i class="fas fa-spinner fa-spin me-2"></i> Processing...');
    $btn.prop('disabled', true);

    setTimeout(function () {
      $('#bookingForm').fadeOut(400, function () {
        $('#successMsg').removeClass('d-none').hide().fadeIn(400);
      });
    }, 1500);
  });

  /* ── TOAST NOTIFICATION ────────────────────────────────── */
  setTimeout(function () {
    $('#toastMsg').addClass('show');
    setTimeout(function () {
      $('#toastMsg').removeClass('show');
    }, 5000);
  }, 4000);

  /* ── ACTIVE NAV LINK ON SCROLL ─────────────────────────── */
  $(window).on('scroll', function () {
    var scrollPos = $(this).scrollTop() + 100;
    $('section[id]').each(function () {
      var sectionTop = $(this).offset().top;
      var sectionBottom = sectionTop + $(this).outerHeight();
      var sectionId = $(this).attr('id');
      if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
        $('.nav-link').removeClass('active');
        $('.nav-link[href="#' + sectionId + '"]').addClass('active');
      }
    });
  });

  /* ── SERVICE CARD TILT EFFECT ──────────────────────────── */
  $(document).on('mousemove', '.service-card', function (e) {
    var rect = this.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;
    var xPct = (x / rect.width - 0.5) * 10;
    var yPct = (y / rect.height - 0.5) * 10;
    $(this).css('transform', 'translateY(-8px) rotateX(' + (-yPct) + 'deg) rotateY(' + xPct + 'deg)');
  }).on('mouseleave', '.service-card', function () {
    $(this).css('transform', '');
  });

  /* ── GALLERY ITEM PARALLAX ─────────────────────────────── */
  $(window).on('scroll', function () {
    var scrollTop = $(this).scrollTop();
    var galleryTop = $('.gallery-strip').offset().top;
    var diff = scrollTop - galleryTop;
    if (Math.abs(diff) < 600) {
      $('.gal-item:nth-child(odd)').css('transform', 'translateY(' + (diff * 0.04) + 'px)');
      $('.gal-item:nth-child(even)').css('transform', 'translateY(' + (diff * -0.04) + 'px)');
    }
  });

  /* ── INPUT LABEL ANIMATION ─────────────────────────────── */
  $('.fancy-input').on('focus', function () {
    $(this).closest('.form-group').find('label').css('color', 'var(--gold)');
  }).on('blur', function () {
    $(this).closest('.form-group').find('label').css('color', '');
  });

  /* ── WHY CARDS ENTRANCE ────────────────────────────────── */
  function revealWhyCards() {
    var windowBottom = $(window).scrollTop() + $(window).height();
    $('.why-card').each(function (i) {
      var $card = $(this);
      if ($card.offset().top < windowBottom - 50 && !$card.hasClass('revealed')) {
        $card.addClass('revealed');
        setTimeout(function () {
          $card.css({
            opacity: 1,
            transform: 'translateY(0)',
            transition: 'all 0.5s cubic-bezier(0.25,0.46,0.45,0.94)'
          });
        }, i * 100);
      }
    });
  }

  // Set initial state for why cards
  $('.why-card').css({ opacity: 0, transform: 'translateY(30px)' });
  $(window).on('scroll', revealWhyCards);
  revealWhyCards();

  /* ── TESTIMONIAL CARD ENTRANCE ─────────────────────────── */
  $(window).on('scroll', function () {
    var windowBottom = $(window).scrollTop() + $(window).height();
    $('.testimonial-card').each(function (i) {
      var $card = $(this);
      if ($card.offset().top < windowBottom - 50 && !$card.hasClass('revealed')) {
        $card.addClass('revealed');
        setTimeout(function () {
          $card.css({
            opacity: 1,
            transform: 'translateY(0)',
            transition: 'all 0.5s ease'
          });
        }, i * 120);
      }
    });
  });

  // Set initial state for testimonial cards
  $('.testimonial-card').css({ opacity: 0, transform: 'translateY(30px)' });

  /* ── SERVICE CARD SHINE EFFECT ─────────────────────────── */
  $(document).on('mousemove', '.service-card', function (e) {
    var rect = this.getBoundingClientRect();
    var x = ((e.clientX - rect.left) / rect.width) * 100;
    var y = ((e.clientY - rect.top) / rect.height) * 100;
    $(this).css('background-image',
      'radial-gradient(circle at ' + x + '% ' + y + '%, rgba(201,169,110,0.06) 0%, transparent 50%)'
    );
  }).on('mouseleave', '.service-card', function () {
    $(this).css('background-image', '');
  });

  /* ── NAV ACTIVE STYLE ──────────────────────────────────── */
  var activeStyle = document.createElement('style');
  activeStyle.innerHTML = '.nav-link.active { color: var(--gold) !important; }';
  document.head.appendChild(activeStyle);

});
