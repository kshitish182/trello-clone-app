import classnames from 'classnames';

import { UserCoreType } from '../../types/user';

interface UserThumbnailProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  userData: UserCoreType;
}

const UserThumbnail = (props: UserThumbnailProps) => {
  const { size = 'md', userData } = props;

  const thumbnailWrapperClass = classnames(
    'circle circle--primary',
    {
      'circle--lg': size === 'lg',
      'circle--sm': size === 'sm',
    },
    props.className
  );

  const userFullName = `${userData.firstName} ${userData.lastName}`;
  const userInitials = `${userData.firstName[0].toUpperCase()}${userData.lastName[0].toUpperCase()}`;

  return (
    <div className={thumbnailWrapperClass} title={userFullName}>
      <div className="circle__content">{userInitials}</div>
    </div>
  );
};

export default UserThumbnail;
