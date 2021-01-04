import classnames from 'classnames';

interface IconProps {
  className?: string;
  viewBox?: string;
  width?: number | string;
  height?: number | string;
  name: string;
}

const Icon = (props: IconProps) => {
  function getIcon(name: string) {
    switch (name) {
      case 'home':
        return (
          <g>
            <path
              // fill-rule="evenodd"
              // clip-rule="evenodd"
              fill="currentColor"
              d="M3.586 10.414A2 2 0 003 11.828V19a2 2 0 002 2h5a1 1 0 001-1v-6h2v6a1 1 0 001 1h5a2 2 0 002-2v-7.172a2 2 0 00-.586-1.414l-7.707-7.707a1 1 0 00-1.414 0l-7.707 7.707zM13 12a2 2 0 012 2v5h4v-7.172l-7-7-7 7V19h4v-5a2 2 0 012-2h2z"
            />
          </g>
        );

      case 'dot-menu':
        return (
          <g>
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <circle cx="12" cy="12" r="1" />
            <circle cx="12" cy="19" r="1" />
            <circle cx="12" cy="5" r="1" />
          </g>
        );

      default:
        return <g></g>;
    }
  }

  return (
    <svg
      className={classnames(`icon icon--${props.name}`, props.className)}
      width={props.width || 36}
      height={props.height || props.width || 36}
      viewBox={props.viewBox || '0 0 36 36'}
    >
      {getIcon(props.name)}
    </svg>
  );
};

export default Icon;
