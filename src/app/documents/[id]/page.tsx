import Editor from '@/components/Editor';
import Navbar from '@/components/Navbar';
import Toolbar from '@/components/Toolbar';

const DocumentPage = () => {
  return (
    <div className='min-h-screen bg-[#FAFBFD]'>
      <div className='flex flex-col gap-2 px-4 pt-2 fixed top-0 left-0 right-0 z-20 bg-[#fafbfd] print:hidden'>
        <Navbar />
        <Toolbar />
      </div>
      <div className='pt-[114px] print:pt-0'>
        <Editor />
      </div>
    </div>
  );
};

export default DocumentPage;
