import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight, LifeBuoy, BookOpen, Mail } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { StarDoodle, SpeechBubbleDoodle } from '@/components/ui/Doodles';
import { site } from '@/data/site';

export const metadata: Metadata = {
	title: 'Support',
	description:
		'Get help with setup, customization, or anything else after purchasing a template.',
	alternates: { canonical: `${site.url}/support` },
};

const topics = [
	{
		icon: BookOpen,
		title: 'Setup & documentation',
		body: 'Every template ships with a written setup guide covering installation, environment variables, and deployment.',
	},
	{
		icon: LifeBuoy,
		title: 'Bugs & template issues',
		body: "Found something broken in the template itself? Email us with the template name and a description — we'll take a look.",
	},
	{
		icon: Mail,
		title: 'Everything else',
		body: 'Customization questions, licensing questions, or just saying hi — teguhrinaldi23@gmail.com reaches a real inbox.',
	},
];

export default function SupportPage() {
	return (
		<>
			<Navbar />
			<main className="pt-16 sm:pt-20">
				<section className="relative overflow-hidden bg-cream py-16 sm:py-24 lg:py-28">
					<StarDoodle className="pointer-events-none absolute right-[10%] top-16 hidden h-6 w-6 text-yellow/70 lg:block" />
					<SpeechBubbleDoodle className="pointer-events-none absolute left-[6%] top-32 hidden h-9 w-11 text-blue/60 md:block" />
					<div className="mx-auto max-w-350 px-5 sm:px-8 lg:px-12">
						<p className="text-xs font-semibold uppercase tracking-[0.25em] text-ink/50">
							Support
						</p>
						<h1 className="mt-4 max-w-2xl font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-5xl">
							Stuck on something? We&apos;re here when you need us.
						</h1>

						<div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-3">
							{topics.map(({ icon: Icon, title, body }) => (
								<div key={title}>
									<span className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/15">
										<Icon className="h-4.5 w-4.5 text-ink/70" />
									</span>
									<h2 className="mt-4 font-display text-lg font-bold text-ink">
										{title}
									</h2>
									<p className="mt-2 text-sm leading-relaxed text-ink/65">
										{body}
									</p>
								</div>
							))}
						</div>

						<div className="mt-14 flex flex-wrap items-center gap-6">
							<a
								href={`mailto:${site.supportEmail}`}
								data-cursor="view"
								className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-black-secondary"
							>
								Email support <ArrowUpRight className="h-4 w-4" />
							</a>
							<Link
								href="/faq"
								data-cursor="view"
								className="inline-flex items-center gap-2 text-sm font-semibold text-ink underline decoration-ink/30 underline-offset-4 hover:decoration-ink"
							>
								Read the FAQ
							</Link>
							<Link
								href="/contact"
								data-cursor="view"
								className="inline-flex items-center gap-2 text-sm font-semibold text-ink underline decoration-ink/30 underline-offset-4 hover:decoration-ink"
							>
								Contact form
							</Link>
						</div>
					</div>
				</section>
			</main>
			<Footer />
		</>
	);
}
