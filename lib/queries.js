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

const project = `
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
    name,
  },
  date,
  description,
  images[]${asset},
`;

export const projectsQuery = `*[_type == "project"]{
  ${project}
}`;

export const siteConfigQuery = `*[_type == "siteConfig"] {
  title,
  about,
  selectWork[]->{
    ${project}
  },
}[0]
`;
