import { Link, Outlet } from 'umi';
import styles from './index.less';

export default function Layout() {
  const menus = ['home', 'docs', 'searchList'];

  return (
    <div>
      <ul className={styles.navs}>
        {menus.map((menu) => (
          <li key={menu}>
            <Link to={`/${menu}`}>{menu}</Link>
          </li>
        ))}
      </ul>
      <Outlet />
    </div>
  );
}
