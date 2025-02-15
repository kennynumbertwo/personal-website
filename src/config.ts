import type { Site, SocialObjects } from "./types";

export const SITE: Site = {
  url: "https://www.kennytye.com/", // replace this with your deployed domain
  title: "Kenny Tye Web Developer Portfolio",
  description:
    "Kenny Tye's profossional web development and software engineering portfolio",
  author: "Kenny Tye",
  ogImage: "",
};

export const LOGO_IMAGE = {
  enable: false,
  svg: true,
  width: 216,
  height: 46,
};

export const SOCIALS: SocialObjects = [
  {
    name: "Github",
    href: "https://github.com/kennynumbertwo",
    linkTitle: ` ${SITE.title} on Github`,
    active: true,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/kenny-tye-3559106b/",
    linkTitle: `${SITE.title} on LinkedIn`,
    active: true,
  },
  {
    name: "Mail",
    href: "mailto:kenny@destroybox.studio",
    linkTitle: `Send an email to ${SITE.title}`,
    active: true,
  },
  {
    name: "Twitter",
    href: "https://twitter.com/kennytyedev",
    linkTitle: `${SITE.title} on Twitter`,
    active: false,
  },
];
