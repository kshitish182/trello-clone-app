import classnames from 'classnames';

import { UserCoreType } from '../../types/user';

interface UserThumbnailProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  userData: UserCoreType;
  showFullName?: boolean;
}

const UserThumbnail = (props: UserThumbnailProps) => {
  const { size = 'md', userData, showFullName = false } = props;

  const thumbnailClass = classnames('circle circle--primary', {
    'circle--lg': size === 'lg',
    'circle--sm': size === 'sm',
  });

  const thumbnailWrapperClass = classnames('flx flx--algn-ctr', props.className);

  const userFullName = `${userData.firstName} ${userData.lastName}`;
  const userInitials = `${userData.firstName[0].toUpperCase()}${userData.lastName[0].toUpperCase()}`;

  return (
    <div className={thumbnailWrapperClass}>
      <div className={thumbnailClass} title={userFullName}>
        <div className="circle__content">{userInitials}</div>
      </div>
      {showFullName && <div className="circle__text">{userFullName}</div>}
    </div>
  );
};

export default UserThumbnail;
