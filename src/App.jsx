import background from '/background.jpg';
import Weather from './components/Weather';

const App = () => {
  const backgroundImg = { backgroundImage: `url(${background})` };

  return (
    <div className="h-screen bg-cover bg-center" style={backgroundImg}>
      <Weather />
    </div>
  );
};

export default App;
