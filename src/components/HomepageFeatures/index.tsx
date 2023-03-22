import React, {
  useMemo,
  type FC,
  type ReactNode,
} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';

type FeatureItem = {
  icon?: ReactNode;
  iconBox?: boolean;
  title: string;
  description: ReactNode;
};

const FeatureList: Omit<FeatureItem, 'iconBox'>[] = [
  {
    title: 'Open Source',
    description: (
      <>
        OpenHaptics firmware is fully open-source and <Link to='https://github.com/openhaptics'>available on GitHub</Link>.
      </>
    ),
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
        <path fill="#4CAF50" d="M8 0C3.589 0 0 3.589 0 8c0 3.291 2.063 6.288 5.132 7.457a.502.502 0 0 0 .655-.318l1.5-4.79a.5.5 0 0 0-.235-.587A2.018 2.018 0 0 1 6 8c0-1.103.897-2 2-2s2 .897 2 2c0 .729-.403 1.404-1.052 1.763a.498.498 0 0 0-.235.587l1.5 4.79a.502.502 0 0 0 .655.318C13.938 14.288 16 11.291 16 8c0-4.411-3.589-8-8-8z"/>
      </svg>
    ),
  },
  {
    title: 'DIY-Supported',
    description: 'Wide variety of DIY options for everyone.',
    icon: "🛠️",
  },
  {
    title: 'Affordable',
    description: 'Affordable and easy to use.',
    icon: '💰',
  },
  {
    title: 'Wide support',
    description: 'Over of 100 of supported games',
    icon: '🎮',
  },
];

const Feature: FC<FeatureItem> = ({title, description, icon, iconBox = false}) => {
  return (
    <article className="tw-relative tw-flex tw-flex-col tw-bg-gray-100 dark:tw-bg-gray-800 tw-rounded-2xl tw-p-6">
      { icon && <div
        className={clsx(
          'tw-flex tw-flex-row tw-items-center tw-justify-center tw-mb-5 tw-h-12 tw-w-12 tw-text-2xl tw-select-none',
          iconBox && 'tw-px-2 tw-bg-gray-200 dark:tw-bg-gray-700 tw-rounded-md',
        )}
      >
        { icon }
      </div> }
      <h3 className='tw-m-0 tw-text-lg tw-leading-normal tw-text-gray-900 dark:tw-text-gray-200'>{title}</h3>
      <p className='tw-m-0 tw-pt-2 tw-text-base tw-text-gray-500 dark:tw-text-gray-400'>{description}</p>
    </article>
  )
};

export default function HomepageFeatures(): JSX.Element {
  return (
    <section>
      <div className="container">
        <div className="tw-grid tw-my-8 tw-grid-cols-1 sm:tw-grid-cols-2 lg:tw-grid-cols-4 tw-gap-4">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} iconBox />
          ))}
        </div>
      </div>
    </section>
  );
}
