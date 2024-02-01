const asset = `{
	_type,
	_key,
	_id,
	_ref,
	alt,
	caption,
	...(asset->{
		_id,
		'id': _id,
		'lqip': metadata.lqip,
		'dimensions': metadata.dimensions,
		url,
	}),
}`;

export const postsQuery = `*[_type == "post" && defined(slug.current)]{
  _id, title, slug
}`;

const project = `{
  _id,
  title,
  slug,
  employer->{
    _id,
    name,
    type,
    website,
  },
  url,
  client,
  type,
  contribution,
  technologies[]->{
    _id,
    title,
  },
  date,
  description,
  images[]${asset},
}`;

export const projectsQuery = `*[_type == "project" && defined(slug.current)]{
  ${project}
}`;

export const siteConfig = `*[_type == "siteConfig"] {
    siteTitle,
    url,
    contactDetails,
    mainMenu,
    selectWork[]->${project},
  }[0]
`;
