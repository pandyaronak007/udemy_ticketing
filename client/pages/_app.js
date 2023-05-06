import 'bootstrap/dist/css/bootstrap.css';
import buildClient from '../api/buildClient';
import Headers from '../components/headers';

const AppComponent = ({ Component, pageProps, currentUser }) => {
  console.log('_app currentUser => ', currentUser)
  return (
    <div>
      <Headers currentUser={currentUser} />
      <div className="container">
        <Component currentUser={currentUser} {...pageProps} />
      </div>
    </div>
  )
};

AppComponent.getInitialProps = async (appContext) => {
  let url = '/api/users/currentUser';
  const client = await buildClient(appContext.ctx)
  const { data = {} } = client.get(url) || {};
  console.log('getInitialProps data => ', data)
  let pageProps = {};
  if (appContext?.Component?.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(
      appContext.ctx, client, data.currentUser || null
    )
  }
  return { pageProps, ...data };
};

export default AppComponent;