// app/components/title.tsx
import 'server-only';

import CopyButton from './copy-button';

const Title = ({ ...props }) => {
  return (
    <div className="flex p-0">
      <div className="code-header flex h-12 w-full items-center justify-between  rounded-t-lg border-b !border-b-gray-700 bg-shark-800 px-4 py-3 font-mono text-sm font-medium text-neutral-200">
        <span className="truncate">{props.title}</span>
        <CopyButton text={props.__rawstring__} isTitle />
      </div>
    </div>
  );
};

export default Title;
