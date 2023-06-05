export default function page() {
  return (
    <div className="">
      <h1 className="">Versions</h1>

      <ul className=" pl-5 list-disc list-inside">
        <li>
          <a href="/" target="_blank">
            /
          </a>
        </li>
        <li>
          <a href="/color-theme-main" target="_blank">
            Main Color Theme
          </a>
        </li>
        <li>
          <a href="/alternative-color-theme-1" target="_blank">
            Alternative Color Theme 1
          </a>
        </li>
        <li>
          <a href="/alternative-color-theme-2" target="_blank">
            Alternative Color Theme 2
          </a>
        </li>
        <li>
          <a href="/alternative-color-theme-3" target="_blank">
            Alternative Color Theme 3
          </a>
        </li>
        <li>
          <a href="/templatedark" target="_blank">
            Tailwind Template - Dark
          </a>
        </li>
        <li>
          <a href="/templatelight" target="_blank">
            Tailwind Template - Light
          </a>
        </li>
      </ul>
    </div>
  );
}
