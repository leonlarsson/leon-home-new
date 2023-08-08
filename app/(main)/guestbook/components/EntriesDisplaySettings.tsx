"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default () => {
  const router = useRouter();
  const searchParams = new URLSearchParams(useSearchParams().toString());

  const onNamedEntriesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    checked ? searchParams.set("named", "true") : searchParams.delete("named");
    router.replace("?" + searchParams.toString());
  };

  const onTimeStampsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    checked ? searchParams.set("timestamps", "true") : searchParams.delete("timestamps");
    router.replace("?" + searchParams.toString());
  };

  return (
    <div className="flex flex-wrap">
      <div className="me-3 flex items-center gap-1">
        <input className="peer h-4 w-4 cursor-pointer accent-black outline-none dark:accent-kinda-white" type="checkbox" id="named" defaultChecked={searchParams.get("named") === "true"} onChange={onNamedEntriesChange} />
        <label className="select-none underline-offset-2 opacity-75 transition-opacity peer-checked:underline peer-checked:opacity-100 dark:opacity-50" htmlFor="named">
          Show only named entries
        </label>
      </div>

      <div className="flex items-center gap-1">
        <input className="peer h-4 w-4 cursor-pointer accent-black outline-none dark:accent-kinda-white" type="checkbox" id="timestamps" defaultChecked={searchParams.get("timestamps") === "true"} onChange={onTimeStampsChange} />
        <label className="select-none underline-offset-2 opacity-75 transition-opacity peer-checked:underline peer-checked:opacity-100 dark:opacity-50" htmlFor="timestamps">
          Show timestamps
        </label>
      </div>
    </div>
  );
};