import Navbar from '@/components/home/Navbar';

const HomePage = () => {
  return (
    <div className='min-h-screen flex flex-col'>
      <div className='fixed h-16 top-0 left-0 right-0 p-4 z-10'>
        <Navbar />
      </div>
    </div>
  );
};

export default HomePage;
