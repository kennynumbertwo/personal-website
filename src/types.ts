export type Site = {
  url: string;
  author: string;
  description: string;
  title: string;
  ogImage?: string;
};

export type SocialObjects = {
  name: string;
  href: string;
  active: boolean;
  linkTitle: string;
}[];
