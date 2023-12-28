import Image from "next/image";
import HeaderLink from "./HeaderLink";
import Icons from "./icons";

export default () => {
  return (
    <div className="select-none min-[460px]:pt-8">
      {/* TOP HEADER */}
      <header className="relative z-50 mb-6 block px-6 max-[460px]:hidden">
        {/* <GradientBorder rounded="rounded-[13px]" extraClasses="max-w-5xl mx-auto">
          <div className="flex h-16 items-center justify-between rounded-xl bg-white/80 px-2 dark:bg-[#1e1e1e]/70">REST HERE</div>
        </GradientBorder> */}
        <div className="mx-auto flex h-16 w-full max-w-5xl justify-between rounded-xl border-[1px] border-black/20 bg-white/50 px-2 dark:border-kinda-white/10 dark:bg-[#1e1e1e]/50">
          <div className="flex items-center [&>*]:px-2">
            <HeaderLink content={<Image className="rounded-full" src="/assets/images/avatar.png" alt="Leon image" width={40} height={40} priority draggable={false} />} url="/" />
            <HeaderLink content="Home" url="/" />
            <HeaderLink content="Projects" url="/projects" />
            <HeaderLink content="Guestbook" url="/guestbook" />
            <HeaderLink content="Music" url="/music" />
          </div>

          <div className="hidden items-center text-2xl min-[620px]:flex [&>*]:px-1">
            <HeaderLink content={<Icons.envelope className="w-8" />} url="mailto:leonlarsson8@gmail.com" title="Email" newTab />
            <HeaderLink content={<Icons.linkedin className="w-8" />} url="https://www.linkedin.com/in/leonlarsson/" title="LinkedIn" newTab />
            <HeaderLink content={<Icons.twitterX className="w-8" />} url="https://x.com/MozzyFX" title="X / Twitter" newTab />
            <HeaderLink content={<Icons.gitHub className="w-8" />} url="https://github.com/leonlarsson" title="GitHub" newTab />
          </div>
        </div>
      </header>

      {/* BOTTOM OVERLAY HEADER */}
      <header className="fixed inset-x-0 bottom-0 z-50 hidden px-6 pb-6 max-[460px]:block">
        <div className="flex h-16 rounded-xl border-[1px] border-black/40 bg-white/50 text-xl backdrop-blur-md dark:border-kinda-white/10 dark:bg-[#1e1e1e]/50">
          <div className="flex w-full justify-evenly text-2xl [&>*]:px-2 max-[275px]:[&>*]:px-0">
            <HeaderLink content={<Icons.house className="w-8" />} url="/" title="Home" />
            <HeaderLink content={<Icons.tools className="w-8" />} url="/projects" title="Projects" />
            <HeaderLink content={<Icons.pencil className="w-8" />} url="/guestbook" title="Guestbook" />
            <HeaderLink content={<Icons.spotify className="w-8" />} url="/music" title="Music" />
          </div>
        </div>
      </header>
    </div>
  );
};
