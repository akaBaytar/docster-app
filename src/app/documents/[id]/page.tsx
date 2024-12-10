import Room from '@/components/layout/Room';

import Editor from '@/components/documents/Editor';
import Navbar from '@/components/documents/Navbar';
import Toolbar from '@/components/documents/Toolbar';

const DocumentPage = () => {
  return (
    <Room>
      <div className='min-h-screen bg-[#FAFBFD]'>
        <div className='flex flex-col gap-2 px-4 pt-2 fixed top-0 left-0 right-0 z-20 bg-[#fafbfd] print:hidden'>
          <Navbar />
          <Toolbar />
        </div>
        <div className='pt-[120px] print:pt-0'>
          <Editor />
        </div>
      </div>
    </Room>
  );
};

export default DocumentPage;
