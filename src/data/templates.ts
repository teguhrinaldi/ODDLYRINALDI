export type TemplateAccent =
	| 'ink'
	| 'coral'
	| 'yellow'
	| 'blue'
	| 'purple'
	| 'lime'
	| 'orange'
	| 'teal';

export type TemplateStatus = 'available' | 'coming-soon';

export type Template = {
	index: number;
	slug: string;
	name: string;
	category: string;
	/** One-line "personality" tag used on cards and the collection index. */
	personality: string;
	accent: TemplateAccent;
	/** Muted paper tint the placeholder specimen card sits on. */
	tint: string;
	shortDescription: string;
	description: string;
	tags: string[];
	price: number;
	currency: 'USD';
	status: TemplateStatus;
	/**
	 * Only set when a real, working deployment exists — never a guessed or
	 * placeholder URL. Templates without one show a "coming soon" state.
	 */
	liveDemoUrl?: string;
	/**
	 * Placeholder checkout anchor. Swap for a real Stripe/Gumroad/Lemon
	 * Squeezy link before commercial launch — kept in one place so that's a
	 * one-line change per template.
	 */
	purchaseUrl: string;
	features: string[];
	techStack: string[];
	included: string[];
	/** Optional real screenshot path — drop one in /public/templates and set this later. */
	image?: string;
	/**
	 * Looping mp4 shown in the homepage hero preview carousel. Only set once a
	 * real recording exists in /public/market/{slug}/hero — templates without
	 * one are simply skipped by the carousel.
	 */
	heroVideo?: string;
	/** Poster frame for `heroVideo`, shown before it loads and when reduced motion is preferred. */
	heroPoster?: string;
	/**
	 * Real product screenshot (from /public/market/{slug}/desktop-home.png)
	 * used on the specimen cards and the template detail page's browser-preview
	 * hero.
	 */
	previewImage: string;
	/**
	 * Real mobile screenshot shown in the phone mockup beside the desktop
	 * preview on the template detail page. Left unset until a real capture
	 * exists — the mockup falls back to a tint + wordmark placeholder.
	 */
	mobileImage?: string;
	/**
	 * Real homepage / inner-page / mobile screenshots (from
	 * /public/market/{slug}/gallery) shown in the detail-page gallery.
	 */
	gallery: { src: string; label: string }[];
	/** Four-word personality line, e.g. "Dark, sensual, theatrical, culinary." */
	personalityTraits: string;
	/** "Why this template" narrative shown in the Template Story section. */
	story: {
		concept: string;
		audience: string;
		experience: string;
		signature: string;
		useCase: string;
	};
};

// Centralized template data. Swap `image` for a real screenshot per template
// later; everything else (cards, index list, hero preview, detail pages)
// reads from here. Preview art on every page is the generative "specimen
// card" (tint + wordmark), not stock photography — see
// TemplateBrowserPreview's comment for why, and replace with real
// screenshots before commercial release.
export const templates: Template[] = [
	{
		index: 1,
		slug: 'noire',
		name: 'NOIRÉ',
		category: 'Fine Dining',
		personality: 'Dark & mysterious',
		accent: 'ink',
		tint: '#2a2320',
		shortDescription:
			'A cinematic restaurant website built for memorable digital dining experiences.',
		description:
			"NOIRÉ is a moody, editorial template for restaurants that want their website to feel like the first course of the meal. Deep contrast, restrained motion, and a menu system built to make a chef's cooking feel inevitable rather than incidental.",
		tags: ['Restaurant', 'Reservations', 'Editorial', 'Dark mode'],
		price: 20,
		currency: 'USD',
		status: 'available',
		liveDemoUrl: 'https://noire-dining.netlify.app',
		purchaseUrl: '#purchase-noire',
		heroVideo: '/market/noire/hero/noire-hero.mp4',
		heroPoster: '/market/noire/gallery/desktop-homepage.png',
		previewImage: '/market/noire/gallery/desktop-homepage.png',
		mobileImage: '/market/noire/template-mobile/mobile-home.png',
		gallery: [
			{ src: '/market/noire/gallery/desktop-homepage.png', label: 'Homepage' },
			{ src: '/market/noire/gallery/desktop-inner.png', label: 'Inner Page' },
			{ src: '/market/noire/gallery/mobile.png', label: 'Mobile' },
		],
		personalityTraits: 'Dark, sensual, theatrical, culinary.',
		story: {
			concept:
				'Built to feel like the first course of the meal: deep contrast, confident type, and zero clutter between a guest and the menu.',
			audience:
				'Chef-led restaurants and hospitality groups who want a site as considered as the food.',
			experience:
				'A full-bleed cinematic hero with ambient motion, then a tasting-menu-first layout that never rushes.',
			signature:
				'The reservation CTA only appears once the hero has had its moment — it never competes with the first impression.',
			useCase:
				"Best for a single-location restaurant or a chef's table concept launching a new digital home.",
		},
		features: [
			'Full-bleed cinematic hero with looping ambience',
			'Menu system with seasonal / tasting-menu layouts',
			'Reservation call-to-action wired for OpenTable-style embeds',
			'Press & awards strip',
			'Dark, editorial photography grid',
		],
		techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
		included: [
			'Full source code',
			'Figma design file',
			'Setup documentation',
			'3 months of free updates',
		],
	},
	{
		index: 2,
		slug: 'estatex',
		name: 'ESTATEX',
		category: 'Real Estate',
		personality: 'Quiet but expensive',
		accent: 'blue',
		tint: '#e4e9f7',
		shortDescription:
			'A precise, confident real-estate template built for listings that sell themselves.',
		description:
			'ESTATEX trades loud sales copy for clarity: large photography, calm typography, and a listings system that lets the property do the talking. Built for agencies and independent agents who want to look like the most trustworthy option on the block.',
		tags: ['Real Estate', 'Listings', 'Agency', 'Maps'],
		price: 20,
		currency: 'USD',
		status: 'available',
		purchaseUrl: '#purchase-estatex',
		liveDemoUrl: 'https://estatex-realestate.netlify.app',
		heroVideo: '/market/estatex/hero/estatex-hero.mp4',
		heroPoster: '/market/estatex/dekstop-home.png',
		previewImage: '/market/estatex/dekstop-home.png',
		mobileImage: '/market/estatex/template-mobile/mobile-home.png',
		gallery: [
			{
				src: '/market/estatex/gallery/dekstop-homepage.png',
				label: 'Homepage',
			},
			{ src: '/market/estatex/gallery/dekstop-inner.png', label: 'Inner Page' },
			{ src: '/market/estatex/gallery/mobile.png', label: 'Mobile' },
		],
		personalityTraits: 'Quiet, confident, precise, trustworthy.',
		story: {
			concept:
				'Trades loud sales copy for clarity — large photography and calm typography that let a property speak for itself.',
			audience:
				'Boutique agencies and independent agents who want to look like the most trustworthy option on the block.',
			experience:
				'A filterable listings grid that feels like browsing a catalog, not a spreadsheet.',
			signature:
				'Every property detail page opens with the same calm pacing as the homepage — nothing feels bolted on.',
			useCase:
				"Best for an agency or agent whose listings are the real product and don't need extra noise.",
		},
		features: [
			'Filterable property listings grid',
			'Individual property detail layout with gallery',
			'Agent profile cards',
			'Map-ready location blocks',
			'Inquiry / contact-agent forms',
		],
		techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
		included: [
			'Full source code',
			'Figma design file',
			'Setup documentation',
			'3 months of free updates',
		],
	},
	{
		index: 3,
		slug: 'azura',
		name: 'AZURA',
		category: 'Luxury Hotel / Resort',
		personality: 'Soft but precise',
		accent: 'blue',
		tint: '#dcedf5',
		shortDescription:
			'A breathing, resort-grade website for hotels that sell a feeling before a room.',
		description:
			'AZURA is built around whitespace and horizon lines — big, breathing hero imagery, a booking flow that never feels like a form, and a room-showcase system that mirrors how a guest actually decides where to stay.',
		tags: ['Hospitality', 'Booking', 'Resort', 'Rooms'],
		price: 20,
		currency: 'USD',
		status: 'available',
		purchaseUrl: '#purchase-azura',
		liveDemoUrl: 'https://azura-hotel.netlify.app',
		heroVideo: '/market/azura/hero/azura-hero.mp4',
		heroPoster: '/market/azura/desktop-home.png',
		previewImage: '/market/azura/desktop-home.png',
		mobileImage: '/market/azura/template-mobile/mobile-home.png',
		gallery: [
			{ src: '/market/azura/gallery/dekstop-homepage.png', label: 'Homepage' },
			{ src: '/market/azura/gallery/dekstop-inner.png', label: 'Inner Page' },
			{ src: '/market/azura/gallery/mobile.png', label: 'Mobile' },
		],
		personalityTraits: 'Soft, breathing, immersive, precise.',
		story: {
			concept:
				'Built around whitespace and horizon lines, so the destination sells the room before a single amenity is listed.',
			audience:
				'Boutique hotels and resorts that sell a feeling first and a room second.',
			experience:
				'A full-screen destination hero that breathes, followed by a room showcase that mirrors how guests actually decide.',
			signature:
				'Booking never interrupts the mood — the CTA drifts in only once a guest has felt the place.',
			useCase:
				'Best for a resort or boutique hotel with strong photography and a story to tell before the booking form.',
		},
		features: [
			'Full-screen destination hero',
			'Room / suite showcase with pricing',
			'Booking-widget-ready call-to-action',
			'Amenities & experiences grid',
			'Guest review carousel',
		],
		techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
		included: [
			'Full source code',
			'Figma design file',
			'Setup documentation',
			'3 months of free updates',
		],
	},
	{
		index: 4,
		slug: 'arcana',
		name: 'ARCANA',
		category: 'Architecture',
		personality: 'Architectural energy',
		accent: 'purple',
		tint: '#2b2733',
		shortDescription:
			'A structural, gallery-grade website for architecture studios and portfolios.',
		description:
			'ARCANA treats a project archive like a monograph. Grid-driven layouts, generous margins, and a case-study template built for firms whose work needs room to be looked at, not scrolled past.',
		tags: ['Architecture', 'Portfolio', 'Studio', 'Case studies'],
		price: 20,
		currency: 'USD',
		status: 'available',
		purchaseUrl: '#purchase-arcana',
		liveDemoUrl: 'https://arcana-architecture.netlify.app',
		heroVideo: '/market/arcana/hero/arcana-hero.mp4',
		heroPoster: '/market/arcana/desktop-home.png',
		previewImage: '/market/arcana/desktop-home.png',
		mobileImage: '/market/arcana/template-mobile/mobile-home.png',
		gallery: [
			{ src: '/market/arcana/gallery/desktop-homepage.png', label: 'Homepage' },
			{ src: '/market/arcana/gallery/desktop-inner.png', label: 'Inner Page' },
			{ src: '/market/arcana/gallery/mobile.png', label: 'Mobile' },
		],
		personalityTraits: 'Structural, conceptual, quiet, exacting.',
		story: {
			concept:
				'Treats a project archive like a monograph — generous margins and a grid that gives work room to be looked at.',
			audience:
				'Architecture studios and firms whose portfolio needs to be read, not scrolled past.',
			experience:
				'A project grid with filtering, leading into a case-study template built for drawings and process, not just hero shots.',
			signature:
				'Every case study opens on a single image held in silence before any text appears.',
			useCase:
				'Best for a studio with a small number of serious projects that deserve real depth.',
		},
		features: [
			'Project archive grid with filtering',
			'Case-study detail template',
			'Studio / team page',
			'Awards & publications list',
			'Contact & inquiry section',
		],
		techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
		included: [
			'Full source code',
			'Figma design file',
			'Setup documentation',
			'3 months of free updates',
		],
	},
	{
		index: 5,
		slug: 'velora',
		name: 'VELORA',
		category: 'Creative Agency',
		personality: 'Creative chaos',
		accent: 'coral',
		tint: '#fbe4de',
		shortDescription:
			'A confident, editorial website for agencies that want to look like the work.',
		description:
			'VELORA is built for studios and agencies who sell taste as much as output. Bold type, an unapologetic case-study flow, and just enough irregularity to prove a human designed it.',
		tags: ['Agency', 'Portfolio', 'Case studies', 'Editorial'],
		price: 20,
		currency: 'USD',
		status: 'available',
		purchaseUrl: '#purchase-velora',
		liveDemoUrl: 'https://velora-studioscreative.netlify.app',
		heroVideo: '/market/velora/hero/velora-hero.mp4',
		heroPoster: '/market/velora/desktop-home.png',
		previewImage: '/market/velora/desktop-home.png',
		mobileImage: '/market/velora/template-mobile/mobile-home.png',
		gallery: [
			{ src: '/market/velora/gallery/desktop-homepage.png', label: 'Homepage' },
			{ src: '/market/velora/gallery/desktop-inner.png', label: 'Inner Page' },
			{ src: '/market/velora/gallery/mobile.png', label: 'Mobile' },
		],
		personalityTraits: 'Energetic, expressive, unapologetic, human.',
		story: {
			concept:
				'Built for studios who sell taste as much as output — bold type and just enough irregularity to prove a person designed it.',
			audience:
				'Agencies and studios who want their site to look like the work, not like a pitch deck.',
			experience:
				'An oversized editorial hero into an unapologetic case-study archive.',
			signature:
				'The layout shifts rhythm case study to case study — nothing repeats exactly the same way twice.',
			useCase:
				'Best for a small studio or collective that wants its personality to be the pitch.',
		},
		features: [
			'Oversized editorial hero',
			'Case-study / work archive',
			'Services & process breakdown',
			'Team / culture section',
			'Client logo strip',
		],
		techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
		included: [
			'Full source code',
			'Figma design file',
			'Setup documentation',
			'3 months of free updates',
		],
	},
	{
		index: 6,
		slug: 'forge',
		name: 'FORGE',
		category: 'Fitness / Performance',
		personality: 'Made for movement',
		accent: 'orange',
		tint: '#f7e3d3',
		shortDescription:
			'A high-energy website built for gyms, coaches, and performance brands.',
		description:
			'FORGE is built to move. Kinetic type, class-schedule layouts, and a coach/program showcase designed for studios and trainers who need their site to feel as intense as the workout.',
		tags: ['Fitness', 'Gym', 'Coaching', 'Class schedule'],
		price: 20,
		currency: 'USD',
		status: 'available',
		purchaseUrl: '#purchase-forge',
		liveDemoUrl: 'https://forge-muscle.netlify.app',
		heroVideo: '/market/forge/hero/forge-hero.mp4',
		heroPoster: '/market/forge/desktop-home.png',
		previewImage: '/market/forge/desktop-home.png',
		mobileImage: '/market/forge/template-mobile/mobile-home.png',
		gallery: [
			{ src: '/market/forge/gallery/desktop-homepage.png', label: 'Homepage' },
			{ src: '/market/forge/gallery/desktop-inner.png', label: 'Inner Page' },
			{ src: '/market/forge/gallery/mobile.png', label: 'Mobile' },
		],
		personalityTraits: 'Kinetic, disciplined, physical, loud.',
		story: {
			concept:
				'Built to move — kinetic type and a class-schedule system designed to feel as intense as the workout.',
			audience:
				'Gyms, coaches, and performance brands that train hard and want a site that matches the energy.',
			experience:
				'A high-energy hero straight into a class/program schedule grid built for quick scanning.',
			signature:
				'Hover states hit like a rep count — sharp, immediate, no easing softness.',
			useCase:
				'Best for a gym, studio, or coach selling a program, not just a location.',
		},
		features: [
			'High-energy kinetic hero',
			'Class / program schedule grid',
			'Coach profile cards',
			'Membership pricing tiers',
			'Transformation / results gallery',
		],
		techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
		included: [
			'Full source code',
			'Figma design file',
			'Setup documentation',
			'3 months of free updates',
		],
	},
	{
		index: 7,
		slug: 'atelier',
		name: 'ATELIER',
		category: 'Fashion',
		personality: 'Controlled power',
		accent: 'ink',
		tint: '#ece7dd',
		shortDescription:
			'A editorial, gallery-paced website for fashion labels and studios.',
		description:
			'ATELIER moves like a lookbook: full-bleed imagery, slow pacing, and a lookbook / collection template that gives clothing room to breathe instead of competing with UI chrome.',
		tags: ['Fashion', 'Lookbook', 'Editorial', 'Collections'],
		price: 20,
		currency: 'USD',
		status: 'available',
		purchaseUrl: '#purchase-atelier',
		liveDemoUrl: 'https://atelier-fashionhouse.netlify.app',
		heroVideo: '/market/atelier/hero/atelier-hero.mp4',
		heroPoster: '/market/atelier/desktop-home.png',
		previewImage: '/market/atelier/desktop-home.png',
		mobileImage: '/market/atelier/template-mobile/mobile-home.png',
		gallery: [
			{
				src: '/market/atelier/gallery/desktop-homepage.png',
				label: 'Homepage',
			},
			{ src: '/market/atelier/gallery/desktop-inner.png', label: 'Inner Page' },
			{ src: '/market/atelier/gallery/mobile.png', label: 'Mobile' },
		],
		personalityTraits: 'Editorial, tactile, controlled, slow.',
		story: {
			concept:
				'Moves like a lookbook — full-bleed imagery and slow pacing that gives clothing room to breathe.',
			audience:
				'Fashion labels and studios whose collection is the whole story.',
			experience:
				'A full-bleed lookbook hero into a seasonal collection template with editorial pacing.',
			signature:
				'Nothing moves quickly — every transition is paced like a page turn, not a scroll.',
			useCase:
				'Best for a label or studio with strong photography and a seasonal drop to showcase.',
		},
		features: [
			'Full-bleed lookbook hero',
			'Collection / seasonal drop layout',
			'Editorial story template',
			'Stockist / press section',
			'Newsletter capture',
		],
		techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
		included: [
			'Full source code',
			'Figma design file',
			'Setup documentation',
			'3 months of free updates',
		],
	},
	{
		index: 8,
		slug: 'syntra',
		name: 'SYNTRA',
		category: 'Online Course / Education',
		personality: 'Connected intelligence',
		accent: 'blue',
		tint: '#e2e6f9',
		shortDescription:
			'A clear, confident website for courses, cohorts, and online educators.',
		description:
			'SYNTRA is built for teaching, not just marketing. A curriculum layout that makes a course feel structured, an instructor profile that builds trust, and enrollment flows ready to connect to your platform of choice.',
		tags: ['Education', 'Courses', 'Cohort', 'Curriculum'],
		price: 20,
		currency: 'USD',
		status: 'available',
		purchaseUrl: '#purchase-syntra',
		liveDemoUrl: 'https://syntra-course.netlify.app',
		heroVideo: '/market/syntra/hero/syntra-hero.mp4',
		heroPoster: '/market/syntra/desktop-home.png',
		previewImage: '/market/syntra/desktop-home.png',
		mobileImage: '/market/syntra/template-mobile/mobile-home.png',
		gallery: [
			{ src: '/market/syntra/gallery/desktop-homepage.png', label: 'Homepage' },
			{ src: '/market/syntra/gallery/desktop-inner.png', label: 'Inner Page' },
			{ src: '/market/syntra/gallery/mobile.png', label: 'Mobile' },
		],
		personalityTraits: 'Structured, clear, connected, credible.',
		story: {
			concept:
				'Built for teaching, not just marketing — a curriculum layout that makes a course feel structured before enrollment.',
			audience:
				'Cohort-based courses, educators, and instructors who need to build trust fast.',
			experience:
				'A module-by-module curriculum breakdown paired with an instructor profile that does the credibility work.',
			signature:
				'The enrollment CTA sits beside the curriculum, not above it — the content sells before the price does.',
			useCase:
				'Best for an educator or cohort launching a course that needs to look as credible as it is.',
		},
		features: [
			'Curriculum / module breakdown',
			'Instructor profile section',
			'Enrollment & pricing tiers',
			'Student testimonial grid',
			'FAQ accordion',
		],
		techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
		included: [
			'Full source code',
			'Figma design file',
			'Setup documentation',
			'3 months of free updates',
		],
	},
	{
		index: 9,
		slug: 'vanta',
		name: 'VANTA',
		category: 'Automotive',
		personality: 'Identity in motion',
		accent: 'purple',
		tint: '#2a2530',
		shortDescription:
			'A dark, kinetic website built for automotive brands and performance shops.',
		description:
			'VANTA treats a vehicle lineup like a reveal. High-contrast photography, spec sheets that read like data, and a configurator-ready layout for dealerships, detailers, and performance brands.',
		tags: ['Automotive', 'Lineup', 'Specs', 'Dark mode'],
		price: 20,
		currency: 'USD',
		status: 'available',
		purchaseUrl: '#purchase-vanta',
		liveDemoUrl: 'https://vanta-automotive.netlify.app',
		heroVideo: '/market/vanta/hero/vanta-hero.mp4',
		heroPoster: '/market/vanta/desktop-home.png',
		previewImage: '/market/vanta/desktop-home.png',
		mobileImage: '/market/vanta/template-mobile/mobile-home.png',
		gallery: [
			{ src: '/market/vanta/gallery/desktop-homepage.png', label: 'Homepage' },
			{ src: '/market/vanta/gallery/desktop-inner.png', label: 'Inner Page' },
			{ src: '/market/vanta/gallery/mobile.png', label: 'Mobile' },
		],
		personalityTraits: 'Controlled, engineered, dynamic, dark.',
		story: {
			concept:
				'Treats a vehicle lineup like a reveal — high-contrast photography and spec sheets that read like data.',
			audience:
				'Dealerships, detailers, and performance shops that sell precision as much as horsepower.',
			experience:
				'A high-contrast reveal hero into a model lineup with spec comparison.',
			signature:
				'Vehicle imagery is always lit like a reveal — never a flat catalog shot.',
			useCase:
				'Best for a dealership, detailer, or performance brand with a lineup worth showing off.',
		},
		features: [
			'High-contrast vehicle reveal hero',
			'Model lineup & spec comparison',
			'Configurator-ready layout',
			'Dealer / location finder section',
			'Test-drive / inquiry CTA',
		],
		techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
		included: [
			'Full source code',
			'Figma design file',
			'Setup documentation',
			'3 months of free updates',
		],
	},
	{
		index: 10,
		slug: 'lumora',
		name: 'LUMORA',
		category: 'Grooming / Barbershop',
		personality: 'High performance',
		accent: 'orange',
		tint: '#f8e9dc',
		shortDescription:
			'A warm, confident website for barbershops and grooming studios.',
		description:
			'LUMORA is built for shops that treat a cut like a craft. Booking-first layout, a service menu that reads like a bar menu, and a barber/stylist roster designed to build repeat clients.',
		tags: ['Barbershop', 'Grooming', 'Booking', 'Services'],
		price: 20,
		currency: 'USD',
		status: 'available',
		purchaseUrl: '#purchase-lumora',
		liveDemoUrl: 'https://lumora-grooming.netlify.app',
		heroVideo: '/market/lumora/hero/lumora-hero.mp4',
		heroPoster: '/market/lumora/desktop-home.png',
		previewImage: '/market/lumora/desktop-home.png',
		mobileImage: '/market/lumora/template-mobile/mobile-home.png',
		gallery: [
			{ src: '/market/lumora/gallery/desktop-homepage.png', label: 'Homepage' },
			{ src: '/market/lumora/gallery/desktop-inner.png', label: 'Inner Page' },
			{ src: '/market/lumora/gallery/mobile.png', label: 'Mobile' },
		],
		personalityTraits: 'Warm, personal, precise, repeat-worthy.',
		story: {
			concept:
				'Built for shops that treat a cut like a craft — a booking-first layout and a service menu that reads like a bar menu.',
			audience:
				'Barbershops and grooming studios that live and die on repeat clients.',
			experience:
				'A booking-first hero into a barber/stylist roster designed to build familiarity before a first visit.',
			signature:
				'Every barber gets a real profile card — this is a shop of people, not just services.',
			useCase:
				'Best for a barbershop or grooming studio that wants booking to feel like the easiest part of the visit.',
		},
		features: [
			'Booking-first hero layout',
			'Service menu with pricing',
			'Barber / stylist roster',
			'Before & after gallery',
			'Location & hours block',
		],
		techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
		included: [
			'Full source code',
			'Figma design file',
			'Setup documentation',
			'3 months of free updates',
		],
	},
	{
		index: 11,
		slug: 'neural',
		name: 'NEURAL',
		category: 'Project Management / SaaS Dashboard',
		personality: 'Calm, in control',
		accent: 'teal',
		tint: '#111c19',
		shortDescription:
			'A dark, focused dashboard template for teams who live inside their task list.',
		description:
			"NEURAL is a project management dashboard built for the people actually running the sprint, not the slide deck about it. Task boards, workload tracking, and team management all sit one click away from each other, in a dark UI that's built to be stared at for eight hours without getting tiring.",
		tags: ['SaaS', 'Dashboard', 'Project Management', 'Dark mode'],
		price: 20,
		currency: 'USD',
		status: 'available',
		liveDemoUrl: 'https://neural-dashboardproject.netlify.app/dashboard',
		purchaseUrl: '#purchase-neural',
		heroVideo: '/market/neural/hero/projectly-hero.mp4',
		heroPoster: '/market/neural/desktop-home.png',
		previewImage: '/market/neural/desktop-home.png',
		mobileImage: '/market/neural/template-mobile/mobile-home.png',
		gallery: [
			{ src: '/market/neural/gallery/desktop-homepage.png', label: 'Homepage' },
			{ src: '/market/neural/gallery/desktop-inner.png', label: 'Inner Page' },
			{ src: '/market/neural/gallery/mobile.png', label: 'Mobile' },
		],
		personalityTraits: 'Focused, calm, structured, in control.',
		story: {
			concept:
				"Built around one idea: a dashboard's job is to answer 'what needs me right now,' not to look impressive in a screenshot.",
			audience:
				'Product teams, agencies, and startups who need a real workspace UI, not another marketing site.',
			experience:
				"Straight into the dashboard — active tasks, overdue flags, and a team's workload, all readable in the first five seconds.",
			signature:
				"A workload overview that shows exactly who's overloaded before a stand-up has to ask.",
			useCase:
				'Best for a SaaS product, internal tool, or agency dashboard that needs to feel trustworthy under daily use.',
		},
		features: [
			'Dashboard overview with active, completed, and overdue task cards',
			'Task completion trend chart over the last 14 days',
			'Team workload overview with per-member progress bars',
			'Priority tasks and upcoming deadlines panels',
			'Team management table with roles, status, and invites',
			'Dark mode UI by default',
		],
		techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
		included: [
			'Full source code',
			'Figma design file',
			'Setup documentation',
			'3 months of free updates',
		],
	},
	{
		index: 12,
		slug: 'nexora',
		name: 'NEXORA',
		category: 'AI Workspace / SaaS',
		personality: 'Sharp, electric',
		accent: 'lime',
		tint: '#10130a',
		shortDescription:
			'A black-and-lime AI workspace template for tools that write, organize, and automate.',
		description:
			"NEXORA is built for AI products that do more than answer a prompt — a marketing homepage that sells 'intelligent workspace' in one line, backed by a real in-app dashboard with AI Studio, documents, and automations. High contrast, one accent color, zero visual noise competing with the product itself.",
		tags: ['SaaS', 'AI', 'Dashboard', 'Dark mode'],
		price: 20,
		currency: 'USD',
		status: 'available',
		liveDemoUrl: 'https://nexora-dashboardsaas.netlify.app/',
		purchaseUrl: '#purchase-nexora',
		heroVideo: '/market/nexora/hero/nexora-hero.mp4',
		heroPoster: '/market/nexora/desktop-home.png',
		previewImage: '/market/nexora/desktop-home.png',
		mobileImage: '/market/nexora/template-mobile/mobile-home.png',
		gallery: [
			{ src: '/market/nexora/gallery/desktop-homepage.png', label: 'Homepage' },
			{ src: '/market/nexora/gallery/desktop-inner.png', label: 'Inner Page' },
			{ src: '/market/nexora/gallery/mobile.png', label: 'Mobile' },
		],
		personalityTraits: 'Sharp, electric, confident, automated.',
		story: {
			concept:
				"A landing page and a product that actually agree with each other — 'intelligent workspace' isn't just hero copy, it's the dashboard underneath it too.",
			audience:
				'AI tools, workspace apps, and automation products that need to look as capable as they actually are.',
			experience:
				'A confident marketing hero drops straight into a live-feeling workspace preview — AI Studio, chat, documents, automations, all one click apart.',
			signature:
				'One lime accent against near-black, used on exactly the things that matter: the primary action, the active nav item, nothing else.',
			useCase:
				'Best for an AI SaaS product, workspace tool, or automation platform launching its first real marketing site.',
		},
		features: [
			'Marketing homepage with animated in-app product preview',
			'In-app workspace with AI Studio, Chat, and Documents',
			'Usage stats: AI requests, documents created, automations, credits remaining',
			'Recent documents and active automations panels',
			'Sidebar navigation for Usage, Billing, Team, and API Keys',
			'Dark UI with a single lime accent',
		],
		techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
		included: [
			'Full source code',
			'Figma design file',
			'Setup documentation',
			'3 months of free updates',
		],
	},
];

export const accentHex: Record<TemplateAccent, string> = {
	ink: '#111111',
	coral: '#ff735e',
	yellow: '#ffd928',
	blue: '#4a73ff',
	purple: '#8c5cff',
	lime: '#a7d948',
	orange: '#ff8a3d',
	teal: '#2dd4bf',
};

export const featuredTemplates = templates.slice(0, 4);

export function getTemplateBySlug(slug: string): Template | undefined {
	return templates.find((t) => t.slug === slug);
}

export function getRelatedTemplates(slug: string, count = 3): Template[] {
	const others = templates.filter((t) => t.slug !== slug);
	// Deterministic "random-feeling" pick based on the current slug's index.
	const start = templates.findIndex((t) => t.slug === slug);
	const rotated = [
		...others.slice(start % others.length),
		...others.slice(0, start % others.length),
	];
	return rotated.slice(0, count);
}
