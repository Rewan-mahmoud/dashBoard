import './setting.css';
import { NavLink, Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // Import translation hook

function Settings() {
  const { t } = useTranslation(); // Use the translation function

  const tabs = [
    { title: t('Generalsettings.general'), path: 'PublicSettings' }, // Translate tab titles
    { title: t('Generalsettings.returnPolicy'), path: 'ReturnPolicy' },
    { title: t('Generalsettings.copyRights'), path: 'CopyRights' },
    { title: t('Generalsettings.commonQuestions'), path: 'CommonQuestions' },
  ];

  return (
    <>
      <nav className="navbar settingNav navbar-expand-lg navbar-light mt-4">
        {tabs.map((item, index) => (
          <NavLink
            activeClassName="active"
            className="nav-link ps-4"
            key={index}
            to={item.path}
          >
            {item.title}
          </NavLink>
        ))}
      </nav>

      <div className="container tables bg-white mt-4">
        <Outlet />
      </div>
    </>
  );
}

export default Settings;
