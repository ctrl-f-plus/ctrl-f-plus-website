// app/components/title.tsx

import CopyButton from './copy-button';

// @ts-ignore
const Title = ({ ...props }) => {
  const lang = props['data-language'] || 'shell';

  return (
    <div className={'flex p-0'}>
      <div
        // border border-b-green-700
        className={
          'code-header flex h-12 w-full items-center justify-between  rounded-t-lg border-b !border-b-gray-700  bg-shark-800 px-4 py-3 font-mono text-sm font-medium text-neutral-200'
        }
      >
        {props.title}
        <CopyButton text={props.__rawString__} />
      </div>
    </div>
  );
};

export default Title;
