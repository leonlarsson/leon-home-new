import { Fragment } from "react";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Icons from "@/app/(main)/components/icons";
import CurrentTime from "../components/CurrentTime";
import PrintButton from "../components/PrintButton";
import { metadata, sections } from "@/data/cv";
import { CVAboutSection, CVEducationSection, CVEmploymentSection, CVIcon, CVLocale, CVProfileSection, CVProjectsSection } from "@/types";

type Props = {
  params: {
    locale: string;
  };
};

export const generateMetadata = ({ params: { locale } }: Props) => {
  if (locale !== "en" && locale !== "sv") return;

  return {
    title: metadata.title[locale],
    description: metadata.description[locale],
  };
};

export default ({ params: { locale } }: Props) => {
  if (locale !== "en" && locale !== "sv") return redirect("/en/cv");

  return (
    <div className="flex flex-col">
      {/* Language selection */}
      <div className="flex gap-2">
        <Link href={"/en/cv"} title={"Read the English version"} draggable={false}>
          {<Icons.unitedKingdom className="inline size-9" data-selected={locale === "en"} />}
        </Link>
        <Link href={"/sv/cv"} title={"Read the Swedish version"} draggable={false}>
          {<Icons.sweden className="inline size-9" data-selected={locale === "sv"} />}
        </Link>
      </div>

      {/* Render sections based on the sections array in @/data/cv */}
      <div className="flex flex-col gap-6">
        {sections.map(section => {
          switch (section.sectionId) {
            case "profile":
              return <ProfileSection key={section.sectionId} profileSection={section} locale={locale} />;
            case "about":
              return <AboutSection key={section.sectionId} aboutSection={section} locale={locale} />;
            case "employment":
              return <EmploymentSection key={section.sectionId} employmentSection={section} locale={locale} />;
            case "education":
              return <EducationSection key={section.sectionId} educationSection={section} locale={locale} />;
            case "projects":
              return <ProjectsSection key={section.sectionId} projectsSection={section} locale={locale} />;
          }
        })}
      </div>
    </div>
  );
};

const getIconComponent = (icon: CVIcon) => {
  switch (icon) {
    case "envelope":
      return Icons.envelope;
    case "github":
      return Icons.gitHub;
    case "linkedin":
      return Icons.linkedin;
    default:
      return Icons.globe;
  }
};

const linkify = (text: string) => {
  const parts = text.split(/\[([^\]]+)]\(([^)]+)\)/);

  const elements = parts.map((part, index) => {
    if (index % 3 === 1) {
      // This is the link text
      return (
        <Link key={index} href={parts[index + 1]} target="_blank" className="underline hover:font-bold">
          {part}
        </Link>
      );
    } else if (index % 3 === 2) {
      // This is the link URL, ignore
      return null;
    } else {
      // This is regular text
      return part;
    }
  });

  return elements;
};

// Takes a string and returns a title with an optional url
const SectionTitle = ({ title, url }: { title: string; url?: string }) => {
  return url ? (
    <Link href={url} target="_blank" className="w-fit text-xl font-bold underline decoration-1 underline-offset-2 hover:decoration-2">
      {title}
    </Link>
  ) : (
    <h2 className="text-xl font-bold underline decoration-1 underline-offset-2">{title}</h2>
  );
};

// Takes an array of strings and returns a list of paragraphs
const SectionDescription = ({ description }: { description?: string[] }) => {
  if (!description) return null;
  return description.map(text => (
    <p key={text} className="font-geist-mono text-xs text-neutral-600">
      {linkify(text)}
    </p>
  ));
};

const ProfileSection = ({ profileSection, locale }: { profileSection: CVProfileSection; locale: "en" | "sv" }) => {
  return (
    <div className="flex items-center justify-between gap-10">
      <div className="flex flex-col gap-3">
        <div>
          <h1 className="text-xl font-bold min-[400px]:text-2xl">{profileSection.name}</h1>
          <p className="font-geist-mono text-sm text-neutral-600">{profileSection.tagline[locale]}</p>
        </div>

        {/* Links */}
        <div className="flex flex-col gap-1">
          {profileSection.url && (
            <Link href={profileSection.url.href} target="_blank" className="flex w-fit items-center gap-1 font-geist-mono text-xs text-neutral-600 hover:underline">
              <Icons.link className="size-4" /> {profileSection.url.text}
            </Link>
          )}

          {profileSection.location && (
            <Link href={profileSection.location.href} target="_blank" className="w-fit font-geist-mono text-xs text-neutral-600 hover:underline">
              <span className="flex items-center gap-1">
                <Icons.globe className="size-4 shrink-0" />
                <span>
                  {profileSection.location.text[locale]}, {new Intl.DateTimeFormat(locale, { timeZone: profileSection.location.timezone, timeZoneName: "shortOffset" }).formatToParts().find(x => x.type === "timeZoneName")!.value}{" "}
                  {profileSection.location.timezone && <CurrentTime locale={locale} timeZone={profileSection.location.timezone} />}
                </span>
              </span>
            </Link>
          )}
        </div>

        {/* Icon Links */}
        {profileSection.iconLinks?.length && (
          <div className="flex gap-1">
            {profileSection.iconLinks.map(({ icon, href, text }, i) => {
              const IconComponent = getIconComponent(icon);

              return (
                <Fragment key={i}>
                  <Link href={href} target="_blank" title={text} className="group rounded-lg border p-2 transition-colors hover:bg-neutral-100">
                    <IconComponent className="size-4 text-neutral-600 transition-colors group-hover:text-black" />
                  </Link>

                  {/* Show print button if last index and enabled */}
                  {i === profileSection.iconLinks!.length! - 1 && profileSection.showPrintButton && (
                    <PrintButton title="Print this page" className="group rounded-lg border p-2 transition-colors hover:bg-neutral-100 print:hidden">
                      <Icons.print className="size-4 text-neutral-600 transition-colors group-hover:text-black" />
                    </PrintButton>
                  )}
                </Fragment>
              );
            })}
          </div>
        )}
      </div>
      {profileSection.avatar && <Image className="hidden rounded-xl sm:block" src={profileSection.avatar} alt={profileSection.name} width={100} height={100} priority placeholder="blur" />}
    </div>
  );
};

const AboutSection = ({ aboutSection, locale }: { aboutSection: CVAboutSection; locale: CVLocale }) => {
  if (!aboutSection) return null;

  return (
    <div className="flex flex-col gap-2">
      <SectionTitle title={aboutSection.sectionTitle[locale]} url={aboutSection.sectionTitleUrl} />
      <SectionDescription description={aboutSection.sectionDescription?.[locale]} />
    </div>
  );
};

const EmploymentSection = ({ employmentSection, locale }: { employmentSection: CVEmploymentSection; locale: CVLocale }) => {
  if (!employmentSection.history.length) return null;

  return (
    <div className="flex flex-col gap-2">
      <SectionTitle title={employmentSection.sectionTitle[locale]} url={employmentSection.sectionTitleUrl} />
      <SectionDescription description={employmentSection.sectionDescription?.[locale]} />

      <div className="flex flex-col gap-3">
        {employmentSection.history.map(({ title, company, companyUrl, description, start, end }, i) => (
          <Fragment key={i}>
            <div className="flex flex-col gap-2">
              <div className="flex flex-col">
                {/* Company and dates */}
                <div className="flex items-baseline justify-between">
                  <Link href={companyUrl} target="_blank" className="font-semibold hover:underline">
                    {company}
                  </Link>

                  <span className="text-xs text-neutral-600">
                    {start} - {end ?? "Present"}
                  </span>
                </div>

                {/* Title */}
                <span className="font-geist-mono text-sm">{title}</span>
              </div>

              {/* Description */}
              <div className="flex flex-col gap-2">
                {description[locale].map(text => (
                  <SectionDescription key={text} description={[text]} />
                ))}
              </div>
            </div>

            {i !== employmentSection.history.length - 1 && <hr />}
          </Fragment>
        ))}
      </div>
    </div>
  );
};

const EducationSection = ({ educationSection, locale }: { educationSection: CVEducationSection; locale: CVLocale }) => {
  if (!educationSection.history.length) return null;

  return (
    <div className="flex flex-col gap-2">
      <SectionTitle title={educationSection.sectionTitle[locale]} url={educationSection.sectionTitleUrl} />
      <SectionDescription description={educationSection.sectionDescription?.[locale]} />

      <div className="flex flex-col gap-3">
        {educationSection.history.map(({ school, schoolUrl, description, start, end }, i) => (
          <Fragment key={i}>
            <div className="flex flex-col gap-[2px]">
              <div className="flex flex-col">
                {/* School and dates */}
                <div className="flex items-baseline justify-between">
                  <Link href={schoolUrl} target="_blank" className="font-semibold hover:underline">
                    {school}
                  </Link>

                  <span className="text-xs text-neutral-600">
                    {start} - {end ?? "Present"}
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="flex flex-col gap-2">
                {description[locale].map(text => (
                  <SectionDescription key={text} description={[text]} />
                ))}
              </div>
            </div>

            {i !== educationSection.history.length - 1 && <hr />}
          </Fragment>
        ))}
      </div>
    </div>
  );
};

const ProjectsSection = ({ projectsSection, locale }: { projectsSection: CVProjectsSection; locale: CVLocale }) => {
  if (!projectsSection.projects.length) return null;

  return (
    <div className="flex flex-col gap-2">
      <SectionTitle title={projectsSection.sectionTitle[locale]} url={projectsSection.sectionTitleUrl} />
      <SectionDescription description={projectsSection.sectionDescription?.[locale]} />

      <div className="flex flex-col gap-2">
        {projectsSection.projects.map(({ name, shortDescription, slug, tags, year }) => (
          <div key={slug} className="flex flex-col gap-[2px] rounded-lg border border-neutral-200 p-2 transition-colors hover:border-neutral-400">
            <div className="flex items-baseline justify-between">
              <Link href={`/projects/${slug}`} target="_blank" className="font-semibold hover:underline">
                {name}
              </Link>

              <span className="text-xs text-neutral-600">{year}</span>
            </div>

            <p className="font-geist-mono text-xs text-neutral-600">{shortDescription}</p>

            <div className="flex flex-wrap gap-1">
              {tags?.map(tag => (
                <Link key={tag} href={`/projects?search=${tag}`} target="_blank" title={`See other projects tagged with ${tag}.`} className="rounded bg-neutral-200 p-1 font-geist-mono text-xs text-neutral-800 outline-1 hover:outline">
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        ))}

        <Link href="/projects" target="_blank" className="group font-semibold">
          <Icons.arrowRight className="inline" /> <span className="group-hover:underline">{projectsSection.browseAllText[locale]}</span>
        </Link>
      </div>
    </div>
  );
};