
import styles from './sidebar.module.css';
import { MdLogout } from 'react-icons/md';
import { useRouter } from 'next/navigation';

const Sidebar = () => {
  const router = useRouter();

  const handleLogOut = async () => {
    sessionStorage.removeItem('isLoggedIn');
    router.push('/');
  };

  return (
    <div className={styles.sidebar}>
      Sidebar
      <button className={styles.logout} onClick={handleLogOut}>
        <MdLogout />
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
