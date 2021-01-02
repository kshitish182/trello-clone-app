import classnames from 'classnames';

import { UserCoreType } from '../../types/user';

interface UserThumbnailProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  // userData: UserCoreType[];
}

const UserThumbnail = (props: UserThumbnailProps) => {
  const { size = 'md' } = props;

  const thumbnailWrapperClass = classnames(
    'circle circle--primary',
    {
      'circle--lg': size === 'lg',
      'circle--sm': size === 'sm',
    },
    props.className
  );

  return (
    <div className={thumbnailWrapperClass}>
      <div className="circle__content">DU</div>
    </div>
  );
};

export default UserThumbnail;
