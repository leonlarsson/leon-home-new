type Props = {
  title?: string;
  description?: string;
  url?: string;
  useTitleAsPrefix?: boolean;
};

const defaultTitle = "Leon San José Larsson";
const defaultDescription = "Software Developer with a background in video games.";

export const generateMetadata = ({
  title,
  description,
  url,
  useTitleAsPrefix,
}: Props): React.DetailedHTMLProps<React.MetaHTMLAttributes<HTMLMetaElement>, HTMLMetaElement>[] => {
  return [
    {
      charSet: "utf-8",
    },
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1",
    },
    {
      title: useTitleAsPrefix ? `${title} | Leon San José Larsson` : (title ?? defaultTitle),
    },
    {
      name: "title",
      content: useTitleAsPrefix ? `${title} | Leon San José Larsson` : (title ?? defaultTitle),
    },
    {
      name: "description",
      content: description ?? defaultDescription,
    },
    {
      name: "og:title",
      content: useTitleAsPrefix ? `${title} | Leon San José Larsson` : (title ?? defaultTitle),
    },
    {
      name: "og:description",
      content: description ?? defaultDescription,
    },
    {
      name: "og:url",
      content: url ?? "https://leonlarsson.com",
    },
    {
      name: "og:site_name",
      content: "Leon San José Larsson",
    },
    {
      name: "og:locale",
      content: "en-US",
    },
    {
      name: "og:type",
      content: "website",
    },
    {
      name: "twitter:card",
      content: "summary_large_image",
    },
    {
      name: "twitter:title",
      content: useTitleAsPrefix ? `${title} | Leon San José Larsson` : (title ?? defaultTitle),
    },
    {
      name: "twitter:description",
      content: description ?? defaultDescription,
    },
    {
      name: "twitter:creator",
      content: "@mozzyfx",
    },
  ];
};
