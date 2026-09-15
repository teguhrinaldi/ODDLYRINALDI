import { CheckDoodle } from "@/components/ui/Doodles";
import type { Template } from "@/data/templates";

export default function TemplateMeta({ template }: { template: Template }) {
  return (
    <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
      <div>
        <h3 className="font-display text-lg font-bold text-ink">Features</h3>
        <ul className="mt-4 flex flex-col gap-3">
          {template.features.map((feature) => (
            <li key={feature} className="flex items-start gap-3 text-sm leading-relaxed text-ink/70">
              <CheckDoodle className="mt-1 h-3.5 w-4 shrink-0 text-lime" />
              {feature}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="font-display text-lg font-bold text-ink">Tech stack</h3>
        <ul className="mt-4 flex flex-wrap gap-2">
          {template.techStack.map((tech) => (
            <li
              key={tech}
              className="rounded-full border border-ink/15 px-3 py-1.5 text-xs font-semibold text-ink/70"
            >
              {tech}
            </li>
          ))}
        </ul>

        <h3 className="mt-8 font-display text-lg font-bold text-ink">What&apos;s included</h3>
        <ul className="mt-4 flex flex-col gap-3">
          {template.included.map((item) => (
            <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-ink/70">
              <CheckDoodle className="mt-1 h-3.5 w-4 shrink-0 text-blue" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
