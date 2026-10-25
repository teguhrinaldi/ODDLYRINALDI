'use client';

import {
	createContext,
	useContext,
	useEffect,
	useMemo,
	useCallback,
	useRef,
	useState,
	useSyncExternalStore,
	type ReactNode,
} from 'react';

export type Language = 'en' | 'id';
const STORAGE_KEY = 'oddly-language';
const idText: Record<string, string> = {
	'Welcome to': 'Selamat datang di',
	'Back to collection': 'Kembali ke koleksi',
	'Online Course / Education': 'Kursus Online / Pendidikan',
	'one-time': 'sekali bayar',
	'Buy Template — $20': 'Beli Template — $20',
	'View Live Demo': 'Lihat Demo Langsung',
	'Live Demo — Coming Soon': 'Demo Langsung — Segera Hadir',
	'Instant delivery. Full source code, and 3 months of free updates included.':
		'Dikirim langsung. Termasuk seluruh source code,  dan pembaruan gratis selama 3 bulan.',
	'Psst… hover it': 'Coba arahkan kursor',
	'yes, this one.': 'Nah, yang ini.',
	Gallery: 'Galeri',
	'look closer': 'Lihat lebih dekat',
	'Temporary preview imagery — real product screenshots replace these before launch.':
		'Gambar pratinjau sementara — tangkapan layar produk akan menggantikannya sebelum peluncuran.',
	'Template story': 'Cerita di balik template',
	'Why SY NTRA?': 'Kenapa SYNTRA?',
	Concept: 'Konsep',
	"Who it's for": 'Untuk siapa',
	'The experience': 'Pengalaman',
	'Signature detail': 'Detail khas',
	'Best used for': 'Cocok untuk',
	'Made with care': 'Dibuat dengan sepenuh hati',
	'What you get': 'Yang akan kamu dapatkan',
	Features: 'Fitur',
	'Tech stack': 'Teknologi',
	"What's included": 'Termasuk di dalamnya',
	'You might also like': 'Mungkin kamu juga suka',
	'click around': 'Lihat-lihat dulu',
	'A premium service': 'Layanan premium',
	'Custom website': 'Website kustom',
	'Not just a website.': 'Bukan sekadar website.',
	'A digital identity': 'Identitas digital',
	'made for you.': 'yang dirancang untukmu.',
	"Tell us what you imagine. We'll help turn it into a website with personality — reviewed by hand, never a template dump.":
		'Ceritakan ide yang kamu bayangkan. Kami akan membantu mewujudkannya menjadi website berkarakter yang ditinjau langsung, bukan sekadar memasang template.',
	'Start your brief': 'Mulai isi brief',
	'See how it works': 'Lihat cara kerjanya',
	'Creative brief': 'Brief kreatif',
	"Let's create a website that feels completely yours.":
		'Mari buat website yang benar-benar terasa milikmu.',
	'Answer a few guided questions — it takes a few minutes. Nothing here is submitted to a server; at the end, your brief is handed straight to Oddlyrinaldi through WhatsApp or email.':
		'Jawab beberapa pertanyaan terpandu—hanya perlu beberapa menit. Jawabanmu tidak dikirim ke server. Setelah selesai, brief akan langsung diteruskan ke Oddlyrinaldi melalui WhatsApp atau email.',
	'Prefer to talk first?': 'Ingin ngobrol dulu?',
	'No pressure to fill out the whole brief right now.':
		'Kamu tidak harus mengisi seluruh brief sekarang.',
	'Chat on WhatsApp': 'Chat lewat WhatsApp',
	'Common questions about custom projects.':
		'Pertanyaan umum tentang proyek kustom.',
	'Tell us what you imagine': 'Ceritakan bayanganmu',
	'Fill out a guided creative brief — no jargon required.':
		'Isi brief kreatif terpandu—tanpa istilah teknis yang membingungkan.',
	'We shape the direction': 'Kami susun arah desainnya',
	'We review your brief and come back with scope, price, and timeline.':
		'Kami meninjau brief-mu lalu mengabari cakupan, harga, dan waktunya.',
	'You approve on WhatsApp': 'Setujui lewat WhatsApp',
	'Confirm the details directly in chat and the build begins.':
		'Konfirmasikan detailnya lewat chat, lalu pengerjaan dimulai.',
	'SEE THE FULL BRIEF →': 'LIHAT BRIEF LENGKAP →',
	'See the full brief →': 'Lihat brief lengkap →',
	'Full name': 'Nama lengkap',
	'Brand / business / personal name': 'Nama brand / bisnis / pribadi',
	'Email address': 'Alamat email',
	'WhatsApp number': 'Nomor WhatsApp',
	'Website or social media link': 'Tautan website atau media sosial',
	'What kind of website do you need?':
		'Website seperti apa yang kamu butuhkan?',
	'Website type': 'Jenis website',
	'Tell us what kind of website that is':
		'Ceritakan jenis website yang kamu butuhkan',
	'Choose the feeling you want people to experience when they visit. Pick as many as fit.':
		'Pilih kesan yang ingin dirasakan pengunjung saat membuka website-mu. Kamu bisa memilih lebih dari satu.',
	Personality: 'Karakter',
	'Describe your desired website personality in your own words':
		'Ceritakan karakter website yang kamu inginkan',
	Optional: 'Opsional',
	Back: 'Kembali',
	Reset: 'Ulangi',
	Continue: 'Lanjut',
	'Confirm & generate brief': 'Konfirmasi & buat brief',
	'Preparing your brief…': 'Menyiapkan brief-mu…',
	'Please fix the highlighted fields before continuing.':
		'Periksa kembali kolom yang ditandai sebelum melanjutkan.',
	'Some required fields still need your attention.':
		'Masih ada kolom wajib yang perlu kamu lengkapi.',
	'Tell us everything.': 'Ceritakan semuanya.',
	'Make it yours.': 'Buat sesuai gayamu.',
	'No boring websites.': 'Tak ada website yang membosankan.',
	'Your idea, but online.': 'Idemu, hadir secara online.',
	"Let's give it personality.": 'Mari beri karakter.',
	'A little weird is good.': 'Sedikit unik itu bagus.',
	'READ THE JOURNAL ↗': 'BACA JURNAL ↗',
	'SAY HELLO ↗': 'SAPA KAMI ↗',
	'Notes on design, code, and the small decisions behind each template.':
		'Catatan tentang desain, kode, dan keputusan kecil di balik setiap template.',
	'Stuck on something? Reach us at': 'Ada kendala? Hubungi kami di',
	"we're here when you need us.": 'kami siap membantu saat kamu butuh.',
	'What is ODDLYRINALDI?': 'Apa itu ODDLYRINALDI?',
	'Who is behind it?': 'Siapa di baliknya?',
	'The way I build': 'Cara saya berkarya',
	Philosophy: 'Filosofi',
	'How a template gets made': 'Bagaimana template dibuat',
	'Skills & tools': 'Keahlian & alat',
	'Find the rest of the work': 'Lihat karya lainnya',
	'Explore Templates': 'Jelajahi Template',
	'Contact the studio': 'Hubungi studio',
	'Contact the Studio': 'Hubungi Studio',
	'Visit Portfolio': 'Kunjungi Portofolio',
	'The Collection': 'Koleksi',
	'a little weird': 'sedikit unik',
	'12 templates. 12 personalities.': '12 template. 12 karakter.',
	'Every template is its own visual world — pick the one that matches yours.':
		'Setiap template punya dunia visualnya sendiri—pilih yang paling cocok denganmu.',
	Journal: 'Jurnal',
	Support: 'Bantuan',
	'Email support': 'Email tim bantuan',
	'Read the FAQ': 'Baca Tanya Jawab',
	"Stuck on something? We're here when you need us.":
		'Ada kendala? Kami siap membantu saat kamu butuh.',
	'Setup & documentation': 'Panduan & dokumentasi',
	'Every template ships with a written setup guide covering installation, environment variables, and deployment.':
		'Setiap template dilengkapi panduan tertulis tentang instalasi, variabel lingkungan, dan publikasi website.',
	'Bugs & template issues': 'Bug & masalah template',
	"Found something broken in the template itself? Email us with the template name and a description — we'll take a look.":
		'Menemukan masalah pada template? Kirim email beserta nama template dan penjelasannya. Kami akan memeriksanya.',
	'Everything else': 'Hal lainnya',
	'Customization questions, licensing questions, or just saying hi — teguhrinaldi23@gmail.com reaches a real inbox.':
		'Untuk pertanyaan tentang kustomisasi, lisensi, atau sekadar menyapa, email teguhrinaldi23@gmail.com akan sampai langsung kepada kami.',
	'Say hello.': 'Sapa kami.',
	'Questions about a template, a custom project, or just want to talk shop — the form below reaches us directly.':
		'Punya pertanyaan tentang template atau proyek kustom, atau ingin berdiskusi? Kirim pesan lewat formulir ini.',
	'Prefer email? Write to': 'Lebih suka email? Kirim pesan ke',
	"Your message has been sent. We'll get back to you soon.":
		'Pesanmu sudah terkirim. Kami akan segera menghubungimu.',
	'Tell us your name.': 'Masukkan namamu.',
	'Tell us a valid email address.': 'Masukkan alamat email yang valid.',
	'Tell us what you need.': 'Ceritakan kebutuhanmu.',
	Name: 'Nama',
	Email: 'Email',
	Message: 'Pesan',
	'Send message': 'Kirim pesan',
	'Sending…': 'Mengirim…',
	'Message sent': 'Pesan terkirim',
	'What do I actually get when I buy a template?':
		'Apa saja yang saya dapatkan saat membeli template?',
	'Can I use a template for a client project?':
		'Apakah template boleh digunakan untuk proyek klien?',
	'Do I need to know how to code to use a template?':
		'Apakah saya perlu bisa coding untuk menggunakan template?',
	'How do live demos work?': 'Bagaimana cara kerja demo langsung?',
	'What if I need help after purchasing?':
		'Bagaimana jika saya butuh bantuan setelah membeli?',
	'Do you offer refunds?': 'Apakah tersedia pengembalian dana?',
	'Can I customize the design after buying?':
		'Apakah desainnya bisa dikustomisasi setelah dibeli?',
	'Will I get updates if the template improves later?':
		'Apakah saya akan mendapat pembaruan jika template dikembangkan?',
	'Full source code (Next.js, TypeScript, Tailwind CSS, Framer Motion),  setup documentation, and three months of free updates. Everything is listed on each template\'s detail page under "What\'s included."':
		'Kode sumber lengkap (Next.js, TypeScript, Tailwind CSS, Framer Motion),  dokumentasi setup, dan pembaruan gratis selama tiga bulan. Rinciannya tersedia pada bagian "Yang akan kamu dapatkan" di halaman setiap template.',
	"Yes — each purchase covers one production deployment, whether it's your own brand or a client's. If you're building templates-of-templates for resale, reach out first.":
		'Ya. Setiap pembelian mencakup satu penggunaan untuk website aktif, baik untuk brand sendiri maupun klien. Hubungi kami terlebih dahulu jika ingin menjual ulang template sebagai produk.',
	'Email teguhrinaldi23@gmail.com any time. Support covers setup questions, bugs in the template itself, and guidance on customization.':
		'Kirim email ke teguhrinaldi23@gmail.com kapan saja. Kami membantu soal setup, bug pada template, dan panduan kustomisasi.',
	'Privacy Policy': 'Kebijakan Privasi',
	'Terms of Service': 'Ketentuan Layanan',
	'What we collect': 'Informasi yang kami kumpulkan',
	"How it's used": 'Cara penggunaan informasi',
	Cookies: 'Cookie',
	'Your rights': 'Hak-hakmu',
	'Changes to this policy': 'Perubahan kebijakan',
	'Using this site': 'Penggunaan situs',
	Purchases: 'Pembelian',
	Licensing: 'Lisensi',
	Availability: 'Ketersediaan',
	'Limitation of liability': 'Batas tanggung jawab',
	Changes: 'Perubahan',
	'Frequently asked questions.': 'Pertanyaan yang sering diajukan.',
	'Previous story': 'Cerita sebelumnya',
	'Next story': 'Cerita berikutnya',
	'Studio Notes': 'Catatan Studio',
	'Page Not Found': 'Halaman Tidak Ditemukan',
	'Browse Templates': 'Jelajahi Template',
	'Your website so far': 'Rangkuman websitemu',
	'Not specified': 'Belum diisi',
	'Basic identity': 'Identitas dasar',
	'Website personality': 'Karakter website',
	'Visual direction': 'Arah visual',
	'Content & assets': 'Konten & aset',
	'Technical preferences': 'Preferensi teknis',
	'Additional services': 'Layanan tambahan',
	'Budget & timeline': 'Anggaran & waktu',
	'Review your brief': 'Tinjau brief-mu',
	'Primary:': 'Utama:',
	'Secondary:': 'Sekunder:',
	'Accent:': 'Aksen:',
	'Name:': 'Nama:',
	'Brand / Project:': 'Brand / Proyek:',
	'Website Type:': 'Jenis Website:',
	'Website Personality:': 'Karakter Website:',
	'Personality Description:': 'Deskripsi Karakter:',
	'Color Direction:': 'Arah Warna:',
	'Typography:': 'Tipografi:',
	'Animation Preference:': 'Preferensi Animasi:',
	'Reference Websites:': 'Referensi Website:',
	'Design Restrictions:': 'Batasan Desain:',
	'Asset Preference:': 'Preferensi Aset:',
	'Asset Privacy:': 'Privasi Aset:',
	'Available Assets:': 'Aset yang Tersedia:',
	'Preferred Tech Stack:': 'Teknologi Pilihan:',
	'Required Features:': 'Fitur yang Dibutuhkan:',
	'Additional Services:': 'Layanan Tambahan:',
	'Budget:': 'Anggaran:',
	'Timeline:': 'Linimasa:',
	'Number of Pages:': 'Jumlah Halaman:',
	'Additional Notes:': 'Catatan Tambahan:',
	'SYNTRA is built for teaching, not just marketing. A curriculum layout that makes a course feel structured, an instructor profile that builds trust, and enrollment flows ready to connect to your platform of choice.':
		'SYNTRA dirancang untuk mengajar, bukan sekadar memasarkan. Susunan kurikulum membuat materi terasa terstruktur, profil pengajar membangun kepercayaan, dan alur pendaftaran siap dihubungkan ke platform pilihanmu.',
	'Connected intelligence': 'Kecerdasan yang terhubung',
	Education: 'Pendidikan',
	Courses: 'Kursus',
	Cohort: 'Program Kelompok',
	Curriculum: 'Kurikulum',
	'USD · one-time': 'USD · sekali bayar',
	"NOIRÉ is a moody, editorial template for restaurants that want their website to feel like the first course of the meal. Deep contrast, restrained motion, and a menu system built to make a chef's cooking feel inevitable rather than incidental.":
		'NOIRÉ adalah template editorial dengan suasana dramatis, untuk restoran yang ingin websitenya terasa seperti hidangan pembuka. Kontras yang kuat, animasi yang terukur, dan menu yang menonjolkan kreasi sang koki.',
	'I already have brand colors': 'Saya sudah punya warna brand',
	'Let the designer decide': 'Serahkan pada desainer',
	'Minimal and subtle': 'Minimal dan halus',
	'Smooth and premium': 'Halus dan premium',
	'Playful and interactive': 'Ceria dan interaktif',
	'Very animated': 'Banyak animasi',
	'Mostly static': 'Sebagian besar statis',
	'I will provide my own assets': 'Saya akan menyediakan aset sendiri',
	'Use public assets': 'Gunakan aset publik',
	'Mix of my assets and public assets': 'Gabungan aset saya dan aset publik',
	'I need help finding suitable assets':
		'Saya perlu bantuan mencari aset yang sesuai',
	'Public assets are okay': 'Aset publik boleh digunakan',
	'Use only my private assets': 'Gunakan aset pribadi saya saja',
	'Use a combination': 'Gunakan gabungan keduanya',
	'I am not sure yet': 'Saya belum yakin',
	'Product information': 'Informasi produk',
	'None yet': 'Belum ada',
	'CMS / content management': 'CMS / pengelolaan konten',
	'Product catalog': 'Katalog produk',
	'WhatsApp button': 'Tombol WhatsApp',
	'Reservation form': 'Formulir reservasi',
	'User login': 'Login pengguna',
	'Admin dashboard': 'Dashboard admin',
	'Filter and sorting': 'Filter dan pengurutan',
	'Video section': 'Bagian video',
	'Pricing section': 'Bagian harga',
	'Multi-language support': 'Dukungan multi bahasa',
	'SEO setup': 'Pengaturan SEO',
	'Analytics integration': 'Integrasi analitik',
	'Custom animations': 'Animasi kustom',
	'Custom cursor': 'Kursor kustom',
	'Page transitions': 'Transisi halaman',
	'Frontend only': 'Frontend saja',
	'Frontend with simple form integration':
		'Frontend dengan integrasi formulir sederhana',
	'Full-stack website': 'Website full-stack',
	'CMS required': 'Memerlukan CMS',
	'Database required': 'Memerlukan database',
	'I do not know — recommend the best option':
		'Saya belum tahu — sarankan opsi terbaik',
	'I already have hosting': 'Saya sudah punya hosting',
	'I need a recommendation': 'Saya perlu rekomendasi',
	'I prefer to discuss first': 'Saya ingin berdiskusi terlebih dahulu',
	'First, tell us about your project': 'Ceritakan dulu proyekmu',
	'What personality should your website have?':
		'Karakter seperti apa yang cocok untuk websitemu?',
	'What should the visual direction feel like?':
		'Seperti apa arah visual yang kamu inginkan?',
	'What content and assets do you already have?':
		'Konten dan aset apa yang sudah kamu miliki?',
	'How should your website be built?': 'Bagaimana website-mu sebaiknya dibuat?',
	'Would you like help with anything else?':
		'Apakah ada hal lain yang ingin dibantu?',
	"Let's understand the project scope": 'Mari tentukan cakupan proyeknya',
	'Check everything before it goes to the studio':
		'Periksa kembali sebelum brief dikirim ke studio',
	'e.g. Rana Wijaya': 'contoh: Rana Wijaya',
	'e.g. Kopi Senja': 'contoh: Kopi Senja',
	'e.g. 081234567890': 'contoh: 081234567890',
	'instagram.com/yourbrand': 'instagram.com/brandkamu',
	'e.g. Nonprofit donation site': 'contoh: website donasi nirlaba',
	'For example: mysterious, editorial, dark, luxurious, but still approachable...':
		'Contoh: misterius, editorial, gelap, mewah, tetapi tetap terasa akrab...',
	'ESTATEX trades loud sales copy for clarity: large photography, calm typography, and a listings system that lets the property do the talking. Built for agencies and independent agents who want to look like the most trustworthy option on the block.':
		'ESTATEX mengutamakan kejelasan: foto berukuran besar, tipografi yang tenang, dan daftar properti yang membiarkan bangunan berbicara. Dirancang untuk agensi dan agen independen yang ingin tampil tepercaya.',
	'AZURA is built around whitespace and horizon lines — big, breathing hero imagery, a booking flow that never feels like a form, and a room-showcase system that mirrors how a guest actually decides where to stay.':
		'AZURA mengandalkan ruang kosong dan garis cakrawala: visual utama yang lapang, alur pemesanan yang terasa alami, serta tampilan kamar yang membantu tamu menentukan pilihan.',
	'ARCANA treats a project archive like a monograph. Grid-driven layouts, generous margins, and a case-study template built for firms whose work needs room to be looked at, not scrolled past.':
		'ARCANA menyajikan arsip proyek layaknya monograf. Tata letak berbasis grid, ruang yang lapang, dan halaman studi kasus yang memberi karya ruang untuk dinikmati, bukan sekadar dilewati.',
	'VELORA is built for studios and agencies who sell taste as much as output. Bold type, an unapologetic case-study flow, and just enough irregularity to prove a human designed it.':
		'VELORA dirancang untuk studio dan agensi yang menjual selera sekaligus hasil karya. Tipografi tegas, alur studi kasus yang percaya diri, dan sentuhan asimetri yang terasa dibuat oleh manusia.',
	'FORGE is built to move. Kinetic type, class-schedule layouts, and a coach/program showcase designed for studios and trainers who need their site to feel as intense as the workout.':
		'FORGE dirancang untuk terus bergerak. Tipografi kinetis, jadwal kelas, dan profil pelatih serta program untuk studio kebugaran yang ingin websitenya terasa seintens latihannya.',
	'ATELIER moves like a lookbook: full-bleed imagery, slow pacing, and a lookbook / collection template that gives clothing room to breathe instead of competing with UI chrome.':
		'ATELIER mengalir seperti lookbook: gambar penuh, tempo yang tenang, dan halaman koleksi yang memberi ruang bagi busana untuk tampil tanpa gangguan elemen antarmuka.',
	'VANTA treats a vehicle lineup like a reveal. High-contrast photography, spec sheets that read like data, and a configurator-ready layout for dealerships, detailers, and performance brands.':
		'VANTA memperkenalkan jajaran kendaraan dengan dramatis. Foto berkontras tinggi, spesifikasi yang tersaji jelas, serta tata letak siap konfigurator untuk dealer dan brand otomotif performa.',
	'LUMORA is built for shops that treat a cut like a craft. Booking-first layout, a service menu that reads like a bar menu, and a barber/stylist roster designed to build repeat clients.':
		'LUMORA dibuat untuk barbershop yang menganggap potong rambut sebagai keahlian. Tata letak yang mengutamakan pemesanan, daftar layanan yang menarik, serta profil barber dan stylist untuk membangun pelanggan setia.',
	"NEURAL is a project management dashboard built for the people actually running the sprint, not the slide deck about it. Task boards, workload tracking, and team management all sit one click away from each other, in a dark UI that's built to be stared at for eight hours without getting tiring.":
		'NEURAL adalah dashboard manajemen proyek untuk orang-orang yang benar-benar menjalankan sprint. Papan tugas, pemantauan beban kerja, dan pengelolaan tim bisa diakses dengan mudah lewat antarmuka gelap yang nyaman dipakai sepanjang hari.',
	"NEXORA is built for AI products that do more than answer a prompt — a marketing homepage that sells 'intelligent workspace' in one line, backed by a real in-app dashboard with AI Studio, documents, and automations. High contrast, one accent color, zero visual noise competing with the product itself.":
		'NEXORA dibuat untuk produk AI yang lebih dari sekadar menjawab perintah. Halaman utamanya memperkenalkan ruang kerja cerdas, didukung dashboard berisi AI Studio, dokumen, dan otomatisasi. Kontras tegas dan satu warna aksen menjaga fokus pada produk.',
	'Personal portfolio': 'Portofolio pribadi',
	'Creative portfolio': 'Portofolio kreatif',
	'Business website': 'Website bisnis',
	'Company profile': 'Profil perusahaan',
	'Landing page': 'Halaman promosi',
	'Online store': 'Toko online',
	'Restaurant / café': 'Restoran / kafe',
	'Agency website': 'Website agensi',
	'Event website': 'Website acara',
	'Personal brand': 'Brand pribadi',
	'Blog / magazine': 'Blog / majalah',
	'Community website': 'Website komunitas',
	Other: 'Lainnya',
	Elegant: 'Elegan',
	Playful: 'Ceria',
	Bold: 'Berani',
	Experimental: 'Eksperimental',
	Futuristic: 'Futuristik',
	Editorial: 'Editorial',
	Luxury: 'Mewah',
	Warm: 'Hangat',
	Friendly: 'Ramah',
	Professional: 'Profesional',
	Artistic: 'Artistik',
	'Dark and cinematic': 'Gelap dan sinematik',
	'Colorful and energetic': 'Ceria dan penuh warna',
	Brutalist: 'Brutalis',
	Retro: 'Retro',
	'Soft and calm': 'Lembut dan menenangkan',
	'Tech-inspired': 'Bernuansa teknologi',
	Dark: 'Gelap',
	Light: 'Terang',
	Monochrome: 'Monokrom',
	Neutral: 'Netral',
	Colorful: 'Penuh warna',
	Pastel: 'Pastel',
	Neon: 'Neon',
	Earthy: 'Warna alam',
	'High contrast': 'Kontras tinggi',
	'Modern sans-serif': 'Sans-serif modern',
	'Elegant serif': 'Serif elegan',
	Monospace: 'Monospace',
	Handwritten: 'Tulisan tangan',
	'Mixed typography': 'Tipografi campuran',
	Cinematic: 'Sinematik',
	'Responsive design': 'Desain responsif',
	'Contact form': 'Formulir kontak',
	Blog: 'Blog',
	Testimonials: 'Testimoni',
	Search: 'Pencarian',
	'Newsletter form': 'Formulir buletin',
	'Booking form': 'Formulir pemesanan',
	Deployment: 'Publikasi website',
	Maintenance: 'Pemeliharaan',
	Logo: 'Logo',
	'Brand colors': 'Warna brand',
	'Personal photos': 'Foto pribadi',
	'Product photos': 'Foto produk',
	'Team photos': 'Foto tim',
	Illustrations: 'Ilustrasi',
	Videos: 'Video',
	'Written copy': 'Naskah tertulis',
	'Social media content': 'Konten media sosial',
	'Under Rp1.000.000': 'Di bawah Rp1.000.000',
	'As soon as possible': 'Secepatnya',
	Flexible: 'Fleksibel',
	'One landing page': 'Satu halaman promosi',
	Homepage: 'Halaman utama',
	'Inner Page': 'Halaman dalam',
	Mobile: 'Ponsel',
	Design: 'Desain',
	Development: 'Pengembangan',
	Studio: 'Studio',
	Process: 'Proses',
	Opinion: 'Opini',
	'5 min read': '5 menit baca',
	'4 min read': '4 menit baca',
	'6 min read': '6 menit baca',
	'7 min read': '7 menit baca',
	'3 months of free updates': 'Pembaruan gratis selama 3 bulan',
	'Full source code': 'Kode sumber lengkap',
	'Setup documentation': 'Dokumentasi setup',
	'Project archive grid with filtering': 'Grid arsip proyek dengan filter',
	'Case-study detail template': 'Halaman detail studi kasus',
	'Studio / team page': 'Halaman studio / tim',
	'Awards & publications list': 'Daftar penghargaan & publikasi',
	'Contact & inquiry section': 'Bagian kontak & pertanyaan',
	'Oversized editorial hero': 'Hero editorial berukuran besar',
	'Case-study / work archive': 'Arsip studi kasus / karya',
	'Services & process breakdown': 'Rincian layanan & proses',
	'Team / culture section': 'Bagian tim / budaya',
	'Client logo strip': 'Deretan logo klien',
	'High-energy kinetic hero': 'Hero kinetis penuh energi',
	'Class / program schedule grid': 'Grid jadwal kelas / program',
	'Coach profile cards': 'Kartu profil pelatih',
	'Membership pricing tiers': 'Pilihan harga keanggotaan',
	'Transformation / results gallery': 'Galeri transformasi / hasil',
	'Full-bleed lookbook hero': 'Hero lookbook layar penuh',
	'Collection / seasonal drop layout': 'Tata letak koleksi / rilisan musiman',
	'Editorial story template': 'Template cerita editorial',
	'Stockist / press section': 'Bagian penjual / media',
	'Newsletter capture': 'Formulir langganan buletin',
	'Curriculum / module breakdown': 'Rincian kurikulum / modul',
	'Instructor profile section': 'Bagian profil pengajar',
	'Enrollment & pricing tiers': 'Pilihan pendaftaran & harga',
	'Student testimonial grid': 'Grid testimoni siswa',
	'FAQ accordion': 'FAQ lipat',
	'High-contrast vehicle reveal hero': 'Hero kendaraan berkontras tinggi',
	'Model lineup & spec comparison': 'Deretan model & perbandingan spesifikasi',
	'Configurator-ready layout': 'Tata letak siap konfigurator',
	'Dealer / location finder section': 'Pencari dealer / lokasi',
	'Test-drive / inquiry CTA': 'Ajakan test drive / pertanyaan',
	'Booking-first hero layout': 'Tata letak hero yang mengutamakan pemesanan',
	'Service menu with pricing': 'Daftar layanan beserta harga',
	'Barber / stylist roster': 'Daftar barber / penata rambut',
	'Before & after gallery': 'Galeri sebelum & sesudah',
	'Location & hours block': 'Bagian lokasi & jam operasional',
	'Dashboard overview with active, completed, and overdue task cards':
		'Ringkasan dashboard dengan kartu tugas aktif, selesai, dan terlambat',
	'Task completion trend chart over the last 14 days':
		'Grafik tren penyelesaian tugas selama 14 hari terakhir',
	'Team workload overview with per-member progress bars':
		'Ringkasan beban kerja tim dengan bilah progres tiap anggota',
	'Priority tasks and upcoming deadlines panels':
		'Panel tugas prioritas dan tenggat mendatang',
	'Team management table with roles, status, and invites':
		'Tabel pengelolaan tim berisi peran, status, dan undangan',
	'Dark mode UI by default': 'Antarmuka mode gelap secara bawaan',
	'Marketing homepage with animated in-app product preview':
		'Halaman utama pemasaran dengan pratinjau produk dalam aplikasi yang bergerak',
	'In-app workspace with AI Studio, Chat, and Documents':
		'Ruang kerja dalam aplikasi dengan AI Studio, Chat, dan Dokumen',
	'Recent documents and active automations panels':
		'Panel dokumen terbaru dan otomatisasi aktif',
	'Dark UI with a single lime accent':
		'Antarmuka gelap dengan satu aksen hijau limau',
	'Do I need to know the technical details?':
		'Apakah saya perlu memahami detail teknisnya?',
	'No. You can choose "I am not sure" and we will recommend a suitable approach based on your project.':
		'Tidak. Pilih "Saya belum yakin" dan kami akan menyarankan pendekatan yang sesuai dengan proyekmu.',
	'Can I provide my own assets?': 'Bisakah saya menyediakan aset sendiri?',
	'Yes. You can provide logos, images, videos, brand guidelines, copy, or asset-folder links.':
		'Bisa. Kamu dapat menyediakan logo, gambar, video, panduan brand, naskah, atau tautan folder aset.',
	'Can you help with branding and design direction?':
		'Apakah kalian bisa membantu branding dan arah desain?',
	'Yes. You can request additional services such as brand direction, typography, color palettes, copywriting, image selection, and custom illustrations.':
		'Bisa. Kamu dapat meminta layanan tambahan seperti arahan brand, tipografi, palet warna, penulisan naskah, pemilihan gambar, dan ilustrasi khusus.',
	'Is the price fixed?': 'Apakah harganya sudah pasti?',
	'No. The final price depends on the number of pages, design complexity, animation, integrations, content, and technical requirements.':
		'Belum. Harga akhir bergantung pada jumlah halaman, kompleksitas desain, animasi, integrasi, konten, dan kebutuhan teknis.',
	'Will the website include a CMS or database?':
		'Apakah website akan menggunakan CMS atau database?',
	'That depends on your selected requirements. Frontend-only websites, CMS websites, and full-stack websites have different scopes and pricing.':
		'Tergantung kebutuhan yang kamu pilih. Website frontend saja, website dengan CMS, dan website full-stack memiliki cakupan serta harga yang berbeda.',
	'How do I place the order?': 'Bagaimana cara memesan?',
	'Complete the brief and send it to Oddlyrinaldi through WhatsApp. We will review the request and discuss the scope, price, and timeline.':
		'Lengkapi brief lalu kirim ke Oddlyrinaldi melalui WhatsApp. Kami akan meninjau permintaanmu dan membahas cakupan, harga, serta waktunya.',
	'Your selections will appear here as you go.':
		'Pilihanmu akan muncul di sini saat kamu mengisi formulir.',
	'RANGKUMAN WEBSITE-MU': 'RANGKUMAN WEBSITE-MU',
	'blank paper': 'kertas kosong',
	'a rough sketch': 'sketsa awal',
	typography: 'tipografi',
	'a complete world': 'website yang utuh',
	'nothing here is accidental': 'tak ada yang kebetulan',
	'Oddlyrinaldi Journal / Design Philosophy':
		'Jurnal Oddlyrinaldi / Filosofi Desain',
	'The soul': 'Jiwa',
	behind: 'di balik',
	'the screen.': 'layar.',
	'Every website begins with an idea.':
		'Setiap website bermula dari sebuah ide.',
	'A mood. A personality. A point of view.':
		'Sebuah suasana. Sebuah karakter. Sebuah sudut pandang.',
	'Here are the stories, decisions, and design philosophies behind the worlds we create.':
		'Inilah cerita, keputusan, dan filosofi desain di balik dunia-dunia yang kami ciptakan.',
	'made with intention': 'dibuat dengan penuh pertimbangan',
	'Design is not decoration.': 'Desain bukan sekadar hiasan.',
	'We do not begin with a layout.': 'Kami tidak memulai dari tata letak.',
	'We begin with a feeling.': 'Kami memulai dari sebuah rasa.',
	'Quiet.': 'Tenang.',
	'Loud.': 'Berani.',
	'Precise.': 'Presisi.',
	'Playful.': 'Ceria.',
	'Technical.': 'Teknis.',
	'Human.': 'Manusiawi.',
	'Mysterious.': 'Misterius.',
	'Warm.': 'Hangat.',
	'The design follows the personality. Every Oddlyrinaldi template is built as a different world — with its own visual language, rhythm, interaction, and purpose.':
		'Desain mengikuti karakternya. Setiap template Oddlyrinaldi dibangun sebagai dunia yang berbeda—dengan bahasa visual, ritme, interaksi, dan tujuannya sendiri.',
	'every detail has a reason': 'setiap detail punya alasan',
	'Different worlds. One studio.': 'Dunia yang berbeda. Satu studio.',
	'A learning platform': 'Platform pembelajaran',
	'should feel curious.': 'harus terasa mengundang rasa ingin tahu.',
	'A vehicle website': 'Website kendaraan',
	'should feel powerful.': 'harus terasa bertenaga.',
	'A grooming studio': 'Studio perawatan',
	'should feel personal.': 'harus terasa personal.',
	'A fashion atelier': 'Atelier mode',
	'should feel considered.': 'harus terasa penuh pertimbangan.',
	'A restaurant': 'Restoran',
	'should feel like an invitation.': 'harus terasa seperti sebuah ajakan.',
	'different worlds, different rules, one creative studio':
		'dunia berbeda, aturan berbeda, satu studio kreatif',
	'What we believe': 'Prinsip kami',
	'Design should have a point of view.': 'Desain perlu memiliki sudut pandang.',
	'Interaction should have a purpose.': 'Interaksi harus punya tujuan.',
	'A template should feel like a world, not a collection of sections.':
		'Template seharusnya terasa seperti sebuah dunia, bukan kumpulan bagian.',
	'Good motion guides attention.': 'Animasi yang baik mengarahkan perhatian.',
	'Details are never just decoration.': 'Detail bukan sekadar hiasan.',
	'the final thought': 'catatan penutup',
	'Like the idea?': 'Suka dengan idenya?',
	'Explore the {template.name} template.': 'Jelajahi template {template.name}.',
	'View template': 'Lihat template',
	'Live demo': 'Demo langsung',
	Template: 'Template',
	Category: 'Kategori',
	Signature: 'Ciri khas',
	'More template stories': 'Cerita template lainnya',
};
Object.assign(idText, {
	'Architecture / Studio': 'Arsitektur / Studio',
	'Choose your language to enter': 'Pilih bahasa kamu untuk masuk',
	'The Monograph, Not the Brochure': 'monograf, Bukan Brosur',
	'Websites that refuse to sit still': 'website yang menolak untuk bergerak',
	'ARCANA — The Monograph, Not the Brochure | ODDLYRINALDI':
		'ARCANA — monograf, Bukan Brosur | ODDLYRINALDI',
	'Architecture portfolios usually behave like brochures: a hero shot, a caption, a next button. ARCANA behaves like a monograph instead — the kind of book you slow down for.':
		'Portofolio arsitektur biasanya tampil seperti brosur: visual utama, keterangan, tombol berikutnya. ARCANA malah tampil seperti monografi — jenis buku yang membuat kamu lambat membacanya.',
	"ARCANA treats a project archive like a monograph, not a slideshow. Grid-driven layouts and generous margins give a firm's work room to be looked at, not scrolled past.":
		'ARCANA memperlakukan arsip proyek seperti monografi, bukan tayangan slide. Tata letak yang digerakkan oleh grid dan margin yang besar memberikan ruang kerja perusahaan untuk dilihat, bukan diabaikan.',
	'Some work deserves silence before it deserves a caption.':
		'Beberapa karya layak untuk dinikmati dalam suasana tenang sebelum layak diberi keterangan.',
	"The signature moment is patience: every case study opens on a single image, held in silence, before any text appears. It's a small pause that asks a visitor to actually look before they read.":
		'Momen khasnya adalah kesabaran: setiap studi kasus dibuka pada satu gambar, disimpan dalam keheningan, sebelum teks apa pun muncul. Ini adalah jeda kecil yang meminta pengunjung untuk benar-benar melihat sebelum membaca.',
	'Every case study opens on a single image held in silence before any text appears.':
		'Setiap studi kasus dibuka pada satu gambar yang disimpan dalam keheningan sebelum teks apa pun muncul.',
	"It's built for studios whose portfolio needs to be read, not skimmed — a small number of serious projects that deserve real depth over a large number of thin ones.":
		'Ini dibuat untuk studio yang portofolionya perlu dibaca, bukan dibaca sepintas — sejumlah kecil proyek serius yang layak mendapat kedalaman nyata dibandingkan sejumlah besar proyek yang dangkal.',
	'The tone stays exacting throughout: confident type, disciplined spacing, and nothing competing for attention with the work itself.':
		'Nadanya tetap tegas: tipe percaya diri, jarak yang disiplin, dan tidak ada yang bersaing untuk mendapatkan perhatian dengan pekerjaan itu sendiri.',
	'Architecture studios and firms with a small, serious body of work — practices that would rather show five projects properly than fifteen thinly.':
		'Studio dan perusahaan arsitektur dengan jumlah pekerjaan yang kecil dan serius - praktik yang lebih memilih menampilkan lima proyek dengan baik daripada lima belas proyek secara tipis.',
	'Structural, conceptual, and quiet — a project grid with filtering leads into a case-study template built for drawings and process, not just hero shots of finished buildings.':
		'Struktural, konseptual, dan tenang — grid proyek dengan penyaringan mengarah ke templat studi kasus yang dibuat untuk gambar dan proses, bukan hanya visual utama dari bangunan yang sudah jadi.',
	'The Work Is the Pitch': 'Karya adalah cara terbaik meyakinkan klien',
	'Fitness / Performance': 'Kebugaran / Kinerja',
	'Other worlds worth exploring': 'Dunia lain yang perlu dijelajahi',
	"ARCANA gives a project room to be looked at before it's explained.":
		'ARCANA memberikan ruang proyek untuk dilihat sebelum dijelaskan.',
	'made with a little weird': 'dibuat dengan sedikit aneh',
	'© 2026 OddlyRinaldi. All rights reserved.':
		'© 2026 AnehnyaRinaldi. Semua hak dilindungi hak cipta.',
	'Still not sitting still.': 'Masih tidak bergerak.',
	'A Moment Designed to Be Felt': 'Momen yang Dirancang untuk Dirasakan',
	'The Art of the Considered Detail': 'Seni dari Detail yang Dipertimbangkan',
	'Nothing moves quickly — every transition is paced like a page turn, not a scroll.':
		'Tidak ada yang bergerak cepat — setiap transisi berjalan seperti membalik halaman, bukan scroll.',
	"Craft doesn't rush, and neither should the page showing it.":
		'kualitas pengerjaan tidak terburu-buru, begitu pula halaman yang menampilkannya.',
	"Fashion sites usually compete with their own UI — buttons, badges, chrome everywhere. ATELIER was built to get out of the clothes' way.":
		'Situs mode biasanya bersaing dengan UI mereka sendiri — tombol, lencana, elemen antarmuka di mana-mana. ATELIER dibangun untuk keluar dari masalah pakaian.',
	'ATELIER — The Art of the Considered Detail | ODDLYRINALDI':
		'ATELIER - Seni Detail yang Dipertimbangkan | ODDLYRINALDI',
	'The pacing is the point — this is a template for labels whose collection is the whole story, not a supporting cast to a sale banner.':
		'Intinya adalah temponya — ini adalah templat untuk label yang koleksinya merupakan keseluruhan cerita, bukan pelengkap banner diskon.',
	'ATELIER moves like a lookbook: full-bleed imagery, slow pacing, and a collection template that gives clothing room to breathe instead of competing with UI chrome.':
		'ATELIER bergerak seperti lookbook: citra penuh, tempo lambat, dan template koleksi yang memberikan ruang bagi pakaian untuk bernapas alih-alih bersaing dengan UI chrome.',
	"Editorial, tactile, controlled, and slow. Typography stays sophisticated and quiet, letting photography carry the season's story.":
		'Editorial, taktil, terkontrol, dan lambat. Tipografi tetap canggih dan tenang, membiarkan fotografi membawa cerita musim ini.',
	'The signature move is pacing itself: nothing moves quickly. Every transition is paced like a page turn, not a scroll — closer to flipping through a printed lookbook than browsing a feed.':
		'Gerakan khasnya berjalan dengan sendirinya: tidak ada yang bergerak dengan cepat. Setiap transisi berjalan seperti membalik halaman, bukan scroll — lebih mirip membalik-balik lookbook yang dicetak daripada menjelajahi feed.',
	'A stockist/press section and newsletter capture exist, but never at the expense of the full-bleed imagery that does the actual selling.':
		'Bagian stokis/pers dan formulir langganan buletin ada, tetapi tidak pernah mengorbankan citra penuh yang menghasilkan penjualan sebenarnya.',
	'Grooming / Barbershop': 'Perawatan / Tempat Pangkas Rambut',
	'Fashion labels and studios with strong photography and a seasonal drop to showcase — brands whose collection is the whole story.':
		'Label dan studio fesyen dengan fotografi yang kuat dan pameran musiman — merek yang koleksinya mewakili keseluruhan cerita.',
	'ATELIER is a digital space for things made slowly, and shown just as slowly.':
		'ATELIER adalah ruang digital untuk segala sesuatu yang dibuat secara perlahan, dan ditampilkan dengan lambat.',
	'AZURA — A Moment Designed to Be Felt | ODDLYRINALDI':
		'AZURA — Momen yang Dirancang untuk Dirasakan | ODDLYRINALDI',
	'Content Sells Before the Price Does': 'Konten Terjual Sebelum Harganya',
	'Hospitality / Booking': 'Perhotelan / Pemesanan',
	'Luxury Hotel / Resort': 'Hotel/Resor Mewah',
	"A resort is rarely booked because of its amenities list. It's booked because of a feeling — and AZURA is built to get that feeling across before a single price appears.":
		'Sebuah resor jarang dipesan karena daftar fasilitasnya. Ini dipesan karena suatu perasaan — dan AZURA dibuat untuk menyampaikan perasaan tersebut sebelum harga tunggal muncul.',
	'Soft, precise, and immersive — large-format imagery and generous negative space set a resort tone without ever tipping into clutter.':
		'Lembut, tepat, dan imersif — citra format besar dan ruang kosong yang luas memberikan nuansa resor tanpa membuat berantakan.',
	'A full-screen hero is allowed to breathe, mirroring how a guest actually decides where to stay: with a feeling first, a comparison second.':
		'hero layar penuh dibiarkan bernapas, mencerminkan bagaimana sebenarnya seorang tamu memutuskan tempat menginap: dengan perasaan terlebih dahulu, dan perbandingan kedua.',
	'AZURA is built around whitespace and horizon lines, so the destination sells the room before a single amenity is listed. The site is unhurried on purpose.':
		'AZURA dibangun di sekitar ruang kosong dan cakrawala, sehingga destinasi menjual kamar sebelum satu fasilitas dicantumkan. Situs ini sengaja dibuat tidak tergesa-gesa.',
	"A guest should feel the place before they're asked to book it.":
		'Tamu harus merasakan tempat tersebut sebelum diminta memesannya.',
	'Booking never interrupts the mood — the CTA drifts in only once a guest has felt the place.':
		'Pemesanan tidak pernah mengganggu suasana hati — CTA hanya muncul setelah tamu sudah merasakan tempatnya.',
	'Space, Without the Noise': 'Ruang tanpa hiruk-pikuk',
	'AZURA is designed so the first impression is already part of the stay.':
		'AZURA didesain sedemikian rupa sehingga kesan pertama sudah menjadi bagian dari pengalaman menginap.',
	'Every section is paced like a breath: image, pause, detail, pause. Nothing is rushed onto the screen at once.':
		'Setiap bagian berjalan seperti nafas: gambar, jeda, detail, jeda. Tidak ada yang muncul tergesa-gesa sekaligus.',
	'The fastest way to make a premium-looking site feel amateur is to animate everything. Bouncing icons, spinning logos, parallax on every element — it reads as effort, not craft.':
		'Cara tercepat untuk membuat situs yang tampak premium terasa amatir adalah dengan menganimasikan semuanya. Ikon yang memantul, logo yang berputar, paralaks di setiap elemen — terbaca sebagai usaha, bukan kualitas pengerjaan.',
	'The signature move is restraint: booking never interrupts the mood. The reservation call-to-action drifts in only once a guest has felt the place, following a room and suite showcase built to mirror how people actually choose where to stay.':
		'Langkah khasnya adalah menahan diri: pemesanan tidak pernah mengganggu suasana hati. Pesan ajakan (call-to-action) reservasi muncul hanya setelah tamu sudah merasakan tempat tersebut, mengikuti etalase kamar dan suite yang dibangun untuk mencerminkan bagaimana orang sebenarnya memilih tempat menginap.',
	'Building Motion Without Making a Website Annoying | ODDLYRINALDI':
		'Membangun Gerakan Tanpa Membuat Website Mengganggu | ODDLYRINALDI',
	'Building Motion Without Making a Website Annoying':
		'Membangun Gerakan Tanpa Membuat website Mengganggu',
	'Boutique hotels and resorts with strong photography and a story to tell before the booking form — brands selling a feeling first and a room second.':
		'Hotel dan resor butik dengan fotografi yang kuat dan cerita yang dapat diceritakan sebelum formulir pemesanan — merek yang menjual perasaan terlebih dahulu dan kamar yang kedua.',
	"Our rule of thumb: something should be still by default. Movement is a signal, and signals only work against a quiet baseline. That's why a single character gets a moment on a page instead of five doodles all wiggling at once.":
		'Aturan praktis kami: sesuatu harusnya tetap secara default. Pergerakan adalah sebuah sinyal, dan sinyal hanya bekerja pada garis dasar yang tenang. Itu sebabnya satu karakter mendapat momen di satu halaman, bukan lima coretan yang bergerak sekaligus.',
	'More from the journal': 'Lebih lanjut dari jurnal',
	'Why Every Template Needs a Personality':
		'Mengapa Setiap Template Membutuhkan Kepribadian',
	"We also gate everything behind prefers-reduced-motion, not as an afterthought but as a design constraint from day one — if a page doesn't work with motion turned off, the layout was leaning on a crutch.":
		'Kami juga membatasi segala hal di balik preferensi-gerakan yang dikurangi, bukan sebagai tambahan belakangan namun sebagai batasan desain sejak hari pertama — jika halaman tidak berfungsi dengan gerakan yang dinonaktifkan, tata letaknya bersandar pada penopang.',
	'The Story Behind ODDLYRINALDI': 'Kisah Dibalik ODDLYRINALDI',
	'Designing for Scroll and Surprise': 'Mendesain untuk Gulir dan Kejutan',
	'Framer Motion makes the mechanics easy. The discipline is entirely about what you choose not to animate.':
		'Framer Motion membuat mekanismenya menjadi mudah. Disiplin sepenuhnya tentang apa yang kamu pilih untuk tidak dianimasikan.',
	'Designing for Scroll and Surprise | ODDLYRINALDI':
		'Mendesain untuk Gulir dan Kejutan | ODDLYRINALDI',
	'We try to give each section its own motion identity — a carousel reveals horizontally, a manifesto section staggers, a footer barely moves at all. The variation is what keeps scrolling feeling alive instead of templated.':
		'Kami mencoba memberikan identitas gerakannya masing-masing pada setiap bagian — carousel muncul dari samping, bagian manifesto muncul bertahap, footer hampir tidak bergerak sama sekali. Variasi inilah yang membuat scroll terasa hidup alih-alih mengikuti pola.',
	'The best compliment we can get on a scroll interaction is that nobody mentions it. It should feel inevitable, not clever.':
		'Pujian terbaik yang bisa kami dapatkan dari interaksi gulir adalah tidak ada yang menyebutkannya. Ini seharusnya terasa tak terelakkan, bukan pintar.',
	'ESTATEX — Space, Without the Noise | ODDLYRINALDI':
		'ESTATEX - Ruang tanpa hiruk-pikuk | ODDLYRINALDI',
	"Every section doesn't need a fade-up. If everything reveals the same way, scrolling starts to feel like flipping through a slideshow rather than reading a page.":
		'Setiap bagian tidak memerlukan fade-up. Jika semuanya terlihat sama, scroll mulai terasa seperti membalik-balik tayangan slide daripada membaca halaman.',
	'Real Estate / Listings': 'Real Estat / Daftar',
	'Every property detail page opens with the same calm pacing as the homepage — nothing feels bolted on.':
		'Setiap halaman detail properti dibuka dengan tempo tenang yang sama seperti halaman beranda — tidak ada yang terasa ditempelkan.',
	"The best listing page gets out of the property's way.":
		'Halaman daftar terbaik tidak menghalangi properti.',
	'ESTATEX is built on the idea that clarity sells better than noise. Large photography and calm typography let a property speak for itself instead of competing with the page around it.':
		'ESTATEX dibangun berdasarkan gagasan bahwa kejernihan lebih baik daripada kebisingan. Fotografi berukuran besar dan tipografi yang tenang membuat properti berbicara sendiri alih-alih bersaing dengan halaman di sekitarnya.',
	"Most real-estate sites shout: bold banners, countdown offers, an agent's face in every hero. ESTATEX asks a different question — what if the property did the talking?":
		'Sebagian besar situs real estat berteriak: spanduk tebal, penawaran hitung mundur, wajah agen di setiap hero. ESTATEX menanyakan pertanyaan yang berbeda — bagaimana jika propertilah yang berbicara?',
	"That restraint is a trust signal. An agency that isn't shouting reads as an agency that doesn't need to.":
		'Pengekangan itu adalah sinyal kepercayaan. Agensi yang tidak berteriak dianggap sebagai agensi yang tidak perlu berteriak.',
	'The listings grid is treated like a catalog: consistent and filterable, never dressed up with effects that would make two different properties look like the same product.':
		'grid daftar diperlakukan seperti katalog: konsisten dan dapat difilter, tidak pernah dilengkapi dengan efek yang akan membuat dua properti berbeda terlihat seperti produk yang sama.',
	"Boutique agencies and independent agents whose listings are the real product and don't need extra noise around them — the kind of agency that wants to look like the most trustworthy option on the block.":
		'Agen butik dan agen independen yang listingannya merupakan produk asli dan tidak memerlukan hiruk-pikuk tambahan — jenis agen yang ingin terlihat seperti opsi paling tepercaya di kawasan tersebut.',
	'The signature is consistency rather than a single flashy moment: a filterable listings grid that feels like browsing a catalog, and a property detail page that opens with the exact same calm pacing as the homepage. Nothing about ESTATEX feels bolted on.':
		'Ciri khasnya adalah konsistensi, bukan satu momen mencolok: grid daftar yang dapat difilter yang terasa seperti menjelajahi katalog, dan halaman detail properti yang terbuka dengan tempo tenang yang sama persis seperti halaman beranda. Tidak ada apa pun tentang ESTATEX yang terasa melekat.',
	'A cool, neutral palette and generous whitespace keep the focus on photography, not decoration. Typography stays quiet and legible — this is a site meant to be read at a glance, not admired for its type system.':
		'Palet yang sejuk dan netral serta ruang putih yang luas menjaga fokus pada fotografi, bukan dekorasi. Tipografi tetap tenang dan mudah dibaca — ini adalah situs yang dimaksudkan untuk dibaca sekilas, bukan untuk dikagumi karena sistem tipenya.',
	'ESTATEX gives space the attention it deserves, and nothing more.':
		'ESTATEX memberikan ruang perhatian yang layak, dan tidak lebih.',
	'Culinary Choreography': 'Koreografi Kuliner',
	'FORGE — Built to Move | ODDLYRINALDI':
		'FORGE — Dibangun untuk Bergerak | ODDLYRINALDI',
	'Hover states hit like a rep count — sharp, immediate, no easing softness.':
		'Status hover menyerang seperti hitungan repetisi — tajam, langsung, tanpa kelembutan yang mereda.',
	'A website for a gym should feel like it just finished a set.':
		'website gym seharusnya terasa seperti baru saja menyelesaikan satu set.',
	"A gym's website is usually the calmest thing about the gym. FORGE was built to close that gap.":
		'website gym biasanya merupakan hal paling tenang di gym. FORGE dibangun untuk menutup kesenjangan tersebut.',
	'FORGE is built to move. Kinetic type and a class-schedule system are designed to feel as intense as the workout itself, not like a calm brochure bolted onto a loud brand.':
		'FORGE dibangun untuk bergerak. Tipe kinetik dan sistem jadwal kelas dirancang agar terasa sama intensnya dengan latihan itu sendiri, tidak seperti brosur tenang yang dipasang pada merek terkenal.',
	'Fitness / Gym / Coaching': 'Kebugaran / Gym / Pelatihan',
	'Coach profile cards, membership pricing tiers, and a transformation/results gallery all read as evidence, not decoration.':
		'Kartu profil pelatih, tingkatan harga keanggotaan, dan galeri transformasi/hasil semuanya dibaca sebagai bukti, bukan hiasan.',
	'Kinetic, disciplined, physical, loud — the type system carries weight and motion, and the layout favors momentum over politeness.':
		'Kinetik, disiplin, fisik, keras — sistem tipenya membawa bobot dan gerakan, dan tata letaknya lebih mengutamakan momentum daripada kesopanan.',
	"FORGE doesn't describe intensity. It moves like it.":
		'FORGE tidak menggambarkan intensitas. Ia bergerak seperti itu.',
	'From Concept to Commercial Template | ODDLYRINALDI':
		'Dari Konsep hingga Template Komersial | ODDLYRINALDI',
	"The site goes straight from a high-energy hero into a class and program schedule grid built for quick scanning — a fast path to 'when's the next class,' not a scroll-and-hope.":
		"Situs ini beralih dari hero berenergi tinggi ke dalam grid jadwal kelas dan program yang dibuat untuk pemindaian cepat — jalur cepat menuju 'kapan kelas berikutnya', bukan sekadar gulir dan harapan.",
	"The signature is in a detail most visitors won't consciously notice: hover states hit like a rep count — sharp, immediate, with no easing softness. Nothing lingers or drifts; it lands.":
		'Tanda tangannya terdapat dalam detail yang sebagian besar pengunjung tidak sadari: status hover menyerang seperti hitungan repetisi — tajam, segera, tanpa kelembutan yang mereda. Tidak ada yang tertinggal atau melayang; itu mendarat.',
	'From Concept to Commercial Template':
		'Dari Konsep hingga Template Komersial',
	'Gyms, coaches, and performance brands that train hard and want a site selling a program, not just a location.':
		'Pusat kebugaran, pelatih, dan merek pertunjukan yang berlatih keras dan menginginkan situs yang menjual program, bukan hanya lokasi.',
	"A template starts as a single reference image and a one-line personality brief. From there it's a rough layout pass in the browser — real type, real spacing — no detours or placeholders.":
		'Templat dimulai sebagai gambar referensi tunggal dan ringkasan kepribadian satu baris. Dari situlah tata letak kasar di browser - tipe asli, spasi nyata, tidak ada jalan memutar atau placeholder.',
	'LUMORA — A Shop of People, Not Services | ODDLYRINALDI':
		'LUMORA — Toko Manusia, Bukan Jasa | ODDLYRINALDI',
	'A Shop of People, Not Services': 'Toko Orang, Bukan Jasa',
	'Most barbershop sites list services like a price sheet. LUMORA starts with the people holding the clippers.':
		'Sebagian besar situs pangkas rambut mencantumkan layanan seperti lembar harga. LUMORA dimulai dengan orang yang memegang gunting.',
	'A shop of people is not the same as a shop of services.':
		'Toko orang tidak sama dengan toko jasa.',
	'The last stretch is the least glamorous and most important: responsive passes at five breakpoints, accessibility checks, and a lint/build pass with zero warnings before anything ships.':
		'Jalur terakhir adalah yang paling tidak glamor dan paling penting: jalur responsif di lima titik henti sementara, pemeriksaan aksesibilitas, dan jalur lint/build tanpa peringatan apa pun sebelum dikirimkan.',
	'Once the structure holds up, we build out the full page set: home, detail templates, and whatever the category actually needs (a menu system for a restaurant, a listings grid for real estate).':
		'Setelah strukturnya bertahan, kami membuat kumpulan halaman lengkap: beranda, templat detail, dan kategori apa pun yang benar-benar dibutuhkan (sistem menu untuk restoran, grid daftar untuk real estat).',
	'LUMORA is built for shops that treat a cut like a craft. A booking-first layout and a service menu that reads like a bar menu replace the usual price-list approach.':
		'LUMORA dibuat untuk toko yang memperlakukan potongan seperti kualitas pengerjaan tangan. Tata letak yang mengutamakan pemesanan dan menu layanan yang terbaca seperti menu bar menggantikan pendekatan daftar harga yang biasa.',
	'Every barber gets a real profile card — this is a shop of people, not just services.':
		'Setiap tukang cukur mendapat kartu profil asli — ini adalah toko orang, bukan hanya layanan.',
	'The site is built to build repeat clients, not just first bookings — familiarity is the actual product being sold.':
		'Situs ini dibuat untuk membangun klien tetap, bukan hanya pemesanan pertama — keakraban adalah produk sebenarnya yang dijual.',
	'Warm, personal, precise, and repeat-worthy. The palette stays warm rather than clinical, and the pacing favors a first visit that already feels familiar.':
		'Hangat, pribadi, tepat, dan layak untuk diulang. Paletnya tetap hangat daripada klinis, dan temponya mendukung kunjungan pertama yang sudah terasa familier.',
	'A before/after gallery and a location/hours block sit alongside the booking flow without ever making the shop feel like a chain.':
		'Galeri sebelum/sesudah dan blok lokasi/jam berada di samping alur pemesanan tanpa pernah membuat toko terasa seperti sebuah jaringan.',
	'Barbershops and grooming studios that live and die on repeat clients, where booking should feel like the easiest part of the visit.':
		'Tempat pangkas rambut dan studio perawatan yang hidup dan mati dengan klien tetap, di mana pemesanan seharusnya terasa seperti bagian termudah dari kunjungan.',
	'The signature choice is the roster: every barber gets a real profile card. This is a shop of people, not just services — a visitor picks a barber, not a slot.':
		'Pilihan tanda tangannya adalah daftarnya: setiap tukang cukur mendapat kartu profil asli. Ini adalah toko orang, bukan hanya jasa — pengunjung memilih tukang cukur, bukan slot.',
	'SaaS / Project Management': 'SaaS / Manajemen Proyek',
	'A Dashboard That Stays Out of the Way': 'Dasbor yang Tidak Mengganggu',
	'Project Management / SaaS Dashboard': 'Manajemen Proyek / Dasbor SaaS',
	'NEURAL — A Dashboard That Stays Out of the Way | ODDLYRINALDI':
		'NEURAL — Dasbor yang Tidak Mengganggu | ODDLYRINALDI',
	'LUMORA makes a cut feel like a ritual, not a transaction.':
		'LUMORA membuat pemotongan terasa seperti ritual, bukan transaksi.',
	"A workload overview that shows exactly who's overloaded before a stand-up has to ask.":
		'Ikhtisar beban kerja yang menunjukkan dengan tepat siapa yang kelebihan beban sebelum stand-up harus ditanyakan.',
	"Most dashboard templates are designed to look good in a screenshot — big charts, lots of color, a hero stat nobody checks twice. NEURAL came out of the opposite question: what does this look like on a Tuesday at 9am when someone's actually behind on something?":
		'Sebagian besar templat dasbor dirancang agar terlihat bagus di tangkapan layar — bagan besar, banyak warna, status hero tidak ada yang memeriksanya dua kali. NEURAL muncul dari pertanyaan sebaliknya: seperti apa hal ini pada hari Selasa jam 9 pagi ketika seseorang benar-benar ketinggalan dalam melakukan sesuatu?',
	"A team's dashboard should feel calmer than the team's actual week.":
		'Dasbor tim seharusnya terasa lebih tenang dibandingkan minggu sebenarnya tim.',
	"Everything else — active projects, completed tasks, workload — is one glance away, not one click away. It's built for someone who opens this fifteen times a day, not once a week.":
		'Segala sesuatu yang lain — proyek aktif, tugas yang diselesaikan, beban kerja — hanya berjarak satu pandangan, bukan satu klik saja. Ini dibuat untuk seseorang yang membukanya lima belas kali sehari, bukan sekali seminggu.',
	"NEURAL leads with the stuff that's actually overdue. Before any chart, there's a plain banner telling you three tasks need attention, with a button to go fix them. No dashboard should bury the bad news under the pretty numbers.":
		'NEURAL memimpin dengan hal-hal yang sebenarnya sudah lewat waktunya. Sebelum bagan apa pun, ada spanduk polos yang memberi tahu kamu tiga tugas yang perlu diperhatikan, dengan tombol untuk memperbaikinya. Tidak ada dasbor yang boleh mengubur berita buruk di bawah angka-angka cantik.',
	"NEURAL isn't trying to impress anyone. It's trying to get out of the way.":
		'NEURAL tidak mencoba untuk mengesankan siapa pun. Ia mencoba untuk menyingkir.',
	"The workload panel is basically just names and progress bars, on purpose. You don't need a chart to tell you Ethan has seven active tasks and Amara has three. Just say it.":
		'Panel beban kerja pada dasarnya hanyalah nama dan bilah kemajuan yang sengaja dibuat. kamu tidak memerlukan bagan untuk memberi tahu kamu bahwa Ethan memiliki tujuh tugas aktif dan Amara memiliki tiga tugas. Katakan saja.',
	"The one thing we spent real time on is the workload overview — it's meant to answer 'who's overloaded' before a stand-up even has to ask. That's a small feature that saves an actual meeting.":
		"Satu hal yang kami habiskan waktu sebenarnya adalah ikhtisar beban kerja — ini dimaksudkan untuk menjawab 'siapa yang kelebihan beban' bahkan sebelum stand-up bertanya. Itu adalah fitur kecil yang menyimpan rapat sebenarnya.",
	'Dark by default, with a single teal accent doing all the work — active nav item, primary buttons, the completed line on the chart. Nothing else competes for attention.':
		'Gelap secara default, dengan satu aksen teal melakukan semua pekerjaan — item navigasi aktif, tombol utama, garis selesai pada grafik. Tidak ada hal lain yang bersaing untuk mendapatkan perhatian.',
	"A Landing Page That Doesn't Lie": 'Halaman Arahan yang Tidak Berbohong',
	"NEXORA — A Landing Page That Doesn't Lie | ODDLYRINALDI":
		'NEXORA — Halaman Arahan yang Tidak Berbohong | ODDLYRINALDI',
	'Product teams, small agencies, and internal tools that need a workspace people will actually open every day — not a pitch deck about a workspace.':
		'Tim produk, agensi kecil, dan alat internal yang membutuhkan ruang kerja akan dibuka setiap hari — bukan presentasi singkat tentang ruang kerja.',
	"A lot of AI landing pages are basically fiction — a slick hero sitting on top of a product that doesn't exist yet, or exists but looks nothing like the screenshot. NEXORA started as a reaction to that: build the workspace first, then let the homepage describe it honestly.":
		'Banyak halaman arahan AI pada dasarnya adalah fiksi — hero apik yang duduk di atas produk yang belum ada, atau ada tetapi tidak terlihat seperti tangkapan layar. NEXORA dimulai sebagai reaksi terhadap hal tersebut: bangun ruang kerja terlebih dahulu, lalu biarkan beranda mendeskripsikannya dengan jujur.',
	'The workspace itself covers what an AI product actually needs — Studio, Chat, Documents, Automations — instead of pretending one chat window is the whole product.':
		'Ruang kerja itu sendiri mencakup apa yang sebenarnya dibutuhkan oleh produk AI — Studio, Obrolan, Dokumen, Otomatisasi — alih-alih berpura-pura bahwa satu jendela obrolan adalah keseluruhan produk.',
	"If the hero says 'intelligent workspace,' the product behind it should look like one.":
		"Jika hero mengatakan 'ruang kerja cerdas', produk di baliknya akan terlihat seperti itu.",
	'Near-black background, one lime accent, and not much else. It reads as confident rather than loud, which is harder to pull off than adding more color.':
		'Latar belakang hampir hitam, satu aksen kapur, dan tidak banyak lagi. Bunyinya lebih percaya diri daripada keras, yang lebih sulit dilakukan daripada menambahkan lebih banyak warna.',
	'One lime accent against near-black, used on exactly the things that matter: the primary action, the active nav item, nothing else.':
		'Satu aksen kapur dengan warna hampir hitam, digunakan pada hal-hal yang penting: tindakan utama, item navigasi aktif, tidak ada yang lain.',
	"NEXORA pairs a confident marketing hero with a real-feeling in-app preview right underneath it, so a visitor sees the actual thing they'd be signing up for, not a mockup that's prettier than the truth.":
		'NEXORA memasangkan hero pemasaran yang percaya diri dengan pratinjau dalam aplikasi yang terasa nyata tepat di bawahnya, sehingga pengunjung melihat hal sebenarnya yang ingin mereka ikuti, bukan maket yang lebih cantik dari aslinya.',
	'AI tools, automation platforms, and workspace products that need their first real site — something that can sit next to the actual product without embarrassing it.':
		'Alat AI, platform otomatisasi, dan produk ruang kerja yang memerlukan situs nyata pertamanya — sesuatu yang dapat ditempatkan di samping produk sebenarnya tanpa membuatnya malu.',
	'NEXORA sells the workspace by showing it, not by describing it.':
		'NEXORA menjual ruang kerja dengan menunjukkannya, bukan dengan mendeskripsikannya.',
	'The lime only ever shows up on things that matter — the primary CTA, the active tab, a stat trending up. If everything were lime, none of it would mean anything.':
		'Kapur hanya muncul pada hal-hal yang penting — CTA utama, tab aktif, statistik yang sedang tren. Jika semuanya kapur, tidak ada yang berarti apa-apa.',
	'NOIRÉ — Culinary Choreography | ODDLYRINALDI':
		'NOIRÉ - Koreografi Kuliner | ODDLYRINALDI',
	"Usage numbers — AI requests, documents created, credits remaining — sit right on the dashboard instead of being buried in a billing page. It's a small trust signal: this product isn't hiding how much you're actually using it.":
		'Nomor penggunaan — permintaan AI, dokumen yang dibuat, sisa kredit — berada tepat di dasbor alih-alih terkubur di halaman penagihan. Ini adalah sinyal kepercayaan kecil: produk ini tidak menyembunyikan seberapa sering kamu menggunakannya.',
	'A dining experience should begin before the first course.':
		'Pengalaman bersantap harus dimulai sebelum hidangan pertama.',
	'The reservation CTA only appears once the hero has had its moment — it never competes with the first impression.':
		'CTA reservasi hanya muncul setelah sang hero mendapatkan momennya — tidak pernah bersaing dengan kesan pertama.',
	"Most restaurant sites lead with information: address, hours, a reservation button above the fold. NOIRÉ leads with mood instead, on the belief that a guest decides how they feel about a place long before they read what's on the menu.":
		'Sebagian besar situs restoran memuat informasi: alamat, jam buka, tombol reservasi di paro atas. NOIRÉ memimpin dengan suasana hati, dengan keyakinan bahwa tamu memutuskan bagaimana perasaan mereka terhadap suatu tempat jauh sebelum mereka membaca apa yang ada di menu.',
	'Fine Dining / Restaurant': 'Restoran Mewah / Restoran',
	"NOIRÉ started with a question: what if a restaurant's website felt less like a menu screenshot and more like the ten minutes before your food arrives — the part where you're already leaning in?":
		'NOIRÉ memulai dengan sebuah pertanyaan: bagaimana jika website restoran tidak terasa seperti tangkapan layar menu dan lebih seperti sepuluh menit sebelum makanan kamu tiba — bagian yang sudah kamu minati?',
	'The hero is allowed to hold the screen. No offer competes with it, no banner interrupts it — the site earns the right to ask for a reservation only after it has made its case.':
		'hero diperbolehkan memegang layar. Tidak ada penawaran yang dapat menandinginya, tidak ada spanduk yang mengganggunya — situs berhak meminta reservasi hanya setelah situs tersebut menyatakan pendapatnya.',
	"The signature move is patience. The reservation call-to-action doesn't appear until the cinematic hero has had its full moment — it never competes with the first impression.":
		'Langkah khasnya adalah kesabaran. Ajakan bertindak reservasi tidak akan muncul sampai hero sinematik telah menikmati momen penuhnya — tidak pernah bersaing dengan kesan pertama.',
	'Deep contrast and restrained color set the tone — this is a dark room, not a bright storefront. Type is confident and editorial rather than friendly, closer to a menu card than a landing page.':
		'Kontras yang dalam dan warna yang terkendali menentukan suasananya — ini adalah ruangan yang gelap, bukan etalase toko yang terang. Jenisnya percaya diri dan editorial daripada ramah, lebih mirip kartu menu daripada halaman arahan.',
	'Photography carries the atmosphere: dim, tactile, a dark editorial grid rather than stock-photo lighting. Nothing is decorative for its own sake — every image is doing the work of setting a mood.':
		'Fotografi menghadirkan suasana: redup, taktil, kotak editorial yang gelap, bukan pencahayaan stok foto. Tidak ada yang bersifat dekoratif — setiap gambar berperan dalam mengatur suasana hati.',
	'Education / Courses / Cohort': 'Pendidikan / Kursus / Kelompok',
	'SYNTRA — Content Sells Before the Price Does | ODDLYRINALDI':
		'SYNTRA — Konten Terjual Sebelum Harganya | ODDLYRINALDI',
	"NOIRÉ isn't a restaurant website. It's the first course.":
		'NOIRÉ bukanlah website restoran. Ini kursus pertama.',
	"It's a small, deliberate delay, and it's the whole argument of the template: NOIRÉ would rather be felt for three extra seconds than clicked through in one.":
		'Ini adalah penundaan kecil yang disengaja, dan itulah keseluruhan argumen templatnya: NOIRÉ lebih suka dirasakan selama tiga detik ekstra daripada diklik dalam satu detik.',
	'Most course sites lead with a countdown timer and a price. SYNTRA leads with the curriculum, on the bet that a serious course sells itself if you actually show it.':
		'Sebagian besar situs kursus memiliki penghitung waktu mundur dan harga. SYNTRA memimpin dengan kurikulumnya, dengan taruhan bahwa kursus yang serius akan terjual dengan sendirinya jika kamu benar-benar menunjukkannya.',
	'Content should sell a course before the price ever gets a chance to.':
		'Konten harus menjual suatu kursus sebelum harga sempat mencapainya.',
	'The enrollment CTA sits beside the curriculum, not above it — the content sells before the price does.':
		'CTA pendaftaran berada di samping kurikulum, bukan di atasnya — konten terjual sebelum harganya.',
	"Chef-led restaurants and hospitality groups who want a site as considered as the food — a single-location restaurant or a chef's table concept launching its first real digital home, not a franchise needing ten location pages.":
		'Restoran dan grup perhotelan yang dipimpin oleh koki yang menginginkan situs yang dianggap sebagai makanan — restoran dengan satu lokasi atau konsep meja koki yang meluncurkan rumah digital pertamanya, bukan waralaba yang memerlukan sepuluh halaman lokasi.',
	'Structured, clear, connected, and credible — the type system favors legibility over flourish, since the content itself is the selling point.':
		'Terstruktur, jelas, terhubung, dan kredibel — sistem tipe lebih mengutamakan keterbacaan daripada perkembangan, karena konten itu sendiri adalah nilai jualnya.',
	'Enrollment is treated as the natural next step of a clear pitch, not the thing the whole page is racing toward.':
		'Pendaftaran diperlakukan sebagai langkah alami berikutnya dari promosi yang jelas, bukan hal yang ingin dicapai oleh seluruh halaman.',
	'A module-by-module curriculum breakdown, student testimonials, and an FAQ accordion are laid out like a syllabus a serious student would actually want to read.':
		'Perincian kurikulum modul demi modul, testimoni siswa, dan akordeon FAQ disusun seperti silabus yang benar-benar ingin dibaca oleh siswa yang serius.',
	'SYNTRA is built for teaching, not just marketing. A curriculum layout makes a course feel structured, and an instructor profile does the credibility work a testimonial carousel usually tries to fake.':
		'SYNTRA dibangun untuk pengajaran, bukan hanya pemasaran. Tata letak kurikulum membuat kursus terasa terstruktur, dan profil instruktur meningkatkan kredibilitas yang biasanya coba dipalsukan oleh carousel testimonial.',
	'SYNTRA lets the curriculum make the first argument.':
		'SYNTRA membiarkan kurikulum membuat argumen pertama.',
	'The signature choice is placement: the enrollment call-to-action sits beside the curriculum, not above it. The content sells before the price ever gets a chance to.':
		'Pilihan utamanya adalah penempatan: ajakan bertindak pendaftaran berada di samping kurikulum, bukan di atasnya. Kontennya terjual sebelum harganya sempat terjual.',
	'Cohort-based courses, educators, and instructors who need to build trust fast — a course that needs to look as credible as it actually is.':
		'Kursus berbasis kelompok, pendidik, dan instruktur yang perlu membangun kepercayaan dengan cepat — kursus yang harus terlihat kredibel sebagaimana adanya.',
	'The Story Behind ODDLYRINALDI | ODDLYRINALDI':
		'Kisah Dibalik ODDLYRINALDI | ODDLYRINALDI',
	'VANTA — Lit Like a Reveal | ODDLYRINALDI':
		'VANTA - Menyala Seperti Terungkap | ODDLYRINALDI',
	"ODDLYRINALDI started as a side answer to a boring question: why do so many 'creative studio' websites look like insurance companies? Clean isn't the same as memorable.":
		"ODDLYRINALDI dimulai sebagai jawaban sampingan atas pertanyaan membosankan: mengapa begitu banyak website 'studio kreatif' yang terlihat seperti perusahaan asuransi? Bersih tidak sama dengan berkesan.",
	'The name is exactly as odd as it sounds, on purpose. A studio selling personality should probably have one.':
		'Nama itu sengaja dibuat aneh kedengarannya. Tokoh penjual studio mungkin harus memilikinya.',
	"The characters — the cat, the dog, the duck — weren't a marketing decision. They were sketches that stuck around because they made the site feel like a place instead of a product page.":
		'Karakternya — kucing, anjing, bebek — bukanlah keputusan pemasaran. Itu adalah sketsa yang bertahan karena membuat situs terasa seperti sebuah tempat, bukan halaman produk.',
	'Automotive / Performance': 'Otomotif / Performa',
	'Most dealership sites photograph cars like inventory. VANTA photographs them like an unveiling.':
		'Sebagian besar situs dealer memotret mobil seperti inventaris. VANTA memotretnya seperti sebuah pembukaan.',
	'A vehicle should be lit like a reveal, not photographed like inventory.':
		'Kendaraan harus diterangi seperti pameran, bukan difoto seperti inventaris.',
	'VANTA treats a vehicle lineup like a reveal. High-contrast photography and spec sheets that read like data replace the flat, over-lit catalog shots most automotive sites default to.':
		'VANTA memperlakukan jajaran kendaraan seperti sebuah pengungkapan. Fotografi kontras tinggi dan lembar spesifikasi yang terbaca seperti data menggantikan gambar katalog yang datar dan terlalu terang yang digunakan sebagian besar situs otomotif.',
	'Vehicle imagery is always lit like a reveal — never a flat catalog shot.':
		'Citra kendaraan selalu terlihat jelas — tidak pernah berupa gambar katalog yang datar.',
	'The layout is configurator-ready, built for dealerships, detailers, and performance brands who sell precision as much as they sell horsepower.':
		'Tata letaknya siap untuk konfigurator, dibuat untuk dealer, detailer, dan merek performa tinggi yang menjual presisi sama seperti mereka menjual tenaga kuda.',
	'Controlled, engineered, dynamic, and dark — a dark-mode base and high-contrast type give every page the tension of a reveal event rather than a listings page.':
		'Terkendali, direkayasa, dinamis, dan gelap — basis mode gelap dan tipe kontras tinggi memberi setiap halaman ketegangan seperti acara pengungkapan, bukan halaman daftar.',
	'A model lineup with spec comparison and a dealer/location finder stay legible against the dark backdrop without ever softening the mood.':
		'Jajaran model dengan perbandingan spesifikasi dan dealer/pencari lokasi tetap dapat dibaca dengan latar belakang gelap tanpa mengurangi suasana.',
	"The signature discipline is lighting: vehicle imagery is always lit like a reveal, never a flat catalog shot. It's a small rule applied consistently across every model, and it's what keeps the whole lineup feeling premium.":
		'Disiplin khasnya adalah pencahayaan: citra kendaraan selalu menyala seperti tampilan, tidak pernah berupa gambar katalog datar. Ini adalah aturan kecil yang diterapkan secara konsisten di setiap model, dan itulah yang membuat seluruh jajaran produk terasa premium.',
	'Dealerships, detailers, and performance shops with a lineup worth showing off — brands selling precision as much as horsepower.':
		'Dealer, detailer, dan toko pertunjukan dengan jajaran produk yang patut dipamerkan — merek yang menjual presisi dan tenaga kuda.',
	"VANTA doesn't list a lineup. It reveals one.":
		'VANTA tidak mencantumkan lineup. Ini mengungkapkan satu hal.',
	'VELORA — The Work Is the Pitch | ODDLYRINALDI':
		'VELORA - Karya Adalah Pitch | ODDLYRINALDI',
	'Creative Agency / Portfolio': 'Agensi / Portofolio Kreatif',
	'VELORA is built for studios and agencies who sell taste as much as output. The site is designed to look like the work, not like a pitch deck explaining the work.':
		'VELORA dibuat untuk studio dan agensi yang menjual rasa dan juga output. Situs ini dirancang agar terlihat seperti sebuah karya, bukan seperti presentasi singkat yang menjelaskan karya tersebut.',
	'A portfolio should look like the studio that made it, not a pitch deck about it.':
		'Portofolio harus terlihat seperti studio yang membuatnya, bukan presentasi singkat tentangnya.',
	'The layout shifts rhythm case study to case study — nothing repeats exactly the same way twice.':
		'Tata letaknya mengubah ritme studi kasus ke studi kasus — tidak ada yang mengulangi cara yang sama dua kali.',
	"Most agency sites are careful to the point of being invisible. VELORA is built for studios who'd rather be recognizable than safe.":
		'Sebagian besar situs agensi berhati-hati hingga tidak terlihat. VELORA dibuat untuk studio yang lebih memilih dikenali daripada aman.',
	'That means bold type and just enough irregularity to prove a person — not a template generator — designed it.':
		'Itu berarti huruf tebal dan ketidakteraturan yang cukup untuk membuktikan bahwa seseorang — bukan pembuat templat — yang merancangnya.',
	'VELORA lets the work argue for itself.':
		'VELORA membiarkan karya tersebut berdebat sendiri.',
	'Nothing about the layout apologizes for taking up space — this is a studio site built to be looked at, not politely skimmed.':
		'Tata letaknya tidak meminta maaf karena memakan ruang — ini adalah situs studio yang dibuat untuk dilihat, bukan untuk dilihat dengan sopan.',
	'Energetic, expressive, and unapologetically human. An oversized editorial hero sets the tone before visitors ever reach the case-study archive.':
		'Energik, ekspresif, dan sangat manusiawi. hero editorial berukuran besar menentukan suasana sebelum pengunjung mencapai arsip studi kasus.',
	"The signature move is rhythm: the layout shifts from case study to case study, so nothing repeats exactly the same way twice. Scrolling through the archive should feel like flipping through a studio's actual process, not a repeating card component.":
		'Pergerakan khasnya adalah ritme: tata letaknya berpindah dari studi kasus ke studi kasus, jadi tidak ada yang mengulangi cara yang sama dua kali. scroll arsip akan terasa seperti menelusuri proses sebenarnya di studio, bukan komponen kartu yang berulang.',
	'Small studios and collectives that want their personality to be the pitch — agencies whose site should look like the work, not like a deck about the work.':
		'Studio dan kolektif kecil yang menginginkan kepribadian mereka menonjol — agensi yang situsnya harus terlihat seperti karya, bukan seperti kumpulan karya.',
	'Why Every Template Needs a Personality | ODDLYRINALDI':
		'Mengapa Setiap Template Membutuhkan Kepribadian | ODDLYRINALDI',
	"The result is templates that feel considered rather than assembled. That's the whole bet.":
		'Hasilnya adalah template yang terasa lebih dipertimbangkan daripada dibuat. Itulah keseluruhan pertaruhannya.',
	'Most template marketplaces sell layouts. A hero, a features grid, a footer — rearranged just enough to feel like a new product. It works, technically. It also means almost nothing you buy feels like it was made for you.':
		'Sebagian besar pasar templat menjual tata letak. hero, grid fitur, footer — disusun ulang secukupnya agar terasa seperti produk baru. Secara teknis, ini berhasil. Ini juga berarti hampir tidak ada barang yang kamu beli yang terasa dibuat untuk kamu.',
	"When we started ODDLYRINALDI, the rule was simple: no template ships until it has a personality strong enough to describe in one sentence. NOIRÉ is 'dark and mysterious.' AZURA is 'soft but precise.' If we can't say it in five words, the template isn't done.":
		"Saat kami memulai ODDLYRINALDI, aturannya sederhana: tidak ada template yang dikirimkan sampai template tersebut memiliki kepribadian yang cukup kuat untuk dijelaskan dalam satu kalimat. NOIRÉ adalah 'gelap dan misterius.' AZURA 'lembut tapi tepat'. Jika kita tidak bisa mengatakannya dalam lima kata, templatenya belum selesai.",
	'Why Generic Templates Feel Forgettable | ODDLYRINALDI':
		'Mengapa Template Generik Terasa Terlupakan | ODDLYRINALDI',
	"That constraint changes everything downstream — the type pairing, the motion timing, even how much whitespace a section is allowed to breathe in. Personality isn't a coat of paint at the end. It's the brief.":
		'Batasan tersebut mengubah segalanya di bagian hilir — pasangan tipe, waktu gerakan, bahkan berapa banyak spasi yang diperbolehkan untuk dihirup oleh suatu bagian. Kepribadian bukanlah lapisan cat pada akhirnya. Ini ringkasannya.',
	"None of that is wrong. It's just invisible. A visitor's brain has seen it enough times to stop reading it as a choice.":
		'Semua itu tidak salah. Itu tidak terlihat. Otak pengunjung telah melihatnya berkali-kali sehingga berhenti membacanya sebagai sebuah pilihan.',
	'Why Generic Templates Feel Forgettable':
		'Mengapa Template Generik Terasa Terlupakan',
	"The fix isn't more decoration — it's specificity. A restaurant site should feel like the restaurant. A gym site should feel like the gym. That's the whole premise of building ten templates as ten different worlds instead of one theme with ten color palettes.":
		'Cara mengatasinya bukanlah lebih banyak dekorasi — melainkan kekhususan. Situs restoran harus terasa seperti restoran. Situs gym harus terasa seperti gym. Itulah inti dari pembuatan sepuluh templat sebagai sepuluh dunia berbeda, bukan satu tema dengan sepuluh palet warna.',
	"Open ten template marketplaces and you'll see the same hero four different ways: big headline, subtext, two buttons, a stock photo of someone laughing at a laptop.":
		'Buka sepuluh pasar templat dan kamu akan melihat hero yang sama dalam empat cara berbeda: judul besar, subteks, dua tombol, foto stok seseorang menertawakan laptop.',
});
Object.assign(idText, {
	'Websites that refuse to sit still': 'Website yang berani tampil beda',
	'More from the journal': 'Artikel jurnal lainnya',
	'Related templates': 'Template terkait',
	'Other worlds worth exploring': 'Dunia lain yang bisa kamu jelajahi',
	'Back to journal': 'Kembali ke jurnal',
	'Browse Collection': 'Jelajahi Koleksi',
	'Template Stories': 'Cerita di Balik Template',
	'a website with a point of view': 'website dengan sudut pandang',
	'Twelve templates. Twelve different worlds.':
		'Dua belas template. Dua belas dunia yang berbeda.',
	'Studio Notes': 'Catatan Studio',
	'Oddlyrinaldi Journal / Design Philosophy':
		'Jurnal Oddlyrinaldi / Filosofi Desain',
	'Explore the': 'Jelajahi',
	'template.': 'template.',
	'AI Workspace / SaaS': 'Ruang Kerja AI / SaaS',
	'Architecture / Studio': 'Arsitektur / Studio',
	Automotive: 'Otomotif',
	'Creative Agency': 'Agensi Kreatif',
	'Fashion / Lookbook': 'Mode / Lookbook',
	'Fine Dining': 'Restoran Fine Dining',
	'Fitness / Performance': 'Kebugaran / Performa',
	'Grooming / Wellness': 'Perawatan / Kebugaran',
	'Hospitality / Booking': 'Hospitalitas / Pemesanan',
	'Luxury Hotel / Resort': 'Hotel / Resor Mewah',
	'Real Estate / Listings': 'Properti / Daftar Hunian',
	'SaaS / AI Workspace': 'SaaS / Ruang Kerja AI',
	'SaaS / Project Management': 'SaaS / Manajemen Proyek',
	'Education / Courses / Cohort': 'Pendidikan / Kursus / Program Kelompok',
	'February 2, 2026': '2 Februari 2026',
	'January 14, 2026': '14 Januari 2026',
	'January 22, 2026': '22 Januari 2026',
	'February 11, 2026': '11 Februari 2026',
	'February 20, 2026': '20 Februari 2026',
	'March 1, 2026': '1 Maret 2026',
	'March 8, 2026': '8 Maret 2026',
	'March 15, 2026': '15 Maret 2026',
	'March 22, 2026': '22 Maret 2026',
	'March 29, 2026': '29 Maret 2026',
	'April 5, 2026': '5 April 2026',
	'April 12, 2026': '12 April 2026',
	'April 19, 2026': '19 April 2026',
	'April 26, 2026': '26 April 2026',
	'May 3, 2026': '3 Mei 2026',
	'May 10, 2026': '10 Mei 2026',
	'May 17, 2026': '17 Mei 2026',
	'May 24, 2026': '24 Mei 2026',
	'The Monograph, Not the Brochure': 'Monograf, Bukan Brosur',
	'A Moment Designed to Be Felt': 'Momen yang Dirancang untuk Dirasakan',
	'The Work Is the Pitch': 'Karya yang Berbicara',
	'Space, Without the Noise': 'Ruang Tanpa Hiruk-pikuk',
	'Lit Like a Reveal': 'Tampil Dramatis',
	'Built to Move': 'Dirancang untuk Bergerak',
	'Content Sells Before the Price Does': 'Tunjukkan Nilainya Sebelum Harganya',
	'The Art of the Considered Detail': 'Seni Merancang Detail dengan Cermat',
	'The Idea': 'Gagasannya',
	'The Interaction': 'Interaksinya',
	'The Visual Language': 'Bahasa Visualnya',
	'Who It Is For': 'Untuk Siapa',
	Architecture: 'Arsitektur',
	Fashion: 'Mode',
	'Real Estate': 'Properti',
	About: 'Tentang Kami',
	'Founder / Creative Developer': 'Pendiri / Pengembang Kreatif',
	'I build websites with personality.':
		'Saya merancang website yang punya karakter.',
	"I'm": 'Saya',
	', the creator behind': ', sosok di balik',
	'— a creative digital studio focused on distinctive website templates, expressive interfaces, motion, and memorable digital experiences.':
		'— studio digital kreatif yang berfokus pada template website berkarakter, antarmuka ekspresif, animasi, dan pengalaman digital yang berkesan.',
	'What is': 'Apa itu',
	'A personal digital studio built around one simple belief:':
		'Studio digital personal yang berangkat dari satu keyakinan sederhana:',
	'a website should have a personality.': 'website harus punya karakter.',
	'Each template is designed as its own world — with a different mood, visual language, interaction style, and purpose. Some are dark and cinematic. Some are energetic. Some are quiet and architectural. Some are playful and unexpected. But every template is made to feel like more than a collection of sections. It should feel like an experience.':
		'Setiap template dirancang sebagai dunia tersendiri—dengan suasana, bahasa visual, gaya interaksi, dan tujuan yang berbeda. Ada yang gelap dan sinematik, penuh energi, tenang dan arsitektural, atau ceria dan tak terduga. Semuanya dirancang agar terasa lebih dari sekadar kumpulan bagian: sebuah pengalaman yang utuh.',
	'ONE TEMPLATE': 'SATU TEMPLATE',
	'ONE IDENTITY': 'SATU IDENTITAS',
	'ONE SIGNATURE': 'SATU CIRI KHAS',
	'Who is behind it?': 'Siapa di baliknya?',
	', a creative developer interested in building websites that feel expressive, interactive, and carefully designed.':
		', seorang pengembang kreatif yang senang merancang website ekspresif, interaktif, dan dibuat dengan cermat.',
	'I enjoy combining frontend development, visual design, animation, typography, interaction, and responsive systems.':
		'Saya senang memadukan pengembangan frontend, desain visual, animasi, tipografi, interaksi, dan sistem responsif.',
	'is where I collect those ideas and turn them into usable website templates.':
		'adalah tempat saya mengembangkan ide-ide tersebut menjadi template website yang siap digunakan.',
	'The way I build': 'Cara Saya Berkarya',
	'not another boring template': 'bukan template membosankan lainnya',
	'Every website needs a personality.': 'Setiap website perlu punya karakter.',
	'Motion should support the experience.':
		'Animasi harus mendukung pengalaman pengguna.',
	'Details make a website memorable.': 'Detail membuat website mudah diingat.',
	'Templates should not feel generic.':
		'Template seharusnya tidak terasa generik.',
	'Good design should still be usable.':
		'Desain yang baik tetap harus nyaman digunakan.',
	'Playfulness and polish can coexist.':
		'Keceriaan dan kerapian bisa berjalan beriringan.',
	Philosophy: 'Filosofi',
	'Personality over polish-only':
		'Karakter lebih penting dari sekadar tampilan rapi',
	"A clean website is table stakes. The templates I build start from a character or a mood, then get refined until they're premium underneath.":
		'Website yang rapi adalah standar dasar. Saya memulai setiap template dari karakter atau suasana, lalu menyempurnakannya hingga terasa premium sampai ke detailnya.',
	'Motion with intent': 'Animasi dengan tujuan',
	'Every animation has a reason to exist — guiding attention, adding a beat of delight, or confirming an interaction. Nothing moves just to move.':
		'Setiap animasi punya alasan—mengarahkan perhatian, memberi sentuhan menyenangkan, atau menegaskan sebuah interaksi. Tak ada yang bergerak tanpa tujuan.',
	'Editorial composition': 'Komposisi editorial',
	'I treat layout like a poster: asymmetry, whitespace, and rhythm matter as much as the grid underneath them.':
		'Saya memperlakukan tata letak seperti poster: asimetri, ruang kosong, dan ritme sama pentingnya dengan grid yang menyusunnya.',
	'How a template gets made': 'Proses Pembuatan Template',
	'Find the personality': 'Temukan karakternya',
	'Every project starts with a mood board and a question: what does this brand feel like if it were a person?':
		'Setiap proyek dimulai dengan moodboard dan sebuah pertanyaan: seperti apa karakter brand ini jika ia adalah seseorang?',
	'Design in the browser': 'Rancang langsung di browser',
	'Layouts get built directly with real type, real spacing, and real motion — not just static mockups.':
		'Tata letak dibangun langsung dengan tipografi, jarak, dan animasi yang sesungguhnya—bukan sekadar mockup statis.',
	'Build it properly': 'Bangun dengan baik',
	'Next.js, TypeScript, and Tailwind underneath, so the finished site is as solid as it looks.':
		'Di balik tampilannya, Next.js, TypeScript, dan Tailwind memastikan website ini kokoh dan berfungsi dengan baik.',
	'Polish the details': 'Sempurnakan detailnya',
	'Doodles, micro-interactions, and edge cases get their own pass — the last 10% is most of the personality.':
		'Doodle, micro-interaksi, dan berbagai kondisi khusus diperiksa satu per satu—10% sentuhan akhir inilah yang memberi banyak karakter.',
	'Skills & tools': 'Keahlian & Perangkat',
	'Creative frontend development': 'Pengembangan frontend kreatif',
	'Interactive website design': 'Desain website interaktif',
	'Motion design': 'Desain animasi',
	'Next.js development': 'Pengembangan Next.js',
	'Design systems': 'Sistem desain',
	'Find the rest of the work': 'Lihat Karya Lainnya',
	'Portfolio and social links below — placeholders for now, swapped for real profiles soon.':
		'Tautan portofolio dan media sosial di bawah ini masih berupa placeholder. Profil aslinya akan segera ditambahkan.',
	'Contact the Studio': 'Hubungi Studio',
	'Teguh Rinaldi, founder and creative developer behind ODDLYRINALDI — portrait annotated with hand-drawn stars, a halo, and playful notes':
		'Teguh Rinaldi, pendiri dan pengembang kreatif ODDLYRINALDI — potret dengan gambar bintang, lingkaran cahaya, dan catatan bergaya tangan',
});
Object.assign(idText, {
	'PREFERRED COLOR DIRECTION': 'ARAH WARNA YANG DIINGINKAN',
	'PREFERRED TYPOGRAPHY': 'TIPOGRAFI YANG DIINGINKAN',
	'ANIMATION PREFERENCE': 'PREFERENSI ANIMASI',
	'Preferred color direction': 'Arah warna yang diinginkan',
	'Preferred typography': 'Tipografi yang diinginkan',
	'Animation preference': 'Preferensi animasi',
	'Share website references or visual inspiration':
		'Bagikan referensi website atau inspirasi visual',
	'Paste links to websites you like, or explain what you want to achieve.':
		'Tempel tautan website yang kamu sukai atau ceritakan hasil yang ingin kamu capai.',
	'Anything you do not want?': 'Ada hal yang ingin kamu hindari?',
	'No gradients, no rounded cards, no bright colors, no excessive animations...':
		'Tanpa gradasi, kartu membulat, warna mencolok, atau animasi berlebihan...',
	'Primary color': 'Warna utama',
	'Secondary color': 'Warna sekunder',
	'Accent color': 'Warna aksen',
	'Preferred technology': 'Teknologi yang diinginkan',
	'Website hosting': 'Layanan hosting website',
	'Website features': 'Fitur website',
	'Backend requirement': 'Kebutuhan backend',
	'Asset source': 'Sumber aset',
	'Public vs. private assets': 'Aset publik dan pribadi',
	'Private assets': 'Aset pribadi',
	'are files provided by you, such as personal photos, brand images, logos, product photos, or internal materials.':
		'merupakan file yang kamu sediakan, seperti foto pribadi, gambar brand, logo, foto produk, atau materi internal.',
	'Public assets': 'Aset publik',
	'are images or resources selected from legitimate public sources and may be replaced later based on licensing and availability.':
		'merupakan gambar atau sumber daya dari sumber publik yang sah. Aset ini dapat diganti kemudian, bergantung pada lisensi dan ketersediaannya.',
	'Asset privacy': 'Privasi aset',
	'Assets available': 'Aset yang tersedia',
	'Asset folder link': 'Tautan folder aset',
	'Google Drive, Dropbox, OneDrive, or other asset folder link':
		'Tautan folder Google Drive, Dropbox, OneDrive, atau layanan lainnya',
	'Additional services': 'Layanan tambahan',
	'Additional notes': 'Catatan tambahan',
	'Anything else the studio should know?':
		'Ada hal lain yang perlu diketahui studio?',
	'Budget range': 'Kisaran anggaran',
	'Desired timeline': 'Target waktu pengerjaan',
	'Number of pages': 'Jumlah halaman',
	'Final pricing depends on the number of pages, complexity, integrations, custom assets, animation requirements, and technical scope.':
		'Harga akhir bergantung pada jumlah halaman, kompleksitas, integrasi, aset khusus, kebutuhan animasi, dan cakupan teknis.',
	'If you are not sure, choose "I am not sure". We will recommend a suitable approach based on your needs.':
		'Jika belum yakin, pilih "Saya belum yakin". Kami akan menyarankan pendekatan yang sesuai dengan kebutuhanmu.',
	Edit: 'Ubah',
	'Not specified': 'Belum diisi',
	'Basic identity': 'Identitas dasar',
	Personality: 'Karakter',
	'In their words': 'Menurut mereka',
	'Visual direction': 'Arah visual',
	'Content & assets': 'Konten & aset',
	'Technical preferences': 'Preferensi teknis',
	'Budget & timeline': 'Anggaran & waktu',
	Services: 'Layanan',
	Notes: 'Catatan',
	Pages: 'Halaman',
	Animation: 'Animasi',
	'Tech stack': 'Teknologi',
	Hosting: 'Hosting',
	Features: 'Fitur',
	Backend: 'Backend',
	'Available assets': 'Aset yang tersedia',
	'Give your brand or project a name.': 'Masukkan nama brand atau proyekmu.',
	"That doesn't look like a valid email.":
		'Format alamat email ini sepertinya belum benar.',
	'Choose the kind of website you need.':
		'Pilih jenis website yang kamu butuhkan.',
	'Pick at least one personality.': 'Pilih setidaknya satu karakter.',
	'Let us know where your assets will come from.':
		'Beri tahu dari mana aset website akan disediakan.',
	'Tell us what kind of website that is.':
		'Ceritakan jenis website yang kamu butuhkan.',
	'you@example.com': 'nama@email.com',
	Minimal: 'Minimalis',
	'Brand guideline': 'Panduan brand',
	Icons: 'Ikon',
	'Dark mode': 'Mode gelap',
	'3D elements': 'Elemen 3D',
	'I am not sure': 'Saya belum yakin',
	'Logo design': 'Desain logo',
	'Brand identity': 'Identitas brand',
	'Color palette': 'Palet warna',
	'Typography selection': 'Pemilihan tipografi',
	Copywriting: 'Penulisan naskah',
	'Website content writing': 'Penulisan konten website',
	'Image selection': 'Pemilihan gambar',
	'Image editing': 'Penyuntingan gambar',
	Illustration: 'Ilustrasi',
	'Custom icons': 'Ikon kustom',
	'SEO basics': 'Dasar-dasar SEO',
	'Domain setup guidance': 'Panduan pengaturan domain',
	'Hosting setup guidance': 'Panduan pengaturan hosting',
	'CMS setup': 'Pengaturan CMS',
	'Future updates': 'Pembaruan mendatang',
	'Social media design': 'Desain media sosial',
	'No additional services': 'Tidak perlu layanan tambahan',
	'Rp1.000.000 – Rp3.000.000': 'Rp1.000.000 – Rp3.000.000',
	'Rp3.000.000 – Rp5.000.000': 'Rp3.000.000 – Rp5.000.000',
	'Rp5.000.000 – Rp10.000.000': 'Rp5.000.000 – Rp10.000.000',
	'Rp10.000.000+': 'Rp10.000.000+',
	'1–2 weeks': '1–2 minggu',
	'2–4 weeks': '2–4 minggu',
	'1–2 months': '1–2 bulan',
	'2–4 pages': '2–4 halaman',
	'5–8 pages': '5–8 halaman',
	'9–15 pages': '9–15 halaman',
	'15+ pages': '15+ halaman',
});

type OriginalTextMap = WeakMap<Text, string>;
type OriginalAttributeMap = WeakMap<Element, Map<string, string>>;

function translateTextNode(
	node: Text,
	language: Language,
	originalText: OriginalTextMap,
) {
	if (!originalText.has(node)) originalText.set(node, node.data);
	const original = originalText.get(node)!;
	const key = original.replace(/\s+/g, ' ').trim();
	const localized = language === 'id' ? idText[key] : undefined;
	const translated = localized ? original.replace(key, localized) : original;
	if (node.data !== translated) node.data = translated;
}

function translateElementAttributes(
	element: Element,
	language: Language,
	originalAttributes: OriginalAttributeMap,
) {
	for (const attribute of ['placeholder', 'aria-label', 'title', 'alt']) {
		const value = element.getAttribute(attribute);
		if (value === null) continue;
		let originals = originalAttributes.get(element);
		if (!originals) {
			originals = new Map();
			originalAttributes.set(element, originals);
		}
		if (!originals.has(attribute)) originals.set(attribute, value);
		const original = originals.get(attribute)!;
		const translated =
			language === 'id' ? (idText[original] ?? original) : original;
		if (element.getAttribute(attribute) !== translated) {
			element.setAttribute(attribute, translated);
		}
	}
}

function translateDescendant(
	node: Node,
	language: Language,
	originalText: OriginalTextMap,
	originalAttributes: OriginalAttributeMap,
) {
	if (node instanceof Text) {
		translateTextNode(node, language, originalText);
		return;
	}
	if (node instanceof Element) {
		translateElementAttributes(node, language, originalAttributes);
	}
}

function translateSubtree(
	root: Node,
	language: Language,
	originalText: OriginalTextMap,
	originalAttributes: OriginalAttributeMap,
) {
	translateDescendant(root, language, originalText, originalAttributes);
	if (
		!(root instanceof Element) &&
		!(root instanceof Document) &&
		!(root instanceof DocumentFragment)
	) {
		return;
	}

	const walker = document.createTreeWalker(
		root,
		NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT,
	);
	let current = walker.nextNode();
	while (current) {
		translateDescendant(current, language, originalText, originalAttributes);
		current = walker.nextNode();
	}
}

const LanguageContext = createContext<{
	language: Language;
	setLanguage: (language: Language) => void;
}>({
	language: 'en',
	setLanguage: () => {},
});

function createLanguagePreferenceStore() {
	let currentLanguage: Language = 'en';
	if (typeof window !== 'undefined') {
		try {
			const saved = localStorage.getItem(STORAGE_KEY);
			if (saved === 'id' || saved === 'en') currentLanguage = saved;
		} catch {
			// Keep the default language when storage is unavailable.
		}
	}
	const subscribers = new Set<() => void>();
	const notify = () => subscribers.forEach((subscriber) => subscriber());
	const handleStorage = (event: StorageEvent) => {
		if (event.key !== null && event.key !== STORAGE_KEY) return;
		currentLanguage =
			event.newValue === 'id' || event.newValue === 'en'
				? event.newValue
				: 'en';
		notify();
	};

	return {
		subscribe(subscriber: () => void) {
			subscribers.add(subscriber);
			if (subscribers.size === 1) {
				window.addEventListener('storage', handleStorage);
			}
			return () => {
				subscribers.delete(subscriber);
				if (subscribers.size === 0) {
					window.removeEventListener('storage', handleStorage);
				}
			};
		},
		getSnapshot(): Language {
			return currentLanguage;
		},
		getServerSnapshot: (): Language => 'en',
		setLanguage(next: Language) {
			currentLanguage = next;
			try {
				localStorage.setItem(STORAGE_KEY, next);
			} catch {
				/* preference remains active for this visit */
			}
			notify();
		},
	};
}

export function LanguageProvider({
	children,
}: {
	readonly children: ReactNode;
}) {
	const [languageStore] = useState(createLanguagePreferenceStore);
	const language = useSyncExternalStore(
		languageStore.subscribe,
		languageStore.getSnapshot,
		languageStore.getServerSnapshot,
	);
	const originalText = useRef(new WeakMap<Text, string>());
	const originalAttributes = useRef(
		new WeakMap<Element, Map<string, string>>(),
	);
	const chooseLanguage = useCallback((next: Language) => {
		languageStore.setLanguage(next);
		document.documentElement.lang = next;
	}, [languageStore]);
	useEffect(() => {
		document.documentElement.lang = language;
	}, [language]);
	useEffect(() => {
		const translate = (root: Node) =>
			translateSubtree(
				root,
				language,
				originalText.current,
				originalAttributes.current,
			);
		const observer = new MutationObserver((records) => {
			for (const record of records) {
				if (record.type === 'characterData' && record.target instanceof Text) {
					translateTextNode(
						record.target,
						language,
						originalText.current,
					);
				}
				for (const added of record.addedNodes) translate(added);
			}
		});
		translate(document.body);
		observer.observe(document.body, {
			subtree: true,
			childList: true,
			characterData: true,
		});
		return () => observer.disconnect();
	}, [language]);
	const contextValue = useMemo(
		() => ({ language, setLanguage: chooseLanguage }),
		[language, chooseLanguage],
	);
	return (
		<LanguageContext.Provider value={contextValue}>
			{children}
		</LanguageContext.Provider>
	);
}

export function useLanguage() {
	return useContext(LanguageContext);
}

export const copy = {
	en: {
		welcome: 'Welcome to',
		tagline: 'Websites that refuse to sit still',
		enter: 'Choose your language to enter',
		hello: "Hello, we're",
		heroTitle: (
			<>
				Websites that
				<br />
				refuse to sit still.
			</>
		),
		heroDescription: (
			<>
				A creative studio crafting premium website templates for bold brands,
				dreamers, and digital explorers.
				<br />
				<br />
				12 unique templates. 12 different worlds. One collection.
			</>
		),
		explore: 'Explore Collection',
		custom: 'Custom Website',
		featured: 'Featured Templates',
		twelve: (
			<>
				12 Templates.
				<br />
				12 Personalities.
			</>
		),
		featuredDescription:
			'Each template is a complete digital experience, crafted for a specific industry and mood.',
		exploreAll: 'Explore All Templates',
		browse: 'Browse Collection',
		choose: 'Choose your language',
		english: 'English',
		indonesia: 'Indonesia',
		language: 'Language',
		moreThan: 'More Than Just Templates.',
		more: 'More',
		thanJust: 'Than Just',
		templates: 'Templates.',
		digitalIdentities:
			"It's a collection of digital identities, ready for you to make your own.",
		about: 'About ODDLYRINALDI',
		collection: 'The Collection',
		view: 'View',
		whichOne: 'Which one is yours?',
		goodVibes: 'Good Vibes Only :)',
		premiumService: 'A premium service',
		customQuestion: 'Want something built just for you?',
		customDescription:
			'Skip the template. Tell us about your brand, personality, and content in a guided creative brief, and get a custom website designed around exactly that — reviewed by hand, ordered straight through WhatsApp.',
		startBrief: 'Start your brief',
		fullBrief: 'See the full brief',
		madeWithCare: 'made with care',
		madeWithWeird: 'made with a little weird',
		signOff: 'Still not sitting still.',
		allRights: '© 2026 OddlyRinaldi. All rights reserved.',
	},
	id: {
		welcome: 'Selamat datang di',
		tagline: 'Website yang selalu penuh kejutan',
		enter: 'Pilih bahasa untuk masuk',
		hello: 'Halo, kami',
		heroTitle: (
			<>
				Website yang
				<br />
				selalu penuh kejutan.
			</>
		),
		heroDescription: (
			<>
				Studio kreatif yang merancang template website premium untuk brand
				berani, para pemimpi, dan penjelajah dunia digital.
				<br />
				<br />
				12 template unik. 12 dunia berbeda. Satu koleksi.
			</>
		),
		explore: 'Jelajahi Koleksi',
		custom: 'Website Kustom',
		featured: 'Template Pilihan',
		twelve: (
			<>
				12 Template.
				<br />
				12 Karakter.
			</>
		),
		featuredDescription:
			'Setiap template menghadirkan pengalaman digital utuh, dirancang untuk industri dan suasana yang berbeda.',
		exploreAll: 'Lihat Semua Template',
		browse: 'Jelajahi Koleksi',
		choose: 'Pilih bahasa',
		english: 'English',
		indonesia: 'Indonesia',
		language: 'Bahasa',
		moreThan: 'Lebih dari sekadar template.',
		more: 'Lebih',
		thanJust: 'Dari Sekadar',
		templates: 'Template.',
		digitalIdentities:
			'Kumpulan identitas digital yang siap kamu sesuaikan menjadi milikmu.',
		about: 'Tentang ODDLYRINALDI',
		collection: 'Koleksi',
		view: 'Lihat',
		whichOne: 'Yang mana pilihanmu?',
		goodVibes: 'Sebarkan energi positif :) ',
		premiumService: 'Layanan premium',
		customQuestion: 'Ingin website yang dibuat khusus untukmu?',
		customDescription:
			'Tak perlu memilih template. Ceritakan brand, karakter, dan kebutuhan kontenmu lewat brief kreatif terpandu. Kami akan merancang website khusus berdasarkan kebutuhanmu, meninjaunya langsung, lalu memproses pesanan melalui WhatsApp.',
		startBrief: 'Mulai isi brief',
		fullBrief: 'Lihat brief lengkap',
		madeWithCare: 'dibuat dengan sepenuh hati',
		madeWithWeird: 'dibuat dengan sedikit keunikan',
		signOff: 'Tetap bergerak, tetap berbeda.',
		allRights: '© 2026 OddlyRinaldi. Hak cipta dilindungi.',
	},
} as const;
