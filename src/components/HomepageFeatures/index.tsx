import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  svg?: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
  linkLabel?: string;
  link?: string;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'OpenSource',
    description: (
      <>
        OpenHaptics firmware is entirely open-source and available for everyone on GitHub.
      </>
    ),
    linkLabel: 'Explore sources',
    link: 'https://github.com/openhaptics',
  },
  {
    title: 'Flexibility',
    description: (
      <>
        <strong>OpenHaptics</strong> firmware allows you to build any configuration, that suits you the best.
      </>
    ),
    linkLabel: 'Learn about flexibility',
    link: '/docs/hardware',
  },
  {
    title: 'Roadmap',
    description: (
      <>
        Everything about our process of development, next releases, and how you can get involved.
        We're super excited about contributions, so please don't be shy!
      </>
    ),
    linkLabel: 'Show the Roadmap',
    link: '/docs/roadmap',
  },
];

function Feature({title, svg: Svg, description, link, linkLabel}: FeatureItem) {
  return (
    <div className={styles.featuresItem}>
      <h3>{title}</h3>
      <p>{description}</p>
      { link && (
        <a className={styles.featuresItem__link} href={link} target={link.startsWith('http') ? '_blank' : '_self'}>
          { linkLabel || 'Open' }
        </a>
      ) }
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section>
      <div className="container">
        <div className={styles.features}>
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
