import Editor from '@/components/Editor';
import Toolbar from '@/components/Toolbar';

const DocumentPage = () => {
  return (
    <div className='min-h-screen bg-[#FAFBFD]'>
      <Toolbar />
      <Editor />
    </div>
  );
};

export default DocumentPage;
