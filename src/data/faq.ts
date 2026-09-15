export type FaqItem = {
	question: string;
	answer: string;
};

export const faqs: FaqItem[] = [
	{
		question: 'What do I actually get when I buy a template?',
		answer:
			'Full source code (Next.js, TypeScript, Tailwind CSS, Framer Motion), a Figma design file, setup documentation, and three months of free updates. Everything is listed on each template\'s detail page under "What\'s included."',
	},
	{
		question: 'Can I use a template for a client project?',
		answer:
			"Yes — each purchase covers one production deployment, whether it's your own brand or a client's. If you're building templates-of-templates for resale, reach out first.",
	},
	{
		question: 'Do I need to know how to code to use a template?',
		answer:
			'Basic comfort with editing a Next.js/React project is expected — templates are source code, not a drag-and-drop builder. Setup documentation walks through installation, content edits, and deployment.',
	},
	{
		question: 'How do live demos work?',
		answer:
			'Templates with a working live deployment show a "View Live Demo" button that opens the real, hosted site in a new tab. Templates without one yet show a clearly labeled "coming soon" state instead — never a broken or fake link.',
	},
	{
		question: 'What if I need help after purchasing?',
		answer:
			'Email teguhrinaldi23@gmail.com any time. Support covers setup questions, bugs in the template itself, and guidance on customization.',
	},
	{
		question: 'Do you offer refunds?',
		answer:
			"Since templates are digital source code delivered instantly, sales are generally final once the files are downloaded. If something is broken or not as described, contact support and it'll be made right.",
	},
	{
		question: 'Can I customize the design after buying?',
		answer:
			'Completely — you own the code. Colors, type, layout, and content are all yours to change. That\'s the entire point of "fully customizable."',
	},
	{
		question: 'Will I get updates if the template improves later?',
		answer:
			'Yes, for three months from purchase. Update notes are sent to the email used at checkout.',
	},
];
