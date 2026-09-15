import type { Metadata } from 'next';
import LegalLayout from '@/components/LegalLayout';
import { site } from '@/data/site';

export const metadata: Metadata = {
	title: 'Privacy Policy',
	description:
		'How ODDLYRINALDI handles the information collected through this site.',
	alternates: { canonical: `${site.url}/privacy` },
};

const sections = [
	{
		title: 'What we collect',
		body: "This site itself does not run analytics or advertising trackers. Information you volunteer directly — through the contact form or an email — is used only to respond to you. If a purchase platform (such as Stripe or Gumroad) is added later, that provider's own privacy policy governs payment data, not this one.",
	},
	{
		title: "How it's used",
		body: "Contact details are used solely to reply to your message and, if relevant, deliver a purchased template. We don't sell, rent, or share your information with third parties.",
	},
	{
		title: 'Cookies',
		body: 'The site does not set tracking or advertising cookies. Any cookie used is strictly functional (e.g. remembering a UI preference) and never used to identify or follow you across other sites.',
	},
	{
		title: 'Your rights',
		body: 'You can ask what information we hold about you, or ask us to delete it, at any time by emailing teguhrinaldi23@gmail.com.',
	},
	{
		title: 'Changes to this policy',
		body: 'If this policy changes, the "last updated" date above will change with it.',
	},
];

export default function PrivacyPage() {
	return (
		<LegalLayout title="Privacy Policy" updated="March 2026">
			{sections.map((section) => (
				<div key={section.title}>
					<h2 className="font-display text-lg font-bold text-ink">
						{section.title}
					</h2>
					<p className="mt-3 text-sm leading-relaxed text-ink/70">
						{section.body}
					</p>
				</div>
			))}
		</LegalLayout>
	);
}
