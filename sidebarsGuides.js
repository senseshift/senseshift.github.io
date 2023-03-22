// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  guides: [
    'getting-started',
    {
      type: 'category',
      label: 'Face Interface',
      link: {
        type: 'generated-index',
      },
      collapsed: false,
      items: [
        {
          type: 'autogenerated',
          dirName: 'face-interface',
        },
      ],
    },
    {
      type: 'category',
      label: 'x40 Vest',
      collapsed: false,
      items: [
        {
          type: 'link',
          label: `Guide by ProBendingVR`,
          href: 'https://docs.google.com/document/d/1j84h-7OIkRO9KTNtq_mKxri_7PsSNUnL/view'
        },
      ],
    },
  ]
};

module.exports = sidebars;
