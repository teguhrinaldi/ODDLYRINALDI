import type { Metadata } from 'next';
import LegalLayout from '@/components/LegalLayout';
import { site } from '@/data/site';

export const metadata: Metadata = {
	title: 'License',
	description:
		"What you can and can't do with a purchased ODDLYRINALDI template.",
	alternates: { canonical: `${site.url}/license` },
};

const allowed = [
	"Use a purchased template for one production website — your own, or a single client's.",
	'Modify the code, design, and content however you like.',
	'Build and deploy an unlimited number of pages within that one project.',
];

const notAllowed = [
	'Resell, redistribute, or repackage the template files themselves, modified or not.',
	'Use a single purchase across multiple unrelated client projects — each project needs its own license.',
	'Claim authorship of the original template design.',
];

export default function LicensePage() {
	return (
		<LegalLayout title="License" updated="March 2026">
			<p className="text-sm leading-relaxed text-ink/70">
				Every template purchase includes a standard single-project license. In
				short: it&apos;s yours to build with, not to resell as-is.
			</p>

			<div>
				<h2 className="font-display text-lg font-bold text-ink">You can</h2>
				<ul className="mt-3 flex flex-col gap-2">
					{allowed.map((item) => (
						<li key={item} className="text-sm leading-relaxed text-ink/70">
							— {item}
						</li>
					))}
				</ul>
			</div>

			<div>
				<h2 className="font-display text-lg font-bold text-ink">
					You can&apos;t
				</h2>
				<ul className="mt-3 flex flex-col gap-2">
					{notAllowed.map((item) => (
						<li key={item} className="text-sm leading-relaxed text-ink/70">
							— {item}
						</li>
					))}
				</ul>
			</div>

			<div>
				<h2 className="font-display text-lg font-bold text-ink">
					Need something different?
				</h2>
				<p className="mt-3 text-sm leading-relaxed text-ink/70">
					Multi-project or agency licensing can be arranged directly — email
					teguhrinaldi23@gmail.com before your purchase.
				</p>
			</div>
		</LegalLayout>
	);
}
