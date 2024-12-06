import { BsCloudCheck } from 'react-icons/bs';

const DocumentInput = () => {
  return (
    <div className='flex items-center gap-1'>
      <span className='text-lg font-medium px-1.5 truncate cursor-pointer'>
        Untitled Document
      </span>
      <BsCloudCheck className='mt-0.5' />
    </div>
  );
};

export default DocumentInput;
