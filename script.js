// Custom Cursor
        const cursor = document.querySelector('.custom-cursor');
        let mouseX = 0, mouseY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursor.style.left = mouseX + 'px';
            cursor.style.top = mouseY + 'px';
        });

        // Hover effects for cursor
        document.querySelectorAll('a, button, .project-card, .skill-card').forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
        });

        // Matrix Background
        const canvas = document.querySelector('.matrix-bg');
        const ctx = canvas.getContext('2d');

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
        const matrixArray = matrix.split("");
        const fontSize = 10;
        const columns = canvas.width / fontSize;
        const drops = [];

        for (let x = 0; x < columns; x++) {
            drops[x] = 1;
        }

        function drawMatrix() {
            ctx.fillStyle = 'rgba(10, 10, 10, 0.04)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.fillStyle = '#00ffff';
            ctx.font = fontSize + 'px JetBrains Mono';
            
            for (let i = 0; i < drops.length; i++) {
                const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }

        setInterval(drawMatrix, 35);

        // Resize canvas
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });

        // Typewriter Effect
        const typewriter = document.getElementById('typewriter');
        const phrases = [
            'B.S. in Computer Engineering',
            'Software Developer',
            'Prev Product Ops Intern @ Motorola',
            'Applied AI Engineer',
        ];
        
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function typeEffect() {
            const currentPhrase = phrases[phraseIndex];
            
            if (isDeleting) {
                typewriter.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typewriter.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = isDeleting ? 30 : 60;

            if (!isDeleting && charIndex === currentPhrase.length) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                typeSpeed = 500;
            }

            setTimeout(typeEffect, typeSpeed);
        }

        // Floating Particles
        function createParticles() {
            const particlesContainer = document.querySelector('.particles');
            const particleCount = 50;

            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.classList.add('particle');
                particle.style.left = Math.random() * 100 + '%';
                particle.style.animationDuration = (Math.random() * 10 + 5) + 's';
                particle.style.animationDelay = Math.random() * 10 + 's';
                particlesContainer.appendChild(particle);
            }
        }

        // Smooth Scrolling
        function scrollToSection(sectionId) {
            const element = document.getElementById(sectionId);
            const navHeight = document.querySelector('nav').offsetHeight;
            const targetPosition = element.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }

        // Form Submission
        
        document.getElementById('contactForm').addEventListener('submit', async function(e) {
            e.preventDefault();
            const form = this;
            const submitBtn = form.querySelector('.submit-btn');
            const successMessage = document.getElementById('successMessage');

            submitBtn.textContent = 'Sending...';
            submitBtn.style.opacity = '0.7';

            const payload = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };

            try {
                const res = await fetch('/api/contact', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
                if (!res.ok) throw new Error('Request failed');
                form.reset();
                successMessage.textContent = '> Message sent successfully! I\'ll get back to you soon.';
                successMessage.style.display = 'block';
            } catch (err) {
                successMessage.textContent = '> Something went wrong. Please try again.';
                successMessage.style.display = 'block';
            } finally {
                submitBtn.textContent = 'Execute Send()';
                submitBtn.style.opacity = '1';
                setTimeout(() => { successMessage.style.display = 'none'; }, 5000);
            }
        });
    

        // Scroll Animations
        function animateOnScroll() {
            const elements = document.querySelectorAll('.fade-in');
            elements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const elementVisible = 150;
                
                if (elementTop < window.innerHeight - elementVisible) {
                    element.classList.add('visible');
                }
            });
        }

        // Loading Screen
        window.addEventListener('load', () => {
            setTimeout(() => {
                document.getElementById('loadingScreen').classList.add('hidden');
                typeEffect();
                createParticles();
            }, 3000);
        });

        // Event Listeners
        window.addEventListener('scroll', animateOnScroll);
        
        // Initialize
        animateOnScroll();

        // Glitch effect on scroll
        let lastScrollY = window.scrollY;
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            const scrollDiff = Math.abs(currentScrollY - lastScrollY);
            
            if (scrollDiff > 50) {
                document.querySelector('.hero h1').style.animation = 'glitch 0.3s';
                setTimeout(() => {
                    document.querySelector('.hero h1').style.animation = '';
                }, 300);
            }
            
            lastScrollY = currentScrollY;
        });

        // Terminal typing sound effect simulation
        document.addEventListener('keydown', () => {
            // Visual feedback for typing
            document.body.style.boxShadow = '0 0 20px rgba(0, 255, 255, 0.1)';
            setTimeout(() => {
                document.body.style.boxShadow = '';
            }, 100);
        });

        // Random glitch effects
        setInterval(() => {
            if (Math.random() < 0.1) {
                const glitchElements = document.querySelectorAll('.glitch');
                const randomElement = glitchElements[Math.floor(Math.random() * glitchElements.length)];
                if (randomElement) {
                    randomElement.style.animation = 'glitch 0.3s';
                    setTimeout(() => {
                        randomElement.style.animation = '';
                    }, 300);
                }
            }
        }, 5000);

        // Enhanced hover effects
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) rotateY(5deg) rotateX(5deg)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = '';
            });
        });

        // Dynamic background color shift
        let hue = 180;
        setInterval(() => {
            hue = (hue + 1) % 360;
            document.documentElement.style.setProperty('--primary-cyan', `hsl(${hue}, 100%, 50%)`);
        }, 100);
