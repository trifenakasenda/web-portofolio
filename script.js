// script.js
document.addEventListener('DOMContentLoaded', () => {
    // -------------------- 1. NAVIGATION (Pages) --------------------
    const pages = {
        home: document.getElementById('home-page'),
        gallery: document.getElementById('gallery-page'),
        blog: document.getElementById('blog-page'),
        contact: document.getElementById('contact-page')
    };
    
    const navItems = document.querySelectorAll('.nav-links li');
    
    function switchPage(pageId) {
        // hide all pages
        Object.values(pages).forEach(page => {
            if(page) page.classList.remove('active-page');
        });
        // show selected page
        if(pages[pageId]) pages[pageId].classList.add('active-page');
        
        // update active nav style
        navItems.forEach(item => {
            const pageAttr = item.getAttribute('data-page');
            if(pageAttr === pageId) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
        
        // Optional: re-render gallery if needed but gallery already rendered once
        if(pageId === 'gallery' && !window._galleryRendered) {
            renderGallery();
            window._galleryRendered = true;
        }
        if(pageId === 'blog' && !window._blogRendered) {
            renderBlogs();
            window._blogRendered = true;
        }
    }
    
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            const pageName = item.getAttribute('data-page');
            if(pageName) switchPage(pageName);
        });
    });
    
    // default active: home
    switchPage('home');
    
    // -------------------- 2. GALLERY (unsplash random + local backup) --------------------
    // stock images array (high quality free-to-use random pics, or nice aesthetic)
// -------------------- 2. GALLERY (LOCAL IMAGES ONLY) --------------------
const localGallery = [
    { src: 'img/Foto1.png', caption: '✦ my portrait' },
    { src: 'img/Foto2.jpg', caption: '✦ best Friend' },
    { src: 'img/Foto3.jpeg', caption: '✦ My boy' },
    { src: 'img/Foto4.jpg', caption: '✦ choir day' },
    { src: 'img/Foto5.jpeg', caption: '✦ nail art' },
    { src: 'img/Foto6.jpg', caption: '✦ sky view' },
    { src: 'img/Foto7.jpg', caption: '✦ daily life' },
    { src: 'img/Foto8.jpeg', caption: '✦ Favorite cartoon' }
];

function renderGallery() {
    const galleryContainer = document.getElementById('gallery-container');
    if(!galleryContainer) return;

    galleryContainer.innerHTML = '';

    localGallery.forEach(item => {
        const card = document.createElement('div');
        card.className = 'gallery-card';

        card.innerHTML = `
            <img src="${item.src}" alt="${item.caption}" loading="lazy">
            <div class="caption">${item.caption}</div>
        `;

        galleryContainer.appendChild(card);
    });

        
        // optional fetch from unsplash (just to show dynamic but we want no CORS issue?)
        // we'll add 2 bonus unsplash images using placeholder api? but picsum is fine.
        // no external library needed, already fine.
    }
    
    // -------------------- 3. BLOG DATA & RENDER (3 different themes) --------------------
    const blogArticles = [
        {
            title: "🔮 Teknologi & Keseharian: Antara Koneksi dan Digital Fatigue",
            date: "10 Mei 2026",
            preview: "Sebagai mahasiswa Teknik Informatika, aku sering merenung bagaimana algoritma membentuk realitas kita. Dalam seminggu terakhir, aku eksperimen digital detox dan menemukan bahwa teknologi seharusnya memberi ruang, bukan stress...",
            fullContent: "Teknologi bukan hanya tentang kode dan server. Bagi saya, pemrograman web adalah medium untuk merepresentasikan diri. Namun sadar atau tidak, kita sering terjebak doomscrolling. Solusi: memakai fitur 'focus mode', mindful notification, dan memprioritaskan interaksi offline. Keseimbangan adalah kunci. Teknologi harus melayani manusia, bukan sebaliknya. Sebagai developer masa depan, saya ingin menciptakan antarmuka yang etis dan menenangkan. 💻"
        },
        {
            title: "🎀 Himpunan & Softskill: Belajar Leadership dari UKM Kampus",
            date: "15 April 2026",
            preview: "Bergabung di himpunan mahasiswa mengajarkanku bahwa kolaborasi lebih dari sekedar tugas. Dari menjadi panitia event, aku belajar negosiasi, manajemen waktu, dan tentunya public speaking yang lebih baik...",
            fullContent: "Himpunan mahasiswa menjadi ruang kedua setelah kelas. Awalnya malu-malu, kini aku lebih percaya diri menyampaikan gagasan. Seringkali kita anggap sepele, namun skill seperti empati, ketegasan, dan kerja tim sangat diperlukan di dunia kerja nanti. Selain itu, networking dengan kakak tingkat memberi sudut pandang baru tentang proyek akhir dan magang. Rekomendasi: jangan hanya fokus IPK, tapi juga pengalaman organisasi yang membangun karakter. ✨"
        },
        {
            title: "💄 Kecantikan Dalam Diri: Self-Love dan Rutinitas yang Menenangkan",
            date: "2 Mei 2026",
            preview: "Bicara kecantikan bukan hanya fisik, tapi bagaimana kita merawat mental. Skincare, journaling, atau sekadar dengerin playlist favorit bisa menjadi bentuk apresiasi pada diri sendiri...",
            fullContent: "Awalnya saya pikir kecantikan itu tentang standar orang lain. Tapi semakin dewasa, aku sadar glow up terbaik berasal dari inner peace. Aku suka melakukan 'me time' di akhir pekan: maskeran, menulis jurnal rasa syukur, dan membaca buku ringan. Kecantikan juga soal menerima kekurangan dan merayakan kemajuan kecil. Untuk teman-teman yang merasa lelah, ingatlah bahwa kamu sudah cukup. Dan jangan lupa istirahat, minum air putih, dan senyum pada cermin setiap pagi. 🎀"
        }
    ];
    
    function renderBlogs() {
        const blogContainer = document.getElementById('blog-list-container');
        if(!blogContainer) return;
        blogContainer.innerHTML = '';
        
        blogArticles.forEach((post, idx) => {
            const blogDiv = document.createElement('div');
            blogDiv.className = 'blog-post';
            blogDiv.setAttribute('data-blog-idx', idx);
            blogDiv.innerHTML = `
                <h3>${post.title}</h3>
                <div class="blog-meta">📅 ${post.date}</div>
                <p class="blog-preview">${post.preview}</p>
                <button class="read-more" data-idx="${idx}">➤ Baca selengkapnya</button>
                <div class="blog-full hidden-content" style="display: none; margin-top: 1rem; padding: 1rem; background: rgba(0,0,0,0.4); border-radius: 1.2rem;">${post.fullContent}</div>
            `;
            blogContainer.appendChild(blogDiv);
        });
        
        // attach read more events
        document.querySelectorAll('.read-more').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const idx = btn.getAttribute('data-idx');
                const parentPost = btn.closest('.blog-post');
                const fullDiv = parentPost.querySelector('.blog-full');
                if(fullDiv.style.display === 'none' || fullDiv.style.display === '') {
                    fullDiv.style.display = 'block';
                    btn.textContent = '▲ Sembunyikan';
                } else {
                    fullDiv.style.display = 'none';
                    btn.textContent = '➤ Baca selengkapnya';
                }
            });
        });
    }
    
    // initially render both gallery+blog in background, but we need to show only if page visited.
    // but to prevent empty when switching, we call render when page first active.
    window._galleryRendered = false;
    window._blogRendered = false;
    
    // Preload only if gallery page? but better trigger when needed but also ensure if already opened.
    const observer = new MutationObserver(() => {
        if(pages.gallery.classList.contains('active-page') && !window._galleryRendered) {
            renderGallery();
            window._galleryRendered = true;
        }
        if(pages.blog.classList.contains('active-page') && !window._blogRendered) {
            renderBlogs();
            window._blogRendered = true;
        }
    });
    observer.observe(document.getElementById('gallery-page'), { attributes: true, attributeFilter: ['class'] });
    observer.observe(document.getElementById('blog-page'), { attributes: true, attributeFilter: ['class'] });
    
    // but also if someone quickly clicks, initial check
    if(pages.gallery.classList.contains('active-page')) {
        renderGallery();
        window._galleryRendered = true;
    }
    if(pages.blog.classList.contains('active-page')) {
        renderBlogs();
        window._blogRendered = true;
    }
    
    // -------------------- 4. CONTACT FORM (without any external, only localStorage simulation + alert feedback) --------------------
    const contactForm = document.getElementById('uniquemessageForm');
    const feedbackDiv = document.getElementById('uniqueFeedback');
    
    if(contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('uniqueName').value.trim();
            const email = document.getElementById('uniqueEmail').value.trim();
            const message = document.getElementById('uniqueMsg').value.trim();
            
            if(!name || !email || !message) {
                feedbackDiv.innerHTML = '⚠️ Semua bidang harus diisi, ya!';
                feedbackDiv.style.color = '#ffabab';
                setTimeout(() => { feedbackDiv.innerHTML = ''; }, 2000);
                return;
            }
            if(!email.includes('@') || !email.includes('.')) {
                feedbackDiv.innerHTML = '📧 Email tidak valid, sertakan @ dan domain.';
                feedbackDiv.style.color = '#ffabab';
                setTimeout(() => { feedbackDiv.innerHTML = ''; }, 2000);
                return;
            }
            
            // log ke console & tampilan sukses
            console.log(`Pesan dari ${name} (${email}): ${message}`);
            feedbackDiv.innerHTML = '✨ Terima kasih! Pesanmu sudah terkirim ke Fena. Akan dibalas via email 💖';
            feedbackDiv.style.color = '#c2f2b0';
            contactForm.reset();
            setTimeout(() => {
                if(feedbackDiv) feedbackDiv.innerHTML = '';
            }, 3000);
        });
    }
    
    // tiny extra: glitch effect random only for home? optional but no external
    const glitchSpan = document.querySelector('.glitch-text');
    if(glitchSpan) {
        setInterval(() => {
            if(Math.random() > 0.93 && document.getElementById('home-page').classList.contains('active-page')) {
                glitchSpan.style.transform = 'skew(2deg)';
                setTimeout(() => { glitchSpan.style.transform = ''; }, 120);
            }
        }, 800);
    }
    
    // 5. Bonus: smooth CSS already, but handle photo error fallback for gallery (already onerror)
});