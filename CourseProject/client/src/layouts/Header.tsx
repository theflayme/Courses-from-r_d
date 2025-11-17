import Logotype from '@/assets/images/svg/Logotype.svg';
import { ModeToggle } from '@/components/ModeToggle.tsx';
import { AvatarFallback } from '@/components/ui/avatar';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Outlet } from 'react-router-dom';

const Header = () => {
  return (
    <>
      <header className='w-full py-2 flex items-center justify-between mb-4'>
        <div className='flex items-center space-x-2'>
          <img src={Logotype} alt='Logo' className='w-12' />
        </div>
        <div className='flex items-center space-x-2'>
          <ModeToggle />
          <Avatar className='rounded-lg'>
            <AvatarImage
              className='no-repeat object-cover'
              src='https://robot-site-static.fra1.digitaloceanspaces.com/cc/images/blog/73714119-69121841bbaf7930316087.webp'
              alt='@evilrabbit'
            />
            <AvatarFallback></AvatarFallback>
          </Avatar>
        </div>
      </header>
      <Outlet />
    </>
  );
};

export default Header;
