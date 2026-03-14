/*
	Portfolio | Jamie Kong
	Vanilla JS — replaces jQuery + plugins
*/

(function() {

	// Remove is-preload class on window load (enables CSS animations).
	window.addEventListener('load', function() {
		setTimeout(function() {
			document.body.classList.remove('is-preload');
		}, 100);
	});

	// Create titleBar for mobile nav.
	var logo = document.getElementById('logo');
	if (logo) {
		var titleBar = document.createElement('div');
		titleBar.id = 'titleBar';
		titleBar.innerHTML =
			'<a href="#header" class="toggle"></a>' +
			'<span class="title">' + logo.innerHTML + '</span>';
		document.body.appendChild(titleBar);
	}

	// Mobile panel — toggle header visibility.
	var header = document.getElementById('header');
	var toggleBtn = document.querySelector('#titleBar .toggle');

	if (toggleBtn && header) {

		toggleBtn.addEventListener('click', function(e) {
			e.preventDefault();
			document.body.classList.toggle('header-visible');
		});

		// Close panel when clicking outside.
		document.addEventListener('click', function(e) {
			if (!document.body.classList.contains('header-visible')) return;
			if (!header.contains(e.target) && e.target !== toggleBtn && !toggleBtn.contains(e.target)) {
				document.body.classList.remove('header-visible');
			}
		});

		// Close panel on swipe.
		var touchStartX = 0;
		document.addEventListener('touchstart', function(e) {
			touchStartX = e.changedTouches[0].screenX;
		}, { passive: true });
		document.addEventListener('touchend', function(e) {
			var dx = e.changedTouches[0].screenX - touchStartX;
			if (Math.abs(dx) > 50) {
				document.body.classList.remove('header-visible');
			}
		}, { passive: true });
	}

	// Smooth scroll for anchor-only links (e.g. #a_about).
	document.querySelectorAll('a[href^="#"]').forEach(function(link) {
		link.addEventListener('click', function(e) {
			var id = this.getAttribute('href');
			if (id === '#header') return; // titleBar toggle handled above
			var target = document.querySelector(id);
			if (target) {
				e.preventDefault();
				target.scrollIntoView({ behavior: 'smooth' });
			}
		});
	});

	// Active nav link tracking via IntersectionObserver (scroll-reveal + nav activation).
	var navLinks = document.querySelectorAll('#nav a');
	var sections = document.querySelectorAll('#main > section[id]');

	if (sections.length > 0 && 'IntersectionObserver' in window) {
		var observer = new IntersectionObserver(function(entries) {
			entries.forEach(function(entry) {
				if (!entry.isIntersecting) return;
				var id = entry.target.getAttribute('id');
				navLinks.forEach(function(link) {
					var href = link.getAttribute('href');
					if (href && (href === '#' + id || href.endsWith('#' + id))) {
						navLinks.forEach(function(l) {
							// only remove active from same-page anchors
							if (l.getAttribute('href') && l.getAttribute('href').charAt(0) === '#') {
								l.classList.remove('active');
							}
						});
						link.classList.add('active');
					}
				});
			});
		}, {
			threshold: 0.3,
			rootMargin: '-5% 0px -5% 0px'
		});

		sections.forEach(function(section) {
			observer.observe(section);
		});
	}

})();
