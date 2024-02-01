const defaultClassNames = {
  headingXl: 'heading-xl',
  headingLg: 'heading-lg',
  headingMd: 'heading-md',
  headingSm: 'heading-sm',
  headingPara: 'para-lg',
  paraLg: 'para-lg',
  paraSm: 'para-sm',
  listStyle: 'pl-6 list-disc pb-4',
  centeredList: 'm-auto para-lg pb-4',
};

export const generateSerializer = (customClassNames = {}) => {
  // Merge default class names with custom class names
  // Custom class names will override default ones if they have the same key
  const mergedClassNames = { ...defaultClassNames, ...customClassNames };
  return {
    block: {
      h1: ({ children }) => (
        <h1 className={mergedClassNames.headingXl}>{children}</h1>
      ),
      h1Sm: ({ children }) => (
        <h1 className={mergedClassNames.headingPara}>{children}</h1>
      ),
      h2: ({ children }) => (
        <h2 className={mergedClassNames.headingLg}>{children}</h2>
      ),
      h2Sm: ({ children }) => (
        <h2 className={mergedClassNames.headingPara}>{children}</h2>
      ),
      h3: ({ children }) => (
        <h3 className={mergedClassNames.headingMd}>{children}</h3>
      ),
      h4: ({ children }) => (
        <h4 className={mergedClassNames.headingSm}>{children}</h4>
      ),
      h5: ({ children }) => (
        <h5 className={mergedClassNames.paraLg}>{children}</h5>
      ),
      h6: ({ children }) => (
        <h6 className={mergedClassNames.paraSm}>{children}</h6>
      ),
      normal: ({ children }) => {
        if (children.length === 1 && children[0] === '') {
          return <br />;
        } else {
          return <p className={mergedClassNames.paraLg}>{children}</p>;
        }
      },
    },
    list: {
      bullet: ({ children }) => (
        <ul
          className={`${mergedClassNames.paraLg} ${mergedClassNames.listStyle}`}
        >
          {children}
        </ul>
      ),
      number: ({ children }) => (
        <ol
          className={`${mergedClassNames.paraLg} ${mergedClassNames.listStyle}`}
        >
          {children}
        </ol>
      ),
      checkmarks: ({ children }) => (
        <ol className={mergedClassNames.centeredList}>{children}</ol>
      ),
    },
  };
};
