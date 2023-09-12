// app/components/title.tsx

import CopyButton from './copy-button';

// @ts-ignore
const Title = ({ ...props }) => {
  const lang = props['data-language'] || 'shell';

  return (
    <div className={'flex p-0'}>
      <div
        className={
          'code-header mt-6 flex w-full items-center justify-between border border-gray-700 px-4'
        }
      >
        {props.title}
        <CopyButton text={props.__rawString__} />
      </div>
    </div>
  );
};

export default Title;
