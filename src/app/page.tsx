import Navbar from '@/components/home/Navbar';
import TemplateGallery from '@/components/home/TemplateGallery';

const HomePage = () => {
  return (
    <div className='min-h-screen flex flex-col bg-neutral-50'>
      <div className='fixed h-16 top-0 left-0 right-0 p-4 z-10 bg-white border-b border-neutral-50'>
        <Navbar />
      </div>
      <div className='mt-16'>
        <TemplateGallery />
      </div>
    </div>
  );
};

export default HomePage;
