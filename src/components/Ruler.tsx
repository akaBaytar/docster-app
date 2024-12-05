import { useRef, useState } from 'react';

import { FaCaretDown } from 'react-icons/fa6';

type MarkerProps = {
  position: number;
  isLeft: boolean;
  isDragging: boolean;
  onMouseDown: () => void;
  onDoubleClick: () => void;
};

const markers = Array.from({ length: 83 }, (_, i) => i);

const Ruler = () => {
  const [leftMargin, setLeftMargin] = useState(56);
  const [rightMargin, setRightMargin] = useState(56);

  const [isDraggingLeft, setIsDraggingLeft] = useState(false);
  const [isDraggingRight, setIsDraggingRight] = useState(false);

  const ruler = useRef<HTMLDivElement>(null);

  const onLeftMouseDown = () => setIsDraggingLeft(true);
  const onRightMouseDown = () => setIsDraggingRight(true);

  const onLeftDoubleClick = () => setLeftMargin(56);
  const onRightDoubleClick = () => setRightMargin(56);

  const onMouseMove = (e: React.MouseEvent) => {
    if ((isDraggingLeft || isDraggingRight) && ruler.current) {
      const container = ruler.current.querySelector('#ruler-container');
      if (container) {
        const containerRect = container.getBoundingClientRect();
        const relativeX = e.clientX - containerRect.left;
        const rawPosition = Math.max(0, Math.min(816, relativeX));
        if (isDraggingLeft) {
          const maxLeftPosition = 816 - rightMargin - 100;
          const newLeftPosition = Math.min(rawPosition, maxLeftPosition);
          setLeftMargin(newLeftPosition);
        } else if (isDraggingRight) {
          const maxRightPosition = 816 - (leftMargin + 100);
          const newRightPosition = Math.max(816 - rawPosition, 0);
          const constrainedRightPosition = Math.min(
            newRightPosition,
            maxRightPosition
          );
          setRightMargin(constrainedRightPosition);
        }
      }
    }
  };

  const onMouseUp = () => {
    setIsDraggingLeft(false);
    setIsDraggingRight(false);
  };

  return (
    <div
      ref={ruler}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      onMouseMove={onMouseMove}
      className='h-6 border-b border-gray-300 flex items-end relative select-none print:hidden'>
      <div id='ruler-container' className='w-[816px] mx-auto h-full relative'>
        <Marker
          position={leftMargin}
          isLeft
          isDragging={isDraggingLeft}
          onMouseDown={onLeftMouseDown}
          onDoubleClick={onLeftDoubleClick}
        />
        <Marker
          position={rightMargin}
          isLeft={false}
          isDragging={isDraggingRight}
          onMouseDown={onRightMouseDown}
          onDoubleClick={onRightDoubleClick}
        />
        <div className='absolute inset-x-0 bottom-0 h-full'>
          <div className='relative h-full w-[816px]'>
            {markers.map((marker) => {
              const position = (marker * 816) / 82;

              return (
                <div
                  key={marker}
                  style={{ left: `${position}px` }}
                  className='absolute bottom-0'>
                  {marker % 10 === 0 && (
                    <>
                      <div className='absolute bottom-0 h-2 w-[1px] bg-neutral-500' />
                      <span className='absolute bottom-2 text-neutral-500 text-[10px] transform -translate-x-1/2'>
                        {marker / 10 + 1}
                      </span>
                    </>
                  )}
                  {marker % 5 === 0 && marker % 10 !== 0 && (
                    <div className='absolute bottom-0 h-1.5 w-[1px] bg-neutral-500' />
                  )}
                  {marker % 5 !== 0 && (
                    <div className='absolute bottom-0 h-[3px] w-[1px] bg-neutral-500' />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

const Marker = ({
  isDragging,
  isLeft,
  position,
  onDoubleClick,
  onMouseDown,
}: MarkerProps) => {
  return (
    <div
      onMouseDown={onMouseDown}
      onDoubleClick={onDoubleClick}
      style={{ [isLeft ? 'left' : 'right']: `${position}px` }}
      className='absolute top-0 w-4 h-full -ml-2 z-10 group cursor-ew-resize'>
      <FaCaretDown className='absolute left-1.5 top-0 h-full fill-amber-500 transform -translate-x-1.5' />
      <div
        style={{
          height: '100vh',
          width: '1px',
          transform: 'scaleX(0.5)',
          backgroundColor: '#f59e0b',
          display: isDragging ? 'block' : 'none',
        }}
        className='absolute top-4 left-1/2 transform -translate-x-1/2'
      />
    </div>
  );
};

export default Ruler;
